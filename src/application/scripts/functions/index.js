import httpStatus from 'http-status';
import truetype from '../../../../utils/truetype';
import requestError from '../../../server/utils/requestError';


export function switchbp(bp, s) {
    switch (bp) {
        case 'md':
            return s[bp];
        case 'sm':
            return s[bp];
        case 'xs':
            return s[bp];
        default:
            return null;
    }
}


export function createPromise(query) {
    try {
        const { name, params } = query;
        if (name && truetype(name) === 'String' && params && truetype(params) === 'Array') {
            return new Promise((resolve, reject) =>
                fetch(...params)
                    .then(res => res.json(res))
                    .then(data => resolve({ [name]: data }))
                    .catch(err => reject({ [name]: err })));
        }
        throw new Error('Неверные параметры запроса!');
    } catch (error) {
        error.status = httpStatus.BAD_REQUEST;
        return Promise.reject(error).catch(err => ({ [name]: requestError(err) }));
    }
}


export function croptext(str, size) {
    if (truetype(str) === 'String') {
        if (str.length > size) {
            return `${str.substring(0, (size - 3))} ...`;
        }
        return str;
    }
    throw new Error('Значение не является строкой');
}