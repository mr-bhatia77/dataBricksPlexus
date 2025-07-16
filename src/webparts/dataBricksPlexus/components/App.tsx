import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// import HomePage from './HomePage';
import './App.css';
import DataSet1 from './Dataset1';
import DataSet2 from './Dataset2';

const App: React.FC = () => (
  <>
    <div className={`page-heading`}>
      <h1>Data bricks Plexus</h1>
    </div>
    <div className="layout">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DataSet1 />} />
        <Route path="/dataset2" element={<DataSet2 />} />
      </Routes>
    </div>
  </>

);

export default App;