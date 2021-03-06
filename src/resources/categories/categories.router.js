import { Router } from 'express'
import controllers from './categories.controller';
const passport = require("passport");
var auth = require('../../middleware/auth')();
const router = Router()

// get all data
router
    .route('/')
    .get(controllers.getMany);
router
    .route('/api')
    .get(auth.authenticate(), controllers.getMany);

router
    .route('/apiSecure')
    .get(controllers.getMany);

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