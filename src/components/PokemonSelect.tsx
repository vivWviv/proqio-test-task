import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface Pokemon {
    name: string;
    url: string;
}

const PokemonSelect: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMaxSelected, setIsMaxSelected] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
                const data = response.data.results;
                setPokemonList(data);
                setFilteredPokemonList(data);
            } catch (error) {
                console.error('Failed to fetch Pokemon list:', error);
            }
        };

        fetchPokemonList();
    }, []);

    useEffect(() => {
        setIsMaxSelected(selectedPokemon.length >= 4);
    }, [selectedPokemon]);

    const filterPokemonList = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredPokemonList(pokemonList);
        } else {
            const filteredList = pokemonList.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(searchTerm);
            });
            setFilteredPokemonList(filteredList);
        }
    };

    const handlePokemonSelect = (pokemon: Pokemon) => {
        if (selectedPokemon.length >= 4) {
            return;
        }

        if (!selectedPokemon.some((p) => p.name === pokemon.name)) {
            setSelectedPokemon((prevSelectedPokemon) => [...prevSelectedPokemon, pokemon]);
            setInputValue('');
            filterPokemonList('');
            setIsDropdownVisible(false);
        }
    };

    const handleRemovePokemon = useCallback((pokemon: Pokemon) => {
        setSelectedPokemon((prevSelectedPokemon) =>
            prevSelectedPokemon.filter((p) => p.name !== pokemon.name)
        );
    }, []);

    const handleInputClick = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    return (
        <div className="relative">
            <div className="mt-2">
                <div
                    className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 cursor-pointer px-3 py-2"
                    onClick={handleInputClick}
                >
                    {selectedPokemon.length > 0 ? (
                        <div className="flex space-x-2 overflow-x-auto">
                            {selectedPokemon.map((pokemon) => (
                                <div
                                    key={pokemon.name}
                                    className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-md"
                                >
                                    <span>{pokemon.name}</span>
                                    <button
                                        onClick={() => handleRemovePokemon(pokemon)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        inputValue || 'Search Pokemon'
                    )}
                </div>
            </div>
            {isDropdownVisible && (
                <div
                    ref={dropdownRef}
                    className="mt-2 absolute z-10 bg-white w-full border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                >
                    <ul>
                        {filteredPokemonList.map((pokemon) => {
                            if (!selectedPokemon.some((p) => p.name === pokemon.name)) {
                                return (
                                    <li
                                        key={pokemon.name}
                                        onClick={() => handlePokemonSelect(pokemon)}
                                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                                    >
                                        {pokemon.name}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            )}
            {isMaxSelected && (
                <p className="text-red-500 mt-2">Maximum selection limit (4) reached</p>
            )}
        </div>
    );
};

export default PokemonSelect;
