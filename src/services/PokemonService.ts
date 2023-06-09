import pokemonJson from "../data/pokemon.json"
import { Generations } from "../enums/Generations";
import { PokemonData } from "../types/PokemonData";
import { PokemonJson } from "../types/PokemonJson";

export class PokemonService {
    totalPokemonNumber = 809;

    getPokemonData = (pokemonNumber : number) => {
        const pokemonData = pokemonJson[pokemonNumber - 1];
        return {
            name : pokemonData.name,
            generation : pokemonData.generation,
            types : [pokemonData.type1, pokemonData.type2],
            isLegendary : pokemonData.is_legendary == 1,
            id: pokemonNumber
        } as PokemonData
    }

    handleLocalStorage = () => {
        const today = new Date();

        if (localStorage.getItem("date") != null){
            const localStorageDate = new Date(localStorage.getItem("date")!);
            const differentDay = localStorageDate.getUTCDay() != today.getUTCDay();

            if (differentDay){
                localStorage.setItem("date", today.toString());
                localStorage.setItem("pokemon", (Math.floor(Math.random() * 151) + 1).toString());
                return;
            }

            return;
        }

        localStorage.setItem("date", today.toString());
        localStorage.setItem("pokemon", (Math.floor(Math.random() * 151) + 1).toString());
        return;
    }

    getPokemonByName = (pokemonNameGuess : string, guessNumber: number) => {
        const pokemonFound = pokemonJson.find(pokemon => pokemon.name.toUpperCase() == pokemonNameGuess.trim().toUpperCase());
        if (pokemonFound == undefined) return undefined;
        return {
            name : pokemonFound.name,
            generation : pokemonFound.generation,
            types : [pokemonFound.type1, pokemonFound.type2],
            isLegendary : pokemonFound.is_legendary == 1,
            id : this.getPokemonId(pokemonFound),
            guessNumber : guessNumber
        } as PokemonData
    }

    getPokemonId = (pokemon: any) => {
        const index = pokemonJson.indexOf(pokemon) + 1;
        return index;
    }

    getPokemonList = () => {
        return pokemonJson as PokemonJson[];
    }

    getGenerationNameFromId = (generationId : number) => {
        return Generations[generationId];
    }

    clearLocalStorage = () => {
        localStorage.setItem("date", "");
        localStorage.setItem("pokemon", "");
    }
}