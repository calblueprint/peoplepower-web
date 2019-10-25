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
      phoneNumber: '',
      address: '',
      projectGroup: ''
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

    getRecordWithPromise('Person', id)
      .then(payload => {
        const {
          Email: email,
          'Phone Number': phoneNumber,
          Name: name,
          Owner: owner,
          Address: addressID
        } = payload.record;

        this.setState({
          email,
          name,
          phoneNumber,
          owner,
          address
        });

        return getRecordWithPromise('Owner', this.state.owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroup } = payload.record;
        return getRecordWithPromise('Project Group', this.state.projectGroup);
      })
      .then(payload => {
        const { Name: projectGroupName } = payload.record;
        this.setState({
          projectGroup: projectGroupName
        });

        return getRecordWithPromise('Address', this.state.addressID);
      })
      .then(payload => {
        const {
          City: city,
          Street: street,
          State: state,
          'Zip Code': zipCode
        } = payload.record;

        this.setState({
          address: `${street}, ${city}, ${state} ${zipCode}`
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogoutClick = () => {
    const { history } = this.props;
    logOut();
    history.push('/');
  };

  render() {
    const { name, email, phoneNumber, address, projectGroup } = this.state;
    return (
      <div className="dashboardCont">
        <div className="userInfoCont">
          <h2>General Owner Dashboard</h2>
          <p>Welcome, {name}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>Project Group: {projectGroup}</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={this.handleLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }
}
