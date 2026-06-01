import nodemailer from 'nodemailer'

const sendEmail = async ({to, subject,html})=>{

    // create transporter...
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

    // send email...
    await transporter.sendMail({
        from : `"fluffyFriend" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
}


export default sendEmail