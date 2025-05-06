import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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

  const columns = ["Judge 1: Solution Score",
    "Judge 1: Market Score",
    "Judge 1: Milestone Score",
    "Judge 1: Technology Score",
    "Judge 1: Competition Score",
    "Judge 1: Team Score",
    "Judge 2: Solution Score",
    "Judge 2: Market Score",
    "Judge 2: Milestone Score",
    "Judge 2: Technology Score",
    "Judge 2: Competition Score",
    "Judge 2: Team Score",
    "Judge 3: Solution Score",
    "Judge 3: Market Score",
    "Judge 3: Milestone Score",
    "Judge 3: Technology Score",
    "Judge 3: Competition Score",
    "Judge 3: Team Score"]; 

  const handleSaveClick =  async () => {
    console.log("Attempting to show scores");

    const selects = document.querySelectorAll('select');
    const scores = {};

    selects.forEach(select => {
      const value = select.value.trim();
      if (value !== '' && value !== '-') {
        scores[select.name] = parseInt(value);
      }
    });
    const score_entries = createSQLDictionary();
    const transformedScores = {};
    for (const label in scores) {
      const dbField = score_entries[label];
      if (dbField) {
        transformedScores[dbField] = scores[label];
      }
}
    console.log(transformedScores)
    try {
      const response = await fetch('http://localhost:3001/api/ace_applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedScores)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

    }catch (error) {
      console.error('Error submitting application:', error)
      alert('Submission failed. Please try again.')
    }
  };

  function createSQLDictionary() {
    const myDict = {};
    myDict["Judge 1: Solution Score"] = 'judge1_solution_score';
    myDict["Judge 1: Market Score"] = 'judge1_market_score';
    myDict["Judge 1: Milestone Score"] = 'judge1_milestone_score';
    myDict["Judge 1: Technology Score"] = 'judge1_technology_score';
    myDict["Judge 1: Competition Score"] = 'judge1_competition_score';
    myDict["Judge 1: Team Score"] = 'judge1_team_score';
    myDict["Judge 2: Solution Score"] = 'judge2_solution_score';
    myDict["Judge 2: Market Score"] = 'judge2_market_score';
    myDict["Judge 2: Milestone Score"] = 'judge2_milestone_score';
    myDict["Judge 2: Technology Score"] = 'judge2_technology_score';
    myDict["Judge 2: Competition Score"] = 'judge2_competition_score';
    myDict["Judge 2: Team Score"] = 'judge2_team_score';
    myDict["Judge 3: Solution Score"] = 'judge3_solution_score';
    myDict["Judge 3: Market Score"] = 'judge3_market_score';
    myDict["Judge 3: Milestone Score"] = 'judge3_milestone_score';
    myDict["Judge 3: Technology Score"] = 'judge3_technology_score';
    myDict["Judge 3: Competition Score"] = 'judge3_competition_score';
    myDict["Judge 3: Team Score"] = 'judge3_team_score';
    return myDict;
  }




  return (
    <div>
      <div>
        <PSBanner />
      </div>
      <button type='button' class='save-button' id='save-button' onClick={handleSaveClick}> Save Entries </button>
      <div className="admin-view-container">  
        <div>
          <div className='table-container'>
            <table rules='all'>
              <thead style={{ backgroundColor: 'lightblue' }}>
                <tr>
                  <th>Company Name</th>
                  <th>Primary Contact Name</th>
                  <th>Judge 1: Solution Score</th>
                  <th>Judge 1: Market Score</th>
                  <th>Judge 1: Milestone Score</th>
                  <th>Judge 1: Technology Score</th>
                  <th>Judge 1: Competition Score</th>
                  <th>Judge 1: Team Score</th>
                  <th>Judge 2: Solution Score</th>
                  <th>Judge 2: Market Score</th>
                  <th>Judge 2: Milestone Score</th>
                  <th>Judge 2: Technology Score</th>
                  <th>Judge 2: Competition Score</th>
                  <th>Judge 2: Team Score</th>
                  <th>Judge 3: Solution Score</th>
                  <th>Judge 3: Market Score</th>
                  <th>Judge 3: Milestone Score</th>
                  <th>Judge 3: Technology Score</th>
                  <th>Judge 3: Competition Score</th>
                  <th>Judge 3: Team Score</th>
                </tr>
              </thead>
              <tbody>
                {displayedApplications.map((app, index) => (
                  <tr key={index}>
                    <td>{app.corporate_name}</td>
                    <td>{app.primary_contact_name}</td>
                    {columns.map((column_name, index) =>
                      <td>
                        <select name={column_name}>
                        <option value=""> - </option>
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                        <option value="4"> 4 </option>
                        <option value="5"> 5 </option>
                      </select>
                    </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeScoreView;
