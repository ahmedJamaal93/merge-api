import { crudControllers } from '../../../utils/crud'
import { Block } from './block.model'


export const getAllDetails = async(req, res) => {
    try {
        const block = await Block.find({})
            .populate('userId', 'user_name country_code phone_no')
            .populate('blockUserId', 'user_name country_code phone_no')
            .lean()
            .exec();

        if (!block) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: block,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}


export default crudControllers(Block)