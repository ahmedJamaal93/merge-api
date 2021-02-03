import { Router } from 'express';
import { monitorLogin, monitorSignUp } from './AuthEmployee.controller';
import controllers from './employees.controller';
import { getDetails, getOneDetails } from './employees.controller';

const router = Router();


// get all data
router
    .route('/')
    .get(getDetails);

//add employee
router.route('/')
    .post(controllers.createOne)

// get employee by id
router
    .route('/:id')
    .get(getOneDetails);
//// edit by id
router
    .route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne);

//// delete by id
router
    .route('/:id')
    .get(controllers.getOne)
    .delete(controllers.removeOne);

//auth
router.route('/auth/login')
    .post(monitorLogin)

router.route('/auth/signUp')
    .post(monitorSignUp)

export default router