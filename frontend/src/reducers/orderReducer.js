import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk('order/Create', async(order, {getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post('/api/orders',order, config)
        return data
    }catch(error){
        return error.response.data
    }
})

export const getOrderDetails = createAsyncThunk('order/Details', async(id, {getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config)
        return data
    }catch(error){
        return error.response.data
    }
})

export const payOrder = createAsyncThunk('order/pay', async({orderId, paymentResult}, getState) => {
    try {
        const {
            userLogin: { userInfo },
          } = getState()
          const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
          )
        return data
    } catch (error) {
        return error.response.data
    }
})


const initialState = {
    status: "idle",
    error: null,
    loading: false,
}

const orderSlice = createSlice({
    name: 'Order',
    initialState,
   
    extraReducers:{
        [createOrder.pending]: (state) => {
            state.loading = true
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true
            state.order = action.payload            
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})
const initialDetailSlice = {
    status: "idle",
    error: null,
    loading: true,
}

const orderDetailSlice = createSlice({
    name: 'Order',
    initialState: initialDetailSlice,
   
    extraReducers:{
        [getOrderDetails.pending]: (state) => {
            state.loading = true
        },
        [getOrderDetails.fulfilled]: (state, action) => {
            state.loading = false
            state.order = action.payload            
        },
        [getOrderDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

const orderPaySlice = createSlice({
    name:'Order',
    initialState:{},
    reducers : {
        reset: (state) => {
            state = {}
            }
    },
    extraReducers: {
        [payOrder.pending]: (state) => {
            state.loading = true
        },
        [payOrder.fulfilled]: (state) => {
            state.loading = false
            state.success = true            
        },
        [payOrder.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

export const {reset} = orderPaySlice.actions
export  {orderSlice , orderDetailSlice, orderPaySlice}