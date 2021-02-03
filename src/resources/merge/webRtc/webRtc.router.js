import { Router } from 'express'
import Controllers, { getSessionID, getOpentok, getQuickBlocks } from './webRtc.controllers';
const multer = require('multer');

const router = Router()

router.route('/opentok').get(getOpentok)

router.route('/quickBlock').get(getQuickBlocks);


router.route('/').get(Controllers.getMany)

router.route('/AddWebRtc').put(Controllers.createOneIfNotFound)






export default router