import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../lib/authUtils';
import AnnouncementList from '../shared/components/AnnouncementList';
import '../../styles/GeneralOwnerDashboard.css';
import RightArrow from '../../assets/right_arrow.png';

class GeneralOwnerDashboard extends React.Component {
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
    const { owner, projectGroup, solarProjects } = this.props;

    const solarProjectComponent = solarProjects.map(project => {
      return <li key={project.name}>{project.name}</li>;
    });

    return (
      <div className="dash-solar-details">
        <p style={{ fontWeight: '800', color: 'var(--pp-black)' }}>
          Welcome, {owner.name}
        </p>
        <p>{'< Placeholder Admin Details >'} </p>
        <div>
          <p>
            <span>Email:</span> {owner.email}
          </p>
          <p>
            <span>Phone Number:</span> {owner.phoneNumber}
          </p>
          <p>
            <span>Address:</span> {owner.permanentAddress}
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
          className="btn btn--square btn--blue btn--size16 primary"
          onClick={this.handleLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }

  render() {
    const { announcements } = this.props;
    return (
      <div className="dashboard">
        <div className="cont dash-announcements-cont">
          <div className="header-button">
            <div className="header-only">
              <h3>Project News</h3>
            </div>
            <div className="right-button">
              <Link to="/projectnews">
                <img
                  className="button right-arrow-button"
                  src={RightArrow}
                  alt="right arrow"
                />
              </Link>
            </div>
          </div>

          <AnnouncementList
            announcements={announcements}
            css="non-admin-height"
          />
        </div>
        <div>
          <div className="dash-solar-details-cont">
            <h3>Solar Projects</h3>
            {/* TODO: to be eventually replaced with solar project */}
            {this.renderUserDetails()}
          </div>

          <div className="dash-investment-cont">
            <div className="header-button">
              <div className="header-only">
                <h3>My Investment</h3>
              </div>
              <div className="right-button">
                <Link to="/investment">
                  <img
                    className="button right-arrow-button"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Link>
              </div>
            </div>
            <div className="dash-investment-details-cont">
              {'< Investment Information here >'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  projectGroup: state.userData.projectGroup,
  solarProjects: state.userData.solarProjects,
  announcements: state.community.announcements
});

export default connect(mapStateToProps)(GeneralOwnerDashboard);
