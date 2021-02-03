import config from '../config';
import { Agents } from '../resources/agents/agents.model';
import jwt from 'jsonwebtoken';
const {
    sendWelcomeEmail,
    sendCancelationEmail
} = require('../emails/sendGrid');



export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });


export const protect = model => async(req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Not a valid token.' });
    }

    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    try {
        payload = await verifyToken(token);
    } catch (e) {
        return res.status(401).send({ message: 'Not a valid token.' });
    }

    const user = await model.findById(payload.id)
        .select('-password')
        .lean()
        .exec();

    if (!user) {
        return res.status(401).send({ message: 'Not a valid token.' });
    }

    req.user = user;
    next();
};
export const Protected = model => ({
    protect: protect(model)
})