import React, { useState } from 'react';

import { PokemonType } from '../types/types';
import {firstLetterCapitalize} from "../helpers/string";
import {POKEMON_API} from "../api/api";
import {POKEMON_LIMIT} from "./PokemonSelect";

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface PokemonFilterProps {
    setFilteredPokemonList: React.Dispatch<React.SetStateAction<PokemonType[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const pokemonTypes: string[] = [
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
];

const PokemonFilter: React.FC<PokemonFilterProps> = ({ setFilteredPokemonList, filter, setFilter }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleClearFilter = async() => {
        setFilter('');

        const res = await POKEMON_API.getPokemons(POKEMON_LIMIT);
        setFilteredPokemonList(res);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prev=> !prev);
    };

    const extractPokemonObjects = (data: Array<any>)=> {
        const result: Array<PokemonType> = [];

        for (const item of data) {
            if (item.hasOwnProperty('pokemon')) {
                const pokemonObj: PokemonType = item.pokemon;
                result.push(pokemonObj);
            }
        }

        return result;
    }

    const handleOptionClick = async(type: string) => {
        setFilter(type);
        const res = await POKEMON_API.getPokemonsByType(type);
        const pokemons = extractPokemonObjects(res);
        setFilteredPokemonList(pokemons);

        setIsDropdownOpen(false);
    };

    return (
        <div className="relative flex items-center justify-between px-2">

            <div className="relative w-full">
                <div className="py-2 pr-8 bg-transparent focus:outline-none ">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={handleDropdownToggle}>
                    <div className="text-gray-900">{filter ? firstLetterCapitalize(filter) : 'Filter by'}</div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-0 left-24 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                            {pokemonTypes.map((type) => (
                                <div
                                    key={type}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleOptionClick(type)}
                                >
                                    {firstLetterCapitalize(type)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {filter && (
                    <button
                        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none w-40 md:w-70"
                        onClick={handleClearFilter}
                    >
                        <span>Clear Filter</span>
                        <XMarkIcon className="w-4 h-4" />
                    </button>
            )}
        </div>
    );
};

export default PokemonFilter;
