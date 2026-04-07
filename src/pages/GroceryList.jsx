import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ShoppingCart, Check, Plus, Minus, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialGroceries = [
  { id: 1, name: 'Soya Chunks', pricePerUnit: 60, unit: '500g', quantity: 1, checked: false, alt: 'Cheapest protein' },
  { id: 2, name: 'Toor Dal', pricePerUnit: 120, unit: '1kg', quantity: 1, checked: false, alt: null },
  { id: 3, name: 'Eggs', pricePerUnit: 180, unit: '1 Tray', quantity: 1, checked: false, alt: null },
  { id: 4, name: 'Brown Rice', pricePerUnit: 90, unit: '1kg', quantity: 1, checked: false, alt: 'White rice saves ₹30' },
  { id: 5, name: 'Bananas', pricePerUnit: 50, unit: '1 Dozen', quantity: 1, checked: false, alt: null },
];

const GroceryList = () => {
  const { dietaryStats, updateStats } = useContext(UserContext);
  const [items, setItems] = useState(initialGroceries);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const activeTotalCost = items.filter(i => !i.checked).reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);

  const payGroceries = () => {
    // Arbitrary MVP logic: Deduct this total from 'budgetUsed' for the sake of demo
    updateStats({ budgetUsed: dietaryStats.budgetUsed + activeTotalCost });
    alert(`₹${activeTotalCost} logged! In real life, grocery budget and daily limits may be tracked separately.`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">Weekly Groceries</h1>
        <div className="bg-primary text-white p-2 rounded-full cursor-pointer hover:shadow-lg transition-all hover:scale-105 active:scale-95">
          <Plus size={20} />
        </div>
      </div>

      <motion.div 
        className="card mb-6 bg-gradient-to-br from-green-500 to-emerald-700 text-white border-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <ShoppingCart size={20} />
            <span className="font-semibold">Estimated Total</span>
          </div>
          <span className="text-2xl font-bold">₹{activeTotalCost}</span>
        </div>
        <button className="w-full mt-4 bg-white text-green-700 font-bold p-2 text-sm rounded-lg shadow-sm active:scale-95 transition-transform" onClick={payGroceries}>
          Log Cost to Tracker
        </button>
      </motion.div>

      <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Auto-Generated List</h2>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id} 
              className={`card p-4 transition-all ${item.checked ? 'opacity-40 scale-[0.98]' : ''}`}
            >
              <div className="flex gap-3">
                <div 
                  className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${item.checked ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.checked && <Check size={14} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className={`font-semibold ${item.checked ? 'line-through text-muted' : ''}`}>
                      {item.name} <span className="text-xs font-normal text-muted">({item.unit})</span>
                    </span>
                    <span className="font-bold text-primary">₹{item.pricePerUnit * item.quantity}</span>
                  </div>
                  
                  {item.alt && !item.checked && (
                    <div className="flex items-center gap-1 text-xs text-warning mt-2 bg-yellow-50 dark:bg-yellow-900/20 p-1.5 rounded w-max">
                      <TrendingDown size={14}/> {item.alt}
                    </div>
                  )}

                  {!item.checked && (
                    <div className="mt-3 flex items-center gap-3">
                      <button className="w-7 h-7 flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 active:scale-90 transition-transform" onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                      <span className="text-sm font-semibold w-2 text-center">{item.quantity}</span>
                      <button className="w-7 h-7 flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 active:scale-90 transition-transform" onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GroceryList;
