import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    CART_ADD_WISHLIST_ITEM,
} from "../constants/cartConstants";

// Actions are objects that represent the intention to change the state
//Action creator function  sends the fetched data in the form of a payload in the dispatch
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    //Dispatch an action to the reducer
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id: data.product_id,
            name: data.product_name,
            availability: data.availability,
            image: data.product_image_url,
            price: data.retail_price,
            qty,
        },
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const addWishlistToCart = () => async (dispatch, getState) => {
    const {
        wishlist: { wishlistItems },
    } = getState();

    //Dispatch an action to the reducer
    dispatch({
        type: CART_ADD_WISHLIST_ITEM,
        payload: wishlistItems,
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );

    localStorage.removeItem("wishlistItems");
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    //Dispatch an action to the reducer
    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            id: data.product_id,
            name: data.product_name,
            availability: data.availability,
            image: data.product_image_url,
            price: data.retail_price,
            qty,
        },
    });

    localStorage.setItem(
        "wishlistItems",
        JSON.stringify(getState().wishlist.wishlistItems)
    );
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        "wishlistItems",
        JSON.stringify(getState().wishlist.wishlistItems)
    );
};
