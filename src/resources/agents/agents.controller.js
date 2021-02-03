import { crudControllers } from '../../utils/crud'
import { Agents } from './agents.model'
const uploadFile = require("../../middleware/fileUpload");
const { fileUploader } = require("../../middleware/fileUpload");
export const PATH = "./assets/uploads/agent"
export const updateAgent = async(req, res) => {
    try {
        console.log(req.body);
        const items = await Agents.findByIdAndUpdate({ _id: req.params.id }, {...req.body,

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

        await uploadFile(req, res);
        const items = await Agents.findByIdAndUpdate({ _id: req.params.id }, {
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
        const agent = await Agents.findById({ _id: req.params.id })

        .populate('categoryId')
            .populate('levelId')
            .populate('signLanguageId')
            .lean()
            .exec();


        if (!agent) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: agent,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export const editAgent = async(req, res) => {
    try {
        console.log(req.body);
        const pushUnits = await Agents.findByIdAndUpdate({ _id: req.params.id }, {
            ...req.body,

            '$set': {
                'categoryId': req.body.categoryId
            },
            '$set': {

                'levelId': req.body.levelId,
                'signLanguageId': req.body.signLanguageId

            }

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
}
export default crudControllers(Agents)