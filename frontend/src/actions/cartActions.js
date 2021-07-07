import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

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
