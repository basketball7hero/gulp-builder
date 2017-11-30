import {
    API,
    API_INCLUDE_ACCEPT,
    API_INCLUDE_REJECT,
    API_SYNC,
    API_SYNC_ACCEPT,
    API_SYNC_REJECT
} from '../../constants';


export function include(payload) {
    return (dispatch) => {
        const NAME = payload.name.toUpperCase();
        const { err } = payload.value;


        if (err) {
            dispatch({ type: API_INCLUDE_REJECT });
            return dispatch({ middleware: API, type: `${API_INCLUDE_REJECT}_${NAME}`, err });
        }


        dispatch({ type: API_INCLUDE_ACCEPT });
        return dispatch({ middleware: API, type: `${API_INCLUDE_ACCEPT}_${NAME}`, payload });
    };
}


export function sync() {
    return promises => (dispatch) => {
        dispatch({ type: API_SYNC });


        if (promises.length > 0) {
            return Promise.all(promises)
                .then((data) => {
                    dispatch({ type: API_SYNC_ACCEPT });


                    return data.forEach((item) => {
                        const [name, value] = (Object.entries(item)).pop();
                        if (name && value) dispatch(include({ name, value }));
                    });
                })
                .catch(err => dispatch({ type: API_SYNC_REJECT, err }));
        }


        return dispatch({ type: API_SYNC_REJECT });
    };
}