import assert from "node:assert/strict";
import test from "node:test";

import { createScrollScheduler } from "../assets/js/scroll/scheduler.js";

function createHarness() {
  let frames = [];
  let measurements = 0;
  let renders = [];
  const measure = () => {
    measurements += 1;
    return { viewport: { scrollRange: measurements * 100, heroHeight: 600 }, scene: null };
  };
  const render = (geometry) => { renders = [...renders, geometry.viewport.scrollRange]; };
  const requestFrame = (callback) => {
    frames = [...frames, callback];
    return frames.length;
  };
  return {
    loop: createScrollScheduler(measure, render, requestFrame),
    snapshot: () => ({ frames: frames.length, measurements, renders }),
    flush: (index) => frames[index](0),
  };
}

test("rapid scroll events coalesce into one frame without remeasuring layout", () => {
  const harness = createHarness();
  harness.loop.request();
  harness.loop.request();
  assert.equal(harness.snapshot().frames, 1);
  harness.flush(0);
  harness.loop.request();
  harness.flush(1);
  assert.deepEqual(harness.snapshot(), { frames: 2, measurements: 1, renders: [100, 100] });
});

test("resize invalidation refreshes geometry even when a scroll frame is pending", () => {
  const harness = createHarness();
  harness.loop.request();
  harness.flush(0);
  harness.loop.request();
  harness.loop.invalidate();
  harness.loop.invalidate();
  harness.flush(1);
  assert.deepEqual(harness.snapshot(), { frames: 2, measurements: 2, renders: [100, 200] });
});
