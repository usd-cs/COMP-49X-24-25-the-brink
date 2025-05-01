// src/OrganizerAnnouncements.js
import React, { useState, useEffect } from 'react'
import SidebarMenu from './SidebarMenu'
import './OrganizerAnnouncements.css'

const OrganizerAnnouncements = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    visible_to: ['judge', 'founder']
  })
  const [announcements, setAnnouncements] = useState([])
  const [editingId, setEditingId] = useState(null)

  // pull our dev-auth headers from the stored "user" object
  const authHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return {
      'Content-Type': 'application/json',
      'X-User-Id': user.id,
      'X-User-Role': user.role,
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements', { headers: authHeaders() })
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`)
      setAnnouncements(await res.json())
    } catch (err) {
      console.error('Failed to fetch announcements', err)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(f => ({ ...f, [name]: value }))
  }

  const handleVisibleToChange = role => {
    setFormData(f => ({
      ...f,
      visible_to: f.visible_to.includes(role)
        ? f.visible_to.filter(r => r !== role)
        : [...f.visible_to, role]
    }))
  }

  const startCreate = () => {
    setEditingId(null)
    setFormData({ title: '', message: '', visible_to: ['judge', 'founder'] })
    setStep(1)
  }

  const startEdit = a => {
    setEditingId(a.id)
    setFormData({
      title: a.title,
      message: a.message,
      visible_to: a.visible_to
    })
    setStep(1)
  }

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId
      ? `/api/announcements/${editingId}`
      : '/api/announcements'

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(formData)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        console.error(`${editingId ? 'Updating' : 'Creating'} error:`, err.error || res.status)
      } else {
        await fetchAnnouncements()
        startCreate()
      }
    } catch (err) {
      console.error('Submit error:', err)
    }
  }

  const handleDelete = async id => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
      if (res.ok) {
        await fetchAnnouncements()
      } else {
        console.error('Delete failed:', res.status, await res.text())
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div className="organizer-container">
      <SidebarMenu />
      <div className="organizer-content">
        <h2>{editingId ? 'Edit Announcement' : 'Make an Announcement'}</h2>
        <button
          type="button"
          onClick={startCreate}
          className="new-button"
        >
          + New
        </button>

        <div className="stepper">
          <div className={step === 1 ? "active-step" : ""}>1</div>
          <div className={step === 2 ? "active-step" : ""}>2</div>
        </div>

        {step === 1 && (
          <div className="step-body">
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a title"
            />
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
            />
            <div className="button-row">
              <button type="button" style={{ visibility: 'hidden' }}>Back</button>
              <button
                type="button"
                onClick={() => setStep(2)}
              >Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-body">
            <label>Visible To:</label>
            {['judge','founder'].map(r => (
              <label key={r}>
                <input
                  type="checkbox"
                  checked={formData.visible_to.includes(r)}
                  onChange={() => handleVisibleToChange(r)}
                />
                {r.charAt(0).toUpperCase() + r.slice(1)}s
              </label>
            ))}
            <div className="button-row">
              <button
                type="button"
                onClick={() => setStep(1)}
              >Back</button>
              <button
                type="button"
                onClick={handleSubmit}
              >
                {editingId ? 'Save' : 'Send'}
              </button>
            </div>
          </div>
        )}

        <hr />
        <h3>Existing Announcements</h3>
        {announcements.map(a => (
          <div key={a.id} className="announcement-card">
            <div>
              <h4>{a.title}</h4>
              <p>{a.message}</p>
              <p><strong>Visible To:</strong> {a.visible_to.join(', ')}</p>
              <p><em>Posted on {new Date(a.created_at).toLocaleString()}</em></p>
            </div>
            <div className="button-row">
              <button
                type="button"
                onClick={() => startEdit(a)}
              >Edit</button>
              <button
                type="button"
                onClick={() => handleDelete(a.id)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrganizerAnnouncements

