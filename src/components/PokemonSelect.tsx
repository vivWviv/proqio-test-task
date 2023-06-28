import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import Select from "./Select/Select";
import ImageModal from "./Select/ImageModal";
import {
  BASE_SPRITE_LINK,
  POKEMON_LIMIT,
  POKEMON_TYPES_LIST,
} from "../constants/constants";

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { PokemonType } from "../types/types";
import { POKEMON_API } from "../api/api";
import { getPokemonIdFromLink } from "../helpers/string";

const PokemonSelect = () => {
  const methods = useFormContext();

  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = methods;

  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [selectedPokemonSprite, setSelectedPokemonSprite] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    setIsLoading(true);

    const res: PokemonType[] = await POKEMON_API.getPokemons(POKEMON_LIMIT);

    setHasMore(res.length === POKEMON_LIMIT);
    setPokemonList(res);
    setIsLoading(false);
  };

  const handlePokemonSelect = async (pokemon: PokemonType) => {
    const id = getPokemonIdFromLink(pokemon.url as string);

    const newPokemon = {
      ...pokemon,
      imageUrl: BASE_SPRITE_LINK + id + ".png",
    };

    setValue("pokemon", [...(watch("pokemon") || []), newPokemon]);
  };

  const handleNext = useCallback(async () => {
    setIsLoading(true);

    const offset = pokemonList.length;
    const res: PokemonType[] = await POKEMON_API.getPokemons(
      POKEMON_LIMIT,
      offset
    );

    setHasMore(res.length === POKEMON_LIMIT);
    setPokemonList((prev) => [...prev, ...res]);
    setIsLoading(false);
  }, [pokemonList.length]);

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
        register={register("pokemon", {
          validate: (value) =>
            value?.length === 4 || "There must be 4 Pokémon selected",
        })}
        placeholder="Select a pokemon"
        onOptionInputClick={(url: string) => setSelectedPokemonSprite(url)}
        maxSelected={4}
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
