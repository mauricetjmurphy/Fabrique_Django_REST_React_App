import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCTS_DELETE_REQUEST,
    PRODUCTS_DELETE_SUCCESS,
    PRODUCTS_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";
//Redux-thunk allows us call an async function within a function and will call the dispatch
export const listProducts =
    (category = "") =>
    async (dispatch) => {
        try {
            //Pass an object into dispatch to action the reducer
            dispatch({ type: PRODUCT_LIST_REQUEST });

            if (category === "") {
                var data = await axios.get(`/api/products/`);
            } else {
                //Destructuring the awaited response. Await needs to be wrapped in an async function
                var data = await axios.get(`/api/products/${category}`);
            }

            const { data } = data;

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

export const searchProducts =
    (keyword = "") =>
    async (dispatch) => {
        try {
            //Pass an object into dispatch to action the reducer
            dispatch({ type: PRODUCT_SEARCH_REQUEST });

            //Destructuring the awaited response. Await needs to be wrapped in an async function
            const { data } = await axios.get(`/api/products/search/${keyword}`);
            dispatch({
                type: PRODUCT_SEARCH_SUCCESS,
                payload: data,
            });
            // Return error message if there are issues with the data
        } catch (error) {
            dispatch({
                type: PRODUCT_SEARCH_FAIL,
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

export const createProductReview =
    (product_id, review) => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

            // Getting the auth token for sending in the headers
            const {
                userLogin: { userInfo },
            } = getState();

            // Axios post request will require a header. This variable is passed in below.
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `JWT ${userInfo.token}`,
                },
            };
            //Destructuring the awaited response. Await need to be wrapped in an async function
            const { data } = await axios.post(
                `/api/products/${product_id}/reviews/`,
                review,
                config
            );
            dispatch({
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const deleteProducts = (id) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: PRODUCTS_DELETE_REQUEST,
        });

        // Getting the auth token for sending in the headers
        const {
            userLogin: { userInfo },
        } = getState();

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `JWT ${userInfo.token}`,
            },
        };
        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.delete(`/api/products/delete/`, config);

        dispatch({
            type: PRODUCTS_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCTS_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `JWT ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `/api/products/delete/${id}`,
            config
        );

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
