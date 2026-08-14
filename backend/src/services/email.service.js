import nodemailer from "nodemailer";

import config from "../config/config.js";
import loadEmailTemplate from "../utils/emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

const sendVerificationEmail = async ({ email, name, verificationToken }) => {
  const verificationUrl = `${config.client.url}/verify-email/${verificationToken}`;

  const html = await loadEmailTemplate("verification", {
    NAME: name,
    VERIFICATION_URL: verificationUrl,
  });

  await transporter.sendMail({
    from: config.email.from,

    to: email,

    subject: "Verify your Sargodha Ads account",

    text: `
Hello ${name},

Please verify your Sargodha Ads account:

${verificationUrl}

This verification link expires in 15 minutes.

If you did not create this account, you can safely ignore this email.
`,

    html,
  });
};

export { sendVerificationEmail };
