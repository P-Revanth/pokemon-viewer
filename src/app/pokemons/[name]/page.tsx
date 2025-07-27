"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";

export default function PokemonDetails({ params }: { params: Promise<{ name: string }> }) {
    const [data, setData] = useState<any>(null);
    const { name } = use(params);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // This effect can be used to fetch additional details if needed
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon details");
                }
                const data = await response.json();
                setData(data);
                console.log("Pokemon Details:", data);
            } catch (error) {
                console.error("Error fetching pokemon details:", error);
            }
        };
        fetchPokemonDetails();
    }, [name]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Details for {data?.name}</h1>
        </div>
    )
}
