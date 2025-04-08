import Mailgen from "mailgen";
import nodeMailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Proman",
      link: "https://proman.vercel.app"
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  const emailHTML = mailGenerator.generate(options.mailGenContent);

  const transporter = nodeMailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS
    }
  });

  const mailMassege = {
    from: '8lMlW@example.com',
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHTML
  };

  try {
    await transporter.sendMail(mailMassege);
  } catch (error) {
    console.log("Error in sending mail", error);
  }
}

// Factory function
const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Proman! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Proman, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl
        }
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }
};

const forgotPasswordMailGenContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "You have requested to reset your password for Proman.",
      action: {
        instructions: "To reset your password, click here:",
        button: {
          color: "#22BC66",
          text: "Reset your password",
          link: resetPasswordUrl
        }
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }
}