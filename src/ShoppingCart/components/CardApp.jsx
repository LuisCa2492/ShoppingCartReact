import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Grid2 from '@mui/material/Grid2';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../../store/ShoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '../helpers/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select  from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export const CardApp = ( {cards=[],index = 0}) => {
  
  const { cart} = useSelector((state) => state.shopCart);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const addCardToCart = (pokemon) => {
    if (cart.some((item) => item.name === pokemon.name)) {
      return Alert('error', 'Item already in cart');
    }
  
    if (quantity === 0) {
      return Alert('error', 'Please select a quantity');
    }
  
    dispatch(addToCart(pokemon));
  
    // Guardar en localStorage sin duplicados
    const updatedCart = [...cart, pokemon].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    Alert('success', 'Item added to cart');
  };

  const amountBuyed = (event) => {
    setQuantity(event.target.value);
  }

  // 
  useEffect(() => {
    if (cart.length === 0) return;
  
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Fusionar sin duplicados
      const mergedCart = [...savedCart, ...cart].filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.name === item.name) // Comparación correcta
      );
  
      localStorage.setItem('cart', JSON.stringify(mergedCart));
    } catch (error) {
      console.log(error);
    }
  }, [cart]); // Se ejecuta solo cuando `cart` cambia

  return (
    <>
        <Grid2 xs={4}>
          <Card  sx={{ maxWidth: 345, m:2 }}>
            <CardHeader   
              action={
                <IconButton aria-label="settings">
                  
                </IconButton>
              }
              title={cards.name}
            />
            <CardMedia
              sx={{ height: 140 }}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${cards.index}.png`}
              title={cards.name}
            />
            <CardContent>
              
            </CardContent>
            <CardActions>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small-label">Amount</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={quantity}
                label="Age"
                onChange={amountBuyed}
              >
                  
                  {Array.from({ length: cards.amount }).map((_, index) => (
                      <MenuItem key={index} value={index}>{index}</MenuItem>
                  ))}
                </Select>
              
              </FormControl>
              <IconButton title='Add to Cart' 
                onClick={() => addCardToCart({name:cards.name, image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${cards.index}.png`,amount: quantity})}>
                  <AddShoppingCart />
              </IconButton>
            </CardActions>
          </Card>
        </Grid2>
     </>
  );
}

export default CardApp;