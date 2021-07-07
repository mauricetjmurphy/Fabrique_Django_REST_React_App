import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

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
