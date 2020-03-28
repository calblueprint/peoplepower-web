import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default class SharesProgressBar extends React.PureComponent {
  render() {
    const { numberOfShares } = this.props;
    const percentage = numberOfShares * 10;
    const progressbarPink = '#cd6795';
    const progressbarGray = '#F4F1F24';
    const progressbarText = '30px';

    const circularProgressBarStyles = {
      pathColor: progressbarPink,
      textSize: progressbarText,
      textColor: progressbarPink,
      trailColor: progressbarGray
    };

    return (
      <div className="circle-progress-bar">
        <CircularProgressbar
          viewBox="0 0 0 0"
          value={percentage}
          text={numberOfShares}
          styles={buildStyles(circularProgressBarStyles)}
        />
      </div>
    );
  }
}
