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

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - Math.abs(coord % max) + 40;
    } else if (coord > max) {
      return -40;
    } else {
      return coord;
    }
  },

  outOfBounds(pos) {
    return (
        (pos[0] < -41) ||
        (pos[1] < -41) ||
        (pos[0] > window.canvas.width + 41) ||
        (pos[1] > window.canvas.height + 41)
      );
  },

  angleBtwnRef(base, target) {
    const vecx = target[0] - base[0];
    const vecy = target[1] - base[1];
    return Math.atan2(vecy , vecx);
  }
};

export default Util;
