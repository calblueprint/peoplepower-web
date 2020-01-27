import React from 'react';
import '../styles/LoadingComponent.css';

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <img
        src="https://image.flaticon.com/icons/svg/25/25220.svg"
        className="loading-component__rotate"
        alt="page is loading"
      />
      <h1>Generating Power...</h1>
    </div>
  );
};

export default LoadingComponent;
