/**
 * @typedef {Object} SceneNodes
 * @property {HTMLElement} section
 * @property {HTMLElement} list
 * @property {HTMLElement[]} steps
 * @property {HTMLElement[]} cards
 * @property {HTMLElement} counter
 * @property {HTMLElement} header
 */

/**
 * @typedef {Object} SceneGeometry
 * @property {readonly number[]} anchors
 * @property {number} stickyTop
 * @property {number} viewportHeight
 */

/**
 * @typedef {Object} SceneController
 * @property {(isEnabled: boolean) => void} configure
 * @property {() => SceneGeometry | null} measure
 * @property {(geometry: SceneGeometry | null, scrollY: number) => void} render
 */

/**
 * @typedef {Object} ViewportGeometry
 * @property {number} scrollRange
 * @property {number} heroHeight
 */

/**
 * @typedef {Object} ViewportController
 * @property {() => ViewportGeometry} measure
 * @property {(geometry: ViewportGeometry, scrollY: number) => void} render
 */

/**
 * @typedef {Object} ScrollGeometry
 * @property {ViewportGeometry} viewport
 * @property {SceneGeometry | null} scene
 */

export {};
