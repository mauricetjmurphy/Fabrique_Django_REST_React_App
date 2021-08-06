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
} from "../constants/productConstants";

// A reducer is a function that takes an action and the previous state of the application and returns the new state.

// The reducer does not modify the state, it creates a new state object that is merged merged with the existing state object.

// The reducer function takes the empty state and the action as arguments. It then uses a switch statement, based on the action type, returns an object

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const productSearchReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions
        case PRODUCT_SEARCH_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_SEARCH_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};

export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, SUCCESS: true };

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_REVIEW_RESET:
            return {};

        default:
            return state;
    }
};
