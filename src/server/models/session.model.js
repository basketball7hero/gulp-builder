import httpStatus from 'http-status';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';


const schema = new mongoose.Schema({
    closed: {
        required: true,
        type: Boolean,
        default: false
    },
    token: {
        required: true,
        unique: true,
        index: true,
        type: String
    },
    exp: {
        required: true,
        type: Number
    },
    iat: {
        required: true,
        type: Number
    },
    userId: {
        required: true,
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userAgent: {
        required: true,
        type: String
    }
}, { timestamps: true });


schema.method({
    userAgentCompare(userAgent) {
        try {
            if (userAgent !== this.userAgent) throw new Error('User agent - does not match');
            return {};
        } catch ({ message: err }) {
            return { err };
        }
    },
    sessionExpired() {
        try {
            if ((this.exp - moment().unix()) <= 0) throw new Error('Session is expired');
            return {};
        } catch ({ message: err }) {
            return { err };
        }
    },
    tokenExpired() {
        try {
            jwt.verify(this.token, config.jwtSecret);
            return {};
        } catch ({ message: err }) {
            return { err: 'Token is expired' };
        }
    },
    async tokenRefrash() {
        try {
            const { id } = jwt.decode(this.token, config.jwtSecret);
            const token = jwt.sign({
                exp: moment().add(10, 'm').unix(),
                iat: moment().unix(),
                id
            }, config.jwtSecret);
            await this.update({ $set: { token } });
            return token;
        } catch (err) {
            return null;
        }
    },
    async valid(req) {
        const { userAgent } = req.ctx;
        try {
            if (this.closed) throw new Error(httpStatus['401_MESSAGE']);
            const { err: errUserAgent } = this.userAgentCompare(userAgent);
            if (errUserAgent) throw new Error(httpStatus['401_MESSAGE']);
            const { err: errSeesionExpired } = this.sessionExpired();
            if (errSeesionExpired) throw new Error(httpStatus['401_MESSAGE']);
            const { err: errTokenExpired } = this.tokenExpired();
            if (errTokenExpired) {
                const token = await this.tokenRefrash();
                if (!token) throw new Error(httpStatus['401_MESSAGE']);
                this.token = token;
            }
            return { session: this };
        } catch (err) {
            err.status = httpStatus.UNAUTHORIZED;
            return { err, session: this };
        }
    }
});


const model = mongoose.model('Session', schema);


export default model;
