const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const app = express();

app.use(cors());
app.use(express.json());

// Optional test route
app.get('/', (req, res) => {
  res.send("Hello from API");
});

// Connect to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// === ACE APPLICATION ENDPOINT ===
app.post('/api/ace_applications', async (req, res) => {
  const {
    corporateName, address, dba, duns, naics,
    hubZone, rural, womenOwned, disasterImpacted,
    primaryContact, secondaryContact,
    agency, awardAmount, contractNumber, grantStartEnd,
    companyInfo, customerDiscovery, goToMarketStrategy,
    intellectualProperty, financing, successRecord
  } = req.body;

  if (!corporateName || !address || !primaryContact?.name || !agency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const numericAwardAmount = parseFloat(awardAmount);
  if (isNaN(numericAwardAmount)) {
    return res.status(400).json({ error: 'Award amount must be a valid numeric value.' });
  }

  try {
    const query = `
      INSERT INTO ace_applications (
        corporate_name, address, dba, duns, naics,
        hub_zone, rural, women_owned, disaster_impacted,
        primary_contact_name, primary_contact_title, primary_contact_phone, primary_contact_email,
        secondary_contact_name, secondary_contact_title, secondary_contact_phone, secondary_contact_email,
        agency, award_amount, contract_number, grant_start_end,
        company_info, customer_discovery, go_to_market_strategy,
        intellectual_property, financing, success_record
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12, $13,
        $14, $15, $16, $17,
        $18, $19, $20, $21,
        $22, $23, $24,
        $25, $26, $27
      ) RETURNING *;
    `;

    const values = [
      corporateName, address, dba, duns, naics,
      hubZone === 'Yes', rural === 'Yes', womenOwned === 'Yes', disasterImpacted === 'Yes',
      primaryContact.name, primaryContact.title, primaryContact.phone, primaryContact.email,
      secondaryContact?.name || null,
      secondaryContact?.title || null,
      secondaryContact?.phone || null,
      secondaryContact?.email || null,
      agency, numericAwardAmount, contractNumber, grantStartEnd,
      companyInfo, customerDiscovery, goToMarketStrategy,
      intellectualProperty, financing, successRecord
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting application:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === USER SIGNUP ===
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('Signup payload:', { firstName, lastName, email, phone });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone, role`,
      [firstName, lastName, email, hashedPassword, phone]
    );

    const user = result.rows[0];

    // You can directly return the token here too if you're logging in users immediately
    const token = `dummy-token-for-${user.id}`;
    res.status(201).json({ token, ...user });
  } catch (err) {
    console.error('Error inserting user:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === USER LOGIN ===
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'No account found with that email' });

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = `dummy-token-for-${user.id}`;
    res.status(200).json({ token, first_name: user.first_name, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error during login:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === FORGOT PASSWORD ===
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'If the email is registered, a reset link will be sent.' });
    }

    const user = result.rows[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT`);
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expiration TIMESTAMP`);

    await pool.query(
      `UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3`,
      [token, expiration, email]
    );

    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    res.status(200).json({ resetLink, name: user.first_name });
  } catch (err) {
    console.error('Error processing forgot password request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === RESET PASSWORD ===
app.post('/api/reset-password', async (req, res) => {
  const { token, email, newPassword } = req.body;
  if (!token || !email || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `SELECT reset_token, reset_token_expiration FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email.' });
    }

    const { reset_token, reset_token_expiration } = result.rows[0];
    if (reset_token !== token || new Date() > reset_token_expiration) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      `UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE email = $2`,
      [hashedPassword, email]
    );

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === GET PROFILE ===
app.get('/api/get-profile', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const result = await pool.query(
      'SELECT first_name, last_name, email, phone, company FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    console.log('Fetched user profile:', user); // ✅ debug log

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === UPDATE PROFILE ===
app.post('/api/update-profile', async (req, res) => {
  const { email, name, phone, company } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email for update' });

  try {
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ') || '';

    await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3, company = $4 WHERE email = $5`,
      [firstName, lastName, phone, company, email]
    );

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === GET ALL ACE APPLICATIONS ===
app.get('/api/ace-applications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ace_applications');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching ACE applications:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === START SERVER ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});