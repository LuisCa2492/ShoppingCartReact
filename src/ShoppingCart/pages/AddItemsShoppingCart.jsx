import React, { useEffect } from 'react'
import {CardApp} from '../components/CardApp'
import { useDispatch, useSelector } from 'react-redux'
import { getCards } from '../../store/thunks';
import Grid2 from '@mui/material/Grid2';

export const AddItemsShoppingCart = () => {

  const cards = useSelector((state) => state.shopCart.sellCards);
  const dispatch = useDispatch();
  
 const cardsWithQuantity = cards.map( card => ({
    ...card,
    amount:9
 }));

  useEffect(() => {
    dispatch(getCards());
  }, []);


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
