import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import { getRecord, getMultipleFromAttr } from '../../lib/request';
import { getLoggedInUserId, logOut } from '../../lib/auth';
import AnnouncementList from '../../components/AnnouncementList';

export default class GeneralOwnerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'N/A',
      name: 'user',
      phoneNumber: 'N/A',
      address: '',
      projectGroup: '',
      projectGroupID: '',
      solarProject: [],
      cards: [],
      isLoadingCards: true,
      isLoadingDetails: true
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

    // Get Person record from person id
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
          phoneNumber,
          isLoadingDetails: false
        });

        // then get Owner record from owner id
        return getRecord('Owner', owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload.record;
        this.setState({
          projectGroupID
        });
        // then get Project Group from project group id
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
      .then(() => {
        const { projectGroupID } = this.state;
        return getMultipleFromAttr(
          'Announcement',
          'Project Group',
          projectGroupID
        );
      })
      .then(payload => {
        this.setState({
          cards: payload,
          isLoadingCards: false
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

  /* dash-solar-details will eventually be its own graph component
     so it'll be easy to write a ternary operator that will render
     it when it's loaded.
  */

  render() {
    const {
      name,
      email,
      phoneNumber,
      address,
      projectGroup,
      solarProject,
      cards,
      isLoadingCards,
      isLoadingDetails
    } = this.state;
    const solarProjectComponent = solarProject.map(project => {
      return <li>{project}</li>;
    });

    const userDetails = (
      <div className="dash-solar-details">
        <p>Welcome, {name}</p>
        <div>
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

    return (
      <div className="dashboard">
        <div className="cont dash-announcements-cont">
          <h3>Community</h3>
          {isLoadingCards ? (
            <div className="isLoadingDiv card" />
          ) : (
            <AnnouncementList announcements={cards} css="" />
          )}
        </div>
        <div className="dash-solar-details-cont">
          <h3>Solar Projects</h3>
          {isLoadingDetails ? <div className="isLoadingDiv" /> : userDetails}
        </div>
      </div>
    );
  }
}
