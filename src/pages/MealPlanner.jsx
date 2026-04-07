import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Sparkles, Utensils, IndianRupee, Flame } from 'lucide-react';

const MealPlanner = () => {
  const { profile } = useContext(UserContext);
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const generatePlan = async () => {
    setErrorMsg('');
    if (!profile.geminiApiKey) {
       setErrorMsg('Please enter your Gemini API Key in Settings to generate a personalized meal plan.');
       return;
    }

    setGenerating(true);
    
    const targetCalories = profile.goal === 'lose' ? 1800 : profile.goal === 'gain' ? 2800 : 2200;
    
    const prompt = `Act as an expert Indian nutritionist. The user requires a strict single-day healthy Indian meal plan strictly within ₹${profile.budget} total for the day.
Diet: ${profile.diet}
Goal: ${profile.goal}
Weight: ${profile.weight}kg
Total target calories: ~${targetCalories} kcal. 

Return ONLY valid JSON format with three exact keys: "breakfast", "lunch", "dinner".
Each meal key MUST contain an object with: "name", "cost" (integer in INR), "calories" (integer), "protein" (integer in grams).
The sum of all "cost" values MUST NOT exceed ${profile.budget}. DO NOT wrap in Markdown codeblocks, just raw JSON string.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${profile.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 }
        })
      });

      if (!response.ok) throw new Error('Failed to fetch from Gemini API');
      
      const data = await response.json();
      let aiText = data.candidates[0].content.parts[0].text;
      
      // Cleanup markdown artifacts if any
      aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsedPlan = JSON.parse(aiText);
      setPlan(parsedPlan);
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to generate plan. Please verify your API key or budget constraints.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">AI Meal Planner</h1>
      </div>

      <div className="card bg-green-50 mb-6" style={{ background: 'var(--primary-light)' }}>
        <p className="text-sm" style={{ color: 'var(--primary-hover)' }}>Target Budget: ₹{profile.budget}/day</p>
        <p className="text-sm mt-1" style={{ color: 'var(--primary-hover)' }}>Diet: {profile.diet.toUpperCase()}</p>
      </div>

      {errorMsg && (
        <div className="bg-red-100 text-danger p-3 rounded-lg mb-4 text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {!plan ? (
        <div className="flex flex-col items-center justify-center p-8 mt-4 text-center">
          <Utensils size={48} className="text-muted mb-4" />
          <h2 className="text-lg">No meals planned yet</h2>
          <p className="text-sm text-muted mb-6">Let Gemini AI generate a perfectly balanced Indian meal plan strictly within your budget.</p>
          <button className="btn btn-primary" onClick={generatePlan} disabled={generating}>
            {generating ? 'AI is thinking...' : (
              <>
                <Sparkles size={18} /> Generate With Gemini
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4 mt-2">
            <h2 className="text-lg">Your Real AI Plan</h2>
            <button className="text-primary text-sm font-semibold flex items-center gap-1" onClick={generatePlan}>
              {generating ? 'Generating...' : <><Sparkles size={14}/> Regenerate</>}
            </button>
          </div>
          
          {Object.entries(plan).map(([mealName, meal]) => (
            <div key={mealName} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg capitalize">{mealName}</h3>
                  <p className="text-sm">{meal.name}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold flex items-center justify-end text-green-600">
                    <IndianRupee size={14} /> {meal.cost}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4 pt-3 flex-wrap" style={{ borderTop: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-1 text-xs text-muted font-semibold bg-gray-100 px-2 py-1 rounded">
                  <Flame size={14} className="text-warning"/> {meal.calories} kcal
                </div>
                <div className="flex items-center gap-1 text-xs text-muted font-semibold bg-gray-100 px-2 py-1 rounded">
                   Protein {meal.protein}g
                </div>
              </div>
            </div>
          ))}

          <div className="card glass-card mt-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold">Total Estimated Cost</p>
              <p className="text-xs text-muted">₹{plan.breakfast.cost + plan.lunch.cost + plan.dinner.cost} / ₹{profile.budget}</p>
            </div>
            <div className="text-lg font-bold text-primary">₹{plan.breakfast.cost + plan.lunch.cost + plan.dinner.cost}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
