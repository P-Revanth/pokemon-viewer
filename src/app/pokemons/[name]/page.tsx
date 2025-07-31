"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import BackButton from "@/components/backbtn";
import ProgressBar from "@/components/progressBar";

export default function PokemonDetails({ params }: { params: Promise<{ name: string }> }) {
    const [data, setData] = useState<any>(null);
    const { name } = use(params);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<string>('Forms');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

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
                <div className="flex flex-col h-full w-1/3 gap-4">
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
                <div className="flex flex-col w-2/3 p-4 mt-30"> {/* Increased max-w for tabs area */}
                    <div className="flex justify-center w-full"> {/* Centered tabs */}
                        <ul className="flex flex-wrap gap-15 text-lg font-semibold items-center justify-center w-full p-4">
                            {['Abilities', 'Details', 'Stats', 'Moves'].map((tabName) => (
                                <li
                                    key={tabName}
                                    className={`flex-shrink-0 cursor-pointer pb-2 transition-colors duration-200
                                    ${activeTab === tabName ? 'border-b-4 border-white text-white' : 'text-gray-300 hover:text-white'}`
                                    }
                                    onClick={() => handleTabClick(tabName)}
                                >
                                    {tabName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full h-full p-10 bg-white mt-4 min-h-[300px] text-lg">
                        {activeTab === 'Abilities' && (
                            <div>
                                <h2 className="text-4xl font-bold mb-4">Abilities</h2>
                                {data?.abilities && data.abilities.length > 0 ? (
                                    data.abilities.map((ability: any) => (
                                        <p key={ability.ability.name} className="capitalize mb-1">{ability.ability.name}</p>
                                    ))
                                ) : (
                                    <p>No specific ability data available for {data?.name}.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'Details' && (
                            <div>
                                <h2 className="text-4xl font-bold mb-4">Details</h2>
                                <p className="mb-1">Height: {data?.height / 10} m</p>
                                <p className="mb-1">Weight: {data?.weight / 10} kg</p>
                                <p className="mb-1">Base Experience: {data?.base_experience}</p>
                                <p className="capitalize mb-1">Species: {data?.species?.name}</p>
                                <p className="mb-1">Order: {data?.order}</p>
                            </div>
                        )}

                        {activeTab === 'Stats' && (
                            <div className="flex flex-col h-full pr-15 pl-15">
                                <h2 className="text-4xl font-bold mb-6">Base Stats</h2>
                                {data?.stats && data.stats.length > 0 ? (
                                    data.stats.map((statInfo: any) => (
                                        <ProgressBar
                                            key={statInfo.stat.name}
                                            label={statInfo.stat.name}
                                            value={statInfo.base_stat}
                                        />
                                    ))
                                ) : (
                                    <p>No stat data available for {data?.name}.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'Moves' && (
                            <div className="flex flex-col h-full pr-15 pl-15">
                                <h2 className="text-4xl font-bold mb-6">Moves</h2>
                                {data?.moves && data.moves.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full items-center justify-center">
                                        {data.moves.slice(0, 20).map((moveInfo: any) => (
                                            <p key={moveInfo.move.name} className="capitalize text-md border border-gray-400 rounded-full text-center p-2">{moveInfo.move.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No move data available for {data?.name}.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}