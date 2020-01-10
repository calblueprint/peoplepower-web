import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { getPersonById } from '../lib/request';
import { getLoggedInUserId } from '../lib/auth';
import applyCredentials from '../lib/credentials';
import Logo from '../assets/PPSC-logo.png';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      credentials: ''
    };
  }

  componentDidMount() {
    const id = getLoggedInUserId();

    if (!id) {
      this.setState({
        name: 'Sign In'
      });
    } else {
      getPersonById(id).then(payload => {
        const { Name: name } = payload;
        this.setState({
          name,
          id
        });
      });

      applyCredentials(id).then(credentials => {
        this.setState({
          credentials
        });
      });
    }
  }

  updateNavbarState(id, name) {
    this.setState({
      id,
      name
    });
  }

  render() {
    const { id, name, credentials } = this.state;
    return (
      <div className="navBar">
        <img
          className="logo"
          src={Logo}
          alt="People Power Solar Cooperative Logo"
        />
        <nav>
          <ul>
            <li className="navItem">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {credentials.includes('G') ? (
              <li className="navItem">
                <Link to="/investment">My Investment</Link>
              </li>
            ) : null}
            {credentials.includes('S') ? (
              <li className="navItem">
                <Link to="/billing">Billing</Link>
              </li>
            ) : null}
            <li className="navItem">
              <Link to="/community">Community</Link>
            </li>
            {credentials.includes('A') ? (
              <li className="navItem">
                <Link to="/admin">Admin</Link>
              </li>
            ) : null}
            <li className="navItem">
              <Link to={`/profile/${id}`}>
                <span>{name}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
