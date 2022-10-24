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
import productsReducer from './reducers/productReducers'
import productDetailsReducer from './reducers/productDetailReducer'
import cartSliceReducer from './reducers/cartReducer'

export default configureStore({
  reducer: {
    productList: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartSliceReducer,
  }
})