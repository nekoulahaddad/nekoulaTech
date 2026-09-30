/**
 * @param {() => import("./types.js").ScrollGeometry} measure
 * @param {(geometry: import("./types.js").ScrollGeometry) => void} render
 * @param {(callback: FrameRequestCallback) => number} [requestFrame]
 * @returns {{ request: () => void, invalidate: () => void }}
 */
export function createScrollScheduler(measure, render, requestFrame = requestAnimationFrame) {
  /** @type {{ frame: number | null, isDirty: boolean, geometry: import("./types.js").ScrollGeometry | null }} */
  let state = { frame: null, isDirty: true, geometry: null };
  const flush = () => {
    const shouldMeasure = state.isDirty || state.geometry === null;
    const geometry = shouldMeasure ? measure() : state.geometry;
    state = { frame: null, isDirty: false, geometry };
    if (geometry !== null) render(geometry);
  };
  const request = () => {
    if (state.frame !== null) return;
    state = { ...state, frame: requestFrame(flush) };
  };
  const invalidate = () => {
    state = { ...state, isDirty: true };
    request();
  };
  return { request, invalidate };
}
