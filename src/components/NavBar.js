import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/NavBar.css';
import { getRecordWithPromise } from '../request'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    }
  }

  componentDidMount() {
    // hard-coded my id
    const id = 'recfnsL4HDoNHril6';
    let record = getRecordWithPromise('Person', id).then((payload) => {
      let { "Name": name } = payload.record
      this.setState({
        id: id,
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
            <li className="navItem">
              <Link to={`/profile/${this.state.id}`}><span>{this.state.name}</span></Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
