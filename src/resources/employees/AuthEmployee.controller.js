import { crudControllers } from '../../utils/crud';
import { Employees } from './employees.model';
import config from '../../config';
import jwt from 'jsonwebtoken';

const { admin } = require("../../firebase/firebase");

export const newToken = Employees => {
    return jwt.sign({ id: Employees.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
};
export const monitorSignUp = async(req, res) => {
    console.log(req.body);
    if (!req.body.credentials.email || !req.body.credentials.password || !req.body.fullName) {
        return res.status(400).send({ message: 'need Email and password' });
    }
    let monitor = await Employees.findOne({ email: req.body.credentials.email });
    if (monitor) return res.status(401).send({ status: 401, message: "This email is used Before.." });
    try {
        const user = await admin.auth().createUser({
            email: req.body.credentials.email,
            password: req.body.credentials.password
        });
        console.log(user.uid);
        const token = newToken(user);
        const doc = await Employees.create({
            /*fullName: req.body.fullName,
            address: req.body.address,
            
            phone: req.body.phone,
            credentials: {
                email: req.body.credentials.email,
                password: req.body.credentials.password,
            }*/
            ...req.body,
            credentials: {
                uid: user.uid,
                email: req.body.credentials.email,
                password: req.body.credentials.password
            },
            userType: 'monitor',



        });
        res.status(201).json({
            token,
            doc
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ status: 400, message: e.message });
    }
}
export const monitorLogin = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }
    const invalid = { status: 400, message: 'Invalid email and password combination' };

    try {
        const monitor = await Employees.findOne({ "credentials.email": req.body.email })
            .exec();

        if (!monitor) {

            return res.status(401).send(invalid);
        }
        const match = await monitor.checkPassword(req.body.password);
        console.log(match);
        if (!match) {
            return res.status(400).send(invalid);
        }
        const token = newToken(monitor);
        const id = monitor.id;
        return res.status(201).send({ token, id, monitor, status: 201 });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e.message });
    }
}

export default crudControllers(Employees);