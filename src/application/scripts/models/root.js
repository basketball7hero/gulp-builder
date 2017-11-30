import { createPromise } from '../functions';


export function meta(path) {
    return createPromise({
        name: 'meta',
        params: [`/api/root/view/${path}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }]
    });
}


export function test() {
    return createPromise({
        name: 'test',
        params: ['/api/root/test', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }]
    });
}
