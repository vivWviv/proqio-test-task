import React, { useState } from 'react';

import { PokemonType } from '../../types/types';
import { firstLetterCapitalize } from '../../helpers/string';
import { POKEMON_API } from '../../api/api';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface PokemonFilterProps {
  setFilteredPokemonList: React.Dispatch<React.SetStateAction<PokemonType[]>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filterList: string[];
  fetchPokemonList: () => void;
}

const Filter: React.FC<PokemonFilterProps> = ({
  setFilteredPokemonList,
  filter,
  setFilter,
  filterList,
  fetchPokemonList,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClearFilter = async () => {
    setFilter('');

    fetchPokemonList();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const extractPokemonObjects = (data: Array<any>) => {
    const result: Array<PokemonType> = [];

    for (const item of data) {
      if (item.hasOwnProperty('pokemon')) {
        const pokemonObj: PokemonType = item.pokemon;
        result.push(pokemonObj);
      }
    }

    return result;
  };

  const handleOptionClick = async (type: string) => {
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
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <div className="text-gray-900">
              {filter ? firstLetterCapitalize(filter) : 'Filter by'}
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-0 left-24 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
              {filterList.map(type => (
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
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 focus:outline-none w-fit flex-nowrap"
          onClick={handleClearFilter}
        >
          <span className="whitespace-nowrap">Clear Filter</span>
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Filter;
