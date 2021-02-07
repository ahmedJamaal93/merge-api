import config from '../config';
const SENDGRID_API_KEY = config.mailService.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
    console.log();
    const msg = {
        to: email,
        from: 'a.abdelaziz@sitech.ws',
        subject: 'Thanks, for joining in.',
        text: `Welcome to Merge, Mr/Mrs ${name}.`,
        html: `Welcome to <strong>Merge Web App</strong>, ${name}.`
    };
    sgMail.send(msg)
        .then(() => {}, error => {
            console.log(error);

            if (error.response) {
                console.log(error.response.body)
            }
        });
};
const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'info@tmgate.org',
        subject: 'Sorry to see you go!',
        text: `Goodby, ${name}. I hope to see you back sometime soon.`,
        html: `Goodby,${name}. I hope to see you back sometime soon. <strong>TMGATE Patient Care</strong>`
    };
    sgMail.send(msg);
};
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};