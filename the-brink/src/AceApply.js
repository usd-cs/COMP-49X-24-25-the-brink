import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import './Competition.css';
import Banner from './ace-pitch-competition-banner.png';

export default function ACEApplicationForm() {
    const [formData, setFormData] = useState({
        corporateName: "",
        address: "",
        dba: "",
        duns: "",
        naics: "",
        hubZone: "",
        rural: "",
        womenOwned: "",
        disasterImpacted: "",
        primaryContact: { name: "", title: "", phone: "", email: "" },
        secondaryContact: { name: "", title: "", phone: "", email: "" },
        agency: "",
        awardAmount: "",
        contractNumber: "",
        grantStartEnd: "",
        companyInfo: "",
        customerDiscovery: "",
        goToMarketStrategy: "",
        intellectualProperty: "",
        financing: "",
        successRecord: "",
    });

    const navigate = useNavigate(); // Correct initialization of navigate
    const goToHomePage = () => {
        navigate('/'); // Redirect to the home page
    };
    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        if (dataset.section) {
            setFormData({
                ...formData,
                [dataset.section]: { ...formData[dataset.section], [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/sendemail',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: formData.primaryContact.email,
                name: formData.primaryContact.name
            }),
        });
        const result = await response.json();
        if(response.ok){
            console.log("Submitted Data: ", formData);
            alert("Form Submitted Successfully!");
            navigate('/');
        } else{
            console.error("Error");
            alert("Failed to send email");
        };

};



    return(
        <div>
        <div className ="application-wrapper">
            <div className="logo-banner"> 
                <img src={Banner} alt="ACE Bannner" />
            </div>

        
            <div className="form-container">
            <form className="ACE-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Tier 1- Innovation Grant Award Justification Narrative</h1>
                <div className="business-info-section">
                    <h2> Business Information</h2>
                    <label>
                        Corporate Name*:
                        <input type="text" name="corporateName" value={formData.corporate} onChange={handleChange} required />
                    </label>
                    <label>
                        Address*:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </label>
                    <label>
                        dba*:
                        <input type="text" name="dba" value={formData.dba} onChange={handleChange} required/>
                    </label>
                    <label> 
                        DUNS*:
                        <input type= "text" name= "duns" value={formData.duns} onChange={handleChange} required />
                    </label>
                    <label>
                        NAICS*:
                        <input type = "text" name="naics" value={formData.naics} onChange={handleChange} required/>
                    </label>
                </div>


                <div className="radio-group">
                    <p>Located in a hub-zone (Y/N):</p>
                    <label>
                        <input type="radio" name="hubZone" value="Yes" onChange={handleChange}/> Yes
                    </label>
                    <label>
                        <input type="radio" name="hubZone" value="No" onChange={handleChange}/> No
                    </label>
                </div>

                <div className="radio-group">
                    <p>Rural (Y/N):</p>
                    <label>
                        <input type="radio" name="Rural" value="Yes" onChange={handleChange}/> Yes
                    </label>
                    <label>
                        <input type="radio" name="Rural" value="No" onChange={handleChange}/> No
                    </label>
                </div>

                <div className="radio-group">
                    <p>Women-owned (Y/N):</p>
                    <label>
                        <input type="radio" name="WomenOwned" value="Yes" onChange={handleChange}/> Yes
                    </label>
                    <label>
                        <input type="radio" name="WomenOwned" value="No" onChange={handleChange}/> No
                    </label>
                </div>

                <div className="radio-group">
                    <p>Disaster-impacted  (Y/N):</p>
                    <label>
                        <input type="radio" name="disasterImpacted" value="Yes" onChange={handleChange}/> Yes
                    </label>
                    <label>
                        <input type="radio" name="disasterImpacted" value="No" onChange={handleChange}/> No
                    </label>
                </div>

                <h2>Primary Contact*</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.primaryContact.name} data-section="primaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.primaryContact.title} data-section="primaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name ="phone" value={formData.primaryContact.phone} data-section="primaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={formData.primaryContact.email} data-section="primaryContact" onChange={handleChange} required />
                </label>

                <h2> Secondary Contact*</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.secondaryContact.name} data-section="secondaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.secondaryContact.title} data-section="secondaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name ="phone" value={formData.secondaryContact.phone} data-section="secondaryContact" onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={formData.secondaryContact.email} data-section="secondaryContact" onChange={handleChange} required />
                </label>

                <h2> SBIR/STTR phase 1 award details, if applicable. 
                *Phase II SBIR/STTR awardees are not eligible for Tier 1 grant awards*</h2>
                <label>
                    Agency*:
                    <input type ="text" name= "agency" value ={formData.agency} onChange={handleChange} required />
                </label>
                <label>
                    Award Amount*:
                    <input type = "text" name="awardAmount" value={formData.awardAmount} onChange={handleChange} required />
                </label>
                <label>
                    Contract Number*:
                    <input type= "text" name="ContractNumber" value={formData.contractNumber} onChange={handleChange} />
                </label>
                <label>
                    Grant Start-End Date*:
                    <input type="text" name="grantStartEnd" value={formData.grantStartEnd} onChange={handleChange} required />
                </label>
                <h2>Each Hub shall require all proespective grant recipents to submit the 
                    following Information for a Tier 1 Award, submission of required 
                    documents is for consideration and does not guarantee a grant award </h2>
                <h2>Grant Narrative</h2>
                <h3>Company Information:</h3>
                <label>
                    
                    Primary objectives/core competencies; area of specialization; 
                    product or service deployment milestones; and history of previous State, 
                    federal and non-state funding, and 
                    subsequent Commercialization plans 
                    <textarea name="companyInfo" value={formData.companyInfo} onChange={handleChange} />
                </label>
                <h3>Customer Discovery and Current Competetive Metrics:</h3>
                <label>
                    Key technology objectives, current competitive market, 
                    and advantages compared to competing products or services, 
                    description of barriers to market adoption of the product or service.
                    <textarea name="customerDiscovery" value={formData.customerDiscovery} onChange={handleChange}/>
                </label>
                <h3>Go-to-Market Strategy:</h3>
                <label>
                    Market Milestones, milestone dates, 
                    market size analysis, and estimated market 
                    share after one year of sales and after 5 years; 
                    project plan to obtain market share.
                    <textarea name="goToMarketStrategy" value ={formData.goToMarketStrategy} onChange={handleChange}/>
                </label>
                <h3>Intellectual Property:</h3>
                <label>
                    Patent status, technology lead, 
                    trade secrets or other demonstration of 
                    a plan to achieve necessary protection to 
                    attain a competitive advantage, if applicable.
                    <textarea name="intellectualProperty" value ={formData.goToMarketStrategy} onChange={handleChange}/>
                </label>
                <h3>Financing:</h3>
                <label>
                    Plans for securing necessary follow-on funding in subsequent years
                    <textarea name="financing" value={formData.financing} onChange={handleChange} />
                </label>
                <label>
                    <h3>The Small Business owner's existing record of successfully 
                    commericalizing other research,</h3>  if applicable
                    <textarea name ="sucessRecord" value={formData.successRecord} onChange={handleChange} />
                </label>

                <button type="submit" className="submit-button">Submit</button>


            </form>
            <button onClick={goToHomePage} className="home-button" aria-label="Home">Home</button>
        </div>
        </div>
        </div>
    );

}
