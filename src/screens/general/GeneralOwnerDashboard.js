import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import { getRecordWithPromise } from '../../lib/request';
import { getLoggedInUserId, logOut } from '../../lib/auth';

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'N/A',
      name: 'user',
      phoneNumber: 'N/A',
      address: '',
      projectGroup: ''
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const userLogInID = getLoggedInUserId();
    if (!userLogInID) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    let personID;
    let email;
    let phoneNumber;
    let name;
    let owner;
    let addressID;

    getRecordWithPromise('User Login', userLogInID)
      .then(payload => {
        personID = payload.record.Person;
        return getRecordWithPromise('Person', personID);
      })
      .then(payload => {
        ({
          Name: name,
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          Address: addressID
        } = payload.record);

        this.setState({
          email,
          name,
          phoneNumber
        });

        return getRecordWithPromise('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;
        return getRecordWithPromise('Project Group', projectGroupID);
      })
      .then(payload => {
        const { Name: projectGroupName } = payload.record;
        this.setState({
          projectGroup: projectGroupName
        });
        return getRecordWithPromise('Address', addressID);
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
