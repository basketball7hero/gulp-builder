import express from 'express';
import validate from 'express-validation';
import * as controller from '../../controllers/user.controller';
import * as validation from '../../validations/user.validation';


const router = express.Router();


router.route('/create')
    .post(validate(validation.create), controller.create);


router.route('/login')
    .post(validate(validation.login), controller.login);


router.route('/sign')
    .post(validate(validation.protect), controller.protect(controller.sign));


router.route('/logout')
    .post(validate(validation.protect), controller.protect(controller.logout));


export default router;
