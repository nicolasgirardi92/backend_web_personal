import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


export async function mailer(subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.MAIL_PASSWORD!
        }
    });
    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER!,
        to: process.env.EMAIL_DESTINY!,
        subject: subject,
        text: body,
        html: `<p>${body}</p>`
    };
    return await transporter.sendMail(mailOptions);
}
