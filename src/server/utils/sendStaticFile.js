import fs from 'fs';
import { resolve } from 'path';
import httpStatus from 'http-status';
import envSwitch from '../../../utils/envSwitch';


function sendStaticFile({ path }) {
    return (req, res, next) => fs.readFile(resolve(resolve(__dirname, '../../../public/static/'), path), (err, file) => {
        if (err) {
            err.status = httpStatus.INTERNAL_SERVER_ERROR;
            return next(err);
        }
        res.status(httpStatus.OK);
        return res.end(file);
    });
}


export default sendStaticFile;
