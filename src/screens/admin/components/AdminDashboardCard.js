import React from 'react';
import '../../../styles/main.css';
import { getCredentials, isAdmin } from '../../../lib/credentials';

class AdminDashboardCard extends React.PureComponent {
  render() {
    const { owner, handleAdminChange } = this.props;
    const { ownerTypes, dateCreated } = owner;
    const credentials = getCredentials(owner);
    const isAdminOwner = isAdmin(credentials);

    if (isAdminOwner) {
      ownerTypes.push('Admin');
    }

    const ownerTags = ownerTypes.map(function(type) {
      switch (type) {
        case 'General':
          return (
            <div key={type} className="admin-pp-tag pp-tag-general">
              General Owner
            </div>
          );
        case 'Admin':
          return (
            <div key={type} className="admin-pp-tag pp-tag-admin">
              {type}
            </div>
          );
        case 'Subscriber':
          return (
            <div key={type} className="admin-pp-tag pp-tag-subscriber">
              {type}
            </div>
          );
        default:
          return (
            <div key={type} className="pp-tag">
              {type}
            </div>
          );
      }
    });
    return (
      <button
        className="admin-card"
        type="button"
        name="admin"
        onClick={() => handleAdminChange(owner)}
      >
        <div className="card-name">
          <h3>{owner.name}</h3>
          <div className="card-tags">{ownerTags}</div>
        </div>
        <div className="flex justify-content-space">
          <div className="member-since-text">
            Member since {dateCreated.substring(0, 4)}
          </div>
        </div>
      </button>
    );
  }
}

export default AdminDashboardCard;
