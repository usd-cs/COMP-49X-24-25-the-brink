import React, {useState} from "react"
import SidebarMenu from './SidebarMenu';
import PSBanner from "./PSBanner"
import "./AppStatusF.css";
import aceLogo from './aceCircleLogo.png'

const applications = [
    {
        id: 1,
        name: "Accelerate California Entrepreneurship Pitch Competition",
        status: "Finalist",
        description: "Application Accepted. Information about next steps.",
        color: "green",
      },
      {
        id: 2,
        name: "Accelerate California Entrepreneurship Pitch Competition",
        status: "Quarterfinalist",
        description: "Review application. Additional steps may follow.",
        color: "yellow",
      },
      {
        id: 3,
        name: "Accelerate California Entrepreneurship Pitch Competition",
        status: "Updated Status",
        description: "Rejection information. Feedback about the application.",
        color: "red",
      },
    ];

const AppStatusF = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown == id ? null : id)
    }; 

    return (
        <div className ="my-applications-container">
            <SidebarMenu />
            <PSBanner />
            <div className="main-content">
                <h1 className="title"> My Applications</h1>
                <div className = "applications-list">
                    {applications.map((app) => (
                        <div key={app.id} className="application-card">
                            <div className="app-info">
                                <img src={aceLogo} alt="ACE Competition logo" className ="app-logo"/>
                                <div className="app-details">
                                    <h2>{app.name}</h2>
                                </div>
                                <div className={`status-indicator ${app.color}`} onClick={() => toggleDropdown(app.id)}>
                                {app.status}
                                </div>
                            </div>
                            {openDropdown === app.id && (
                                <div className="dropdown">
                                    <p>{app.description}</p>
                                    {app.id !== 3 &&(
                                        <button className="continue-button"> Continue</button>
                                    )}
                                    </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};
export default AppStatusF;
