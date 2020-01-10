import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import {
  getAnnouncementsForProjectGroup,
  getPersonById,
  getOwnerById,
  getProjectGroupById,
  getSolarProjectById
} from '../../lib/request';
import { getLoggedInUserId, logOut } from '../../lib/auth';
import AnnouncementList from '../../components/AnnouncementList';
import LoadingComponent from '../../components/LoadingComponent';

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
    const { history, updateState } = this.props;
    const personId = getLoggedInUserId();
    if (!personId) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    let email;
    let phoneNumber;
    let name;
    let owner;
    let city;
    let street;
    let zipCode;
    let state;

    // Get Person record from person id
    getPersonById(personId)
      .then(payload => {
        ({
          Name: name,
          Email: email,
          'Phone Number': phoneNumber,
          Owner: owner,
          City: city,
          Street: street,
          State: state,
          'Zip Code': zipCode
        } = payload);

        this.setState({
          email,
          name,
          phoneNumber,
          address: `${street}, ${city}, ${state} ${zipCode}`,

          isLoadingDetails: false
        });

        updateState(personId, name);

        // then get Owner record from owner id
        return getOwnerById(owner);
      })
      .then(payload => {
        const { 'Project Group': projectGroupID } = payload;
        this.setState({
          projectGroupID
        });
        // then get Project Group from project group id
        return getProjectGroupById(projectGroupID);
      })
      .then(payload => {
        const {
          Name: projectGroupName,
          'Solar Project': solarProject
        } = payload;
        this.setState({
          projectGroup: projectGroupName
        });
        const solarProjectNames = [];
        solarProject.forEach(project => {
          getSolarProjectById(project).then(res => {
            solarProjectNames.push(res.Name);
            this.setState({
              solarProject: solarProjectNames
            });
          });
        });
      })
      .then(() => {
        const { projectGroupID } = this.state;
        console.log('I SEE THIS');
        return getAnnouncementsForProjectGroup(projectGroupID);
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
    const { history, updateState } = this.props;
    logOut();
    updateState('');
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
      return <li key={project}>{project}</li>;
    });

    const userDetails = (
      <div className="dash-solar-details">
        <p style={{ fontWeight: '800', color: 'black' }}>Welcome, {name}</p>
        <div>
          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Phone Number:</span> {phoneNumber}
          </p>
          <p>
            <span>Address:</span> {address}
          </p>
          <p>
            <span>Project Group:</span> {projectGroup}
          </p>
          <p>
            <span>Solar Project(s):</span>
          </p>
          <ul>{solarProjectComponent}</ul>
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

    if (isLoadingCards && isLoadingDetails) {
      return <LoadingComponent />;
    }
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
