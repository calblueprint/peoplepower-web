import React from 'react';
import '../styles/LoadingComponent.css';
import PPLoadingSpinner from './PPLoadingSpinner';

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <PPLoadingSpinner />
    </div>
  );
};

export default LoadingComponent;
