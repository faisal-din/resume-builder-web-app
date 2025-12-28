import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LayoutPage from './Pages/LayoutPage';
import DashboardPage from './Pages/DashboardPage';
import ResumeBuilderPage from './Pages/ResumeBuilderPage';
import PreviewPage from './Pages/PreviewPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='app' element={<LayoutPage />}>
          <Route index element={<DashboardPage />} />
          <Route path='builder/:resumeId' element={<ResumeBuilderPage />} />
        </Route>

        <Route path='view/:resumeId' element={<PreviewPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
