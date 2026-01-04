import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Pages/Layout';
import DashboardPage from './Pages/DashboardPage';
import ResumeBuilderPage from './Pages/ResumeBuilderPage';
import PreviewPage from './Pages/PreviewPage';
import { useDispatch } from 'react-redux';
import api from './configs/api';
import { login, setLoading } from './app/features/authSlice';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: {
            Authorization: token,
          },
        });

        if (data?.success) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('Error getting user data: ', error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
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
