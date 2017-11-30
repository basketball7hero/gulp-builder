import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';
import Session from './session.model';


const roles = ['user', 'admin'];


const schema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        index: true,
        type: String,
        lowercase: true,
        match: /\S+@\S+\.\S+/,
        trim: true
    },
    username: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    role: {
        type: String,
        enum: roles,
        default: 'user'
    }
}, { timestamps: true });


async function save(next) {
    try {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
}


schema.pre('save', save);


schema.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'email', 'username', 'role'];
        fields.forEach((field) => {
            if (field === 'id') {
                transformed[field] = this._id;
            }
            transformed[field] = this[field];
        });

        return transformed;
    },
    passwordCompare(password) {
        return bcrypt.compareSync(password, this.password);
    },
    async createSession(userAgent) {
        const userId = this._id;
        const jwtBody = {
            userId,
            exp: moment().add(10, 'm').unix(),
            iat: moment().unix()
        };
        const sessionBody = {
            closed: false,
            token: jwt.sign(jwtBody, config.jwtSecret),
            exp: moment().add(24, 'h').unix(),
            iat: moment().unix(),
            userId,
            userAgent
        };
        const session = await new Session(sessionBody).save();
        return session;
    }
});


const model = mongoose.model('User', schema);


export default model;
