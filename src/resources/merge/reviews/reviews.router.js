import { Router } from 'express'
import controllers, { createOne } from './reviews.controller';

const router = Router()

// get all data
router
    .route('/')
    .get(controllers.getMany);

//add country
router.route('/')
    .post(createOne)

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