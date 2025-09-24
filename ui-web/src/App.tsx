import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;