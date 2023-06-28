export interface PokemonType {
  name: string;
  url: string;
}

export interface ExtendedPokemonType {
  name: string;
  value: PokemonType;
}

export interface FormData {
  name: string;
  surname: string;
  pokemon: ExtendedPokemonType[];
}
