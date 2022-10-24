// import {
//   PRODUCT_LIST_REQUEST,
//   PRODUCT_LIST_SUCCESS,
//   PRODUCT_LIST_FAIL,
//   PRODUCT_DETAILS_REQUEST,
//   PRODUCT_DETAILS_SUCCESS,
//   PRODUCT_DETAILS_FAIL,
// } from '../constants/productConstants'

// export const productListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] }
//     case PRODUCT_LIST_SUCCESS:
//       return { loading: false, products: action.payload }
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

// export const productDetailsReducer = (
//   state = { product: { reviews: [] } },
//   action
// ) => {
//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST:
//       return { loading: true, ...state }
//     case PRODUCT_DETAILS_SUCCESS:
//       return { loading: false, product: action.payload }
//     case PRODUCT_DETAILS_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const productListReducer = createAsyncThunk('PRODUCT_LIST',async (id) => {
  try{
    const response = await axios.get('/api/products')
    return response.data
  }catch(err){
    return err.response.data
  }
})

const initialState = {
  products:[],
  status:'idle',
  error:null,
  loading:false,
}

const productSlice = createSlice({
  name: 'Products',
  initialState,
  extraReducers:{
    [productListReducer.pending]: (state) =>{
      state.loading = true
    },
    [productListReducer.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [productListReducer.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default productSlice.reducer