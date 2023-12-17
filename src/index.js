import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//import pages 
import Home from "./pages/Home";
import InprogressTasks from "./pages/InprogressTasks";
import Paramodo from "./pages/Paramodo";

// Creating route for app

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inprogress-tasks",
    element: <InprogressTasks />,
  },
  {
    path: "/paramodo",
    element: <Paramodo />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
