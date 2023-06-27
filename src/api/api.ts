import axios from "axios";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
        "Content-Type": "application/json",
    },
});

export const POKEMON_API = {
    async getPokemons(limit: number, offset?: number) {
        try {
            const { data } = await api.get(`/pokemon`,{
                params: {
                    limit,
                    offset,
                }
            });
            return data.results;
        } catch (error: any) {
            console.log(error.message)
        }
    }}