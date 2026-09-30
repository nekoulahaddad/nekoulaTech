/** @param {number} value @returns {number} */
export function clampProgress(value) {
  return Math.min(1, Math.max(0, value));
}

/** @param {number} position @param {number} range @returns {number} */
export function getProgress(position, range) {
  if (range <= 0) return 0;
  return clampProgress(position / range);
}

/**
 * @param {readonly number[]} heights
 * @param {number} start
 * @param {number} gap
 * @returns {readonly number[]}
 */
export function createAnchors(heights, start, gap) {
  return heights.map((height, index) => {
    const precedingHeight = heights.slice(0, index).reduce((sum, size) => sum + size, 0);
    return start + precedingHeight + gap * index;
  });
}

/**
 * @param {readonly number[]} anchors
 * @param {number} position
 * @returns {number}
 */
export function getSceneProgress(anchors, position) {
  const start = anchors[0];
  const end = anchors[anchors.length - 1];
  if (start === undefined || end === undefined) return 0;
  return getProgress(position - start, end - start);
}

/** @param {readonly number[]} anchors @param {number} position @returns {number} */
export function getActiveStep(anchors, position) {
  return anchors.reduce((active, anchor, index) => {
    if (position >= anchor) return index;
    return active;
  }, 0);
}

/**
 * @param {number | undefined} nextAnchor
 * @param {number} position
 * @param {number} distance
 * @returns {number}
 */
export function getStackDepth(nextAnchor, position, distance) {
  if (nextAnchor === undefined) return 0;
  return getProgress(position + distance - nextAnchor, distance);
}
