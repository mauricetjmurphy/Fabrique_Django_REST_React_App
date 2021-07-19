import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

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

        //Login request that is looking for a web token to be returned. Sends the username and password and gets a token in return.
        const { data } = await axios.post(
            "/api/users/login/",
            {
                username: email,
                password: password,
            },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
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
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};
