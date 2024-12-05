import React from 'react';
import './ProfilePage.css'; // Ensure this file exists for styling

const ProfilePage = () => {
    const user = {
        name: "Name Placeholder",
        bio: "Insert Bio Here",
        location: "Location",
        profileImage: "https://via.placeholder.com/150",
        applications: ["set", "of", "applications"],
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={user.profileImage} alt="Profile" className="profile-image" />
                <h1>{user.name}</h1>
                <p>{user.bio}</p>
                <p><strong>Location:</strong> {user.location}</p>
            </div>
            <div className="profile-interests">
                <h2>Applications</h2>
                <ul>
                    {user.applications.map((interest, index) => (
                        <li key={index}>{interest}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
console.log("ProfilePage rendering...");

export default ProfilePage; // Ensure it's a default export
