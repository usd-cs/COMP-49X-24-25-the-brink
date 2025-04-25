CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  role TEXT DEFAULT 'user',
  reset_token TEXT,
  reset_token_expiration TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ace_applications (
  id SERIAL PRIMARY KEY,
  corporate_name TEXT NOT NULL,
  address TEXT NOT NULL,
  dba TEXT,
  duns TEXT,
  naics TEXT,
  hub_zone BOOLEAN,
  rural BOOLEAN,
  women_owned BOOLEAN,
  disaster_impacted BOOLEAN,
  primary_contact_name TEXT NOT NULL,
  primary_contact_title TEXT,
  primary_contact_phone TEXT,
  primary_contact_email TEXT,
  secondary_contact_name TEXT,
  secondary_contact_title TEXT,
  secondary_contact_phone TEXT,
  secondary_contact_email TEXT,
  agency TEXT NOT NULL,
  award_amount NUMERIC,
  contract_number TEXT,
  grant_start_end TEXT,
  company_info TEXT,
  customer_discovery TEXT,
  go_to_market_strategy TEXT,
  intellectual_property TEXT,
  financing TEXT,
  success_record TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ace_applications (corporate_name, address, dba, duns, naics, hub_zone, rural, women_owned, disaster_impacted, primary_contact_name, 
primary_contact_title, primary_contact_phone, primary_contact_email, secondary_contact_name, secondary_contact_title, secondary_contact_phone, secondary_contact_email,
agency, award_amount, contract_number, grant_start_end, company_info, customer_discovery, go_to_market_strategy, intellectual_property, financing, success_record, created_at)
VALUES ('Company Name', 'Address', 'dba', 'duns', 'naics', 
True, True, True, True, 'Cristian St.Clair', 'Director', '111-222-3333', 'cristianstclair@gmail.com', 
'N/A', 'N/A', 'N/A', 'N/A', 'agency', 1000, 'contract', 'May 6th, 2024', 'company info', 
'customer discovery', 'market strategy', 'IP', 'financing', 'success_record', CURRENT_TIMESTAMP);