import React from 'react';
import '../../styles/Card.css';

function Card({ name, callback, ownerId, ownerType }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{ownerType}</p>
      <button
        type="button"
        onClick={() => callback(ownerId)}
        className="card-button"
      >
        Remove from Group
      </button>
    </div>
  );
}

export default Card;
