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
} from "../constants/userConstants";

// The reducer does not modify the state, it creates a new state object that is merged merged with the old one state object.
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_LOGIN_REQUEST:
            return { loading: true };

        case USER_LOGIN_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, userInfo: action.payload };

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_REGISTER_REQUEST:
            return { loading: true };

        case USER_REGISTER_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, userInfo: action.payload };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userDetailsSReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };

        case USER_DETAILS_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, user: action.payload };

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};
