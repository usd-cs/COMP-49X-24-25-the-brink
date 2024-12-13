import React from 'react';
import './ProfilePage.css'; // Ensure the CSS file is updated as well

const ProfilePage = () => {
    const user = {
        name: "First Last",
        company: "Sample Company Name",
        email: "sampleemail@sample.com",
        phone: "555.555.5555",
        profileImage: "https://via.placeholder.com/150",
    };

    return (
        <div className="profile-page">
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
                <li>
                    <button className="sidebar-button" aria-label="Applications">
                    Applications
                    </button>
                </li>
                <li>
                    <button className="sidebar-button" aria-label="Competitions">
                    Competitions
                    </button>
                </li>
                <li>
                    <button className="sidebar-button" aria-label="Resources">
                    Resources
                    </button>
                </li>
                <li>
                    <button className="sidebar-button" aria-label="Profile">
                    Profile
                    </button>
                </li>
                <li>
                    <button className="sidebar-button" aria-label="Messages">
                    Messages
                    </button>
                </li>
                </ul>

                </div>
            <div className="main-content">
                <div className="profile-card">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="profile-card-image"
                    />
                    <div className="profile-info">
                        <p><strong>{user.name}</strong></p>
                        <p>{user.company}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <button 
                            className="edit-profile-button"
                            aria-label="Edit Profile"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
