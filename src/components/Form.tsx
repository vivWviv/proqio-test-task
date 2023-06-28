import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import InputField from './InputField';
import Select from './Select/Select';
import { ExtendedPokemonType, FormData, PokemonType } from '../types/types';
import {
  BASE_SPRITE_LINK,
  POKEMON_LIMIT,
  POKEMON_TYPES_LIST,
} from '../constants/constants';
import Button from './Button';
import { POKEMON_API } from '../api/api';
import { getPokemonIdFromLink } from '../helpers/string';
import ImageModal from './Select/ImageModal';

interface FormProps {
  submitForm: (data: FormData) => void;
  closeModal: () => void;
}

const Form: React.FC<FormProps> = ({ submitForm, closeModal }) => {
  const methods = useForm<FormData>();
  const { handleSubmit, register, setValue, watch } = methods;

  const [pokemonList, setPokemonList] = useState<ExtendedPokemonType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemonSprite, setSelectedPokemonSprite] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const getUpdatedPokemonList = (arr: PokemonType[]): ExtendedPokemonType[] => {
    return arr.map((pokemon: PokemonType) => {
      return { name: pokemon.name, value: pokemon };
    });
  };

  const fetchPokemonList = async () => {
    setIsLoading(true);

    const res = await POKEMON_API.getPokemons(POKEMON_LIMIT);
    const updatedPokemonList = getUpdatedPokemonList(res);

    setHasMore(res.length === POKEMON_LIMIT);
    setPokemonList(updatedPokemonList);
    setIsLoading(false);
  };

  const handlePokemonSelect = (pokemon: ExtendedPokemonType) => {
    const id = getPokemonIdFromLink(pokemon.value.url as string);

    const newPokemon = {
      ...pokemon,
      value: {
        ...pokemon.value,
        url: BASE_SPRITE_LINK + id + '.png',
      },
    };

    setValue('pokemon', [...watch('pokemon'), newPokemon]);
  };

  const handleNext = useCallback(async () => {
    setIsLoading(true);

    const offset = pokemonList.length;
    const res = await POKEMON_API.getPokemons(POKEMON_LIMIT, offset);
    const updatedPokemonList = getUpdatedPokemonList(res);

    setHasMore(updatedPokemonList.length === POKEMON_LIMIT);
    setPokemonList(prev => [...prev, ...updatedPokemonList]);
    setIsLoading(false);
  }, [pokemonList.length]);

  const onPokemonNameClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    pokemon: ExtendedPokemonType
  ) => {
    e.stopPropagation();
    setSelectedPokemonSprite(pokemon.value.url);
  };

  const onSubmit = ({ name, surname, pokemon }: FormData) => {
    const updatedData = {
      name: name.trim(),
      surname: surname.trim(),
      pokemon,
    };

    submitForm(updatedData);
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

  const onFilterOptionClick = async () => {
    const res = await POKEMON_API.getPokemonsByType(filter);
    console.log(res);
    const pokemons = extractPokemonObjects(res);
    const updatedPokemonList = getUpdatedPokemonList(pokemons);
    setPokemonList(updatedPokemonList);
  };

  const handleSetFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="max-w-md mx-auto mt-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField label="Name" name="name" />
          <InputField label="Surname" name="surname" />

          <Select
            tooltipInfo={'There must be 4 pokemon'}
            label="Pokemon"
            helpfultext="Pokemon field is required"
            name={'pokemon'}
            options={pokemonList}
            onOptionClick={handlePokemonSelect}
            placeholder="Select Pokemon"
            onSelectedOptionClick={onPokemonNameClick}
            register={register('pokemon', {
              validate: value =>
                value?.length === 4 || 'There must be 4 pokemon selected',
            })}
            filterOptions={{
              filterList: POKEMON_TYPES_LIST,
              filter,
              setFilter: handleSetFilter,
              onFilterOptionClick,
            }}
            async={{
              hasMore: hasMore,
              isLoading: isLoading,
              onLoadMore: handleNext,
            }}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
      {selectedPokemonSprite && (
        <ImageModal
          closeModal={() => setSelectedPokemonSprite('')}
          image={selectedPokemonSprite}
        />
      )}
    </>
  );
};

export default Form;
