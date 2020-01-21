import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../lib/authUtils';
import AnnouncementList from '../../components/AnnouncementList';
import LoadingComponent from '../../components/LoadingComponent';
import '../../styles/GeneralOwnerDashboard.css';

class GeneralOwnerDashboard extends React.Component {
  async componentDidMount() {
    const { authenticated, history } = this.props;

    // TODO: this kind of redirect logic should be handled in App.js or Navbar.js
    if (!authenticated) {
      // They shouldn't be able to access this screen
      history.push('/');
    }
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

  renderUserDetails() {
    const { person, projectGroup, solarProjects } = this.props;

    const solarProjectComponent = solarProjects.map(project => {
      return <li key={project.name}>{project.name}</li>;
    });

    return (
      <div className="dash-solar-details">
        <p style={{ fontWeight: '800', color: 'var(--pp-black)' }}>
          Welcome, {person.name}
        </p>
        <div>
          <p>
            <span>Email:</span> {person.email}
          </p>
          <p>
            <span>Phone Number:</span> {person.phoneNumber}
          </p>
          <p>
            <span>Address:</span> {person.address}
          </p>
          <p>
            <span>Project Group:</span> {projectGroup.name}
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
  }

  render() {
    const {
      announcements,
      isLoadingAnnouncements,
      isLoadingUserData
    } = this.props;
    if (isLoadingAnnouncements && isLoadingUserData) {
      return <LoadingComponent />;
    }
    return (
      <div className="dashboard">
        <div className="cont dash-announcements-cont">
          <h3>Community</h3>
          {isLoadingAnnouncements ? (
            <div className="isLoadingDiv card" />
          ) : (
            <AnnouncementList announcements={announcements} css="" />
          )}
        </div>
        <div className="dash-solar-details-cont">
          <h3>Solar Projects</h3>
          {isLoadingUserData ? (
            <div className="isLoadingDiv" />
          ) : (
            this.renderUserDetails()
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  person: state.userData.person,
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  solarProjects: state.userData.solarProjects,
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading,
  isLoadingAnnouncements: state.community.isLoading
});

export default connect(mapStateToProps)(GeneralOwnerDashboard);
