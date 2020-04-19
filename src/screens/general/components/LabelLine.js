import React from 'react';

import { getXOffset, getYOffset } from './utils/math';

const LabelLine = props => {
  const { cx, cy, midAngle, middleRadius, radius } = props;
  const xStart = cx + getXOffset(middleRadius, midAngle);
  const yStart = cy + getYOffset(middleRadius, midAngle);

  const offSetEnd = 2 * radius - middleRadius;
  const xEnd = cx + getXOffset(offSetEnd, midAngle);
  const yEnd = cy + getYOffset(offSetEnd, midAngle);

  return (
    <polyline
      style={{
        opacity: '1',
        fill: 'none',
        stroke: 'var(--pp-black)',
        strokeWidth: '1px'
      }}
      points={`${xStart},${yStart} ${xEnd},${yEnd}`}
    />
  );
};

export default LabelLine;
