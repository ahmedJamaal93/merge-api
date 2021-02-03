import { crudControllers } from '../../utils/crud'
import { Agents } from './agents.model'
import config from '../../config';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
const { admin, firebase } = require("../../firebase/firebase");

export const newToken = Agents => {
    return jwt.sign({ id: Agents.id }, config.secrets.jwt, {
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
export const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    const invalid = { status: 400, message: 'Invalid email and password combination' };

    try {
        const agent = await Agents.findOne({ "credentials.email": req.body.email })
            .exec();

        if (!agent) {

            return res.status(401).send(invalid);
        }
        console.log(req.body.password);
        const match = await agent.checkPassword(req.body.password);
        console.log(match);
        if (!match) {
            return res.status(400).send(invalid);
        }
        const token = newToken(agent);
        return res.status(201).send({ token, agent, status: 201 });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e.message });
    }
};
export const signUpFireBase = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    let userData = await Agents.findOne({ 'credentials.email': req.body.email });
    if (userData) return res.status(401).send({ status: 401, message: "This phone is used Before.." });
    try {
        const user = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password
        });

        const token = newToken(user);
        const doc = await Agents.create({
            fullName: req.body.fullName,
            address: req.body.address,
            uid: user.uid,
            phone: req.body.phone,
            credentials: {
                email: req.body.email,
                password: req.body.password,
            },
            language: req.body.language


        });



        console.log(doc);
        res.status(201).json({
            token,
            doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ status: 400, message: e.message });
    }

};
// signup agent without firebase
export const signUp = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    let userData = await Agents.findOne({ 'credentials.email': req.body.email });
    if (userData) return res.status(401).send({ status: 401, message: "This email is used Before.." });
    try {
        const doc = await Agents.create({
            fullName: req.body.fullName,
            address: req.body.address,
            phone: req.body.phone,
            credentials: {
                email: req.body.email,
                password: req.body.password,
            },
            language: req.body.language

        });

        const token = newToken(doc);

        console.log(doc);
        res.status(201).json({
            token,
            doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ status: 400, message: e.message });
    }

};
export const changePassword = async(req, res) => {
    if (!req.body.oldPassword || !req.body.password || !req.body.rePassword) {
        return res.status(400).send({ message: 'need oldPassword and new password' });
    }
    const invalid = { status: 400, message: 'old password is not ' };

    let userData = await Agents.findOne({ _id: req.params.id }).exec();
    console.log(userData);
    if (!userData) return res.status(401).send({ status: 401, message: "no Data Found.." });

    const match = await userData.checkPassword(req.body.oldPassword);
    if (!match) {
        return res.status(400).send(invalid);
    }
    if (req.body.password != req.body.rePassword) return res.status(401).send({
        status: 401,
        message: "please enter matching password.."
    });
    try {

        const hash = bcrypt.hashSync(req.body.password, 8);
        console.log(hash);
        const doc = await Agents.findByIdAndUpdate({ _id: req.params.id }, {
            'credentials.password': hash,

        }, { upsert: true })

        res.status(201).json({
            doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ status: 400, message: e.message });
    }

};

export default crudControllers(Agents)