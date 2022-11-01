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

export const listProducts = createAsyncThunk('PRODUCT_LIST', async (keyword = '') => {
  try{
    const response = await axios.get(`/api/products?keyword=${keyword}`)
    return response.data
  }catch(err){
    return err.response.data
  }
})

export const deleteProduct = createAsyncThunk('PRODUCT_DELETE', async (id, {getState}) => {
  try{
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const {data} = await axios.delete(`/api/products/${id}`, config)
    return data
  }catch (error){
    return error.response.data
  }
})

export const createProduct = createAsyncThunk('PRODUCT_CREATE', async (_,{getState}) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/products`, {}, config)
    return data
  } catch (error) {
    return error.response.data
  }
})

export const updateProduct = createAsyncThunk('PRODUCT_UPDATE', async(product,{getState}) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/products/${product._id}`,product ,config)
    return data
  } catch (error) {
    return error.response.data
  }
})

export const createProductReview = createAsyncThunk('PRODUCT_REVIEW_CREATE', async({productId,review},{getState}) => {
  try{
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const {data} = await axios.post(`/api/products/${productId}/reviews`, review, config)
    return data

  } catch (error) {
    return error.response.data
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
    [listProducts.pending]: (state) =>{
      state.loading = true
    },
    [listProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [listProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

const productDeleteSlice = createSlice({
  name: 'Products',
  initialState:{
    loading: false,
    success: true
  },
  extraReducers:{
    [deleteProduct.pending]: (state) =>{
      state.loading = true
    },
    [deleteProduct.fulfilled]: (state) => {
      state.loading = false
      state.success = true
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

const productCreateSlice = createSlice({
  name:'Products',
  initialState: {
    loading: false,
    success: false,
    product: []
  },
  reducers:{
    resetProducts: (state) => {
      state.product = []
    }
  },
  extraReducers:{
    [createProduct.pending]: (state) =>{
      state.loading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.success = true
      state.product = action.payload
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

const productUpdateSclie = createSlice({
  name: 'Products',
  initialState: {
    product: {},
    loading:false,
    success:false,
  },
  reducers:{
    resetUpdateProducts:(state) => {
      state.product = {}
    }
  },
    extraReducers:{
      [updateProduct.pending]: (state) => {
        state.loading = true
      },
      [updateProduct.fulfilled]: (state, action) => {
        state.loading = false
        state.success = true
        state.product = action.payload
      },
      [updateProduct.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message
      }
  }

})

const productReviewCreateSlice = createSlice({
  name:'ProductsReview',
  initialState:{
    loading : false,
    success : false,
  },
  reducers: {
    createReviewReset: (state) => {
      state = {}
    }
  },
  extraReducers: {
    [createProductReview.pending]: (state) => {
      state.loading = true
    },
    [createProductReview.fulfilled]: (state) => {
      state.loading = false
      state.success = true
    },
    [createProductReview.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export const {resetProducts} = productCreateSlice.actions 
export const {resetUpdateProducts} = productUpdateSclie.actions
export const {createReviewReset} = productUpdateSclie.actions
export  { productDeleteSlice, productSlice, productCreateSlice, productUpdateSclie, productReviewCreateSlice }