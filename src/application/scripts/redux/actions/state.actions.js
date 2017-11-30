import {
    STATE,
    STATE_CHANGE,
    STATE_CHANGE_ACCEPT,
    STATE_CHANGE_REJECT
} from '../../constants';


export function change(payload) {
    return (dispatch) => {
        const NAME = payload.name.toUpperCase();
        const { err } = payload.value;
        dispatch({ middleware: STATE, type: STATE_CHANGE });


        if (err) {
            dispatch({ type: STATE_CHANGE_REJECT });
            return dispatch({ middleware: STATE, type: `${STATE_CHANGE_REJECT}_${NAME}`, err });
        }


        dispatch({ type: STATE_CHANGE_ACCEPT });
        return dispatch({ middleware: STATE, type: `${STATE_CHANGE_ACCEPT}_${NAME}`, payload });
    };
}


export function test() {
    return dispatch => dispatch({ type: 'TEST_TYPE' });
}
