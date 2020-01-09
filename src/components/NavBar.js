import React from 'react';
import '../styles/NavBar.css';
import { getRecord } from '../lib/request';
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
      getRecord('Person', id).then(payload => {
        const { Name: name } = payload.record;
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
    return (
      <div className="navBar">
        <img
          className="logo"
          src={Logo}
          alt="People Power Solar Cooperative Logo"
        />
      </div>
    );
  }
}
