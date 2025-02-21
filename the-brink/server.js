// server.js
const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const app = express()

app.use(cors())

// Middleware to parse JSON request bodies
app.use(express.json())

// Create a connection pool using the DATABASE_URL environment variable.
// In your docker-compose, this is set to: postgres://PitchSuite:theBrink0628@db:5432/brinkdatabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

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

  // Basic validation: ensure required fields are provided
  if (!corporateName || !address || !primaryContact || !primaryContact.name || !agency) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate awardAmount: ensure it is a valid number
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
      numericAwardAmount, // Use the validated numeric value
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

  // Basic validation: ensure all fields are provided
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [firstName, lastName, email, password]
    const result = await pool.query(query, values)
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting user:', err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server on the port specified by the PORT environment variable (default to 3001)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
