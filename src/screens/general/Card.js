import React from 'react';

function Card({ name, callback, ownerId }) {
  return (
    <div className="card">
      <h3>{name}</h3>
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
