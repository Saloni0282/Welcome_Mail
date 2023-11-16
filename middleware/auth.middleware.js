const nodemailer = require('nodemailer');

let sendverificationmail = async (email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
          
            auth: {
                user: "salonishalu2000@gmail.com",
                pass: process.env.googlepassword ,
            },
        });
        let usermail = {

            to: email,
            subject: "Signup Successfully",
            html: `
       
        <h2>Created Account Successfully</h2>
        <button>Login</button>
      `,
        };
     
        transporter.sendMail(usermail, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
       
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    sendverificationmail
}