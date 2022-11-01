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

export const listMyOrders = createAsyncThunk('order/listMyOrder', async (_,{getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }

          const { data } = await axios.get(`/api/orders/myorders`, config)
          return data

    } catch (error) {
        return error.response.data
    }
})

export const deliverOrder = createAsyncThunk('order/Deliver', async(order,{getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
       
        const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
        )
          return data

    } catch (error) {
        return error.response.data
    }
})

export const listOrders = createAsyncThunk('order/listOrders', async(_,{getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
          const { data } = await axios.get(`/api/orders`, config)
          return data
    } catch (err){
        return err.response.data
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

const orderListMySlice = createSlice({
    name: 'Order',
    initialState:{
        loading:false,
        orders:[]
    },
    extraReducers: {
        [listMyOrders.pending]: (state) => {
            state.loading = true
        },
        [listMyOrders.fulfilled]: (state,action) => {
            state.loading = false
            state.orders = action.payload            
        },
        [listMyOrders.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

const orderDeliverSlice = createSlice({
    name: 'OrderDeliver',
    initialState:{
        loading:false,
        successs:false,
    },
    reducers : {
        orderDeliverReset: (state) => {
            state = {loading:false,successs:false}
            }
    },
    [deliverOrder.pending]: (state) => {
        state.loading = true
    },
    [deliverOrder.fulfilled]: (state) => {
        state.loading = false
        state.success = true           
    },
    [deliverOrder.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
})

const orderListSlice = createSlice({
    name: 'OrderList',
    initialState:{
        loading: false,
        orders:[]
    },
    [listOrders.pending]: (state) => {
        state.loading = true
    },
    [listOrders.fulfilled]: (state, action) => {
        state.loading = false
        state.orders = action.payload           
    },
    [listOrders.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
})

export const {reset} = orderPaySlice.actions
export const {orderDeliverReset} = orderDeliverSlice.actions
export  {orderSlice , orderDetailSlice, orderPaySlice, orderListMySlice , orderDeliverSlice, orderListSlice}