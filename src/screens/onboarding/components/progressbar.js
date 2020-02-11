import React from 'react';

export default class ProgressBar extends React.PureComponent {
  colorStep = step => {
    const { step: activeStep } = this.props;
    if (activeStep === step) {
      return 'active';
    }
    if (activeStep > step) {
      return 'previous';
    }
    return '';
  };

  render() {
    const { step } = this.props;
    return (
      <div className="progress-bar-container">
        <div className="progressbar">
          <div className={`${this.colorStep(1)} progress-step`}>
            <svg height="4rem" width="4rem">
              <circle
                className="progress-bar-circle"
                cx="2rem"
                cy="2rem"
                strokeLocation="inside"
              />
              <polyline
                className="progress-bar-checkmark"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="41,27 30,40 22,34 "
              />
            </svg>
            <div className="progressbar-step-text">Contact</div>
          </div>
          <div
            className={`${
              step >= 3 ? 'progressbar-line-active' : ''
            } progressbar-line`}
          />
          <div className={`${this.colorStep(3)} progress-step`}>
            <svg className="progress-bar-svg" height="4rem" width="4rem">
              <circle
                className="progress-bar-circle"
                cx="2rem"
                cy="2rem"
                strokeLocation="inside"
              />
              <polyline
                className="progress-bar-checkmark"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="41,27 30,40 22,34 "
              />
            </svg>
            <div className="progressbar-step-text">Project Groups</div>
          </div>
          <div
            className={`${
              step >= 4 ? 'progressbar-line-active' : ''
            } progressbar-line`}
          />
          <div className={`${this.colorStep(4)} progress-step`}>
            <svg className="progress-bar-svg" height="4rem" width="4rem">
              <circle
                className="progress-bar-circle"
                cx="2rem"
                cy="2rem"
                strokeLocation="inside"
              />
              <polyline
                className="progress-bar-checkmark"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="41,27 30,40 22,34 "
              />
            </svg>
            <div className="progressbar-step-text">Owner Agreement</div>
          </div>
          <div
            className={`${
              step >= 5 ? 'progressbar-line-active' : ''
            } progressbar-line`}
          />
          <div className={`${this.colorStep(5)} progress-step`}>
            <svg className="progress-bar-svg" height="4rem" width="4rem">
              <circle
                className="progress-bar-circle"
                cx="2rem"
                cy="2rem"
                strokeLocation="inside"
              />
              <polyline
                className="progress-bar-checkmark"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="41,27 30,40 22,34 "
              />
            </svg>
            <div className="progressbar-step-text">Payment</div>
          </div>
        </div>
      </div>
    );
  }
}
