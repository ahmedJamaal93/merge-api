import { crudControllers } from '../../utils/crud';
import { Employee } from './employees.model';


export const getDetails = async(req, res) => {
    try {
        const employee = await Employee.find()

        if (!employee) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: employee,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}
export const getOneDetails = async(req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id })

        .populate('rolesID')


        if (!employee) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: employee,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(Employee);