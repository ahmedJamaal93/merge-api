import { log } from 'winston';
import { crudControllers } from '../../../utils/crud';
import { WebRtc } from './webRtc.model';
const ErrorResponse = require('../../../utils/errorResponse');
const OpenTok = require("opentok");



function generateToken(sessionId) {
    var token = sessionId.generateToken({
        role: 'moderator',
        expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in one week

    });
    return token;
}

export const getOpentok = async(req, res) => {
    try {
        const data = await WebRtc.findOne({});
        if (!data) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        var openTok = new OpenTok(data.opentok.api_Key, data.opentok.api_Secret);

        openTok.createSession({ mediaMode: 'relayed' }, function(err, session) {
            if (err) {
                res.status(400).send({ message: e.message, status: 400 });

            } else {
                var token = generateToken(session);

                res.status(200).send({
                    apiKey: session.ot.apiKey,
                    sessionId: session.sessionId,
                    token: token,

                })

            }
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}
export const getQuickBlocks = async(req, res) => {
    try {
        const data = await WebRtc.findOne({});
        if (!data) {
            return res.status(400).send({ message: 'No Data Found.' });
        }
        res.status(200).send(data.quickBlocks)


    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message, status: 400 });
    }
}
export default crudControllers(WebRtc)