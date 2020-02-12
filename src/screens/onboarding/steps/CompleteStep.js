import React from 'react';

class CompleteStep extends React.PureComponent {
  dashboardButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="flex onboarding-row w-100 right justify-space-between">
        <div className="left" />
        <div className="right">
          <button
            type="button"
            className="btn btn--rounded btn--pink btn--size12 getstarted-button"
            onClick={this.dashboardButton}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default CompleteStep;
