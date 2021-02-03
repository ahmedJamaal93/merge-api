import { Router } from 'express'
import controllers from './signLanguage.controller';
import { getDetails } from './signLanguage.controller';

const router = Router()

// get all data
router
    .route('/')
    .get(getDetails);

//add country
router.route('/')
    .post(controllers.createOne)

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