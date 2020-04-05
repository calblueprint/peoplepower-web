import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default class SharesProgressBar extends React.PureComponent {
  render() {
    const { numberOfShares } = this.props;
    const percentage = numberOfShares * 10;
    const PROGRESS_BAR_PINK = '#cd6795';
    const PROGRESS_BAR_GRAY = '#F4F1F24';
    const PROGRESS_BAR_TEXT = '30px';

    const circularProgressBarStyles = {
      pathColor: PROGRESS_BAR_PINK,
      textSize: PROGRESS_BAR_TEXT,
      textColor: PROGRESS_BAR_PINK,
      trailColor: PROGRESS_BAR_GRAY
    };

    return (
      <CircularProgressbar
        viewBox="0 0 0 0"
        value={percentage}
        text={numberOfShares}
        styles={buildStyles(circularProgressBarStyles)}
      />
    );
  }
}
