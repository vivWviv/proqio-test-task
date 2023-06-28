import React, { useState, useEffect, useCallback, useRef } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

import InfiniteScroll from "./InfiniteScroll";

import {
  firstLetterCapitalize,
  getPokemonIdFromLink,
} from "../../helpers/string";
import { POKEMON_API } from "../../api/api";
import { OptionsType, PokemonType } from "../../types/types";
import Filter from "./Filter";
import { POKEMON_LIMIT } from "../../constants/constants";
import { BASE_SPRITE_LINK } from "../../constants/constants";

import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export interface PokemonSelectProps {
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  maxSelected?: number;
  filterList?: string[];
  dropDownHeight?: string;
  options?: OptionsType[];
  disabled?: boolean;
  onOptionInputClick?: (value: string) => void;
  isError?: boolean;

  async?: {
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
  };
  onOptionClick?: (options: OptionsType[]) => void;
  onSelectedOptionClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option: OptionsType
  ) => void;
  onRemoveOptionClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: OptionsType
  ) => void;
}

const Select: React.FC<PokemonSelectProps> = ({
  name,
  filterList = [],
  dropDownHeight,
  placeholder,
  options,
  register,
  disabled,
  onOptionInputClick,
  maxSelected,
  isError,
}) => {
  const methods = useFormContext();

  const {
    watch,
    formState: { errors },
    setValue,
  } = methods;

  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMaxSelected = () => {
    if (maxSelected) {
      return watch(name)?.length >= maxSelected;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const handleDropdownOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleDropdownOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleDropdownOutsideClick);
    };
  }, []);

  const fetchPokemonList = async () => {
    setIsLoading(true);

    const res = await POKEMON_API.getPokemons(POKEMON_LIMIT);

    setHasMore(res.length === POKEMON_LIMIT);
    setPokemonList(res);
    setIsLoading(false);
  };

  const handlePokemonSelect = async (pokemon: PokemonType) => {
    if (isMaxSelected()) return;
    const id = getPokemonIdFromLink(pokemon.url as string);

    const newPokemon = {
      ...pokemon,
      imageUrl: BASE_SPRITE_LINK + id + ".png",
    };

    setValue(name, [...(watch(name) || []), newPokemon]);
    setIsDropdownVisible(false);
  };

  const handleRemovePokemon = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      pokemon: PokemonType
    ) => {
      const currentSelectedPokemonList = watch(name) || [];
      setValue(
        name,
        currentSelectedPokemonList.filter(
          (p: PokemonType) => p.name !== pokemon.name
        ),
        { shouldValidate: true }
      );
    },
    [watch, setValue, name]
  );

  const handleInputClick = () => {
    if (isMaxSelected()) return;

    setIsDropdownVisible((prev) => !prev);
  };

  const handleNext = useCallback(async () => {
    setIsLoading(true);

    const offset = pokemonList.length;
    const res = await POKEMON_API.getPokemons(POKEMON_LIMIT, offset);

    setHasMore(res.length === POKEMON_LIMIT);
    setPokemonList((prev) => [...prev, ...res]);
    setIsLoading(false);
  }, [pokemonList.length]);

  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget;
    const scrollAmount = e.deltaY;
    container.scrollLeft += scrollAmount;
  };

  const onPokemonNameClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    pokemon: PokemonType
  ) => {
    e.stopPropagation();
    if (onOptionInputClick) onOptionInputClick(pokemon.imageUrl);
  };

  return (
    <>
      <div className="relative">
        <select className="absolute hidden" multiple {...register}>
          {options
            ? options.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))
            : watch(name)?.map((item: PokemonType) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
        </select>
        <div
          className={`w-full rounded-md cursor-pointer px-3 py-2 border flex items-center justify-between ${
            isError || errors[name] ? "show-error-outline" : "show-outline"
          } ${
            disabled
              ? "bg-[#F0F2FE] pointer-events-none border-[#EBEDFD] text-[#CDD2FA]"
              : "text-gray-400 bg-white border-gray-300"
          }`}
          onClick={handleInputClick}
          tabIndex={0}
        >
          {watch(name)?.length ? (
            <div
              className="flex gap-1 hide-scrollbar overflow-x-scroll"
              onWheel={(e) => handleWheelScroll(e)}
            >
              {watch(name)?.map((pokemon: PokemonType) => (
                <div
                  key={pokemon.name}
                  className="flex items-center space-x-1 text-sm text-black bg-gray-100 rounded-xl py-0.5 px-2.5"
                >
                  <span
                    onClick={(e) => onPokemonNameClick(e, pokemon)}
                    className="whitespace-nowrap"
                  >
                    {firstLetterCapitalize(pokemon.name)}
                  </span>
                  <button
                    onClick={(e) => handleRemovePokemon(e, pokemon)}
                    className="mt-0.5"
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            placeholder
          )}
          <div className="flex items-center gap-1.5 p-1">
            <div className="h-4 w-4">
              {watch(name)?.length > 0 && (
                <XMarkIcon
                  className="h-4 w-4"
                  onClick={() => setValue(name, [])}
                  stroke={"black"}
                />
              )}
            </div>
            <ChevronDownIcon
              className="h-4 w-4"
              stroke={disabled ? "#CDD2FA" : "black"}
            />
          </div>
        </div>

        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="mt-2 p-2 absolute z-10 bg-white w-full border border-gray-300 rounded-md shadow-lg"
          >
            {filterList.length > 0 && (
              <div>
                <Filter
                  setFilteredPokemonList={setPokemonList}
                  filter={filter}
                  setFilter={setFilter}
                  filterList={filterList}
                  fetchPokemonList={fetchPokemonList}
                />
              </div>
            )}
            <InfiniteScroll
              isLoading={isLoading}
              height={
                dropDownHeight ||
                (pokemonList.length < 5 ? "fit-content" : "calc(100vh - 580px)")
              }
              hasMore={hasMore}
              next={handleNext}
            >
              <ul>
                {pokemonList.map((pokemon) => {
                  if (
                    !watch(name)?.some(
                      (p: PokemonType) => p.name === pokemon.name
                    )
                  ) {
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
      </div>
    </>
  );
};

export default Select;
