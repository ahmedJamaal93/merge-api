import { db, firebase, admin } from '../../../firebase/firebase';
import { crudControllers } from '../../../utils/crud'
import { CallHistory } from './callHistory.model'

export const getActiveCall = async(req, res) => {
    try {
        var activeCall = [];
        const active = await db.collection('Active_Sessions')
            .where('Accepted', '==', true)
            .where("EndSession", "==", false).where("User_isJoined", "==", true)
            .get();
        active.forEach((doc) => {
            activeCall.push({
                id: doc.id,
                ...doc.data()
            });
        });

        if (!activeCall) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json(activeCall);
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export const getInActiveCall = async(req, res) => {
    try {
        var activeCall = [];
        const active = await db.collection('Active_Sessions')
            .where('Accepted', '==', false)
            .where("User_isJoined", "==", true)
            .get();
        active.forEach((doc) => {
            activeCall.push({
                id: doc.id,
                ...doc.data()
            });
        });

        if (!activeCall) {
            return res.status(400).send({ message: 'No Data Found.' });
        }

        res.status(200).json(activeCall);
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};

export default crudControllers(CallHistory)