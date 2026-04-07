import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Wallet, Flame, Beef, Settings as SettingsIcon } from 'lucide-react';

const Dashboard = () => {
  const { profile, dietaryStats } = useContext(UserContext);

  const targetCalories = profile.goal === 'lose' ? 1800 : profile.goal === 'gain' ? 2800 : 2200;
  const targetProtein = profile.weight * (profile.goal === 'gain' ? 2.2 : 1.5);
  
  const budgetPerc = (dietaryStats.budgetUsed / profile.budget) * 100;
  const calPerc = (dietaryStats.caloriesConsumed / targetCalories) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl">Hi, {profile.name}!</h1>
          <p className="text-sm">Ready to eat smart today?</p>
        </div>
        <Link to="/settings" className="bg-white rounded-full p-1 shadow-sm flex items-center justify-center relative cursor-pointer hover:scale-105 active:scale-95 transition-transform" style={{ background: 'var(--card-bg)' }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" width={40} height={40} className="rounded-full" />
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 shadow-md">
            <SettingsIcon size={12} />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card bg-green-50" style={{ background: 'var(--primary-light)' }}>
          <div className="flex justify-between">
            <span className="font-semibold" style={{ color: 'var(--primary-hover)' }}>Budget</span>
            <Wallet size={20} className="text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">₹{profile.budget - dietaryStats.budgetUsed}</div>
          <p className="text-xs mt-1" style={{ color: 'var(--primary-hover)' }}>Remaining today</p>
          <div className="w-full bg-white h-2 rounded-full mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(budgetPerc, 100)}%` }}></div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between">
            <span className="font-semibold text-muted">Calories</span>
            <Flame size={20} className="text-warning" />
          </div>
          <div className="mt-2 text-xl font-bold">{dietaryStats.caloriesConsumed} <span className="text-sm font-normal text-muted">/ {targetCalories}</span></div>
          <p className="text-xs mt-1 text-muted">kcal</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(calPerc, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <h2 className="mb-4">Today's Meals</h2>
      
      {/* Mock Meal Card */}
      <div className="card mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg">Breakfast</h3>
            <p className="text-sm">Masala Oats & 2 Boiled Eggs</p>
          </div>
          <div className="text-right">
            <div className="font-bold">₹35</div>
            <div className="text-xs text-muted">Estimated</div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          <div className="flex items-center gap-1 text-sm text-muted"><Flame size={16}/> 320 kcal</div>
          <div className="flex items-center gap-1 text-sm text-muted"><Beef size={16}/> 16g Protein</div>
        </div>
      </div>
      
      <div className="card mb-4 opacity-75">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg">Lunch</h3>
            <p className="text-sm">Dal Tadka, Rice, Curd</p>
          </div>
          <div className="text-right">
            <div className="font-bold">₹40</div>
          </div>
        </div>
      </div>

      <div className="card mb-4 opacity-75">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg">Dinner</h3>
            <p className="text-sm">Soya Chunks Curry, 2 Roti</p>
          </div>
          <div className="text-right">
            <div className="font-bold">₹30</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center pb-4">
        <button className="btn btn-outline w-full justify-center">Log Custom Meal</button>
      </div>

    </div>
  );
};

export default Dashboard;
