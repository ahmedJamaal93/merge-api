import { crudControllers } from '../../utils/crud'
import { Business } from './business.model'
import bcrypt from 'bcrypt';
var destFolder = require('../../utils/dest-folder');
const uploadFile = require("../../middleware/fileUpload");
const { fileUploader } = require("../../middleware/fileUpload");
export const PATH = "./assets/uploads/business"



export const pushCredentials = async(req, res) => {
    try {
        const items = await Business.findOne({ _id: req.params.id, 'credentials.email': { "$in": [req.body.credentials.email] } });
        if (items) {
            return res.status(402).send({ message: 'this mail used before.' });
        }
        let hashedPassword = bcrypt.hashSync(req.body.credentials.password, 8);
        const pushUnits = await Business.findByIdAndUpdate({ _id: req.params.id }, {

            "$push": {
                "credentials": {
                    email: req.body.credentials.email,
                    password: hashedPassword,
                    isActive: req.body.credentials.isActive,
                }
            },

        });

        if (!pushUnits) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: pushUnits
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
export const updateBusiness = async(req, res) => {
    try {
        console.log(req.body);
        const items = await Business.findByIdAndUpdate({ _id: req.params.id }, {...req.body,

        }, { upsert: true })
        if (!items) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: items
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
export const updateProfilePic = async(req, res) => {

    try {
        destFolder.setFolderName('business');

        await uploadFile(req, res);
        const items = await Business.findByIdAndUpdate({ _id: req.params.id }, {
            profilePicUrl: req.file.filename

        }, { upsert: true })
        if (!items) {
            return res.status(400).send({ message: 'No Data Found.' });
        }
        res.status(200).send({
            message: "Uploaded the file successfully: ",
            status: 200,
            item: items,

        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${err}`,
        });
    }


};
export default crudControllers(Business)