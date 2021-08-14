// Import the constants from the user constants file
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
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_DETAILS_REQUEST,
    USER_LIST_DETAILS_SUCCESS,
    USER_LIST_DETAILS_FAIL,
    USER_LIST_DETAILS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from "../constants/userConstants";

// A reducer is a function that takes an action and the previous state of the application and returns the new state.

// The reducer does not modify the state, it creates a new state object that is merged merged with the existing state object.

// The reducer function takes the empty state and the action as arguments. It then uses a switch statement, based on the action type, returns an object
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };

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

// state = {}, if state is ever null set the default to an empty object
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

export const userDetailsReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };

        case USER_DETAILS_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, user: action.payload };

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case USER_DETAILS_RESET:
            return { user: {} };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_LIST_DETAILS_REQUEST:
            return { ...state, loading: true };

        case USER_LIST_DETAILS_SUCCESS:
            // action.payload is the data returned form the API call
            return {
                loading: false,
                users: action.payload.users,
                page: action.payload.page,
                pages: action.payload.pages,
            };

        case USER_LIST_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case USER_LIST_DETAILS_RESET:
            return { usesr: [] };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };

        case USER_UPDATE_PROFILE_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, success: true, userInfo: action.payload };

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };

        case USER_UPDATE_PROFILE_RESET:
            return {};

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userDeleteProfileReducer = (state = {}, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_DELETE_REQUEST:
            return { loading: true };

        case USER_DELETE_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, success: true };

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const userUpdateReducer = (state = { USER: {} }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case USER_UPDATE_REQUEST:
            return { loading: true };

        case USER_UPDATE_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, success: true };

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };

        case USER_UPDATE_RESET:
            return { user: {} };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};
