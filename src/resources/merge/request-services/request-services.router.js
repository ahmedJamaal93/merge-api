import { Router } from 'express'
import controllers, { checkStatus } from './request-services.controller';

const router = Router()

// get all data
router
    .route('/')
    .get(controllers.getMany);

router.route('/')
    .post(checkStatus)

// get country by id
router
    .route('/:id')
    .get(controllers.getOne);
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


export default router