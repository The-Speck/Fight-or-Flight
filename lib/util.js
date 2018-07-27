const Util = {
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm(vec) {
    return Util.dist([0, 0], vec);
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - Math.abs(coord % max) + 50;
    } else if (coord > max) {
      return -50;
    } else {
      return coord;
    }
  },

  outOfBounds(pos) {
    return (
        (pos[0] < -51) ||
        (pos[1] < -51) ||
        (pos[0] > window.canvas.width + 51) ||
        (pos[1] > window.canvas.height + 51)
      );
  },
};

export default Util;
