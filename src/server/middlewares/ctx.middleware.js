const f = {
    headers(req) {
        return req.headers;
    },
    breakpoint(req) {
        if (req.headers['user-agent'].indexOf('Mobile') > -1) return 'xs';
        if (req.headers['user-agent'].indexOf('Tablet') > -1) return 'sm';
        return 'md';
    },
    userAgent(req) {
        return req.headers['user-agent'];
    },
    cookies(req) {
        return req.cookies;
    },
    domains(req) {
        const baseHost = req.headers.host.replace(/(https?:)?(admin.)?(en.)?/g, '');
        const baseHostNoPort = baseHost.replace(/(:\d{2,4})?/g, '');
        return {
            all: [
                `${baseHostNoPort}`,
                `en.${baseHostNoPort}`,
                `admin.${baseHostNoPort}`,
                `admin.en.${baseHostNoPort}`
            ],
            main: {
                ru: `//${baseHost}`,
                en: `//en.${baseHost}`
            },
            admin: {
                ru: `//admin.${baseHost}`,
                en: `//admin.en.${baseHost}`
            }
        };
    },
    resType(req) {
        if (req.url.match(/\/api\//g)) return 'json';
        return 'render';
    },
    layout(req) {
        if (req.headers.host.indexOf('admin.') > -1) return 'admin';
        return 'main';
    },
    lang(req) {
        if (req.headers.host.indexOf('en.') > -1) return 'en';
        return 'ru';
    }
};


function ctx(req, res, next) {
    req.ctx = {
        headers: f.headers(req),
        breakpoint: f.breakpoint(req),
        userAgent: f.userAgent(req),
        cookies: f.cookies(req),
        domains: f.domains(req),
        resType: f.resType(req),
        layout: f.layout(req),
        lang: f.lang(req),
    };
    return next();
}


export default ctx;
