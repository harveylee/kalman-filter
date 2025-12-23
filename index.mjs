import cjsModule from './cjs/index.js';
// CommonJS modules imported via ESM are usually accessible on the `default` property.
const _cjs = cjsModule && cjsModule.default ? cjsModule.default : cjsModule;

export const KalmanFilter = _cjs.KalmanFilter;
export const getCovariance = _cjs.getCovariance;
export const State = _cjs.State;
export const checkCovariance = _cjs.checkCovariance;
export const correlationToCovariance = _cjs.correlationToCovariance;
export const covarianceToCorrelation = _cjs.covarianceToCorrelation;
export const projectObservation = _cjs.projectObservation;

// re-export everything else as a default namespace
export default _cjs;