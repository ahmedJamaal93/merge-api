import { Router } from 'express'
import { getActiveCall, getCallHistory, getInActiveCall } from './callHistory.controller';
import controllers from './callHistory.controller';

const router = Router()

router
    .route('/')
    .get(controllers.getMany);
router
    .route('/active')
    .get(getActiveCall);
router
    .route('/inactive')
    .get(getInActiveCall);

//add country
router.route('/')
    .post(controllers.createOne)





export default router