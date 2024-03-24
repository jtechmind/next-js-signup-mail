import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (email === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpirty: Date.now() + 3600000,
      });
    } else if (email === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7cf09cc8c69d87",
        pass: "333cdaee1e0d6f",
      },
    });
    const mailOptions = {
      from: "jaikumarsoft@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your email",
      // text: "",
      html: "<b>Hello World.</b>",
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }

  // const transporter = nodemailer.createTransport({
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "",
  //     pass: "",
  //   },
  // });
  // from mailtrap
};
