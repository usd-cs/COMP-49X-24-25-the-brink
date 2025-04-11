import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminView.css';
import SidebarMenu from './SidebarMenu';
import PSBanner from './PSBanner';

const AdminView = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState({ column: null, value: null, step: 0 });
  const [sortOrder, setSortOrder] = useState(null);
  const [flagged, setFlagged] = useState(() => JSON.parse(localStorage.getItem('flaggedApplications')) || {});
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  }, [token, role, navigate]);

  useEffect(() => {
    localStorage.setItem('flaggedApplications', JSON.stringify(flagged));
  }, [flagged]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/ace-applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (!filter.column) return true;
    const value = app[filter.column];
    return filter.step === 1 ? value === true : filter.step === 2 ? value === false : true;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortOrder) return 0;
    const aVal = a.corporate_name || '';
    const bVal = b.corporate_name || '';
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const displayedApplications = showFlaggedOnly
    ? sortedApplications.filter(app => flagged[app.corporate_name])
    : sortedApplications;

  const toggleFlag = (name) => {
    setFlagged(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFilter = (column) => {
    const nextStep = filter.column === column ? (filter.step + 1) % 3 : 1;
    setFilter({ column, step: nextStep, value: nextStep === 1 });
  };

  const handleSort = () => {
    setSortOrder(prev => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
  };

  return (
    <div className="admin-view-container">
      {showSidebar && (
        <div className="sidebar">
          <SidebarMenu />
          <button
            className="sidebar-toggle-arrow"
            onClick={() => setShowSidebar(false)}
            aria-label="Collapse sidebar"
          >
            ←
          </button>
        </div>
      )}

      {!showSidebar && (
        <button
          className="sidebar-toggle-collapsed"
          onClick={() => setShowSidebar(true)}
          aria-label="Expand sidebar"
        >
          →
        </button>
      )}

      <div className={`admin-content ${showSidebar ? 'with-sidebar' : ''}`}>
        <PSBanner />

        <button
          className="toggle-sidebar-button"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>

        <div className="vertical-table-container">
          {displayedApplications.map((app, index) => (
            <div key={index} className="vertical-table">
              <h3 className="vertical-table-title">{app.corporate_name}</h3>
              <table>
                <tbody>
                  <tr><th>Address</th><td>{app.address}</td></tr>
                  <tr><th>DBA</th><td>{app.dba}</td></tr>
                  <tr><th>DUNS</th><td>{app.duns}</td></tr>
                  <tr><th>NAICS</th><td>{app.naics}</td></tr>
                  <tr><th>HubZone</th><td>{app.hub_zone ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Rural</th><td>{app.rural ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Women-Owned</th><td>{app.women_owned ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Disaster Impacted</th><td>{app.disaster_impacted ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Primary Contact Name</th><td>{app.primary_contact_name}</td></tr>
                  <tr><th>Primary Title</th><td>{app.primary_contact_title}</td></tr>
                  <tr><th>Primary Phone</th><td>{app.primary_contact_phone}</td></tr>
                  <tr><th>Primary Email</th><td>{app.primary_contact_email}</td></tr>
                  <tr><th>Secondary Contact Name</th><td>{app.secondary_contact_name}</td></tr>
                  <tr><th>Secondary Title</th><td>{app.secondary_contact_title}</td></tr>
                  <tr><th>Secondary Phone</th><td>{app.secondary_contact_phone}</td></tr>
                  <tr><th>Secondary Email</th><td>{app.secondary_contact_email}</td></tr>
                  <tr><th>Agency</th><td>{app.agency}</td></tr>
                  <tr><th>Award Amount</th><td>{app.award_amount}</td></tr>
                  <tr><th>Contract #</th><td>{app.contract_number}</td></tr>
                  <tr><th>Start-End</th><td>{app.grant_start_end}</td></tr>
                  <tr><th>Company Info</th><td>{app.company_info}</td></tr>
                  <tr><th>Customer Discovery</th><td>{app.customer_discovery}</td></tr>
                  <tr><th>Go-to-Market Strategy</th><td>{app.go_to_market_strategy}</td></tr>
                  <tr><th>IP</th><td>{app.intellectual_property}</td></tr>
                  <tr><th>Financing</th><td>{app.financing}</td></tr>
                  <tr><th>Success Record</th><td>{app.success_record}</td></tr>
                  <tr>
                    <th>Flag</th>
                    <td>
                      <span
                        className={`flag-circle ${flagged[app.corporate_name] ? 'flagged' : ''}`}
                        onClick={() => toggleFlag(app.corporate_name)}
                      ></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
