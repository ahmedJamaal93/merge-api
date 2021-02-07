import config from '../config';

const accountSid = config.SmsService.TWILIO_ACCOUNT_SID;
const authToken = config.SmsService.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = (phone, message) => {
    const res = client.messages
        .create({
            body: message,
            from: '+12016853364',
            to: `+20${phone}`

        })
        .then(message => console.log(message.sid));

};
module.exports = {
    sendSMS
};