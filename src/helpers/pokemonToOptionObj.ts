import { getPokemonSpriteUrl } from "./string";
import { PokemonType } from "../types/types";

export const pokemonToOptionObj = (pokemonList: PokemonType[]) =>
  pokemonList.map((el) => {
    const spriteUrl = getPokemonSpriteUrl(el.url);

    return {
      label: el.name,
      value: spriteUrl,
    };
  });
