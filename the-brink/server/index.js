require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
  origin: 'http://localhost:3000', // Change this to match your frontend port
  methods: ['POST'],
  s
}))
app.use(express.json())

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // set this in .env file
    pass: process.env.EMAIL_PASS // set this in .env file
  }

})

app.post('/sendemail', async (req, res) => {
  const { email, name } = req.body

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Application Confirmation',
    text: `Hello, ${name}, \n\nThank you for your application on PitchSuite! Please keep an eye out for further updates as the competition gets closer!`
  }
  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
