const SENDGRID_API_KEY =
  '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';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: 'info@tmgate.org',
    subject: 'Thanks, for joining in.',
    text: `Welcome to TMGATE Patient Care, ${name}. Let me know how you get along with TMGATE Patient Care`,
    html: `Welcome to <strong>TMGATE Patient Care</strong>, ${name}. Let me know how you get along with <strong>TMGATE Patient Care</strong>`
  };
  sgMail.send(msg);
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
