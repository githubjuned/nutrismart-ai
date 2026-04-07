import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { User, LogOut, Save, Key } from 'lucide-react';

const Settings = () => {
  const { profile, updateProfile, resetStatsDaily, theme, toggleTheme } = useContext(UserContext);
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    updateProfile({
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      budget: Number(formData.budget)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="pb-8">
      <h1 className="text-xl mb-6">Settings</h1>

      <div className="flex flex-col items-center mb-6">
        <div className="bg-white rounded-full p-4 shadow-sm mb-3">
          <User size={48} className="text-gray-400" />
        </div>
        <h2 className="text-lg">{profile.name}</h2>
        <p className="text-sm text-muted">{profile.diet.toUpperCase()} • Daily Budget: ₹{profile.budget}</p>
      </div>
      
      <div className="card mb-6 border border-primary-light">
        <h3 className="mb-2 text-sm font-semibold flex items-center gap-2"><Key size={16} className="text-primary" /> AI Configuration</h3>
        <p className="text-xs text-muted mb-4">NutriSmart AI uses Google Gemini. Provide your own API key for dynamic health coaching. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary underline">Get one free here.</a></p>
        <div className="input-group text-sm">
          <input type="password" name="geminiApiKey" className="input-field py-2" placeholder="AIZA..." value={formData.geminiApiKey || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="mb-4 text-sm uppercase text-muted tracking-wider">Profile Details</h3>
        <div className="grid grid-cols-2 gap-4">
           <div className="input-group w-full text-sm">
             <label className="input-label text-xs">Weight (kg)</label>
             <input type="number" name="weight" className="input-field py-2" value={formData.weight} onChange={handleChange} />
           </div>
           <div className="input-group w-full text-sm">
             <label className="input-label text-xs">Height (cm)</label>
             <input type="number" name="height" className="input-field py-2" value={formData.height} onChange={handleChange} />
           </div>
        </div>
        <div className="input-group mt-2">
          <label className="input-label text-xs">Goal</label>
          <select name="goal" className="input-field py-2 text-sm" value={formData.goal} onChange={handleChange}>
            <option value="lose">Weight Loss</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Muscle Gain</option>
          </select>
        </div>
        <div className="input-group mt-2">
          <label className="input-label text-xs">Daily Budget (₹)</label>
          <input type="number" name="budget" className="input-field py-2 font-bold text-primary" value={formData.budget} onChange={handleChange} />
        </div>
        <button className="btn btn-primary w-full mt-4 flex justify-center gap-2" onClick={handleSave}>
          <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="card">
        <h3 className="mb-4 text-sm uppercase text-muted tracking-wider">App Preferences</h3>
        
        <div 
          className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer select-none" 
          onClick={toggleTheme}
        >
          <span className="text-sm font-medium">Dark Mode</span>
          <div 
            style={{ width: '48px', height: '24px' }}
            className={`rounded-full relative transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <div 
              style={{ width: '20px', height: '20px', top: '2px', left: theme === 'dark' ? '26px' : '2px' }}
              className="bg-white rounded-full absolute pointer-events-none shadow-sm transition-all">
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer" onClick={() => {resetStatsDaily(); alert('Stats reset for the day!');}}>
          <span className="text-sm font-medium">Reset Today's Trackers</span>
        </div>

        <div className="flex justify-between items-center py-3 text-danger cursor-pointer" onClick={handleLogout}>
          <span className="text-sm font-medium flex items-center gap-2"><LogOut size={16}/> Log Out / Reset App</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
