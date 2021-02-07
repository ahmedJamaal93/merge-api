import jwt from 'jsonwebtoken';
import config from '../config';

export const genrateWebToken = User => {
    return jwt.sign(User.toObject(), config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
};

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });