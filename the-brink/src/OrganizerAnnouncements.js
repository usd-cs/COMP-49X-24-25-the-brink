import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu'; // your existing sidebar component
import './OrganizerAnnouncements.css'; // optional styling

const OrganizerAnnouncements = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    message: '',
    recipient: 'everyone',
    groupName: '',
    userName: '',
    channels: {
      announcements: true,
      email: false,
    }
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChannelChange = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel]
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Announcement submitted:', formData);
    // Add backend submission logic here
  };

  return (
    <div className="organizer-container">
      <SidebarMenu />
      <div className="organizer-content">
        <h2>Make an Announcement</h2>
        <div className="stepper">
          <div className={step === 1 ? "active-step" : ""}>1</div>
          <div className={step === 2 ? "active-step" : ""}>2</div>
          <div className={step === 3 ? "active-step" : ""}>3</div>
        </div>

        {step === 1 && (
          <div className="step-body">
            <label>Enter Message Here</label>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />
            <button onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-body">
            <label>Choose Recipients</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="recipient"
                  value="everyone"
                  checked={formData.recipient === 'everyone'}
                  onChange={handleChange}
                />
                Everyone
              </label>
              <label>
                <input
                  type="radio"
                  name="recipient"
                  value="group"
                  checked={formData.recipient === 'group'}
                  onChange={handleChange}
                />
                Everyone in group:
              </label>
              <select
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                disabled={formData.recipient !== 'group'}
              >
                <option value="">Select Group</option>
                <option value="Marketing">Marketing</option>
                <option value="Developers">Developers</option>
              </select>

              <label>
                <input
                  type="radio"
                  name="recipient"
                  value="user"
                  checked={formData.recipient === 'user'}
                  onChange={handleChange}
                />
                Specific User:
              </label>
              <select
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                disabled={formData.recipient !== 'user'}
              >
                <option value="">Select User</option>
                <option value="UserA">User A</option>
                <option value="UserB">User B</option>
              </select>
            </div>
            <div className="button-row">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-body">
            <label>Select a Channel</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.channels.announcements}
                  onChange={() => handleChannelChange('announcements')}
                />
                Announcements
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.channels.email}
                  onChange={() => handleChannelChange('email')}
                />
                Email
              </label>
            </div>
            <div className="button-row">
              <button onClick={prevStep}>Back</button>
              <button onClick={handleSubmit}>Send Message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerAnnouncements;
