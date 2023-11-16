/**
 * A set of functions called "actions" for `password-reset`
 */
import * as nodemailer from 'nodemailer';
export default {
  passwordReset: async (ctx, next) => {
    try {
      console.log(ctx.request.body)
      const email = ctx.request.body.email;

      const code = Math.floor(1000 + Math.random() * 9000);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dolgovdaniil007@gmail.com',
          pass: 'qkuq msww klvq nxgq'
        }
      });

      const mailOptions = {
        from: 'dolgovdaniil007@gmail.com',
        to: email,
        subject: 'Сброс пароля',
        text: `Ваш код для сброса пароля в приложении CureSound: ${code}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return {'code': code};
    } catch (err) {
      // ctx.body = err;
      return {'error': err};
    }
  }
};
