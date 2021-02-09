import { Router } from 'express'
import { payment } from './payTabs.controller';

const router = Router()

// get all data
router
    .route('/payment')
    .get(payment);

export default router