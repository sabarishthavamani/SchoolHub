import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-alert-confirm/lib/style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer 
    autoClose = {0.1}
    progressStyle={0.1}
    transition={Slide}/>
  </React.StrictMode>
);



