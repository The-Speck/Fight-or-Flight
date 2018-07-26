export const Wrap = (coord, max) => {
  if (coord < 0) {
    return max - Math.abs(coord % max) + 50;
  } else if (coord > max) {
    return - 50;
  } else {
    return coord;
  }
};
