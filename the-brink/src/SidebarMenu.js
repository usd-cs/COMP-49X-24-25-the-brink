import React from 'react';
import { Link } from 'react-router-dom'; 
import './SidebarMenu.css'; 

const SidebarMenu = ({ activeTab, setActiveTab }) => {
  // Render the sidebar menu items based on the active tab state
  console.log('rendering sidebar menu')
  const user = {
    name: 'First Last',
    company: 'Sample Company Name',
    email: 'sampleemail@sample.com',
    phone: '555.555.5555',
    profileImage: 'https://via.placeholder.com/150'

  }
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
      </div>
      <ul className='sidebar-menu'>
        <li><Link to="/founder-status">Applications</Link></li>
        <li>Resources</li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/competitions">Competitions</Link></li>
      </ul>
    </div>
  )
}

export default SidebarMenu;