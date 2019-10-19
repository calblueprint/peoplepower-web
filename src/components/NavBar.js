import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../styles/NavBar.css';

// TODO: Beneath the UL we can add a ProfilePicture component that displays current user info 


export default function NavBar() {
  return (
    <div className="navBarCont">
      <nav>
        <ul>
          <li className="navItem">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="navItem">
            <Link to="/finances">My Finaces</Link>
          </li>
          <li className="navItem">
            <Link to="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
