// import nodemailer from 'nodemailer'

// const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.mailtrap.io',
//             port: 2525,
//             auth: {
//                 user: '45831bc7370e35', 
//                 pass: 'b57b363d526a41'
//             }
//         })
    
//         const message = {
//             from: `"Tobechi Chukwuleta" <dc3d2badcc-29a398@inbox.mailtrap.io>`,
//             to: 'tobechichukwuleta125@gmail.com',
//             subject: 'Node Contact Request',
//             text: "My man whats up",
//             html: output
//         }

//         transporter.sendMail(message, (err, info) => {
//             if (err) {
//                 return console.log(err)
//             }
//             console.log('Message sent %s', info.messageId)
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    
//             res.render('main', {msg: 'Email has been sent'})
//         })
//     }
// }