import { crudControllers } from '../../../utils/crud'
import { requestService } from './request-services.model'



export const checkStatus = async(req, res) => {
    try {
        const doc = await requestService.findOne({
            phone: req.body.phone,
            userID: req.body.userID,
            status: 'pending'
        });
        if (doc) {
            return res.status(400).send({
                message: 'found item waiting to support',
                status: 400
            });
        } else {
            try {
                const item = await requestService.create({
                    ...req.body,

                });
                res.status(201).json({
                    status: 201,
                    message: "Add Successfully"
                });
            } catch (e) {
                res.status(400).send({ message: e.message, status: 400 });
            }
        }

    } catch (e) {
        res.status(400).send({ message: e.message });
    }
};

export default crudControllers(requestService)