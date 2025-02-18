// ProfilePage.js
import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import './ProfilePage.css';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    console.log('Profile Component rendered');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <div className="profile-card"><h2>Profile Information</h2><p>Details about the user...</p></div>;
            case 'settings':
                return <div className="profile-card"><h2>Settings</h2><p>Modify account settings here...</p></div>;
            case 'messages':
                return <div className="profile-card"><h2>Messages</h2><p>View your messages...</p></div>;
            default:
                return <div className="profile-card"><h2>Welcome</h2><p>Select an option from the sidebar.</p></div>;
        }
    };

    return (
        <div className="profile-page">
            <SidebarMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfilePage;
