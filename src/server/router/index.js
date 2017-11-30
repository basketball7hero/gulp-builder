import express from 'express';
import httpStatus from 'http-status';
import sendStaticFile from '../utils/sendStaticFile';
import requestError from '../utils/requestError';
import apiRouter from './apiRouter';
import ctx from '../middlewares/ctx.middleware';
import domain from '../middlewares/domain.middleware';
import access from '../middlewares/access.middleware';
import redirect from '../middlewares/redirect.middleware';
import render from '../utils/render';


const router = express.Router();


router.use(ctx);
router.use(domain);
router.use(access);
router.use(redirect);
router.get('/favicon.ico', sendStaticFile({ path: '/images/favicon.ico' }));
router.use('/api', apiRouter);


router.get('/', render('home'));
router.get('/login', render('login'));
router.get('/logout', render('logout'));
router.get('/registration', render('registration'));


router.use((req, res, next) => {
    const err = new Error(httpStatus['404_MESSAGE']);
    err.status = httpStatus.NOT_FOUND;
    err.message = err.message;
    return next(err);
});


router.use((err, req, res, next) => {
    if (err.status === httpStatus.NOT_FOUND) {
        res.status(httpStatus.NOT_FOUND);
        return render('page404')(req, res);
    }
    if (!err.status) err.status = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(err.status);
    return res.json({ err: requestError(err) });
});


export default router;
