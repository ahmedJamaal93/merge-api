import { crudControllers } from '../../utils/crud'
import { Categories } from './categories.model'

export const updateCategory = async(req, res) => {
    try {
        const category = await Categories.findByIdAndUpdate(req.category._id, req.body, {
                new: true
            })
            .lean()
            .exec()

        res.status(200).json({ data: category })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export default crudControllers(Categories)