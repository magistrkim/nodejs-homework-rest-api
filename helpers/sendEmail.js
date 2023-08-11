import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL, UKR_NET_KEY } = process.env;

// 1.create object with settings
const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_KEY,
  },
};
// 2.create object which we will use for sending emails
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};

export default sendEmail;
// 3.create email
// const email = {
//   from: UKR_NET_EMAIL,
//   to: "jetas92447@tiuas.com",
//   subject: "Test email from VSCode",
//   html: "<strong>Test email to check if it works</strong>",
// };

// 4.Sending email
// transport
//   .sendMail(email)
//   .then(() => console.log("Email sending success"))
//   .catch((error) => console.log(error.message));
