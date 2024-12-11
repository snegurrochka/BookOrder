//Файл підключає бібліотеку React і "вставляє"  додаток у html-файл з public/index.html
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';

// Знаходимо root-елемент у HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеримо додаток
//React бере компоненти написані на JavaScript і перетворює їх у реальні html-елементи
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

