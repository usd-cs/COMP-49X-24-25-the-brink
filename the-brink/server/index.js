const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());

//Nodemailer transporter setup 
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, //set this in .env file 
        pass: process.env.EMAIL_PASS //set this in .env file 
    }

});

app.post('/send-email', async (req, res) => {
    const {email, name} = req.body; 

    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email,
        subject: 'Application Confirmation', 
        text: 'Hello, ${name}, \n\nThank you for your application on PitchSuite! Please keep an eye out for further updates as the competition gets closer!'
    }; 
    try{
        await transporter.sendMail(mailOptions); 
        res.status(200).json({message: "Email sent successfully!"});
    } catch(error){
        console.error(error); 
        res.status(500).json({error: "Failed to send email."});

    }
});

app.listen(5000, () => console.log('Server running on port ${PORT}')); 

