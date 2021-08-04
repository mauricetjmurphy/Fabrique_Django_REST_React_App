// Import the constants
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_DETAILS_REQUEST,
    USER_LIST_DETAILS_SUCCESS,
    USER_LIST_DETAILS_FAIL,
    USER_LIST_DETAILS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import axios from "axios";

// Actions are plain JavaScript objects that have a type field. An action is an event that describes something that happened in the application.

export const login = (email, password) => async (dispatch) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };

        // Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        // Destructure the response from the axios API call
        const { data } = await axios.post(
            "/api/users/login/",
            {
                username: email,
                password: password,
            },
            // Pass in the header as an argument
            config
        );
        // If the post request is successful, a dispatch is sent with the returned data in its payload
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        // Update the local storeage with the users details and the token. Data stored as a key valse pair.
        localStorage.setItem("userInfo", JSON.stringify(data));
        // If the is an issue with the request, a dispatch is sent with the error message in its payload
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    // Remove items from local storage
    localStorage.removeItem("userInfo");
    // Set the state object to an empty object
    dispatch({ type: USER_LOGOUT });
    // Reset the user details state object
    dispatch({ type: USER_DETAILS_RESET });
    // Reset the order list
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_DETAILS_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };

        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.post(
            "/api/users/register/",
            {
                name: name,
                email: email,
                password: password,
            },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/api/users/${id}/`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // Axios post request will require a header. This variable is passed in below.
        const config = {
            header: {
                "Content-type": "application/json",
                Authorization: `JWT ${userInfo.token}`,
            },
        };

        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_LIST_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/api/users/`, config);

        dispatch({
            type: USER_LIST_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: USER_DELETE_REQUEST,
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
        const { data } = await axios.delete(`/api/users/delete/${id}`, config);

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
