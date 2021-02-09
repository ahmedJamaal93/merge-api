import { Router } from 'express'
import controllers, { payment } from './fawry.controller';

const router = Router()

// get all data
router
    .route('/payment')
    .get(payment);

export default router