import { pokemonApi } from "../api/pokemonApi";
import { setSellCards } from "./ShoppingCartSlice";

export const getCards = () => {
    return async(dispatch) => {
        const result = await pokemonApi.get('pokemon?limit=100');
        //console.log(result.data);
        dispatch(setSellCards(result.data.results));
    };
}