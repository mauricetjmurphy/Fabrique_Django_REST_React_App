import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    CART_ADD_WISHLIST_ITEM,
    WISHLIST_CLEAR_ITEMS,
} from "../constants/cartConstants";

// A reducer is a function that takes an action and the previous state of the application and returns the new state.

// The reducer does not modify the state, it creates a new state object that is merged merged with the existing state object.

// The reducer function takes the empty state and the action as arguments. It then uses a switch statement, based on the action type, returns an object

// Reducer changes the state and passes it down to components
export const cartReducer = (
    state = { cartItems: [], shipppingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.id === existItem.id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case CART_ADD_WISHLIST_ITEM:
            const items = action.payload;
            // const existItem = state.cartItems.find((x) => x.id === item.id);

            return {
                ...state,
                cartItems: [...state.cartItems, ...items],
            };

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.id !== action.payload
                ),
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload;
            const existItem = state.wishlistItems.find((x) => x.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((x) =>
                        x.id === existItem.id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }

        case WISHLIST_CLEAR_ITEMS:
            return {
                ...state,
                wishlistItems: [],
            };

        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(
                    (x) => x.id !== action.payload
                ),
            };

        default:
            return state;
    }
};
