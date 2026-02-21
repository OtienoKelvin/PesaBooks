const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendInvoiceEmail = async ({ to, subject, text, pdfBuffer, filename }) => {
    const mailOptions = {
        from: `"PesaBooks" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        attachments: [
            {
                filename,
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    };

    return transporter.sendMail(mailOptions);
};