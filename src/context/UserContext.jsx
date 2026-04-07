import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('nutrismart_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [dietaryStats, setDietaryStats] = useState(() => {
    const saved = localStorage.getItem('nutrismart_stats');
    return saved ? JSON.parse(saved) : { budgetUsed: 0, caloriesConsumed: 0, proteinConsumed: 0 };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nutrismart_theme') || 'light';
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem('nutrismart_profile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (dietaryStats) {
      localStorage.setItem('nutrismart_stats', JSON.stringify(dietaryStats));
    }
  }, [dietaryStats]);

  useEffect(() => {
    localStorage.setItem('nutrismart_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateProfile = (newProfile) => {
    setProfile({ ...profile, ...newProfile });
  };

  const updateStats = (newStats) => {
    setDietaryStats({ ...dietaryStats, ...newStats });
  };
  
  const resetStatsDaily = () => {
     setDietaryStats({ budgetUsed: 0, caloriesConsumed: 0, proteinConsumed: 0 });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, dietaryStats, updateStats, resetStatsDaily, theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};
