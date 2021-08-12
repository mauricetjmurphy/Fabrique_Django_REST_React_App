import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducer,
    productSearchReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    productsDeleteReducer,
    productDeleteReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteProfileReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
} from "./reducers/orderReducers";
import { toggleSidemenuReducer } from "./reducers/pageReducer";

// Listing the projects reducers and assigning them to a variable
const reducers = {
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,
    productsDelete: productsDeleteReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    toggleSidemenu: toggleSidemenuReducer,
};

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore. The resulting reducer calls every child reducer, and gathers their results into a single state object.
const rootReducer = combineReducers(reducers);

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

// The user data needs to be taken from local storage to set the initial state.
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },

    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

//Creates a Redux store that holds the complete state tree of your app.
export const configStore = createStore(
    //A reducing function that returns the next state tree, given the current state tree and an action to handle.
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
