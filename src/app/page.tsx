"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (name.trim() !== "") {
      localStorage.setItem("name", name);
      router.push("/pokemons");
    } else {
      setError("Please enter your name.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center ml-15 gap-4 h-full">
        <img src="/images/pokemon-logo.png" alt="logo" className="absolute w-70 h-40 top-0 left-0" />
        <h1 className="text-4xl font-bold">Spearows, Do You Know Who I am?</h1>
        <input
          required
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-md border-1 font-semibold border-gray-300 rounded-md p-3 pr-4 pl-4 w-2/3" />
        {error && <p className="text-red-500"><sup className="font-bold">*</sup>{error}</p>}
        <div className="flex items-center justify-center border-1 p-2 border-gray-300 rounded-full bg-[#642665] hover:bg-[#7a2e7a] transition-colors cursor-pointer w-2/7" onClick={handleClick}>
          <img src="/images/pokeball.svg" alt="Pokeball" className="w-8 h-8" />
          <button className="text-white p-2 cursor-pointer" id="discover-button" onClick={handleClick}>
            DISCOVER
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 p-15 pr-0 h-full flex-shrink-0">
        <img src="/images/home-bg-pokemon.jpg" alt="Spearow" className="w-fit h-full object-cover rounded-l-full" />
      </div>
    </div>
  );
}