/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import { getAllSolarProjects } from '../../lib/airtable/request';

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
    return fetch(`${process.env.REACT_APP_SERVER_URL}/generate`, {
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
