import React from 'react';
import '../styles/App.css';
import Constants from '../constants';

const { BUG_REPORT_URL } = Constants;

class FeedbackButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '?',
      showText: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({
      showText: true,
      buttonText: ''
    });
    setTimeout(() => {
      const { showText } = this.state;
      if (showText) {
        this.setState({ buttonText: 'Report an Issue' });
      }
    }, 100);
    // if (showText) {
    //   this.setState({ buttonText: 'Report an Issue' });
    // }
    // setTimeout(() => this.setState({ buttonText: 'Report an Issue' }), 90);
  }

  onMouseLeave() {
    this.setState({ showText: false });
    this.setState({ buttonText: '?' });
  }

  render() {
    const { buttonText } = this.state;
    return (
      <button
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
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
