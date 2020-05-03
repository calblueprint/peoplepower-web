import React from 'react';

class CompleteStep extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { onFinish } = this.props;
    return (
      <div className="flex onboarding-row w-100 right justify-space-between">
        <div className="left" />
        <div className="right">
          <button
            type="button"
            className="btn btn--rounded btn--pink btn--size12 get-started-button"
            onClick={onFinish}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default CompleteStep;
