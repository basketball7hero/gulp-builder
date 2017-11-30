import {
    USER,
    USER_LOGIN_ACCEPT,
    USER_LOGOUT_ACCEPT,
    USER_SIGN_ACCEPT,
    USER_SIGN_REJECT
} from '../../constants';


const initialState = {
    authorized: false,
    id: null,
    email: null,
    role: null
};


function userReducer(state = initialState, action) {
    const { middleware, type, payload, err } = action;
    const accept = (middleware && middleware === USER && payload && payload.name && payload.value);
    const reject = (middleware && middleware === USER && err);


    if (accept) {
        const { name, value } = payload;


        if (type === USER_LOGIN_ACCEPT) {
            location.reload();
        }


        if (type === USER_LOGOUT_ACCEPT) {
            location.reload();
        }


        if (type === USER_SIGN_ACCEPT) {
            return {
                ...state,
                authorized: true,
                ...value
            };
        }
    } else if (reject) {
        if (type === USER_SIGN_REJECT) {
            // location.reload();
        }
    }


    return state;
}

export default userReducer;
