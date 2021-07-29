import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

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
