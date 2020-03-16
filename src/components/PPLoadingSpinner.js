import React from 'react';
import '../styles/PPLoadingSpinner.css';

class PPLoadingSpinner extends React.PureComponent {
  render() {
    return (
      <div className="spinner">
        <div className="dot blue-dot" />
        <div className="dot pink-dot" />
        <div className="dot yellow-dot" />
        <div className="dot green-dot" />
      </div>
    );
  }
}

export default PPLoadingSpinner;
