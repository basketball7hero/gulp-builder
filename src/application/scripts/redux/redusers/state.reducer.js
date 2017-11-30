import {
    STATE,
    STATE_CHANGE_ACCEPT_BREAKPOINT
} from '../../constants';


const initialState = {
    breakpoint: 'md'
};


function stateReduser(state = initialState, action) {
    const { middleware, type, payload } = action;
    const property = (middleware && middleware === STATE && payload && payload.name && payload.value);


    if (property) {
        const { name, value } = payload;


        if (type === STATE_CHANGE_ACCEPT_BREAKPOINT) {
            return {
                ...state,
                [name]: value
            }
        }
    }


    return state;
}


export default stateReduser;
