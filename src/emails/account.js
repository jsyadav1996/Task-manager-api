const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        from: 'jsyadav.1996@gmail.com',
        to: email,
        subject: 'Welcome to Task App!',
        text: `Hi, ${name}. Thanks for registering with us.`,
      };
      sgMail.send(msg);
};

const sendCancelEmail = (email, name) => {
    const msg = {
        from: 'jsyadav.1996@gmail.com',
        to: email,
        subject: 'Cancellation from Task App!',
        text: `Hi, ${name}. Your account has been deleted from Task app. Please rate us how we can improve further`,
      };
      sgMail.send(msg);
};

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}