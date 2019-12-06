import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { getRecord } from '../lib/request';
import { getLoggedInUserId } from '../lib/auth';
import { getOwnerFromPerson, getAdminTable } from '../lib/adminHelper';
import Logo from '../assets/PPSC-logo.png';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      isAdmin: false
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
          name,
          id
        });
      });
    }

    getOwnerFromPerson(id).then(ownerID => {
      getAdminTable(ownerID).then(payload => {
        if (payload === -1) {
          this.setState({
            isAdmin: false
          });
        } else {
          this.setState({
            isAdmin: true
          });
        }
      });
    });
  }

  render() {
    const { id, name, isAdmin } = this.state;
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
            {isAdmin ? (
              <li className="navItem">
                <Link to="/admin">Admin</Link>
              </li>
            ) : null}
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
