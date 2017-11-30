import { resolve } from 'path';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorhandler from 'errorhandler';
import http from 'http';
import router from './router';
import config from './config';


async function setUpConnection() {
    await mongoose.connect(config.db.fullhost, { useNewUrlParser: true });
    console.log(`MongoDB has started on port ${config.db.port}`);


    const app = express();
    app.set('port', config.port);
    app.set('view engine', 'pug');
    app.set('views', resolve(__dirname, '../application/templates/pages/'));
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser(config.cookieSecret));
    app.use('/static', express.static(resolve(__dirname, '../../public/static')));
    app.use(router);
    app.use(errorhandler());


    const server = http.createServer(app);
    server.listen(app.get('port'), () => console.log(`HTTP Server started http://localhost:${app.get('port')}`));
}

setUpConnection();
