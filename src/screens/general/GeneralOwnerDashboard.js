import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import { getRecord } from '../../lib/request';
import { getLoggedInUserId, logOut } from '../../lib/auth';

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'N/A',
      name: 'user',
      phoneNumber: 'N/A',
      address: '',
      projectGroup: '',
      solarProject: []
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

    let email;
    let phoneNumber;
    let name;
    let owner;
    let addressID;

    getRecord('Person', id)
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

        return getRecord('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;
        return getRecord('Project Group', projectGroupID);
      })
      .then(payload => {
        const {
          Name: projectGroupName,
          'Solar Project': solarProject
        } = payload.record;
        this.setState({
          projectGroup: projectGroupName
        });

        const solarProjectNames = [];
        // group promise.all?
        solarProject.forEach(project => {
          getRecord('Solar Project', project).then(res => {
            solarProjectNames.push(res.record.Name);
            this.setState({
              solarProject: solarProjectNames
            });
          });
        });

        return getRecord('Address', addressID);
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
    const {
      name,
      email,
      phoneNumber,
      address,
      projectGroup,
      solarProject
    } = this.state;
    const solarProjectComponent = solarProject.map(project => {
      return <li>{project}</li>;
    });
    return (
      <div className="dashboardCont">
        <div className="userInfoCont">
          <h2>General Owner Dashboard</h2>
          <p>Welcome, {name}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>Project Group: {projectGroup}</p>
          <ul>
            Solar Project(s):
            {solarProjectComponent}
          </ul>
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
