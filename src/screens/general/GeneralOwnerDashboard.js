import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import { getRecordWithPromise } from '../../lib/request';
import { getLoggedInUserId, logOut } from '../../lib/auth';

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: 'user',
      phoneNumber: ''
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = getLoggedInUserId();
    if (!id) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    getRecordWithPromise('Person', id).then(payload => {
      // use array deconstructing
      const {
        Email: email,
        'Phone Number': phoneNumber,
        Name: name
      } = payload.record;
      this.setState({
        email,
        name,
        phoneNumber
      });
    });
  }

  handleLogoutClick = () => {
    const { history } = this.props;
    logOut();
    history.push('/');
  };

  render() {
    const { name, email, phoneNumber } = this.state;
    return (
      <div className="dashboard">
        <div className="cont">
          <h3>General Owner Dashboard</h3>
          <p>Welcome, {name}</p>
          <div>
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={this.handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
