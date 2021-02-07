import { crudControllers } from '../../utils/crud'
import { Employee } from '../employees/employees.model';
import { Roles } from './roles.model'

const { Business } = require('../business/business.model');
const { Agents } = require('../agents/agents.model');

export const edit = async(req, res) => {
    try {
        const pushUnits = await Roles.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                description: req.body.description,
                privilege: req.body.privilege
            }

        );
        console.log("sss");

        if (!pushUnits) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: pushUnits
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
export const getDetails = async(req, res) => {
    try {

        const roles = await Roles.find().populate({ path: 'userId', select: 'credentials fullName address phone name' })


        /* .populate('userId')
             .exec(function(err, users) {

                  roles.populate(users, { path: users.roleName }, function(err, doc) {
                      res.json(doc);
                  });
             });
             */
        /*
        .populate({
                path: 'userId',
                model: Employee

            })
            .populate({
                path: 'userId',
                model: Agents

            }).exec(function(err, story) {
                if (err) return handleError(err);
                console.log('The author is %s');
                console.log(story);
                // prints "The author is Ian Fleming"
            });

*/



        if (!roles) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: roles,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}
export const getOneDetails = async(req, res) => {
    try {
        const roles = await Roles.findById({ _id: req.params.id })

        .populate({ path: 'userId', select: 'credentials fullName address phone name' })


        if (!roles) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json({
            data: roles,
            status: 200
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}

export default crudControllers(Roles)