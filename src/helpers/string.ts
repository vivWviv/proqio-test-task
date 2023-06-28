import { BASE_SPRITE_LINK } from "../constants/constants";

export function firstLetterCapitalize(string: string | undefined): string {
  if (!string) return "";
  const firstChar = string.charAt(0).toUpperCase();
  const restOfString = string.slice(1);
  return firstChar + restOfString;
}

export const getPokemonSpriteUrl = (link: string): string => {
  const splittedLink = link.split("/");
  const id = splittedLink[splittedLink.length - 2];
  return BASE_SPRITE_LINK + id + ".png";
};
