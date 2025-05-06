import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JudgeScoreView.css';
import SidebarMenu from './SidebarMenu';
import PSBanner from './PSBanner';

const JudgeScoreView = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState({ column: null, value: null, step: 0 });
  const [sortOrder, setSortOrder] = useState(null);
  const [flagged, setFlagged] = useState(() => JSON.parse(localStorage.getItem('flaggedApplications')) || {});
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // const navigate = useNavigate();
  // const token = localStorage.getItem('authToken');
  // const role = localStorage.getItem('userRole');

  // useEffect(() => {
  //   if (!token || role !== 'judge') {
  //     navigate('/login');
  //   }
  // }, [token, role, navigate]);

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

  // const handleFilter = (column) => {
  //   const nextStep = filter.column === column ? (filter.step + 1) % 3 : 1;
  //   setFilter({ column, step: nextStep, value: nextStep === 1 });
  // };

  // const handleSort = () => {
  //   setSortOrder(prev => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));
  // };

  return (
    <div className="admin-view-container">
      {/* {showSidebar && (
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
      )} */}

      <div className={`admin-content ${showSidebar ? 'with-sidebar' : ''}`}>
        <PSBanner />

        {/* <button
          className="toggle-sidebar-button"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </button> */}

        <div>
          <table>
            <thead style={{ backgroundColor: 'lightblue' }}>
              <tr>
                <th>Company Name</th>
                <th>Primary Contact Name</th>
                <th>Judge 1: Presentation Score</th>
                <th>Judge 1: Innovation Score</th>
                <th>Judge 1: Scalability Score</th>
                <th>Judge 1: Market Understanding Score</th>
              </tr>
            </thead>
            <tbody>
              {displayedApplications.map((app, index) => (
                <tr>
                  <td>app.corporate_name</td>
                  <td>app.primary_contact_name</td>
                  <td>
                    <select>
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </select>
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

export default JudgeScoreView;
