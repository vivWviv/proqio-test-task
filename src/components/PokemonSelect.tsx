import React, { useState, useEffect, useCallback, useRef } from 'react';

import InfiniteScroll from './InfiniteScroll';

import {
    XMarkIcon,
    ChevronDownIcon,
    InformationCircleIcon
} from '@heroicons/react/24/solid';
import { firstLetterCapitalize } from '../helpers/string';
import { useFormContext } from 'react-hook-form';
import {POKEMON_API} from "../api/api";

interface Pokemon {
    name: string;
    url: string;
}

const POKEMON_LIMIT = 10;

const PokemonSelect: React.FC = () => {
    const methods = useFormContext();

    const {
        formState: { errors },
        setValue,
    } = methods;

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMaxSelected, setIsMaxSelected] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isToolTipVisible, setIsToolTipVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMaxSelected(selectedPokemon.length >= 4);
        setValue(
            'pokemon',
            selectedPokemon.map((pokemon) => pokemon.name)
        );
    }, [selectedPokemon, setValue]);

    useEffect(() => {
        const fetchPokemonList = async () => {
                setIsLoading(true);

                const results = await POKEMON_API.getPokemons(POKEMON_LIMIT);

                setHasMore(results.length === POKEMON_LIMIT);
                setPokemonList(results);
                setFilteredPokemonList(results);
                setIsLoading(false);
        };

        fetchPokemonList();
    }, []);

    useEffect(() => {
        setIsMaxSelected(selectedPokemon.length >= 4);
    }, [selectedPokemon]);

    const handlePokemonSelect = (pokemon: Pokemon) => {
        if (isMaxSelected) {
            return;
        }

        setSelectedPokemon((prevSelectedPokemon) => [...prevSelectedPokemon, pokemon]);
        setIsDropdownVisible(false);
    };

    const handleRemovePokemon = useCallback(
        (pokemon: Pokemon) => {
            setSelectedPokemon((prevSelectedPokemon) =>
                prevSelectedPokemon.filter((p) => p.name !== pokemon.name)
            );
        },
        []
    );

    const handleInputClick = () => {
        if (isMaxSelected) {
            return;
        }
        setIsDropdownVisible((prev) => !prev);
    };

    const handleNext = useCallback(async () => {
            setIsLoading(true);

            const offset = pokemonList.length;
            const results = await POKEMON_API.getPokemons(POKEMON_LIMIT, offset);

            setHasMore(results.length === POKEMON_LIMIT);
            setPokemonList((prevPokemonList) => [...prevPokemonList, ...results]);
            setFilteredPokemonList((prevFilteredPokemonList) => [...prevFilteredPokemonList, ...results]);
            setIsLoading(false);
    }, [pokemonList.length]);

    const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const container = e.currentTarget;
        const scrollAmount = e.deltaY;
        container.scrollLeft += scrollAmount;
    };

    return (
        <div className="relative">
            <select
                className="absolute hidden"
                multiple
                {...methods.register('pokemon', {
                    validate: (value) => value.length === 4 || 'There must be 4 pokemon selected',
                })}
            >
                {pokemonList.map((item) => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <p className="mb-2 flex items-center gap-1 relative">
                Pokemon
                <InformationCircleIcon
                    className="fill-gray-600 h-4 w-4 cursor-pointer"
                    onMouseEnter={() => setIsToolTipVisible(true)}
                    onMouseLeave={() => setIsToolTipVisible(false)}
                />
                {isToolTipVisible && (
                    <div className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap top-[-45px]">
                        {'You have to choose 4 pokemons'}
                    </div>
                )}
            </p>

            <div>
                <div
                    className="w-full rounded-md text-gray-400 border border-gray-300 cursor-pointer px-3 py-2 flex items-center justify-between bg-white focus:outline-none focus:border-blue-500 hover:border-blue-500"
                    onClick={handleInputClick}
                    tabIndex={0}
                >
                    {selectedPokemon.length ? (
                        <div className="flex gap-1 hide-scrollbar overflow-x-scroll" onWheel={(e) => handleWheelScroll(e)}>
                            {selectedPokemon.map((pokemon) => (
                                <div
                                    key={pokemon.name}
                                    className="flex items-center space-x-1 text-sm text-black bg-gray-100 rounded-xl py-0.5 px-2.5"
                                >
                                    <span>{firstLetterCapitalize(pokemon.name)}</span>
                                    <button onClick={() => handleRemovePokemon(pokemon)} className="text-gray-200 bold-svg">
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        'Select a Pokemon'
                    )}
                    <div className="flex items-center gap-1.5 p-1">
                        <div className="h-4 w-4">
                            {selectedPokemon.length > 0 && (
                                <XMarkIcon className="h-4 w-4 bold-svg" onClick={() => setSelectedPokemon([])} />
                            )}
                        </div>
                        <ChevronDownIcon className="h-4 w-4 bold-svg" />
                    </div>
                </div>
            </div>

            {isDropdownVisible && (
                <div ref={dropdownRef} className="mt-2 absolute z-10 bg-white w-full border border-gray-300 rounded-md shadow-lg">
                    <InfiniteScroll
                        isLoading={isLoading}
                        height={filteredPokemonList.length < 5 ? 'fit-content' : 'calc(100vh - 500px)'}
                        hasMore={hasMore}
                        next={handleNext}
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
                                            {firstLetterCapitalize(pokemon.name)}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </InfiniteScroll>
                </div>
            )}

            <p className={`${errors.pokemon ? 'text-red-500' : 'text-gray-500'} text-sm mt-2`}>
                {errors.pokemon ? `There must be 4 pokemon selected` : 'Pokemons is required'}
            </p>
        </div>
    );
};

export default PokemonSelect;
