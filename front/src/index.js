import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Routes';
import {
  RouterProvider
} from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
import Main from './pages/main/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// reportWebVitals(console.log);
