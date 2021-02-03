import { Router } from 'express'
import { changePassword, login, signUp, signUpFireBase } from './AuthBusiness.controller';
import controllers, { updateProfilePic, updateBusiness } from './business.controller';
const router = Router()


router
    .route('/')
    .get(controllers.getMany);

//add 
router.route('/')
    .post(controllers.createOne)

// get  by id
router
    .route('/:id')
    .get(controllers.getOne);
//// edit by id
router
    .route('/:id')
    .put(updateBusiness);

//// delete by id
router
    .route('/:id')
    .get(controllers.getOne)
    .delete(controllers.removeOne);

// signup agent without firebase
router.route('/auth/register')
    .post(signUp);


router.route('/auth/signUp')
    .post(signUpFireBase);

router.route('/auth/login')
    .post(login);



router
    .route('/uploadPic/:id')
    .put(updateProfilePic)
router
    .route('/changePassword/:id')
    .put(changePassword)



export default router