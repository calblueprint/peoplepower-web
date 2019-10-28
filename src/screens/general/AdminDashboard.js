import React from 'react';
import Card from './Card';
import '../../styles/AdminDashboard.css';
import { getLoggedInUserId } from '../../lib/auth';
import {
  getAdminTable,
  getOwnersFromProjectGroup
} from '../../lib/adminHelper';

export default class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access: false,
      owners: []
    };
  }

  async componentDidMount() {
    const personId = getLoggedInUserId();
    if (personId == null) {
      return;
    }

    const adminGroupId = await getAdminTable(personId);
    if (adminGroupId === -1) {
      return;
    }

    const owners = await getOwnersFromProjectGroup(adminGroupId);
    try {
      this.setState({
        access: true,
        owners: owners.filter(owner => owner.Person[0] !== personId)
      });
    } catch (err) {
      console.error(err);
    }
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
        <p>Shhh keep it a secret</p>
        <div className="card-holder">
          {owners.map(owner => {
            return <Card name={owner.ID} />;
          })}
        </div>
      </div>
    );
  }
}
