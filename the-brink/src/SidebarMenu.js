// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './SidebarMenu.css'; 
const SidebarMenu = ({ activeTab, setActiveTab }) => {
   // Render the sidebar menu items based on the active tab state
   console.log('rendering sidebar menu');
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="profile.jpg" alt="Profile" className="sidebar-profile-image" />
                <h3>John Doe</h3>
            </div>
            <ul className="sidebar-menu">
                <li>
                        <Link to="/" onClick{() => setActiveTab('profile')} className={activeab === 'profile' ? 'active' : ' '}>Profile</Link>
                </li>
                <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</li>
                <li onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</li>
                <li onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</li>
            </ul>
        </div>
    );
};

export default SidebarMenu;
