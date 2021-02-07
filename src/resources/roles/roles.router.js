import { Router } from 'express'
import controllers from './roles.controller';
import { updateRoles, edit, getDetails, getOneDetails } from './roles.controller';

const router = Router()

router
    .route('/')
    .get(getDetails);
router
    .route('/')
    .post(controllers.createOne);

//updated 
router
    .route('/:id')
    .put(controllers.updateOne);

router
    .route('/:id')
    .get(getOneDetails)
    .put(controllers.updateOne)
    .delete(controllers.removeOne);


export default router