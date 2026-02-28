import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CreateMeme from './pages/CreateMeme';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './components/auth/PrivateRoute';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={
            <PrivateRoute>
              <CreateMeme />
            </PrivateRoute>
          } />
          <Route path="/gallery" element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;