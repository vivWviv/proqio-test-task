import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Select from './Select/Select';
import ImageModal from './Select/ImageModal';
import { POKEMON_TYPES_LIST } from '../constants/constants';

import { InformationCircleIcon } from '@heroicons/react/24/solid';

const PokemonSelect = () => {
  const methods = useFormContext();

  const {
    formState: { errors },
  } = methods;

  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [selectedPokemonSprite, setSelectedPokemonSprite] = useState('');

  return (
    <>
      <div className="mb-2 flex items-center gap-1 relative">
        Pokemon
        <InformationCircleIcon
          className="fill-gray-600 h-4 w-4 cursor-pointer"
          onMouseEnter={() => setIsToolTipVisible(true)}
          onMouseLeave={() => setIsToolTipVisible(false)}
        />
        {isToolTipVisible && (
          <div className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap top-[-45px]">
            You have to choose 4 pokemons
          </div>
        )}
      </div>
      <Select
        filterList={POKEMON_TYPES_LIST}
        name="pokemon"
        placeholder="Select a pokemon"
        onOptionInInputClick={(url: string) => setSelectedPokemonSprite(url)}
      />
      <p
        className={`${
          errors.pokemon ? 'text-red-500' : 'text-gray-500'
        } text-sm mt-2`}
      >
        {errors.pokemon
          ? errors.pokemon.message!.toString()
          : 'Pokemons is required'}
      </p>
      {selectedPokemonSprite && (
        <ImageModal
          closeModal={() => setSelectedPokemonSprite('')}
          image={selectedPokemonSprite}
        />
      )}
    </>
  );
};

export default PokemonSelect;
