import React from 'react';
import '../styles/App.css';

const LoadingComponent = () => {
  return (
    <div className="loadingComponent">
      <img
        src="https://image.flaticon.com/icons/svg/25/25220.svg"
        className="rotate"
        alt="page is loading"
      />
      <h1>Generating Power...</h1>
    </div>
  );
};

export default LoadingComponent;
