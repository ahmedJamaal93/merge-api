import { Router } from 'express'
import { payment, sendMails, sendSms } from './test.controller';

const router = Router()

router
    .route('/sendMail')
    .post(sendMails);

router
    .route('/sendSms')
    .post(sendSms);

router
    .route('/pay')
    .post(payment);

export default router