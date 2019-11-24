import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { getLoggedInUserId } from '../lib/auth';
import Logo from '../assets/PPSC-logo.png';
import { getRecord } from '../lib/request';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    };
  }

  componentDidMount() {
    const id = getLoggedInUserId();

    if (!id) {
      this.setState({
        name: 'Sign In'
      });
    } else {
      getRecord('Person', id).then(payload => {
        const { Name: name } = payload.record;
        this.setState({
          id,
          name
        });
      });
    }
  }

  render() {
    const { id, name } = this.state;
    return (
      <div className="navBarCont">
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
            <li className="navItem">
              <Link to="/finances">My Finances</Link>
            </li>
            <li className="navItem">
              <Link to="/community">Community</Link>
            </li>
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
