import assert from "node:assert/strict";
import test from "node:test";

import { HERO_MOTION } from "../assets/js/hero/constants.js";
import { getHeroCardFrame, getHeroFrame } from "../assets/js/hero/math.js";

const CARD_COUNT = 3;

test("hero frames clamp overscroll and preserve their starting pose", () => {
  const initial = getHeroFrame(0, CARD_COUNT);
  assert.deepEqual(getHeroFrame(-1, CARD_COUNT), initial);
  assert.equal(initial.titleScale, 1);
  assert.equal(initial.orbitOpacity, 1);
  assert.equal(initial.cueOpacity, 1);
  assert.deepEqual(initial.cards.map(card => card.opacity), [0, 0, 0]);
  assert.deepEqual(getHeroFrame(2, CARD_COUNT), getHeroFrame(1, CARD_COUNT));
});

test("cards reveal in sequence and settle without residual blur or tilt", () => {
  const midway = HERO_MOTION.cardStart + HERO_MOTION.cardDuration / 2;
  assert(getHeroCardFrame(midway, 0).opacity > 0);
  assert.equal(getHeroCardFrame(midway, 1).opacity, 0);
  assert.equal(getHeroCardFrame(midway, 2).opacity, 0);
  const finalCards = getHeroFrame(1, CARD_COUNT).cards;
  for (const card of finalCards) {
    assert.deepEqual(card, { opacity: 1, lift: 0, scale: 1, angle: 0, blur: 0 });
  }
});

test("reverse scrolling exactly restores earlier animation frames", () => {
  const initial = getHeroFrame(0, CARD_COUNT);
  const halfway = getHeroFrame(0.5, CARD_COUNT);
  const final = getHeroFrame(1, CARD_COUNT);
  assert.equal(final.titleScale, 1 - HERO_MOTION.titleScale);
  assert.equal(final.copyLift, -HERO_MOTION.copyLift);
  assert.equal(final.cueOpacity, 0);
  assert.deepEqual(getHeroFrame(0.5, CARD_COUNT), halfway);
  assert.deepEqual(getHeroFrame(0, CARD_COUNT), initial);
});
