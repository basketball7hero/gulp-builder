function redirect(req, res, next) {
    const {
        domains,
        layout,
        lang,
        session,
        user
    } = req.ctx;


    if (session && user) {
        if (req.url.match(/^\/login$/g)) return res.redirect(domains[layout][lang]);
        if (req.url.match(/^\/registration$/g)) return res.redirect(domains[layout][lang]);
    } else {
        if (req.url.match(/^\/logout$/g)) return res.redirect(domains.main[lang]);
    }


    return next();
}


export default redirect;