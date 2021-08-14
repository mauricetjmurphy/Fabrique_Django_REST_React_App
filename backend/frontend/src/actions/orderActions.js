import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

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
        const { data } = await axios.post(`/api/orders/add/`, order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        });

        localStorage.removeItem("cartItmes");
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.get(`/api/orders/${id}/`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        // Gettting the Auth token
        const {
            userLogin: { userInfo },
        } = getState();

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
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
        const { data } = await axios.get(`/api/orders/myorders/`, config);

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
