import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from './context/UserContext';
import BottomNav from './components/BottomNav';
import AnimatedPage from './components/AnimatedPage';

import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import GroceryList from './pages/GroceryList';
import ChatCoach from './pages/ChatCoach';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

function App() {
  const { profile } = useContext(UserContext);
  const location = useLocation();

  const isAuthenticated = profile !== null;
  const isSetupRoute = location.pathname === '/onboarding';

  return (
    <div className="app-container">
      <div className="content-area">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname}>
            <Route path="/onboarding" element={!isAuthenticated ? <AnimatedPage><Onboarding /></AnimatedPage> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <AnimatedPage><Dashboard /></AnimatedPage> : <Navigate to="/onboarding" />} />
            <Route path="/meals" element={isAuthenticated ? <AnimatedPage><MealPlanner /></AnimatedPage> : <Navigate to="/onboarding" />} />
            <Route path="/grocery" element={isAuthenticated ? <AnimatedPage><GroceryList /></AnimatedPage> : <Navigate to="/onboarding" />} />
            <Route path="/chat" element={isAuthenticated ? <AnimatedPage><ChatCoach /></AnimatedPage> : <Navigate to="/onboarding" />} />
            <Route path="/progress" element={isAuthenticated ? <AnimatedPage><Progress /></AnimatedPage> : <Navigate to="/onboarding" />} />
            <Route path="/settings" element={isAuthenticated ? <AnimatedPage><Settings /></AnimatedPage> : <Navigate to="/onboarding" />} />
          </Routes>
        </AnimatePresence>
      </div>
      
      {isAuthenticated && !isSetupRoute && <BottomNav />}
    </div>
  );
}

export default App;
