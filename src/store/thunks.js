import { backendApi } from "../api/backendAPi";
import { pokemonApi } from "../api/pokemonApi";
import { setSellCards, setSuccessfullBuy } from "./ShoppingCartSlice";

export const getCards = () => {
    return async(dispatch) => {
        const result = await pokemonApi.get('pokemon?limit=100');
        dispatch(setSellCards(result.data.results));
    };
}

export const addBuy = (cart = []) => {
    return async(dispatch) => {
        try {
            console.log("cart ",cart);
            const result = await backendApi.post('/api/Venta/AddVenta', cart);
            const result2 = result.data > 0 ? true:false;
            dispatch(setSuccessfullBuy(result2));
        } catch (error) {
            console.error('Error en addBuy:', error);
            //dispatch(setError(error.response?.data?.message || 'Error al procesar la compra'));
        }
    }
}