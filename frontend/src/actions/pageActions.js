import {
    SIDEMENU_REQUEST,
    SIDEMENU_SUCCESS,
    SIDEMENU_FAIL,
} from "../constants/pageConstants";

export const toggleSidemenu = () => async (dispatch, getState) => {
    try {
        // Dispatch contains an object that describes what action needs to take place. The dispatch function then dispatches that action.
        dispatch({
            type: SIDEMENU_REQUEST,
        });

        // Getting the auth token for sending in the headers
        const {
            toggleSidemenu: { toggle },
        } = getState();

        dispatch({
            type: SIDEMENU_SUCCESS,
            payload: !toggle,
        });
    } catch (error) {
        dispatch({
            type: SIDEMENU_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
