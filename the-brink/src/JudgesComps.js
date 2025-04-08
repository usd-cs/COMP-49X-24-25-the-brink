import React, { useEffect, useState } from "react";
import "./JudgesComps.css";
import SidebarMenu from './SidebarMenu';
import PSBanner from "./PSBanner";
import aceLogo from './aceCircleLogo.png';

const JudgesComps = () => {
  const [isScoringAvailable, setIsScoringAvailable] = useState(false);

  useEffect(() => {
    // Simulated API Call — replace this with a real fetch request
    fetch("/api/scoring-status")
      .then(response => response.json())
      .then(data => {
        setIsScoringAvailable(data.isScoringAvailable);
      })
      .catch(error => console.error("Error fetching score status:", error));
  }, []);

  return (
    <div className="my-judgescomps-container">
      <SidebarMenu />
      <PSBanner />
      <h2 className="title">My Competitions</h2>
      <div className="competition-card">
        <img src={aceLogo} alt="ACE Pitch Competition" className="competition-logo" />
        <div className="competition-info">
          <h3>Accelerate California Entrepreneurship Pitch Competition</h3>
        </div>

        <button
          className={`scoring-button ${isScoringAvailable ? "active" : "disabled"}`}
          disabled={!isScoringAvailable}
        >
          Begin Scoring
        </button>
      </div>
    </div>
  );
};

export default JudgesComps;
