import assert from "node:assert/strict";
import test from "node:test";

import {
  createAnchors, getActiveStep, getProgress, getSceneProgress, getStackDepth,
} from "../assets/js/scroll/math.js";

test("page progress clamps overscroll and supports pages shorter than the viewport", () => {
  assert.equal(getProgress(-80, 1000), 0);
  assert.equal(getProgress(500, 1000), 0.5);
  assert.equal(getProgress(1200, 1000), 1);
  assert.equal(getProgress(10, 0), 0);
  assert.equal(getProgress(10, -100), 0);
});

test("scene anchors account for translated cards with different heights", () => {
  const heights = Object.freeze([450, 520, 470, 600]);
  const anchors = createAnchors(heights, 1800, 200);
  assert.deepEqual(anchors, [1800, 2450, 3170, 3840]);
  assert.deepEqual(heights, [450, 520, 470, 600]);
});

test("the scene indicator supports entry, exit and reverse scrolling", () => {
  const anchors = [100, 700, 1400, 2100];
  assert.equal(getSceneProgress(anchors, 0), 0);
  assert.equal(getSceneProgress(anchors, 1100), 0.5);
  assert.equal(getSceneProgress(anchors, 2400), 1);
  assert.equal(getSceneProgress(anchors, 100), 0);
  assert.equal(getActiveStep(anchors, 2400), 3);
  assert.equal(getActiveStep(anchors, 700), 1);
  assert.equal(getActiveStep(anchors, 0), 0);
  assert.equal(getSceneProgress([100], 300), 0);
});

test("stack depth follows the next card and keeps the final card at full size", () => {
  assert.equal(getStackDepth(1000, 500, 400), 0);
  assert.equal(getStackDepth(1000, 800, 400), 0.5);
  assert.equal(getStackDepth(1000, 1200, 400), 1);
  assert.equal(getStackDepth(1000, 800, 400), 0.5);
  assert.equal(getStackDepth(undefined, 1200, 400), 0);
});
