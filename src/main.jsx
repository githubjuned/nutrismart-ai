import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import { MealPlanProvider } from './context/MealPlanContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <MealPlanProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MealPlanProvider>
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
