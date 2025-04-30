// src/AdminView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import SidebarMenu from './SidebarMenu';
import PSBanner from './PSBanner';

import './AdminView.css';

const AdminView = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showList, setShowList] = useState(true);

  // redirect non-admins  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // fetch all applications  
  useEffect(() => {
    fetch('/api/ace-applications')
      .then(res => res.json())
      .then(setApplications)
      .catch(console.error);
  }, []);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-master-detail">
      {/* full app sidebar (main nav) */}
      <div className="main-sidebar">
        <SidebarMenu />
      </div>

      {/* list pane */}
      {showList && (
        <aside className="app-list">
          <h2>Applications</h2>
          <p className="instruction">Click a name to view details</p>
          <ul>
            {applications.map(app => (
              <li
                key={app.id}
                className={selectedApp === app ? 'selected' : ''}
                onClick={() => setSelectedApp(app)}
              >
                {app.corporate_name}
              </li>
            ))}
          </ul>
          <button
            className="toggle-list"
            onClick={() => setShowList(false)}
            aria-label="Hide list"
          >
            ‹
          </button>
        </aside>
      )}

      {/* collapsed list toggle */}
      {!showList && (
        <button
          className="toggle-list-collapsed"
          onClick={() => setShowList(true)}
          aria-label="Show list"
        >
          ›
        </button>
      )}

      {/* detail pane */}
      <main className="app-detail">
        <PSBanner />
        {selectedApp ? (
          <>
            <button className="back-button" onClick={() => setSelectedApp(null)}>
              ← Back to list
            </button>
            <h1>{selectedApp.corporate_name}</h1>
            <dl>
              <dt>Address</dt><dd>{selectedApp.address}</dd>
              <dt>DBA</dt><dd>{selectedApp.dba}</dd>
              <dt>DUNS</dt><dd>{selectedApp.duns}</dd>
              <dt>NAICS</dt><dd>{selectedApp.naics}</dd>
              <dt>Hub Zone</dt><dd>{selectedApp.hub_zone ? 'Yes' : 'No'}</dd>
              <dt>Rural</dt><dd>{selectedApp.rural ? 'Yes' : 'No'}</dd>
              <dt>Women-Owned</dt><dd>{selectedApp.women_owned ? 'Yes' : 'No'}</dd>
              <dt>Disaster Impacted</dt><dd>{selectedApp.disaster_impacted ? 'Yes' : 'No'}</dd>
              <dt>Primary Contact</dt>
                <dd>
                  {selectedApp.primary_contact_name}<br/>
                  {selectedApp.primary_contact_title}<br/>
                  {selectedApp.primary_contact_phone}<br/>
                  {selectedApp.primary_contact_email}
                </dd>
              <dt>Secondary Contact</dt>
                <dd>
                  {selectedApp.secondary_contact_name || '—'}<br/>
                  {selectedApp.secondary_contact_title || '—'}<br/>
                  {selectedApp.secondary_contact_phone || '—'}<br/>
                  {selectedApp.secondary_contact_email || '—'}
                </dd>
              <dt>Agency</dt><dd>{selectedApp.agency}</dd>
              <dt>Award Amount</dt><dd>${selectedApp.award_amount.toLocaleString()}</dd>
              <dt>Contract Number</dt><dd>{selectedApp.contract_number}</dd>
              <dt>Grant Start–End</dt><dd>{selectedApp.grant_start_end}</dd>
              <dt>Company Info</dt><dd>{selectedApp.company_info}</dd>
              <dt>Customer Discovery</dt><dd>{selectedApp.customer_discovery}</dd>
              <dt>Go-to-Market</dt><dd>{selectedApp.go_to_market_strategy}</dd>
              <dt>Intellectual Property</dt><dd>{selectedApp.intellectual_property}</dd>
              <dt>Financing</dt><dd>{selectedApp.financing}</dd>
              <dt>Success Record</dt><dd>{selectedApp.success_record}</dd>
            </dl>
          </>
        ) : (
          <div className="no-selection">
            <p>Select an application from the list to see details.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminView;

