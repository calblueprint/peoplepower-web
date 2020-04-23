import React from 'react';

import LabelLine from './LabelLine';
import { getXOffset, getYOffset, getAverage } from './utils/math';

const Label = props => {
  const {
    datum,
    innerRadius,
    radius,
    slice: { startAngle, endAngle },
    nameKey,
    cx,
    cy
  } = props;

  // calculation
  const middleRadius = getAverage([innerRadius, radius]);
  const midAngle = getAverage([endAngle, startAngle]);
  const labelOffset = radius + middleRadius / 3;
  const x = cx + getXOffset(labelOffset, midAngle);
  const y = cy + getYOffset(labelOffset, midAngle);
  const textAnchor = cx < x ? 'start' : 'end';

  let name = datum[nameKey];
  switch (name) {
    case 'System Maintenance':
      name = 'System \nMaintenance';
      break;
    case 'Community Dividends':
      name = 'Community \nDividends';
      break;
    case 'Operation & Growing Co-op':
      name = 'Operation & \nGrowing Co-op';
      break;
    default:
      break;
  }

  return (
    <g>
      {name.split('\n').map((sub, index) => (
        <text
          x={x}
          y={y + index * 18}
          textAnchor={textAnchor}
          fill="#395578"
          style={{ fontSize: '12px', width: '25px', wordBreak: 'break-word' }}
        >
          {sub}
        </text>
      ))}
      <LabelLine
        cx={cx}
        cy={cy}
        middleRadius={middleRadius}
        radius={radius}
        midAngle={midAngle}
      />
    </g>
  );
};

export default Label;
