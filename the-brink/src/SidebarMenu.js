import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const [user, setUser] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    profileImage: 'https://via.placeholder.com/150'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;

      try {
        const response = await fetch(`http://localhost:3001/api/get-profile?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser({
            name: `${data.first_name} ${data.last_name}`,
            company: data.company || 'N/A',
            email: data.email,
            phone: data.phone || 'N/A',
            profileImage: 'https://via.placeholder.com/150'
          });
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <img
          src={user.profileImage}
          alt='Profile'
          className='sidebar-profile-image'
        />
        <h3>{user.name}</h3>
        <p>{user.company}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <ul className='sidebar-menu'>
        <li><Link to="/founder-status">Applications</Link></li>
        <li>Resources</li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/competitions">Competitions</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>

      <div className="sidebar-signout">
        <button onClick={handleSignOut} className="signout-button">Sign Out</button>
      </div>
    </div>
  );
};

export default SidebarMenu;
