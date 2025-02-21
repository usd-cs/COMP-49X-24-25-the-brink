import React, {useState} from 'react';
import './AdminView.css'; 
import logo from './PitchSuiteBanner.png'



const AdminView = () => {
    const [competition, setCompetition] = useState("Ace Competition"); 
    const [userType, setUserType] =useState("Founders");
    


//Example Static Data 
const aceApplications = [
    {
      corporateName: "ABC Corp",
      address: "123 Business St",
      dba: "ABC Solutions",
      duns: "123456789",
      naics: "541512",
      hubZone: "Yes",
      rural: "No",
      womenOwned: "Yes",
      minorityOwned: "No",
    },
    {
      corporateName: "XYZ Innovations",
      address: "456 Tech Ave",
      dba: "XYZ Tech",
      duns: "987654321",
      naics: "541715",
      hubZone: "No",
      rural: "Yes",
      womenOwned: "No",
      minorityOwned: "Yes",
    },
];
return(
    <body>
        <div className="header-container">
            <img src={logo} alt="PitchSuite Banner" class="logo" />
            <div className= "blue-bars">
                <div className ="dark-blue-bar"></div> 
                <div className="light-blue-bar"></div>  
            </div> 
        </div>


    <div className="competition-container">
        <div className="competition-controls">
            <select value ={competition} onChange={(e) => setCompetition(e.target.value)}>
                <option>Ace Competition</option>
                <option>Fowler Business Concept Challenge</option>
                <option>Fowler Global Social Innovation Challenge</option>
                <option>Torero Entrepeneuership Challenge</option>
            </select>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option> Founders</option>
                <option> Judges</option>
            </select>
        </div>
        <table className='competition-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>DBA</th>
                    <th>DUNS</th>
                    <th>NAICS</th>
                    <th>Hubzone</th>
                    <th>Rural</th>
                    <th>Women-Owned</th>
                    <th>Minority-Owned</th>
                </tr>
            </thead>
            <tbody>
                {aceApplications.map((app, index) => (
                    <tr key={index}>
                        <td>{app.corporateName}</td>
                        <td>{app.address}</td>
                        <td>{app.dba}</td>
                        <td>{app.duns}</td>
                        <td>{app.naics}</td>
                        <td>{app.hubZone}</td>
                        <td>{app.rural}</td>
                        <td>{app.womenOwned}</td>
                        <td>{app.minorityOwned}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </body>
);
};
export default AdminView;