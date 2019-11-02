import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
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
    // hard-coded my id
    const id = 'recfnsL4HDoNHril6';
    getRecord('Person', id).then(payload => {
      const { Name: name } = payload.record;
      this.setState({
        id,
        name
      });
    });
  }

  render() {
    const { id, name } = this.state;
    return (
      <div className="navBarCont">
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
