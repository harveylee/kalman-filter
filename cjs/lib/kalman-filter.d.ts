import State from './state';
import CoreKalmanFilter from './core-kalman-filter';
import { DynamicConfig, ObservationConfig, WinstonLogger } from './types/ObservationConfig';
export interface ModelsParameters {
    dynamic: DynamicConfig;
    observation: ObservationConfig;
}
export default class KalmanFilter extends CoreKalmanFilter {
    /**
    * @typedef {Object} Config
    * @property {DynamicObjectConfig | DynamicNonObjectConfig} dynamic
    * @property {ObservationObjectConfig | ObservationNonObjectConfig} observation
    */
    /**
    * @param {Config} options
    */
    constructor(options?: {
        observation?: any | {
            name: string;
        };
        dynamic?: any | {
            name: string;
        };
        logger?: WinstonLogger;
    });
    correct(options: {
        predicted: State;
        observation: number[] | number[][];
    }): State;
    /**
    * Performs the prediction and the correction steps
    * @param {State} previousCorrected
    * @param {<Array.<Number>>} observation
    * @returns {Array.<Number>} the mean of the corrections
    */
    filter(options: {
        previousCorrected?: State;
        index?: number;
        observation: number[] | number[][];
    }): State;
    /**
     * Filters all the observations
     * @param {Array.<Array.<Number>>} observations
     * @returns {Array.<Array.<Number>>} the mean of the corrections
     */
    filterAll(observations: any): number[][];
    /**
    * Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
    * in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
    * @param {Number} [limitIterations=1e2] max number of iterations
    * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
    * @return {Array.<Array.<Number>>} covariance
    */
    asymptoticStateCovariance({ limitIterations, tolerance }?: {
        limitIterations?: number;
        tolerance?: number;
    }): number[][];
    /**
    * Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
    * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
    * @return {Array.<Array.<Number>>} gain
    */
    asymptoticGain({ tolerance }?: {
        tolerance?: number;
    }): number[][];
}
//# sourceMappingURL=kalman-filter.d.ts.map