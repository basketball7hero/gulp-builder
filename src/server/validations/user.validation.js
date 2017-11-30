import Joi from 'joi';


export const create = {
    body: {
        email: Joi.string().email().required(),
        username: Joi.string().required().min(3).max(32),
        password: Joi.string().required().min(6).max(128)
    }
};


export const login = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(128)
    }
};


export const protect = {
    cookies: {
        token: Joi.string().required()
    }
};
