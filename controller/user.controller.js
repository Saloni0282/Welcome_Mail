const nodemailer = require('nodemailer');
const bcrypt  = require('bcrypt') ;
const { UserModel } = require('../models/user.model');

const { sendverificationmail }=require("../middleware/auth.middleware")

const SignUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the provided email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(201).json({ "msg": 'User already exists. Please login.' });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        await sendverificationmail(req.body.email)
        // Respond with a success message
        res.status(200).json({ "msg": 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
};


module.exports = {
    SignUp
}