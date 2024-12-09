import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Competition from './Competition';
import AceApply from './AceApply';
import './Competition.css';
import './AceApply.css';

function App() {
  return(
    <Router>
      <Routes>
          <Route path="/" element={<Competition />} /> 
          <Route path ="/ace-apply" element ={<AceApply />}/>
      </Routes>
      </Router>
  )
}


export default App;
