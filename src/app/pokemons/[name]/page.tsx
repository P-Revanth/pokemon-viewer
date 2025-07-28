"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import BackButton from "@/components/backbtn";

export default function PokemonDetails({ params }: { params: Promise<{ name: string }> }) {
    const [data, setData] = useState<any>(null);
    const { name } = use(params);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const typeColor: { [key: string]: string } = {
        fire: "bg-red-500",
        water: "bg-blue-500",
        grass: "bg-green-500",
        electric: "bg-yellow-500",
        psychic: "bg-purple-500",
        ice: "bg-cyan-500",
        dragon: "bg-orange-500",
        dark: "bg-gray-600",
        fairy: "bg-pink-500",
        normal: "bg-gray-300",
        fighting: "bg-red-600",
        flying: "bg-blue-300",
        poison: "bg-purple-500",
        ground: "bg-amber-800",
        rock: "bg-yellow-700",
        bug: "bg-green-600",
        ghost: "bg-indigo-700",
        steel: "bg-gray-400",
        unknown: "bg-gray-500",
        shadow: "bg-black",
    };

    const getBackgroundColorClass = (pokemonTypes: any[] | undefined) => {
        if (!pokemonTypes || pokemonTypes.length === 0) {
            return 'bg-gray-200';
        }
        const firstType = pokemonTypes[0].type.name.toLowerCase();
        return typeColor[firstType] || 'bg-gray-200';
    };

    useEffect(() => {
        // This effect can be used to fetch additional details if needed
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon details");
                }
                const data = await response.json();
                const pokeImage = data.sprites.other['official-artwork'].front_default ||
                    data.sprites.front_default ||
                    `https://img.pokemondb.net/artwork/${name}.jpg`;
                // const pokemonSpecies = data.species.name;
                // console.log(`Pokemon Species: ${pokemonSpecies}`);
                setLoading(false);
                setError(null);
                data.image = pokeImage; // Add image to data

                setData(data);
                console.log("Pokemon Details:", data);
            } catch (error) {
                console.error("Error fetching pokemon details:", error);
            }
        };
        fetchPokemonDetails();
    }, [name]);

    return (
        <div className="flex flex-col h-screen">
            <BackButton onClick={() => window.history.back()} />
            <div className="flex border-1 border-gray-300 rounded-lg shadow-2xl m-4 p-6 h-full">
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                <div className="flex flex-col h-full gap-4">
                    <h1 className="text-2xl font-semibold text-gray-400 mt-4">
                        {`#${data?.id}`}
                    </h1>
                    <div className="flex justify-between w-full">
                        <h1 className="text-3xl font-bold">{data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}</h1>
                        <div className="flex items-center justify-center gap-2">
                            {data?.types.map((type: any) => (
                                <span key={type.type.name} className={`text-sm font-semibold mr-2 w-20 text-center p-1 rounded-full ${getBackgroundColorClass([type])}`}>
                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={`flex w-full h-full items-center justify-center p-4 rounded-lg ${getBackgroundColorClass(data?.types)}`}>
                        <img src={data?.image} alt={data?.name} className="w-96 h-96" />
                    </div>
                </div>
                
            </div>
        </div>
    )
}