import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminView.css';
import SidebarMenu from './SidebarMenu';
import logo from './PitchSuiteBanner.png';

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
        <div className="header-container">
          <img src={logo} alt="PitchSuite Banner" className="logo" />
          <div className="blue-bars">
            <div className="dark-blue-bar"></div>
            <div className="light-blue-bar"></div>
          </div>
        </div>

        <button
          className="toggle-sidebar-button"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>

        <div
          className="competition-container"
          style={{
            width: showSidebar ? 'calc(100% - 18%)' : '100%',
            paddingLeft: showSidebar ? '100px' : '40px',
            transition: 'all 0.3s ease'
          }}
        >
          <table className="competition-table">
            <thead>
              <tr>
                <th onClick={handleSort}>Name {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}</th>
                <th>Address</th>
                <th>DBA</th>
                <th>DUNS</th>
                <th>NAICS</th>
                <th onClick={() => handleFilter('hub_zone')}>HubZone</th>
                <th onClick={() => handleFilter('rural')}>Rural</th>
                <th onClick={() => handleFilter('women_owned')}>Women-Owned</th>
                <th onClick={() => handleFilter('disaster_impacted')}>Disaster Impacted</th>
                <th>Primary Contact Name</th>
                <th>Primary Title</th>
                <th>Primary Phone</th>
                <th>Primary Email</th>
                <th>Secondary Contact Name</th>
                <th>Secondary Title</th>
                <th>Secondary Phone</th>
                <th>Secondary Email</th>
                <th>Agency</th>
                <th>Award Amount</th>
                <th>Contract #</th>
                <th>Start-End</th>
                <th>Company Info</th>
                <th>Customer Discovery</th>
                <th>Go-to-Market Strategy</th>
                <th>IP</th>
                <th>Financing</th>
                <th>Success Record</th>
                <th>Created</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {displayedApplications.map((app, index) => (
                <tr key={index}>
                  <td>{app.corporate_name}</td>
                  <td>{app.address}</td>
                  <td>{app.dba}</td>
                  <td>{app.duns}</td>
                  <td>{app.naics}</td>
                  <td>{app.hub_zone ? 'Yes' : 'No'}</td>
                  <td>{app.rural ? 'Yes' : 'No'}</td>
                  <td>{app.women_owned ? 'Yes' : 'No'}</td>
                  <td>{app.disaster_impacted ? 'Yes' : 'No'}</td>
                  <td>{app.primary_contact_name}</td>
                  <td>{app.primary_contact_title}</td>
                  <td>{app.primary_contact_phone}</td>
                  <td>{app.primary_contact_email}</td>
                  <td>{app.secondary_contact_name}</td>
                  <td>{app.secondary_contact_title}</td>
                  <td>{app.secondary_contact_phone}</td>
                  <td>{app.secondary_contact_email}</td>
                  <td>{app.agency}</td>
                  <td>{app.award_amount}</td>
                  <td>{app.contract_number}</td>
                  <td>{app.grant_start_end}</td>
                  <td>{app.company_info}</td>
                  <td>{app.customer_discovery}</td>
                  <td>{app.go_to_market_strategy}</td>
                  <td>{app.intellectual_property}</td>
                  <td>{app.financing}</td>
                  <td>{app.success_record}</td>
                  <td>{app.created_at}</td>
                  <td>
                    <span
                      className={`flag-circle ${flagged[app.corporate_name] ? 'flagged' : ''}`}
                      onClick={() => toggleFlag(app.corporate_name)}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
