import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import IssueDetail from './issueDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue/:issue_number" element={<IssueDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
