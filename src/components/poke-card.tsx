import { types } from "util";
import Link from "next/link";

type PokemonCardProps = {
    name: string;
    image: string;
    types?: string[];

};

export const typeBackgroundColors: Record<string, string> = {
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

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
    return (
        <div className="group h-65 flex flex-col items-center justify-evenly p-4 gap-2 bg-white rounded-2xl cursor-pointer hover:transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg font-bold text-black">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <img src={image} alt={name} className="w-30 h-30" />
            <div className="flex items-center justify-center gap-2 mt-4">
                {types && types.map((type, index) => (
                    <span key={index} className={`p-1 pr-6 pl-6 text-sm text-black font-bold border-1 rounded-full ${typeBackgroundColors[type] || "bg-gray-500"}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                ))}
            </div>
            <div className="absolute h-full w-full hidden group-hover:block p-2 rounded-2xl cursor-pointer"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    opacity: 0.92,
                }}>
                <Link href={`/pokemons/${name}`} className="text-white text-lg font-semibold flex items-center justify-center h-full w-full">
                    <div className="flex h-full w-full items-center justify-center">
                        <img src="/images/pokeball.svg" alt="Pokeball" className="w-8 h-8" />
                    </div>
                </Link>
            </div>
        </div>
    );
}