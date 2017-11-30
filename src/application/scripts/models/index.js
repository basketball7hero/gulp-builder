import * as root from './root';


const models = [{
    path: '/',
    promises: () => ([
        root.meta('home')
    ])
}, {
    path: '/login',
    promises: () => ([
        root.meta('login')
    ])
}, {
    path: '/logout',
    promises: () => ([
        root.meta('logout')
    ])
}, {
    path: '/registration',
    promises: () => ([
        root.meta('registration')
    ])
}, {
    name: 'page404',
    promises: () => ([
        root.meta('page404')
    ])
}];


export default models;
