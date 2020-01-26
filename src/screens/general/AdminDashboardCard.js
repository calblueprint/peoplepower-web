import React from 'react';
import '../../styles/main.css';

function AdminDashboardCard({ name, callback, ownerId, ownerType }) {
  const ownersTags = ownerType.map(type => {
    return (
      <div key={type} className="pp-tag">
        {type}
      </div>
    );
  });

  return (
    <div className="admin-card">
      <div className="card-profile-image" />
      <div className="card-name">
        <h3>{name}</h3>
        <div className="card-tags">{ownersTags}</div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => callback(ownerId)}
          className="card-button"
        >
          Remove from Group
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardCard;
