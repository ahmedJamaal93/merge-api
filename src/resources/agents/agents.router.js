import { Router } from 'express'
import controllers, { editAgent, getOneDetails, updateAgent, updateProfilePic } from './agents.controller';
import { signUp, login, signUpFireBase, changePassword } from './authAgents.controller';

const router = Router()

// get all data
router
    .route('/')
    .get(controllers.getMany);

//add 
router.route('/')
    .post(controllers.createOne);


// signup agent without firebase
router.route('/auth/register')
    .post(signUp);


router.route('/auth/signUp')
    .post(signUpFireBase);

router.route('/auth/login')
    .post(login);

// get  by id
router
    .route('/:id')
    .get(getOneDetails);
//// edit by id
router
    .route('/:id')
    .put(editAgent);
//// delete by id
router
    .route('/:id')
    .get(controllers.getOne)
    .delete(controllers.removeOne);

router
    .route('/uploadPic/:id')
    .put(updateProfilePic)
router
    .route('/changePassword/:id')
    .put(changePassword)



export default router