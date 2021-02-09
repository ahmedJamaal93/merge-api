import { crudControllers } from '../../../utils/crud'
import { Review } from './reviews.model'


export const createOne = async(req, res) => {
    try {
        const doc = await Review.create({
            ...req.body,

        });
        res.status(201).json({
            status: 201,
            message: "Review Add Successfully"
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
};

export default crudControllers(Review)