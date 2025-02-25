import React from 'react';
import ReactDOM from 'react-dom'; // Importación para React 17
import './index.css';
import App from './App';
import ContextCripto from './ContextCripto';
import 'react-alice-carousel/lib/alice-carousel.css';

// Usa ReactDOM.render para React 17
ReactDOM.render(
  <React.StrictMode>
    <ContextCripto>
      <App />
    </ContextCripto>
  </React.StrictMode>,
  document.getElementById('root')
);

