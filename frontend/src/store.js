import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

//Creates a Redux store that holds the complete state tree of your app.
const store = createStore(
    //A reducing function that returns the next state tree, given the current state tree and an action to handle.
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
