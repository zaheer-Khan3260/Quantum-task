import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import UseIsAuthorized from './components/helper/UseIsAuthorized.jsx';
import App from './App';
import LoginForm from './components/auth/LoginForm.jsx';
import SignupForm from './components/auth/SignupForm.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/signup",
    element: <SignupForm/>
    
  },
  {
    path: "/",
    element: <App/>
  },


])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

