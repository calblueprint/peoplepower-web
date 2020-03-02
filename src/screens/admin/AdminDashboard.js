import React from 'react';
import { connect } from 'react-redux';
import AdminDashboardCard from './components/AdminDashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import { getOwnerRecordsForProjectGroup } from '../../lib/adminUtils';
import '../../styles/main.css';
import '../../styles/AdminDashboard.css';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { owners: [] };
  }

  componentDidMount() {
    this.fetchOwnerRecords();
  }

  componentDidUpdate(prevProps) {
    const { projectGroup } = this.props;
    if (prevProps.projectGroup !== projectGroup) {
      this.fetchOwnerRecords();
    }
  }

  async fetchOwnerRecords() {
    const { projectGroup } = this.props;
    const ownerRecords = await getOwnerRecordsForProjectGroup(projectGroup);
    this.setState({
      owners: ownerRecords
    });
  }

  render() {
    const { isLoadingUserData } = this.props;
    const { owners } = this.state;

    if (isLoadingUserData) {
      return <LoadingComponent />;
    }

    return (
      <div className="dashboard dash-admin">
        <div>
          <h3>Project Group</h3>
          <div className="card-holder-cont">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>
                Members <span>({owners.length})</span>
              </h4>
              <button
                type="button"
                className="btn btn--square btn--pink btn--size16 btn--weight600 invite-button"
              >
                Invite
              </button>
            </div>
            <div className="card-holder">
              {owners.length >= 1 ? (
                owners.map(owner => {
                  return <AdminDashboardCard key={owner.id} owner={owner} />;
                })
              ) : (
                <div className="white-text">
                  No owners to be displayed in this project group
                </div>
              )}
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps)(AdminDashboard);
