import React, {useState} from 'react'; 
import './AdminSettings.css'
import SidebarMenu from './SidebarMenu';
import PSBanner from './PSBanner';

const competitions = [
    'ACE', 'Tech Challenge', 'Fowler Business Concept Challenge', 'Fowler Global Social Innovation Challenge'
];

const AdminSettings = () => {
    const [selectedComp, setSelectedComp] = useState(competitions[0]); 

    const [settings, setSettings] = useState({
        ACE: {applicationsOpen: true, scoringOpen: false}, 
        'Tech Challenge': { applicationsOpen: false, scoringOpen: false },
        'Fowler Business Concept Challenge': { applicationsOpen: false, scoringOpen: false },
        'Fowler Global Social Innovation Challenge': { applicationsOpen: false, scoringOpen: false },
    });

    const handleToggle = (field) => {
        setSettings(prev => ({
            ...prev, 
            [selectedComp]: {
                ...prev[selectedComp], 
                [field]: !prev[selectedComp][field]
            }
        }));
    }; 
    return(
        <div className="admin-settings-layout">
        <SidebarMenu/>
        <div className="admin-settings-container">

             <PSBanner/>
            <h2 className="settings-title">Settings</h2>
            <div className="settings-card">
                <label htmlFor="competitionSelect">Competition Statuses</label>
                <select 
                    id="competitionSelect"
                    value={selectedComp}
                    onChange={(e) => setSelectedComp(e.target.value)}
                >
                    {competitions.map(comp => (
                        <option key={comp} value={comp}>{comp}</option>
                    ))}
                </select>
                <div className= "toggle-group">
                    <div className= "toggle-item">
                        <span>Applications</span>
                        <label className ="switch">
                            <input 
                                type="checkbox"
                                checked={settings[selectedComp].applicationsOpen}
                                onChange={() => handleToggle('applicationsOpen')}
                                />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className = "toggle-item">
                        <span>Judges Scoring</span>
                        <label className="switch">
                        <input 
                            type="checkbox"
                            checked={settings[selectedComp].scoringOpen}
                            onChange={() => handleToggle('scoringOpen')}
                            /> 
                        <span className= "slider round"></span>
                        </label>
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}
export default AdminSettings;


