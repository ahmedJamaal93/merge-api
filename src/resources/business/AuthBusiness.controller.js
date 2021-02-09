import { crudControllers } from '../../utils/crud'
import { Business } from './business.model';
import config from '../../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
///import { auth } from '../../utils/authGuard';
const { admin, firebase } = require("../../firebase/firebase");
import { genrateWebToken } from '../../utils/jwt';



export const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    const invalid = { status: 400, message: 'Invalid email and password combination' };

    try {
        const business = await Business.findOne({ "credentials.email": req.body.email },
                '_id credentials name address phone')
            .exec();

        if (!business) {

            return res.status(401).send(invalid);
        }
        const match = await business.checkPassword(req.body.password);
        if (!match) {
            return res.status(400).send(invalid);
        }
        const token = genrateWebToken(business);
        return res.status(201).send({ token, business, status: 201 });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e.message });
    }
};
export const signUpFireBase = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    let userData = await Business.findOne({ 'credentials.email': req.body.email });
    if (userData) return res.status(401).send({ status: 401, message: "This phone is used Before.." });
    try {
        const business = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password
        });

        const token = genrateWebToken(business);
        const doc = await Business.create({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            uid: business.uid,
            phone: req.body.phone,
            contactName: req.body.contactName,
            credentials: {
                email: req.body.email,
                password: req.body.password,
            },


        });

        res.status(201).json({
            token,
            doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ status: 400, message: e.message });
    }

};
// signup business without firebase
export const signUp = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    let userData = await Business.findOne({ 'credentials.email': req.body.email });
    if (userData) return res.status(401).send({ status: 401, message: "This email is used Before.." });
    try {
        const doc = await Business.create({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            phone: req.body.phone,
            contactName: req.body.contactName,
            credentials: {
                email: req.body.email,
                password: req.body.password,
            },

        });

        const token = genrateWebToken(doc);
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

    let userData = await Business.findOne({ _id: req.params.id }).exec();
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
        const doc = await Business.findByIdAndUpdate({ _id: req.params.id }, {
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

export default crudControllers(Business)