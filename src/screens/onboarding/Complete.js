import React from 'react';

const LOGIN_TOKEN_NAME = 'loginToken';

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
