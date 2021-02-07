import { crudControllers } from '../../../utils/crud'
import { requestService } from './request-services.model'



export const checkStatus = async(req, res) => {
    try {
        const doc = await requestService.findOne({
            phone: req.body.phone,
            userID: req.body.userID
        });
        console.log(doc);
        if (!doc) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        if (doc.status == 'pending') {
            return res.status(403).send({ message: 'found item' });
        } else {
            return res.status(202).send({ message: 'not found' });
        }

    } catch (e) {
        res.status(400).send({ message: e.message });
    }
};

export default crudControllers(requestService)