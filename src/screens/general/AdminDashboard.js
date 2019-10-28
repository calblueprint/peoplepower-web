import React from 'react';
import Card from './Card';
import '../../styles/AdminDashboard.css';
import { getLoggedInUserId } from '../../lib/auth';
import {
  getAdminTable,
  getOwnersFromProjectGroup,
  removeOwnerFromProjectGroup,
  getOwnerFromPerson
} from '../../lib/adminHelper';

const OWNER_ID_FIELD = 'Owner ID';

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access: false,
      adminGroupId: -1,
      owners: []
    };
  }

  async componentDidMount() {
    const personId = getLoggedInUserId();
    if (personId == null) {
      return;
    }

    const ownerId = await getOwnerFromPerson(personId);
    const adminGroupId = await getAdminTable(ownerId);
    if (adminGroupId === -1) {
      return;
    }

    const owners = await getOwnersFromProjectGroup(adminGroupId);
    try {
      this.setState({
        access: true,
        adminId: ownerId,
        adminGroupId,
        owners: owners.filter(owner => owner.Person[0] !== personId)
      });
    } catch (err) {
      console.error(err);
    }
  }

  async removeUser(idToRemove) {
    console.log(idToRemove);
    const { adminGroupId, adminId } = this.state;
    let { owners } = this.state;
    let ownerIds = owners.map(owner => owner[OWNER_ID_FIELD]);

    // FILTER
    ownerIds = ownerIds.filter(ownerId => ownerId !== idToRemove);
    owners = owners.filter(owner => owner[OWNER_ID_FIELD] !== idToRemove);
    ownerIds.push(adminId);

    await removeOwnerFromProjectGroup(adminGroupId, ownerIds);
    this.setState({
      owners
    });
  }

  render() {
    const { access } = this.state;
    if (!access) {
      return (
        <div className="dashboardCont">
          <h3>ACCESS DENIED</h3>
        </div>
      );
    }
    const { owners } = this.state;
    return (
      <div className="dashboardCont">
        <h3>Admin Dashboard</h3>
        <div className="card-holder">
          {owners.length >= 1 ? (
            owners.map(owner => {
              return (
                <Card
                  name={owner.ID}
                  callback={idToRemove => this.removeUser(idToRemove)}
                  ownerId={owner[OWNER_ID_FIELD]}
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
    );
  }
}
