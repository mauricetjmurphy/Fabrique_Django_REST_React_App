// Import the constants from the user constants file
import { SIDEMENU_SUCCESS } from "../constants/pageConstants";

export const toggleSidemenuReducer = (state = { toggle: false }, action) => {
    switch (action.type) {
        // Do something here based on the different types of actions

        case SIDEMENU_SUCCESS:
            // action.payload is the data returned form the API call
            return { loading: false, toggle: action.payload };

        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        default:
            return state;
    }
};
