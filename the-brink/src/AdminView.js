import React, { useState, useEffect } from 'react';
import './AdminView.css'; 
import SidebarMenu from './SidebarMenu';
import PSBanner from './PSBanner';
//import logo from './PitchSuiteBanner.png'




const AdminView = () => {
    const [competition, setCompetition] = useState("Ace Competition"); 
    const [userType, setUserType] =useState("Founders");
    const [filter, setFilter] = useState({column: null, value: null});
    const [sortOrder, setSortOrder] = useState(null);
    const [flagged, setFlagged] = useState(()=> {
        return JSON.parse(localStorage.getItem('flaggedApplications')) || {};
        });
    const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
    
    useEffect(() => {
        localStorage.setItem('flaggedApplications', JSON.stringify(flagged));
    }, [flagged]);
   
    
    

  // Example Static Data
  const aceApplications = [
    {
      corporateName: 'ABC Corp',
      address: '123 Business St',
      dba: 'ABC Solutions',
      duns: '123456789',
      naics: '541512',
      hubZone: 'Yes',
      rural: 'No',
      womenOwned: 'Yes',
      minorityOwned: 'No'
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
    {
        corporateName: "DEF Innovations",
        address: "789 Tech Ave",
        dba: "DEF Tech",
        duns: "987654321",
        naics: "541715",
        hubZone: "No",
        rural: "No",
        womenOwned: "No",
        minorityOwned: "no",
      },
      {
        corporateName: "next",
        address: "802 San Luis",
        dba: "ariana Grande",
        duns: "022873456",
        naics: "908224",
        hubZone: "Yes",
        rural: "Yes",
        womenOwned: "Yes",
        minorityOwned: "Yes",
      },
      {
        corporateName: "thank you",
        address: "33 Fairview Lane",
        dba: "taylor swift",
        duns: "022873456",
        naics: "908224",
        hubZone: "Yes",
        rural: "No",
        womenOwned: "Yes",
        minorityOwned: "No",
      },
      {
        corporateName: "rip",
        address: "34 Fairview Lane",
        dba: "Harry Styles",
        duns: "022873456",
        naics: "908224",
        hubZone: "No",
        rural: "No",
        womenOwned: "Yes",
        minorityOwned: "No",
      },
];

//Apply Filter Logic
let filteredApplications = filter.column 
            ? aceApplications.filter(app => filter.step === 1
                ? app[filter.column] === "Yes"
                : filter.step === 2
                    ? app[filter.column] === "No"
                    : true) 
            : aceApplications;

//Sorting Logic 
if (sortOrder != null){
    filteredApplications = [...filteredApplications].sort((a,b) =>{
        if (sortOrder === "asc") return a.corporateName.localeCompare(b.corporateName);
        if (sortOrder === "desc") return b.corporateName.localeCompare(a.corporateName );
        return 0;
    });
}

//Showing flagged applications
if(showFlaggedOnly){
    filteredApplications = filteredApplications.filter(app => flagged[app.corporateName]);
}
//Handle flag toggle 
const toggleFlag = (name) => {
    setFlagged(prevFlags => ({
        ...prevFlags, 
        [name]: !prevFlags[name]
    }));
};
//column logic
const handleFilter = (column) => {
    if(filter.column === column) {
        const nextStep = (filter.step + 1) % 3; 
        setFilter({column, value: nextStep ==1 ? "Yes" : "No", step: nextStep});
    }else{
        setFilter({column, value: "Yes", step: 1});
    }
};

//Name sorting
const handleSort = () => {
    if (sortOrder === null){
        setSortOrder("asc");
    } else if (sortOrder === "asc"){
        setSortOrder("desc");
    }else {
        setSortOrder(null);
    }
};

        
return(
    
        <div className="admin-view-container">
            <SidebarMenu />
            <div className="admin-content">
                {/*
                <div className="header-container">
                    <img src={logo} alt="PitchSuite Banner" class="logo" />
                    <div className= "blue-bars">
                        <div className ="dark-blue-bar"></div> 
                        <div className="light-blue-bar"></div>  
                    </div> 
                </div> */}
            <PSBanner/>

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
                        <th className={sortOrder ? "highlight" : ""}
                            onClick={handleSort}
                            >
                            Name {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : ""} </th>
                        <th>Address</th>
                        <th>DBA</th>
                        <th>DUNS</th>
                        <th>NAICS</th>
                        
                        <th 
                            className={filter.column === "hubZone" ? "highlight" : ""}
                            onClick={() => handleFilter("hubZone")}>
                        Hubzone {filter.column === "hubZone" ? (filter.step === 1 ? "(Yes)" : filter.step === 2 ? "(No)" : "") : ""}</th>

                        <th 
                            className={filter.column === "rural" ? "highlight" : ""}
                            onClick={() => handleFilter("rural")}>
                        Rural Rural {filter.column === "rural" ? (filter.step === 1 ? "(Yes)" : filter.step === 2 ? "(No)" : "") : ""}</th>

                        <th 
                            className={filter.column === "womenOwned" ? "highlight" : ""}
                            onClick={() => handleFilter("womenOwned")}>
                        Women-Owned Women-Owned {filter.column === "womenOwned" ? (filter.step === 1 ? "(Yes)" : filter.step === 2 ? "(No)" : "") : ""}</th>

                        <th 
                        className={filter.column === "minorityOwned" ? "highlight" : ""}
                        onClick={() => handleFilter("minorityOwned")}>
                        Minority-Owned {filter.column === "minorityOwned" ? (filter.step === 1 ? "(Yes)" : filter.step === 2 ? "(No)" : "") : ""}</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((app, index) => (
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
                            <td>
                            <span 
                                 className={`flag-circle ${flagged[app.corporateName] ? "flagged" : ""}`}
                                 onClick={() => toggleFlag(app.corporateName)}
                                ></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
    
);
};
export default AdminView;
