"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import PokemonCard from "@/components/poke-card";
import Link from "next/link";

export default function Pokemons() {
    const [pokemonName, setPokemonName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [pokemonData, setPokemonData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 100;
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem("name");
        setName(name || "");
        if (!name) {
            router.push("/");
        }

        const fetchPokemonData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000");
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemons");
                }
                const data = await response.json();
                const pokemonNames = data.results.map((pokemon: { name: string }) => pokemon.name);
                const pokemonDetails = await Promise.all(
                    pokemonNames.map(async (name: string) => {
                        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        if (!pokemonResponse.ok) {
                            throw new Error(`Failed to fetch details for ${name}`);
                        }
                        const pokemonData = await pokemonResponse.json();
                        // console.log(`Details for ${name}:`, pokemonData);
                        const pokeImage = pokemonData.sprites.other['official-artwork'].front_default ||
                            pokemonData.sprites.front_default ||
                            `https://img.pokemondb.net/artwork/${name}.jpg`;
                        // console.log(`Image for ${name}:`, pokeImage);
                        return {
                            name: pokemonData.name,
                            image: pokeImage,
                            types: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
                        };
                    })
                );
                setPokemonData(pokemonDetails);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
                setError("Failed to load pokemons. Please try again later.");
                setLoading(false);
            }
        }

        fetchPokemonData();
    }, []);

    const lastPokemonIndex = currentPage * itemsPerPage;
    const firstPokemonIndex = lastPokemonIndex - itemsPerPage;
    const currentPokemons = useMemo(() => {
        return pokemonData.slice(firstPokemonIndex, lastPokemonIndex);
    }, [pokemonData, firstPokemonIndex, lastPokemonIndex]);
    const totalPages = Math.ceil(pokemonData.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // e.g., show 5 page numbers at a time
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 z-50 flex items-center justify-between pt-0 w-full h-fit bg-black p-4 pb-0">
                <img src="/images/pokemon-logo.png" alt="Pokemon Logo" className="w-70 h-fit" />
                <div className="flex items-center justify-center w-full gap-4">
                    <img src="/images/pokeball.svg" alt="Pokeball" className="w-12 h-12" />
                    <div className="flex items-center w-2/3 border-1 border-white rounded-lg p-3 pr-4">
                        <img src="/images/search.svg" alt="Search" className="w-8 h-8" />
                        <input
                            type="text"
                            value={pokemonName}
                            onChange={(e) => setPokemonName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    if (pokemonName.trim() !== "" || pokemonData.length > 0) {
                                        const filteredPokemon = pokemonData.filter(pokemon =>
                                            pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()) ||
                                            (pokemon.types && pokemon.types.some((type: string) => type.toLowerCase().includes(pokemonName.toLowerCase())))
                                        );
                                        setPokemonData(filteredPokemon);
                                    } else {
                                        setError("Please enter a Pokemon name.");
                                    }
                                }
                            }}
                            required
                            placeholder="Search by pokemon name or type"
                            className="text-md font-semibold pr-4 pl-4 w-2/3 border-none outline-none bg-transparent text-white"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full p-4 pt-40">
                <div className="flex items-center">
                    <img src="/images/welcome-mascot.png" alt="pikachu" className="w-30 h-30" />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold">Welcome master, {name}</h1>
                        <p className="text-lg">This page displays a list of Pokemon.</p>
                    </div>
                </div>
                {loading && <p className="text-3xl w-full justify-center items-center">Loading...</p>}
                <div className="flex items-center justify-center w-full h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-20 pt-10 w-full h-full">
                        {currentPokemons && currentPokemons.map((pokemon: { name: string; image: string; types?: string[] }) => (
                            <PokemonCard
                                key={pokemon.name}
                                name={pokemon.name}
                                image={pokemon.image}
                                types={pokemon.types}
                            />
                        ))}
                    </div>
                </div>
                {!loading && !error && totalPages > 1 && (
                    <nav className="mb-4"> {/* Increased top margin for spacing from cards */}
                        <ul className="flex items-center space-x-2">
                            <li>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600"
                                >
                                    Previous
                                </button>
                            </li>
                            {getPageNumbers().map((number, index) => (
                                <li key={index}>
                                    {number === '...' ? (
                                        <span className="px-2 py-2 text-gray-600">...</span>
                                    ) : (
                                        <button
                                            onClick={() => paginate(Number(number))}
                                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === number ? 'bg-blue-700 text-white' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    )}
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}