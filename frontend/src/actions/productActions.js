import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
//Redux-thunk allows us call an async function within a function and will call the dispatch
export const listProducts = () => async (dispatch) => {
    try {
        //Pass an object into dispatch to action the reducer
        dispatch({ type: PRODUCT_LIST_REQUEST });
        //Destructuring the awaited response. Await needs to be wrapped in an async function
        const { data } = await axios.get("/api/products/");
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
        // Return error message if there are issues with the data
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        //Destructuring the awaited response. Await need to be wrapped in an async function
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
