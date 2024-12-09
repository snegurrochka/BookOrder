import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';

// Знаходимо root-елемент у HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеримо додаток
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
