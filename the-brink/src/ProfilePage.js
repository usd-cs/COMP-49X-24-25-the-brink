import React from 'react';
import './ProfilePage.css'; // Ensure the CSS file is updated as well
import SidebarMenu from './SidebarMenu'; // Ensure the SidebarMenu component is imported and updated
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" rel="stylesheet"></link>
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
            <SidebarMenu />

            <div className="main-content">
                <div className="profile-card">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="profile-card-image"
                    />
                    {/*<button className="edit-profile-button">Edit Profile</button>*/}
                    <div className="profile-info">
                        <p><strong>{user.name}</strong></p>
                        <p>{user.company}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <button className="edit-profile-button">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
