import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk('cart/addToCart', async ({id,qty}) =>{
    try{
        const {data} =  await axios.get(`/api/products/${id}`)
        return {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }
    } catch(err){
    return err.response.data
  }
})

const initialState = {
    cartItems: [],
    status: "idle",
    error: null,
    loading: false,
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers:{
        removeFromCart: (state,action) => {
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)
            },
    },
    extraReducers:{
        [addToCart.pending]: (state) => {
            state.loading = true
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)     
            
      if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
          
      } else {
          state.cartItems = [...state.cartItems,item]
      }
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export const {removeFromCart} = cartSlice.actions
export default cartSlice.reducer