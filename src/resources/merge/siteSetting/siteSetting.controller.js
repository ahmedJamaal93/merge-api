import { crudControllers } from '../../../utils/crud'
import { SiteSetting } from './siteSetting.model'



export const getEnableX = async(req, res) => {
    try {
        const setting = await SiteSetting.find({ _id: req.params.id },


        ).select('mobile_app');

        if (!setting) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            setting
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const getService = async(req, res) => {
    try {
        const setting = await SiteSetting.find({ _id: req.params.id },


        ).select('mobile_app');

        if (!setting) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            setting
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export default crudControllers(SiteSetting)