/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import { getAllSolarProjects } from '../../lib/airtable/request';
import Constants from '../../constants';

class SuperAdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { solarProjects: [] };
  }

  componentDidMount = async () => {
    const solarProjects = await getAllSolarProjects();
    this.setState({ solarProjects });
  };

  generateBillsForSolarProject(solarProjectId) {
    return fetch(`${Constants.BACKEND_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ solarProjectId })
    });
  }

  render() {
    const { solarProjects } = this.state;
    return (
      <div className="dashboard dash-admin">
        <div className="container">
          <div className="pb-5">
            <h1>Superadmin Dashboard</h1>
          </div>
          <p>
            Click button to generate bills for a project group. Generated bills
            should appear in airtable for any subscribers with a new bill{' '}
          </p>
          {solarProjects.map(proj => (
            <div key={proj.id}>
              <h4>{proj.name}</h4>
              <button
                className="btn btn--square btn--size16 btn--weight600 generate-bill-button"
                type="button"
                onClick={() => this.generateBillsForSolarProject(proj.id)}
              >
                Generate Bills
              </button>
            </div>
          ))}
          {/* </div> */}
          {/* <div className="admin-holder">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 className="admin-members-text">
                Members <span className="admin-number ">({owners.length})</span>
              </h4>
              <button
                type="button"
                className="btn btn--square btn--pink btn--size16 btn--weight600 invite-button"
                onClick={() => this.handleOpenModal('invite')}
              >
                Invite
              </button>
            </div>
            <div className="admin-card-holder">
              {owners.length >= 1 ? (
                owners.map(owner => {
                  return (
                    <AdminDashboardCard
                      key={owner.id}
                      owner={owner}
                      handleAdminChange={this.handleAdminChange}
                    />
                  );
                })
              ) : (
                <div className="white-text">
                  No owners to be displayed in this project group
                </div>
              )}
            </div> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  userLogin: state.userData.userLogin,
  projectGroup: state.userData.projectGroup
});
export default connect(mapStateToProps)(SuperAdminDashboard);
