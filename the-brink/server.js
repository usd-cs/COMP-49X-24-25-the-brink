// server.js
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const crypto = require('crypto') // For generating secure tokens
const nodemailer = require('nodemailer') // For sending emails
const app = express()

app.use(cors())

// Middleware to parse JSON request bodies
app.use(express.json())

// Create a connection pool using the DATABASE_URL environment variable.
// In your docker-compose, this is set to: postgres://PitchSuite:theBrink0628@db:5432/brinkdatabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Configure nodemailer transporter for Outlook
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false  // (optional, for testing only)
  }
});

// POST endpoint to handle ACE application submissions
app.post('/api/ace_applications', async (req, res) => {
  const {
    corporateName,
    address,
    dba,
    duns,
    naics,
    hubZone,
    rural,
    womenOwned,
    disasterImpacted,
    primaryContact,
    secondaryContact,
    agency,
    awardAmount,
    contractNumber,
    grantStartEnd,
    companyInfo,
    customerDiscovery,
    goToMarketStrategy,
    intellectualProperty,
    financing,
    successRecord
  } = req.body

  if (!corporateName || !address || !primaryContact || !primaryContact.name || !agency) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const numericAwardAmount = parseFloat(awardAmount)
  if (isNaN(numericAwardAmount)) {
    return res.status(400).json({ error: 'Award amount must be a valid numeric value.' })
  }

  try {
    const query = `
      INSERT INTO ace_applications (
        corporate_name,
        address,
        dba,
        duns,
        naics,
        hub_zone,
        rural,
        women_owned,
        disaster_impacted,
        primary_contact_name,
        primary_contact_title,
        primary_contact_phone,
        primary_contact_email,
        secondary_contact_name,
        secondary_contact_title,
        secondary_contact_phone,
        secondary_contact_email,
        agency,
        award_amount,
        contract_number,
        grant_start_end,
        company_info,
        customer_discovery,
        go_to_market_strategy,
        intellectual_property,
        financing,
        success_record
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27
      ) RETURNING *;
    `

    const values = [
      corporateName,
      address,
      dba,
      duns,
      naics,
      hubZone === 'Yes',
      rural === 'Yes',
      womenOwned === 'Yes',
      disasterImpacted === 'Yes',
      primaryContact.name,
      primaryContact.title,
      primaryContact.phone,
      primaryContact.email,
      secondaryContact ? secondaryContact.name : null,
      secondaryContact ? secondaryContact.title : null,
      secondaryContact ? secondaryContact.phone : null,
      secondaryContact ? secondaryContact.email : null,
      agency,
      numericAwardAmount,
      contractNumber,
      grantStartEnd,
      companyInfo,
      customerDiscovery,
      goToMarketStrategy,
      intellectualProperty,
      financing,
      successRecord
    ]

    const result = await pool.query(query, values)
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting application:', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// New endpoint for user sign-up
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [firstName, lastName, email, hashedPassword]
    const result = await pool.query(query, values)
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting user:', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// New endpoint for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' })
  }

  try {
    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await pool.query(query, [email])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No account found with that email' })
    }

    const user = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    // Generate a dummy token and return the user's first name
    const token = `dummy-token-for-${user.id}`
    res.status(200).json({ token, first_name: user.first_name })
  } catch (err) {
    console.error('Error during login:', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// New endpoint for forgot password using Mailjet
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    // Verify that the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No account found with that email' });
    }
    const user = result.rows[0];

    // Generate a secure token and set an expiration time (24 hours)
    const token = crypto.randomBytes(32).toString('hex');
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Update the user's record with the reset token and its expiration.
    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3',
      [token, expiration, email]
    );

    // Construct the password reset link (adjust the domain as needed)
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Set up the Mailjet payload using your environment variables
    const mailjetPayload = {
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: process.env.MJ_SENDER_NAME
          },
          To: [
            {
              Email: email,
              Name: user.first_name || ""
            }
          ],
          Subject: 'Password Reset Request',
          TextPart: `Hello,

You requested a password reset. Please click on the following link to reset your password:

${resetLink}

This link will expire in 24 hours.

If you did not request a password reset, please ignore this email.`,
          HTMLPart: `<p>Hello,</p>
                     <p>You requested a password reset. Please click on the following link to reset your password:</p>
                     <p><a href="${resetLink}">${resetLink}</a></p>
                     <p>This link will expire in 24 hours.</p>
                     <p>If you did not request a password reset, please ignore this email.</p>`
        }
      ]
    };

    // Send the email using Mailjet's REST API with Basic Auth
    const mailjetResponse = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`).toString('base64')
      },
      body: JSON.stringify(mailjetPayload)
    });

    if (!mailjetResponse.ok) {
      const errorText = await mailjetResponse.text();
      console.error('Mailjet error response:', mailjetResponse.status, errorText);
      throw new Error('Failed to send email via Mailjet');
    }

    console.log(`Password reset link sent to ${email}: ${resetLink}`);
    res.status(200).json({ message: 'Password reset link has been sent if the email is registered.' });
  } catch (err) {
    console.error('Error processing forgot password request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
