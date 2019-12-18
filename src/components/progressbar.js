import React from 'react';

function colorStep(activeStep, step) {
  if (activeStep === step) {
    return 'active';
  }
  if (activeStep > step) {
    return 'previous';
  }
  return '';
}

export default function ProgressBar(step) {
  return (
    <div className="progress-bar-container">
      <ul className="progressbar">
        <li className={`${colorStep(step, 2)} progress-bar-text`}>Contact</li>
        <li className={`${colorStep(step, 3)} progress-bar-text`}>
          Project Group
        </li>
        <li className={`${colorStep(step, 4)} progress-bar-text`}>
          Owner Agreement
        </li>
        <li className={`${colorStep(step, 5)} progress-bar-text`}>Payment</li>
      </ul>
    </div>
  );
}
