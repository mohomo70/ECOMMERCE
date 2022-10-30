// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import {
//   productListReducer,
//   productDetailsReducer,
// } from './reducers/productReducers'

// const reducer = combineReducers({
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
// })

// const initialState = {}

// const middleware = [thunk]

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store

import {configureStore} from '@reduxjs/toolkit'
import {productSlice, productDeleteSlice, productCreateSlice, productUpdateSclie} from './reducers/productReducers'
import productDetailsReducer from './reducers/productDetailReducer'
import cartSliceReducer from './reducers/cartReducer'
import {userSlice, registerSlice,userDetailSlice, userUpdateDetail, userListSlice,userDeleteSlice} from './reducers/userReducer'
import {orderSlice, orderDetailSlice, orderPaySlice, orderListSlice} from './reducers/orderReducer'

export default configureStore({
  reducer: {
    productList: productSlice.reducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSclie.reducer,
    cart: cartSliceReducer,
    userLogin: userSlice.reducer,
    userRegister: registerSlice.reducer,
    userDetails: userDetailSlice.reducer,
    userUpdateProfile: userUpdateDetail.reducer,
    userList:userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    orderCreate: orderSlice.reducer,
    orderDetails: orderDetailSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderListMy: orderListSlice.reducer,
  }
})