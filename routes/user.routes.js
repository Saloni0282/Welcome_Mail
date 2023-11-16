const express = require('express');
const { SignUp} = require('../controller/user.controller');
const Router = express.Router()

// Schedule an email
Router.post('/signup',SignUp );




module.exports = {
    Router
}