import React from 'react';
import '../styles/App.css';
import Constants from '../constants';

const { BUG_REPORT_URL } = Constants;

class FeedbackButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '?'
    };
  }

  render() {
    const { buttonText } = this.state;
    return (
      <button
        onMouseEnter={() => this.setState({ buttonText: 'Report an Issue' })}
        onMouseLeave={() => this.setState({ buttonText: '?' })}
        type="button"
        className="feedback-button-fixed"
        target="_blank"
        onClick={e => {
          e.preventDefault();
          window.open(BUG_REPORT_URL);
        }}
      >
        {buttonText}
      </button>
    );
  }
}

export default FeedbackButton;
