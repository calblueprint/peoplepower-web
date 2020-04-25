import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Colors from '../../../colors';

const { PP_PINK, PP_PROGRESS_BAR_GRAY } = Colors;

export default class SharesProgressBar extends React.PureComponent {
  render() {
    const { numberOfShares } = this.props;
    const percentage = numberOfShares * 10;
    const PROGRESS_BAR_TEXT = '30px';

    const circularProgressBarStyles = {
      pathColor: PP_PINK,
      textSize: PROGRESS_BAR_TEXT,
      textColor: PP_PINK,
      trailColor: PP_PROGRESS_BAR_GRAY
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
