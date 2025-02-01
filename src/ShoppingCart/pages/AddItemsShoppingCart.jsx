import React, { useEffect } from 'react'
import {CardApp} from '../components/CardApp'
import { useDispatch, useSelector } from 'react-redux'
import { getCards } from '../../store/thunks';
import Grid2 from '@mui/material/Grid2';
import { addToCart } from '../../store/ShoppingCartSlice';

export const AddItemsShoppingCart = () => {

  const {sellCards,cart} = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  
 const cardsWithQuantity = sellCards.map( card => ({
    ...card,
    amount:9
 }));

  // useEffect(() => {
  //   dispatch(getCards());
  //   try {
  //     const savedCart = localStorage.getItem('cart');
  //     if (savedCart) {
  //         const cartFromStorage = JSON.parse(savedCart);

  //         cartFromStorage.forEach(item => {
  //             // Evitar duplicados comprobando si ya existe en el store
  //             if (!cart.some(cartItem => cartItem.id === item.id)) {
  //                 dispatch(addToCart(item));
  //             }
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  useEffect(() => {
    dispatch(getCards()); // Obtener las tarjetas
  
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Filtrar solo los elementos que aún no están en Redux
      const newItems = savedCart.filter(
        (item) => !cart.some((cartItem) => cartItem.id === item.id)
      );
  
      if (newItems.length > 0) {
        newItems.forEach((item) => dispatch(addToCart(item)));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <>
    <Grid2 container>
      {
        cardsWithQuantity.map((card, index) => (
          <CardApp key={index} cards={card} index={index+1}/>

        ))
      }

    </Grid2>
    </>
  )
}

export default AddItemsShoppingCart
