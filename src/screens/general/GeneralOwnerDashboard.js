import React from 'react';
import '../../styles/GeneralOwnerDashboard.css';
import {
  getAnnouncementsByProjectGroup,
  getPersonById,
  getOwnerById,
  getProjectGroupById,
  getSolarProjectById
} from '../../lib/airtable/request';
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

  async componentDidMount() {
    const { history, updateState } = this.props;
    const personId = getLoggedInUserId();
    if (!personId) {
      // They shouldn't be able to access this screen
      history.push('/');
      return;
    }

    const personRecord = await getPersonById(personId);
    const {
      Name: name,
      Email: email,
      'Phone Number': phoneNumber,
      Owner: ownerId,
      City: city,
      Street: street,
      State: state,
      'Zip Code': zipCode
    } = personRecord;

    this.setState({
      email,
      name,
      phoneNumber,
      address: `${street}, ${city}, ${state} ${zipCode}`,
      isLoadingDetails: false
    });

    updateState(personId, name);
    const ownerRecord = await getOwnerById(ownerId);
    const { 'Project Group': projectGroupID } = ownerRecord;
    const projectRecord = await getProjectGroupById(projectGroupID);
    const {
      Name: projectGroupName,
      'Solar Project': solarProject
    } = projectRecord;

    const solarProjectNames = [];
    solarProject.forEach(async project => {
      const solarProjectRecord = await getSolarProjectById(project);
      solarProjectNames.push(solarProjectRecord.Name);
      // TODO Fix this lol, way too many unnecessary setState calls
      this.setState({
        solarProject: solarProjectNames
      });
    });
    const announcementRecords = await getAnnouncementsByProjectGroup(
      projectGroupID
    );

    this.setState({
      projectGroupID,

      projectGroup: projectGroupName,

      cards: announcementRecords,
      isLoadingCards: false
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
