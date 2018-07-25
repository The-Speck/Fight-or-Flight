export const Wrap = (coord, max) => {
  if (coord < 0) {
    return max - (coord % max);
  } else if (coord > max) {
    return coord % max;
  } else {
    return coord;
  }
};
