import { crudControllers } from '../../../utils/crud'
import { MuteNotification } from './muteNotification.model'



export const getAllDetails = async(req, res) => {
    try {
        const mute = await MuteNotification.find({})
            .populate('user_id', 'user_name country_code phone_no')
            .lean()
            .exec();

        if (!mute) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: mute,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(MuteNotification)