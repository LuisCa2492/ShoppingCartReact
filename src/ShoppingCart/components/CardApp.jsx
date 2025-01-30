import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { Alert } from '../helpers/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select  from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export const CardApp = ( {cards=[],index = 0}) => {
  
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const addCardToCart = (pokemon) => {
     dispatch(addToCart(pokemon));
     Alert('success', 'item added to cart');
  }

  const amountBuyed = (event) => {
    setQuantity(event.target.value);
  }

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
              // subheader="September 14, 2016"
            />
            <CardMedia
              sx={{ height: 140 }}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
              title={cards.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
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
                onClick={() => addCardToCart({name:cards.name, image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`})}>
                  <AddShoppingCart />
              </IconButton>
            </CardActions>
          </Card>
        </Grid2>
     </>
  );
}

export default CardApp;