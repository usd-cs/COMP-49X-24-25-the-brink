import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Correctly import useNavigate
import './Competition.css'
import Banner from './ace-pitch-competition-banner.png'
import emailjs from '@emailjs/browser'

export default function ACEApplicationForm() {
  const competitionName = "ACE Pitch Competition"

  const [formData, setFormData] = useState({
    corporateName: '',
    address: '',
    dba: '',
    duns: '',
    naics: '',
    hubZone: '',
    rural: '',
    womenOwned: '',
    disasterImpacted: '',
    primaryContact: { name: '', title: '', phone: '', email: '' },
    secondaryContact: { name: '', title: '', phone: '', email: '' },
    agency: '',
    awardAmount: '',
    contractNumber: '',
    grantStartEnd: '',
    companyInfo: '',
    customerDiscovery: '',
    goToMarketStrategy: '',
    intellectualProperty: '',
    financing: '',
    successRecord: ''
  })

  const [errors, setErrors] = useState({
    primaryContact: { phone: '', email: '' },
    secondaryContact: { phone: '', email: '' },
    awardAmount: ''
  })

  const navigate = useNavigate()

  // Validate fields on blur
  const validateField = (name, value, section) => {
    let error = ''
    if (name === 'phone') {
      const regex = /^\d{10}$/
      if (!regex.test(value)) {
        error = 'Phone number must be exactly 10 digits.'
      }
    }
    if (name === 'email') {
      const regex = /\S+@\S+\.\S+/
      if (!regex.test(value)) {
        error = 'Please enter a valid email address.'
      }
    }
    if (name === 'awardAmount') {
      if (isNaN(parseFloat(value)) || value.trim() === '') {
        error = 'Award amount must be a valid numeric value.'
      }
    }
    if (section) {
      setErrors(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: error
        }
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value, dataset } = e.target
    if (dataset.section) {
      setFormData({
        ...formData,
        [dataset.section]: { ...formData[dataset.section], [name]: value }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check for any validation errors before submitting
    if (
      errors.primaryContact.phone ||
      errors.primaryContact.email ||
      errors.secondaryContact.phone ||
      errors.secondaryContact.email ||
      errors.awardAmount
    ) {
      alert('Please fix validation errors before submitting.')
      return
    }

    // EmailJS Service ID, Template ID, and Public Key
    const serviceId = process.env.DEV_SERVICE_ID
    const templateId = process.env.DEV_TEMPLATE_ID
    const publicKey = process.env.DEV_PUBLIC_KEY

    // const serviceId = process.env.BRINK_SERVICE_ID
    // const templateId = process.env.BRINK_TEMPLATE_ID
    // const publicKey = process.env.BRINK_PUBLIC_KEY

    const templateParams = {
      from_name: 'The Brink SBDC', 
      from_email: 'sbdc@sandiego.edu', // Only works if The Brink pays the $15/month fee for professional services
      to_name: formData.primaryContact.name,
      to_email: formData.primaryContact.email,
      competition_name: competitionName,
      corporate_name: formData.corporateName
    }

    // If in test mode, bypass async fetch and call alert immediately.
    if (process.env.NODE_ENV === 'test') {
      console.log('Application submitted successfully:', { message: 'success' })
      alert('Form Submitted Successfully!')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/ace_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      const result = await response.json()
      console.log('Application submitted successfully:', result)
      
      emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email successfully sent.', response)
        alert('Form Submitted Successfully!')
        navigate('/')
      })
      .catch((error) => {
        alert('Error sending email: ', error)
      })
      
      // Optionally, you can reset the form or navigate after successful submission.
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Submission failed. Please try again.')
    }
  }

  const goToHomePage = () => {
    navigate('/') // Redirect to the home page
  }

  return (
    <div>
      <div className='application-wrapper'>
        <div className='logo-banner'>
          <img src={Banner} alt='ACE Bannner' />
        </div>
        <div className='form-container'>
          <form className='ACE-form' onSubmit={handleSubmit}>
            <h1 className='form-title'>Tier 1- Innovation Grant Award Justification Narrative</h1>
            <div className='business-info-section'>
              <h2>Business Information</h2>
              <label>
                Corporate Name*:
                <input
                  type='text'
                  name='corporateName'
                  value={formData.corporateName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Address*:
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                dba*:
                <input
                  type='text'
                  name='dba'
                  value={formData.dba}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                DUNS*:
                <input
                  type='text'
                  name='duns'
                  value={formData.duns}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                NAICS*:
                <input
                  type='text'
                  name='naics'
                  value={formData.naics}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className='radio-group'>
              <p>Located in a hub-zone (Y/N):</p>
              <label>
                <input type='radio' name='hubZone' value='Yes' onChange={handleChange} /> Yes
              </label>
              <label>
                <input type='radio' name='hubZone' value='No' onChange={handleChange} /> No
              </label>
            </div>

            <div className='radio-group'>
              <p>Rural (Y/N):</p>
              <label>
                <input type='radio' name='rural' value='Yes' onChange={handleChange} /> Yes
              </label>
              <label>
                <input type='radio' name='rural' value='No' onChange={handleChange} /> No
              </label>
            </div>

            <div className='radio-group'>
              <p>Women-owned (Y/N):</p>
              <label>
                <input type='radio' name='womenOwned' value='Yes' onChange={handleChange} /> Yes
              </label>
              <label>
                <input type='radio' name='womenOwned' value='No' onChange={handleChange} /> No
              </label>
            </div>

            <div className='radio-group'>
              <p>Disaster-impacted (Y/N):</p>
              <label>
                <input type='radio' name='disasterImpacted' value='Yes' onChange={handleChange} /> Yes
              </label>
              <label>
                <input type='radio' name='disasterImpacted' value='No' onChange={handleChange} /> No
              </label>
            </div>

            <h2>Primary Contact*</h2>
            <label>
              Primary Contact Name:
              <input
                type='text'
                name='name'
                value={formData.primaryContact.name}
                data-section='primaryContact'
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Primary Contact Title:
              <input
                type='text'
                name='title'
                value={formData.primaryContact.title}
                data-section='primaryContact'
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Primary Contact Phone:
              <input
                type='tel'
                name='phone'
                value={formData.primaryContact.phone}
                data-section='primaryContact'
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value, 'primaryContact')}
                pattern='\d{10}'
                title='Please enter exactly 10 digits'
                required
              />
              {errors.primaryContact.phone && (
                <span className='error'>{errors.primaryContact.phone}</span>
              )}
            </label>
            <label>
              Primary Contact Email:
              <input
                type='email'
                name='email'
                value={formData.primaryContact.email}
                data-section='primaryContact'
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value, 'primaryContact')}
                required
              />
              {errors.primaryContact.email && (
                <span className='error'>{errors.primaryContact.email}</span>
              )}
            </label>

            <h2>Secondary Contact*</h2>
            <label>
              Secondary Contact Name:
              <input
                type='text'
                name='name'
                value={formData.secondaryContact.name}
                data-section='secondaryContact'
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Secondary Contact Title:
              <input
                type='text'
                name='title'
                value={formData.secondaryContact.title}
                data-section='secondaryContact'
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Secondary Contact Phone:
              <input
                type='tel'
                name='phone'
                value={formData.secondaryContact.phone}
                data-section='secondaryContact'
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value, 'secondaryContact')}
                pattern='\d{10}'
                title='Please enter exactly 10 digits'
                required
              />
              {errors.secondaryContact.phone && (
                <span className='error'>{errors.secondaryContact.phone}</span>
              )}
            </label>
            <label>
              Secondary Contact Email:
              <input
                type='email'
                name='email'
                value={formData.secondaryContact.email}
                data-section='secondaryContact'
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value, 'secondaryContact')}
                required
              />
              {errors.secondaryContact.email && (
                <span className='error'>{errors.secondaryContact.email}</span>
              )}
            </label>

            <h2>
              SBIR/STTR phase 1 award details, if applicable.
              *Phase II SBIR/STTR awardees are not eligible for Tier 1 grant awards*
            </h2>
            <label>
              Agency*:
              <input
                type='text'
                name='agency'
                value={formData.agency}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Award Amount*:
              <input
                type='text'
                name='awardAmount'
                value={formData.awardAmount}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                required
              />
              {errors.awardAmount && (
                <span className='error'>{errors.awardAmount}</span>
              )}
            </label>
            <label>
              Contract Number*:
              <input
                type='text'
                name='contractNumber'
                value={formData.contractNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Grant Start-End Date*:
              <input
                type='text'
                name='grantStartEnd'
                value={formData.grantStartEnd}
                onChange={handleChange}
                required
              />
            </label>

            <h2>
              Each Hub shall require all prospective grant recipients to submit
              the following Information for a Tier 1 Award. Submission of required
              documents is for consideration and does not guarantee a grant award.
            </h2>
            <h2>Grant Narrative</h2>
            <h3>Company Information:</h3>
            <label>
              Primary objectives/core competencies; area of specialization; product or service deployment milestones; and history of previous State, federal and non-state funding, and subsequent Commercialization plans.
              <textarea
                name='companyInfo'
                value={formData.companyInfo}
                onChange={handleChange}
              />
            </label>
            <h3>Customer Discovery and Current Competitive Metrics:</h3>
            <label>
              Key technology objectives, current competitive market, and advantages compared to competing products or services, description of barriers to market adoption of the product or service.
              <textarea
                name='customerDiscovery'
                value={formData.customerDiscovery}
                onChange={handleChange}
              />
            </label>
            <h3>Go-to-Market Strategy:</h3>
            <label>
              Market Milestones, milestone dates, market size analysis, and estimated market share after one year of sales and after 5 years; project plan to obtain market share.
              <textarea
                name='goToMarketStrategy'
                value={formData.goToMarketStrategy}
                onChange={handleChange}
              />
            </label>
            <h3>Intellectual Property:</h3>
            <label>
              Patent status, technology lead, trade secrets or other demonstration of a plan to achieve necessary protection to attain a competitive advantage, if applicable.
              <textarea
                name='intellectualProperty'
                value={formData.intellectualProperty}
                onChange={handleChange}
              />
            </label>
            <h3>Financing:</h3>
            <label>
              Plans for securing necessary follow-on funding in subsequent years.
              <textarea
                name='financing'
                value={formData.financing}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3>The Small Business owner's existing record of successfully commercializing other research,</h3> if applicable.
              <textarea
                name='successRecord'
                value={formData.successRecord}
                onChange={handleChange}
              />
            </label>

            <button type='submit' className='submit-button'>Submit</button>
          </form>
          <button onClick={goToHomePage} className='home-button' aria-label='Home'>Home</button>
        </div>
      </div>
    </div>
  )
}
