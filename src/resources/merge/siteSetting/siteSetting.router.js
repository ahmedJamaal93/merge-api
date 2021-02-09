import { Router } from 'express'
import { getEnableX } from './siteSetting.controller';
import controllers from './siteSetting.controller';

const router = Router()

router
    .route('/')
    .get(controllers.getMany);

//add country
router.route('/')
    .post(controllers.createOne)

// get country by id
router
    .route('/:id')
    .get(controllers.getOne);

router
    .route('/enableX/:id')
    .get(getEnableX);
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