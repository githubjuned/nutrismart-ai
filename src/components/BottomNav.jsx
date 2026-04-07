import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, MessageCircle, TrendingUp } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home className="nav-icon" />
        <span className="nav-label">Home</span>
      </NavLink>
      <NavLink to="/meals" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Utensils className="nav-icon" />
        <span className="nav-label">Meals</span>
      </NavLink>
      <NavLink to="/grocery" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ShoppingCart className="nav-icon" />
        <span className="nav-label">Grocery</span>
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MessageCircle className="nav-icon" />
        <span className="nav-label">Coach</span>
      </NavLink>
      <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <TrendingUp className="nav-icon" />
        <span className="nav-label">Stats</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
