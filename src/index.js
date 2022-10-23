import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './components/js/Menu';
import Content from './components/js/Content';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu />
    <Content />
  </React.StrictMode>
);
