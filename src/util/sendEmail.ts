/* import nodemailer from 'nodemailer'

const sendEmail = async (options: { email: any; subject: any; message?: any }) => {
    const transporter = nodemailer.createTransport({
        service:'process.env.SMPT_SERVICE',
        auth: {
            user: "process.env.SMPT_MAIL",
            password: "process.env.SMPT_PASSWORD",
        },
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
}
export default sendEmail */