import httpStatus from 'http-status';
import User from '../models/user.model';
import Session from '../models/session.model';
import truetype from '../../../utils/truetype';
import setToken from '../utils/setToken';
import removeToken from '../utils/removeToken';


export async function create(req, res, next) {
    try {
        const { body } = req;
        await new User(body).save();
        res.status(httpStatus.CREATED);
        return res.json({ msg: 'ok' });
    } catch (err) {
        err.status = httpStatus.BAD_REQUEST;
        return next(err);
    }
}


export async function login(req, res, next) {
    try {
        const { body: { email, password } } = req;
        const { userAgent } = req.ctx;
        const user = await User.findOne({ email });
        if (user && user.passwordCompare(password)) {
            const session = await user.createSession(userAgent);
            if (session) {
                res.status(httpStatus.OK);
                setToken(req, res, session);
                return res.json({ msg: 'ok' });
            }
        }
        throw new Error(httpStatus['403_MESSAGE']);
    } catch (err) {
        return next(err);
    }
}


export function protect(controller) {
    return async (req, res, next) => {
        try {
            const { session, user } = req.ctx;
            if (!controller) throw new Error(httpStatus['403_MESSAGE']);
            if (session && user) return await controller(req, res, next);
            throw new Error(httpStatus['403_MESSAGE']);
        } catch (err) {
            removeToken(req, res);
            err.status = httpStatus.FORBIDDEN;
            return next(err);
        }
    };
}


export async function sign(req, res, next) {
    const { session, user } = req.ctx;
    return res.json({ msg: 'ok', user: user.transform() });
}


export async function logout(req, res, next) {
    const { session, user } = req.ctx;
    removeToken(req, res);
    await session.update({ $set: { closed: true } });
    return res.json({ msg: 'ok' });
}
