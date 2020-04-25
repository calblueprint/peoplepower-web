export const radian = Math.PI / 180;
export const getXOffsetMultiplayerByAngle = angle =>
  Math.cos(angle - 90 * radian);
export const getYOffsetMultiplayerByAngle = angle =>
  Math.sin(angle - 90 * radian);
export const getXOffset = (offset, angle) =>
  offset * getXOffsetMultiplayerByAngle(angle);
export const getYOffset = (offset, angle) =>
  offset * getYOffsetMultiplayerByAngle(angle);
export const getAverage = array =>
  array.reduce((acc, cur) => acc + cur, 0) / array.length;
