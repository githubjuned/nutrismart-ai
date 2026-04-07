import React, { createContext, useState, useEffect } from 'react';

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem('nutrismart_mealplan');
    return saved ? JSON.parse(saved) : null;
  });

  const [groceryList, setGroceryList] = useState(() => {
    const saved = localStorage.getItem('nutrismart_grocery');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (mealPlan) {
      localStorage.setItem('nutrismart_mealplan', JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('nutrismart_grocery', JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan, groceryList, setGroceryList }}>
      {children}
    </MealPlanContext.Provider>
  );
};
