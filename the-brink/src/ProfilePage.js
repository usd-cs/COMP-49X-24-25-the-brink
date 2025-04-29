import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './ProfilePage.css'
import SidebarMenu from './SidebarMenu'
import PSBanner from './PSBanner';


const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [editedUser, setEditedUser] = useState({})
  const navigate = useNavigate()

  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    if (!userEmail) {
      console.warn('No email in localStorage — redirecting to login')
      navigate('/login')
      return
    }
  
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/get-profile?email=${encodeURIComponent(userEmail)}`)
        if (response.ok) {
          const data = await response.json()
          const fullName = `${data.first_name} ${data.last_name}`
          const firstInitial = (data.first_name || 'D')[0].toUpperCase();
          const avatarFile = `${firstInitial}-Avatar.png`;
          const avatarURL = `/avatars/${avatarFile}`;

          localStorage.setItem('profileImage', avatarURL)
          const profileImage = localStorage.getItem('profileImage') || '/avatars/Default.png'

          setUser({
            ...data,
            name: fullName,
            company: data.company || '',
            profileImage: profileImage
          })
          setEditedUser({
            name: fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            company: data.company || ''
          })          
        } else {
          console.error('Failed to fetch profile')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  
    fetchProfile()
  }, [userEmail, navigate])  

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const saveChanges = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: editedUser.email,
          name: editedUser.name,
          phone: editedUser.phone,
          company: editedUser.company
        })
      });
  
      if (response.ok) {
        setUser({ ...editedUser });
        setIsEditing(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };  

  if (!user) return <div>Loading profile...</div>

  return (
    <div className='profile-page'>
      <SidebarMenu />
      <PSBanner/>

      <div className='main-content'>
        <div className='profile-card'>
          <img src={user.profileImage} alt='Profile' className='profile-card-image' />

          {isEditing ? (
            <div className='edit-form'>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                value={editedUser.name || ''}
                onChange={handleChange}
                className='edit-input'
              />
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={editedUser.email || ''}
                disabled
                className='edit-input'
              />
              <label>Phone:</label>
              <input
                type='text'
                name='phone'
                value={editedUser.phone || ''}
                onChange={handleChange}
                className='edit-input'
              />
              <label>Company:</label>
              <input
                type='text'
                name='company'
                value={editedUser.company || ''}
                onChange={handleChange}
                className='edit-input'
              />
              <div className='button-group'>
                <button className='save-button' onClick={saveChanges}>Save</button>
                <button className='cancel-button' onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className='profile-info'>
              <p><strong>{user.name}</strong></p>
              <p>{user.company}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <button className='edit-profile-button' onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
