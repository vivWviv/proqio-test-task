export function firstLetterCapitalize(string: string | undefined): string {
  if (!string) return '';
  const firstChar = string.charAt(0).toUpperCase();
  const restOfString = string.slice(1);
  return firstChar + restOfString;
}

export const getPokemonIdFromLink = (link: string): string => {
  const splittedLink = link.split('/');
  return splittedLink[splittedLink.length - 2];
};
