const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"SOVRA SOVRA" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

const getOTPTemplate = (otp, name) => {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0f0f0; padding: 60px 40px; color: #1a1a1a;">
      <div style="text-align: center; margin-bottom: 50px;">
        <h1 style="font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; font-size: 24px; margin: 0;">SOVRA</h1>
        <p style="font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: #999; margin-top: 10px;">SOVRA of Fine Jewellery</p>
      </div>

      <div style="margin-bottom: 40px;">
        <p style="font-size: 16px; font-style: italic; color: #444; margin-bottom: 25px;">Chère ${name || 'Patron'},</p>
        <p style="font-size: 14px; line-height: 1.8; color: #666; margin-bottom: 30px;">
          To ensure the security of your private curation and maintain the exclusivity of our collective, please verify your entry using the unique access code provided below.
        </p>
      </div>

      <div style="background-color: #fcfcfc; border: 1px solid #f5f5f5; padding: 40px 20px; text-align: center; margin-bottom: 40px;">
        <span style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; display: block; margin-bottom: 15px;">Your Access Code</span>
        <span style="font-size: 36px; font-weight: 300; letter-spacing: 0.5em; color: #1a1a1a;">${otp}</span>
      </div>

      <p style="font-size: 12px; line-height: 1.8; color: #888; text-align: center; margin-bottom: 50px;">
        This code is valid for professional use for the next 10 minutes.<br />
        If you did not initiate this request, please disregard this correspondence.
      </p>

      <div style="border-top: 1px solid #f0f0f0; pt-40; padding-top: 40px; text-align: center;">
        <p style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #bbb; margin-bottom: 15px;">Maison Sovra Paris</p>
        <div style="font-size: 10px; color: #ccc;">
          Place Vendôme, Paris &bull; Via Montenapoleone, Milan &bull; New Bond Street, London
        </div>
      </div>
    </div>
  `;
};

module.exports = { sendEmail, getOTPTemplate };
