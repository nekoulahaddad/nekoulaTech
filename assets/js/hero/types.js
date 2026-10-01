/**
 * @typedef {Object} HeroNodes
 * @property {HTMLElement} section
 * @property {HTMLElement} stage
 * @property {HTMLElement} title
 * @property {HTMLElement} header
 * @property {HTMLElement[]} cards
 */

/**
 * @typedef {Object} HeroGeometry
 * @property {number} start
 * @property {number} range
 */

/**
 * @typedef {Object} CardFrame
 * @property {number} opacity
 * @property {number} lift
 * @property {number} scale
 * @property {number} angle
 * @property {number} blur
 */

/**
 * @typedef {Object} HeroFrame
 * @property {number} progress
 * @property {number} titleScale
 * @property {number} copyLift
 * @property {number} orbitRotation
 * @property {number} orbitScale
 * @property {number} orbitOpacity
 * @property {number} cueOpacity
 * @property {readonly CardFrame[]} cards
 */

/**
 * @typedef {Object} HeroController
 * @property {(shouldPin: boolean, hasMotion: boolean) => void} configure
 * @property {() => HeroGeometry | null} measure
 * @property {(geometry: HeroGeometry | null, scrollY: number) => void} render
 */

export {};
