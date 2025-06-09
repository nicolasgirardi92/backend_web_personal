import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


export async function mailer(from: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.MAIL_PASSWORD!
        }
    });
    const new_subject = `${subject} - from: ${from}`;
    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER!,
        to: process.env.EMAIL_DESTINY!,
        subject: new_subject,
        text: body,
        html: `<p>${body}</p>`
    };
    return await transporter.sendMail(mailOptions);
}
