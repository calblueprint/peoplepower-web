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
      owners: [],
      isReady: false
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
        owners: owners.filter(owner => owner.Person[0] !== personId),
        isReady: true
      });
    } catch (err) {
      console.error(err);
    }
  }

  async removeUser(idToRemove) {
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
    const { access, isReady } = this.state;

    if (!isReady) {
      return (
        <div className="cont">
          <h3>Loading...</h3>
        </div>
      );
    }

    if (!access) {
      return (
        <div className="cont">
          <h3>ACCESS DENIED</h3>
        </div>
      );
    }
    const { owners } = this.state;
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
                    <Card
                      name={owner.ID}
                      callback={idToRemove => this.removeUser(idToRemove)}
                      ownerId={owner[OWNER_ID_FIELD]}
                      ownerType={owner['Owner Type']}
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
