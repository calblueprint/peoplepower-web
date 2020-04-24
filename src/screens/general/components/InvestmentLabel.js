import React from 'react';

import InvestmentLabelLine from './InvestmentLabelLine';
import { getXOffset, getYOffset, getAverage } from './utils/chartUtils';

const InvestmentLabel = props => {
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
          fill="var(--pp-blue)"
          style={{ fontSize: '12px', width: '25px', wordBreak: 'break-word' }}
        >
          {sub}
        </text>
      ))}
      <InvestmentLabelLine
        cx={cx}
        cy={cy}
        middleRadius={middleRadius}
        radius={radius}
        midAngle={midAngle}
      />
    </g>
  );
};

export default InvestmentLabel;
