import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const productDetailsReducer = createAsyncThunk('PRODUCT_DETAILS',async (id) => {
    try{
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    }catch(err){
      return err.response.data
    }
  })

  const initialState = {
    product:{reviews:[]},
    status:'idle',
    error:null,
    loading:false,
  }
  
  const productDetailsSlice = createSlice({
    name: 'Product',
    initialState,
    extraReducers:{
      [productDetailsReducer.pending]: (state) =>{
        state.loading = true
      },
      [productDetailsReducer.fulfilled]: (state, action) => {
        state.loading = false
        state.product = action.payload
      },
      [productDetailsReducer.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message
      }
    }
  })
  
  export default productDetailsSlice.reducer