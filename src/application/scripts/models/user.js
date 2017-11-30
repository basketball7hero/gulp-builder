import { createPromise } from '../functions';


export function create(payload) {
    return createPromise({
        name: 'user',
        params: ['/api/user/create', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }]
    });
}


export function login(payload) {
    return createPromise({
        name: 'user',
        params: ['/api/user/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }]
    });
}


export function logout() {
    return createPromise({
        name: 'user',
        params: ['/api/user/logout', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }]
    });
}


export function sign() {
    return createPromise({
        name: 'user',
        params: ['/api/user/sign', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }]
    });
}
