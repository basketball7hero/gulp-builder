import moment from 'moment';


function setToken(req, res, session) {
    const { domains } = req.ctx;
    domains.all.forEach(domain => res.cookie('token', session.token, { domain, path: '/', expired: moment().add(1, 'd').unix(), maxAge: moment().add(1, 'd').unix(), httpOnly: true, sameSite: 'Strict' }));
}


export default setToken;
