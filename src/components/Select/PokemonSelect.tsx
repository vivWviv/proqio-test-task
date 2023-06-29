import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import Select from "./Select";
import { ImageModal } from "../Modal";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { POKEMON_LIMIT, POKEMON_TYPES_LIST } from "../../constants/constants";
import { OptionsType, PokemonType } from "../../types/types";
import { POKEMON_API } from "../../api/api";
import { createPokemonsOptions } from "../../helpers/pokemon";

const PokemonSelect = () => {
  const methods = useFormContext();

  const {
    formState: { errors },
    register,
  } = methods;

  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [pokemonList, setPokemonList] = useState<OptionsType[]>([]);
  const [selectedPokemonSprite, setSelectedPokemonSprite] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    setFilter("");

    const res: PokemonType[] = await POKEMON_API.getPokemons(POKEMON_LIMIT);
    const optionsList = createPokemonsOptions(res);

    setHasMore(optionsList.length === POKEMON_LIMIT);
    setPokemonList(optionsList);
    setIsLoading(false);
  };

  const extractPokemonObjects = (data: Array<any>) => {
    const result: Array<PokemonType> = [];

    for (const item of data) {
      if (item.hasOwnProperty("pokemon")) {
        const pokemonObj: PokemonType = item.pokemon;
        result.push(pokemonObj);
      }
    }

    return result;
  };

  const handleOnFilterSelect = async (type: string) => {
    const res = await POKEMON_API.getPokemonsByType(type);
    const pokemons = extractPokemonObjects(res);
    const optionsList = createPokemonsOptions(pokemons);
    setFilter(type);

    setPokemonList(optionsList);
  };

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
        options={pokemonList}
        {...register("pokemon", {
          validate: (value) =>
            value?.length === 4 || "There must be 4 Pokemon selected",
        })}
        limit={4}
        isLoading={isLoading}
        placeholder="Select a pokemon"
        onSelectedOptionClick={(e, { value }) =>
          setSelectedPokemonSprite(value)
        }
      />
      <p
        className={`${
          errors.pokemon ? "text-red-500" : "text-gray-500"
        } text-sm mt-2`}
      >
        {errors.pokemon
          ? errors.pokemon.message!.toString()
          : "Pokemons is required"}
      </p>
      {selectedPokemonSprite && (
        <ImageModal
          closeModal={() => setSelectedPokemonSprite("")}
          image={selectedPokemonSprite}
        />
      )}
    </>
  );
};

export default PokemonSelect;
