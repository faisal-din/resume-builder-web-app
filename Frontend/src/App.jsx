import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Pages/Layout';
import DashboardPage from './Pages/DashboardPage';
import ResumeBuilderPage from './Pages/ResumeBuilderPage';
import PreviewPage from './Pages/PreviewPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path='builder/:resumeId' element={<ResumeBuilderPage />} />
        </Route>

        <Route path='view/:resumeId' element={<PreviewPage />} />
      </Routes>
    </>
  );
}

export default App;
