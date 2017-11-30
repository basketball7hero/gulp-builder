import configureStore from './configureStore';
import truetype from '../../../../../utils/truetype';


const store = configureStore();


export const connect = (s, d) => (component) => (props) => {
    let Component = null
    let nextProps = {
        ...props
    };


    if (s && truetype(s) === 'Function') {
        nextProps = {
            ...nextProps,
            ...s(store.getState())
        };
    } else if (s && truetype(s) === 'Object') {
        nextProps = {
            ...nextProps,
            ...s
        };
    }


    if (d && truetype(d) === 'Function') {
        nextProps = {
            ...nextProps,
            ...d(store.dispatch)
        };
    } else if (d && truetype(d) === 'Object') {
        Object.entries(d).forEach((item) => {
            const [name, func] = item;
            nextProps = {
                ...nextProps,
                [name]: payload => store.dispatch(func(payload))
            };
        });
    }


    store.subscribe(async () => {
        await Component;
        if (Component.updateProps && truetype(Component.updateProps) === 'Function') {
            if (s && truetype(s) === 'Function') {
                Component.updateProps({
                    ...nextProps,
                    ...s(store.getState())
                });
            } else if (s && truetype(s) === 'Object') {
                Component.updateProps({
                    ...nextProps,
                    ...s
                });
            }
        }
    });


    Component = new component(nextProps);

    return Component;
};


export default store;