import mod from './index.js';

export const KalmanFilter = mod.KalmanFilter;
export const getCovariance = mod.getCovariance;
export const State = mod.State;
export const checkCovariance = mod.checkCovariance;
export const correlationToCovariance = mod.correlationToCovariance;
export const covarianceToCorrelation = mod.covarianceToCorrelation;
export const projectObservation = mod.projectObservation;
export const registerDynamic = mod.registerDynamic;
export const registerObservation = mod.registerObservation;

export default mod;
