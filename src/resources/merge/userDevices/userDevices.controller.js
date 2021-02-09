import { crudControllers } from '../../../utils/crud'
import { UserDevice } from './userDevices.model'


export const getAllDetails = async(req, res) => {
    try {
        const userDevices = await UserDevice.find({})
            .populate('user_id', 'user_name country_code phone_no')
            .lean()
            .exec();

        if (!userDevices) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: userDevices,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(UserDevice)