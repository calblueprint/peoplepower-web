import React from 'react';
import { connect } from 'react-redux';
import AdminDashboardCard from './AdminDashboardCard';
import LoadingComponent from '../../components/LoadingComponent';
import {
  getAdminTable,
  getOwnersFromProjectGroup,
  updateProjectGroupOwners
} from '../../lib/adminUtils';
import { Columns } from '../../lib/airtable/schema';
import '../../styles/AdminDashboard.css';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access: false,
      adminGroupId: -1,
      owners: [],
      isReady: false
    };
  }

  async componentDidMount() {
    const { person, owner, isLoadingUserData } = this.props;

    // If data isn't in redux yet, don't do anything.
    if (isLoadingUserData) {
      return;
    }

    // TODO: Can any of this admin-related info be moved to redux?

    const adminGroupId = await getAdminTable(owner);
    if (adminGroupId === -1) {
      this.setState({
        access: false,
        isReady: true
      });
    } else {
      const owners = await getOwnersFromProjectGroup(adminGroupId);
      this.setState({
        access: true,
        isReady: true,
        adminId: owner[Columns.Owner.ID],
        adminGroupId,
        owners: owners.filter(
          o => o[Columns.Owner.Person] !== person[Columns.Person.ID]
        )
      });
    }
  }

  async removeUser(idToRemove) {
    const { adminGroupId, adminId, owners } = this.state;
    let ownerIds = owners.map(owner => owner[Columns.Owner.ID]);

    // FILTER
    ownerIds = ownerIds.filter(ownerId => ownerId !== idToRemove);
    const newOwners = owners.filter(
      owner => owner[Columns.Owner.ID] !== idToRemove
    );
    ownerIds.push(adminId);

    await updateProjectGroupOwners(adminGroupId, ownerIds);
    this.setState({
      owners: newOwners
    });
  }

  render() {
    const { access, isReady, owners } = this.state;
    const { isLoadingUserData } = this.props;

    if (!isReady || isLoadingUserData) {
      return <LoadingComponent />;
    }

    if (!access) {
      return (
        <div className="cont">
          <h3>ACCESS DENIED</h3>
        </div>
      );
    }
    return (
      <div className="dashboard dash-admin">
        <div>
          <h3>Project Group</h3>
          <div className="card-holder-cont">
            <div
              style={{ display: 'flex', 'justify-content': 'space-between' }}
            >
              <h4>
                Members <span>({owners.length})</span>
              </h4>
              <button type="button" className="invite-button">
                Invite
              </button>
            </div>
            <div className="card-holder">
              {owners.length >= 1 ? (
                owners.map(owner => {
                  return (
                    <AdminDashboardCard
                      name={owner[Columns.Owner.ID]}
                      callback={idToRemove => this.removeUser(idToRemove)}
                      ownerId={owner[Columns.Owner.ID]}
                      ownerType={owner[Columns.Owner.OwnerType]}
                    />
                  );
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
  authenticated: state.userData.authenticated,
  person: state.userData.person,
  owner: state.userData.owner,
  announcements: state.community.announcements,
  isLoadingUserData: state.userData.isLoading
});
export default connect(mapStateToProps)(AdminDashboard);
