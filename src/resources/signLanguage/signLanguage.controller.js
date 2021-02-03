import { crudControllers } from '../../utils/crud'
import { SignLanguage } from './signLanguage.model'


export const getDetails = async(req, res) => {
    try {
        const sign = await SignLanguage.find()

        .populate('countryId')


        if (!sign) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: sign,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(SignLanguage)