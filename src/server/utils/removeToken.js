function removeToken(req, res) {
    const { domains } = req.ctx;
    domains.all.forEach(domain => res.clearCookie('token'));
}


export default removeToken;
