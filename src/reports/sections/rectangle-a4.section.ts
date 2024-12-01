import { oneCmInPoints } from './../helpers';

export const rectangleA4Section = (): any => {
  const rectangleA4 = {
    type: 'rect',
    x: oneCmInPoints / 2, // x and y are the top left corner of the rectangle
    y: oneCmInPoints / 2, // x and y are the top left corner of the rectangle
    w: 595.28 - (2 * oneCmInPoints) / 2, // x and y are the top left corner of the rectangle, // A4 width in points (595.28) minus 2 cm
    h: 841.89 - (2 * oneCmInPoints) / 2, // x and y are the top left corner of the rectangle, // A4 height in points (841.89) minus 2 cm
    r: 0,
    lineColor: 'black',
    lineWidth: 2, // Double the default line width
  };

  return rectangleA4;
};
