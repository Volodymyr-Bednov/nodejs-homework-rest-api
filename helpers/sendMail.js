const sgMail = require("@sendgrid/mail");

const sendMail = async (to, verificationToken, fullUrl) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verifyLink = `${fullUrl}/api/users/verify/${verificationToken}`;
  const msg = {
    to,
    from: "phone.book@mailto.plus",
    subject: "Verify user",
    html: `<strong>Please Verify Your Sender Identity</strong> 
    <p><a href=${verifyLink}>${verifyLink}</a></p>`,
  };
  console.log(msg);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendMail;
