export interface PokemonType {
  name: string;
  url: string;
}

export interface OptionsType {
  label: string;
  value?: string | number | readonly string[];
}

export interface FormData {
  name: string;
  surname: string;
  pokemon: OptionsType[];
}
