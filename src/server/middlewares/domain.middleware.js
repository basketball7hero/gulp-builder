function domain(req, res, next) {
    const { lang, layout, domains } = req.ctx;
    const matchsLang = req.headers.host.match(/(en.)|(ru.)/g);
    const matchsLayout = req.headers.host.match(/admin./g);
    if ((matchsLang && matchsLang.length > 1) || (matchsLayout && matchsLayout.length > 1)) {
        return res.redirect(domains[layout][lang]);
    }
    return next();
}


export default domain;
