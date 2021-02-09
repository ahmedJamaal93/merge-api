import { Router } from 'express';
import controllers, { signIn, updateMyContacts, updateMyProfile, upMyAvatar } from './user.controllers';

const router = Router();

// /service/signin
router.route('/')
    .post(controllers.getMany);


export default router;