import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ArrowRight, Leaf } from 'lucide-react';

const Onboarding = () => {
  const { updateProfile } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    diet: 'veg',
    goal: 'maintain',
    budget: 150
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleComplete();
  };

  const handleComplete = () => {
    updateProfile({
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      budget: Number(formData.budget)
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full" style={{ minHeight: '80vh' }}>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '50%' }}>
            <Leaf size={48} className="text-primary" />
          </div>
        </div>
        <h1>Welcome to NutriSmart AI</h1>
        <p>Budget-friendly health for everyone.</p>
      </div>

      <div className="card w-full mt-4">
        {step === 1 && (
          <div>
            <h2 className="mb-4">Let's get to know you</h2>
            <div className="input-group">
              <label className="input-label">What is your name?</label>
              <input type="text" name="name" className="input-field" placeholder="E.g. Rahul" value={formData.name} onChange={handleChange} />
            </div>
            <div className="flex gap-4">
              <div className="input-group w-full">
                <label className="input-label">Age</label>
                <input type="number" name="age" className="input-field" placeholder="24" value={formData.age} onChange={handleChange} />
              </div>
              <div className="input-group w-full">
                <label className="input-label">Weight (kg)</label>
                <input type="number" name="weight" className="input-field" placeholder="70" value={formData.weight} onChange={handleChange} />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Height (cm)</label>
              <input type="number" name="height" className="input-field" placeholder="175" value={formData.height} onChange={handleChange} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4">Diet & Goals</h2>
            <div className="input-group">
              <label className="input-label">Diet Preferences</label>
              <select name="diet" className="input-field" value={formData.diet} onChange={handleChange}>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Health Goal</label>
              <select name="goal" className="input-field" value={formData.goal} onChange={handleChange}>
                <option value="lose">Weight Loss</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Muscle Gain</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4">Budget Planning</h2>
            <div className="input-group">
              <label className="input-label">Daily Food Budget (₹)</label>
              <input type="number" name="budget" className="input-field" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} placeholder="150" value={formData.budget} onChange={handleChange} />
            </div>
            <p className="mt-2 text-sm text-center">We will optimize your meals to fit this budget while strictly hitting your nutrition goals.</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-muted">Step {step} of 3</div>
          <button className="btn btn-primary" onClick={handleNext} disabled={step === 1 && !formData.name}>
            {step === 3 ? 'Get Started' : 'Next'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
