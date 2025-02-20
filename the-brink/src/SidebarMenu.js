// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './SidebarMenu.css'; 
const SidebarMenu = ({ activeTab, setActiveTab }) => {
   // Render the sidebar menu items based on the active tab state
   console.log('rendering sidebar menu');
   const user = {
    name: "First Last",
    company: "Sample Company Name",
    email: "sampleemail@sample.com",
    phone: "555.555.5555",
    profileImage: "https://via.placeholder.com/150",
    
};

    return (


        <div className="sidebar">
            <div className="sidebar-header">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="sidebar-profile-image"
                    />
                    <h3>{user.name}</h3>
                    <p>{user.company}</p>
                </div>
                <ul className="sidebar-menu">
                    <li>Applications</li>
                    <li>Competitions</li>
                    <li>Resources</li>
                    <li>Profile</li>
                    <li>Messages</li>
                </ul>
            </div>
    ); 
};


export default SidebarMenu;


{/*<div className="sidebar">
            <div className="sidebar-header">
                <img src="profile.jpg" alt="Profile" className="sidebar-profile-image" />
                <h3>John Doe</h3>
            </div>
            <ul className="sidebar-menu">
                {/*<li>
                        <Link to="/" onClick{() => setActiveTab('profile')} className={activeab === 'profile' ? 'active' : ' '}>Profile</Link>
                </li>}
                <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</li>
                <li onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</li>
                <li onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</li>
            </ul>
        </div>*/}