import React from 'react';
import '../../styles/Card.css';

function Card({ name, callback }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <button type="button" onClick={callback} className="card-button">
        {' '}
        Remove from Group{' '}
      </button>
    </div>
  );
}

export default Card;
