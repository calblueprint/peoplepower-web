import React from 'react';
import '../../../styles/main.css';
import { removeOwner } from '../../../lib/adminUtils';
import { getCredentials, isAdmin } from '../../../lib/credentials';

class AdminDashboardCard extends React.PureComponent {
  render() {
    const { owner } = this.props;
    const { ownerTypes } = owner;
    const credentials = getCredentials(owner);
    const isAdminOwner = isAdmin(credentials);
    if (isAdminOwner) {
      ownerTypes.push('Admin');
    }

    const ownerTags = ownerTypes.map(type => (
      <div key={type} className={`${type.toLowerCase()}-tag pp-tag`}>
        {type === 'General' ? 'General Owner' : type}
      </div>
    ));
    return (
      <div className="admin-card">
        <div className="card-name">
          <h3>{owner.name}</h3>
          <div className="card-tags">{ownerTags}</div>
        </div>
        <div>
          {/* Ensures you can only remove non-admin owners */}
          {!isAdminOwner && (
            <button
              type="button"
              onClick={() => removeOwner(owner)}
              className="card-button"
            >
              Remove from Group
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default AdminDashboardCard;
