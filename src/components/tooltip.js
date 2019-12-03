import React from 'react';
import ToolTipIcon from '../images/tooltip.svg';

function tooltip(label) {
  return (
    <div className="tooltip right">
      <img
        className="tooltipicon right"
        alt="tool tip icon"
        src={ToolTipIcon}
      />
      <span className="tooltiptext">
        {label.split('\n').map(i => {
          return <div>{i}</div>;
        })}
      </span>
    </div>
  );
}

export default tooltip;
