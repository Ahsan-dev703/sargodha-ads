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

const sendPasswordResetEmail = async ({ email, name, passwordResetToken }) => {
  const resetUrl = `${config.client.url}/reset-password/${passwordResetToken}`;

  const html = await loadEmailTemplate("password-reset", {
    NAME: name,
    RESET_URL: resetUrl,
  });

  await transporter.sendMail({
    from: config.email.from,

    to: email,

    subject: "Reset your Sargodha Ads password",

    text: `
Hello ${name},
We received a request to reset your password for Sargodha Ads.
${resetUrl}
This password reset link expires in 15 minutes.
If you did not request this, you can safely ignore this email.
`,
    html,
  });
};

export { sendVerificationEmail, sendPasswordResetEmail };
