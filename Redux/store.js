import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly' 
import thunkMidlleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import cartItems from './Reducers/cartItem'
const reducers = combineReducers({
    cartItems:cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMidlleware))
)
export default store;