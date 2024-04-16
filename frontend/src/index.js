import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Home from './screen/Home';
import Account from './screen/Account';
import Addmovies from './screen/Addmovies';
import MoviedSelect from './screen/MoviedSelect';
import SearchMovies from './screen/SearchMovies';
import WatchedMovies from './screen/WatchedMovies';
import Friends from './screen/Friends';
import FriendsDetails from './screen/FriendsDetails';


const user=window.localStorage.getItem('user')



const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home/> </div>,
  },
  {
    path: "/login",
    element: <div><Login/></div>,
  },
  {
    path: "/signup",
    element: <div><Signup/></div>,
  },
  {
    path: "/add",
    element: <div><Addmovies/></div>,
  },
  {
    path: "/:original_title",
    element: <div><MoviedSelect/></div>,
  },
  {
    path: "/search",
    element: <div><SearchMovies/></div>,
  },
  {
    path: "/account",
    element: <div><Account/></div>,
  },
  {
    path: "/watched",
    element: <div><WatchedMovies/></div>,
  },
  {
    path: "/friends",
    element: <div><Friends/></div>,
  },
  {
    path: "/friendsDetails",
    element: <div><FriendsDetails/></div>,
  },
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
