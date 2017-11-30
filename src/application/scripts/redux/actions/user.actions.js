import {
    USER,
    USER_CREATE,
    USER_CREATE_ACCEPT,
    USER_CREATE_REJECT,
    USER_LOGIN,
    USER_LOGIN_ACCEPT,
    USER_LOGIN_REJECT,
    USER_SIGN,
    USER_SIGN_ACCEPT,
    USER_SIGN_REJECT,
    USER_LOGOUT,
    USER_LOGOUT_ACCEPT,
    USER_LOGOUT_REJECT
} from '../../constants';
import * as user from '../../models/user';
import truetype from '../../../../../utils/truetype';


export function create(payload) {
    return (dispatch) => {
        dispatch({ type: USER_CREATE });


        return user.create(payload)
            .then((res) => {
                const [name, value] = (Object.entries(res)).pop();
                const { err } = value;


                if (err) {
                    return dispatch({ middleware: USER, type: USER_CREATE_REJECT, err });
                }


                return dispatch({ middleware: USER, type: USER_CREATE_ACCEPT, payload: { name, value } });
            })
            .catch(err => dispatch({ middleware: USER, type: USER_CREATE_REJECT, err }));
    };
}


export function login(payload) {
    return (dispatch) => {
        dispatch({ type: USER_LOGIN });


        return user.login(payload)
            .then((res) => {
                const [name, value] = (Object.entries(res)).pop();
                const { err } = value;


                if (err) {
                    return dispatch({ middleware: USER, type: USER_LOGIN_REJECT, err });
                }


                return dispatch({ middleware: USER, type: USER_LOGIN_ACCEPT, payload: { name, value } });
            })
            .catch(err => dispatch({ middleware: USER, type: USER_LOGIN_REJECT, err }));
    };
}


export function sign() {
    return (dispatch) => {
        dispatch({ type: USER_SIGN });


        return user.sign()
            .then((res) => {
                const [name, value] = (Object.entries(res)).pop();
                const { err } = value;


                if (err) {
                    return dispatch({ middleware: USER, type: USER_SIGN_REJECT, err });
                }


                return dispatch({ middleware: USER,  type: USER_SIGN_ACCEPT,  payload: { name, value } });
            })
            .catch((err) => {
                return dispatch({ middleware: USER, type: USER_SIGN_REJECT, err });
            });
    };
}


export function logout() {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT });


        return user.logout()
            .then((res) => {
                const [name, value] = (Object.entries(res)).pop();
                const { err } = value;


                if (err) {
                    return dispatch({ middleware: USER, type: USER_LOGOUT_REJECT, err });
                }


                return dispatch({ middleware: USER, type: USER_LOGOUT_ACCEPT, payload: { name, value } });
            })
            .catch((err) => {
                return dispatch({ middleware: USER, type: USER_LOGOUT_REJECT, err });
            });
    };
}