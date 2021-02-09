import { crudControllers } from '../../utils/crud';
import { Business } from '../business/business.model';
import { Employee } from './employees.model';
var destFolder = require('../../utils/dest-folder');


export const getDetails = async(req, res) => {
    try {
        const employee = await Employee.find()

        if (!employee) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: employee,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}
export const updateProfilePic = async(req, res) => {

    try {
        destFolder.setFolderName('employee');
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
export const getOneDetails = async(req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id })

        .populate('rolesID')


        if (!employee) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: employee,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(Employee);