import Session from '../models/session.model';
import User from '../models/user.model';
import setToken from '../utils/setToken';


const f = {
    async json(req, res, next) {
        const {
            cookies,
            layout,
            lang
        } = req.ctx;


        if (cookies.token) {
            const session = await Session.findOne({ token: cookies.token });
            if (session) {
                const { err, session: { token } } = await session.valid(req);
                if (!err) {
                    if (session.token !== token) {
                        session.token = token;
                        setToken(req, res, session);
                    }
                    const user = await User.findById(session.userId);
                    if (user) {
                        req.ctx.session = session;
                        req.ctx.user = user;
                        if (layout === 'admin' && user.role !== 'admin') {
                            const err = new Error(httpStatus['403_MESSAGE']);
                            err.status = httpStatus.FORBIDDEN;
                            return next(err);
                        }
                        return next();
                    }
                }
            }
        }


        if (layout === 'admin') {
            const err = new Error(httpStatus['403_MESSAGE']);
            err.status = httpStatus.FORBIDDEN;
            return next(err);
        }
        return next();
    },
    async render(req, res, next) {
        const {
            cookies,
            domains,
            layout,
            lang
        } = req.ctx;


        if (cookies.token) {
            const session = await Session.findOne({ token: cookies.token });
            if (session) {
                const { err, session: { token } } = await session.valid(req);
                if (!err) {
                    if (session.token !== token) {
                        session.token = token;
                        setToken(req, res, session);
                    }
                    const user = await User.findById(session.userId);
                    if (user) {
                        req.ctx.session = session;
                        req.ctx.user = user;
                        if (layout === 'admin' && user.role !== 'admin') return res.redirect(domains.main[lang]);
                        return next();
                    }
                }
            }
        }


        if (layout === 'admin') return res.redirect(domains.main[lang]);
        return next();
    }
};


async function access(req, res, next) {
    return f[req.ctx.resType](req, res, next);
}


export default access;
