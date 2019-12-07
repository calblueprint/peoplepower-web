import React from 'react';

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSuccess = this.onSuccess.bind(this);
  }

  dashboardButton = () => {
    const { history } = this.props;
    // They shouldn't be able to access this screen
    history.push('/dashboard');
  };

  render() {
    return (
      <div className="flex onboarding-row w-100 right justify-space-between">
        <div className="right">
          <button
            type="button"
            className="getstarted-button"
            onClick={this.dashboardButton}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default Complete;
