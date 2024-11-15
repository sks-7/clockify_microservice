import nodemailer from "nodemailer";
const sendMail = async (toEmail, subject, text, html, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            auth: {
                user: process.env.Ower_email,
                pass: process.env.OwerPass,
            },
        });
        var mailOptions = {
            from: process.env.Ower_email,
            to: toEmail,
            subject: subject,
            text: text,
            html: html,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    msg: "Something went wrong to sending the mail" + error.message,
                });
            }
            else {
                console.log("Email sent: " + info.response);
                return res.status(200).json({
                    success: true,
                    msg: "Mail Send successfully",
                });
            }
        });
    }
    catch (e) {
        return res.status(500).send({
            message: "Something went wrong",
            err: e,
        });
    }
};
export { sendMail };
