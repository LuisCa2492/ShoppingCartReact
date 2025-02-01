import { createSlice } from '@reduxjs/toolkit';

export const ShoppingCartSlice = createSlice({
  name: 'shopCart',
  initialState: {
     sellCards: [],
     isLoading:false,
     cart:[],
  },
  reducers: {
    startLoadingCards: (state, /* action */ ) => {
       state.isLoading=true
    },
    setSellCards:(state,action) =>{
        state.isLoading=false;
        state.sellCards=action.payload;
    },
    addToCart:(state,action) =>{
        state.cart.push(action.payload);
    },
    addToCartLS:(state,action) =>{
      state.cart = action.payload;
  },
    
  }
});
export const { 
    setSellCards,
    startLoadingCards,
    addToCart,
    addToCartLS
 } = ShoppingCartSlice.actions;