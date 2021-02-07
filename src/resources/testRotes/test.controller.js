import { sendWelcomeEmail } from '../../utils/sendMails'
import { sendSMS } from '../../utils/sendSms'
import { FawryPayAtFawry } from '../../utils/payment'

export const sendMails = async(req, res) => {
    try {
        const resss = sendWelcomeEmail(req.body.email, req.body.name);
        res.status(200).json('massage Send Sucessfully');
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
//twilio services
export const sendSms = async(req, res) => {
    try {
        const resss = sendSMS(req.body.phone, req.body.message);
        res.status(200).json('massage Send Sucessfully');
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};
//test fawry services
export const payment = async(req, res) => {
    try {
        const data = FawryPayAtFawry();
        console.log(data);
        res.status(200).json({ message: 'massage Send Sucessfully', data: data });
    } catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
};