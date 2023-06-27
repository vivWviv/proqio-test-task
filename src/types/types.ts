export interface PokemonType {
    name: string;
    url:string;
}

export interface FormData {
    name: string;
    surname: string;
    pokemon: PokemonType[];

}