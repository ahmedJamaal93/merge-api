import { Router } from 'express'
import controllers from './muteNotification.controller';
import { getAllDetails } from './muteNotification.controller';

const router = Router()

router
    .route('/')
    .get(getAllDetails);

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