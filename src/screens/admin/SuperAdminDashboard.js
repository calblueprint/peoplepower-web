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

  render() {
    const { solarProjects } = this.state;
    return (
      <div>
        <h1>Superadmin Dashboard</h1>
        <p>
          Click button to generate bills for a project group. Generated bills
          should appear in airtable for any subscribers with a new bill{' '}
        </p>
        {solarProjects.map(proj => (
          <div key={proj.id}>
            <h4>{proj.name}</h4>
            <button
              type="button"
              onClick={() =>
                fetch(Constants.BILL_GENERATION_URL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ solarProjectId: proj.id })
                })
              }
            >
              Generate Bills
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  owner: state.userData.owner,
  userLogin: state.userData.userLogin,
  projectGroup: state.userData.projectGroup,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(SuperAdminDashboard);
