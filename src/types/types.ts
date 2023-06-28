export interface PokemonType {
  name: string;
  imageUrl: string;
  url?: string;
}

export interface FormData {
  name: string;
  surname: string;
  pokemon: PokemonType[];
}

export interface OptionsType {
  label: string;
  value?: string | number | readonly string[];
}
