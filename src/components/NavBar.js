import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/NavBar.css';
import { getRecordWithPromise } from '../lib/request'

// TODO: Beneath the UL we can add a ProfilePicture component that displays current user info 


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    // hard-coded my id
    const id = 'recfnsL4HDoNHril6';
    let record = getRecordWithPromise('Person', id).then((payload) => {
      let { "Name": name } = payload.record
      this.setState({
        name: name
      });
    })
  }

  render() {
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
            <li><span>{this.state.name}</span></li>
          </ul>
        </nav>
      </div>
    )
  }
}
