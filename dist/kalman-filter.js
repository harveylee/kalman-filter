var kalmanFilter;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts"
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.projectObservation = exports.covarianceToCorrelation = exports.correlationToCovariance = exports.checkCovariance = exports.State = exports.getCovariance = exports.KalmanFilter = void 0;
const modelCollection = __importStar(__webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.ts"));
const defaultDynamicModels = __importStar(__webpack_require__(/*! ./lib/dynamic */ "./lib/dynamic/index.ts"));
const defaultObservationModels = __importStar(__webpack_require__(/*! ./lib/observation */ "./lib/observation/index.ts"));
function camelToDash(str) {
    if (str === str.toLowerCase()) {
        return str;
    }
    return str.replaceAll(/[A-Z]/g, m => '-' + m.toLowerCase());
}
Object.keys(defaultDynamicModels).forEach((k) => {
    modelCollection.registerDynamic(camelToDash(k), defaultDynamicModels[k]);
});
Object.keys(defaultObservationModels).forEach((k) => {
    modelCollection.registerObservation(camelToDash(k), defaultObservationModels[k]);
});
__exportStar(__webpack_require__(/*! ./lib/model-collection */ "./lib/model-collection.ts"), exports);
__exportStar(__webpack_require__(/*! ./lib/dynamic */ "./lib/dynamic/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./lib/observation */ "./lib/observation/index.ts"), exports);
var kalman_filter_1 = __webpack_require__(/*! ./lib/kalman-filter */ "./lib/kalman-filter.ts");
Object.defineProperty(exports, "KalmanFilter", ({ enumerable: true, get: function () { return __importDefault(kalman_filter_1).default; } }));
var get_covariance_1 = __webpack_require__(/*! ./lib/utils/get-covariance */ "./lib/utils/get-covariance.ts");
Object.defineProperty(exports, "getCovariance", ({ enumerable: true, get: function () { return __importDefault(get_covariance_1).default; } }));
var state_1 = __webpack_require__(/*! ./lib/state */ "./lib/state.ts");
Object.defineProperty(exports, "State", ({ enumerable: true, get: function () { return __importDefault(state_1).default; } }));
var check_covariance_1 = __webpack_require__(/*! ./lib/utils/check-covariance */ "./lib/utils/check-covariance.ts");
Object.defineProperty(exports, "checkCovariance", ({ enumerable: true, get: function () { return __importDefault(check_covariance_1).default; } }));
var correlation_to_covariance_1 = __webpack_require__(/*! ./lib/utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.ts");
Object.defineProperty(exports, "correlationToCovariance", ({ enumerable: true, get: function () { return __importDefault(correlation_to_covariance_1).default; } }));
var covariance_to_correlation_1 = __webpack_require__(/*! ./lib/utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.ts");
Object.defineProperty(exports, "covarianceToCorrelation", ({ enumerable: true, get: function () { return __importDefault(covariance_to_correlation_1).default; } }));
var project_observation_1 = __webpack_require__(/*! ./lib/utils/project-observation */ "./lib/utils/project-observation.ts");
Object.defineProperty(exports, "projectObservation", ({ enumerable: true, get: function () { return __importDefault(project_observation_1).default; } }));


/***/ },

/***/ "./lib/core-kalman-filter.ts"
/*!***********************************!*\
  !*** ./lib/core-kalman-filter.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const state_1 = __importDefault(__webpack_require__(/*! ./state */ "./lib/state.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
const defaultLogger = {
    info: (...args) => console.log(...args),
    debug() { },
    warn: (...args) => console.log(...args),
    error: (...args) => console.log(...args),
};
class CoreKalmanFilter {
    dynamic;
    observation;
    logger;
    constructor(options) {
        const { dynamic, observation, logger = defaultLogger } = options;
        this.dynamic = dynamic;
        this.observation = observation;
        this.logger = logger;
    }
    // | number[]
    getValue(fn, options) {
        return (typeof (fn) === 'function' ? fn(options) : fn);
    }
    getInitState() {
        const { mean: meanInit, covariance: covarianceInit, index: indexInit } = this.dynamic.init;
        const initState = new state_1.default({
            mean: meanInit,
            covariance: covarianceInit,
            index: indexInit,
        });
        state_1.default.check(initState, { title: 'dynamic.init' });
        return initState;
    }
    /**
    This will return the predicted covariance of a given previousCorrected State, this will help us to build the asymptoticState.
    * @param {State} previousCorrected
    * @returns{Array.<Array.<Number>>}
    */
    getPredictedCovariance(options = {}) {
        let { previousCorrected, index } = options;
        previousCorrected ||= this.getInitState();
        const getValueOptions = { previousCorrected, index, ...options };
        const transition = this.getValue(this.dynamic.transition, getValueOptions);
        (0, check_matrix_1.default)(transition, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition');
        const transitionTransposed = (0, simple_linalg_1.transpose)(transition);
        const covarianceInter = (0, simple_linalg_1.matMul)(transition, previousCorrected.covariance);
        const covariancePrevious = (0, simple_linalg_1.matMul)(covarianceInter, transitionTransposed);
        const dynCov = this.getValue(this.dynamic.covariance, getValueOptions);
        const covariance = (0, simple_linalg_1.add)(dynCov, covariancePrevious);
        (0, check_matrix_1.default)(covariance, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance');
        return covariance;
    }
    predictMean(o) {
        const mean = this.predictMeanWithoutControl(o);
        if (!this.dynamic.constant) {
            return mean;
        }
        const { opts } = o;
        const control = this.dynamic.constant(opts);
        (0, check_matrix_1.default)(control, [this.dynamic.dimension, 1], 'dynamic.constant');
        return (0, simple_linalg_1.add)(mean, control);
    }
    predictMeanWithoutControl(args) {
        const { opts, transition } = args;
        if (this.dynamic.fn) {
            return this.dynamic.fn(opts);
        }
        const { previousCorrected } = opts;
        return (0, simple_linalg_1.matMul)(transition, previousCorrected.mean);
    }
    /**
    This will return the new prediction, relatively to the dynamic model chosen
    * @param {State} previousCorrected State relative to our dynamic model
    * @returns{State} predicted State
    */
    predict(options = {}) {
        let { previousCorrected, index } = options;
        previousCorrected ||= this.getInitState();
        if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
            index = previousCorrected.index + 1;
        }
        state_1.default.check(previousCorrected, { dimension: this.dynamic.dimension });
        const getValueOptions = {
            ...options,
            previousCorrected,
            index,
        };
        const transition = this.getValue(this.dynamic.transition, getValueOptions);
        const mean = this.predictMean({ transition, opts: getValueOptions });
        const covariance = this.getPredictedCovariance(getValueOptions);
        const predicted = new state_1.default({ mean, covariance, index });
        this.logger.debug('Prediction done', predicted);
        if (Number.isNaN(predicted.mean[0][0])) {
            throw (new TypeError('nan'));
        }
        return predicted;
    }
    /**
     * This will return the new correction, taking into account the prediction made
     * and the observation of the sensor
     * param {State} predicted the previous State
     * @param options
     * @returns kalmanGain
     */
    getGain(options) {
        let { predicted, stateProjection } = options;
        const getValueOptions = {
            index: predicted.index,
            ...options,
        };
        TypeAssert_1.default.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.getGain');
        stateProjection ||= this.getValue(this.observation.stateProjection, getValueOptions);
        const obsCovariance = this.getValue(this.observation.covariance, getValueOptions);
        (0, check_matrix_1.default)(obsCovariance, [this.observation.dimension, this.observation.dimension], 'observation.covariance');
        const stateProjTransposed = (0, simple_linalg_1.transpose)(stateProjection);
        (0, check_matrix_1.default)(stateProjection, [this.observation.dimension, this.dynamic.dimension], 'observation.stateProjection');
        const noiselessInnovation = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(stateProjection, predicted.covariance), stateProjTransposed);
        const innovationCovariance = (0, simple_linalg_1.add)(noiselessInnovation, obsCovariance);
        const optimalKalmanGain = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(predicted.covariance, stateProjTransposed), (0, simple_linalg_1.invert)(innovationCovariance));
        return optimalKalmanGain;
    }
    /**
     * This will return the corrected covariance of a given predicted State, this will help us to build the asymptoticState.
     * @param {State} predicted the previous State
     * @returns{Array.<Array.<Number>>}
     */
    getCorrectedCovariance(options) {
        let { predicted, optimalKalmanGain, stateProjection } = options;
        const identity = (0, simple_linalg_1.identity)(predicted.covariance.length);
        if (!stateProjection) {
            TypeAssert_1.default.assertIsArray2D(this.observation.stateProjection, 'CoreKalmanFilter.getCorrectedCovariance');
            const getValueOptions = {
                index: predicted.index,
                ...options,
            };
            stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        }
        optimalKalmanGain ||= this.getGain({ stateProjection, ...options });
        return (0, simple_linalg_1.matMul)((0, simple_linalg_1.subtract)(identity, (0, simple_linalg_1.matMul)(optimalKalmanGain, stateProjection)), predicted.covariance);
    }
    getPredictedObservation(args) {
        const { opts, stateProjection } = args;
        if (this.observation.fn) {
            return this.observation.fn(opts);
        }
        const { predicted } = opts;
        return (0, simple_linalg_1.matMul)(stateProjection, predicted.mean);
    }
    /**
    This will return the new correction, taking into account the prediction made
    and the observation of the sensor
    * @param {State} predicted the previous State
    * @param {Array} observation the observation of the sensor
    * @returns{State} corrected State of the Kalman Filter
    */
    correct(options) {
        const { predicted, observation } = options;
        state_1.default.check(predicted, { dimension: this.dynamic.dimension });
        if (!observation) {
            throw (new Error('no measure available'));
        }
        const getValueOptions = {
            observation,
            predicted,
            index: predicted.index,
            ...options,
        };
        TypeAssert_1.default.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.correct');
        const stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
        const optimalKalmanGain = this.getGain({
            predicted,
            stateProjection,
            ...options,
        });
        const innovation = (0, simple_linalg_1.subtract)(observation, this.getPredictedObservation({ stateProjection, opts: getValueOptions }));
        const mean = (0, simple_linalg_1.add)(predicted.mean, (0, simple_linalg_1.matMul)(optimalKalmanGain, innovation));
        if (Number.isNaN(mean[0][0])) {
            console.log({ optimalKalmanGain, innovation, predicted });
            throw (new TypeError('Mean is NaN after correction'));
        }
        const covariance = this.getCorrectedCovariance({
            predicted,
            optimalKalmanGain,
            stateProjection,
            ...options,
        });
        const corrected = new state_1.default({ mean, covariance, index: predicted.index });
        this.logger.debug('Correction done', corrected);
        return corrected;
    }
}
exports["default"] = CoreKalmanFilter;


/***/ },

/***/ "./lib/dynamic/composition.ts"
/*!************************************!*\
  !*** ./lib/dynamic/composition.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const model_collection_1 = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.ts");
/**
* @typedef {Object.<DynamicName, DynamicConfig>} PerNameConfigs
*/
/**
* @typedef {Object} DynamicConfig
* @param {Array.<Number>} obsIndexes
* @param {Covariance} staticCovariance
*/
/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {Object} main
* @param {Object.<String, DynamicConfig>} main.perName
* @param {ObservationConfig} observation
* @param {Array.<Array.<Number>>} opts.observedProjection
* @returns {DynamicConfig}
*/
function composition({ perName }, observation) {
    const { observedProjection } = observation;
    const observedDynamDimension = observedProjection[0].length;
    const dynamicNames = Object.keys(perName);
    const confs = {};
    let nextDynamicDimension = observedDynamDimension;
    let nextObservedDimension = 0;
    dynamicNames.forEach(k => {
        const obsDynaIndexes = perName[k].obsDynaIndexes;
        if (typeof (perName[k].name) === 'string' && perName[k].name !== k) {
            throw (new Error(`${perName[k].name} and "${k}" should match`));
        }
        perName[k].name = k;
        const { dimension, transition, covariance, init } = (0, model_collection_1.buildDynamic)(perName[k], observation);
        const dynamicIndexes = [];
        for (let i = 0; i < dimension; i++) {
            const isObserved = (i < obsDynaIndexes.length);
            let newIndex;
            if (isObserved) {
                newIndex = nextObservedDimension;
                if (newIndex !== obsDynaIndexes[i]) {
                    throw (new Error('thsoe should match'));
                }
                nextObservedDimension++;
            }
            else {
                newIndex = nextDynamicDimension;
                nextDynamicDimension++;
            }
            dynamicIndexes.push(newIndex);
        }
        confs[k] = {
            dynamicIndexes,
            transition,
            dimension,
            covariance,
            init,
        };
    });
    const totalDimension = dynamicNames.map(k => confs[k].dimension).reduce((a, b) => a + b, 0);
    if (nextDynamicDimension !== totalDimension) {
        throw (new Error('miscalculation of transition'));
    }
    const init = {
        index: -1,
        mean: new Array(totalDimension),
        covariance: new Array(totalDimension).fill(0).map(() => new Array(totalDimension).fill(0)),
    };
    dynamicNames.forEach(k => {
        const { dynamicIndexes, init: localInit, } = confs[k];
        if (typeof (localInit) !== 'object') {
            throw new TypeError('Init is mandatory');
        }
        dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
            init.covariance[c1][c2] = localInit.covariance[i1][i2];
        }));
        dynamicIndexes.forEach((c1, i1) => {
            init.mean[c1] = localInit.mean[i1];
        });
    });
    return {
        dimension: totalDimension,
        init,
        transition(options) {
            const { previousCorrected } = options;
            const resultTransition = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
            dynamicNames.forEach(k => {
                const { dynamicIndexes, transition, } = confs[k];
                const options2 = {
                    ...options,
                    previousCorrected: previousCorrected.subState(dynamicIndexes),
                };
                const trans = transition(options2);
                dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
                    resultTransition[c1][c2] = trans[i1][i2];
                }));
            });
            return resultTransition;
        },
        covariance(options) {
            const { previousCorrected } = options;
            const resultCovariance = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
            dynamicNames.forEach(k => {
                const { dynamicIndexes, covariance, } = confs[k];
                const options2 = {
                    ...options,
                    previousCorrected: previousCorrected.subState(dynamicIndexes),
                };
                const cov = covariance(options2);
                // Console.log('dynamic.composition',k, cov, dynamicIndexes)
                dynamicIndexes.forEach((c1, i1) => dynamicIndexes.forEach((c2, i2) => {
                    resultCovariance[c1][c2] = cov[i1][i2];
                }));
            });
            return resultCovariance;
        },
    };
}
exports["default"] = composition;


/***/ },

/***/ "./lib/dynamic/constant-acceleration.ts"
/*!**********************************************!*\
  !*** ./lib/dynamic/constant-acceleration.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
/**
* Creates a dynamic model, following constant acceleration model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
function constantAcceleration(dynamic, observation) {
    const timeStep = dynamic.timeStep || 1;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    const observationDimension = observation.dimension;
    let dimension;
    if (stateProjection && Number.isInteger(stateProjection[0].length / 3)) {
        dimension = observation.stateProjection[0].length;
    }
    else if (observedProjection) {
        dimension = observedProjection[0].length * 3;
    }
    else if (observationDimension) {
        dimension = observationDimension * 3;
    }
    else {
        throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
    }
    const baseDimension = dimension / 3;
    // We construct the transition and covariance matrices
    const transition = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < baseDimension; i++) {
        transition[i][i + baseDimension] = timeStep;
        transition[i][i + (2 * baseDimension)] = 0.5 * (timeStep ** 2);
        transition[i + baseDimension][i + (2 * baseDimension)] = timeStep;
    }
    const arrayCovariance = new Array(baseDimension).fill(1)
        .concat(new Array(baseDimension).fill(timeStep * timeStep))
        .concat(new Array(baseDimension).fill(timeStep ** 4));
    const covariance = dynamic.covariance || arrayCovariance;
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantAcceleration;
// export default constantAcceleration;


/***/ },

/***/ "./lib/dynamic/constant-position-with-null.ts"
/*!****************************************************!*\
  !*** ./lib/dynamic/constant-position-with-null.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const huge = 1e6;
/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {Number} observationDimension
* @returns {DynamicConfig}
*/
function constantPositionWithNull({ staticCovariance, obsDynaIndexes, init }) {
    const dimension = obsDynaIndexes.length;
    init ||= {
        mean: new Array(obsDynaIndexes.length).fill(0).map(() => [0]),
        covariance: (0, simple_linalg_1.diag)(new Array(obsDynaIndexes.length).fill(huge)),
        index: -1,
    };
    if (staticCovariance && staticCovariance.length !== dimension) {
        throw (new Error('staticCovariance has wrong size'));
    }
    return {
        dimension,
        transition() {
            return (0, simple_linalg_1.identity)(dimension);
        },
        covariance({ previousCorrected, index }) {
            const diffBetweenIndexes = index - previousCorrected.index;
            if (staticCovariance) {
                return staticCovariance.map(row => row.map(element => element * diffBetweenIndexes));
            }
            return (0, simple_linalg_1.identity)(dimension);
        },
        init,
    };
}
exports["default"] = constantPositionWithNull;


/***/ },

/***/ "./lib/dynamic/constant-position.ts"
/*!******************************************!*\
  !*** ./lib/dynamic/constant-position.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
/**
* Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
function constantPosition(dynamic, observation) {
    let { dimension } = dynamic;
    const observationDimension = observation.dimension;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    let { covariance } = dynamic;
    if (!dynamic.dimension) {
        if (observationDimension) {
            dimension = observationDimension;
        }
        else if (observedProjection) {
            dimension = observedProjection[0].length;
        }
        else if (stateProjection) {
            dimension = stateProjection[0].length;
        }
    }
    const transition = (0, simple_linalg_1.identity)(dimension);
    covariance ||= (0, simple_linalg_1.identity)(dimension);
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantPosition;


/***/ },

/***/ "./lib/dynamic/constant-speed-dynamic.ts"
/*!***********************************************!*\
  !*** ./lib/dynamic/constant-speed-dynamic.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
function constantSpeedDynamic(args, observation) {
    const { staticCovariance, avSpeed, center } = args;
    const observationDimension = observation.observedProjection[0].length;
    const dimension = 2 * observationDimension;
    if ((center) === undefined) {
        throw (new TypeError('Center must be defined'));
    }
    if (center.length !== observationDimension) {
        throw (new TypeError(`Center size should be ${observationDimension}`));
    }
    if (avSpeed.length !== observationDimension) {
        throw (new TypeError(`avSpeed size should be ${observationDimension}`));
    }
    const initCov = (0, simple_linalg_1.diag)(center.map(c => c * c / 3).concat(avSpeed.map(c => c * c / 3)));
    const init = {
        mean: center.map(c => [c]).concat(center.map(() => [0])),
        covariance: initCov,
        index: -1,
    };
    const transition = (args) => {
        const { getTime, index, previousCorrected } = args;
        const dT = getTime(index) - getTime(previousCorrected.index);
        if (typeof (dT) !== 'number' || Number.isNaN(dT)) {
            throw (new TypeError(`dT (${dT}) should be a number`));
        }
        // Example is :
        // [
        // 	[1, 0, dT, 0],
        // 	[0, 1, 0, dT],
        // 	[0, 0, 1, 0],
        // 	[0, 0, 0, 1]
        // ];
        // constant speed usual matrix
        // create identity matrix
        const mat = (0, simple_linalg_1.diag)(center.map(() => 1).concat(center.map(() => 1)));
        // Then add dT
        for (let i = 0; i < observationDimension; i++) {
            mat[i][observationDimension + i] = dT;
        }
        if (Number.isNaN(mat[0][2])) {
            throw (new TypeError('nan mat'));
        }
        return mat;
    };
    const covariance = (args) => {
        const { index, previousCorrected, getTime } = args;
        const dT = getTime(index) - getTime(previousCorrected.index);
        if (typeof (dT) !== 'number') {
            throw (new TypeError(`dT (${dT}) should be a number`));
        }
        // State is (x, y, vx, vy)
        const sqrt = Math.sqrt(dT);
        if (Number.isNaN(sqrt)) {
            console.log({ lastPreviousIndex: previousCorrected.index, index });
            console.log(dT, previousCorrected.index, index, getTime(index), getTime(previousCorrected.index));
            throw (new Error('Sqrt(dT) is NaN'));
        }
        return (0, simple_linalg_1.diag)(staticCovariance.map(v => v * sqrt));
    };
    return {
        init,
        dimension,
        transition,
        covariance,
    };
}
exports["default"] = constantSpeedDynamic;
// module.exports = constantSpeedDynamic;


/***/ },

/***/ "./lib/dynamic/constant-speed.ts"
/*!***************************************!*\
  !*** ./lib/dynamic/constant-speed.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
function constantSpeed(dynamic, observation) {
    const timeStep = dynamic.timeStep || 1;
    const { observedProjection } = observation;
    const { stateProjection } = observation;
    const observationDimension = observation.dimension;
    let dimension;
    if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
        dimension = observation.stateProjection[0].length;
    }
    else if (observedProjection) {
        dimension = observedProjection[0].length * 2;
    }
    else if (observationDimension) {
        dimension = observationDimension * 2;
    }
    else {
        throw (new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter'));
    }
    const baseDimension = dimension / 2;
    // We construct the transition and covariance matrices
    const transition = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < baseDimension; i++) {
        transition[i][i + baseDimension] = timeStep;
    }
    const arrayCovariance = new Array(baseDimension).fill(1).concat(new Array(baseDimension).fill(timeStep * timeStep));
    const covariance = dynamic.covariance || arrayCovariance;
    return {
        ...dynamic, dimension, transition, covariance,
    };
}
exports["default"] = constantSpeed;


/***/ },

/***/ "./lib/dynamic/index.ts"
/*!******************************!*\
  !*** ./lib/dynamic/index.ts ***!
  \******************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shorttermConstantSpeed = exports.constantSpeedDynamic = exports.constantPositionWithNull = exports.composition = exports.constantAcceleration = exports.constantSpeed = exports.constantPosition = void 0;
var constant_position_1 = __webpack_require__(/*! ./constant-position */ "./lib/dynamic/constant-position.ts");
Object.defineProperty(exports, "constantPosition", ({ enumerable: true, get: function () { return __importDefault(constant_position_1).default; } }));
var constant_speed_1 = __webpack_require__(/*! ./constant-speed */ "./lib/dynamic/constant-speed.ts");
Object.defineProperty(exports, "constantSpeed", ({ enumerable: true, get: function () { return __importDefault(constant_speed_1).default; } }));
var constant_acceleration_1 = __webpack_require__(/*! ./constant-acceleration */ "./lib/dynamic/constant-acceleration.ts");
Object.defineProperty(exports, "constantAcceleration", ({ enumerable: true, get: function () { return __importDefault(constant_acceleration_1).default; } }));
var composition_1 = __webpack_require__(/*! ./composition */ "./lib/dynamic/composition.ts");
Object.defineProperty(exports, "composition", ({ enumerable: true, get: function () { return __importDefault(composition_1).default; } }));
var constant_position_with_null_1 = __webpack_require__(/*! ./constant-position-with-null */ "./lib/dynamic/constant-position-with-null.ts");
Object.defineProperty(exports, "constantPositionWithNull", ({ enumerable: true, get: function () { return __importDefault(constant_position_with_null_1).default; } }));
var constant_speed_dynamic_1 = __webpack_require__(/*! ./constant-speed-dynamic */ "./lib/dynamic/constant-speed-dynamic.ts");
Object.defineProperty(exports, "constantSpeedDynamic", ({ enumerable: true, get: function () { return __importDefault(constant_speed_dynamic_1).default; } }));
var shortterm_constant_speed_1 = __webpack_require__(/*! ./shortterm-constant-speed */ "./lib/dynamic/shortterm-constant-speed.ts");
Object.defineProperty(exports, "shorttermConstantSpeed", ({ enumerable: true, get: function () { return __importDefault(shortterm_constant_speed_1).default; } }));
// module.exports = {
// 	'constant-position': require('./constant-position.js'),
// 	'constant-speed': require('./constant-speed.js'),
// 	'constant-acceleration': require('./constant-acceleration.js'),
// 	composition: require('./composition.js'),
// 	'constant-position-with-null': require('./constant-position-with-null.js'),
// 	'constant-speed-with-null': require('./constant-speed-with-null.js'),
// 	'constant-speed-dynamic': require('./constant-speed-dynamic.js'),
// 	'shortterm-constant-speed': require('./shortterm-constant-speed.js'),
// };
//


/***/ },

/***/ "./lib/dynamic/shortterm-constant-speed.ts"
/*!*************************************************!*\
  !*** ./lib/dynamic/shortterm-constant-speed.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const constant_speed_dynamic_1 = __importDefault(__webpack_require__(/*! ./constant-speed-dynamic */ "./lib/dynamic/constant-speed-dynamic.ts"));
const safeDiv = function (a, b) {
    if (a === 0) {
        return 0;
    }
    if (b === 0) {
        return 1;
    }
    return a / b;
};
/**
* This model is based on the constant speed model
* The constant speed model creates problems when dT >> fps (the track is lost)
* then the expected position can be very far from the center of the field
* to solve that, we use a model with 2 more hidden variable that are always center of the field
* When dT << typicalTime the model acts exactly as a constant speed model
* When dT >> typicalTime the model is a constant [x,y] = center model, sigma = defaultVariance
* @param {Object} options
* @param {ObservationConfig} observation
* @param {Number} [options.typicalTime=10]
* @returns {DynamicConfig}
*/
// {typicalTimes: any, staticCovariance: any, avSpeed, center: any: any}
function shorttermConstantSpeed(options, observation) {
    const { typicalTimes } = options;
    if (!Array.isArray(typicalTimes)) {
        throw (new TypeError('typicalTimes must be defined'));
    }
    const constantSpeed = (0, constant_speed_dynamic_1.default)(options, observation);
    const { dimension, init } = constantSpeed;
    if (typicalTimes.length !== dimension) {
        throw (new TypeError(`typicalTimes (${typicalTimes.length}) length is not as expected (${dimension})`));
    }
    const mixMatrix = function ({ ratios, aMat, bMat, }) {
        return (0, simple_linalg_1.elemWise)([aMat, bMat], ([m, d], rowIndex, colIndex) => {
            const ratio = rowIndex === colIndex ? ratios[rowIndex] : (ratios[rowIndex] + ratios[colIndex]) / 2;
            return (ratio * m) + ((1 - ratio) * d);
        });
    };
    return {
        dimension,
        init,
        transition(options) {
            const aMat = constantSpeed.transition(options);
            const { getTime, index, previousCorrected } = options;
            const dT = getTime(index) - getTime(previousCorrected.index);
            const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
            // 'back to init' matrix
            const bMat = (0, simple_linalg_1.diag)((0, simple_linalg_1.elemWise)([init.mean, previousCorrected.mean], ([m, d]) => safeDiv(m, d))
                // Flatten cause this is a Nx1 matrix -> N array
                .reduce((a, b) => a.concat(b)));
            return mixMatrix({ ratios, aMat, bMat });
        },
        covariance(options, observation) {
            const { getTime, index, previousCorrected } = options;
            const dT = getTime(index) - getTime(previousCorrected.index);
            // State is (x, y, vx, vy)
            const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
            const aMat = constantSpeed.covariance(options /*, observation*/);
            return mixMatrix({ ratios, aMat, bMat: init.covariance });
        },
    };
}
exports["default"] = shorttermConstantSpeed;


/***/ },

/***/ "./lib/kalman-filter.ts"
/*!******************************!*\
  !*** ./lib/kalman-filter.ts ***!
  \******************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/array-to-matrix */ "./lib/utils/array-to-matrix.ts"));
const set_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/set-dimensions */ "./lib/setup/set-dimensions.ts"));
const check_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/check-dimensions */ "./lib/setup/check-dimensions.ts"));
const build_state_projection_1 = __importDefault(__webpack_require__(/*! ../lib/setup/build-state-projection */ "./lib/setup/build-state-projection.ts"));
const extend_dynamic_init_1 = __importDefault(__webpack_require__(/*! ../lib/setup/extend-dynamic-init */ "./lib/setup/extend-dynamic-init.ts"));
const to_function_1 = __importDefault(__webpack_require__(/*! ../lib/utils/to-function */ "./lib/utils/to-function.ts"));
const deep_assign_1 = __importDefault(__webpack_require__(/*! ../lib/utils/deep-assign */ "./lib/utils/deep-assign.ts"));
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
const state_1 = __importDefault(__webpack_require__(/*! ./state */ "./lib/state.ts"));
const modelCollection = __importStar(__webpack_require__(/*! ./model-collection */ "./lib/model-collection.ts"));
const core_kalman_filter_1 = __importDefault(__webpack_require__(/*! ./core-kalman-filter */ "./lib/core-kalman-filter.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
/**
 * @typedef {String} DynamicNonObjectConfig
 */
/**
 * @typedef {DynamicConfig} DynamicObjectConfig
 * @property {String} name
 */
/**
 * @param {DynamicNonObjectConfig} dynamic
 * @returns {DynamicObjectConfig}
 */
const buildDefaultDynamic = function (dynamic) {
    if (typeof (dynamic) === 'string') {
        return { name: dynamic };
    }
    return { name: 'constant-position' };
};
/**
 * @typedef {String | Number} ObservationNonObjectConfig
 */
/**
 * @typedef {ObservationConfig} ObservationObjectConfig
 * @property {String} name
 */
/**
 * @param {ObservationNonObjectConfig} observation
 * @returns {ObservationObjectConfig}
 */
const buildDefaultObservation = function (observation) {
    if (typeof (observation) === 'number') {
        return { name: 'sensor', sensorDimension: observation };
    }
    if (typeof (observation) === 'string') {
        return { name: observation };
    }
    return { name: 'sensor' };
};
/**
*This function fills the given options by successively checking if it uses a registered model,
* it builds and checks the dynamic and observation dimensions, build the stateProjection if only observedProjection
*is given, and initialize dynamic.init
*@param {DynamicObjectConfig | DynamicNonObjectConfig} options.dynamic
*@param {ObservationObjectConfig | ObservationNonObjectConfig} options.observation
* @returns {CoreConfig}
*/
const setupModelsParameters = function (args) {
    let { observation, dynamic } = args;
    if (typeof (observation) !== 'object' || observation === null) {
        observation = buildDefaultObservation(observation);
    }
    if (typeof (dynamic) !== 'object' || dynamic === null) {
        dynamic = buildDefaultDynamic(dynamic /*, observation*/);
    }
    if (typeof (observation.name) === 'string') {
        observation = modelCollection.buildObservation(observation);
    }
    if (typeof (dynamic.name) === 'string') {
        dynamic = modelCollection.buildDynamic(dynamic, observation);
    }
    const withDimensionOptions = (0, set_dimensions_1.default)({ observation, dynamic });
    const checkedDimensionOptions = (0, check_dimensions_1.default)(withDimensionOptions);
    const buildStateProjectionOptions = (0, build_state_projection_1.default)(checkedDimensionOptions);
    return (0, extend_dynamic_init_1.default)(buildStateProjectionOptions);
};
/**
* Returns the corresponding model without arrays as values but only functions
* @param {ModelsParameters} modelToBeChanged
* @returns {CoreConfig} model with respect of the Core Kalman Filter properties
*/
const modelsParametersToCoreOptions = function (modelToBeChanged) {
    const { observation, dynamic } = modelToBeChanged;
    TypeAssert_1.default.assertNotArray(observation, 'modelsParametersToCoreOptions: observation');
    // TypeAssert.assertIsArray2D(observation.stateProjection, 'modelsParametersToCoreOptions: observation.stateProjection');
    // TypeAssert.assertIsArray2D(observation.covariance, 'modelsParametersToCoreOptions: observation.covariance');
    // TypeAssert.assertIsArray2D(dynamic.transition, 'modelsParametersToCoreOptions: dynamic.transition');
    // TypeAssert.assertIsNumbersArray(dynamic.covariance, 'modelsParametersToCoreOptions: dynamic.covariance');
    return (0, deep_assign_1.default)(modelToBeChanged, {
        observation: {
            stateProjection: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.stateProjection), { label: 'observation.stateProjection' }),
            covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.covariance, { dimension: observation.dimension }), { label: 'observation.covariance' }),
        },
        dynamic: {
            transition: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.transition), { label: 'dynamic.transition' }),
            covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.covariance, { dimension: dynamic.dimension }), { label: 'dynamic.covariance' }),
        },
    });
};
class KalmanFilter extends core_kalman_filter_1.default {
    /**
    * @typedef {Object} Config
    * @property {DynamicObjectConfig | DynamicNonObjectConfig} dynamic
    * @property {ObservationObjectConfig | ObservationNonObjectConfig} observation
    */
    /**
    * @param {Config} options
    */
    // constructor(options: {observation?: ObservationConfig, dynamic?: DynamicConfig, logger?: WinstonLogger} = {}) {
    constructor(options = {}) {
        const modelsParameters = setupModelsParameters(options);
        const coreOptions = modelsParametersToCoreOptions(modelsParameters);
        super({ ...options, ...coreOptions });
    }
    // previousCorrected?: State, index?: number,
    correct(options) {
        const coreObservation = (0, array_to_matrix_1.default)({ observation: options.observation, dimension: this.observation.dimension });
        return super.correct({
            ...options,
            observation: coreObservation,
        });
    }
    /**
    * Performs the prediction and the correction steps
    * @param {State} previousCorrected
    * @param {<Array.<Number>>} observation
    * @returns {Array.<Number>} the mean of the corrections
    */
    filter(options) {
        const predicted = super.predict(options);
        return this.correct({
            ...options,
            predicted,
        });
    }
    /**
     * Filters all the observations
     * @param {Array.<Array.<Number>>} observations
     * @returns {Array.<Array.<Number>>} the mean of the corrections
     */
    filterAll(observations) {
        let previousCorrected = this.getInitState();
        const results = [];
        for (const observation of observations) {
            const predicted = this.predict({ previousCorrected });
            previousCorrected = this.correct({
                predicted,
                observation,
            });
            results.push(previousCorrected.mean.map(m => m[0]));
        }
        return results;
    }
    /**
    * Returns an estimation of the asymptotic state covariance as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
    * in practice this can be used as a init.covariance value but is very costful calculation (that's why this is not made by default)
    * @param {Number} [limitIterations=1e2] max number of iterations
    * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
    * @return {Array.<Array.<Number>>} covariance
    */
    asymptoticStateCovariance({ limitIterations = 1e2, tolerance = 1e-6 } = {}) {
        let previousCorrected = super.getInitState();
        const results = [];
        for (let i = 0; i < limitIterations; i++) {
            // We create a fake mean that will not be used in order to keep coherence
            const predicted = new state_1.default({
                mean: [],
                covariance: super.getPredictedCovariance({ previousCorrected }),
            });
            previousCorrected = new state_1.default({
                mean: [],
                covariance: super.getCorrectedCovariance({ predicted }),
            });
            results.push(previousCorrected.covariance);
            if ((0, simple_linalg_1.frobenius)(previousCorrected.covariance, results[i - 1]) < tolerance) {
                return results[i];
            }
        }
        throw (new Error('The state covariance does not converge asymptotically'));
    }
    /**
    * Returns an estimation of the asymptotic gain, as explained in https://en.wikipedia.org/wiki/Kalman_filter#Asymptotic_form
    * @param {Number} [tolerance=1e-6] returns when the last values differences are less than tolerance
    * @return {Array.<Array.<Number>>} gain
    */
    asymptoticGain({ tolerance = 1e-6 } = {}) {
        const covariance = this.asymptoticStateCovariance({ tolerance });
        const asymptoticState = new state_1.default({
            // We create a fake mean that will not be used in order to keep coherence
            mean: Array.from({ length: covariance.length }).fill(0).map(() => [0]),
            covariance,
        });
        return super.getGain({ predicted: asymptoticState });
    }
}
exports["default"] = KalmanFilter;


/***/ },

/***/ "./lib/model-collection.ts"
/*!*********************************!*\
  !*** ./lib/model-collection.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildDynamic = exports.buildObservation = exports.registerDynamic = exports.registerObservation = void 0;
const registeredObservationModels = {};
// const registeredDynamicModels: Record<(dynamic, observation) => dynamic, {dimension, transition, covariance}> = {};
const registeredDynamicModels = {};
/**
 * Enables to register observation model and store it
 * @param {String} name
 * @callback fn the function corresponding to the desired model
 */
function registerObservation(name, fn) {
    registeredObservationModels[name] = fn;
}
exports.registerObservation = registerObservation;
/**
 * Enables to register dynamic model and store it
 * @param {String} name
 * @callback fn the function corresponding to the desired model
 */
function registerDynamic(name, fn) {
    registeredDynamicModels[name] = fn;
}
exports.registerDynamic = registerDynamic;
/**
 * Build a model given an observation configuration
 * @param {ObservationConfig} observation
 * @returns {ObservationConfig} the configuration with respect to the model
 */
function buildObservation(observation) {
    if (typeof (registeredObservationModels[observation.name]) !== 'function') {
        throw (new TypeError(`The provided observation model name (${observation.name}) is not registered`));
    }
    return registeredObservationModels[observation.name](observation);
}
exports.buildObservation = buildObservation;
/**
 * Build a model given dynamic and observation configurations
 * @param {DynamicConfig} dynamic
 * @param {ObservationConfig} observation
 * @returns {DynamicConfig} the dynamic configuration with respect to the model
 */
function buildDynamic(dynamic, observation) {
    if (typeof (registeredDynamicModels[dynamic.name]) !== 'function') {
        throw (new TypeError(`The provided dynamic model (${dynamic.name}) name is not registered`));
    }
    return registeredDynamicModels[dynamic.name](dynamic, observation);
}
exports.buildDynamic = buildDynamic;


/***/ },

/***/ "./lib/observation/index.ts"
/*!**********************************!*\
  !*** ./lib/observation/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sensorProjected = exports.sensorLocalVariance = exports.sensor = void 0;
var sensor_1 = __webpack_require__(/*! ./sensor */ "./lib/observation/sensor.ts");
Object.defineProperty(exports, "sensor", ({ enumerable: true, get: function () { return __importDefault(sensor_1).default; } }));
var sensor_local_variance_1 = __webpack_require__(/*! ./sensor-local-variance */ "./lib/observation/sensor-local-variance.ts");
Object.defineProperty(exports, "sensorLocalVariance", ({ enumerable: true, get: function () { return __importDefault(sensor_local_variance_1).default; } }));
var sensor_projected_1 = __webpack_require__(/*! ./sensor-projected */ "./lib/observation/sensor-projected.ts");
Object.defineProperty(exports, "sensorProjected", ({ enumerable: true, get: function () { return __importDefault(sensor_projected_1).default; } }));


/***/ },

/***/ "./lib/observation/sensor-local-variance.ts"
/*!**************************************************!*\
  !*** ./lib/observation/sensor-local-variance.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const model_collection_1 = __webpack_require__(/*! ../model-collection */ "./lib/model-collection.ts");
/**
* @param {Object} options
* @param {Number} options.sensorDimension
* @param {CovarianceParam} options.sensorCovariance
* @param {Number} options.nSensors
* @returns {ObservationConfig}
*/
function nullableSensor(options) {
    const { dimension, observedProjection, covariance: baseCovariance } = (0, model_collection_1.buildObservation)({ ...options, name: 'sensor' });
    return {
        dimension,
        observedProjection,
        covariance(o) {
            const covariance = (0, simple_linalg_1.identity)(dimension);
            const { variance } = o;
            variance.forEach((v, i) => {
                covariance[i][i] = v * baseCovariance[i][i];
            });
            return covariance;
        },
    };
}
exports["default"] = nullableSensor;


/***/ },

/***/ "./lib/observation/sensor-projected.ts"
/*!*********************************************!*\
  !*** ./lib/observation/sensor-projected.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const correlation_to_covariance_1 = __importDefault(__webpack_require__(/*! ../utils/correlation-to-covariance */ "./lib/utils/correlation-to-covariance.ts"));
const covariance_to_correlation_1 = __importDefault(__webpack_require__(/*! ../utils/covariance-to-correlation */ "./lib/utils/covariance-to-correlation.ts"));
/**
*Creates an observation model with a observedProjection corresponding to
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
function sensorProjected({ selectedCovariance, totalDimension, obsIndexes, selectedStateProjection }) {
    if (!selectedStateProjection) {
        selectedStateProjection = new Array(obsIndexes.length).fill(0).map(() => new Array(obsIndexes.length).fill(0));
        obsIndexes.forEach((index1, i1) => {
            selectedStateProjection[i1][i1] = 1;
        });
    }
    else if (selectedStateProjection.length !== obsIndexes.length) {
        throw (new Error(`[Sensor-projected] Shape mismatch between ${selectedStateProjection.length} and ${obsIndexes.length}`));
    }
    const baseCovariance = (0, simple_linalg_1.identity)(totalDimension);
    obsIndexes.forEach((index1, i1) => {
        if (selectedCovariance) {
            obsIndexes.forEach((index2, i2) => {
                baseCovariance[index1][index2] = selectedCovariance[i1][i2];
            });
        }
    });
    const { correlation: baseCorrelation, variance: baseVariance } = (0, covariance_to_correlation_1.default)(baseCovariance);
    const dynaDimension = selectedStateProjection[0].length;
    if (selectedStateProjection.length !== obsIndexes.length) {
        throw (new Error(`shape mismatch (${selectedStateProjection.length} vs ${obsIndexes.length})`));
    }
    const observedProjection = (0, simple_linalg_1.matPermutation)({
        outputSize: [totalDimension, dynaDimension],
        colIndexes: selectedStateProjection[0].map((_, i) => i),
        rowIndexes: obsIndexes,
        matrix: selectedStateProjection,
    });
    return {
        dimension: totalDimension,
        observedProjection,
        covariance(o) {
            const { variance } = o;
            if (!variance) {
                return baseCovariance;
            }
            if (variance.length !== baseCovariance.length) {
                throw (new Error('variance is difference size from baseCovariance'));
            }
            const result = (0, correlation_to_covariance_1.default)({ correlation: baseCorrelation, variance: baseVariance.map((b, i) => variance[i] * b) });
            return result;
        },
    };
}
exports["default"] = sensorProjected;


/***/ },

/***/ "./lib/observation/sensor.ts"
/*!***********************************!*\
  !*** ./lib/observation/sensor.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/
const copy = (mat) => mat.map(a => a.concat());
function sensor(options) {
    const { sensorDimension = 1, sensorCovariance = 1, nSensors = 1 } = options;
    const sensorCovarianceFormatted = (0, polymorph_matrix_1.default)(sensorCovariance, { dimension: sensorDimension });
    if (TypeAssert_1.default.isFunction(sensorCovarianceFormatted)) {
        throw new TypeError('sensorCovarianceFormatted can not be a function here');
    }
    (0, check_matrix_1.default)(sensorCovarianceFormatted, [sensorDimension, sensorDimension], 'observation.sensorCovariance');
    const oneSensorObservedProjection = (0, simple_linalg_1.identity)(sensorDimension);
    let concatenatedObservedProjection = [];
    const dimension = sensorDimension * nSensors;
    const concatenatedCovariance = (0, simple_linalg_1.identity)(dimension);
    for (let i = 0; i < nSensors; i++) {
        concatenatedObservedProjection = concatenatedObservedProjection.concat(copy(oneSensorObservedProjection));
        for (const [rIndex, r] of sensorCovarianceFormatted.entries()) {
            for (const [cIndex, c] of r.entries()) {
                concatenatedCovariance[rIndex + (i * sensorDimension)][cIndex + (i * sensorDimension)] = c;
            }
        }
    }
    return {
        ...options,
        dimension,
        observedProjection: concatenatedObservedProjection,
        covariance: concatenatedCovariance,
    };
}
exports["default"] = sensor;


/***/ },

/***/ "./lib/setup/build-state-projection.ts"
/*!*********************************************!*\
  !*** ./lib/setup/build-state-projection.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const simple_linalg_2 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
/**
* Builds the stateProjection given an observedProjection
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
* @returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/
function buildStateProjection(args) {
    const { observation, dynamic } = args;
    const { observedProjection, stateProjection } = observation;
    const observationDimension = observation.dimension;
    const dynamicDimension = dynamic.dimension;
    if (observedProjection && stateProjection) {
        throw (new TypeError('You cannot use both observedProjection and stateProjection'));
    }
    if (observedProjection) {
        const stateProjection = (0, simple_linalg_1.padWithZeroCols)(observedProjection, { columns: dynamicDimension });
        return {
            observation: {
                ...observation,
                stateProjection,
            },
            dynamic,
        };
    }
    if (observationDimension && dynamicDimension && !stateProjection) {
        const observationMatrix = (0, simple_linalg_2.identity)(observationDimension);
        return {
            observation: {
                ...observation,
                stateProjection: (0, simple_linalg_1.padWithZeroCols)(observationMatrix, { columns: dynamicDimension }),
            },
            dynamic,
        };
    }
    return { observation, dynamic };
}
exports["default"] = buildStateProjection;


/***/ },

/***/ "./lib/setup/check-dimensions.ts"
/*!***************************************!*\
  !*** ./lib/setup/check-dimensions.ts ***!
  \***************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
* Verifies that dynamic.dimension and observation.dimension are set
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
*/
function checkDimensions(args) {
    const { observation, dynamic } = args;
    const dynamicDimension = dynamic.dimension;
    const observationDimension = observation.dimension;
    if (!dynamicDimension || !observationDimension) {
        throw (new TypeError('Dimension is not set'));
    }
    return { observation, dynamic };
}
exports["default"] = checkDimensions;


/***/ },

/***/ "./lib/setup/extend-dynamic-init.ts"
/*!******************************************!*\
  !*** ./lib/setup/extend-dynamic-init.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ "./lib/utils/polymorph-matrix.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
/**
 * Initializes the dynamic.init when not given
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfigParcial} dynamic
 * @returns {CoreConfig}
 */
function extendDynamicInit(args) {
    const { observation, dynamic } = args;
    if (!dynamic.init) {
        const huge = 1e6;
        const dynamicDimension = dynamic.dimension;
        const meanArray = new Array(dynamicDimension).fill(0);
        const covarianceArray = new Array(dynamicDimension).fill(huge);
        const withInitOptions = {
            observation,
            dynamic: {
                ...dynamic,
                init: {
                    mean: meanArray.map(element => [element]),
                    covariance: (0, simple_linalg_1.diag)(covarianceArray),
                    index: -1,
                },
            },
        };
        return withInitOptions;
    }
    if (dynamic.init && !dynamic.init.mean) {
        throw (new Error('dynamic.init should have a mean key'));
    }
    const covariance = (0, polymorph_matrix_1.default)(dynamic.init.covariance, { dimension: dynamic.dimension });
    if (TypeAssert_1.default.isFunction(covariance)) {
        throw new TypeError('covariance can not be a function');
    }
    dynamic.init = {
        ...dynamic.init,
        covariance,
    };
    return { observation, dynamic: dynamic };
}
exports["default"] = extendDynamicInit;


/***/ },

/***/ "./lib/setup/set-dimensions.ts"
/*!*************************************!*\
  !*** ./lib/setup/set-dimensions.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Verifies that dimensions are matching and set dynamic.dimension and observation.dimension
 * with respect of stateProjection and transition dimensions
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfig} dynamic
 * @returns {ObservationConfig, DynamicConfig}
 */
function setDimensions(args) {
    const { observation, dynamic } = args;
    const { stateProjection } = observation;
    const { transition } = dynamic;
    const dynamicDimension = dynamic.dimension;
    const observationDimension = observation.dimension;
    if (dynamicDimension && observationDimension && Array.isArray(stateProjection) && (dynamicDimension !== stateProjection[0].length || observationDimension !== stateProjection.length)) {
        throw (new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions'));
    }
    if (dynamicDimension && Array.isArray(transition) && dynamicDimension !== transition.length) {
        throw (new TypeError('transition dimension not matching with dynamic dimension'));
    }
    if (Array.isArray(stateProjection)) {
        return {
            observation: {
                ...observation,
                dimension: stateProjection.length,
            },
            dynamic: {
                ...dynamic,
                dimension: stateProjection[0].length,
            },
        };
    }
    if (Array.isArray(transition)) {
        return {
            observation,
            dynamic: {
                ...dynamic,
                dimension: transition.length,
            },
        };
    }
    return { observation, dynamic: dynamic };
}
exports["default"] = setDimensions;


/***/ },

/***/ "./lib/state.ts"
/*!**********************!*\
  !*** ./lib/state.ts ***!
  \**********************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/array-to-matrix */ "./lib/utils/array-to-matrix.ts"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ "./lib/utils/check-matrix.ts"));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./utils/check-covariance */ "./lib/utils/check-covariance.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ "./lib/types/TypeAssert.ts"));
/**
 * Class representing a multi dimensionnal gaussian, with his mean and his covariance
 * @property {Number} [index=0] the index of the State in the process, this is not mandatory for simple Kalman Filter, but is needed for most of the use case of extended kalman filter
 * @property {Array.<Array.<Number>>} covariance square matrix of size dimension
 * @property {Array.<Array<Number>>} mean column matrix of size dimension x 1
 */
class State {
    mean;
    covariance;
    index;
    constructor(args) {
        this.mean = args.mean;
        this.covariance = args.covariance;
        this.index = args.index || undefined;
    }
    /**
    * Check the consistency of the State
    * @param {Object} options
    * @see check
    */
    check(options) {
        State.check(this, options);
    }
    /**
    * Check the consistency of the State's attributes
    * @param {State} state
    * @param {Object} [options={}]
    * @param {Array} [options.dimension=null] if defined check the dimension of the state
    * @param {String} [options.title=null] used to log error mor explicitly
    * @param {Boolean} options.eigen
    * @returns {Null}
    */
    static check(state, args = {}) {
        const { dimension, title, eigen } = args;
        if (!(state instanceof State)) {
            throw (new TypeError('The argument is not a state \n'
                + 'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree'));
        }
        const { mean, covariance } = state; // Index
        const meanDimension = mean.length;
        if (typeof (dimension) === 'number' && meanDimension !== dimension) {
            throw (new Error(`[${title}] State.mean ${mean} with dimension ${meanDimension} does not match expected dimension (${dimension})`));
        }
        (0, check_matrix_1.default)(mean, [meanDimension, 1], title ? title + '.mean' : 'mean');
        (0, check_matrix_1.default)(covariance, [meanDimension, meanDimension], title ? title + '.covariance' : 'covariance');
        (0, check_covariance_1.default)({ covariance, eigen }, title ? title + '.covariance' : 'covariance');
        // If (typeof (index) !== 'number') {
        // 	throw (new TypeError('t must be a number'));
        // }
    }
    /**
    * Multiply state with matrix
    * @param {State} state
    * @param {Array.<Array.<Number>>} matrix
    * @returns {State}
    */
    static matMul(args) {
        const { state, matrix } = args;
        const covariance = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(matrix, state.covariance), (0, simple_linalg_1.transpose)(matrix));
        const mean = (0, simple_linalg_1.matMul)(matrix, state.mean);
        return new State({
            mean,
            covariance,
            index: state.index,
        });
    }
    /**
    * From a state in n-dimension create a state in a subspace
    * If you see the state as a N-dimension gaussian,
    * this can be viewed as the sub M-dimension gaussian (M < N)
    * @param {Array.<Number>} obsIndexes list of dimension to extract,  (M < N <=> obsIndexes.length < this.mean.length)
    * @returns {State} subState in subspace, with subState.mean.length === obsIndexes.length
    */
    subState(obsIndexes) {
        const state = new State({
            mean: obsIndexes.map(i => this.mean[i]),
            covariance: (0, simple_linalg_1.subSquareMatrix)(this.covariance, obsIndexes),
            index: this.index,
        });
        return state;
    }
    /**
    * @typedef {Object} DetailedMahalanobis
    * @property {Array.<[Number]>} diff
    * @property {Array.<Array.<Number>>} covarianceInvert
    * @property {Number} value
    */
    /**
    * Simple Malahanobis distance between the distribution (this) and a point
    * @param {Array.<[Number]>} point a Nx1 matrix representing a point
    * @returns {DetailedMahalanobis}
    */
    rawDetailedMahalanobis(point) {
        const diff = (0, simple_linalg_1.subtract)(this.mean, point);
        this.check();
        const covarianceInvert = (0, simple_linalg_1.invert)(this.covariance);
        if (covarianceInvert === null) {
            this.check({ eigen: true });
            throw (new Error(`Cannot invert covariance ${JSON.stringify(this.covariance)}`));
        }
        const diffTransposed = (0, simple_linalg_1.transpose)(diff);
        // Console.log('covariance in obs space', covarianceInObservationSpace);
        const valueMatrix = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(diffTransposed, covarianceInvert), diff);
        // Calculate the Mahalanobis distance value
        const value = Math.sqrt(valueMatrix[0][0]);
        if (Number.isNaN(value)) {
            const debugValue = (0, simple_linalg_1.matMul)((0, simple_linalg_1.matMul)(diffTransposed, covarianceInvert), diff);
            console.log({
                diff, covarianceInvert, this: this, point,
            }, debugValue);
            throw (new Error('mahalanobis is NaN'));
        }
        return {
            diff,
            covarianceInvert,
            value,
        };
    }
    /**
    * Malahanobis distance is made against an observation, so the mean and covariance
    * are projected into the observation space
    * @param {KalmanFilter} kf kalman filter use to project the state in observation's space
    * @param {Observation} observation
    * @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the mahalanobis distance
    * @returns {DetailedMahalanobis}
    */
    detailedMahalanobis(args) {
        const { kf, observation, obsIndexes } = args;
        if (observation.length !== kf.observation.dimension) {
            throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
        }
        let correctlySizedObservation = (0, array_to_matrix_1.default)({ observation, dimension: observation.length });
        TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.detailedMahalanobis');
        const stateProjection = kf.getValue(kf.observation.stateProjection, {});
        let projectedState = State.matMul({ state: this, matrix: stateProjection });
        if (Array.isArray(obsIndexes)) {
            projectedState = projectedState.subState(obsIndexes);
            correctlySizedObservation = obsIndexes.map(i => correctlySizedObservation[i]);
        }
        return projectedState.rawDetailedMahalanobis(correctlySizedObservation);
    }
    /**
    * @param {Object} options @see detailedMahalanobis
    * @returns {Number}
    */
    mahalanobis(options) {
        const result = this.detailedMahalanobis(options).value;
        if (Number.isNaN(result)) {
            throw (new TypeError('mahalanobis is NaN'));
        }
        return result;
    }
    /**
    * Bhattacharyya distance is made against in the observation space
    * to do it in the normal space see state.bhattacharyya
    * @param {KalmanFilter} kf kalman filter use to project the state in observation's space
    * @param {State} state
    * @param {Array.<Number>} obsIndexes list of indexes of observation state to use for the bhattacharyya distance
    * @returns {Number}
    */
    obsBhattacharyya(options) {
        const { kf, state, obsIndexes } = options;
        TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.obsBhattacharyya');
        const stateProjection = kf.getValue(kf.observation.stateProjection, {});
        let projectedSelfState = State.matMul({ state: this, matrix: stateProjection });
        let projectedOtherState = State.matMul({ state, matrix: stateProjection });
        if (Array.isArray(obsIndexes)) {
            projectedSelfState = projectedSelfState.subState(obsIndexes);
            projectedOtherState = projectedOtherState.subState(obsIndexes);
        }
        return projectedSelfState.bhattacharyya(projectedOtherState);
    }
    /**
    * @param {State} otherState other state to compare with
    * @returns {Number}
    */
    bhattacharyya(otherState) {
        const { covariance, mean } = this;
        const average = (0, simple_linalg_1.elemWise)([covariance, otherState.covariance], ([a, b]) => (a + b) / 2);
        let covarInverted;
        try {
            covarInverted = (0, simple_linalg_1.invert)(average);
        }
        catch (error) {
            console.log('Cannot invert', average);
            throw error;
        }
        const diff = (0, simple_linalg_1.subtract)(mean, otherState.mean);
        return (0, simple_linalg_1.matMul)((0, simple_linalg_1.transpose)(diff), (0, simple_linalg_1.matMul)(covarInverted, diff))[0][0];
    }
}
exports["default"] = State;


/***/ },

/***/ "./lib/types/TypeAssert.ts"
/*!*********************************!*\
  !*** ./lib/types/TypeAssert.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function debugValue(value) {
    if (value === undefined) {
        return 'undefined';
    }
    let asStirng = '';
    asStirng = typeof (value) === 'function' ? value.toString() : JSON.stringify(value);
    if (asStirng.length < 100) {
        return asStirng;
    }
    return asStirng.slice(0, 97) + '...';
}
class TypeAssert {
    constructor() {
        throw new Error('do not constuct me');
    }
    dummy() { }
    static assertNotArray(arg, name = 'parameter') {
        if (Array.isArray(arg)) {
            throw new TypeError(`E001 ${name} cannot be an array. current value is ${debugValue(arg)}.`);
        }
    }
    static assertIsArray2D(arg, name = 'parameter') {
        if (!Array.isArray(arg)) {
            throw new TypeError(`E002 ${name} is not an array. current value is ${debugValue(arg)}.`);
        }
        if (arg.length === 0) {
            return;
        }
        if (!Array.isArray(arg[0])) {
            throw new TypeError(`E003 ${name} must be an array of array. current value is ${debugValue(arg)}.`);
        }
        // Allow type number[][][]
    }
    static assertIsArray2DOrFnc(arg, name = 'parameter') {
        if (typeof (arg) === 'function') {
            return;
        }
        TypeAssert.assertIsArray2D(arg, name);
    }
    /**
     * ensure that the provided arg is a number, number[], or number[][]
     * @param arg
     * @param name
     * @returns
     */
    static assertIsNumbersArray(arg, name = 'parameter') {
        if (typeof arg === 'number') {
            return;
        }
        if (!TypeAssert.isArray(arg)) {
            throw new TypeError(`E004 ${name} is not an array. current value is ${debugValue(arg)}.`);
        }
        if (arg.length === 0) {
            return;
        }
        if (typeof arg[0] === 'number') {
            return;
        }
        if (!TypeAssert.isArray(arg[0])) {
            throw new TypeError(`E005 ${name} is not an array of array. current value is ${debugValue(arg)}.`);
        }
        if (typeof (arg[0][0]) !== 'number') {
            throw new TypeError(`E006 ${name} is not an array of array of number. current value is ${debugValue(arg)}.`);
        }
    }
    static isArray2D(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return (Array.isArray(obj[0]));
    }
    static isArray1D(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return (typeof (obj[0]) === 'number');
    }
    static isArray(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        return true;
    }
    static isFunction(arg) {
        if (typeof (arg) === 'function') {
            return true;
            // throw new TypeError(`E000 ${name} cannot be a fucntion. current value is ${debugValue(arg)}.`);
        }
        return false;
    }
}
exports["default"] = TypeAssert;


/***/ },

/***/ "./lib/utils/array-to-matrix.ts"
/*!**************************************!*\
  !*** ./lib/utils/array-to-matrix.ts ***!
  \**************************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
*Returns the corresponding matrix in dim*1, given an dim matrix, and checks
* if corresponding with the observation dimension
*@param {Array.<Number> | Array.<Array.<Number>>} observation
*@param {Number} dimension
*@returns {Array.<Array.<Number>>}
*/
// export default function arrayToMatrix(args: {observation: number, dimension: 1}): number[][];
function arrayToMatrix(args) {
    const { observation, dimension } = args;
    if (!Array.isArray(observation)) {
        if (dimension === 1 && typeof (observation) === 'number') {
            return [[observation]];
        }
        throw (new TypeError(`The observation (${observation}) should be an array (dimension: ${dimension})`));
    }
    if (observation.length !== dimension) {
        throw (new TypeError(`Observation (${observation.length}) and dimension (${dimension}) not matching`));
    }
    if (typeof (observation[0]) === 'number' || observation[0] === null) {
        return observation.map(element => [element]);
    }
    return observation;
}
exports["default"] = arrayToMatrix;


/***/ },

/***/ "./lib/utils/check-covariance.ts"
/*!***************************************!*\
  !*** ./lib/utils/check-covariance.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const matrix_1 = __importDefault(__webpack_require__(/*! @rayyamhk/matrix */ "./node_modules/@rayyamhk/matrix/lib/index.js"));
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.ts"));
const tolerance = 0.1;
const checkDefinitePositive = function (covariance, tolerance = 1e-10) {
    const covarianceMatrix = new matrix_1.default(covariance);
    const eigenvalues = covarianceMatrix.eigenvalues();
    for (const eigenvalue of eigenvalues) {
        if (eigenvalue <= -tolerance) {
            console.log(covariance, eigenvalue);
            throw new Error(`Eigenvalue should be positive (actual: ${eigenvalue})`);
        }
    }
    console.log('is definite positive', covariance);
};
const checkSymetric = function (covariance, title = 'checkSymetric') {
    for (const [rowId, row] of covariance.entries()) {
        for (const [colId, item] of row.entries()) {
            if (rowId === colId && item < 0) {
                throw new Error(`[${title}] Variance[${colId}] should be positive (actual: ${item})`);
            }
            else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
                console.log(covariance);
                throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality `
                    + `(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})`
                    + ` actual: ${item})`);
            }
            else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
                throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] `
                    + ` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n`
                    + `${covariance.join('\n')} is invalid`);
            }
        }
    }
};
function checkCovariance(args, _title) {
    const { covariance, eigen = false } = args;
    (0, check_matrix_1.default)(covariance);
    checkSymetric(covariance);
    if (eigen) {
        checkDefinitePositive(covariance);
    }
}
exports["default"] = checkCovariance;


/***/ },

/***/ "./lib/utils/check-matrix.ts"
/*!***********************************!*\
  !*** ./lib/utils/check-matrix.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_shape_1 = __importDefault(__webpack_require__(/*! ./check-shape */ "./lib/utils/check-shape.ts"));
function checkMatrix(matrix, shape, title = 'checkMatrix') {
    if (!Array.isArray(matrix)) {
        throw (new TypeError(`[${title}] should be a 2-level array matrix and is ${matrix}`));
    }
    for (const row of matrix) {
        if (!Array.isArray(row)) {
            throw (new TypeError(`[${title}] 1-level array should be a matrix ${JSON.stringify(matrix)}`));
        }
    }
    if (matrix.reduce((a, b) => a.concat(b)).some(a => Number.isNaN(a))) {
        throw (new Error(`[${title}] Matrix should not have a NaN\nIn : \n`
            + matrix.join('\n')));
    }
    if (shape) {
        (0, check_shape_1.default)(matrix, shape, title);
    }
}
exports["default"] = checkMatrix;


/***/ },

/***/ "./lib/utils/check-shape.ts"
/*!**********************************!*\
  !*** ./lib/utils/check-shape.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function checkShape(matrix, shape, title = 'checkShape') {
    if (matrix.length !== shape[0]) {
        throw (new Error(`[${title}] expected size (${shape[0]}) and length (${matrix.length}) does not match`));
    }
    if (shape.length > 1) {
        return matrix.forEach(m => checkShape(m, shape.slice(1), title));
    }
}
exports["default"] = checkShape;


/***/ },

/***/ "./lib/utils/correlation-to-covariance.ts"
/*!************************************************!*\
  !*** ./lib/utils/correlation-to-covariance.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.ts"));
function correlationToCovariance({ correlation, variance }) {
    (0, check_covariance_1.default)({ covariance: correlation });
    return correlation.map((c, rowIndex) => c.map((a, colIndex) => a * Math.sqrt(variance[colIndex] * variance[rowIndex])));
}
exports["default"] = correlationToCovariance;


/***/ },

/***/ "./lib/utils/covariance-to-correlation.ts"
/*!************************************************!*\
  !*** ./lib/utils/covariance-to-correlation.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ "./lib/utils/check-covariance.ts"));
function covarianceToCorrelation(covariance) {
    (0, check_covariance_1.default)({ covariance });
    const variance = covariance.map((_, i) => covariance[i][i]);
    return {
        variance,
        correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex]))),
    };
}
exports["default"] = covarianceToCorrelation;


/***/ },

/***/ "./lib/utils/deep-assign.ts"
/*!**********************************!*\
  !*** ./lib/utils/deep-assign.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const uniq_1 = __importDefault(__webpack_require__(/*! ./uniq */ "./lib/utils/uniq.ts"));
const limit = 100;
/**
*Equivalent to the Object.assign method, takes several arguments and creates a new object corresponding to the assignment of the arguments
* @param {Object} args
* @param {Number} step
* @returns {Object}
*/
function deepAssignInternal(args, step) {
    if (step > limit) {
        throw (new Error(`In deepAssign, number of recursive call (${step}) reached limit (${limit}), deepAssign is not working on  self-referencing objects`));
    }
    const filterArguments = args.filter(arg => (arg) !== undefined && arg !== null);
    const lastArgument = filterArguments.at(-1);
    if (filterArguments.length === 1) {
        return filterArguments[0];
    }
    if (typeof (lastArgument) !== 'object' || Array.isArray(lastArgument)) {
        return lastArgument;
    }
    if (filterArguments.length === 0) {
        return null;
    }
    const objectsArguments = filterArguments.filter(arg => typeof (arg) === 'object');
    let keys = [];
    for (const arg of objectsArguments) {
        keys = keys.concat(Object.keys(arg));
    }
    const uniqKeys = (0, uniq_1.default)(keys);
    const result = {};
    for (const key of uniqKeys) {
        const values = objectsArguments.map(arg => arg[key]);
        result[key] = deepAssignInternal(values, step + 1);
    }
    return result;
}
function deepAssign(...args) { return deepAssignInternal(args, 0); }
exports["default"] = deepAssign;


/***/ },

/***/ "./lib/utils/get-covariance.ts"
/*!*************************************!*\
  !*** ./lib/utils/get-covariance.ts ***!
  \*************************************/
(__unused_webpack_module, exports) {

"use strict";

/**
* @param {Object} opts
* @param {Array.<Array.<Number>>} opts.measures a list of measure, size is LxN L the number of sample, N the dimension
* @param {Array.<Array.<Number>>} opts.averages a list of averages, size is LxN L the number of sample, N the dimension
* @returns {Array.<Array.<Number>>} covariance matrix size is NxN
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
function getCovariance({ measures, averages }) {
    const l = measures.length;
    const n = measures[0].length;
    if (l === 0) {
        throw (new Error('Cannot find covariance for empty sample'));
    }
    return (new Array(n).fill(1)).map((_, rowIndex) => (new Array(n).fill(1)).map((_, colIndex) => {
        const stds = measures.map((m, i) => (m[rowIndex] - averages[i][rowIndex]) * (m[colIndex] - averages[i][colIndex]));
        const result = stds.reduce((a, b) => a + b) / l;
        if (Number.isNaN(result)) {
            throw (new TypeError('result is NaN'));
        }
        return result;
    }));
}
exports["default"] = getCovariance;


/***/ },

/***/ "./lib/utils/polymorph-matrix.ts"
/*!***************************************!*\
  !*** ./lib/utils/polymorph-matrix.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ "./lib/utils/check-matrix.ts"));
const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ "./lib/types/TypeAssert.ts"));
/**
* If cov is a number, result will be Identity*cov
* If cov is an Number[], result will be diag(cov)
* If cov is an Number[][], result will be cov
*/
function polymorphMatrix(cov, opts = {}) {
    const { dimension, title = 'polymorph' } = opts;
    //if (!cov) {
    //	return undefined;
    //}
    if (typeof (cov) === 'number' || Array.isArray(cov)) {
        if (typeof (cov) === 'number' && typeof (dimension) === 'number') {
            return (0, simple_linalg_1.diag)(new Array(dimension).fill(cov));
        }
        if (TypeAssert_1.default.isArray2D(cov)) {
            let shape;
            if (typeof (dimension) === 'number') {
                shape = [dimension, dimension];
            }
            (0, check_matrix_1.default)(cov, shape, title);
            return cov;
        }
        if (TypeAssert_1.default.isArray1D(cov)) {
            return (0, simple_linalg_1.diag)(cov);
        }
    }
    // throw new Error('Invalid input type in polymorphMatrix get ' + JSON.stringify(cov).slice(0, 100));
    return cov;
}
exports["default"] = polymorphMatrix;


/***/ },

/***/ "./lib/utils/project-observation.ts"
/*!******************************************!*\
  !*** ./lib/utils/project-observation.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// From observationTracks to movingAverageGroundTruthsStates with speed
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ "./node_modules/simple-linalg/index.js");
function projectObservation({ observation, obsIndexes, selectedStateProjection, invertSelectedStateProjection }) {
    if (!observation) {
        return null;
    }
    const value = observation.observation || observation;
    const vec = obsIndexes.map(i => {
        if ((value[i]) === undefined) {
            throw (new TypeError(`obsIndexes (${obsIndexes}) is not matching with observation (${observation})`));
        }
        return [value[i]];
    });
    const inverse = invertSelectedStateProjection || (0, simple_linalg_1.invert)(selectedStateProjection);
    if (inverse === null) {
        throw (new Error('selectedStateProjection is not invertible, please provide invertSelectedStateProjection'));
    }
    const out = (0, simple_linalg_1.matMul)(inverse, vec);
    return out
        .map(v => v[0])
        .map(v => {
        if (Number.isNaN(v)) {
            throw (new TypeError('NaN in projection'));
        }
        return v;
    });
}
exports["default"] = projectObservation;


/***/ },

/***/ "./lib/utils/to-function.ts"
/*!**********************************!*\
  !*** ./lib/utils/to-function.ts ***!
  \**********************************/
(__unused_webpack_module, exports) {

"use strict";

// Const {diag} = require('simple-linalg');;
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
* @callback MatrixCallback
* @returns <Array.<Array.<Number>>
*/
/**
* Tranforms:
** a 2d array into a function (() => array)
** a 1d array into a function (() => diag(array))
*@param {Array.<Number> | Array.<Array.<Number>>} array
*@returns {MatrixCallback}
*/
function toFunction(array, { label = '' } = {}) {
    if (typeof (array) === 'function') {
        return array;
    }
    if (Array.isArray(array)) {
        return array;
    }
    throw (new Error(`${label === null ? '' : label + ' : '}Only arrays and functions are authorized (got: "${array}")`));
}
exports["default"] = toFunction;


/***/ },

/***/ "./lib/utils/uniq.ts"
/*!***************************!*\
  !*** ./lib/utils/uniq.ts ***!
  \***************************/
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function uniq(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
}
exports["default"] = uniq;


/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/acos.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acos.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse cosine function of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse sine function
 */
function acos(num) {
  return this.subtract(new this(Math.PI / 2), this.asin(num));
}

module.exports = acos;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/acot.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acot.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse cotangent function of given complex number
 * The domain is C / { i, -i, 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse cotangent function
 */
function acot(num) {
  return this.atan(this.inverse(num));
}

module.exports = acot;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/acsc.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acsc.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse cosecant function of given complex number
 * The domain is C / { 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse cosecant function
 */
function acsc(num) {
  return this.asin(this.inverse(num));
}

module.exports = acsc;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/add.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/add.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Returns the sum of two complex numbers
 * @param { Complex } num1 - Complex number on the left of '+' sign
 * @param { Complex } num2 - Complex number on the right of '+' sign
 * @return { Complex } - Sum of two numbers
 */
function add(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re + num2.re, num1.im + num2.im);
}

module.exports = add;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/asec.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/asec.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse secant function of given complex number
 * The domain is C / { 0 }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse secant function
 */
function asec(num) {
  return this.acos(this.inverse(num));
}

module.exports = asec;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/asin.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/asin.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse sine function of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse sine function
 */
function asin(num) {
  return this.multiply(new this(0, -1), this.log(this.add(this.multiply(new this(0, 1), num), this.pow(this.subtract(this.ONE, this.pow(num, 2)), 0.5))));
}

module.exports = asin;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/atan.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/atan.js ***!
  \*********************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse tangent function of given complex number
 * The domain is C / { i, -i }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of inverse tangent function
 */
function atan(num) {
  return this.multiply(new this(0, 1 / 2), this.subtract(this.log(this.subtract(this.ONE, this.multiply(new this(0, 1), num))), this.log(this.add(this.ONE, this.multiply(new this(0, 1), num)))));
}

module.exports = atan;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/conjugate.js"
/*!**************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/conjugate.js ***!
  \**************************************************************/
(module) {

"use strict";


/**
 * Calculate the complex conjugate of given complex number
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the complex conjugate
 */
function conjugate(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return new this(num.getReal(), num.getImaginary() * -1);
}

module.exports = conjugate;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/cos.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/cos.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the cosine of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cosine function
 */
function cos(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.cos(a) * Math.cosh(b), Math.sin(a) * Math.sinh(b) * -1);
}

module.exports = cos;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/cot.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/cot.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the cotangent of given complex number
 * The domain is C / { k * PI / 2 : k is any integer }
 * Note that cot(PI / 2) should gives NaN instead of 0
 * because we won't introduce the concept of Infinity in this class
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cotangent function
 */
function cot(num) {
  return this.divide(this.ONE, this.tan(num));
}

module.exports = cot;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/csc.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/csc.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the cosecant of given complex number
 * The domain is C / { k * PI : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex cosecant function
 */
function csc(num) {
  return this.divide(this.ONE, this.sin(num));
}

module.exports = csc;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/divide.js"
/*!***********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/divide.js ***!
  \***********************************************************/
(module) {

"use strict";


/**
 * Returns the quotient of two complex numbers.
 * If the denominator is considered as 0,
 * return NaN instead of Infinity
 * @param { Complex } num1 - Complex number on the left of '/' sign
 * @param { Complex } num2 - Complex number on the right of '/' sign
 * @return { Complex } - Quotient of two numbers
 */
function divide(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;

  if (Math.abs(c) < this.EPSILON && Math.abs(d) < this.EPSILON) {
    return this.NaN;
  }

  var denominator = Math.pow(c, 2) + Math.pow(d, 2);
  return new this((a * c + b * d) / denominator, (b * c - a * d) / denominator);
}

module.exports = divide;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/exp.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/exp.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the exponential function with base E
 * @param { Complex } num - Exponent
 * @return { Complex } - Return the e to the power of num
 */
function exp(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var re = num.getReal();
  var theta = num.getImaginary();
  var r = Math.exp(re);
  return new this(r * Math.cos(theta), r * Math.sin(theta));
}

module.exports = exp;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/getArgument.js"
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getArgument.js ***!
  \****************************************************************/
(module) {

"use strict";


/**
 * Note that the argument is restricted to the interval [ 0, 2 * PI )
 * If the given number is considered as 0, return undefined
 * @return { Number } - Return the argument of given complex number
 */
function getArgument() {
  var x = this.re;
  var y = this.im;
  var epsilon = 1 / (Math.pow(10, 15) * 2);

  if (Math.abs(x) < epsilon && Math.abs(y) < epsilon) {
    return undefined;
  }

  if (x === 0) {
    if (y > 0) {
      return Math.PI * 0.5;
    }

    return Math.PI * 1.5;
  }

  if (y === 0) {
    if (x > 0) {
      return 0;
    }

    return Math.PI;
  }

  if (x > 0 && y > 0) {
    return Math.atan(y / x);
  }

  if (x < 0 && y > 0) {
    return Math.PI - Math.atan(y / (x * -1));
  }

  if (x < 0 && y < 0) {
    return Math.PI + Math.atan(y * -1 / (x * -1));
  }

  return Math.PI * 2 - Math.atan(y * -1 / x);
}

module.exports = getArgument;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/getImaginary.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getImaginary.js ***!
  \*****************************************************************/
(module) {

"use strict";


/**
 * @return { Number } - Return the imaginary part of given complex number
 */
function getImaginary() {
  return this.im;
}

module.exports = getImaginary;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/getModulus.js"
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getModulus.js ***!
  \***************************************************************/
(module) {

"use strict";


/**
 * @return { Number } - Return the modulus (length) of given complex number
 */
function getModulus() {
  return Math.sqrt(Math.pow(this.re, 2) + Math.pow(this.im, 2));
}

module.exports = getModulus;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/getReal.js"
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getReal.js ***!
  \************************************************************/
(module) {

"use strict";


/**
 * @return { Number } - Return the real part of given complex number
 */
function getReal() {
  return this.re;
}

module.exports = getReal;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/inverse.js"
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/inverse.js ***!
  \************************************************************/
(module) {

"use strict";


/**
 * Calculate the inverse of given complex number, i.e. 1/z
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the inverse
 */
function inverse(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  return this.divide(this.ONE, num);
}

module.exports = inverse;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/isEqual.js"
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/isEqual.js ***!
  \************************************************************/
(module) {

"use strict";


/**
 * Determine whether two complex numbers are considered as identical.
 * Either both are NaN or both real and imaginary parts are extremely closed.
 * @param { Complex } num1 - Complex number
 * @param { Complex } num2 - Complex number
 * @param { Integer } digit - Number of significant digits
 * @return { Boolean } - Return true if two complex numbers are considered as identical
 */
function isEqual(num1, num2) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return false;
  }

  if (!Number.isInteger(digit) || digit < 0) {
    throw new Error('Invalid argument: Expected a non-negative integer digit');
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var a = num1.getReal();
  var b = num1.getImaginary();
  var c = num2.getReal();
  var d = num2.getImaginary();

  if (Number.isNaN(a) && Number.isNaN(b) && Number.isNaN(c) && Number.isNaN(d)) {
    return true;
  }

  return Math.abs(a - c) < EPSILON && Math.abs(b - d) < EPSILON;
}

module.exports = isEqual;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/isNaN.js"
/*!**********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/isNaN.js ***!
  \**********************************************************/
(module) {

"use strict";


/**
 * Determine whether the given complex number is NaN or not
 * @param { Complex } num - Complex number
 * @return { Boolean } - Return true if one of real and imaginary part are NaN
 */
function isNaN(num) {
  if (!(num instanceof this)) {
    return false;
  }

  var re = num.getReal();
  var im = num.getImaginary();

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return true;
  }

  return false;
}

module.exports = isNaN;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/log.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/log.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the natural log of given complex number
 * Note that complex log is a multivalued function,
 * But this function only provides the principal value by
 * restricting the imaginary part to the interval [0, 2 * Pi).
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result after taking natural log
 */
function log(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var r = num.getModulus();
  var theta = num.getArgument();

  if (r < this.EPSILON || theta === undefined) {
    return this.NaN;
  }

  return new this(Math.log(r), theta);
}

module.exports = log;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/multiply.js"
/*!*************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/multiply.js ***!
  \*************************************************************/
(module) {

"use strict";


/**
 * Returns the product of two complex numbers
 * @param { Complex } num1 - Complex number on the left of 'x' sign
 * @param { Complex } num2 - Complex number on the right of 'x' sign
 * @return { Complex } - Product of two numbers
 */
function multiply(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  var a = num1.re;
  var b = num1.im;
  var c = num2.re;
  var d = num2.im;
  return new this(a * c - b * d, a * d + b * c);
}

module.exports = multiply;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/pow.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/pow.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the power of complex number,
 * The exponent can be any real number
 * If you want to calculate the k-th root,
 * You should know that it only returns one out of k solutions,
 * Although there are total k possible solutions for k-th root problem.
 * @param { Complex } num - Base
 * @param { Complex | Number } n - Exponent
 * @return { Complex } - Return the result of the exponentiation
 */
function pow(num, n) {
  if (!(num instanceof this) || typeof n !== 'number' && !(n instanceof this)) {
    return this.NaN;
  }

  if (typeof n === 'number') {
    if (!Number.isFinite(n) || Number.isNaN(n)) {
      return this.NaN;
    }

    if (n === 0) {
      return this.ONE;
    }

    if (this.isEqual(num, this.ZERO)) {
      return this.ZERO;
    }

    return this.exp(this.multiply(new this(n, 0), this.log(num)));
  }

  if (n instanceof this) {
    return this.exp(this.multiply(n, this.log(num)));
  }

  return this.NaN;
}

module.exports = pow;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/sec.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/sec.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the secant of given complex number
 * The domain is C / { ( 2k + 1) * PI / 2 : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex secant function
 */
function sec(num) {
  return this.divide(this.ONE, this.cos(num));
}

module.exports = sec;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/sin.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/sin.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the sine of given complex number
 * The domain is C
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex sine function
 */
function sin(num) {
  if (!(num instanceof this)) {
    return this.NaN;
  }

  var a = num.getReal();
  var b = num.getImaginary();
  return new this(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
}

module.exports = sin;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/subtract.js"
/*!*************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/subtract.js ***!
  \*************************************************************/
(module) {

"use strict";


/**
 * Returns the difference of two complex numbers
 * @param { Complex } num1 - Complex number on the left of '-' sign
 * @param { Complex } num2 - Complex number on the right of '-' sign
 * @return { Complex } - Difference of two numbers
 */
function subtract(num1, num2) {
  if (!(num1 instanceof this) || !(num2 instanceof this)) {
    return this.NaN;
  }

  return new this(num1.re - num2.re, num1.im - num2.im);
}

module.exports = subtract;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/tan.js"
/*!********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/tan.js ***!
  \********************************************************/
(module) {

"use strict";


/**
 * Calculate the tangent of given complex number
 * The domain is C / { ( 2k + 1) * PI / 2 : k is any integer }
 * @param { Complex } num - Complex number
 * @return { Complex } - Return the result of complex tangent function
 */
function tan(num) {
  return this.divide(this.sin(num), this.cos(num));
}

module.exports = tan;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/core/toString.js"
/*!*************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/toString.js ***!
  \*************************************************************/
(module) {

"use strict";


/**
 * @return { String } - Return the stringified and formatted complex number
 */
function toString() {
  var re = this.re,
      im = this.im;

  if (Number.isNaN(re) || Number.isNaN(im)) {
    return 'NaN';
  }

  if (re === 0 && im === 0) {
    return '0';
  }

  if (re === 0) {
    if (im === 1) {
      return 'i';
    }

    if (im === -1) {
      return '-i';
    }

    return "".concat(im, "i");
  }

  if (im === 0) {
    return "".concat(re);
  }

  if (im > 0) {
    if (im === 1) {
      return "".concat(re, " + i");
    }

    return "".concat(re, " + ").concat(im, "i");
  }

  if (im === -1) {
    return "".concat(re, " - i");
  }

  return "".concat(re, " - ").concat(Math.abs(im), "i");
}

module.exports = toString;

/***/ },

/***/ "./node_modules/@rayyamhk/complex/lib/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/index.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns a Complex Number
 * @param { Number } arg1 - real part of the complex number
 * @param { Number } arg2 - imaginary part of the complex number
 * @return { Complex } - Complex Number
 */
function Complex(arg1, arg2) {
  var type1 = _typeof(arg1);

  var type2 = _typeof(arg2);

  if (type1 === 'number' && type2 === 'undefined') {
    if (Number.isNaN(arg1) || !Number.isFinite(arg1)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = 0;
    return this;
  }

  if (type1 === 'number' && type2 === 'number') {
    if (Number.isNaN(arg1) || Number.isNaN(arg2) || !Number.isFinite(arg1) || !Number.isFinite(arg2)) {
      this.re = NaN;
      this.im = NaN;
      return this;
    }

    this.re = arg1;
    this.im = arg2;
    return this;
  }

  this.re = NaN;
  this.im = NaN;
  return this;
}

Complex.prototype.getReal = __webpack_require__(/*! ./core/getReal */ "./node_modules/@rayyamhk/complex/lib/core/getReal.js");
Complex.prototype.getImaginary = __webpack_require__(/*! ./core/getImaginary */ "./node_modules/@rayyamhk/complex/lib/core/getImaginary.js");
Complex.prototype.getModulus = __webpack_require__(/*! ./core/getModulus */ "./node_modules/@rayyamhk/complex/lib/core/getModulus.js");
Complex.prototype.getArgument = __webpack_require__(/*! ./core/getArgument */ "./node_modules/@rayyamhk/complex/lib/core/getArgument.js");
Complex.prototype.toString = __webpack_require__(/*! ./core/toString */ "./node_modules/@rayyamhk/complex/lib/core/toString.js");
Complex.isNaN = __webpack_require__(/*! ./core/isNaN */ "./node_modules/@rayyamhk/complex/lib/core/isNaN.js");
Complex.isEqual = __webpack_require__(/*! ./core/isEqual */ "./node_modules/@rayyamhk/complex/lib/core/isEqual.js");
Complex.conjugate = __webpack_require__(/*! ./core/conjugate */ "./node_modules/@rayyamhk/complex/lib/core/conjugate.js");
Complex.inverse = __webpack_require__(/*! ./core/inverse */ "./node_modules/@rayyamhk/complex/lib/core/inverse.js");
Complex.add = __webpack_require__(/*! ./core/add */ "./node_modules/@rayyamhk/complex/lib/core/add.js");
Complex.subtract = __webpack_require__(/*! ./core/subtract */ "./node_modules/@rayyamhk/complex/lib/core/subtract.js");
Complex.multiply = __webpack_require__(/*! ./core/multiply */ "./node_modules/@rayyamhk/complex/lib/core/multiply.js");
Complex.divide = __webpack_require__(/*! ./core/divide */ "./node_modules/@rayyamhk/complex/lib/core/divide.js");
Complex.exp = __webpack_require__(/*! ./core/exp */ "./node_modules/@rayyamhk/complex/lib/core/exp.js");
Complex.log = __webpack_require__(/*! ./core/log */ "./node_modules/@rayyamhk/complex/lib/core/log.js");
Complex.pow = __webpack_require__(/*! ./core/pow */ "./node_modules/@rayyamhk/complex/lib/core/pow.js");
Complex.sin = __webpack_require__(/*! ./core/sin */ "./node_modules/@rayyamhk/complex/lib/core/sin.js");
Complex.cos = __webpack_require__(/*! ./core/cos */ "./node_modules/@rayyamhk/complex/lib/core/cos.js");
Complex.tan = __webpack_require__(/*! ./core/tan */ "./node_modules/@rayyamhk/complex/lib/core/tan.js");
Complex.csc = __webpack_require__(/*! ./core/csc */ "./node_modules/@rayyamhk/complex/lib/core/csc.js");
Complex.sec = __webpack_require__(/*! ./core/sec */ "./node_modules/@rayyamhk/complex/lib/core/sec.js");
Complex.cot = __webpack_require__(/*! ./core/cot */ "./node_modules/@rayyamhk/complex/lib/core/cot.js");
Complex.asin = __webpack_require__(/*! ./core/asin */ "./node_modules/@rayyamhk/complex/lib/core/asin.js");
Complex.acos = __webpack_require__(/*! ./core/acos */ "./node_modules/@rayyamhk/complex/lib/core/acos.js");
Complex.atan = __webpack_require__(/*! ./core/atan */ "./node_modules/@rayyamhk/complex/lib/core/atan.js");
Complex.acsc = __webpack_require__(/*! ./core/acsc */ "./node_modules/@rayyamhk/complex/lib/core/acsc.js");
Complex.asec = __webpack_require__(/*! ./core/asec */ "./node_modules/@rayyamhk/complex/lib/core/asec.js");
Complex.acot = __webpack_require__(/*! ./core/acot */ "./node_modules/@rayyamhk/complex/lib/core/acot.js");
Complex.NaN = new Complex(NaN);
Complex.ONE = new Complex(1);
Complex.ZERO = new Complex(0);
Complex.PI = new Complex(Math.PI);
Complex.E = new Complex(Math.E);
Complex.EPSILON = 1 / (Math.pow(10, 15) * 2);
module.exports = Complex;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/Error.js"
/*!****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/Error.js ***!
  \****************************************************/
(module) {

"use strict";


module.exports = {
  INVALID_ARRAY: 'Invalid argument: Received a non-array argument',
  INVALID_MATRIX: 'Invalid argument: Received an invalid matrix',
  INVALID_SQUARE_MATRIX: 'Invalid argument: Received a non-square matrix',
  INVALID_UPPER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non upper-triangular matrix',
  INVALID_LOWER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non lower-triangular matrix',
  INVALID_EXPONENT: 'Invalid argument: Expected a non-negative integer exponent',
  INVALID_ROW_COL: 'Invalid argument: Expected non-negative integer row and column',
  INVALID_ROW: 'Invalid argument: Expected non-negative integer row',
  INVALID_COLUMN: 'Invalid argument: Expected non-negative integer column',
  INVALID_ROWS_EXPRESSION: 'Invalid argument: Received invalid rows expression',
  INVALID_COLUMNS_EXPRESSION: 'Invalid argument: Received invalid columns expression',
  INVALID_P_NORM: 'Invalid argument: Received invalid p-norm',
  OVERFLOW_INDEX: 'Invalid argument: Matrix index overflow',
  OVERFLOW_COLUMN: 'Invalid argument: Column index overflow',
  OVERFLOW_ROW: 'Invalid argument: Row index overflow',
  NO_UNIQUE_SOLUTION: 'Arithmetic Exception: The system has no unique solution',
  SIZE_INCOMPATIBLE: 'Invalid argument: Matrix size-incompatible',
  SINGULAR_MATRIX: 'Arithmetic Exception: The matrix is not invertible',
  EXPECTED_STRING_NUMBER_AT_POS_1_2: 'Invalid argument: Expected a string or a number at arguments[1] and arguments[2]',
  EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES: 'Invalid argument: Expected either an array of numbers or an array of square matrices'
};

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js ***!
  \*********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the LUP decomposition of the Matrix,
 * where L is lower triangular matrix which diagonal entries are always 1,
 * U is upper triangular matrix, and P is permutation matrix.<br><br>
 * 
 * It is implemented using Gaussian Elimination with Partial Pivoting in order to
 * reduce the error caused by floating-point arithmetic.<br><br>
 * 
 * Note that if optimized is true, P is a Permutation Array and both L and U are merged
 * into one matrix in order to improve performance.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {boolean} [optimized=false] - Returns [P, LU] if it is true, [P, L, U] if it is false
 * @returns {Matrix[]} The LUP decomposition of Matrix
 */


function LU(A) {
  var optimized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);
  var permutation = initPermutation(row);

  var copy = this.clone(A)._matrix;

  for (var i = 0; i < row - 1; i++) {
    var currentCol = Math.min(i, col); // apply Partial Pivoting

    PartialPivoting(copy, permutation, currentCol, row, col);
    var ith = permutation[i];
    var pivot = copy[ith][currentCol];

    if (Math.abs(pivot) < EPSILON) {
      continue;
    }

    for (var j = i + 1; j < row; j++) {
      var jth = permutation[j];
      var entry = copy[jth][currentCol];

      if (Math.abs(entry) >= EPSILON) {
        var factor = entry / pivot;

        for (var k = currentCol; k < col; k++) {
          copy[jth][k] -= factor * copy[ith][k];
        }

        copy[jth][currentCol] = factor;
      }
    }
  }

  var result = new Array(row);

  for (var _i2 = 0; _i2 < row; _i2++) {
    result[_i2] = copy[permutation[_i2]];
  }

  if (optimized) {
    return [permutation, new this(result)];
  }

  var P = this.generate(row, row, function (i, j) {
    var idx = permutation[i];

    if (j === idx) {
      return 1;
    }

    return 0;
  });
  var L = this.generate(row, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    if (i < j) {
      return 0;
    }

    return result[i][j];
  });
  var U = this.generate(size, col, function (i, j) {
    if (i > j) {
      return 0;
    }

    return result[i][j];
  });
  return [P, L, U];
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

function PartialPivoting(matrix, permutation, pos, row, col) {
  var currentCol = Math.min(pos, col);
  var maxIdx = pos;
  var max = Math.abs(matrix[permutation[pos]][currentCol]);

  for (var i = pos + 1; i < row; i++) {
    var value = Math.abs(matrix[permutation[i]][currentCol]);

    if (value > max) {
      maxIdx = i;
      max = value;
    }
  }

  var t = permutation[pos];
  permutation[pos] = permutation[maxIdx];
  permutation[maxIdx] = t;
}

module.exports = LU;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js ***!
  \*********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the QR decomposition of the Matrix
 * where Q is orthogonal matrix, R is upper triangular matrix.<br><br>
 * 
 * The algorithm is implemented using Householder Transform instead of Gram–Schmidt process
 * because the Householder Transform is more numerically stable.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @returns {Matrix[]} The QR decomposition of matrix in the form of [Q, R]
 */


function QR(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var matrixR = this.clone(A)._matrix;

  var matrixQ = this.identity(row)._matrix;

  for (var j = 0; j < size; j++) {
    // if all entries below main diagonal are considered as zero, skip this round
    var skip = true;

    for (var i = j + 1; i < row; i++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        skip = false;
        break;
      }
    }

    if (!skip) {
      // Apply Householder transform
      var norm = 0;

      for (var _i2 = j; _i2 < row; _i2++) {
        norm += Math.pow(matrixR[_i2][j], 2);
      }

      norm = Math.sqrt(norm); // reduce floating point arithmatic error

      var s = -1;

      if (matrixR[j][j] < 0) {
        s = 1;
      }

      var u1 = matrixR[j][j] - s * norm;
      var w = new Array(row - j);

      for (var _i3 = 0; _i3 < row - j; _i3++) {
        w[_i3] = matrixR[_i3 + j][j] / u1;
      }

      w[0] = 1;
      var tau = -1 * s * u1 / norm;
      var subR = new Array(row - j);

      for (var _i4 = 0; _i4 < row - j; _i4++) {
        var newRow = new Array(col);

        for (var k = 0; k < col; k++) {
          newRow[k] = matrixR[j + _i4][k];
        }

        subR[_i4] = newRow;
      }

      for (var _i5 = j; _i5 < row; _i5++) {
        for (var _k = 0; _k < col; _k++) {
          var summation = 0;

          for (var m = 0; m < row - j; m++) {
            summation += subR[m][_k] * w[m];
          }

          matrixR[_i5][_k] = subR[_i5 - j][_k] - tau * w[_i5 - j] * summation;
        }
      }

      var subQ = new Array(row);

      for (var _i6 = 0; _i6 < row; _i6++) {
        var _newRow = new Array(row - j);

        for (var _k2 = 0; _k2 < row - j; _k2++) {
          _newRow[_k2] = matrixQ[_i6][j + _k2];
        }

        subQ[_i6] = _newRow;
      }

      for (var _i7 = 0; _i7 < row; _i7++) {
        for (var _k3 = j; _k3 < row; _k3++) {
          var _summation = 0;

          for (var _m = 0; _m < row - j; _m++) {
            _summation += subQ[_i7][_m] * w[_m];
          }

          matrixQ[_i7][_k3] = subQ[_i7][_k3 - j] - tau * w[_k3 - j] * _summation;
        }
      }
    }
  }

  for (var _i8 = 0; _i8 < row; _i8++) {
    for (var _j = 0; _j < col; _j++) {
      if (_i8 > _j) {
        matrixR[_i8][_j] = 0;
      }
    }
  }

  return [new this(matrixQ), new this(matrixR)];
}

;
module.exports = QR;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js ***!
  \*****************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_UPPER_TRIANGULAR_MATRIX = _require.INVALID_UPPER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
* Solve system of linear equations Ux = y using backward substitution,
* where U is an upper triangular matrix.
* If there is no unique solutions, an error is thrown.
* @memberof Matrix
* @static
* @param {Matrix} U - Any n x n upper triangular Matrix
* @param {Matrix} y - Any n x 1 Matrix
* @returns {Matrix} n x 1 Matrix which is the solution of Ux = y
*/


function backward(U, y) {
  if (!(U instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!U.isUpperTriangular()) {
    throw new Error(INVALID_UPPER_TRIANGULAR_MATRIX);
  }

  if (!U.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = U.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixU = U._matrix;
  var matrixY = y._matrix;

  if (yrow !== size || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, U._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = size - 1; _i2 >= 0; _i2--) {
    var summation = 0;

    for (var j = _i2 + 1; j < size; j++) {
      summation += coefficients[j][0] * matrixU[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixU[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = backward;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js ***!
  \****************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_LOWER_TRIANGULAR_MATRIX = _require.INVALID_LOWER_TRIANGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION;
/**
 * Solve system of linear equations Lx = y using forward substitution,
 * where L is a lower triangular matrix.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n lower triangular Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Lx = y
 */


function forward(L, y) {
  if (!(L instanceof this) || !(y instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!L.isLowerTriangular()) {
    throw new Error(INVALID_LOWER_TRIANGULAR_MATRIX);
  }

  if (!L.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = L.size()[0];

  var _y$size = y.size(),
      _y$size2 = _slicedToArray(_y$size, 2),
      yrow = _y$size2[0],
      ycol = _y$size2[1];

  var matrixL = L._matrix;
  var matrixY = y._matrix;

  if (size !== yrow || ycol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, L._digit) * 2);

  for (var i = 0; i < size; i++) {
    if (Math.abs(matrixL[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var coefficients = empty(size, 1);

  for (var _i2 = 0; _i2 < size; _i2++) {
    var summation = 0;

    for (var j = 0; j < _i2; j++) {
      summation += coefficients[j][0] * matrixL[_i2][j];
    }

    coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixL[_i2][_i2];
  }

  return new this(coefficients);
}

;
module.exports = forward;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js ***!
  \**************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    NO_UNIQUE_SOLUTION = _require.NO_UNIQUE_SOLUTION,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Solve system of linear equations Ax = y using LU decomposition.
 * If there is no unique solutions, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} L - Any n x n square Matrix
 * @param {Matrix} y - Any n x 1 Matrix
 * @returns {Matrix} n x 1 Matrix which is the solution of Ax = y
 */


function solve(A, b) {
  if (!(A instanceof this) || !(b instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      aRow = _A$size2[0],
      aCol = _A$size2[1];

  var _b$size = b.size(),
      _b$size2 = _slicedToArray(_b$size, 2),
      bRow = _b$size2[0],
      bCol = _b$size2[1];

  if (aCol !== bRow || bCol !== 1) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var _this$LU = this.LU(A, true),
      _this$LU2 = _slicedToArray(_this$LU, 2),
      P = _this$LU2[0],
      LU = _this$LU2[1];

  var matrixLU = LU._matrix;
  var matrixB = b._matrix;

  for (var i = aRow - 1; i >= 0; i--) {
    if (Math.abs(matrixLU[i][i]) < EPSILON) {
      throw new Error(NO_UNIQUE_SOLUTION);
    }
  }

  var clonedVector = new Array(bRow);
  var coefficients = new Array(bRow);

  for (var _i2 = 0; _i2 < bRow; _i2++) {
    // eslint-disable-next-line prefer-destructuring
    clonedVector[_i2] = matrixB[P[_i2]][0];
  }

  for (var _i3 = 0; _i3 < aRow; _i3++) {
    var summation = 0;

    for (var j = 0; j < _i3; j++) {
      summation += coefficients[j] * matrixLU[_i3][j];
    }

    coefficients[_i3] = clonedVector[_i3] - summation;
  }

  for (var _i4 = aRow - 1; _i4 >= 0; _i4--) {
    var _summation = 0;

    for (var _j = _i4 + 1; _j < aRow; _j++) {
      _summation += matrixLU[_i4][_j] * clonedVector[_j];
    }

    clonedVector[_i4] = (coefficients[_i4] - _summation) / matrixLU[_i4][_i4];
  }

  for (var _i5 = 0; _i5 < bRow; _i5++) {
    coefficients[_i5] = [clonedVector[_i5]];
  }

  return new this(coefficients);
}

;
module.exports = solve;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/add.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/add.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the sum of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The sum of two Matrices
 */


function add(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] + matrix2[i][j];
  });
}

;
module.exports = add;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js ***!
  \**********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX;

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Find the inverse of non-singular matrix using Elementary Row Operations.
 * If the matrix is singular, an error is thrown.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @returns {Matrix} The inverse of A
 */


function inverse(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  var size = A.size()[0];

  if (size === 0) {
    // inverse of 0x0 matrix is itself
    return new Matrix([]);
  }

  var EPSILON = 1 / (Math.pow(10, A._digit) * 2);

  var inv = this.identity(size)._matrix;

  var clone = this.clone(A)._matrix;

  var permutation = initPermutation(size); // iterate each column

  for (var j = 0; j < size; j++) {
    var pivotIdx = j;
    var pivot = clone[permutation[j]][j];

    while (Math.abs(pivot) < EPSILON && pivotIdx < size - 1) {
      pivotIdx++;
      pivot = clone[permutation[pivotIdx]][j];
    }

    if (Math.abs(pivot) < EPSILON) {
      throw new Error(SINGULAR_MATRIX);
    }

    if (j !== pivotIdx) {
      var temp = permutation[j];
      permutation[j] = permutation[pivotIdx];
      permutation[pivotIdx] = temp;
    }

    var pivotRow = permutation[j]; // the pivot is guaranteed to be non-zero

    for (var i = 0; i < size; i++) {
      var ith = permutation[i];

      if (i === j) {
        for (var k = 0; k < size; k++) {
          if (k === j) {
            clone[ith][k] = 1;
          }

          if (k > j) {
            clone[ith][k] /= pivot;
          }

          inv[ith][k] /= pivot;
        }

        pivot = 1;
      }

      if (i !== j && Math.abs(clone[ith][j]) >= EPSILON) {
        var factor = clone[ith][j] / pivot;

        for (var _k = 0; _k < size; _k++) {
          if (_k === j) {
            clone[ith][_k] = 0;
          }

          if (_k > j) {
            clone[ith][_k] -= factor * clone[pivotRow][_k];
          }

          inv[ith][_k] -= factor * inv[pivotRow][_k];
        }
      }
    }
  }

  for (var _i = 0; _i < size; _i++) {
    clone[_i] = inv[permutation[_i]];
  }

  return new this(clone);
}

;

function initPermutation(size) {
  var permutation = new Array(size);

  for (var i = 0; i < size; i++) {
    permutation[i] = i;
  }

  return permutation;
}

module.exports = inverse;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js ***!
  \***********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Calculates the product of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that is size-compatible with A
 * @returns {Matrix} The product of two Matrices
 */


function multiply(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Acol !== Brow) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrixA = A._matrix;
  var matrixB = B._matrix;
  var result = empty(Arow, Bcol);

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Bcol; j++) {
      result[i][j] = 0;

      for (var k = 0; k < Brow; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return new this(result);
}

;
module.exports = multiply;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX,
    INVALID_EXPONENT = _require.INVALID_EXPONENT;
/**
 * Calculates the power of any square matrix.
 * The algorithm is implemented recursively.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any square Matrix
 * @param {number} exponent - Any Non-negative integer
 * @returns {Matrix} The power of A
 */


function pow(A, exponent) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!A.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new Error(INVALID_EXPONENT);
  }

  var size = A.size()[0];

  if (exponent === 0) {
    return this.identity(size);
  }

  if (exponent === 1) {
    return this.clone(A);
  }

  if (exponent % 2 === 0) {
    var _temp = this.pow(A, exponent / 2);

    return this.multiply(_temp, _temp);
  }

  var temp = this.pow(A, (exponent - 1) / 2);
  return this.multiply(this.multiply(temp, temp), A);
}

;
module.exports = pow;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js ***!
  \***********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Calculates the difference of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The difference of two Matrices
 */


module.exports = function subtract(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      row2 = _B$size2[0],
      col2 = _B$size2[1];

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  var matrix1 = A._matrix;
  var matrix2 = B._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix1[i][j] - matrix2[i][j];
  });
};

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js"
/*!************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js ***!
  \************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Find the transpose of a matrix.
 * @memberof Matrix
 * @static
 * @param { Matrix } A - Any Matrix
 * @returns { Matrix } Returns transpose of A
 */


function transpose(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(col, row, function (i, j) {
    return matrix[j][i];
  });
}

;
module.exports = transpose;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM,
    SINGULAR_MATRIX = _require.SINGULAR_MATRIX,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculations the condition number of square Matrix
 * with respect to the choice of Matrix norm. 
 * If the Matrix is singular, returns Infinity.<br><br>
 * The condition number is not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - Type of Matrix norm
 * @returns {number} The condition number of Matrix
 */


function cond() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  try {
    var inverse = Matrix.inverse(this);
    return inverse.norm(p) * this.norm(p);
  } catch (error) {
    if (error.message === SINGULAR_MATRIX) {
      return Infinity;
    }

    throw error;
  }
}

;
module.exports = cond;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/det.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/det.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable prefer-destructuring */
var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the determinant of square Matrix.
 * If the Matrix size is larger than 3, it calculates the determinant using
 * LU decomposition, otherwise, using Leibniz Formula.<br><br>
 * The determinant is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} Returns the determinant of square matrirx
 */


function det() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._det !== undefined) {
    return this._det;
  }

  var matrix = this._matrix;
  var size = matrix.length;

  if (size === 0) {
    this._det = 1;
    return 1; // the determinant of 0x0 matrix must be 1
  }

  if (size === 1) {
    this._det = matrix[0][0];
    return this._det;
  }

  if (size === 2) {
    this._det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return this._det;
  }

  if (size === 3) {
    this._det = matrix[0][0] * matrix[1][1] * matrix[2][2] + matrix[0][1] * matrix[1][2] * matrix[2][0] + matrix[0][2] * matrix[1][0] * matrix[2][1] - matrix[0][2] * matrix[1][1] * matrix[2][0] - matrix[0][1] * matrix[1][0] * matrix[2][2] - matrix[0][0] * matrix[1][2] * matrix[2][1];
    return this._det;
  }

  var _Matrix$LU = Matrix.LU(this, true),
      _Matrix$LU2 = _slicedToArray(_Matrix$LU, 2),
      P = _Matrix$LU2[0],
      LU = _Matrix$LU2[1];

  var matrixLU = LU._matrix; // count whether the number of permutations <swap> is odd or even
  // O(n^2)

  var swap = 0;

  for (var i = 0; i < size; i++) {
    if (P[i] === i) {
      continue;
    }

    while (P[i] !== i) {
      var target = P[i];
      P[i] = P[target];
      P[target] = target;
      swap++;
    }
  }

  var result = 1;

  for (var _i2 = 0; _i2 < size; _i2++) {
    result *= matrixLU[_i2][_i2];
  }

  if (swap % 2 === 1) {
    this._det = result * -1;
    return this._det;
  }

  this._det = result;
  return result;
}

;
module.exports = det;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js ***!
  \**************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-param-reassign */
// reference: https://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf
var Complex = __webpack_require__(/*! @rayyamhk/complex */ "./node_modules/@rayyamhk/complex/lib/index.js");

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the eigenvalues of any square Matrix using QR Algorithm.<br><br>
 * 
 * The eigenvalues can be either real number or complex number.
 * Note that all eigenvalues are instance of Complex,
 * for more details please visit [Complex.js]{@link https://rayyamhk.github.io/Complex.js}.<br><br>
 * 
 * The eigenvalues are cached.
 * @memberof Matrix
 * @instance
 * @returns {Complex[]} Array of eigenvalues
 */


function eigenvalues() {
  if (!this.isSquare()) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._eigenvalues !== undefined) {
    return this._eigenvalues;
  }

  var size = this.size()[0];
  var values = [];
  var digit = this._digit;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  var clone = Matrix.clone(this)._matrix;

  var isConvergent = true; // flag

  var skip = false; // Transform matrix to Hessenberg matrix

  HouseholderTransform(clone, digit);

  for (var i = size - 1; i > 0; i--) {
    var divergenceCount = 0;
    var prev = void 0; // used to determine convergence
    // if obtains complex eigenvalues pair in previous iteration, skip current round

    if (skip) {
      skip = false;
      continue;
    }

    var shift = clone[size - 1][size - 1]; // eslint-disable-next-line no-constant-condition

    while (true) {
      if (!isConvergent) {
        // if the current eigenvalue is not real
        prev = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]).metric;
      } else {
        // if the current eigenvalue is real
        prev = Math.abs(clone[i][i - 1]);
      } // apply single shift


      for (var j = 0; j < size; j++) {
        clone[j][j] -= shift;
      } // Apply QR Algorithm


      HessenbergQR(clone, digit);

      for (var _j = 0; _j < size; _j++) {
        clone[_j][_j] += shift;
      }

      if (isConvergent && prev < Math.abs(clone[i][i - 1])) {
        divergenceCount++;
      } // if the current eigenvalue is real and the entry is almost ZERO => break;


      if (isConvergent && Math.abs(clone[i][i - 1]) < EPSILON) {
        values[i] = new Complex(clone[i][i]);
        break;
      } // if the current eigenvalues pair is complex, if the difference of the previous eiganvalues and the
      // eigenvalues of submatrix is almost ZERO => break


      var _size2Eigenvalues = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]),
          metric = _size2Eigenvalues.metric,
          eigen1 = _size2Eigenvalues.eigen1,
          eigen2 = _size2Eigenvalues.eigen2;

      if (!isConvergent && Math.abs(prev - metric) < EPSILON) {
        isConvergent = true; // re-initialize

        skip = true;
        var re1 = eigen1.re,
            im1 = eigen1.im;
        var re2 = eigen2.re,
            im2 = eigen2.im;
        values[i] = new Complex(re1, im1);
        values[i - 1] = new Complex(re2, im2);
        break;
      } // if the entry doesn't converge => complex eigenvalues pair


      if (divergenceCount > 3) {
        isConvergent = false;
      }
    }
  }

  if (!skip) {
    values[0] = new Complex(clone[0][0]);
  }

  this._eigenvalues = values;
  return values;
}

;

function HouseholderTransform(A, digit) {
  var size = A.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);

  for (var j = 0; j < size - 2; j++) {
    var xNorm = 0;
    var u = new Array(size - j - 1);

    for (var i = j + 1; i < size; i++) {
      var entry = A[i][j];
      xNorm += Math.pow(entry, 2);
      u[i - j - 1] = entry;
    }

    xNorm = Math.sqrt(xNorm);

    if (Math.abs(xNorm) < EPSILON) {
      continue;
    }

    if (u[0] >= 0) {
      u[0] += xNorm;
    } else {
      u[0] -= xNorm;
    } // Make 'u' unit vector


    var uNorm = 0;

    for (var _i = 0; _i < u.length; _i++) {
      uNorm += Math.pow(u[_i], 2);
    }

    uNorm = Math.sqrt(uNorm);

    for (var _i2 = 0; _i2 < u.length; _i2++) {
      u[_i2] /= uNorm;
    } // update the matrix, multiply P from left


    for (var n = j; n < size; n++) {
      // column
      var v = new Array(size - j - 1);

      for (var m = j + 1; m < size; m++) {
        v[m - j - 1] = A[m][n];
      }

      var scaler = 0;

      for (var _m = 0; _m < v.length; _m++) {
        scaler += v[_m] * u[_m];
      }

      scaler *= 2;

      for (var _m2 = j + 1; _m2 < size; _m2++) {
        // row
        if (n === j && _m2 !== j + 1) {
          A[_m2][n] = 0;
        } else {
          A[_m2][n] = v[_m2 - j - 1] - scaler * u[_m2 - j - 1];
        }
      }
    } // update the matrix, multiply P from right


    for (var _m3 = 0; _m3 < size; _m3++) {
      // row
      var _v = new Array(size - j - 1);

      for (var _n = j + 1; _n < size; _n++) {
        _v[_n - j - 1] = A[_m3][_n];
      }

      var _scaler = 0;

      for (var _n2 = 0; _n2 < _v.length; _n2++) {
        _scaler += _v[_n2] * u[_n2];
      }

      _scaler *= 2;

      for (var _n3 = j + 1; _n3 < size; _n3++) {
        // column
        A[_m3][_n3] = _v[_n3 - j - 1] - _scaler * u[_n3 - j - 1];
      }
    }
  }
}

function HessenbergQR(H, digit) {
  var size = H.length;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var sincos = new Array(size - 1);

  for (var i = 0; i < size - 1; i++) {
    var a = H[i][i];
    var c = H[i + 1][i];
    var norm = Math.sqrt(Math.pow(a, 2) + Math.pow(c, 2));

    if (norm < EPSILON) {
      continue;
    }

    var cos = a / norm;
    var sin = c * -1 / norm;
    sincos[i] = [sin, cos];
    var row1 = new Array(size - i);
    var row2 = new Array(size - i);

    for (var j = i; j < size; j++) {
      row1[j - i] = H[i][j];
      row2[j - i] = H[i + 1][j];
    }

    for (var _j2 = i; _j2 < size; _j2++) {
      H[i][_j2] = cos * row1[_j2 - i] + sin * -1 * row2[_j2 - i];

      if (i === _j2) {
        H[i + 1][_j2] = 0;
      } else {
        H[i + 1][_j2] = sin * row1[_j2 - i] + cos * row2[_j2 - i];
      }
    }
  }

  for (var _j3 = 0; _j3 < size - 1; _j3++) {
    if (!sincos[_j3]) {
      continue;
    }

    var _sincos$_j = _slicedToArray(sincos[_j3], 2),
        _sin = _sincos$_j[0],
        _cos = _sincos$_j[1];

    var col1 = new Array(_j3 + 2);
    var col2 = new Array(_j3 + 2);

    for (var _i3 = 0; _i3 <= _j3 + 1; _i3++) {
      col1[_i3] = H[_i3][_j3];
      col2[_i3] = H[_i3][_j3 + 1];
    }

    for (var _i4 = 0; _i4 <= _j3 + 1; _i4++) {
      H[_i4][_j3] = col1[_i4] * _cos - col2[_i4] * _sin;
      H[_i4][_j3 + 1] = col1[_i4] * _sin + col2[_i4] * _cos;
    }
  }
} // find the eigenvalues of 2x2 matrix


function size2Eigenvalues(e11, e12, e21, e22) {
  var b = (e11 + e22) * -1;
  var c = e11 * e22 - e21 * e12;
  var delta = Math.pow(b, 2) - 4 * c;
  var re1;
  var im1;
  var re2;
  var im2;

  if (delta >= 0) {
    im1 = 0;
    im2 = 0;

    if (b >= 0) {
      re1 = (b * -1 - Math.sqrt(delta)) / 2;
    } else {
      re1 = (b * -1 + Math.sqrt(delta)) / 2;
    }

    re2 = c / re1;
  } else {
    re1 = -b / 2;
    re2 = re1;
    im1 = Math.sqrt(delta * -1) / 2;
    im2 = im1 * -1;
  }

  return {
    metric: Math.sqrt(Math.pow(re1, 2) + Math.pow(im1, 2)),
    eigen1: {
      re: re1,
      im: im1
    },
    eigen2: {
      re: re2,
      im: im2
    }
  };
}

module.exports = eigenvalues;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_P_NORM = _require.INVALID_P_NORM;
/**
 * Calculates the Matrix norm of any Matrix with respect to the choice of norm.<br><br>
 * 
 * 1-norm: Maximum absolute column sum of the Matrix.<br>
 * 2-norm: The largest singular value of Matrix.<br>
 * Infinity-norm: Maximum absolute row sum of the Matrix.<br>
 * Frobenius-norm: Euclidean norm invloving all entries.<br><br>
 * 
 * The norms are not cached.
 * @memberof Matrix
 * @instance
 * @param {(1|2|Infinity|'F')} p - The choice of Matrix norm
 * @returns {number} The norm of the Matrix.
 */


function norm() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
    throw new Error(INVALID_P_NORM);
  }

  var matrix = this._matrix;
  var result = 0;

  if (p === 1) {
    // max of column sum
    for (var j = 0; j < col; j++) {
      var columnSum = 0;

      for (var i = 0; i < row; i++) {
        columnSum += Math.abs(matrix[i][j]);
      }

      if (columnSum > result) {
        result = columnSum;
      }
    }

    return result;
  } // largest singular value


  if (p === 2) {
    var transpose = Matrix.transpose(this);
    var M = Matrix.multiply(transpose, this);
    var eigenvalues = M.eigenvalues();

    for (var _i2 = 0; _i2 < eigenvalues.length; _i2++) {
      var value = eigenvalues[_i2].getModulus();

      if (value > result) {
        result = value;
      }
    }

    return Math.sqrt(result);
  }

  if (p === Infinity) {
    // max of row sum
    for (var _i3 = 0; _i3 < row; _i3++) {
      var rowSum = 0;

      for (var _j = 0; _j < col; _j++) {
        rowSum += Math.abs(matrix[_i3][_j]);
      }

      if (rowSum > result) {
        result = rowSum;
      }
    }

    return result;
  } // F


  for (var _i4 = 0; _i4 < row; _i4++) {
    for (var _j2 = 0; _j2 < col; _j2++) {
      result += Math.pow(matrix[_i4][_j2], 2);
    }
  }

  return Math.sqrt(result);
}

;
module.exports = norm;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js ***!
  \**********************************************************************/
(module) {

"use strict";


/**
 * Calculates the nullity of any Matrix, which is the dimension
 * of the nullspace.<br><br>
 * 
 * The nullity is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The nullity of the matrix
 */
function nullity() {
  if (this._nullity !== undefined) {
    return this._nullity;
  }

  var col = this.size()[1];
  var rank = this.rank();
  this._nullity = col - rank;
  return this._nullity;
}

;
module.exports = nullity;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");
/**
 * Calculates the rank of any Matrix,
 * which is the dimension of the row space.<br><br>
 * 
 * The rank is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The rank of the Matrix
 */


function rank() {
  if (this._rank !== undefined) {
    return this._rank;
  }

  var EPSILON = 1 / (Math.pow(10, this._digit) * 2);
  var R = Matrix.QR(this)[1];
  var matrixR = R._matrix;

  var _R$size = R.size(),
      _R$size2 = _slicedToArray(_R$size, 2),
      row = _R$size2[0],
      col = _R$size2[1];

  if (row === 0) {
    this._rank = 1;
    return 1;
  }

  var rk = 0;

  for (var i = 0; i < row; i++) {
    for (var j = i; j < col; j++) {
      if (Math.abs(matrixR[i][j]) >= EPSILON) {
        rk++;
        break;
      }
    }
  }

  this._rank = rk;
  return rk;
}

;
module.exports = rank;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/size.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/size.js ***!
  \*******************************************************************/
(module) {

"use strict";


/**
 * Calculates the size of any Matrix,
 * which is in the form of [row, column].<br><br>
 * 
 * The size of Matrix is cached.
 * @memberof Matrix
 * @instance
 * @returns {number[]} The number of rows and columns of a Matrix
 */
function size() {
  if (this._size !== undefined) {
    return this._size;
  }

  var A = this._matrix;

  if (A.length === 0) {
    this._size = [0, 0];
    return this._size;
  }

  this._size = [A.length, A[0].length];
  return this._size;
}

;
module.exports = size;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js"
/*!********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Calculates the trace of any square Matrix,
 * which is the sum of all entries on the main diagonal.<br><br>
 * 
 * The trace is cached.
 * @memberof Matrix
 * @instance
 * @returns {number} The trace of the square Matrix.
 */


function trace() {
  var isSquare = this._isSquare !== undefined ? this._isSquare : this.isSquare();

  if (!isSquare) {
    throw new Error(INVALID_SQUARE_MATRIX);
  }

  if (this._trace !== undefined) {
    return this._trace;
  }

  var A = this._matrix;
  var size = A.length;
  var tr = 0;

  for (var i = 0; i < size; i++) {
    tr += A[i][i];
  }

  this._trace = tr;
  return tr;
}

;
module.exports = trace;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js"
/*!************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js ***!
  \************************************************************************/
(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is diagonal or not.<br><br>
 * 
 * Diagonal Matrix is a Matrix in which the entries outside the main diagonal
 * are all zero. Note that the term diagonal refers to rectangular diagonal.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns rue if the Matrix is diagonal Matrix
 */
function isDiagonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isDiagonal !== undefined) {
    return this._isDiagonal;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    this._isDiagonal = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
        this.isDiagonal = false;
        return false;
      }
    }
  }

  this._isDiagonal = true;
  return true;
}

;
module.exports = isDiagonal;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js ***!
  \*******************************************************************************/
(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is lower triangular Matrix or not.<br><br>
 * 
 * Lower triangular Matrix is a Matrix in which all the entries
 * above the main diagonal are zero. Note that it can be applied
 * to any non-square Matrix.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is lower triangular
 */
function isLowerTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isLowerTriangular !== undefined) {
    return this._isLowerTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isLowerTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = i + 1; j < col; j++) {
      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isLowerTriangular = false;
        return false;
      }
    }
  }

  this._isLowerTriangular = true;
  return true;
}

;
module.exports = isLowerTriangular;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js ***!
  \**************************************************************************/
(module) {

"use strict";


/**
 * Determines whether a square Matrix is orthogonal or not.<br><br>
 * 
 * Orthogonal Matrix is a Matrix in which all rows and columns are
 * orthonormal vectors.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is orthogonal
 */
function isOrthogonal() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isOrthogonal !== undefined) {
    return this._isOrthogonal;
  }

  if (!this.isSquare()) {
    this._isOrthogonal = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = i; j < size; j++) {
      var entry = 0;

      for (var k = 0; k < size; k++) {
        entry += A[i][k] * A[j][k];
      }

      if (i === j && Math.abs(entry - 1) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }

      if (i !== j && Math.abs(entry) >= EPSILON) {
        this._isOrthogonal = false;
        return false;
      }
    }
  }

  this._isOrthogonal = true;
  return true;
}

;
module.exports = isOrthogonal;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js ***!
  \*****************************************************************************/
(module) {

"use strict";


/**
 * Determines whether a square Matrix is skew symmetric or not.<br><br>
 * 
 * Skew symmetric Matrix is a square Matrix whose transpose equals its negative.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is skew symmetric
 */
function isSkewSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSkewSymmetric !== undefined) {
    return this._isSkewSymmetric;
  }

  if (!this.isSquare()) {
    this._isSkewSymmetric = false;
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  if (size === 0) {
    this._isSkewSymmetric = true;
    return true; // []
  }

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < i; j++) {
      if (Math.abs(A[i][j] + A[j][i]) >= EPSILON) {
        this._isSkewSymmetric = false;
        return false;
      }
    }
  }

  this._isSkewSymmetric = true;
  return true;
}

;
module.exports = isSkewSymmetric;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js"
/*!**********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js ***!
  \**********************************************************************/
(module) {

"use strict";


/**
 * Determines whether a Matrix is square or not.<br><br>
 * 
 * Square Matrix is a Matrix with same number of rows and columns.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @returns {boolean} Returns true if the Matrix is square
 */
function isSquare() {
  if (this._isSquare !== undefined) {
    return this._isSquare;
  }

  var A = this._matrix;

  if (A.length === 0) {
    // 0x0 matrix
    this._isSquare = true;
    return true;
  }

  this._isSquare = A.length === A[0].length;
  return this._isSquare;
}

;
module.exports = isSquare;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js ***!
  \*************************************************************************/
(module) {

"use strict";


/**
 * Determines whether a square Matrix is symmetric or not.<br><br>
 * 
 * Symmetric Matrix is a square Matrix that is equal to its transpose.<br><br>
 * 
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the square Matrix is symmetric
 */
function isSymmetric() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isSymmetric !== undefined) {
    return this._isSymmetric;
  }

  if (!this.isSquare()) {
    return false;
  }

  var A = this._matrix;
  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var size = A.length;

  for (var i = 0; i < size; i++) {
    for (var j = 0; j <= i; j++) {
      if (Math.abs(A[i][j] - A[j][i]) >= EPSILON) {
        this._isSymmetric = false;
        return false;
      }
    }
  }

  this._isSymmetric = true;
  return true;
}

;
module.exports = isSymmetric;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js ***!
  \*******************************************************************************/
(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Determines whether a Matrix is upper triangular Matrix or not.<br><br>
 * 
 * Upper triangular Matrix is a Matrix in which all the entries below the
 * main diagonal are zero. Note that it can be applied to any non-square Matrix.<br><br>
 *  
 * The result is cached.
 * @memberof Matrix
 * @instance
 * @param {number} [digit=8] - Number of significant digits
 * @returns {boolean} Returns true if the Matrix is upper triangular
 */
function isUpperTriangular() {
  var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

  if (this._isUpperTriangular !== undefined) {
    return this._isUpperTriangular;
  }

  var EPSILON = 1 / (Math.pow(10, digit) * 2);
  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  if (row === 0) {
    // []
    this._isUpperTriangular = true;
    return true;
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (i <= j) {
        continue;
      }

      if (Math.abs(A[i][j]) >= EPSILON) {
        this._isUpperTriangular = false;
        return false;
      }
    }
  }

  this._isUpperTriangular = true;
  return true;
}

;
module.exports = isUpperTriangular;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js"
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a copy of Matrix. Note that it resets the cached data.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {Matrix} Copy of A
 */


function clone(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return matrix[i][j];
  });
}

;
module.exports = clone;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/column.js"
/*!****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/column.js ***!
  \****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the column of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid column index
 * @returns {Matrix} Column of A
 */


function column(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= c) {
    throw new Error(OVERFLOW_COLUMN);
  }

  var matrix = A._matrix;
  return this.generate(r, 1, function (i) {
    return matrix[i][index];
  });
}

;
module.exports = column;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js"
/*!**************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Matrix = __webpack_require__(/*! ../.. */ "./node_modules/@rayyamhk/matrix/lib/index.js");

var isNumber = __webpack_require__(/*! ../../util/isNumber */ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ARRAY = _require.INVALID_ARRAY,
    EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES = _require.EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES,
    INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
/**
 * Generates diagonal Matrix if the argument is an array of numbers,
 * generates block diagonal Matrix if the argument is an array of Matrices.
 * @memberof Matrix
 * @static
 * @param {(number[]|Matrix[])} values - Array of numbers or Matrices
 * @returns {Matrix} Block diagonal Matrix
 */


function diag(values) {
  if (!Array.isArray(values)) {
    throw new Error(INVALID_ARRAY);
  }

  var argsNum = values.length;
  var variant;

  for (var i = 0; i < argsNum; i++) {
    var entry = values[i];

    if (!isNumber(entry) && !(entry instanceof Matrix)) {
      throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
    }

    if (isNumber(entry)) {
      if (!variant) {
        variant = 'number';
        continue;
      }

      if (variant !== 'number') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    } else {
      if (!entry.isSquare()) {
        throw new Error(INVALID_SQUARE_MATRIX);
      }

      if (!variant) {
        variant = 'square';
        continue;
      }

      if (variant !== 'square') {
        throw new Error(EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES);
      }
    }
  } // HERE: variant should be either 'number' or 'square'


  if (variant === 'number') {
    return Matrix.generate(argsNum, argsNum, function (i, j) {
      if (i === j) {
        return values[i];
      }

      return 0;
    });
  } // Guaranteed that [values] is a list of square matrices


  var size = 0;
  var temp = new Array(argsNum);

  for (var _i = 0; _i < argsNum; _i++) {
    var _len = values[_i].size()[0];

    size += _len;
    temp[_i] = _len;
  }

  var idx = 0;
  var start = 0;
  var len = temp[idx];
  return Matrix.generate(size, size, function (i, j) {
    if (i - start === len && j - start === len) {
      start += len;
      idx++;
    }

    var ith = i - start; // ith < 0 if below main diagonal

    var jth = j - start; // jth < 0 if above main diagonal
    // skip 0x0 matrices

    len = temp[idx];

    while (len === 0) {
      idx++;
      len = temp[idx];
    }

    if (ith < len && ith >= 0 && jth < len && jth >= 0) {
      return values[idx]._matrix[ith][jth];
    }

    return 0;
  });
}

;
module.exports = diag;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js ***!
  \*********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * This callback applies on each entry of a Matrix
 * @callback entryCallback
 * @param {number} entry - Entry of a Matrix
 * @returns {number} New entry value
 */

/**
 * Applys a function over each entry of a Matrix and returns
 * a new copy of the new Matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {entryCallback} cb - Callback function which applies on each entry of A
 * @returns {Matrix} A copy of new Matrix
 */


function elementwise(A, cb) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var matrix = A._matrix;
  return this.generate(row, col, function (i, j) {
    return cb(matrix[i][j]);
  });
}

;
module.exports = elementwise;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js"
/*!***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_INDEX = _require.OVERFLOW_INDEX;
/**
 * Gets the entry of a Matrix.
 * @memberof Matrix
 * @instance
 * @param {number} row - Any valid row index
 * @param {number} col - Any valid column index
 * @returns {number} Entry of the Matrix
 */


function entry(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var A = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      r = _this$size2[0],
      c = _this$size2[1];

  if (row >= r || col >= c) {
    throw new Error(OVERFLOW_INDEX);
  }

  return A[row][col];
}

;
module.exports = entry;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js ***!
  \*****************************************************************/
(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Flatten the matrix to an array
 * @memberof Matrix
 * @instance
 * @returns {Array} A flatten array
 */
function flatten() {
  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  var length = row * col;
  var arr = new Array(length);

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      arr[i * col + j] = this._matrix[i][j];
    }
  }

  return arr;
}

;
module.exports = flatten;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
/**
 * Generate a matrix from an array with compatible dimensions 
 * @memberof Matrix
 * @static
 * @param {Array} arr - Source array
 * @param {number} row - Row of the matrix
 * @param {number} col - Column of the matrix
 * @returns {Matrix} Matrix
 */


function fromArray(arr, row, col) {
  if (row * col !== arr.length) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  return this.generate(row, col, function (i, j) {
    return arr[i * col + j];
  });
}

;
module.exports = fromArray;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var empty = __webpack_require__(/*! ../../util/empty */ "./node_modules/@rayyamhk/matrix/lib/util/empty.js");
/**
 * This callback generates each entry of a Matrix
 * @callback generateCallback
 * @param {number} i - The i-th row of Matrix 
 * @param {number} j - The j-th column of Matrix 
 * @returns {number} Entry of Matrix
 */

/**
 * Generates a Matrix which entries are the returned value of callback function.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of Matrix
 * @param {number} col - Number of columns of Matrix
 * @param {generateCallback} cb - Callback function which takes row and column as arguments
 * and generates the corresponding entry
 * @returns {Matrix} - Generated Matrix
 */


function generate(row, col, cb) {
  var matrix = empty(row, col);

  if (row === 0 || col === 0) {
    return new this([]);
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      matrix[i][j] = cb(i, j);
    }
  }

  return new this(matrix);
}

;
module.exports = generate;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the entries on the main diagonal.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {number[]} Array of entries of A on the main diagonal
 */


function getDiag(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var size = Math.min(row, col);
  var matrix = A._matrix;
  var diags = new Array(size);

  for (var i = 0; i < size; i++) {
    diags[i] = matrix[i][i];
  }

  return diags;
}

;
module.exports = getDiag;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js ***!
  \*************************************************************************/
(module) {

"use strict";


/**
 * Generates a random Matrix.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of a Matrix
 * @param {number} col - Number of columns of a Matrix
 * @param {number} min - Lower bound of each entry
 * @param {number} max - Upper bound of each entry
 * @param {number} toFixed - Number of decimal places
 * @returns {Matrix} Generated random Matrix
 */
function getRandomMatrix(row, col) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var toFixed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return this.generate(row, col, function () {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed));
  });
}

;
module.exports = getRandomMatrix;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js ***!
  \******************************************************************/
(module) {

"use strict";


/**
 * Generates identity Matrix with given size.
 * @memberof Matrix
 * @static
 * @param {number} size - The size of Matrix
 * @returns {Matrix} Identity Matrix
 */
function identity(size) {
  return this.generate(size, size, function (i, j) {
    if (i === j) {
      return 1;
    }

    return 0;
  });
}

;
module.exports = identity;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Determines whether two Matrices are considered as equal.<br><br>
 * 
 * The test criterion is Math.abs(x - y) < 1 / (10 ** digit * 2).
 * For default value 5, it should be 5e-5.
 * That means if the difference of two numbers is less than 5e-5,
 * they are considered as same value.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix
 * @param {number} digit - Number of significant digits
 * @returns {boolean} Returns true if two Matrices are considered as same
 */


function isEqual(A, B) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      Arow = _A$size2[0],
      Acol = _A$size2[1];

  var _B$size = B.size(),
      _B$size2 = _slicedToArray(_B$size, 2),
      Brow = _B$size2[0],
      Bcol = _B$size2[1];

  if (Arow !== Brow || Acol !== Bcol) {
    return false;
  }

  var EPISILON = 1 / (Math.pow(10, digit) * 2);
  var matrixA = A._matrix;
  var matrixB = B._matrix;

  for (var i = 0; i < Arow; i++) {
    for (var j = 0; j < Acol; j++) {
      if (Math.abs(matrixA[i][j] - matrixB[i][j]) >= EPISILON) {
        return false;
      }
    }
  }

  return true;
}

;
module.exports = isEqual;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/row.js"
/*!*************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/row.js ***!
  \*************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Gets the row of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid row index
 * @returns {Matrix} Row of A
 */


function row(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      r = _A$size2[0],
      c = _A$size2[1];

  if (index >= r) {
    throw new Error(OVERFLOW_ROW);
  }

  var matrix = A._matrix;
  return this.generate(1, c, function (i, j) {
    return matrix[index][j];
  });
}

;
module.exports = row;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! ../../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX,
    EXPECTED_STRING_NUMBER_AT_POS_1_2 = _require.EXPECTED_STRING_NUMBER_AT_POS_1_2,
    INVALID_ROW = _require.INVALID_ROW,
    INVALID_COLUMN = _require.INVALID_COLUMN,
    OVERFLOW_ROW = _require.OVERFLOW_ROW,
    INVALID_ROWS_EXPRESSION = _require.INVALID_ROWS_EXPRESSION,
    INVALID_COLUMNS_EXPRESSION = _require.INVALID_COLUMNS_EXPRESSION,
    OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN;
/**
 * Generates a submatrix of a matrix.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any matrix
 * @param {string|number} rows - Rows expression
 * @param {string|number} cols - Columns expression
 * @returns {Matrix} Submatrix of A
 */


function submatrix(A, rows, cols) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  var arg1Type = _typeof(rows);

  var arg2Type = _typeof(cols);

  if (arg1Type !== 'string' && arg1Type !== 'number' || arg2Type !== 'string' && arg2Type !== 'number') {
    throw new Error(EXPECTED_STRING_NUMBER_AT_POS_1_2);
  }

  var _A$size = A.size(),
      _A$size2 = _slicedToArray(_A$size, 2),
      row = _A$size2[0],
      col = _A$size2[1];

  var rowStart;
  var rowEnd;
  var colStart;
  var colEnd;

  if (arg1Type === 'number') {
    if (!Number.isInteger(rows) || rows < 0) {
      throw new Error(INVALID_ROW);
    }

    if (rows >= row) {
      throw new Error(OVERFLOW_ROW);
    }

    rowStart = rows;
    rowEnd = rows;
  } else {
    // string
    var arg = rows.split(':');

    if (arg.length !== 2) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }

    var _arg = _slicedToArray(arg, 2),
        r1 = _arg[0],
        r2 = _arg[1];

    if (r1 === '') {
      rowStart = 0;
    } else {
      var r = Number(r1);

      if (!Number.isInteger(r) || r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowStart = r;
    }

    if (r2 === '') {
      rowEnd = row - 1;
    } else {
      var _r = Number(r2);

      if (!Number.isInteger(_r) || _r < 0) {
        throw new Error(INVALID_ROW);
      }

      if (_r >= row) {
        throw new Error(OVERFLOW_ROW);
      }

      rowEnd = _r;
    }

    if (rowStart > rowEnd) {
      throw new Error(INVALID_ROWS_EXPRESSION);
    }
  }

  if (arg2Type === 'number') {
    if (!Number.isInteger(cols) || cols < 0) {
      throw new Error(INVALID_COLUMN);
    }

    if (cols >= col) {
      throw new Error(OVERFLOW_COLUMN);
    }

    colStart = cols;
    colEnd = cols;
  } else {
    // string
    var _arg2 = cols.split(':');

    if (_arg2.length !== 2) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }

    var _arg3 = _slicedToArray(_arg2, 2),
        c1 = _arg3[0],
        c2 = _arg3[1];

    if (c1 === '') {
      colStart = 0;
    } else {
      var c = Number(c1);

      if (!Number.isInteger(c) || c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colStart = c;
    }

    if (c2 === '') {
      colEnd = col - 1;
    } else {
      var _c = Number(c2);

      if (!Number.isInteger(_c) || _c < 0) {
        throw new Error(INVALID_COLUMN);
      }

      if (_c >= col) {
        throw new Error(OVERFLOW_COLUMN);
      }

      colEnd = _c;
    }

    if (colStart > colEnd) {
      throw new Error(INVALID_COLUMNS_EXPRESSION);
    }
  }

  var matrix = A._matrix;
  var subRow = rowEnd - rowStart + 1;
  var subCol = colEnd - colStart + 1;
  var subMatrix = new Array(subRow);

  for (var i = rowStart; i <= rowEnd; i++) {
    var newRow = new Array(subCol);

    for (var j = colStart; j <= colEnd; j++) {
      newRow[j - colStart] = matrix[i][j];
    }

    subMatrix[i - rowStart] = newRow;
  }

  return new this(subMatrix);
}

;
module.exports = submatrix;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js"
/*!******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js ***!
  \******************************************************************/
(module) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Gets the stringified Matrix
 * @memberof Matrix
 * @instance
 * @returns {string} Stringified Matrix
 */
function toString() {
  var matrix = this._matrix;

  var _this$size = this.size(),
      _this$size2 = _slicedToArray(_this$size, 2),
      row = _this$size2[0],
      col = _this$size2[1];

  var str = '';

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      str += matrix[i][j].toString();

      if (j !== col - 1) {
        str += ' ';
      }
    }

    if (i !== row - 1) {
      str += '\n';
    }
  }

  return str;
}

;
module.exports = toString;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js"
/*!**************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js ***!
  \**************************************************************/
(module) {

"use strict";


/**
 * Generates a zero Matrix
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of the Matrix
 * @param {number} col - Number of columns of the Matrix
 * @returns {Matrix} Zero Matrix
 */
function zero(row, col) {
  if (col === undefined) {
    return this.generate(row, row, function () {
      return 0;
    });
  }

  return this.generate(row, col, function () {
    return 0;
  });
}

;
module.exports = zero;

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/index.js"
/*!****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/index.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isMatrix = __webpack_require__(/*! ./util/isMatrix */ "./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js");

var _require = __webpack_require__(/*! ./Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_MATRIX = _require.INVALID_MATRIX;
/**
 * Creates a new Matrix
 * @namespace Matrix
 * @class
 * @param {number[][]} A - Two dimensional array where
 * A[i][j] represents the i-th row and j-th column of a matrix
 */


function Matrix(A) {
  if (!isMatrix(A)) {
    throw new Error(INVALID_MATRIX);
  }

  this._matrix = A;
  this._digit = 8;
}

module.exports = Matrix; // structure

Matrix.prototype.isDiagonal = __webpack_require__(/*! ./core/structure/isDiagonal */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js");
Matrix.prototype.isSkewSymmetric = __webpack_require__(/*! ./core/structure/isSkewSymmetric */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js");
Matrix.prototype.isSquare = __webpack_require__(/*! ./core/structure/isSquare */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js");
Matrix.prototype.isSymmetric = __webpack_require__(/*! ./core/structure/isSymmetric */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js");
Matrix.prototype.isLowerTriangular = __webpack_require__(/*! ./core/structure/isLowerTriangular */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js");
Matrix.prototype.isUpperTriangular = __webpack_require__(/*! ./core/structure/isUpperTriangular */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js");
Matrix.prototype.isOrthogonal = __webpack_require__(/*! ./core/structure/isOrthogonal */ "./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js"); // property

Matrix.prototype.cond = __webpack_require__(/*! ./core/properties/cond */ "./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js");
Matrix.prototype.det = __webpack_require__(/*! ./core/properties/det */ "./node_modules/@rayyamhk/matrix/lib/core/properties/det.js");
Matrix.prototype.eigenvalues = __webpack_require__(/*! ./core/properties/eigenvalues */ "./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js");
Matrix.prototype.nullity = __webpack_require__(/*! ./core/properties/nullity */ "./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js");
Matrix.prototype.norm = __webpack_require__(/*! ./core/properties/norm */ "./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js");
Matrix.prototype.rank = __webpack_require__(/*! ./core/properties/rank */ "./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js");
Matrix.prototype.size = __webpack_require__(/*! ./core/properties/size */ "./node_modules/@rayyamhk/matrix/lib/core/properties/size.js");
Matrix.prototype.trace = __webpack_require__(/*! ./core/properties/trace */ "./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js"); // operations

Matrix.add = __webpack_require__(/*! ./core/operations/add */ "./node_modules/@rayyamhk/matrix/lib/core/operations/add.js");
Matrix.inverse = __webpack_require__(/*! ./core/operations/inverse */ "./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js");
Matrix.multiply = __webpack_require__(/*! ./core/operations/multiply */ "./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js");
Matrix.pow = __webpack_require__(/*! ./core/operations/pow */ "./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js");
Matrix.subtract = __webpack_require__(/*! ./core/operations/subtract */ "./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js");
Matrix.transpose = __webpack_require__(/*! ./core/operations/transpose */ "./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js"); // Linear-equations

Matrix.backward = __webpack_require__(/*! ./core/linear-equations/backward */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js");
Matrix.forward = __webpack_require__(/*! ./core/linear-equations/forward */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js");
Matrix.solve = __webpack_require__(/*! ./core/linear-equations/solve */ "./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js"); // decompositions

Matrix.LU = __webpack_require__(/*! ./core/decompositions/LU */ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js");
Matrix.QR = __webpack_require__(/*! ./core/decompositions/QR */ "./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js"); // utils

Matrix.clone = __webpack_require__(/*! ./core/utils/clone */ "./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js");
Matrix.column = __webpack_require__(/*! ./core/utils/column */ "./node_modules/@rayyamhk/matrix/lib/core/utils/column.js");
Matrix.diag = __webpack_require__(/*! ./core/utils/diag */ "./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js");
Matrix.elementwise = __webpack_require__(/*! ./core/utils/elementwise */ "./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js");
Matrix.generate = __webpack_require__(/*! ./core/utils/generate */ "./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js");
Matrix.getDiag = __webpack_require__(/*! ./core/utils/getDiag */ "./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js");
Matrix.getRandomMatrix = __webpack_require__(/*! ./core/utils/getRandomMatrix */ "./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js");
Matrix.identity = __webpack_require__(/*! ./core/utils/identity */ "./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js");
Matrix.isEqual = __webpack_require__(/*! ./core/utils/isEqual */ "./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js");
Matrix.row = __webpack_require__(/*! ./core/utils/row */ "./node_modules/@rayyamhk/matrix/lib/core/utils/row.js");
Matrix.submatrix = __webpack_require__(/*! ./core/utils/submatrix */ "./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js");
Matrix.zero = __webpack_require__(/*! ./core/utils/zero */ "./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js");
Matrix.fromArray = __webpack_require__(/*! ./core/utils/fromArray */ "./node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js");
Matrix.prototype.flatten = __webpack_require__(/*! ./core/utils/flatten */ "./node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js");
Matrix.prototype.entry = __webpack_require__(/*! ./core/utils/entry */ "./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js");
Matrix.prototype.toString = __webpack_require__(/*! ./core/utils/toString */ "./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js");

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/util/empty.js"
/*!*********************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/empty.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ../Error */ "./node_modules/@rayyamhk/matrix/lib/Error.js"),
    INVALID_ROW_COL = _require.INVALID_ROW_COL;

module.exports = function empty(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  if (row === 0 || col === 0) {
    return [];
  }

  var matrix = new Array(row);

  for (var i = 0; i < row; i++) {
    matrix[i] = new Array(col);
  }

  return matrix;
};

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js"
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isNumber = __webpack_require__(/*! ./isNumber */ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js");

module.exports = function isMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return false;
  }

  var height = matrix.length;

  if (height === 0) {
    return true; // [] represents empty matrix (0 x 0 matrix)
  }

  var firstRow = matrix[0];

  if (!Array.isArray(firstRow)) {
    return false;
  }

  var width = firstRow.length;

  if (width === 0) {
    return false; // [ [] ] is not allowed
  }

  for (var i = 0; i < height; i++) {
    var row = matrix[i];

    if (!Array.isArray(row) || row.length !== width) {
      return false;
    }

    for (var j = 0; j < width; j++) {
      if (!isNumber(row[j])) {
        return false;
      }
    }
  }

  return true;
};

/***/ },

/***/ "./node_modules/@rayyamhk/matrix/lib/util/isNumber.js"
/*!************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isNumber.js ***!
  \************************************************************/
(module) {

"use strict";


module.exports = function isNumber(_int) {
  return Number.isFinite(_int);
};

/***/ },

/***/ "./node_modules/matrix-inverse/matrix-inverse.js"
/*!*******************************************************!*\
  !*** ./node_modules/matrix-inverse/matrix-inverse.js ***!
  \*******************************************************/
(module) {

var Sylvester = {}

Sylvester.Matrix = function () {}

Sylvester.Matrix.create = function (elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function (n) {
  var els = [],
    i = n,
    j
  while (i--) {
    j = n
    els[i] = []
    while (j--) {
      els[i][j] = i === j ? 1 : 0
    }
  }
  return Sylvester.Matrix.create(els)
}

Sylvester.Matrix.prototype = {
  dup: function () {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function () {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function () {
    if (this.elements.length === 0) return Sylvester.Matrix.create([])
    var M = this.dup(),
      els
    var n = this.elements.length,
      i,
      j,
      np = this.elements[0].length,
      p
    for (i = 0; i < n; i++) {
      if (M.elements[i][i] === 0) {
        for (j = i + 1; j < n; j++) {
          if (M.elements[j][i] !== 0) {
            els = []
            for (p = 0; p < np; p++) {
              els.push(M.elements[i][p] + M.elements[j][p])
            }
            M.elements[i] = els
            break
          }
        }
      }
      if (M.elements[i][i] !== 0) {
        for (j = i + 1; j < n; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i]
          els = []
          for (p = 0; p < np; p++) {
            // Elements with column numbers up to an including the number of the
            // row that we're subtracting can safely be set straight to zero,
            // since that's the point of this routine and it avoids having to
            // loop over and correct rounding errors later
            els.push(
              p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier
            )
          }
          M.elements[j] = els
        }
      }
    }
    return M
  },

  determinant: function () {
    if (this.elements.length === 0) {
      return 1
    }
    if (!this.isSquare()) {
      return null
    }
    var M = this.toRightTriangular()
    var det = M.elements[0][0],
      n = M.elements.length
    for (var i = 1; i < n; i++) {
      det = det * M.elements[i][i]
    }
    return det
  },

  isSingular: function () {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function (matrix) {
    if (this.elements.length === 0) {
      return this.dup()
    }
    var M = matrix.elements || matrix
    if (typeof M[0][0] === 'undefined') {
      M = Sylvester.Matrix.create(M).elements
    }
    var T = this.dup(),
      cols = T.elements[0].length
    var i = T.elements.length,
      nj = M[0].length,
      j
    if (i !== M.length) {
      return null
    }
    while (i--) {
      j = nj
      while (j--) {
        T.elements[i][cols + j] = M[i][j]
      }
    }
    return T
  },

  inverse: function () {
    if (this.elements.length === 0) {
      return null
    }
    if (!this.isSquare() || this.isSingular()) {
      return null
    }
    var n = this.elements.length,
      i = n,
      j
    var M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular()
    var np = M.elements[0].length,
      p,
      els,
      divisor
    var inverse_elements = [],
      new_element
    // Sylvester.Matrix is non-singular so there will be no zeros on the
    // diagonal. Cycle through rows from last to first.
    while (i--) {
      // First, normalise diagonal elements to 1
      els = []
      inverse_elements[i] = []
      divisor = M.elements[i][i]
      for (p = 0; p < np; p++) {
        new_element = M.elements[i][p] / divisor
        els.push(new_element)
        // Shuffle off the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= n) {
          inverse_elements[i].push(new_element)
        }
      }
      M.elements[i] = els
      // Then, subtract this row from those above it to give the identity matrix
      // on the left hand side
      j = i
      while (j--) {
        els = []
        for (p = 0; p < np; p++) {
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
        }
        M.elements[j] = els
      }
    }
    return Sylvester.Matrix.create(inverse_elements)
  },

  setElements: function (els) {
    var i,
      j,
      elements = els.elements || els
    if (elements[0] && typeof elements[0][0] !== 'undefined') {
      i = elements.length
      this.elements = []
      while (i--) {
        j = elements[i].length
        this.elements[i] = []
        while (j--) {
          this.elements[i][j] = elements[i][j]
        }
      }
      return this
    }
    var n = elements.length
    this.elements = []
    for (i = 0; i < n; i++) {
      this.elements.push([elements[i]])
    }
    return this
  },
}

module.exports = function (elements) {
  const mat = Sylvester.Matrix.create(elements).inverse()
  if (mat !== null) {
    return mat.elements
  } else {
    return null
  }
}


/***/ },

/***/ "./node_modules/simple-linalg/index.js"
/*!*********************************************!*\
  !*** ./node_modules/simple-linalg/index.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index.js */ "./node_modules/simple-linalg/lib/index.js");


/***/ },

/***/ "./node_modules/simple-linalg/lib/add.js"
/*!***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/add.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/simple-linalg/lib/elem-wise.js");
/**
* Add matrixes together
* @param {...Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
module.exports = function add(...args) {
	return elemWise(args, args2 => {
		return args2.reduce((a, b) => {
			if (a === null || b === null) {
				return null;
			}

			return a + b;
		}, 0);
	});
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/cos-similarity.js"
/*!**********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/cos-similarity.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const dotProduct = __webpack_require__(/*! ./dot-product.js */ "./node_modules/simple-linalg/lib/dot-product.js");
const norm = __webpack_require__(/*! ./norm.js */ "./node_modules/simple-linalg/lib/norm.js");

/**
 * Calculates the cosine similarity between two vectors.
 * @param {number[]} vector1 The first vector.
 * @param {number[]} vector2 The second vector.
 * @returns {number} The cosine similarity between the two vectors.
 * @throws {Error} If the lengths of the vectors do not match.
 */
module.exports = function cosSimilarity(vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('The lengths of the vectors do not match'));
	}

	const normProd = (norm(vector1) * norm(vector2));

	if (normProd === 0) {
		return 0;
	}

	return dotProduct(vector1, vector2) / normProd;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/diag-block.js"
/*!******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag-block.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const identity = __webpack_require__(/*! ./identity.js */ "./node_modules/simple-linalg/lib/identity.js");

/**
 * Constructs a block diagonal matrix from the given blocks.
 * @param {Object} options The options object.
 * @param {number[][][]} options.blocks The blocks to form the diagonal matrix.
 * @param {number[]} [options.order=null] Optional order for arranging the blocks.
 * @returns {number[][]} The block diagonal matrix.
 */
module.exports = function diagBlock({blocks, order = null}) {
	const dimL = blocks.map(a => a.length).reduce((a, b) => a + b, 0);
	const result = identity(dimL);
	let current = 0;
	for (const mat of blocks) {
		for (const [i] of mat.entries()) {
			for (const [j] of mat.entries()) {
				result[i + current][j + current] = mat[i][j];
			}
		}

		current += mat.length;
	}

	if (order) {
		return order.map(i => order.map(j => result[i][j]));
	}

	return result;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/diag.js"
/*!************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const zeros = __webpack_require__(/*! ./zeros */ "./node_modules/simple-linalg/lib/zeros.js");

/**
 * Constructs a diagonal matrix from the given array.
 * @param {number[]} diagonal The array representing the diagonal elements of the matrix.
 * @returns {number[][]} The diagonal matrix.
 */
module.exports = function diag(diagonal) {
	const result = zeros(diagonal.length, diagonal.length);
	for (const [i, element] of diagonal.entries()) {
		result[i][i] = element;
	}
	return result;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/dot-product.js"
/*!*******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/dot-product.js ***!
  \*******************************************************/
(module) {

/**
 * Calculates the dot product of two vectors.
 * @param {number[]} vector1 The first vector.
 * @param {number[]} vector2 The second vector.
 * @returns {number} The dot product of the two vectors.
 * @throws {Error} If the lengths of the vectors do not match.
 */
module.exports = function dotProduct(vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw (new Error('Lengths not maching'));
	}

	let result = 0;
	for (const [i, element] of vector1.entries()) {
		result += element * vector2[i];
	}

	return result;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/elem-wise.js"
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/elem-wise.js ***!
  \*****************************************************/
(module) {

/**
* @callback elemWiseCb
* @param {Array.<Number>} arr
* @param {Number} rowId
* @param {Number} colId
*/
/**
* Run a function on cell per cell for each Matrixes
* @param {<Array.<Array.<Array.<Number>>>} arrMatrixes list of matrixes
* @param {elemWiseCb} fn
* @returns {Array.<Array.<Number>>} resulting matrix
* @example
// this will do m1 + m2 + m3 + m4 on matrixes
elemWise([m1, m2, m3, m4], args2 => {
	return args2.reduce((a, b) => a + b, 0);
});
*/

module.exports = function elemWise(arrayMatrixes, fn) {
	return arrayMatrixes[0].map((row, rowId) => {
		return row.map((cell, colId) => {
			const array = arrayMatrixes.map(m => m[rowId][colId]);
			return fn(array, rowId, colId);
		});
	});
};



/***/ },

/***/ "./node_modules/simple-linalg/lib/euclidean-dist.js"
/*!**********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/euclidean-dist.js ***!
  \**********************************************************/
(module) {

/**
 * Calculates the Euclidean distance between two vectors.
 * @param {number[]} array1 The first vector.
 * @param {number[]} array2 The second vector.
 * @returns {number} The Euclidean distance between the two vectors.
 * @throws {Error} If the arrays have different lengths or if either array is not an array.
 */
module.exports = function euclideanDist(array1, array2) {
	if (array1.length !== array2.length) {
		throw new Error('Invalid array lengths');
	}

	if (!Array.isArray(array1)) {
		console.log({array1});
		throw new Error('Invalid array');
	}

	const diff = array1.map((element, index) => element - array2[index]).map(element => element * element);
	return Math.sqrt(diff.reduce((a, b) => a + b));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/frobenius.js"
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/frobenius.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const trace = __webpack_require__(/*! ./trace.js */ "./node_modules/simple-linalg/lib/trace.js");
const transpose = __webpack_require__(/*! ./transpose.js */ "./node_modules/simple-linalg/lib/transpose.js");
const matSub = __webpack_require__(/*! ./subtract.js */ "./node_modules/simple-linalg/lib/subtract.js");
const matMul = __webpack_require__(/*! ./mat-mul.js */ "./node_modules/simple-linalg/lib/mat-mul.js");
const sum = __webpack_require__(/*! ./sum.js */ "./node_modules/simple-linalg/lib/sum.js");

/**
 * Calculates the Frobenius norm of the given matrices or vectors.
 * [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm)
 * @param {number[][]} [array1] The first matrix or vector (optional).
 * @param {number[][]} [array2] The second matrix or vector (optional).
 * @returns {number} The Frobenius norm of the matrices or vectors.
 */
module.exports = function frobenius(array1, array2) {
	if (array1 === undefined) {
		return sum(array2);
	}

	if (array2 === undefined) {
		return sum(array1);
	}

	const m = matSub(array1, array2);
	const p = matMul(transpose(m), m);
	return Math.sqrt(trace(p));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/identity.js"
/*!****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/identity.js ***!
  \****************************************************/
(module) {

/**
 * build an identity square matrix
 * @param stateSize matrix size
 */
module.exports = function identity(stateSize) {
  const identityArray = [];
  for (let i = 0; i < stateSize; i++) {
    const rowIdentity = [];
    for (let j = 0; j < stateSize; j++) {
      if (i === j) {
        rowIdentity.push(1);
      } else {
        rowIdentity.push(0);
      }
    }

    identityArray.push(rowIdentity);
  }

  return identityArray;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/index.js"
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/index.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
	add: __webpack_require__(/*! ./add.js */ "./node_modules/simple-linalg/lib/add.js"),
	cosSimilarity: __webpack_require__(/*! ./cos-similarity */ "./node_modules/simple-linalg/lib/cos-similarity.js"),
	euclideanDist: __webpack_require__(/*! ./euclidean-dist */ "./node_modules/simple-linalg/lib/euclidean-dist.js"),
	diag: __webpack_require__(/*! ./diag.js */ "./node_modules/simple-linalg/lib/diag.js"),
	diagBlock: __webpack_require__(/*! ./diag-block */ "./node_modules/simple-linalg/lib/diag-block.js"),
	dotProduct: __webpack_require__(/*! ./dot-product */ "./node_modules/simple-linalg/lib/dot-product.js"),
	elemWise: __webpack_require__(/*! ./elem-wise.js */ "./node_modules/simple-linalg/lib/elem-wise.js"),
	frobenius: __webpack_require__(/*! ./frobenius.js */ "./node_modules/simple-linalg/lib/frobenius.js"),
	identity: __webpack_require__(/*! ./identity.js */ "./node_modules/simple-linalg/lib/identity.js"),
	invert: __webpack_require__(/*! ./invert.js */ "./node_modules/simple-linalg/lib/invert.js"),
	mapMatrix: __webpack_require__(/*! ./map-matrix.js */ "./node_modules/simple-linalg/lib/map-matrix.js"),
	matMul: __webpack_require__(/*! ./mat-mul.js */ "./node_modules/simple-linalg/lib/mat-mul.js"),
	matPermutation: __webpack_require__(/*! ./mat-permutation.js */ "./node_modules/simple-linalg/lib/mat-permutation.js"),
	padWithZeroCols: __webpack_require__(/*! ./pad-with-zero-cols.js */ "./node_modules/simple-linalg/lib/pad-with-zero-cols.js"),
	subtract: __webpack_require__(/*! ./subtract.js */ "./node_modules/simple-linalg/lib/subtract.js"),
	subSquareMatrix: __webpack_require__(/*! ./sub-square-matrix.js */ "./node_modules/simple-linalg/lib/sub-square-matrix.js"),
	sum: __webpack_require__(/*! ./sum.js */ "./node_modules/simple-linalg/lib/sum.js"),
	trace: __webpack_require__(/*! ./trace.js */ "./node_modules/simple-linalg/lib/trace.js"),
	transpose: __webpack_require__(/*! ./transpose.js */ "./node_modules/simple-linalg/lib/transpose.js"),
	zeros: __webpack_require__(/*! ./zeros.js */ "./node_modules/simple-linalg/lib/zeros.js"),
	norm: __webpack_require__(/*! ./norm.js */ "./node_modules/simple-linalg/lib/norm.js"),
	sumVector: __webpack_require__(/*! ./sum-vector.js */ "./node_modules/simple-linalg/lib/sum-vector.js"),
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/invert.js"
/*!**************************************************!*\
  !*** ./node_modules/simple-linalg/lib/invert.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const matrixInverse = __webpack_require__(/*! matrix-inverse */ "./node_modules/matrix-inverse/matrix-inverse.js");

module.exports = function invert(m) {
	return matrixInverse(m);
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/map-matrix.js"
/*!******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/map-matrix.js ***!
  \******************************************************/
(module) {

/**
 * Maps a function over each element of the given matrix.
 * @param {Array<Array<any>>} a The matrix to map over.
 * @param {function(any, number, number): any} fn The mapping function to apply.
 * @returns {Array<Array<any>>} The matrix with the function applied to each element.
 */
module.exports = function mapMatrix(a, fn) {
	return a.map((row, rowId) => row.map((cell, colId) => fn(cell, rowId, colId)));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/mat-mul.js"
/*!***************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-mul.js ***!
  \***************************************************/
(module) {

/**
* Multiply 2 matrixes together
* @param {Array.<Array.<Number>>} m1
* @param {Array.<Array.<Number>>} m2
* @returns {Array.<Array.<Number>>}
*/
module.exports = function matMul(m1, m2) {
	// Console.log({m1, m2});
	const result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			let isNull = false;
			for (let k = 0; k < m1[0].length; k++) {
				if ((m1[i][k] === null && m2[k][j] !== 0) || (m2[k][j] === null && m1[i][k] !== 0)) {
					isNull = true;
					break;
				}
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = isNull ? null : sum;
		}
	}

	return result;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/mat-permutation.js"
/*!***********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-permutation.js ***!
  \***********************************************************/
(module) {

/**
 *
 * @param {Array.<Array.<Number>>} matrix
 * @param {[Number, Number]} outputSize
 * @param {Array.<Number>} rowIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @param {Array.<Number>} colIndexes the permutation indexes, result[j][k] = matrix[rowIndexes.indexOf(j)][colIndexes.indexOf(k)]
 * @returns {Array.<Array.<Number>>}
 */
module.exports = function matPermutation({
	matrix,
	outputSize,
	rowIndexes,
	colIndexes,
}) {
	const [nRow, nCol] = outputSize;

	if (!Array.isArray(rowIndexes)) {
		throw (new TypeError(`Invalid rowIndexes ${rowIndexes}`));
	}

	if (!Array.isArray(colIndexes)) {
		throw (new TypeError(`Invalid colIndexes ${colIndexes}`));
	}

	return new Array(nRow).fill(0).map((_, i) => new Array(nCol).fill(0).map((_, j) => {
		if (colIndexes.includes(j) && rowIndexes.includes(i)) {
			return matrix[rowIndexes.indexOf(i)][colIndexes.indexOf(j)];
		}

		return 0;
	}));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/norm.js"
/*!************************************************!*\
  !*** ./node_modules/simple-linalg/lib/norm.js ***!
  \************************************************/
(module) {

/**
 * Calculates the Euclidean norm of the given vector.
 * @param {number[]} vector The vector for which to calculate the Euclidean norm.
 * @returns {number} The Euclidean norm of the vector.
 */
module.exports = function norm(vector) {
	let result = 0;
	for (const element of vector) {
		result += (element * element);
	}
	return Math.sqrt(result);
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/pad-with-zero-cols.js"
/*!**************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/pad-with-zero-cols.js ***!
  \**************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const matPermutation = __webpack_require__(/*! ./mat-permutation */ "./node_modules/simple-linalg/lib/mat-permutation.js");
/**
* This function returns the padded matrix with zeros with respect to a given
* target columns number
* @param {Array.<Array.<Number>>} matrix the matrix we need to pad
* @param {Number} columns in our case, the dynamic dimension
* @returns {Array.<Array.<Number>>} padded matrix
*/
module.exports = function (matrix, {columns}) {
	if (columns < matrix[0].length) {
		throw (new TypeError(`Output columns ${columns} is greater than input columns ${matrix[0].length}`));
	}

	return matPermutation({
		matrix,
		outputSize: [matrix.length, columns],
		rowIndexes: new Array(matrix.length).fill(0).map((_, index) => index),
		colIndexes: new Array(matrix[0].length).fill(0).map((_, index) => index),
	});
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/sub-square-matrix.js"
/*!*************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/sub-square-matrix.js ***!
  \*************************************************************/
(module) {

/**
 * Extracts a sub-square matrix from the provided matrix based on the given indexes.
 * @param {number[][]} mat The matrix from which to extract the sub-square matrix.
 * @param {number[]} indexes The indexes to select rows and columns from the matrix.
 * @returns {number[][]} The sub-square matrix extracted from the original matrix.
 */
module.exports = function subSquareMatrix(mat, indexes) {
	return indexes.map(s1 => indexes.map(s2 => mat[s1][s2]));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/subtract.js"
/*!****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/subtract.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const elemWise = __webpack_require__(/*! ./elem-wise */ "./node_modules/simple-linalg/lib/elem-wise.js");

module.exports = function subtract(...args) {
	return elemWise(args, ([a, b]) => a - b);
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/sum-vector.js"
/*!******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/sum-vector.js ***!
  \******************************************************/
(module) {

/**
 * Sums all the elements of the given vector.
 * @param {number[]} vector The vector whose elements are to be summed.
 * @returns {number} The sum of all elements in the vector.
 */
module.exports = function sumVector(vector) {
	let s = 0;
	for (const element of vector) {
		s += element;
	}
	return s;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/sum.js"
/*!***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/sum.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const sumVector = __webpack_require__(/*! ./sum-vector */ "./node_modules/simple-linalg/lib/sum-vector.js");

// Sum all the terms of a given matrix
module.exports = function sum(array) {
	let s = 0;
	for (const element of array) {
		s += sumVector(element);
	}

	return s;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/trace.js"
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/trace.js ***!
  \*************************************************/
(module) {

module.exports = function trace(array) {
	let diag = 0;
	for (const [row, element] of array.entries()) {
		diag += element[row];
	}
	return diag;
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/transpose.js"
/*!*****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/transpose.js ***!
  \*****************************************************/
(module) {

/**
 * Transposes the given 2D array.
 * @param {Array<Array<any>>} array The 2D array to transpose.
 * @returns {Array<Array<any>>} The transposed 2D array.
 */
module.exports = function transpose(array) {
	return array[0].map((col, i) => array.map(row => row[i]));
};


/***/ },

/***/ "./node_modules/simple-linalg/lib/zeros.js"
/*!*************************************************!*\
  !*** ./node_modules/simple-linalg/lib/zeros.js ***!
  \*************************************************/
(module) {

/**
 * Generates a 2D array filled with zeros with the specified number of rows and columns.
 * @param {number} rows The number of rows for the 2D array.
 * @param {number} cols The number of columns for the 2D array.
 * @returns {number[][]} A 2D array filled with zeros.
 */
module.exports = function zeros(rows, cols) {
	return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
};


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	kalmanFilter = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8va2FsbWFuRmlsdGVyLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2NvcmUta2FsbWFuLWZpbHRlci50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb21wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1hY2NlbGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtcG9zaXRpb24td2l0aC1udWxsLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLWR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtc3BlZWQudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvc2hvcnR0ZXJtLWNvbnN0YW50LXNwZWVkLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9rYWxtYW4tZmlsdGVyLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9tb2RlbC1jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9pbmRleC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLWxvY2FsLXZhcmlhbmNlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9zZW5zb3ItcHJvamVjdGVkLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9vYnNlcnZhdGlvbi9zZW5zb3IudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2J1aWxkLXN0YXRlLXByb2plY3Rpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2NoZWNrLWRpbWVuc2lvbnMudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL2V4dGVuZC1keW5hbWljLWluaXQudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3NldHVwL3NldC1kaW1lbnNpb25zLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zdGF0ZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdHlwZXMvVHlwZUFzc2VydC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1jb3ZhcmlhbmNlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1tYXRyaXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2NoZWNrLXNoYXBlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jb3JyZWxhdGlvbi10by1jb3ZhcmlhbmNlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9kZWVwLWFzc2lnbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvZ2V0LWNvdmFyaWFuY2UudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3BvbHltb3JwaC1tYXRyaXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3Byb2plY3Qtb2JzZXJ2YXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy91bmlxLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hY29zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hY290LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2FzZWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2FzaW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2F0YW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Nvbmp1Z2F0ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY29zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9jb3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2NzYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZGl2aWRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9leHAuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2dldEFyZ3VtZW50LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9nZXRJbWFnaW5hcnkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2dldE1vZHVsdXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2dldFJlYWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2lzTmFOLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9sb2cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL211bHRpcGx5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9wb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3NlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc2luLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvdGFuLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9FcnJvci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9kZWNvbXBvc2l0aW9ucy9MVS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9kZWNvbXBvc2l0aW9ucy9RUi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9saW5lYXItZXF1YXRpb25zL2JhY2t3YXJkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvZm9yd2FyZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9saW5lYXItZXF1YXRpb25zL3NvbHZlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvYWRkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL211bHRpcGx5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvcG93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvc3VidHJhY3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy90cmFuc3Bvc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9jb25kLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvZGV0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvZWlnZW52YWx1ZXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9ub3JtLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvbnVsbGl0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3JhbmsuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9zaXplLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvdHJhY2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzRGlhZ29uYWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzTG93ZXJUcmlhbmd1bGFyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc09ydGhvZ29uYWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzU2tld1N5bW1ldHJpYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTcXVhcmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzU3ltbWV0cmljLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1VwcGVyVHJpYW5ndWxhci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9jbG9uZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9jb2x1bW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZGlhZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9lbGVtZW50d2lzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9lbnRyeS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9mbGF0dGVuLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2Zyb21BcnJheS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9nZXREaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dldFJhbmRvbU1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9pc0VxdWFsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3Jvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9zdWJtYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvdG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvemVyby5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL3V0aWwvZW1wdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL3V0aWwvaXNNYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL3V0aWwvaXNOdW1iZXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL21hdHJpeC1pbnZlcnNlL21hdHJpeC1pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2luZGV4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2Nvcy1zaW1pbGFyaXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kaWFnLWJsb2NrLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9kb3QtcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZWxlbS13aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9ldWNsaWRlYW4tZGlzdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvZnJvYmVuaXVzLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2ludmVydC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWFwLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWF0LW11bC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvbWF0LXBlcm11dGF0aW9uLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9ub3JtLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9wYWQtd2l0aC16ZXJvLWNvbHMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3N1Yi1zcXVhcmUtbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3VtLXZlY3Rvci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3VtLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi90cmFjZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi96ZXJvcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vZGVsQ29sbGVjdGlvbiBmcm9tICcuL2xpYi9tb2RlbC1jb2xsZWN0aW9uJztcbmltcG9ydCAqIGFzIGRlZmF1bHREeW5hbWljTW9kZWxzIGZyb20gJy4vbGliL2R5bmFtaWMnO1xuaW1wb3J0ICogYXMgZGVmYXVsdE9ic2VydmF0aW9uTW9kZWxzIGZyb20gJy4vbGliL29ic2VydmF0aW9uJztcblxuZnVuY3Rpb24gY2FtZWxUb0Rhc2goc3RyOiBzdHJpbmcpIHtcblx0aWYgKHN0ciA9PT0gc3RyLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRyZXR1cm4gc3RyO1xuXHR9XG5cdHJldHVybiBzdHIucmVwbGFjZUFsbCgvW0EtWl0vZywgbSA9PiAnLScgKyBtLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5PYmplY3Qua2V5cyhkZWZhdWx0RHluYW1pY01vZGVscykuZm9yRWFjaCgoazogc3RyaW5nKSA9PiB7XG5cblx0bW9kZWxDb2xsZWN0aW9uLnJlZ2lzdGVyRHluYW1pYyhjYW1lbFRvRGFzaChrKSwgZGVmYXVsdER5bmFtaWNNb2RlbHNba10pO1xufSk7XG5cbk9iamVjdC5rZXlzKGRlZmF1bHRPYnNlcnZhdGlvbk1vZGVscykuZm9yRWFjaCgoazogc3RyaW5nKSA9PiB7XG5cdG1vZGVsQ29sbGVjdGlvbi5yZWdpc3Rlck9ic2VydmF0aW9uKGNhbWVsVG9EYXNoKGspLCBkZWZhdWx0T2JzZXJ2YXRpb25Nb2RlbHNba10pO1xufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVsLWNvbGxlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZHluYW1pYyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9vYnNlcnZhdGlvbic7XG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBLYWxtYW5GaWx0ZXJ9IGZyb20gJy4vbGliL2thbG1hbi1maWx0ZXInO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGdldENvdmFyaWFuY2V9IGZyb20gJy4vbGliL3V0aWxzL2dldC1jb3ZhcmlhbmNlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTdGF0ZX0gZnJvbSAnLi9saWIvc3RhdGUnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNoZWNrQ292YXJpYW5jZX0gZnJvbSAnLi9saWIvdXRpbHMvY2hlY2stY292YXJpYW5jZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgY29ycmVsYXRpb25Ub0NvdmFyaWFuY2V9IGZyb20gJy4vbGliL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvdmFyaWFuY2VUb0NvcnJlbGF0aW9ufSBmcm9tICcuL2xpYi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBwcm9qZWN0T2JzZXJ2YXRpb259IGZyb20gJy4vbGliL3V0aWxzL3Byb2plY3Qtb2JzZXJ2YXRpb24nO1xuIiwiaW1wb3J0IHtcblx0bWF0TXVsLCB0cmFuc3Bvc2UsIGFkZCwgaW52ZXJ0LCBzdWJ0cmFjdCBhcyBzdWIsIGlkZW50aXR5IGFzIGdldElkZW50aXR5LFxufSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCBjaGVja01hdHJpeCBmcm9tICcuL3V0aWxzL2NoZWNrLW1hdHJpeCc7XG5pbXBvcnQgdHlwZSB7XG5cdENvcmVDb25maWcsIER5bmFtaWNDb25maWcsIE9ic2VydmF0aW9uQ29uZmlnLCBQcmVkaWN0ZWRDYWxsYmFjaywgUHJldmlvdXNDb3JyZWN0ZWRDYWxsYmFjaywgV2luc3RvbkxvZ2dlcixcbn0gZnJvbSAnLi90eXBlcy9PYnNlcnZhdGlvbkNvbmZpZyc7XG5pbXBvcnQgVHlwZUFzc2VydCBmcm9tICcuL3R5cGVzL1R5cGVBc3NlcnQnO1xuXG5jb25zdCBkZWZhdWx0TG9nZ2VyOiBXaW5zdG9uTG9nZ2VyID0ge1xuXHRpbmZvOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG5cdGRlYnVnKCkge30sXG5cdHdhcm46ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcblx0ZXJyb3I6ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmVLYWxtYW5GaWx0ZXIge1xuXHRkeW5hbWljOiBEeW5hbWljQ29uZmlnO1xuXHRvYnNlcnZhdGlvbjogT2JzZXJ2YXRpb25Db25maWc7XG5cdGxvZ2dlcjogV2luc3RvbkxvZ2dlcjtcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiBDb3JlQ29uZmlnKSB7XG5cdFx0Y29uc3Qge2R5bmFtaWMsIG9ic2VydmF0aW9uLCBsb2dnZXIgPSBkZWZhdWx0TG9nZ2VyfSA9IG9wdGlvbnM7XG5cdFx0dGhpcy5keW5hbWljID0gZHluYW1pYztcblx0XHR0aGlzLm9ic2VydmF0aW9uID0gb2JzZXJ2YXRpb247XG5cdFx0dGhpcy5sb2dnZXIgPSBsb2dnZXI7XG5cdH1cblx0Ly8gfCBudW1iZXJbXVxuXHRnZXRWYWx1ZShmbjogbnVtYmVyW11bXSB8IFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2sgfCBQcmVkaWN0ZWRDYWxsYmFjaywgb3B0aW9uczogYW55KTogbnVtYmVyW11bXSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgKGZuKSA9PT0gJ2Z1bmN0aW9uJyA/IGZuKG9wdGlvbnMpIDogZm4pO1xuXHR9XG5cblx0Z2V0SW5pdFN0YXRlKCk6IFN0YXRlIHtcblx0XHRjb25zdCB7bWVhbjogbWVhbkluaXQsIGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LCBpbmRleDogaW5kZXhJbml0fSA9IHRoaXMuZHluYW1pYy5pbml0O1xuXG5cdFx0Y29uc3QgaW5pdFN0YXRlID0gbmV3IFN0YXRlKHtcblx0XHRcdG1lYW46IG1lYW5Jbml0LFxuXHRcdFx0Y292YXJpYW5jZTogY292YXJpYW5jZUluaXQsXG5cdFx0XHRpbmRleDogaW5kZXhJbml0LFxuXHRcdH0pO1xuXHRcdFN0YXRlLmNoZWNrKGluaXRTdGF0ZSwge3RpdGxlOiAnZHluYW1pYy5pbml0J30pO1xuXHRcdHJldHVybiBpbml0U3RhdGU7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgcHJlZGljdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSwgdGhpcyB3aWxsIGhlbHAgdXMgdG8gYnVpbGQgdGhlIGFzeW1wdG90aWNTdGF0ZS5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZFxuXHQqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCovXG5cblx0Z2V0UHJlZGljdGVkQ292YXJpYW5jZShvcHRpb25zOiB7cHJldmlvdXNDb3JyZWN0ZWQ/OiBTdGF0ZSwgaW5kZXg/OiBudW1iZXJ9ID0ge30pIHtcblx0XHRsZXQge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0gPSBvcHRpb25zO1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkIHx8PSB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleCwgLi4ub3B0aW9uc307XG5cdFx0Y29uc3QgdHJhbnNpdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLnRyYW5zaXRpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cblx0XHRjaGVja01hdHJpeCh0cmFuc2l0aW9uLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgdGhpcy5keW5hbWljLmRpbWVuc2lvbl0sICdkeW5hbWljLnRyYW5zaXRpb24nKTtcblxuXHRcdGNvbnN0IHRyYW5zaXRpb25UcmFuc3Bvc2VkID0gdHJhbnNwb3NlKHRyYW5zaXRpb24pO1xuXHRcdGNvbnN0IGNvdmFyaWFuY2VJbnRlciA9IG1hdE11bCh0cmFuc2l0aW9uLCBwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlUHJldmlvdXMgPSBtYXRNdWwoY292YXJpYW5jZUludGVyLCB0cmFuc2l0aW9uVHJhbnNwb3NlZCk7XG5cdFx0Y29uc3QgZHluQ292ID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMuY292YXJpYW5jZSBhcyBudW1iZXJbXVtdLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IGFkZChcblx0XHRcdGR5bkNvdixcblx0XHRcdGNvdmFyaWFuY2VQcmV2aW91cyxcblx0XHQpO1xuXHRcdGNoZWNrTWF0cml4KGNvdmFyaWFuY2UsIFt0aGlzLmR5bmFtaWMuZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ3ByZWRpY3RlZC5jb3ZhcmlhbmNlJyk7XG5cblx0XHRyZXR1cm4gY292YXJpYW5jZTtcblx0fVxuXG5cdHByZWRpY3RNZWFuKG86IHtvcHRzLCB0cmFuc2l0aW9uOiBudW1iZXJbXVtdfSkge1xuXHRcdGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuV2l0aG91dENvbnRyb2wobyk7XG5cdFx0aWYgKCF0aGlzLmR5bmFtaWMuY29uc3RhbnQpIHtcblx0XHRcdHJldHVybiBtZWFuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtvcHRzfSA9IG87XG5cdFx0Y29uc3QgY29udHJvbCA9IHRoaXMuZHluYW1pYy5jb25zdGFudChvcHRzKTtcblx0XHRjaGVja01hdHJpeChjb250cm9sLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgMV0sICdkeW5hbWljLmNvbnN0YW50Jyk7XG5cdFx0cmV0dXJuIGFkZChtZWFuLCBjb250cm9sKTtcblx0fVxuXG5cdHByZWRpY3RNZWFuV2l0aG91dENvbnRyb2woYXJnczoge29wdHMsIHRyYW5zaXRpb246IG51bWJlcltdW119KTogbnVtYmVyW11bXSB7XG5cdFx0Y29uc3Qge29wdHMsIHRyYW5zaXRpb259ID0gYXJncztcblx0XHRpZiAodGhpcy5keW5hbWljLmZuKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5keW5hbWljLmZuKG9wdHMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtwcmV2aW91c0NvcnJlY3RlZH0gPSBvcHRzO1xuXHRcdHJldHVybiBtYXRNdWwodHJhbnNpdGlvbiwgcHJldmlvdXNDb3JyZWN0ZWQubWVhbik7XG5cdH1cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIG5ldyBwcmVkaWN0aW9uLCByZWxhdGl2ZWx5IHRvIHRoZSBkeW5hbWljIG1vZGVsIGNob3NlblxuXHQqIEBwYXJhbSB7U3RhdGV9IHByZXZpb3VzQ29ycmVjdGVkIFN0YXRlIHJlbGF0aXZlIHRvIG91ciBkeW5hbWljIG1vZGVsXG5cdCogQHJldHVybnN7U3RhdGV9IHByZWRpY3RlZCBTdGF0ZVxuXHQqL1xuXG5cdHByZWRpY3Qob3B0aW9uczoge3ByZXZpb3VzQ29ycmVjdGVkPzogU3RhdGUsIGluZGV4PzogbnVtYmVyLCBvYnNlcnZhdGlvbj86IG51bWJlcltdIHwgbnVtYmVyW11bXX0gPSB7fSk6IFN0YXRlIHtcblx0XHRsZXQge3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0gPSBvcHRpb25zO1xuXHRcdHByZXZpb3VzQ29ycmVjdGVkIHx8PSB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXG5cdFx0aWYgKHR5cGVvZiAoaW5kZXgpICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KSA9PT0gJ251bWJlcicpIHtcblx0XHRcdGluZGV4ID0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXggKyAxO1xuXHRcdH1cblxuXHRcdFN0YXRlLmNoZWNrKHByZXZpb3VzQ29ycmVjdGVkLCB7ZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9ufSk7XG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdHByZXZpb3VzQ29ycmVjdGVkLFxuXHRcdFx0aW5kZXgsXG5cdFx0fTtcblxuXHRcdGNvbnN0IHRyYW5zaXRpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy50cmFuc2l0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3QgbWVhbiA9IHRoaXMucHJlZGljdE1lYW4oe3RyYW5zaXRpb24sIG9wdHM6IGdldFZhbHVlT3B0aW9uc30pO1xuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IHRoaXMuZ2V0UHJlZGljdGVkQ292YXJpYW5jZShnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y29uc3QgcHJlZGljdGVkID0gbmV3IFN0YXRlKHttZWFuLCBjb3ZhcmlhbmNlLCBpbmRleH0pO1xuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKCdQcmVkaWN0aW9uIGRvbmUnLCBwcmVkaWN0ZWQpO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4ocHJlZGljdGVkLm1lYW5bMF1bMF0pKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuJykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcmVkaWN0ZWQ7XG5cdH1cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCByZXR1cm4gdGhlIG5ldyBjb3JyZWN0aW9uLCB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcmVkaWN0aW9uIG1hZGVcblx0ICogYW5kIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCAqIHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQgKiBAcGFyYW0gb3B0aW9uc1xuXHQgKiBAcmV0dXJucyBrYWxtYW5HYWluXG5cdCAqL1xuXHRnZXRHYWluKG9wdGlvbnM6IHtwcmVkaWN0ZWQ6IFN0YXRlLCBzdGF0ZVByb2plY3Rpb24/OiBudW1iZXJbXVtdfSk6IG51bWJlcltdW10ge1xuXHRcdGxldCB7cHJlZGljdGVkLCBzdGF0ZVByb2plY3Rpb259ID0gb3B0aW9ucztcblx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7XG5cdFx0XHRpbmRleDogcHJlZGljdGVkLmluZGV4LFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9O1xuXHRcdFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJET3JGbmModGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdDb3JlS2FsbWFuRmlsdGVyLmdldEdhaW4nKTtcblx0XHRzdGF0ZVByb2plY3Rpb24gfHw9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cdFx0Y29uc3Qgb2JzQ292YXJpYW5jZSA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5jb3ZhcmlhbmNlIGFzIG51bWJlcltdW10sIGdldFZhbHVlT3B0aW9ucyk7XG5cdFx0Y2hlY2tNYXRyaXgob2JzQ292YXJpYW5jZSwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qVHJhbnNwb3NlZCA9IHRyYW5zcG9zZShzdGF0ZVByb2plY3Rpb24pO1xuXG5cdFx0Y2hlY2tNYXRyaXgoc3RhdGVQcm9qZWN0aW9uLCBbdGhpcy5vYnNlcnZhdGlvbi5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAnb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uJyk7XG5cblx0XHRjb25zdCBub2lzZWxlc3NJbm5vdmF0aW9uID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLmNvdmFyaWFuY2UpLFxuXHRcdFx0c3RhdGVQcm9qVHJhbnNwb3NlZCxcblx0XHQpO1xuXG5cdFx0Y29uc3QgaW5ub3ZhdGlvbkNvdmFyaWFuY2UgPSBhZGQobm9pc2VsZXNzSW5ub3ZhdGlvbiwgb2JzQ292YXJpYW5jZSk7XG5cblx0XHRjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IG1hdE11bChcblx0XHRcdG1hdE11bChwcmVkaWN0ZWQuY292YXJpYW5jZSwgc3RhdGVQcm9qVHJhbnNwb3NlZCksXG5cdFx0XHRpbnZlcnQoaW5ub3ZhdGlvbkNvdmFyaWFuY2UpLFxuXHRcdCk7XG5cblx0XHRyZXR1cm4gb3B0aW1hbEthbG1hbkdhaW47XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyB3aWxsIHJldHVybiB0aGUgY29ycmVjdGVkIGNvdmFyaWFuY2Ugb2YgYSBnaXZlbiBwcmVkaWN0ZWQgU3RhdGUsIHRoaXMgd2lsbCBoZWxwIHVzIHRvIGJ1aWxkIHRoZSBhc3ltcHRvdGljU3RhdGUuXG5cdCAqIEBwYXJhbSB7U3RhdGV9IHByZWRpY3RlZCB0aGUgcHJldmlvdXMgU3RhdGVcblx0ICogQHJldHVybnN7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cblx0ICovXG5cdGdldENvcnJlY3RlZENvdmFyaWFuY2Uob3B0aW9uczoge3ByZWRpY3RlZDogU3RhdGUsIG9wdGltYWxLYWxtYW5HYWluPzogYW55LCBzdGF0ZVByb2plY3Rpb24/OiBhbnl9KTogbnVtYmVyW11bXSB7XG5cdFx0bGV0IHtwcmVkaWN0ZWQsIG9wdGltYWxLYWxtYW5HYWluLCBzdGF0ZVByb2plY3Rpb259ID0gb3B0aW9ucztcblx0XHRjb25zdCBpZGVudGl0eSA9IGdldElkZW50aXR5KHByZWRpY3RlZC5jb3ZhcmlhbmNlLmxlbmd0aCk7XG5cdFx0aWYgKCFzdGF0ZVByb2plY3Rpb24pIHtcblx0XHRcdFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnQ29yZUthbG1hbkZpbHRlci5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlJyk7XG5cdFx0XHRjb25zdCBnZXRWYWx1ZU9wdGlvbnMgPSB7XG5cdFx0XHRcdGluZGV4OiBwcmVkaWN0ZWQuaW5kZXgsXG5cdFx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHR9O1xuXHRcdFx0c3RhdGVQcm9qZWN0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblx0XHR9XG5cblx0XHRvcHRpbWFsS2FsbWFuR2FpbiB8fD0gdGhpcy5nZXRHYWluKHtzdGF0ZVByb2plY3Rpb24sIC4uLm9wdGlvbnN9KTtcblxuXHRcdHJldHVybiBtYXRNdWwoXG5cdFx0XHRzdWIoaWRlbnRpdHksIG1hdE11bChvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9uKSksXG5cdFx0XHRwcmVkaWN0ZWQuY292YXJpYW5jZSxcblx0XHQpO1xuXHR9XG5cblx0Z2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oYXJnczoge29wdHM6IGFueSwgc3RhdGVQcm9qZWN0aW9uOiBudW1iZXJbXVtdfSk6IG51bWJlcltdW10ge1xuXHRcdGNvbnN0IHtvcHRzLCBzdGF0ZVByb2plY3Rpb259ID0gYXJncztcblx0XHRpZiAodGhpcy5vYnNlcnZhdGlvbi5mbikge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JzZXJ2YXRpb24uZm4ob3B0cyk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge3ByZWRpY3RlZH0gPSBvcHRzO1xuXHRcdHJldHVybiBtYXRNdWwoc3RhdGVQcm9qZWN0aW9uLCBwcmVkaWN0ZWQubWVhbik7XG5cdH1cblxuXHQvKipcblx0VGhpcyB3aWxsIHJldHVybiB0aGUgbmV3IGNvcnJlY3Rpb24sIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByZWRpY3Rpb24gbWFkZVxuXHRhbmQgdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcGFyYW0ge1N0YXRlfSBwcmVkaWN0ZWQgdGhlIHByZXZpb3VzIFN0YXRlXG5cdCogQHBhcmFtIHtBcnJheX0gb2JzZXJ2YXRpb24gdGhlIG9ic2VydmF0aW9uIG9mIHRoZSBzZW5zb3Jcblx0KiBAcmV0dXJuc3tTdGF0ZX0gY29ycmVjdGVkIFN0YXRlIG9mIHRoZSBLYWxtYW4gRmlsdGVyXG5cdCovXG5cblx0Y29ycmVjdChvcHRpb25zOiB7cHJlZGljdGVkOiBhbnksIG9ic2VydmF0aW9uOiBhbnl9KTogU3RhdGUge1xuXHRcdGNvbnN0IHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9ufSA9IG9wdGlvbnM7XG5cdFx0U3RhdGUuY2hlY2socHJlZGljdGVkLCB7ZGltZW5zaW9uOiB0aGlzLmR5bmFtaWMuZGltZW5zaW9ufSk7XG5cdFx0aWYgKCFvYnNlcnZhdGlvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcignbm8gbWVhc3VyZSBhdmFpbGFibGUnKSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge1xuXHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRpbmRleDogcHJlZGljdGVkLmluZGV4LFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9O1xuXHRcdFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJET3JGbmModGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdDb3JlS2FsbWFuRmlsdGVyLmNvcnJlY3QnKTtcblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpIGFzIG51bWJlcltdW107XG5cblx0XHRjb25zdCBvcHRpbWFsS2FsbWFuR2FpbiA9IHRoaXMuZ2V0R2Fpbih7XG5cdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRzdGF0ZVByb2plY3Rpb24sXG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaW5ub3ZhdGlvbiA9IHN1Yihcblx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0dGhpcy5nZXRQcmVkaWN0ZWRPYnNlcnZhdGlvbih7c3RhdGVQcm9qZWN0aW9uLCBvcHRzOiBnZXRWYWx1ZU9wdGlvbnN9KSxcblx0XHQpO1xuXG5cdFx0Y29uc3QgbWVhbiA9IGFkZChcblx0XHRcdHByZWRpY3RlZC5tZWFuLFxuXHRcdFx0bWF0TXVsKG9wdGltYWxLYWxtYW5HYWluLCBpbm5vdmF0aW9uKSxcblx0XHQpO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4obWVhblswXVswXSkpIHtcblx0XHRcdGNvbnNvbGUubG9nKHtvcHRpbWFsS2FsbWFuR2FpbiwgaW5ub3ZhdGlvbiwgcHJlZGljdGVkfSk7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignTWVhbiBpcyBOYU4gYWZ0ZXIgY29ycmVjdGlvbicpKTtcblx0XHR9XG5cblx0XHRjb25zdCBjb3ZhcmlhbmNlID0gdGhpcy5nZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKHtcblx0XHRcdHByZWRpY3RlZCxcblx0XHRcdG9wdGltYWxLYWxtYW5HYWluLFxuXHRcdFx0c3RhdGVQcm9qZWN0aW9uLFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9LFxuXHRcdCk7XG5cdFx0Y29uc3QgY29ycmVjdGVkID0gbmV3IFN0YXRlKHttZWFuLCBjb3ZhcmlhbmNlLCBpbmRleDogcHJlZGljdGVkLmluZGV4fSk7XG5cdFx0dGhpcy5sb2dnZXIuZGVidWcoJ0NvcnJlY3Rpb24gZG9uZScsIGNvcnJlY3RlZCk7XG5cdFx0cmV0dXJuIGNvcnJlY3RlZDtcblx0fVxufVxuIiwiaW1wb3J0IHtidWlsZER5bmFtaWN9IGZyb20gJy4uL21vZGVsLWNvbGxlY3Rpb24nO1xuXG4vKipcbiogQHR5cGVkZWYge09iamVjdC48RHluYW1pY05hbWUsIER5bmFtaWNDb25maWc+fSBQZXJOYW1lQ29uZmlnc1xuKi9cbi8qKlxuKiBAdHlwZWRlZiB7T2JqZWN0fSBEeW5hbWljQ29uZmlnXG4qIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG9ic0luZGV4ZXNcbiogQHBhcmFtIHtDb3ZhcmlhbmNlfSBzdGF0aWNDb3ZhcmlhbmNlXG4qL1xuXG4vKipcbiogQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGNvbnNpZGVyaW5nIHRoZSBudWxsIGluIG9yZGVyIHRvIG1ha2UgdGhlIHByZWRpY3Rpb25zXG4qIEBwYXJhbSB7T2JqZWN0fSBtYWluXG4qIEBwYXJhbSB7T2JqZWN0LjxTdHJpbmcsIER5bmFtaWNDb25maWc+fSBtYWluLnBlck5hbWVcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvcHRzLm9ic2VydmVkUHJvamVjdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NpdGlvbih7cGVyTmFtZX0sIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHtvYnNlcnZlZFByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IG9ic2VydmVkRHluYW1EaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXG5cdGNvbnN0IGR5bmFtaWNOYW1lcyA9IE9iamVjdC5rZXlzKHBlck5hbWUpO1xuXG5cdGNvbnN0IGNvbmZzID0ge307XG5cdGxldCBuZXh0RHluYW1pY0RpbWVuc2lvbiA9IG9ic2VydmVkRHluYW1EaW1lbnNpb247XG5cdGxldCBuZXh0T2JzZXJ2ZWREaW1lbnNpb24gPSAwO1xuXHRkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcblx0XHRjb25zdCBvYnNEeW5hSW5kZXhlcyA9IHBlck5hbWVba10ub2JzRHluYUluZGV4ZXM7XG5cdFx0aWYgKHR5cGVvZiAocGVyTmFtZVtrXS5uYW1lKSA9PT0gJ3N0cmluZycgJiYgcGVyTmFtZVtrXS5uYW1lICE9PSBrKSB7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGAke3Blck5hbWVba10ubmFtZX0gYW5kIFwiJHtrfVwiIHNob3VsZCBtYXRjaGApKTtcblx0XHR9XG5cblx0XHRwZXJOYW1lW2tdLm5hbWUgPSBrO1xuXG5cdFx0Y29uc3Qge2RpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZSwgaW5pdH0gPSBidWlsZER5bmFtaWMocGVyTmFtZVtrXSwgb2JzZXJ2YXRpb24pO1xuXG5cdFx0Y29uc3QgZHluYW1pY0luZGV4ZXM6IG51bWJlcltdID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkaW1lbnNpb247IGkrKykge1xuXHRcdFx0Y29uc3QgaXNPYnNlcnZlZCA9IChpIDwgb2JzRHluYUluZGV4ZXMubGVuZ3RoKTtcblx0XHRcdGxldCBuZXdJbmRleDogbnVtYmVyO1xuXHRcdFx0aWYgKGlzT2JzZXJ2ZWQpIHtcblx0XHRcdFx0bmV3SW5kZXggPSBuZXh0T2JzZXJ2ZWREaW1lbnNpb247XG5cdFx0XHRcdGlmIChuZXdJbmRleCAhPT0gb2JzRHluYUluZGV4ZXNbaV0pIHtcblx0XHRcdFx0XHR0aHJvdyAobmV3IEVycm9yKCd0aHNvZSBzaG91bGQgbWF0Y2gnKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuZXh0T2JzZXJ2ZWREaW1lbnNpb24rKztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld0luZGV4ID0gbmV4dER5bmFtaWNEaW1lbnNpb247XG5cdFx0XHRcdG5leHREeW5hbWljRGltZW5zaW9uKys7XG5cdFx0XHR9XG5cblx0XHRcdGR5bmFtaWNJbmRleGVzLnB1c2gobmV3SW5kZXgpO1xuXHRcdH1cblxuXHRcdGNvbmZzW2tdID0ge1xuXHRcdFx0ZHluYW1pY0luZGV4ZXMsXG5cdFx0XHR0cmFuc2l0aW9uLFxuXHRcdFx0ZGltZW5zaW9uLFxuXHRcdFx0Y292YXJpYW5jZSxcblx0XHRcdGluaXQsXG5cdFx0fTtcblx0fSk7XG5cblx0Y29uc3QgdG90YWxEaW1lbnNpb24gPSBkeW5hbWljTmFtZXMubWFwKGsgPT4gY29uZnNba10uZGltZW5zaW9uKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblxuXHRpZiAobmV4dER5bmFtaWNEaW1lbnNpb24gIT09IHRvdGFsRGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignbWlzY2FsY3VsYXRpb24gb2YgdHJhbnNpdGlvbicpKTtcblx0fVxuXG5cdGNvbnN0IGluaXQgPSB7XG5cdFx0aW5kZXg6IC0xLFxuXHRcdG1lYW46IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbiksXG5cdFx0Y292YXJpYW5jZTogbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkpLFxuXHR9O1xuXHRkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcblx0XHRjb25zdCB7XG5cdFx0XHRkeW5hbWljSW5kZXhlcyxcblx0XHRcdGluaXQ6IGxvY2FsSW5pdCxcblx0XHR9ID0gY29uZnNba107XG5cdFx0aWYgKHR5cGVvZiAobG9jYWxJbml0KSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0luaXQgaXMgbWFuZGF0b3J5Jyk7XG5cdFx0fVxuXG5cdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcblx0XHRcdGluaXQuY292YXJpYW5jZVtjMV1bYzJdID0gbG9jYWxJbml0LmNvdmFyaWFuY2VbaTFdW2kyXTtcblx0XHR9KSk7XG5cdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiB7XG5cdFx0XHRpbml0Lm1lYW5bYzFdID0gbG9jYWxJbml0Lm1lYW5baTFdO1xuXHRcdH0pO1xuXHR9KTtcblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb246IHRvdGFsRGltZW5zaW9uLFxuXHRcdGluaXQsXG5cdFx0dHJhbnNpdGlvbihvcHRpb25zKSB7XG5cdFx0XHRjb25zdCB7cHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0aW9ucztcblx0XHRcdGNvbnN0IHJlc3VsdFRyYW5zaXRpb24gPSBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwodW5kZWZpbmVkKS5tYXAoKCkgPT4gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApKTtcblxuXHRcdFx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRkeW5hbWljSW5kZXhlcyxcblx0XHRcdFx0XHR0cmFuc2l0aW9uLFxuXHRcdFx0XHR9ID0gY29uZnNba107XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9uczIgPSB7XG5cdFx0XHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZDogcHJldmlvdXNDb3JyZWN0ZWQuc3ViU3RhdGUoZHluYW1pY0luZGV4ZXMpLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb25zdCB0cmFucyA9IHRyYW5zaXRpb24ob3B0aW9uczIpO1xuXHRcdFx0XHRkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMSwgaTEpID0+IGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMyLCBpMikgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdFRyYW5zaXRpb25bYzFdW2MyXSA9IHRyYW5zW2kxXVtpMl07XG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdFRyYW5zaXRpb247XG5cdFx0fSxcblx0XHRjb3ZhcmlhbmNlKG9wdGlvbnMpIHtcblx0XHRcdGNvbnN0IHtwcmV2aW91c0NvcnJlY3RlZH0gPSBvcHRpb25zO1xuXHRcdFx0Y29uc3QgcmVzdWx0Q292YXJpYW5jZSA9IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCh1bmRlZmluZWQpLm1hcCgoKSA9PiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwoMCkpO1xuXG5cdFx0XHRkeW5hbWljTmFtZXMuZm9yRWFjaChrID0+IHtcblx0XHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRcdGR5bmFtaWNJbmRleGVzLFxuXHRcdFx0XHRcdGNvdmFyaWFuY2UsXG5cdFx0XHRcdH0gPSBjb25mc1trXTtcblxuXHRcdFx0XHRjb25zdCBvcHRpb25zMiA9IHtcblx0XHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0XHRcdHByZXZpb3VzQ29ycmVjdGVkOiBwcmV2aW91c0NvcnJlY3RlZC5zdWJTdGF0ZShkeW5hbWljSW5kZXhlcyksXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Y29uc3QgY292ID0gY292YXJpYW5jZShvcHRpb25zMik7XG5cdFx0XHRcdC8vIENvbnNvbGUubG9nKCdkeW5hbWljLmNvbXBvc2l0aW9uJyxrLCBjb3YsIGR5bmFtaWNJbmRleGVzKVxuXHRcdFx0XHRkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMSwgaTEpID0+IGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMyLCBpMikgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdENvdmFyaWFuY2VbYzFdW2MyXSA9IGNvdltpMV1baTJdO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHRDb3ZhcmlhbmNlO1xuXHRcdH0sXG5cdH07XG59XG4iLCJpbXBvcnQge2lkZW50aXR5fSBmcm9tICdzaW1wbGUtbGluYWxnJztcblxuLyoqXG4qIENyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgYWNjZWxlcmF0aW9uIG1vZGVsIHdpdGggcmVzcGVjdCB3aXRoIHRoZSBkaW1lbnNpb25zIHByb3ZpZGVkIGluIHRoZSBvYnNlcnZhdGlvbiBwYXJhbWV0ZXJzXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnN0YW50QWNjZWxlcmF0aW9uKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0bGV0IGRpbWVuc2lvbjtcblxuXHRpZiAoc3RhdGVQcm9qZWN0aW9uICYmIE51bWJlci5pc0ludGVnZXIoc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCAvIDMpKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoICogMztcblx0fSBlbHNlIGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdvYnNlcnZlZFByb2plY3Rpb24gb3Igc3RhdGVQcm9qZWN0aW9uIHNob3VsZCBiZSBkZWZpbmVkIGluIG9ic2VydmF0aW9uIGluIG9yZGVyIHRvIHVzZSBjb25zdGFudC1zcGVlZCBmaWx0ZXInKSk7XG5cdH1cblxuXHRjb25zdCBiYXNlRGltZW5zaW9uID0gZGltZW5zaW9uIC8gMztcblx0Ly8gV2UgY29uc3RydWN0IHRoZSB0cmFuc2l0aW9uIGFuZCBjb3ZhcmlhbmNlIG1hdHJpY2VzXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VEaW1lbnNpb247IGkrKykge1xuXHRcdHRyYW5zaXRpb25baV1baSArIGJhc2VEaW1lbnNpb25dID0gdGltZVN0ZXA7XG5cdFx0dHJhbnNpdGlvbltpXVtpICsgKDIgKiBiYXNlRGltZW5zaW9uKV0gPSAwLjUgKiAodGltZVN0ZXAgKiogMik7XG5cdFx0dHJhbnNpdGlvbltpICsgYmFzZURpbWVuc2lvbl1baSArICgyICogYmFzZURpbWVuc2lvbildID0gdGltZVN0ZXA7XG5cdH1cblxuXHRjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKVxuXHRcdC5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiB0aW1lU3RlcCkpXG5cdFx0LmNvbmNhdChuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCh0aW1lU3RlcCAqKiA0KSk7XG5cdGNvbnN0IGNvdmFyaWFuY2UgPSBkeW5hbWljLmNvdmFyaWFuY2UgfHwgYXJyYXlDb3ZhcmlhbmNlO1xuXHRyZXR1cm4ge1xuXHRcdC4uLmR5bmFtaWMsIGRpbWVuc2lvbiwgdHJhbnNpdGlvbiwgY292YXJpYW5jZSxcblx0fTtcbn1cblxuLy8gZXhwb3J0IGRlZmF1bHQgY29uc3RhbnRBY2NlbGVyYXRpb247IiwiaW1wb3J0IHtpZGVudGl0eSwgZGlhZ30gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbmNvbnN0IGh1Z2UgPSAxZTY7XG5cbi8qKlxuKiBDcmVhdGVzIGEgZHluYW1pYyBtb2RlbCwgY29uc2lkZXJpbmcgdGhlIG51bGwgaW4gb3JkZXIgdG8gbWFrZSB0aGUgcHJlZGljdGlvbnNcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBzdGF0aWNDb3ZhcmlhbmNlIGdlbmVyYXRlZCB3aXRoIG1vdmluZyBhdmVyYWdlXG4qIEBwYXJhbSB7TnVtYmVyfSBvYnNlcnZhdGlvbkRpbWVuc2lvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudFBvc2l0aW9uV2l0aE51bGwoe3N0YXRpY0NvdmFyaWFuY2UsIG9ic0R5bmFJbmRleGVzLCBpbml0fSkge1xuXHRjb25zdCBkaW1lbnNpb24gPSBvYnNEeW5hSW5kZXhlcy5sZW5ndGg7XG5cdGluaXQgfHw9IHtcblx0XHRtZWFuOiBuZXcgQXJyYXkob2JzRHluYUluZGV4ZXMubGVuZ3RoKS5maWxsKDApLm1hcCgoKSA9PiBbMF0pLFxuXHRcdGNvdmFyaWFuY2U6IGRpYWcobmV3IEFycmF5KG9ic0R5bmFJbmRleGVzLmxlbmd0aCkuZmlsbChodWdlKSksXG5cdFx0aW5kZXg6IC0xLFxuXHR9O1xuXG5cdGlmIChzdGF0aWNDb3ZhcmlhbmNlICYmIHN0YXRpY0NvdmFyaWFuY2UubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdzdGF0aWNDb3ZhcmlhbmNlIGhhcyB3cm9uZyBzaXplJykpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb24sXG5cdFx0dHJhbnNpdGlvbigpIHtcblx0XHRcdHJldHVybiBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRcdH0sXG5cdFx0Y292YXJpYW5jZSh7cHJldmlvdXNDb3JyZWN0ZWQsIGluZGV4fSkge1xuXHRcdFx0Y29uc3QgZGlmZkJldHdlZW5JbmRleGVzID0gaW5kZXggLSBwcmV2aW91c0NvcnJlY3RlZC5pbmRleDtcblx0XHRcdGlmIChzdGF0aWNDb3ZhcmlhbmNlKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0aWNDb3ZhcmlhbmNlLm1hcChyb3cgPT4gcm93Lm1hcChlbGVtZW50ID0+IGVsZW1lbnQgKiBkaWZmQmV0d2VlbkluZGV4ZXMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdFx0fSxcblx0XHRpbml0LFxuXHR9O1xufVxuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG4vKipcbiogQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGZvbGxvd2luZyBjb25zdGFudCBwb3NpdGlvbiBtb2RlbCB3aXRoIHJlc3BlY3Qgd2l0aCB0aGUgZGltZW5zaW9ucyBwcm92aWRlZCBpbiB0aGUgb2JzZXJ2YXRpb24gcGFyYW1ldGVyc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudFBvc2l0aW9uKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGxldCB7ZGltZW5zaW9ufSA9IGR5bmFtaWM7XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRsZXQge2NvdmFyaWFuY2V9ID0gZHluYW1pYztcblxuXHRpZiAoIWR5bmFtaWMuZGltZW5zaW9uKSB7XG5cdFx0aWYgKG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbjtcblx0XHR9IGVsc2UgaWYgKG9ic2VydmVkUHJvamVjdGlvbikge1xuXHRcdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0XHR9IGVsc2UgaWYgKHN0YXRlUHJvamVjdGlvbikge1xuXHRcdFx0ZGltZW5zaW9uID0gc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Y292YXJpYW5jZSB8fD0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0cmV0dXJuIHtcblx0XHQuLi5keW5hbWljLCBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsXG5cdH07XG59XG4iLCJpbXBvcnQge2RpYWd9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4uL3N0YXRlJztcblxuLyoqXG4qIENyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBjb25zaWRlcmluZyB0aGUgbnVsbCBpbiBvcmRlciB0byBtYWtlIHRoZSBwcmVkaWN0aW9uc1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ31cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudFNwZWVkRHluYW1pYyhhcmdzOiB7c3RhdGljQ292YXJpYW5jZTogbnVtYmVyW10sIGF2U3BlZWQ6IG51bWJlcltdLCBjZW50ZXI6IG51bWJlcltdfSwgb2JzZXJ2YXRpb24pIHtcblx0Y29uc3Qge3N0YXRpY0NvdmFyaWFuY2UsIGF2U3BlZWQsIGNlbnRlcn0gPSBhcmdzO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLm9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGg7XG5cblx0Y29uc3QgZGltZW5zaW9uID0gMiAqIG9ic2VydmF0aW9uRGltZW5zaW9uO1xuXG5cdGlmICgoY2VudGVyKSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0NlbnRlciBtdXN0IGJlIGRlZmluZWQnKSk7XG5cdH1cblxuXHRpZiAoY2VudGVyLmxlbmd0aCAhPT0gb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgQ2VudGVyIHNpemUgc2hvdWxkIGJlICR7b2JzZXJ2YXRpb25EaW1lbnNpb259YCkpO1xuXHR9XG5cblx0aWYgKGF2U3BlZWQubGVuZ3RoICE9PSBvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBhdlNwZWVkIHNpemUgc2hvdWxkIGJlICR7b2JzZXJ2YXRpb25EaW1lbnNpb259YCkpO1xuXHR9XG5cblx0Y29uc3QgaW5pdENvdiA9IGRpYWcoY2VudGVyLm1hcChjID0+IGMgKiBjIC8gMykuY29uY2F0KGF2U3BlZWQubWFwKGMgPT4gYyAqIGMgLyAzKSkpO1xuXG5cdGNvbnN0IGluaXQgPSB7XG5cdFx0bWVhbjogY2VudGVyLm1hcChjID0+IFtjXSkuY29uY2F0KGNlbnRlci5tYXAoKCkgPT4gWzBdKSksXG5cdFx0Y292YXJpYW5jZTogaW5pdENvdixcblx0XHRpbmRleDogLTEsXG5cdH07XG5cblx0Y29uc3QgdHJhbnNpdGlvbiA9IChhcmdzOiB7Z2V0VGltZTogKGluZGV4OiBudW1iZXIpID0+IG51bWJlciwgaW5kZXg6IG51bWJlciwgcHJldmlvdXNDb3JyZWN0ZWQ6IFN0YXRlfSkgPT4ge1xuXHRcdGNvbnN0IHtnZXRUaW1lLCBpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWR9ID0gYXJncztcblx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cdFx0aWYgKHR5cGVvZiAoZFQpICE9PSAnbnVtYmVyJyB8fCBOdW1iZXIuaXNOYU4oZFQpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgZFQgKCR7ZFR9KSBzaG91bGQgYmUgYSBudW1iZXJgKSk7XG5cdFx0fVxuXHRcdC8vIEV4YW1wbGUgaXMgOlxuXHRcdC8vIFtcblx0XHQvLyBcdFsxLCAwLCBkVCwgMF0sXG5cdFx0Ly8gXHRbMCwgMSwgMCwgZFRdLFxuXHRcdC8vIFx0WzAsIDAsIDEsIDBdLFxuXHRcdC8vIFx0WzAsIDAsIDAsIDFdXG5cdFx0Ly8gXTtcblx0XHQvLyBjb25zdGFudCBzcGVlZCB1c3VhbCBtYXRyaXhcblxuXHRcdC8vIGNyZWF0ZSBpZGVudGl0eSBtYXRyaXhcblx0XHRjb25zdCBtYXQgPSBkaWFnKGNlbnRlci5tYXAoKCkgPT4gMSkuY29uY2F0KGNlbnRlci5tYXAoKCkgPT4gMSkpKTtcblx0XHQvLyBUaGVuIGFkZCBkVFxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JzZXJ2YXRpb25EaW1lbnNpb247IGkrKykge1xuXHRcdFx0bWF0W2ldW29ic2VydmF0aW9uRGltZW5zaW9uICsgaV0gPSBkVDtcblx0XHR9XG5cblx0XHRpZiAoTnVtYmVyLmlzTmFOKG1hdFswXVsyXSkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCduYW4gbWF0JykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtYXQ7XG5cdH07XG5cblx0Y29uc3QgY292YXJpYW5jZSA9IChhcmdzOiB7aW5kZXg6IG51bWJlciwgcHJldmlvdXNDb3JyZWN0ZWQ6IFN0YXRlLCBnZXRUaW1lOiAoaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyfSkgPT4ge1xuXHRcdGNvbnN0IHtpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWQsIGdldFRpbWV9ID0gYXJncztcblx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cblx0XHRpZiAodHlwZW9mIChkVCkgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgZFQgKCR7ZFR9KSBzaG91bGQgYmUgYSBudW1iZXJgKSk7XG5cdFx0fVxuXG5cdFx0Ly8gU3RhdGUgaXMgKHgsIHksIHZ4LCB2eSlcblx0XHRjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KGRUKTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHNxcnQpKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh7bGFzdFByZXZpb3VzSW5kZXg6IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleH0pO1xuXHRcdFx0Y29uc29sZS5sb2coZFQsIHByZXZpb3VzQ29ycmVjdGVkLmluZGV4LCBpbmRleCwgZ2V0VGltZShpbmRleCksIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpKTtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoJ1NxcnQoZFQpIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGlhZyhzdGF0aWNDb3ZhcmlhbmNlLm1hcCh2ID0+IHYgKiBzcXJ0KSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRpbml0LFxuXHRcdGRpbWVuc2lvbixcblx0XHR0cmFuc2l0aW9uLFxuXHRcdGNvdmFyaWFuY2UsXG5cdH07XG59XG5cbi8vIG1vZHVsZS5leHBvcnRzID0gY29uc3RhbnRTcGVlZER5bmFtaWM7XG4iLCJpbXBvcnQge2lkZW50aXR5fSBmcm9tICdzaW1wbGUtbGluYWxnJztcblxuLyoqXG4qQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGZvbGxvd2luZyBjb25zdGFudCBwb3NpdGlvbiBtb2RlbCB3aXRoIHJlc3BlY3Qgd2l0aCB0aGUgZGltZW5zaW9ucyBwcm92aWRlZCBpbiB0aGUgb2JzZXJ2YXRpb24gcGFyYW1ldGVyc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudFNwZWVkKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHRpbWVTdGVwID0gZHluYW1pYy50aW1lU3RlcCB8fCAxO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0bGV0IGRpbWVuc2lvbjtcblxuXHRpZiAoc3RhdGVQcm9qZWN0aW9uICYmIE51bWJlci5pc0ludGVnZXIoc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCAvIDIpKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoICogMjtcblx0fSBlbHNlIGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uRGltZW5zaW9uICogMjtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdvYnNlcnZlZFByb2plY3Rpb24gb3Igc3RhdGVQcm9qZWN0aW9uIHNob3VsZCBiZSBkZWZpbmVkIGluIG9ic2VydmF0aW9uIGluIG9yZGVyIHRvIHVzZSBjb25zdGFudC1zcGVlZCBmaWx0ZXInKSk7XG5cdH1cblxuXHRjb25zdCBiYXNlRGltZW5zaW9uID0gZGltZW5zaW9uIC8gMjtcblx0Ly8gV2UgY29uc3RydWN0IHRoZSB0cmFuc2l0aW9uIGFuZCBjb3ZhcmlhbmNlIG1hdHJpY2VzXG5cdGNvbnN0IHRyYW5zaXRpb24gPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VEaW1lbnNpb247IGkrKykge1xuXHRcdHRyYW5zaXRpb25baV1baSArIGJhc2VEaW1lbnNpb25dID0gdGltZVN0ZXA7XG5cdH1cblxuXHRjb25zdCBhcnJheUNvdmFyaWFuY2UgPSBuZXcgQXJyYXkoYmFzZURpbWVuc2lvbikuZmlsbCgxKS5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiB0aW1lU3RlcCkpO1xuXHRjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcblx0cmV0dXJuIHtcblx0XHQuLi5keW5hbWljLCBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsXG5cdH07XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgY29uc3RhbnRQb3NpdGlvbn0gZnJvbSAnLi9jb25zdGFudC1wb3NpdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgY29uc3RhbnRTcGVlZH0gZnJvbSAnLi9jb25zdGFudC1zcGVlZCc7XG5leHBvcnQge2RlZmF1bHQgYXMgY29uc3RhbnRBY2NlbGVyYXRpb259IGZyb20gJy4vY29uc3RhbnQtYWNjZWxlcmF0aW9uJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjb21wb3NpdGlvbn0gZnJvbSAnLi9jb21wb3NpdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsfSBmcm9tICcuL2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgY29uc3RhbnRTcGVlZER5bmFtaWN9IGZyb20gJy4vY29uc3RhbnQtc3BlZWQtZHluYW1pYyc7XG5leHBvcnQge2RlZmF1bHQgYXMgc2hvcnR0ZXJtQ29uc3RhbnRTcGVlZH0gZnJvbSAnLi9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQnO1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vIFx0J2NvbnN0YW50LXBvc2l0aW9uJzogcmVxdWlyZSgnLi9jb25zdGFudC1wb3NpdGlvbi5qcycpLFxuLy8gXHQnY29uc3RhbnQtc3BlZWQnOiByZXF1aXJlKCcuL2NvbnN0YW50LXNwZWVkLmpzJyksXG4vLyBcdCdjb25zdGFudC1hY2NlbGVyYXRpb24nOiByZXF1aXJlKCcuL2NvbnN0YW50LWFjY2VsZXJhdGlvbi5qcycpLFxuLy8gXHRjb21wb3NpdGlvbjogcmVxdWlyZSgnLi9jb21wb3NpdGlvbi5qcycpLFxuLy8gXHQnY29uc3RhbnQtcG9zaXRpb24td2l0aC1udWxsJzogcmVxdWlyZSgnLi9jb25zdGFudC1wb3NpdGlvbi13aXRoLW51bGwuanMnKSxcbi8vIFx0J2NvbnN0YW50LXNwZWVkLXdpdGgtbnVsbCc6IHJlcXVpcmUoJy4vY29uc3RhbnQtc3BlZWQtd2l0aC1udWxsLmpzJyksXG4vLyBcdCdjb25zdGFudC1zcGVlZC1keW5hbWljJzogcmVxdWlyZSgnLi9jb25zdGFudC1zcGVlZC1keW5hbWljLmpzJyksXG4vLyBcdCdzaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQnOiByZXF1aXJlKCcuL3Nob3J0dGVybS1jb25zdGFudC1zcGVlZC5qcycpLFxuLy8gfTtcbi8vIiwiaW1wb3J0IHtlbGVtV2lzZSwgZGlhZ30gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgY29uc3RhbnRTcGVlZER5bmFtaWMgZnJvbSAnLi9jb25zdGFudC1zcGVlZC1keW5hbWljJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XG5cbmNvbnN0IHNhZmVEaXYgPSBmdW5jdGlvbiAoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuXHRpZiAoYSA9PT0gMCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cdGlmIChiID09PSAwKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblx0cmV0dXJuIGEgLyBiO1xufTtcblxuLyoqXG4qIFRoaXMgbW9kZWwgaXMgYmFzZWQgb24gdGhlIGNvbnN0YW50IHNwZWVkIG1vZGVsXG4qIFRoZSBjb25zdGFudCBzcGVlZCBtb2RlbCBjcmVhdGVzIHByb2JsZW1zIHdoZW4gZFQgPj4gZnBzICh0aGUgdHJhY2sgaXMgbG9zdClcbiogdGhlbiB0aGUgZXhwZWN0ZWQgcG9zaXRpb24gY2FuIGJlIHZlcnkgZmFyIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgZmllbGRcbiogdG8gc29sdmUgdGhhdCwgd2UgdXNlIGEgbW9kZWwgd2l0aCAyIG1vcmUgaGlkZGVuIHZhcmlhYmxlIHRoYXQgYXJlIGFsd2F5cyBjZW50ZXIgb2YgdGhlIGZpZWxkXG4qIFdoZW4gZFQgPDwgdHlwaWNhbFRpbWUgdGhlIG1vZGVsIGFjdHMgZXhhY3RseSBhcyBhIGNvbnN0YW50IHNwZWVkIG1vZGVsXG4qIFdoZW4gZFQgPj4gdHlwaWNhbFRpbWUgdGhlIG1vZGVsIGlzIGEgY29uc3RhbnQgW3gseV0gPSBjZW50ZXIgbW9kZWwsIHNpZ21hID0gZGVmYXVsdFZhcmlhbmNlXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50eXBpY2FsVGltZT0xMF1cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuLy8ge3R5cGljYWxUaW1lczogYW55LCBzdGF0aWNDb3ZhcmlhbmNlOiBhbnksIGF2U3BlZWQsIGNlbnRlcjogYW55OiBhbnl9XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG9ydHRlcm1Db25zdGFudFNwZWVkKG9wdGlvbnM6IGFueSwgb2JzZXJ2YXRpb24pIHtcblx0Y29uc3Qge3R5cGljYWxUaW1lc30gPSBvcHRpb25zO1xuXG5cdGlmICghQXJyYXkuaXNBcnJheSh0eXBpY2FsVGltZXMpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3R5cGljYWxUaW1lcyBtdXN0IGJlIGRlZmluZWQnKSk7XG5cdH1cblxuXHRjb25zdCBjb25zdGFudFNwZWVkID0gY29uc3RhbnRTcGVlZER5bmFtaWMob3B0aW9ucywgb2JzZXJ2YXRpb24pO1xuXHRjb25zdCB7ZGltZW5zaW9uLCBpbml0fSA9IGNvbnN0YW50U3BlZWQ7XG5cblx0aWYgKHR5cGljYWxUaW1lcy5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGB0eXBpY2FsVGltZXMgKCR7dHlwaWNhbFRpbWVzLmxlbmd0aH0pIGxlbmd0aCBpcyBub3QgYXMgZXhwZWN0ZWQgKCR7ZGltZW5zaW9ufSlgKSk7XG5cdH1cblxuXHRjb25zdCBtaXhNYXRyaXggPSBmdW5jdGlvbiAoe1xuXHRcdHJhdGlvcyxcblx0XHRhTWF0LFxuXHRcdGJNYXQsXG5cdH0pIHtcblx0XHRyZXR1cm4gZWxlbVdpc2UoW2FNYXQsIGJNYXRdLCAoW20sIGRdLCByb3dJbmRleCwgY29sSW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IHJhdGlvID0gcm93SW5kZXggPT09IGNvbEluZGV4ID8gcmF0aW9zW3Jvd0luZGV4XSA6IChyYXRpb3Nbcm93SW5kZXhdICsgcmF0aW9zW2NvbEluZGV4XSkgLyAyO1xuXG5cdFx0XHRyZXR1cm4gKHJhdGlvICogbSkgKyAoKDEgLSByYXRpbykgKiBkKTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdGRpbWVuc2lvbixcblx0XHRpbml0LFxuXHRcdHRyYW5zaXRpb24ob3B0aW9uczoge2dldFRpbWU6IChpbmRleDogbnVtYmVyKSA9PiBudW1iZXIsIGluZGV4OiBudW1iZXIsIHByZXZpb3VzQ29ycmVjdGVkOiBTdGF0ZX0pIHtcblx0XHRcdGNvbnN0IGFNYXQgPSBjb25zdGFudFNwZWVkLnRyYW5zaXRpb24ob3B0aW9ucyk7XG5cblx0XHRcdGNvbnN0IHtnZXRUaW1lLCBpbmRleCwgcHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0aW9ucztcblx0XHRcdGNvbnN0IGRUID0gZ2V0VGltZShpbmRleCkgLSBnZXRUaW1lKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KTtcblxuXHRcdFx0Y29uc3QgcmF0aW9zID0gdHlwaWNhbFRpbWVzLm1hcCh0ID0+IE1hdGguZXhwKC0xICogZFQgLyB0KSk7XG5cblx0XHRcdC8vICdiYWNrIHRvIGluaXQnIG1hdHJpeFxuXHRcdFx0Y29uc3QgYk1hdCA9IGRpYWcoXG5cdFx0XHRcdGVsZW1XaXNlKFtpbml0Lm1lYW4sIHByZXZpb3VzQ29ycmVjdGVkLm1lYW5dLCAoW20sIGRdKSA9PiBzYWZlRGl2KG0sIGQpKVxuXHRcdFx0XHQvLyBGbGF0dGVuIGNhdXNlIHRoaXMgaXMgYSBOeDEgbWF0cml4IC0+IE4gYXJyYXlcblx0XHRcdFx0XHQucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSksXG5cdFx0XHQpO1xuXG5cdFx0XHRyZXR1cm4gbWl4TWF0cml4KHtyYXRpb3MsIGFNYXQsIGJNYXR9KTtcblx0XHR9LFxuXHRcdGNvdmFyaWFuY2Uob3B0aW9uczoge2dldFRpbWU6IChpbmRleDogbnVtYmVyKSA9PiBudW1iZXIsIGluZGV4OiBudW1iZXIsIHByZXZpb3VzQ29ycmVjdGVkOiBTdGF0ZX0sIG9ic2VydmF0aW9uKSB7XG5cdFx0XHRjb25zdCB7Z2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkfSA9IG9wdGlvbnM7XG5cblx0XHRcdGNvbnN0IGRUID0gZ2V0VGltZShpbmRleCkgLSBnZXRUaW1lKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KTtcblx0XHRcdC8vIFN0YXRlIGlzICh4LCB5LCB2eCwgdnkpXG5cdFx0XHRjb25zdCByYXRpb3MgPSB0eXBpY2FsVGltZXMubWFwKHQgPT4gTWF0aC5leHAoLTEgKiBkVCAvIHQpKTtcblx0XHRcdGNvbnN0IGFNYXQgPSBjb25zdGFudFNwZWVkLmNvdmFyaWFuY2Uob3B0aW9ucy8qLCBvYnNlcnZhdGlvbiovICk7XG5cdFx0XHRyZXR1cm4gbWl4TWF0cml4KHtyYXRpb3MsIGFNYXQsIGJNYXQ6IGluaXQuY292YXJpYW5jZX0pO1xuXHRcdH0sXG5cdH07XG59XG4iLCJcbmltcG9ydCB7ZnJvYmVuaXVzIGFzIGRpc3RhbmNlTWF0fSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBhcnJheVRvTWF0cml4IGZyb20gJy4uL2xpYi91dGlscy9hcnJheS10by1tYXRyaXgnO1xuaW1wb3J0IHNldERpbWVuc2lvbnMgZnJvbSAnLi4vbGliL3NldHVwL3NldC1kaW1lbnNpb25zJztcbmltcG9ydCBjaGVja0RpbWVuc2lvbnMgZnJvbSAnLi4vbGliL3NldHVwL2NoZWNrLWRpbWVuc2lvbnMnO1xuaW1wb3J0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uIGZyb20gJy4uL2xpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uJztcbmltcG9ydCBleHRlbmREeW5hbWljSW5pdCBmcm9tICcuLi9saWIvc2V0dXAvZXh0ZW5kLWR5bmFtaWMtaW5pdCc7XG5pbXBvcnQgdG9GdW5jdGlvbiBmcm9tICcuLi9saWIvdXRpbHMvdG8tZnVuY3Rpb24nO1xuaW1wb3J0IGRlZXBBc3NpZ24gZnJvbSAnLi4vbGliL3V0aWxzL2RlZXAtYXNzaWduJztcbmltcG9ydCBwb2x5bW9ycGhNYXRyaXggZnJvbSAnLi4vbGliL3V0aWxzL3BvbHltb3JwaC1tYXRyaXgnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0ICogYXMgbW9kZWxDb2xsZWN0aW9uIGZyb20gJy4vbW9kZWwtY29sbGVjdGlvbic7XG5pbXBvcnQgQ29yZUthbG1hbkZpbHRlciBmcm9tICcuL2NvcmUta2FsbWFuLWZpbHRlcic7XG5pbXBvcnQge1xuXHREeW5hbWljQ29uZmlnLCBPYnNlcnZhdGlvbkNvbmZpZywgT2JzZXJ2YXRpb25PYmplY3RDb25maWcsIFdpbnN0b25Mb2dnZXIsXG59IGZyb20gJy4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuaW1wb3J0IFR5cGVBc3NlcnQgZnJvbSAnLi90eXBlcy9UeXBlQXNzZXJ0JztcblxuLyoqXG4gKiBAdHlwZWRlZiB7U3RyaW5nfSBEeW5hbWljTm9uT2JqZWN0Q29uZmlnXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge0R5bmFtaWNDb25maWd9IER5bmFtaWNPYmplY3RDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lXG4gKi9cbi8qKlxuICogQHBhcmFtIHtEeW5hbWljTm9uT2JqZWN0Q29uZmlnfSBkeW5hbWljXG4gKiBAcmV0dXJucyB7RHluYW1pY09iamVjdENvbmZpZ31cbiAqL1xuXG5jb25zdCBidWlsZERlZmF1bHREeW5hbWljID0gZnVuY3Rpb24gKGR5bmFtaWMpOiB7bmFtZTogc3RyaW5nfSB7XG5cdGlmICh0eXBlb2YgKGR5bmFtaWMpID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiB7bmFtZTogZHluYW1pY307XG5cdH1cblxuXHRyZXR1cm4ge25hbWU6ICdjb25zdGFudC1wb3NpdGlvbid9O1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7U3RyaW5nIHwgTnVtYmVyfSBPYnNlcnZhdGlvbk5vbk9iamVjdENvbmZpZ1xuICovXG4vKipcbiAqIEB0eXBlZGVmIHtPYnNlcnZhdGlvbkNvbmZpZ30gT2JzZXJ2YXRpb25PYmplY3RDb25maWdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lXG4gKi9cbi8qKlxuICogQHBhcmFtIHtPYnNlcnZhdGlvbk5vbk9iamVjdENvbmZpZ30gb2JzZXJ2YXRpb25cbiAqIEByZXR1cm5zIHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZ31cbiAqL1xuY29uc3QgYnVpbGREZWZhdWx0T2JzZXJ2YXRpb24gPSBmdW5jdGlvbiAob2JzZXJ2YXRpb24pOiBPYnNlcnZhdGlvbk9iamVjdENvbmZpZyB7XG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uKSA9PT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4ge25hbWU6ICdzZW5zb3InLCBzZW5zb3JEaW1lbnNpb246IG9ic2VydmF0aW9ufTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uKSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4ge25hbWU6IG9ic2VydmF0aW9ufTtcblx0fVxuXG5cdHJldHVybiB7bmFtZTogJ3NlbnNvcid9O1xufTtcbi8qKlxuKlRoaXMgZnVuY3Rpb24gZmlsbHMgdGhlIGdpdmVuIG9wdGlvbnMgYnkgc3VjY2Vzc2l2ZWx5IGNoZWNraW5nIGlmIGl0IHVzZXMgYSByZWdpc3RlcmVkIG1vZGVsLFxuKiBpdCBidWlsZHMgYW5kIGNoZWNrcyB0aGUgZHluYW1pYyBhbmQgb2JzZXJ2YXRpb24gZGltZW5zaW9ucywgYnVpbGQgdGhlIHN0YXRlUHJvamVjdGlvbiBpZiBvbmx5IG9ic2VydmVkUHJvamVjdGlvblxuKmlzIGdpdmVuLCBhbmQgaW5pdGlhbGl6ZSBkeW5hbWljLmluaXRcbipAcGFyYW0ge0R5bmFtaWNPYmplY3RDb25maWcgfCBEeW5hbWljTm9uT2JqZWN0Q29uZmlnfSBvcHRpb25zLmR5bmFtaWNcbipAcGFyYW0ge09ic2VydmF0aW9uT2JqZWN0Q29uZmlnIHwgT2JzZXJ2YXRpb25Ob25PYmplY3RDb25maWd9IG9wdGlvbnMub2JzZXJ2YXRpb25cbiogQHJldHVybnMge0NvcmVDb25maWd9XG4qL1xuXG5jb25zdCBzZXR1cE1vZGVsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbiAoYXJnczoge1xuXHRvYnNlcnZhdGlvbj86IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCBPYnNlcnZhdGlvbk9iamVjdENvbmZpZywgLy8gT2JzZXJ2YXRpb25Db25maWdcblx0ZHluYW1pYz86IGFueVxufSkge1xuXHRsZXQge29ic2VydmF0aW9uLCBkeW5hbWljfSA9IGFyZ3M7XG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uKSAhPT0gJ29iamVjdCcgfHwgb2JzZXJ2YXRpb24gPT09IG51bGwpIHtcblx0XHRvYnNlcnZhdGlvbiA9IGJ1aWxkRGVmYXVsdE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGR5bmFtaWMpICE9PSAnb2JqZWN0JyB8fCBkeW5hbWljID09PSBudWxsKSB7XG5cdFx0ZHluYW1pYyA9IGJ1aWxkRGVmYXVsdER5bmFtaWMoZHluYW1pYy8qLCBvYnNlcnZhdGlvbiovKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uLm5hbWUpID09PSAnc3RyaW5nJykge1xuXHRcdG9ic2VydmF0aW9uID0gbW9kZWxDb2xsZWN0aW9uLmJ1aWxkT2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoZHluYW1pYy5uYW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHRkeW5hbWljID0gbW9kZWxDb2xsZWN0aW9uLmJ1aWxkRHluYW1pYyhkeW5hbWljLCBvYnNlcnZhdGlvbik7XG5cdH1cblxuXHRjb25zdCB3aXRoRGltZW5zaW9uT3B0aW9ucyA9IHNldERpbWVuc2lvbnMoe29ic2VydmF0aW9uLCBkeW5hbWljfSk7XG5cdGNvbnN0IGNoZWNrZWREaW1lbnNpb25PcHRpb25zID0gY2hlY2tEaW1lbnNpb25zKHdpdGhEaW1lbnNpb25PcHRpb25zKTtcblx0Y29uc3QgYnVpbGRTdGF0ZVByb2plY3Rpb25PcHRpb25zID0gYnVpbGRTdGF0ZVByb2plY3Rpb24oY2hlY2tlZERpbWVuc2lvbk9wdGlvbnMpO1xuXHRyZXR1cm4gZXh0ZW5kRHluYW1pY0luaXQoYnVpbGRTdGF0ZVByb2plY3Rpb25PcHRpb25zKTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxzUGFyYW1ldGVycyB7XG5cdGR5bmFtaWM6IER5bmFtaWNDb25maWc7XG5cdG9ic2VydmF0aW9uOiBPYnNlcnZhdGlvbkNvbmZpZzsvLyBPYnNlcnZhdGlvbk9iamVjdENvbmZpZyAmIHtzdGF0ZVByb2plY3Rpb246IGFueTsgY292YXJpYW5jZTogYW55fTtcbn1cblxuLyoqXG4qIFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgd2l0aG91dCBhcnJheXMgYXMgdmFsdWVzIGJ1dCBvbmx5IGZ1bmN0aW9uc1xuKiBAcGFyYW0ge01vZGVsc1BhcmFtZXRlcnN9IG1vZGVsVG9CZUNoYW5nZWRcbiogQHJldHVybnMge0NvcmVDb25maWd9IG1vZGVsIHdpdGggcmVzcGVjdCBvZiB0aGUgQ29yZSBLYWxtYW4gRmlsdGVyIHByb3BlcnRpZXNcbiovXG5jb25zdCBtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9ucyA9IGZ1bmN0aW9uIChtb2RlbFRvQmVDaGFuZ2VkOiBNb2RlbHNQYXJhbWV0ZXJzKSB7XG5cdGNvbnN0IHtvYnNlcnZhdGlvbiwgZHluYW1pY30gPSBtb2RlbFRvQmVDaGFuZ2VkO1xuXHRUeXBlQXNzZXJ0LmFzc2VydE5vdEFycmF5KG9ic2VydmF0aW9uLCAnbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnM6IG9ic2VydmF0aW9uJyk7XG5cdC8vIFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgJ21vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zOiBvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24nKTtcblx0Ly8gVHlwZUFzc2VydC5hc3NlcnRJc0FycmF5MkQob2JzZXJ2YXRpb24uY292YXJpYW5jZSwgJ21vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zOiBvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlJyk7XG5cdC8vIFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKGR5bmFtaWMudHJhbnNpdGlvbiwgJ21vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zOiBkeW5hbWljLnRyYW5zaXRpb24nKTtcblx0Ly8gVHlwZUFzc2VydC5hc3NlcnRJc051bWJlcnNBcnJheShkeW5hbWljLmNvdmFyaWFuY2UsICdtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9uczogZHluYW1pYy5jb3ZhcmlhbmNlJyk7XG5cdHJldHVybiBkZWVwQXNzaWduKG1vZGVsVG9CZUNoYW5nZWQsIHtcblx0XHRvYnNlcnZhdGlvbjoge1xuXHRcdFx0c3RhdGVQcm9qZWN0aW9uOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24pLCB7bGFiZWw6ICdvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24nfSksXG5cdFx0XHRjb3ZhcmlhbmNlOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChvYnNlcnZhdGlvbi5jb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBvYnNlcnZhdGlvbi5kaW1lbnNpb259KSwge2xhYmVsOiAnb2JzZXJ2YXRpb24uY292YXJpYW5jZSd9KSxcblx0XHR9LFxuXHRcdGR5bmFtaWM6IHtcblx0XHRcdHRyYW5zaXRpb246IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KGR5bmFtaWMudHJhbnNpdGlvbiksIHtsYWJlbDogJ2R5bmFtaWMudHJhbnNpdGlvbid9KSxcblx0XHRcdGNvdmFyaWFuY2U6IHRvRnVuY3Rpb24ocG9seW1vcnBoTWF0cml4KGR5bmFtaWMuY292YXJpYW5jZSwge2RpbWVuc2lvbjogZHluYW1pYy5kaW1lbnNpb259KSwge2xhYmVsOiAnZHluYW1pYy5jb3ZhcmlhbmNlJ30pLFxuXHRcdH0sXG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2FsbWFuRmlsdGVyIGV4dGVuZHMgQ29yZUthbG1hbkZpbHRlciB7XG5cdC8qKlxuXHQqIEB0eXBlZGVmIHtPYmplY3R9IENvbmZpZ1xuXHQqIEBwcm9wZXJ0eSB7RHluYW1pY09iamVjdENvbmZpZyB8IER5bmFtaWNOb25PYmplY3RDb25maWd9IGR5bmFtaWNcblx0KiBAcHJvcGVydHkge09ic2VydmF0aW9uT2JqZWN0Q29uZmlnIHwgT2JzZXJ2YXRpb25Ob25PYmplY3RDb25maWd9IG9ic2VydmF0aW9uXG5cdCovXG5cdC8qKlxuXHQqIEBwYXJhbSB7Q29uZmlnfSBvcHRpb25zXG5cdCovXG5cdC8vIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHtvYnNlcnZhdGlvbj86IE9ic2VydmF0aW9uQ29uZmlnLCBkeW5hbWljPzogRHluYW1pY0NvbmZpZywgbG9nZ2VyPzogV2luc3RvbkxvZ2dlcn0gPSB7fSkge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zOiB7b2JzZXJ2YXRpb24/OiBhbnkgfCB7bmFtZTogc3RyaW5nfSwgZHluYW1pYz86IGFueSB8IHtuYW1lOiBzdHJpbmd9LCBsb2dnZXI/OiBXaW5zdG9uTG9nZ2VyfSA9IHt9KSB7XG5cdFx0Y29uc3QgbW9kZWxzUGFyYW1ldGVycyA9IHNldHVwTW9kZWxzUGFyYW1ldGVycyhvcHRpb25zKTtcblx0XHRjb25zdCBjb3JlT3B0aW9ucyA9IG1vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zKG1vZGVsc1BhcmFtZXRlcnMpO1xuXG5cdFx0c3VwZXIoey4uLm9wdGlvbnMsIC4uLmNvcmVPcHRpb25zfSk7XG5cdH1cblx0Ly8gcHJldmlvdXNDb3JyZWN0ZWQ/OiBTdGF0ZSwgaW5kZXg/OiBudW1iZXIsXG5cdGNvcnJlY3Qob3B0aW9uczoge3ByZWRpY3RlZDogU3RhdGUsIG9ic2VydmF0aW9uOiBudW1iZXJbXSB8IG51bWJlcltdW119KTogU3RhdGUge1xuXHRcdGNvbnN0IGNvcmVPYnNlcnZhdGlvbiA9IGFycmF5VG9NYXRyaXgoe29ic2VydmF0aW9uOiBvcHRpb25zLm9ic2VydmF0aW9uLCBkaW1lbnNpb246IHRoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9ufSk7XG5cdFx0cmV0dXJuIHN1cGVyLmNvcnJlY3Qoe1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdG9ic2VydmF0aW9uOiBjb3JlT2JzZXJ2YXRpb24sXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0KiBQZXJmb3JtcyB0aGUgcHJlZGljdGlvbiBhbmQgdGhlIGNvcnJlY3Rpb24gc3RlcHNcblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZFxuXHQqIEBwYXJhbSB7PEFycmF5LjxOdW1iZXI+Pn0gb2JzZXJ2YXRpb25cblx0KiBAcmV0dXJucyB7QXJyYXkuPE51bWJlcj59IHRoZSBtZWFuIG9mIHRoZSBjb3JyZWN0aW9uc1xuXHQqL1xuXHRmaWx0ZXIob3B0aW9uczoge3ByZXZpb3VzQ29ycmVjdGVkPzogU3RhdGUsIGluZGV4PzogbnVtYmVyLCBvYnNlcnZhdGlvbjogbnVtYmVyW10gfCBudW1iZXJbXVtdfSk6IFN0YXRlIHtcblx0XHRjb25zdCBwcmVkaWN0ZWQgPSBzdXBlci5wcmVkaWN0KG9wdGlvbnMpO1xuXHRcdHJldHVybiB0aGlzLmNvcnJlY3Qoe1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdHByZWRpY3RlZCxcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuICAgICAqIEZpbHRlcnMgYWxsIHRoZSBvYnNlcnZhdGlvbnNcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uc1xuICAgICAqIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSB0aGUgbWVhbiBvZiB0aGUgY29ycmVjdGlvbnNcbiAgICAgKi9cblx0ZmlsdGVyQWxsKG9ic2VydmF0aW9ucyk6IG51bWJlcltdW10ge1xuXHRcdGxldCBwcmV2aW91c0NvcnJlY3RlZCA9IHRoaXMuZ2V0SW5pdFN0YXRlKCk7XG5cdFx0Y29uc3QgcmVzdWx0czogbnVtYmVyW11bXSA9IFtdO1xuXHRcdGZvciAoY29uc3Qgb2JzZXJ2YXRpb24gb2Ygb2JzZXJ2YXRpb25zKSB7XG5cdFx0XHRjb25zdCBwcmVkaWN0ZWQgPSB0aGlzLnByZWRpY3Qoe3ByZXZpb3VzQ29ycmVjdGVkfSk7XG5cdFx0XHRwcmV2aW91c0NvcnJlY3RlZCA9IHRoaXMuY29ycmVjdCh7XG5cdFx0XHRcdHByZWRpY3RlZCxcblx0XHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHR9KTtcblx0XHRcdHJlc3VsdHMucHVzaChwcmV2aW91c0NvcnJlY3RlZC5tZWFuLm1hcChtID0+IG1bMF0pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgYXN5bXB0b3RpYyBzdGF0ZSBjb3ZhcmlhbmNlIGFzIGV4cGxhaW5lZCBpbiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9LYWxtYW5fZmlsdGVyI0FzeW1wdG90aWNfZm9ybVxuXHQqIGluIHByYWN0aWNlIHRoaXMgY2FuIGJlIHVzZWQgYXMgYSBpbml0LmNvdmFyaWFuY2UgdmFsdWUgYnV0IGlzIHZlcnkgY29zdGZ1bCBjYWxjdWxhdGlvbiAodGhhdCdzIHdoeSB0aGlzIGlzIG5vdCBtYWRlIGJ5IGRlZmF1bHQpXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdEl0ZXJhdGlvbnM9MWUyXSBtYXggbnVtYmVyIG9mIGl0ZXJhdGlvbnNcblx0KiBAcGFyYW0ge051bWJlcn0gW3RvbGVyYW5jZT0xZS02XSByZXR1cm5zIHdoZW4gdGhlIGxhc3QgdmFsdWVzIGRpZmZlcmVuY2VzIGFyZSBsZXNzIHRoYW4gdG9sZXJhbmNlXG5cdCogQHJldHVybiB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gY292YXJpYW5jZVxuXHQqL1xuXHRhc3ltcHRvdGljU3RhdGVDb3ZhcmlhbmNlKHtsaW1pdEl0ZXJhdGlvbnMgPSAxZTIsIHRvbGVyYW5jZSA9IDFlLTZ9ID0ge30pOiBudW1iZXJbXVtdIHtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSBzdXBlci5nZXRJbml0U3RhdGUoKTtcblx0XHRjb25zdCByZXN1bHRzOiBudW1iZXJbXVtdW10gPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0SXRlcmF0aW9uczsgaSsrKSB7XG5cdFx0XHQvLyBXZSBjcmVhdGUgYSBmYWtlIG1lYW4gdGhhdCB3aWxsIG5vdCBiZSB1c2VkIGluIG9yZGVyIHRvIGtlZXAgY29oZXJlbmNlXG5cdFx0XHRjb25zdCBwcmVkaWN0ZWQgPSBuZXcgU3RhdGUoe1xuXHRcdFx0XHRtZWFuOiBbXSxcblx0XHRcdFx0Y292YXJpYW5jZTogc3VwZXIuZ2V0UHJlZGljdGVkQ292YXJpYW5jZSh7cHJldmlvdXNDb3JyZWN0ZWR9KSxcblx0XHRcdH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBuZXcgU3RhdGUoe1xuXHRcdFx0XHRtZWFuOiBbXSxcblx0XHRcdFx0Y292YXJpYW5jZTogc3VwZXIuZ2V0Q29ycmVjdGVkQ292YXJpYW5jZSh7cHJlZGljdGVkfSksXG5cdFx0XHR9KTtcblx0XHRcdHJlc3VsdHMucHVzaChwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlKTtcblx0XHRcdGlmIChkaXN0YW5jZU1hdChwcmV2aW91c0NvcnJlY3RlZC5jb3ZhcmlhbmNlLCByZXN1bHRzW2kgLSAxXSkgPCB0b2xlcmFuY2UpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRocm93IChuZXcgRXJyb3IoJ1RoZSBzdGF0ZSBjb3ZhcmlhbmNlIGRvZXMgbm90IGNvbnZlcmdlIGFzeW1wdG90aWNhbGx5JykpO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBhc3ltcHRvdGljIGdhaW4sIGFzIGV4cGxhaW5lZCBpbiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9LYWxtYW5fZmlsdGVyI0FzeW1wdG90aWNfZm9ybVxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbdG9sZXJhbmNlPTFlLTZdIHJldHVybnMgd2hlbiB0aGUgbGFzdCB2YWx1ZXMgZGlmZmVyZW5jZXMgYXJlIGxlc3MgdGhhbiB0b2xlcmFuY2Vcblx0KiBAcmV0dXJuIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBnYWluXG5cdCovXG5cdGFzeW1wdG90aWNHYWluKHt0b2xlcmFuY2UgPSAxZS02fSA9IHt9KTogbnVtYmVyW11bXSB7XG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IHRoaXMuYXN5bXB0b3RpY1N0YXRlQ292YXJpYW5jZSh7dG9sZXJhbmNlfSk7XG5cblx0XHRjb25zdCBhc3ltcHRvdGljU3RhdGUgPSBuZXcgU3RhdGUoe1xuXHRcdFx0Ly8gV2UgY3JlYXRlIGEgZmFrZSBtZWFuIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBpbiBvcmRlciB0byBrZWVwIGNvaGVyZW5jZVxuXHRcdFx0bWVhbjogQXJyYXkuZnJvbSh7bGVuZ3RoOiBjb3ZhcmlhbmNlLmxlbmd0aH0pLmZpbGwoMCkubWFwKCgpID0+IFswXSksXG5cdFx0XHRjb3ZhcmlhbmNlLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHN1cGVyLmdldEdhaW4oe3ByZWRpY3RlZDogYXN5bXB0b3RpY1N0YXRlfSk7XG5cdH1cbn1cbiIsImNvbnN0IHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsczogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuLy8gY29uc3QgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHM6IFJlY29yZDwoZHluYW1pYywgb2JzZXJ2YXRpb24pID0+IGR5bmFtaWMsIHtkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2V9PiA9IHt9O1xuY29uc3QgcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcblxuLyoqXG4gKiBFbmFibGVzIHRvIHJlZ2lzdGVyIG9ic2VydmF0aW9uIG1vZGVsIGFuZCBzdG9yZSBpdFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBjYWxsYmFjayBmbiB0aGUgZnVuY3Rpb24gY29ycmVzcG9uZGluZyB0byB0aGUgZGVzaXJlZCBtb2RlbFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck9ic2VydmF0aW9uKG5hbWU6IHN0cmluZywgZm4pIHtcblx0cmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW25hbWVdID0gZm47XG59XG5cbi8qKlxuICogRW5hYmxlcyB0byByZWdpc3RlciBkeW5hbWljIG1vZGVsIGFuZCBzdG9yZSBpdFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBjYWxsYmFjayBmbiB0aGUgZnVuY3Rpb24gY29ycmVzcG9uZGluZyB0byB0aGUgZGVzaXJlZCBtb2RlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEeW5hbWljKG5hbWU6IHN0cmluZywgZm4pOiB2b2lkIHtcblx0cmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbbmFtZV0gPSBmbjtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIG1vZGVsIGdpdmVuIGFuIG9ic2VydmF0aW9uIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4gKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWd9IHRoZSBjb25maWd1cmF0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgbW9kZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT2JzZXJ2YXRpb24ob2JzZXJ2YXRpb24pIHtcblx0aWYgKHR5cGVvZiAocmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKFxuXHRcdFx0YFRoZSBwcm92aWRlZCBvYnNlcnZhdGlvbiBtb2RlbCBuYW1lICgke29ic2VydmF0aW9uLm5hbWV9KSBpcyBub3QgcmVnaXN0ZXJlZGAsXG5cdFx0KSk7XG5cdH1cblxuXHRyZXR1cm4gcmVnaXN0ZXJlZE9ic2VydmF0aW9uTW9kZWxzW29ic2VydmF0aW9uLm5hbWVdKG9ic2VydmF0aW9uKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIG1vZGVsIGdpdmVuIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGNvbmZpZ3VyYXRpb25zXG4gKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiAqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4gKiBAcmV0dXJucyB7RHluYW1pY0NvbmZpZ30gdGhlIGR5bmFtaWMgY29uZmlndXJhdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZGVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pIHtcblx0aWYgKHR5cGVvZiAocmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbZHluYW1pYy5uYW1lXSkgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihcblx0XHRcdGBUaGUgcHJvdmlkZWQgZHluYW1pYyBtb2RlbCAoJHtkeW5hbWljLm5hbWV9KSBuYW1lIGlzIG5vdCByZWdpc3RlcmVkYCxcblx0XHQpKTtcblx0fVxuXHRyZXR1cm4gcmVnaXN0ZXJlZER5bmFtaWNNb2RlbHNbZHluYW1pYy5uYW1lXShkeW5hbWljLCBvYnNlcnZhdGlvbik7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgc2Vuc29yfSBmcm9tICcuL3NlbnNvcic7XG5leHBvcnQge2RlZmF1bHQgYXMgc2Vuc29yTG9jYWxWYXJpYW5jZX0gZnJvbSAnLi9zZW5zb3ItbG9jYWwtdmFyaWFuY2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNlbnNvclByb2plY3RlZH0gZnJvbSAnLi9zZW5zb3ItcHJvamVjdGVkJztcblxuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbmltcG9ydCB7YnVpbGRPYnNlcnZhdGlvbn0gZnJvbSAnLi4vbW9kZWwtY29sbGVjdGlvbic7XG5pbXBvcnQge09ic2VydmF0aW9uQ29uZmlnfSBmcm9tICcuLi90eXBlcy9PYnNlcnZhdGlvbkNvbmZpZyc7XG4vKipcbiogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuc2Vuc29yRGltZW5zaW9uXG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBvcHRpb25zLnNlbnNvckNvdmFyaWFuY2VcbiogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMublNlbnNvcnNcbiogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnfVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVsbGFibGVTZW5zb3Iob3B0aW9ucyk6IE9ic2VydmF0aW9uQ29uZmlnIHtcblx0Y29uc3Qge2RpbWVuc2lvbiwgb2JzZXJ2ZWRQcm9qZWN0aW9uLCBjb3ZhcmlhbmNlOiBiYXNlQ292YXJpYW5jZX0gPSBidWlsZE9ic2VydmF0aW9uKHsuLi5vcHRpb25zLCBuYW1lOiAnc2Vuc29yJ30pO1xuXG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uLFxuXHRcdG9ic2VydmVkUHJvamVjdGlvbixcblx0XHRjb3ZhcmlhbmNlKG8pOiBudW1iZXJbXVtdIHtcblx0XHRcdGNvbnN0IGNvdmFyaWFuY2UgPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRcdFx0Y29uc3Qge3ZhcmlhbmNlfSA9IG87XG5cblx0XHRcdHZhcmlhbmNlLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0Y292YXJpYW5jZVtpXVtpXSA9IHYgKiBiYXNlQ292YXJpYW5jZVtpXVtpXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gY292YXJpYW5jZTtcblx0XHR9LFxuXHR9O1xufVxuIiwiaW1wb3J0IHtpZGVudGl0eSwgbWF0UGVybXV0YXRpb259IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuaW1wb3J0IGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlIGZyb20gJy4uL3V0aWxzL2NvcnJlbGF0aW9uLXRvLWNvdmFyaWFuY2UnO1xuaW1wb3J0IGNvdmFyaWFuY2VUb0NvcnJlbGF0aW9uIGZyb20gJy4uL3V0aWxzL2NvdmFyaWFuY2UtdG8tY29ycmVsYXRpb24nO1xuXG4vKipcbipDcmVhdGVzIGFuIG9ic2VydmF0aW9uIG1vZGVsIHdpdGggYSBvYnNlcnZlZFByb2plY3Rpb24gY29ycmVzcG9uZGluZyB0b1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZW5zb3JQcm9qZWN0ZWQoe3NlbGVjdGVkQ292YXJpYW5jZSwgdG90YWxEaW1lbnNpb24sIG9ic0luZGV4ZXMsIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9ufSkge1xuXHRpZiAoIXNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0c2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24gPSBuZXcgQXJyYXkob2JzSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkubWFwKCgpID0+IG5ldyBBcnJheShvYnNJbmRleGVzLmxlbmd0aCkuZmlsbCgwKSk7XG5cdFx0b2JzSW5kZXhlcy5mb3JFYWNoKChpbmRleDEsIGkxKSA9PiB7XG5cdFx0XHRzZWxlY3RlZFN0YXRlUHJvamVjdGlvbltpMV1baTFdID0gMTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGggIT09IG9ic0luZGV4ZXMubGVuZ3RoKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihgW1NlbnNvci1wcm9qZWN0ZWRdIFNoYXBlIG1pc21hdGNoIGJldHdlZW4gJHtzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGh9IGFuZCAke29ic0luZGV4ZXMubGVuZ3RofWApKTtcblx0fVxuXG5cdGNvbnN0IGJhc2VDb3ZhcmlhbmNlID0gaWRlbnRpdHkodG90YWxEaW1lbnNpb24pO1xuXHRvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MSwgaTEpID0+IHtcblx0XHRpZiAoc2VsZWN0ZWRDb3ZhcmlhbmNlKSB7XG5cdFx0XHRvYnNJbmRleGVzLmZvckVhY2goKGluZGV4MiwgaTIpID0+IHtcblx0XHRcdFx0YmFzZUNvdmFyaWFuY2VbaW5kZXgxXVtpbmRleDJdID0gc2VsZWN0ZWRDb3ZhcmlhbmNlW2kxXVtpMl07XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXHRjb25zdCB7Y29ycmVsYXRpb246IGJhc2VDb3JyZWxhdGlvbiwgdmFyaWFuY2U6IGJhc2VWYXJpYW5jZX0gPSBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbihiYXNlQ292YXJpYW5jZSk7XG5cblx0Y29uc3QgZHluYURpbWVuc2lvbiA9IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblxuXHRpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoYHNoYXBlIG1pc21hdGNoICgke3NlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aH0gdnMgJHtvYnNJbmRleGVzLmxlbmd0aH0pYCkpO1xuXHR9XG5cblx0Y29uc3Qgb2JzZXJ2ZWRQcm9qZWN0aW9uID0gbWF0UGVybXV0YXRpb24oe1xuXHRcdG91dHB1dFNpemU6IFt0b3RhbERpbWVuc2lvbiwgZHluYURpbWVuc2lvbl0sXG5cdFx0Y29sSW5kZXhlczogc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb25bMF0ubWFwKChfLCBpKSA9PiBpKSxcblx0XHRyb3dJbmRleGVzOiBvYnNJbmRleGVzLFxuXHRcdG1hdHJpeDogc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24sXG5cdH0pO1xuXG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uOiB0b3RhbERpbWVuc2lvbixcblx0XHRvYnNlcnZlZFByb2plY3Rpb24sXG5cdFx0Y292YXJpYW5jZShvKSB7XG5cdFx0XHRjb25zdCB7dmFyaWFuY2V9ID0gbztcblx0XHRcdGlmICghdmFyaWFuY2UpIHtcblx0XHRcdFx0cmV0dXJuIGJhc2VDb3ZhcmlhbmNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodmFyaWFuY2UubGVuZ3RoICE9PSBiYXNlQ292YXJpYW5jZS5sZW5ndGgpIHtcblx0XHRcdFx0dGhyb3cgKG5ldyBFcnJvcigndmFyaWFuY2UgaXMgZGlmZmVyZW5jZSBzaXplIGZyb20gYmFzZUNvdmFyaWFuY2UnKSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlc3VsdCA9IGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlKHtjb3JyZWxhdGlvbjogYmFzZUNvcnJlbGF0aW9uLCB2YXJpYW5jZTogYmFzZVZhcmlhbmNlLm1hcCgoYiwgaSkgPT4gdmFyaWFuY2VbaV0gKiBiKX0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdH07XG59XG4iLCJpbXBvcnQge2lkZW50aXR5fSBmcm9tICdzaW1wbGUtbGluYWxnJztcblxuaW1wb3J0IHBvbHltb3JwaE1hdHJpeCBmcm9tICcuLi91dGlscy9wb2x5bW9ycGgtbWF0cml4JztcbmltcG9ydCBjaGVja01hdHJpeCBmcm9tICcuLi91dGlscy9jaGVjay1tYXRyaXgnO1xuaW1wb3J0IHtPYnNlcnZhdGlvbkNvbmZpZ30gZnJvbSAnLi4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuaW1wb3J0IFR5cGVBc3NlcnQgZnJvbSAnLi4vdHlwZXMvVHlwZUFzc2VydCc7XG5cbi8qKlxuKiBAcGFyYW0ge051bWJlcn0gc2Vuc29yRGltZW5zaW9uXG4qIEBwYXJhbSB7Q292YXJpYW5jZVBhcmFtfSBzZW5zb3JDb3ZhcmlhbmNlXG4qIEBwYXJhbSB7TnVtYmVyfSBuU2Vuc29yc1xuKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWd9XG4qL1xuXG5jb25zdCBjb3B5ID0gKG1hdDogbnVtYmVyW11bXSk6IG51bWJlcltdW10gPT4gbWF0Lm1hcChhID0+IGEuY29uY2F0KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZW5zb3Iob3B0aW9uczogYW55KTogT2JzZXJ2YXRpb25Db25maWcge1xuXHRjb25zdCB7c2Vuc29yRGltZW5zaW9uID0gMSwgc2Vuc29yQ292YXJpYW5jZSA9IDEsIG5TZW5zb3JzID0gMX0gPSBvcHRpb25zO1xuXHRjb25zdCBzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkID0gcG9seW1vcnBoTWF0cml4KHNlbnNvckNvdmFyaWFuY2UsIHtkaW1lbnNpb246IHNlbnNvckRpbWVuc2lvbn0pO1xuXHRpZiAoVHlwZUFzc2VydC5pc0Z1bmN0aW9uKHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQpKVxuXHR7dGhyb3cgbmV3IFR5cGVFcnJvcignc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCBjYW4gbm90IGJlIGEgZnVuY3Rpb24gaGVyZScpO31cblx0Y2hlY2tNYXRyaXgoc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCwgW3NlbnNvckRpbWVuc2lvbiwgc2Vuc29yRGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLnNlbnNvckNvdmFyaWFuY2UnKTtcblx0Y29uc3Qgb25lU2Vuc29yT2JzZXJ2ZWRQcm9qZWN0aW9uID0gaWRlbnRpdHkoc2Vuc29yRGltZW5zaW9uKTtcblx0bGV0IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbiA9IFtdO1xuXHRjb25zdCBkaW1lbnNpb24gPSBzZW5zb3JEaW1lbnNpb24gKiBuU2Vuc29ycztcblx0Y29uc3QgY29uY2F0ZW5hdGVkQ292YXJpYW5jZSA9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgblNlbnNvcnM7IGkrKykge1xuXHRcdGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbiA9IGNvbmNhdGVuYXRlZE9ic2VydmVkUHJvamVjdGlvbi5jb25jYXQoY29weShvbmVTZW5zb3JPYnNlcnZlZFByb2plY3Rpb24pKTtcblxuXHRcdGZvciAoY29uc3QgW3JJbmRleCwgcl0gb2Ygc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZC5lbnRyaWVzKCkpIHtcblx0XHRcdGZvciAoY29uc3QgW2NJbmRleCwgY10gb2Ygci5lbnRyaWVzKCkpIHtcblx0XHRcdFx0Y29uY2F0ZW5hdGVkQ292YXJpYW5jZVtySW5kZXggKyAoaSAqIHNlbnNvckRpbWVuc2lvbildW2NJbmRleCArIChpICogc2Vuc29yRGltZW5zaW9uKV0gPSBjO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4ub3B0aW9ucyxcblx0XHRkaW1lbnNpb24sXG5cdFx0b2JzZXJ2ZWRQcm9qZWN0aW9uOiBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24sXG5cdFx0Y292YXJpYW5jZTogY29uY2F0ZW5hdGVkQ292YXJpYW5jZSxcblx0fTtcbn1cbiIsImltcG9ydCB7cGFkV2l0aFplcm9Db2xzIGFzIHBhZFdpdGhaZXJvc30gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQge2lkZW50aXR5fSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCB7RHluYW1pY0NvbmZpZ1BhcmNpYWx9IGZyb20gJy4uL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcblxuLyoqXG4qIEJ1aWxkcyB0aGUgc3RhdGVQcm9qZWN0aW9uIGdpdmVuIGFuIG9ic2VydmVkUHJvamVjdGlvblxuKiBPbmx5IHVzZWQgYnkgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWcsIER5bmFtaWNDb25maWd9IHRoZSBtb2RlbCBjb250YWluaW5nIHRoZSBjcmVhdGVkIHN0YXRlUHJvamVjdGlvblxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkU3RhdGVQcm9qZWN0aW9uKGFyZ3M6IHtvYnNlcnZhdGlvbiwgZHluYW1pYzogRHluYW1pY0NvbmZpZ1BhcmNpYWx9KToge29ic2VydmF0aW9uOiBhbnk7IGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSB7XG5cdGNvbnN0IHtvYnNlcnZhdGlvbiwgZHluYW1pY30gPSBhcmdzO1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9uLCBzdGF0ZVByb2plY3Rpb259ID0gb2JzZXJ2YXRpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGlmIChvYnNlcnZlZFByb2plY3Rpb24gJiYgc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ1lvdSBjYW5ub3QgdXNlIGJvdGggb2JzZXJ2ZWRQcm9qZWN0aW9uIGFuZCBzdGF0ZVByb2plY3Rpb24nKSk7XG5cdH1cblxuXHRpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qZWN0aW9uID0gcGFkV2l0aFplcm9zKG9ic2VydmVkUHJvamVjdGlvbiwge2NvbHVtbnM6IGR5bmFtaWNEaW1lbnNpb259KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b2JzZXJ2YXRpb246IHtcblx0XHRcdFx0Li4ub2JzZXJ2YXRpb24sXG5cdFx0XHRcdHN0YXRlUHJvamVjdGlvbixcblx0XHRcdH0sXG5cdFx0XHRkeW5hbWljLFxuXHRcdH07XG5cdH1cblxuXHRpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgZHluYW1pY0RpbWVuc2lvbiAmJiAhc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0Y29uc3Qgb2JzZXJ2YXRpb25NYXRyaXggPSBpZGVudGl0eShvYnNlcnZhdGlvbkRpbWVuc2lvbik7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiB7XG5cdFx0XHRcdC4uLm9ic2VydmF0aW9uLFxuXHRcdFx0XHRzdGF0ZVByb2plY3Rpb246IHBhZFdpdGhaZXJvcyhvYnNlcnZhdGlvbk1hdHJpeCwge2NvbHVtbnM6IGR5bmFtaWNEaW1lbnNpb259KSxcblx0XHRcdH0sXG5cdFx0XHRkeW5hbWljLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn1cbiIsImltcG9ydCB7RHluYW1pY0NvbmZpZ1BhcmNpYWx9IGZyb20gJy4uL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcblxuLyoqXG4qIFZlcmlmaWVzIHRoYXQgZHluYW1pYy5kaW1lbnNpb24gYW5kIG9ic2VydmF0aW9uLmRpbWVuc2lvbiBhcmUgc2V0XG4qIE9ubHkgdXNlZCBieSBzZXR1cE1vZGVsc1BhcmFtZXRlcnNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tEaW1lbnNpb25zKGFyZ3M6IHtvYnNlcnZhdGlvbiwgZHluYW1pYzogRHluYW1pY0NvbmZpZ1BhcmNpYWx9KToge29ic2VydmF0aW9uOiBhbnksIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSB7XG5cdGNvbnN0IHtvYnNlcnZhdGlvbiwgZHluYW1pY30gPSBhcmdzO1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXHRpZiAoIWR5bmFtaWNEaW1lbnNpb24gfHwgIW9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ0RpbWVuc2lvbiBpcyBub3Qgc2V0JykpO1xuXHR9XG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9O1xufVxuIiwiaW1wb3J0IHtkaWFnfSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBwb2x5bW9ycGhNYXRyaXggZnJvbSAnLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeCc7XG5pbXBvcnQge1xuXHREeW5hbWljQ29uZmlnLCBEeW5hbWljQ29uZmlnUGFyY2lhbCwgT2JzZXJ2YXRpb25Db25maWcsIE9ic2VydmF0aW9uT2JqZWN0Q29uZmlnLFxufSBmcm9tICcuLi90eXBlcy9PYnNlcnZhdGlvbkNvbmZpZyc7XG5pbXBvcnQgVHlwZUFzc2VydCBmcm9tICcuLi90eXBlcy9UeXBlQXNzZXJ0JztcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgZHluYW1pYy5pbml0IHdoZW4gbm90IGdpdmVuXG4gKiBPbmx5IHVzZWQgYnkgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuICogQHBhcmFtIHtEeW5hbWljQ29uZmlnUGFyY2lhbH0gZHluYW1pY1xuICogQHJldHVybnMge0NvcmVDb25maWd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5kRHluYW1pY0luaXQoYXJnczoge29ic2VydmF0aW9uOiBPYnNlcnZhdGlvbkNvbmZpZywgZHluYW1pYzogRHluYW1pY0NvbmZpZ1BhcmNpYWx9KToge29ic2VydmF0aW9uOiBPYnNlcnZhdGlvbkNvbmZpZywgZHluYW1pYzogRHluYW1pY0NvbmZpZ30ge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gYXJncztcblx0aWYgKCFkeW5hbWljLmluaXQpIHtcblx0XHRjb25zdCBodWdlID0gMWU2O1xuXHRcdGNvbnN0IGR5bmFtaWNEaW1lbnNpb24gPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0XHRjb25zdCBtZWFuQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbCgwKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlQXJyYXkgPSBuZXcgQXJyYXkoZHluYW1pY0RpbWVuc2lvbikuZmlsbChodWdlKTtcblx0XHRjb25zdCB3aXRoSW5pdE9wdGlvbnMgPSB7XG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdGR5bmFtaWM6IHtcblx0XHRcdFx0Li4uZHluYW1pYyxcblx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdG1lYW46IG1lYW5BcnJheS5tYXAoZWxlbWVudCA9PiBbZWxlbWVudF0pLFxuXHRcdFx0XHRcdGNvdmFyaWFuY2U6IGRpYWcoY292YXJpYW5jZUFycmF5KSxcblx0XHRcdFx0XHRpbmRleDogLTEsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0cmV0dXJuIHdpdGhJbml0T3B0aW9ucztcblx0fVxuXG5cdGlmIChkeW5hbWljLmluaXQgJiYgIWR5bmFtaWMuaW5pdC5tZWFuKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignZHluYW1pYy5pbml0IHNob3VsZCBoYXZlIGEgbWVhbiBrZXknKSk7XG5cdH1cblxuXHRjb25zdCBjb3ZhcmlhbmNlID0gcG9seW1vcnBoTWF0cml4KGR5bmFtaWMuaW5pdC5jb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBkeW5hbWljLmRpbWVuc2lvbn0pO1xuXHRpZiAoVHlwZUFzc2VydC5pc0Z1bmN0aW9uKGNvdmFyaWFuY2UpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignY292YXJpYW5jZSBjYW4gbm90IGJlIGEgZnVuY3Rpb24nKTtcblx0fVxuXHRkeW5hbWljLmluaXQgPSB7XG5cdFx0Li4uZHluYW1pYy5pbml0LFxuXHRcdGNvdmFyaWFuY2UsXG5cdH07XG5cblx0cmV0dXJuIHtvYnNlcnZhdGlvbiwgZHluYW1pYzogZHluYW1pYyBhcyBEeW5hbWljQ29uZmlnfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbHNQYXJhbWV0ZXJzIHtcblx0ZHluYW1pYzogRHluYW1pY0NvbmZpZztcblx0b2JzZXJ2YXRpb246IE9ic2VydmF0aW9uQ29uZmlnOy8vIE9ic2VydmF0aW9uT2JqZWN0Q29uZmlnICYge3N0YXRlUHJvamVjdGlvbjogYW55OyBjb3ZhcmlhbmNlOiBhbnl9O1xufVxuIiwiaW1wb3J0IHtEeW5hbWljQ29uZmlnUGFyY2lhbCwgRHluYW1pY0NvbmZpZ1BhcmNpYWxOb0RpbX0gZnJvbSAnLi4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgZGltZW5zaW9ucyBhcmUgbWF0Y2hpbmcgYW5kIHNldCBkeW5hbWljLmRpbWVuc2lvbiBhbmQgb2JzZXJ2YXRpb24uZGltZW5zaW9uXG4gKiB3aXRoIHJlc3BlY3Qgb2Ygc3RhdGVQcm9qZWN0aW9uIGFuZCB0cmFuc2l0aW9uIGRpbWVuc2lvbnNcbiAqIE9ubHkgdXNlZCBieSBzZXR1cE1vZGVsc1BhcmFtZXRlcnNcbiAqIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4gKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiAqIEByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZywgRHluYW1pY0NvbmZpZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0RGltZW5zaW9ucyhhcmdzOiB7b2JzZXJ2YXRpb24sIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsTm9EaW19KToge29ic2VydmF0aW9uOiBhbnksIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSB7XG5cdGNvbnN0IHtvYnNlcnZhdGlvbiwgZHluYW1pY30gPSBhcmdzO1xuXHRjb25zdCB7c3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCB7dHJhbnNpdGlvbn0gPSBkeW5hbWljO1xuXHRjb25zdCBkeW5hbWljRGltZW5zaW9uOiBudW1iZXIgfCB1bmRlZmluZWQgPSBkeW5hbWljLmRpbWVuc2lvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cblx0aWYgKGR5bmFtaWNEaW1lbnNpb24gJiYgb2JzZXJ2YXRpb25EaW1lbnNpb24gJiYgQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pICYmIChkeW5hbWljRGltZW5zaW9uICE9PSBzdGF0ZVByb2plY3Rpb25bMF0ubGVuZ3RoIHx8IG9ic2VydmF0aW9uRGltZW5zaW9uICE9PSBzdGF0ZVByb2plY3Rpb24ubGVuZ3RoKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdzdGF0ZVByb2plY3Rpb24gZGltZW5zaW9ucyBub3QgbWF0Y2hpbmcgd2l0aCBvYnNlcnZhdGlvbiBhbmQgZHluYW1pYyBkaW1lbnNpb25zJykpO1xuXHR9XG5cblx0aWYgKGR5bmFtaWNEaW1lbnNpb24gJiYgQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSAmJiBkeW5hbWljRGltZW5zaW9uICE9PSB0cmFuc2l0aW9uLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCd0cmFuc2l0aW9uIGRpbWVuc2lvbiBub3QgbWF0Y2hpbmcgd2l0aCBkeW5hbWljIGRpbWVuc2lvbicpKTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHN0YXRlUHJvamVjdGlvbikpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b2JzZXJ2YXRpb246IHtcblx0XHRcdFx0Li4ub2JzZXJ2YXRpb24sXG5cdFx0XHRcdGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCxcblx0XHRcdH0sXG5cdFx0XHRkeW5hbWljOiB7XG5cdFx0XHRcdC4uLmR5bmFtaWMsXG5cdFx0XHRcdGRpbWVuc2lvbjogc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCxcblx0XHRcdH0sXG5cdFx0fTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KHRyYW5zaXRpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0ZHluYW1pYzoge1xuXHRcdFx0XHQuLi5keW5hbWljLFxuXHRcdFx0XHRkaW1lbnNpb246IHRyYW5zaXRpb24ubGVuZ3RoLFxuXHRcdFx0fSxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHtvYnNlcnZhdGlvbiwgZHluYW1pYzogZHluYW1pYyBhcyBEeW5hbWljQ29uZmlnUGFyY2lhbH07XG59XG4iLCJpbXBvcnQge1xuXHRzdWJ0cmFjdCwgdHJhbnNwb3NlLCBtYXRNdWwsIGludmVydCwgZWxlbVdpc2UsIHN1YlNxdWFyZU1hdHJpeCxcbn0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgYXJyYXlUb01hdHJpeCBmcm9tICcuL3V0aWxzL2FycmF5LXRvLW1hdHJpeCc7XG5pbXBvcnQgY2hlY2tNYXRyaXggZnJvbSAnLi91dGlscy9jaGVjay1tYXRyaXgnO1xuaW1wb3J0IGNoZWNrQ292YXJpYW5jZSBmcm9tICcuL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UnO1xuaW1wb3J0IHR5cGUge1N0YXRlTFR9IGZyb20gJy4vdHlwZXMvU3RhdGVMVCc7XG5pbXBvcnQgdHlwZSBLYWxtYW5GaWx0ZXIgZnJvbSAnLi9rYWxtYW4tZmlsdGVyJztcbmltcG9ydCBUeXBlQXNzZXJ0IGZyb20gJy4vdHlwZXMvVHlwZUFzc2VydCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbXVsdGkgZGltZW5zaW9ubmFsIGdhdXNzaWFuLCB3aXRoIGhpcyBtZWFuIGFuZCBoaXMgY292YXJpYW5jZVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFtpbmRleD0wXSB0aGUgaW5kZXggb2YgdGhlIFN0YXRlIGluIHRoZSBwcm9jZXNzLCB0aGlzIGlzIG5vdCBtYW5kYXRvcnkgZm9yIHNpbXBsZSBLYWxtYW4gRmlsdGVyLCBidXQgaXMgbmVlZGVkIGZvciBtb3N0IG9mIHRoZSB1c2UgY2FzZSBvZiBleHRlbmRlZCBrYWxtYW4gZmlsdGVyXG4gKiBAcHJvcGVydHkge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2Ugc3F1YXJlIG1hdHJpeCBvZiBzaXplIGRpbWVuc2lvblxuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXk8TnVtYmVyPj59IG1lYW4gY29sdW1uIG1hdHJpeCBvZiBzaXplIGRpbWVuc2lvbiB4IDFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGUgaW1wbGVtZW50cyBTdGF0ZUxUIHtcblx0bWVhbjogbnVtYmVyW11bXTtcblx0Y292YXJpYW5jZTogbnVtYmVyW11bXTtcblx0aW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3RvcihhcmdzOiB7bWVhbjogbnVtYmVyW11bXSwgY292YXJpYW5jZTogbnVtYmVyW11bXSwgaW5kZXg/OiBudW1iZXJ9KSB7XG5cdFx0dGhpcy5tZWFuID0gYXJncy5tZWFuO1xuXHRcdHRoaXMuY292YXJpYW5jZSA9IGFyZ3MuY292YXJpYW5jZTtcblx0XHR0aGlzLmluZGV4ID0gYXJncy5pbmRleCB8fCB1bmRlZmluZWQ7XG5cdH1cblxuXHQvKipcblx0KiBDaGVjayB0aGUgY29uc2lzdGVuY3kgb2YgdGhlIFN0YXRlXG5cdCogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcblx0KiBAc2VlIGNoZWNrXG5cdCovXG5cdGNoZWNrKG9wdGlvbnM/OiB7ZGltZW5zaW9uPzogbnVtYmVyIHwgbnVsbCwgdGl0bGU/OiBzdHJpbmcsIGVpZ2VuPzogYm9vbGVhbn0pOiB2b2lkIHtcblx0XHRTdGF0ZS5jaGVjayh0aGlzLCBvcHRpb25zKTtcblx0fVxuXG5cdC8qKlxuXHQqIENoZWNrIHRoZSBjb25zaXN0ZW5jeSBvZiB0aGUgU3RhdGUncyBhdHRyaWJ1dGVzXG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG5cdCogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuZGltZW5zaW9uPW51bGxdIGlmIGRlZmluZWQgY2hlY2sgdGhlIGRpbWVuc2lvbiBvZiB0aGUgc3RhdGVcblx0KiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGl0bGU9bnVsbF0gdXNlZCB0byBsb2cgZXJyb3IgbW9yIGV4cGxpY2l0bHlcblx0KiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZWlnZW5cblx0KiBAcmV0dXJucyB7TnVsbH1cblx0Ki9cblx0c3RhdGljIGNoZWNrKHN0YXRlOiBTdGF0ZSwgYXJnczoge2RpbWVuc2lvbj86IG51bWJlciB8IG51bGwsIHRpdGxlPzogc3RyaW5nLCBlaWdlbj86IGJvb2xlYW59ID0ge30pOiB2b2lkIHtcblx0XHRjb25zdCB7ZGltZW5zaW9uLCB0aXRsZSwgZWlnZW59ID0gYXJncztcblx0XHRpZiAoIShzdGF0ZSBpbnN0YW5jZW9mIFN0YXRlKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgYXJndW1lbnQgaXMgbm90IGEgc3RhdGUgXFxuJ1xuICAgICAgICArICdUaXBzOiBtYXliZSB5b3UgYXJlIHVzaW5nIDIgZGlmZmVyZW50IHZlcnNpb24gb2Yga2FsbWFuLWZpbHRlciBpbiB5b3VyIG5wbSBkZXBzIHRyZWUnLFxuXHRcdFx0KSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gc3RhdGU7IC8vIEluZGV4XG5cdFx0Y29uc3QgbWVhbkRpbWVuc2lvbiA9IG1lYW4ubGVuZ3RoO1xuXHRcdGlmICh0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInICYmIG1lYW5EaW1lbnNpb24gIT09IGRpbWVuc2lvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgWyR7dGl0bGV9XSBTdGF0ZS5tZWFuICR7bWVhbn0gd2l0aCBkaW1lbnNpb24gJHttZWFuRGltZW5zaW9ufSBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0Y2hlY2tNYXRyaXgobWVhbiwgW21lYW5EaW1lbnNpb24sIDFdLCB0aXRsZSA/IHRpdGxlICsgJy5tZWFuJyA6ICdtZWFuJyk7XG5cdFx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSwgW21lYW5EaW1lbnNpb24sIG1lYW5EaW1lbnNpb25dLCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG5cdFx0Y2hlY2tDb3ZhcmlhbmNlKHtjb3ZhcmlhbmNlLCBlaWdlbn0sIHRpdGxlID8gdGl0bGUgKyAnLmNvdmFyaWFuY2UnIDogJ2NvdmFyaWFuY2UnKTtcblx0XHQvLyBJZiAodHlwZW9mIChpbmRleCkgIT09ICdudW1iZXInKSB7XG5cdFx0Ly8gXHR0aHJvdyAobmV3IFR5cGVFcnJvcigndCBtdXN0IGJlIGEgbnVtYmVyJykpO1xuXHRcdC8vIH1cblx0fVxuXG5cdC8qKlxuXHQqIE11bHRpcGx5IHN0YXRlIHdpdGggbWF0cml4XG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeFxuXHQqIEByZXR1cm5zIHtTdGF0ZX1cblx0Ki9cblx0c3RhdGljIG1hdE11bChhcmdzOiB7c3RhdGU6IFN0YXRlLCBtYXRyaXg6IG51bWJlcltdW119KTogU3RhdGUge1xuXHRcdGNvbnN0IHtzdGF0ZSwgbWF0cml4fSA9IGFyZ3M7XG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IG1hdE11bChcblx0XHRcdG1hdE11bChtYXRyaXgsIHN0YXRlLmNvdmFyaWFuY2UpLFxuXHRcdFx0dHJhbnNwb3NlKG1hdHJpeCksXG5cdFx0KTtcblx0XHRjb25zdCBtZWFuID0gbWF0TXVsKG1hdHJpeCwgc3RhdGUubWVhbik7XG5cblx0XHRyZXR1cm4gbmV3IFN0YXRlKHtcblx0XHRcdG1lYW4sXG5cdFx0XHRjb3ZhcmlhbmNlLFxuXHRcdFx0aW5kZXg6IHN0YXRlLmluZGV4LFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCogRnJvbSBhIHN0YXRlIGluIG4tZGltZW5zaW9uIGNyZWF0ZSBhIHN0YXRlIGluIGEgc3Vic3BhY2Vcblx0KiBJZiB5b3Ugc2VlIHRoZSBzdGF0ZSBhcyBhIE4tZGltZW5zaW9uIGdhdXNzaWFuLFxuXHQqIHRoaXMgY2FuIGJlIHZpZXdlZCBhcyB0aGUgc3ViIE0tZGltZW5zaW9uIGdhdXNzaWFuIChNIDwgTilcblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgZGltZW5zaW9uIHRvIGV4dHJhY3QsICAoTSA8IE4gPD0+IG9ic0luZGV4ZXMubGVuZ3RoIDwgdGhpcy5tZWFuLmxlbmd0aClcblx0KiBAcmV0dXJucyB7U3RhdGV9IHN1YlN0YXRlIGluIHN1YnNwYWNlLCB3aXRoIHN1YlN0YXRlLm1lYW4ubGVuZ3RoID09PSBvYnNJbmRleGVzLmxlbmd0aFxuXHQqL1xuXHRzdWJTdGF0ZShvYnNJbmRleGVzOiBudW1iZXJbXSk6IFN0YXRlIHtcblx0XHRjb25zdCBzdGF0ZSA9IG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuOiBvYnNJbmRleGVzLm1hcChpID0+IHRoaXMubWVhbltpXSksXG5cdFx0XHRjb3ZhcmlhbmNlOiBzdWJTcXVhcmVNYXRyaXgodGhpcy5jb3ZhcmlhbmNlLCBvYnNJbmRleGVzKSxcblx0XHRcdGluZGV4OiB0aGlzLmluZGV4LFxuXHRcdH0pO1xuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdC8qKlxuXHQqIEB0eXBlZGVmIHtPYmplY3R9IERldGFpbGVkTWFoYWxhbm9iaXNcblx0KiBAcHJvcGVydHkge0FycmF5LjxbTnVtYmVyXT59IGRpZmZcblx0KiBAcHJvcGVydHkge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2VJbnZlcnRcblx0KiBAcHJvcGVydHkge051bWJlcn0gdmFsdWVcblx0Ki9cblx0LyoqXG5cdCogU2ltcGxlIE1hbGFoYW5vYmlzIGRpc3RhbmNlIGJldHdlZW4gdGhlIGRpc3RyaWJ1dGlvbiAodGhpcykgYW5kIGEgcG9pbnRcblx0KiBAcGFyYW0ge0FycmF5LjxbTnVtYmVyXT59IHBvaW50IGEgTngxIG1hdHJpeCByZXByZXNlbnRpbmcgYSBwb2ludFxuXHQqIEByZXR1cm5zIHtEZXRhaWxlZE1haGFsYW5vYmlzfVxuXHQqL1xuXHRyYXdEZXRhaWxlZE1haGFsYW5vYmlzKHBvaW50OiBudW1iZXJbXVtdKToge2RpZmY6IG51bWJlcltdW10sIGNvdmFyaWFuY2VJbnZlcnQ6IG51bWJlcltdW10sIHZhbHVlOiBudW1iZXJ9IHtcblx0XHRjb25zdCBkaWZmID0gc3VidHJhY3QodGhpcy5tZWFuLCBwb2ludCk7XG5cdFx0dGhpcy5jaGVjaygpO1xuXHRcdGNvbnN0IGNvdmFyaWFuY2VJbnZlcnQgPSBpbnZlcnQodGhpcy5jb3ZhcmlhbmNlKTtcblx0XHRpZiAoY292YXJpYW5jZUludmVydCA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5jaGVjayh7ZWlnZW46IHRydWV9KTtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoYENhbm5vdCBpbnZlcnQgY292YXJpYW5jZSAke0pTT04uc3RyaW5naWZ5KHRoaXMuY292YXJpYW5jZSl9YCkpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRpZmZUcmFuc3Bvc2VkID0gdHJhbnNwb3NlKGRpZmYpO1xuXG5cdFx0Ly8gQ29uc29sZS5sb2coJ2NvdmFyaWFuY2UgaW4gb2JzIHNwYWNlJywgY292YXJpYW5jZUluT2JzZXJ2YXRpb25TcGFjZSk7XG5cdFx0Y29uc3QgdmFsdWVNYXRyaXggPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwoZGlmZlRyYW5zcG9zZWQsIGNvdmFyaWFuY2VJbnZlcnQpLFxuXHRcdFx0ZGlmZixcblx0XHQpO1xuXHRcdC8vIENhbGN1bGF0ZSB0aGUgTWFoYWxhbm9iaXMgZGlzdGFuY2UgdmFsdWVcblx0XHRjb25zdCB2YWx1ZSA9IE1hdGguc3FydCh2YWx1ZU1hdHJpeFswXVswXSk7XG5cdFx0aWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHtcblx0XHRcdGNvbnN0IGRlYnVnVmFsdWUgPSBtYXRNdWwoXG5cdFx0XHRcdG1hdE11bChcblx0XHRcdFx0XHRkaWZmVHJhbnNwb3NlZCxcblx0XHRcdFx0XHRjb3ZhcmlhbmNlSW52ZXJ0LFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRkaWZmLFxuXHRcdFx0KTtcblx0XHRcdGNvbnNvbGUubG9nKHtcblx0XHRcdFx0ZGlmZiwgY292YXJpYW5jZUludmVydCwgdGhpczogdGhpcywgcG9pbnQsXG5cdFx0XHR9LCBkZWJ1Z1ZhbHVlKTtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoJ21haGFsYW5vYmlzIGlzIE5hTicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGlmZixcblx0XHRcdGNvdmFyaWFuY2VJbnZlcnQsXG5cdFx0XHR2YWx1ZSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCogTWFsYWhhbm9iaXMgZGlzdGFuY2UgaXMgbWFkZSBhZ2FpbnN0IGFuIG9ic2VydmF0aW9uLCBzbyB0aGUgbWVhbiBhbmQgY292YXJpYW5jZVxuXHQqIGFyZSBwcm9qZWN0ZWQgaW50byB0aGUgb2JzZXJ2YXRpb24gc3BhY2Vcblx0KiBAcGFyYW0ge0thbG1hbkZpbHRlcn0ga2Yga2FsbWFuIGZpbHRlciB1c2UgdG8gcHJvamVjdCB0aGUgc3RhdGUgaW4gb2JzZXJ2YXRpb24ncyBzcGFjZVxuXHQqIEBwYXJhbSB7T2JzZXJ2YXRpb259IG9ic2VydmF0aW9uXG5cdCogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gb2JzSW5kZXhlcyBsaXN0IG9mIGluZGV4ZXMgb2Ygb2JzZXJ2YXRpb24gc3RhdGUgdG8gdXNlIGZvciB0aGUgbWFoYWxhbm9iaXMgZGlzdGFuY2Vcblx0KiBAcmV0dXJucyB7RGV0YWlsZWRNYWhhbGFub2Jpc31cblx0Ki9cblx0ZGV0YWlsZWRNYWhhbGFub2JpcyhhcmdzOiB7a2Y6IEthbG1hbkZpbHRlciwgb2JzZXJ2YXRpb246IG51bWJlcltdW10gfCBudW1iZXJbXSwgb2JzSW5kZXhlcz86IG51bWJlcltdfSk6IHtkaWZmOiBudW1iZXJbXVtdLCBjb3ZhcmlhbmNlSW52ZXJ0OiBudW1iZXJbXVtdLCB2YWx1ZTogbnVtYmVyfSB7XG5cdFx0Y29uc3Qge2tmLCBvYnNlcnZhdGlvbiwgb2JzSW5kZXhlc30gPSBhcmdzO1xuXHRcdGlmIChvYnNlcnZhdGlvbi5sZW5ndGggIT09IGtmLm9ic2VydmF0aW9uLmRpbWVuc2lvbikge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgTWFoYWxhbm9iaXMgb2JzZXJ2YXRpb24gJHtvYnNlcnZhdGlvbn0gKGRpbWVuc2lvbjogJHtvYnNlcnZhdGlvbi5sZW5ndGh9KSBkb2VzIG5vdCBtYXRjaCB3aXRoIGtmIG9ic2VydmF0aW9uIGRpbWVuc2lvbiAoJHtrZi5vYnNlcnZhdGlvbi5kaW1lbnNpb259KWApKTtcblx0XHR9XG5cblx0XHRsZXQgY29ycmVjdGx5U2l6ZWRPYnNlcnZhdGlvbiA9IGFycmF5VG9NYXRyaXgoe29ic2VydmF0aW9uLCBkaW1lbnNpb246IG9ic2VydmF0aW9uLmxlbmd0aH0pO1xuXHRcdFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgJ1N0YXRlLmRldGFpbGVkTWFoYWxhbm9iaXMnKTtcblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBrZi5nZXRWYWx1ZShrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIHt9KSAgYXMgbnVtYmVyW11bXTtcblxuXHRcdGxldCBwcm9qZWN0ZWRTdGF0ZSA9IFN0YXRlLm1hdE11bCh7c3RhdGU6IHRoaXMsIG1hdHJpeDogc3RhdGVQcm9qZWN0aW9ufSk7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYnNJbmRleGVzKSkge1xuXHRcdFx0cHJvamVjdGVkU3RhdGUgPSBwcm9qZWN0ZWRTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcblx0XHRcdGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb24gPSBvYnNJbmRleGVzLm1hcChpID0+IGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb25baV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9qZWN0ZWRTdGF0ZS5yYXdEZXRhaWxlZE1haGFsYW5vYmlzKGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQHNlZSBkZXRhaWxlZE1haGFsYW5vYmlzXG5cdCogQHJldHVybnMge051bWJlcn1cblx0Ki9cblx0bWFoYWxhbm9iaXMob3B0aW9uczoge2tmOiBLYWxtYW5GaWx0ZXIsIG9ic2VydmF0aW9uOiBudW1iZXJbXVtdIHwgbnVtYmVyW10sIG9ic0luZGV4ZXM/OiBudW1iZXJbXX0pOiBudW1iZXIge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZGV0YWlsZWRNYWhhbGFub2JpcyhvcHRpb25zKS52YWx1ZTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHJlc3VsdCkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdtYWhhbGFub2JpcyBpcyBOYU4nKSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0KiBCaGF0dGFjaGFyeXlhIGRpc3RhbmNlIGlzIG1hZGUgYWdhaW5zdCBpbiB0aGUgb2JzZXJ2YXRpb24gc3BhY2Vcblx0KiB0byBkbyBpdCBpbiB0aGUgbm9ybWFsIHNwYWNlIHNlZSBzdGF0ZS5iaGF0dGFjaGFyeXlhXG5cdCogQHBhcmFtIHtLYWxtYW5GaWx0ZXJ9IGtmIGthbG1hbiBmaWx0ZXIgdXNlIHRvIHByb2plY3QgdGhlIHN0YXRlIGluIG9ic2VydmF0aW9uJ3Mgc3BhY2Vcblx0KiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuXHQqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG9ic0luZGV4ZXMgbGlzdCBvZiBpbmRleGVzIG9mIG9ic2VydmF0aW9uIHN0YXRlIHRvIHVzZSBmb3IgdGhlIGJoYXR0YWNoYXJ5eWEgZGlzdGFuY2Vcblx0KiBAcmV0dXJucyB7TnVtYmVyfVxuXHQqL1xuXHRvYnNCaGF0dGFjaGFyeXlhKG9wdGlvbnM6IHtrZjogS2FsbWFuRmlsdGVyLCBzdGF0ZTogU3RhdGUsIG9ic0luZGV4ZXM6IG51bWJlcltdfSk6IG51bWJlciB7XG5cdFx0Y29uc3Qge2tmLCBzdGF0ZSwgb2JzSW5kZXhlc30gPSBvcHRpb25zO1xuXHRcdFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKGtmLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgJ1N0YXRlLm9ic0JoYXR0YWNoYXJ5eWEnKTtcblx0XHRjb25zdCBzdGF0ZVByb2plY3Rpb24gPSBrZi5nZXRWYWx1ZShrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIHt9KTtcblxuXHRcdGxldCBwcm9qZWN0ZWRTZWxmU3RhdGUgPSBTdGF0ZS5tYXRNdWwoe3N0YXRlOiB0aGlzLCBtYXRyaXg6IHN0YXRlUHJvamVjdGlvbiBhcyBudW1iZXJbXVtdfSk7XG5cdFx0bGV0IHByb2plY3RlZE90aGVyU3RhdGUgPSBTdGF0ZS5tYXRNdWwoe3N0YXRlLCBtYXRyaXg6IHN0YXRlUHJvamVjdGlvbiBhcyBudW1iZXJbXVtdfSk7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYnNJbmRleGVzKSkge1xuXHRcdFx0cHJvamVjdGVkU2VsZlN0YXRlID0gcHJvamVjdGVkU2VsZlN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuXHRcdFx0cHJvamVjdGVkT3RoZXJTdGF0ZSA9IHByb2plY3RlZE90aGVyU3RhdGUuc3ViU3RhdGUob2JzSW5kZXhlcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb2plY3RlZFNlbGZTdGF0ZS5iaGF0dGFjaGFyeXlhKHByb2plY3RlZE90aGVyU3RhdGUpO1xuXHR9XG5cblx0LyoqXG5cdCogQHBhcmFtIHtTdGF0ZX0gb3RoZXJTdGF0ZSBvdGhlciBzdGF0ZSB0byBjb21wYXJlIHdpdGhcblx0KiBAcmV0dXJucyB7TnVtYmVyfVxuXHQqL1xuXHRiaGF0dGFjaGFyeXlhKG90aGVyU3RhdGU6IFN0YXRlKTogbnVtYmVyIHtcblx0XHRjb25zdCB7Y292YXJpYW5jZSwgbWVhbn0gPSB0aGlzO1xuXHRcdGNvbnN0IGF2ZXJhZ2UgPSBlbGVtV2lzZShbY292YXJpYW5jZSwgb3RoZXJTdGF0ZS5jb3ZhcmlhbmNlXSwgKFthLCBiXSkgPT4gKGEgKyBiKSAvIDIpO1xuXG5cdFx0bGV0IGNvdmFySW52ZXJ0ZWQ6IG51bWJlcltdW107XG5cdFx0dHJ5IHtcblx0XHRcdGNvdmFySW52ZXJ0ZWQgPSBpbnZlcnQoYXZlcmFnZSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdDYW5ub3QgaW52ZXJ0JywgYXZlcmFnZSk7XG5cdFx0XHR0aHJvdyAoZXJyb3IgYXMgRXJyb3IpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRpZmYgPSBzdWJ0cmFjdChtZWFuLCBvdGhlclN0YXRlLm1lYW4pO1xuXG5cdFx0cmV0dXJuIG1hdE11bCh0cmFuc3Bvc2UoZGlmZiksIG1hdE11bChjb3ZhckludmVydGVkLCBkaWZmKSlbMF1bMF07XG5cdH1cbn1cbiIsImZ1bmN0aW9uIGRlYnVnVmFsdWUodmFsdWU6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiAndW5kZWZpbmVkJztcblx0fVxuXHRsZXQgYXNTdGlybmcgPSAnJztcblx0YXNTdGlybmcgPSB0eXBlb2YgKHZhbHVlKSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnRvU3RyaW5nKCkgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdGlmIChhc1N0aXJuZy5sZW5ndGggPCAxMDApXG5cdHtyZXR1cm4gYXNTdGlybmc7fVxuXHRyZXR1cm4gYXNTdGlybmcuc2xpY2UoMCwgOTcpICsgJy4uLic7XG59XG5cbmNsYXNzIFR5cGVBc3NlcnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2RvIG5vdCBjb25zdHVjdCBtZScpO1xuXHR9XG5cblx0ZHVtbXkoKTogdm9pZCB7fVxuXG5cdHN0YXRpYyBhc3NlcnROb3RBcnJheTxUPihhcmc6IFQgfCBUW10sIG5hbWUgPSAncGFyYW1ldGVyJyk6IGFzc2VydHMgYXJnIGlzIFQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDEgJHtuYW1lfSBjYW5ub3QgYmUgYW4gYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3NlcnRJc0FycmF5MkQ8VD4oYXJnOiB1bmtub3duLCBuYW1lID0gJ3BhcmFtZXRlcicpOiBhc3NlcnRzIGFyZyBpcyBUW11bXSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDIgJHtuYW1lfSBpcyBub3QgYW4gYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0XHRpZiAoYXJnLmxlbmd0aCA9PT0gMClcblx0XHR7cmV0dXJuO31cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoYXJnWzBdKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRTAwMyAke25hbWV9IG11c3QgYmUgYW4gYXJyYXkgb2YgYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0XHQvLyBBbGxvdyB0eXBlIG51bWJlcltdW11bXVxuXHR9XG5cblx0c3RhdGljIGFzc2VydElzQXJyYXkyRE9yRm5jPFQ+KGFyZzogdW5rbm93biwgbmFtZSA9ICdwYXJhbWV0ZXInKTogYXNzZXJ0cyBhcmcgaXMgVFtdW10gfCBGdW5jdGlvbiB7XG5cdFx0aWYgKHR5cGVvZiAoYXJnKSA9PT0gJ2Z1bmN0aW9uJylcblx0XHR7cmV0dXJuO31cblx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRChhcmcsIG5hbWUpO1xuXHR9XG5cblx0LyoqXG4gICAgICogZW5zdXJlIHRoYXQgdGhlIHByb3ZpZGVkIGFyZyBpcyBhIG51bWJlciwgbnVtYmVyW10sIG9yIG51bWJlcltdW11cbiAgICAgKiBAcGFyYW0gYXJnXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuXHRzdGF0aWMgYXNzZXJ0SXNOdW1iZXJzQXJyYXkoYXJnOiB1bmtub3duLCBuYW1lID0gJ3BhcmFtZXRlcicpOiBhc3NlcnRzIGFyZyBpcyBudW1iZXJbXVtdIHwgbnVtYmVyW10gfCBudW1iZXIge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIVR5cGVBc3NlcnQuaXNBcnJheShhcmcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDA0ICR7bmFtZX0gaXMgbm90IGFuIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdFx0aWYgKGFyZy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBhcmdbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghVHlwZUFzc2VydC5pc0FycmF5KGFyZ1swXSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDUgJHtuYW1lfSBpcyBub3QgYW4gYXJyYXkgb2YgYXJyYXkuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIChhcmdbMF1bMF0pICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRTAwNiAke25hbWV9IGlzIG5vdCBhbiBhcnJheSBvZiBhcnJheSBvZiBudW1iZXIuIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBpc0FycmF5MkQob2JqOiB1bmtub3duKTogb2JqIGlzIG51bWJlcltdW10ge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShvYmopKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiAoQXJyYXkuaXNBcnJheShvYmpbMF0pKTtcblx0fVxuXG5cdHN0YXRpYyBpc0FycmF5MUQob2JqOiB1bmtub3duKTogb2JqIGlzIG51bWJlcltdIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkob2JqKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gKHR5cGVvZiAob2JqWzBdKSA9PT0gJ251bWJlcicpO1xuXHR9XG5cblx0c3RhdGljIGlzQXJyYXk8VD4ob2JqOiBUIHwgVFtdKTogb2JqIGlzIFRbXSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KG9iaikpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRzdGF0aWMgaXNGdW5jdGlvbihhcmc6IHVua25vd24pOiAgYXJnIGlzIEZ1bmN0aW9uIHtcblx0XHRpZiAodHlwZW9mIChhcmcpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdC8vIHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDAgJHtuYW1lfSBjYW5ub3QgYmUgYSBmdWNudGlvbi4gY3VycmVudCB2YWx1ZSBpcyAke2RlYnVnVmFsdWUoYXJnKX0uYCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR5cGVBc3NlcnQ7XG5cbiIsIi8qKlxuKlJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgbWF0cml4IGluIGRpbSoxLCBnaXZlbiBhbiBkaW0gbWF0cml4LCBhbmQgY2hlY2tzXG4qIGlmIGNvcnJlc3BvbmRpbmcgd2l0aCB0aGUgb2JzZXJ2YXRpb24gZGltZW5zaW9uXG4qQHBhcmFtIHtBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uXG4qQHBhcmFtIHtOdW1iZXJ9IGRpbWVuc2lvblxuKkByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuKi9cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5VG9NYXRyaXgoYXJnczoge29ic2VydmF0aW9uOiBudW1iZXIsIGRpbWVuc2lvbjogMX0pOiBudW1iZXJbXVtdO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXJyYXlUb01hdHJpeChhcmdzOiB7b2JzZXJ2YXRpb246IG51bWJlciB8IG51bWJlcltdIHwgbnVtYmVyW11bXSwgZGltZW5zaW9uOiBudW1iZXJ9KTogbnVtYmVyW11bXSB7XG5cdGNvbnN0IHtvYnNlcnZhdGlvbiwgZGltZW5zaW9ufSA9IGFyZ3M7XG5cdGlmICghQXJyYXkuaXNBcnJheShvYnNlcnZhdGlvbikpIHtcblx0XHRpZiAoZGltZW5zaW9uID09PSAxICYmIHR5cGVvZiAob2JzZXJ2YXRpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIFtbb2JzZXJ2YXRpb25dXTtcblx0XHR9XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFRoZSBvYnNlcnZhdGlvbiAoJHtvYnNlcnZhdGlvbn0pIHNob3VsZCBiZSBhbiBhcnJheSAoZGltZW5zaW9uOiAke2RpbWVuc2lvbn0pYCkpO1xuXHR9XG5cblx0aWYgKG9ic2VydmF0aW9uLmxlbmd0aCAhPT0gZGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYE9ic2VydmF0aW9uICgke29ic2VydmF0aW9uLmxlbmd0aH0pIGFuZCBkaW1lbnNpb24gKCR7ZGltZW5zaW9ufSkgbm90IG1hdGNoaW5nYCkpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAob2JzZXJ2YXRpb25bMF0pID09PSAnbnVtYmVyJyB8fCBvYnNlcnZhdGlvblswXSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAob2JzZXJ2YXRpb24gYXMgbnVtYmVyW10pLm1hcChlbGVtZW50ID0+IFtlbGVtZW50XSk7XG5cdH1cblxuXHRyZXR1cm4gb2JzZXJ2YXRpb24gYXMgbnVtYmVyW11bXTtcbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnQHJheXlhbWhrL21hdHJpeCc7XG5pbXBvcnQgY2hlY2tNYXRyaXggZnJvbSAnLi9jaGVjay1tYXRyaXgnO1xuXG5jb25zdCB0b2xlcmFuY2UgPSAwLjE7XG5cbmNvbnN0IGNoZWNrRGVmaW5pdGVQb3NpdGl2ZSA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlOiBudW1iZXJbXVtdLCB0b2xlcmFuY2UgPSAxZS0xMCkge1xuXHRjb25zdCBjb3ZhcmlhbmNlTWF0cml4ID0gbmV3IE1hdHJpeChjb3ZhcmlhbmNlKTtcblx0Y29uc3QgZWlnZW52YWx1ZXMgPSBjb3ZhcmlhbmNlTWF0cml4LmVpZ2VudmFsdWVzKCk7XG5cdGZvciAoY29uc3QgZWlnZW52YWx1ZSBvZiBlaWdlbnZhbHVlcykge1xuXHRcdGlmIChlaWdlbnZhbHVlIDw9IC10b2xlcmFuY2UpIHtcblx0XHRcdGNvbnNvbGUubG9nKGNvdmFyaWFuY2UsIGVpZ2VudmFsdWUpO1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFaWdlbnZhbHVlIHNob3VsZCBiZSBwb3NpdGl2ZSAoYWN0dWFsOiAke2VpZ2VudmFsdWV9KWApO1xuXHRcdH1cblx0fVxuXG5cdGNvbnNvbGUubG9nKCdpcyBkZWZpbml0ZSBwb3NpdGl2ZScsIGNvdmFyaWFuY2UpO1xufTtcblxuY29uc3QgY2hlY2tTeW1ldHJpYyA9IGZ1bmN0aW9uIChjb3ZhcmlhbmNlLCB0aXRsZSA9ICdjaGVja1N5bWV0cmljJykge1xuXHRmb3IgKGNvbnN0IFtyb3dJZCwgcm93XSBvZiBjb3ZhcmlhbmNlLmVudHJpZXMoKSkge1xuXHRcdGZvciAoY29uc3QgW2NvbElkLCBpdGVtXSBvZiByb3cuZW50cmllcygpKSB7XG5cdFx0XHRpZiAocm93SWQgPT09IGNvbElkICYmIGl0ZW0gPCAwKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgWyR7dGl0bGV9XSBWYXJpYW5jZVske2NvbElkfV0gc2hvdWxkIGJlIHBvc2l0aXZlIChhY3R1YWw6ICR7aXRlbX0pYCk7XG5cdFx0XHR9IGVsc2UgaWYgKE1hdGguYWJzKGl0ZW0pID4gTWF0aC5zcXJ0KGNvdmFyaWFuY2Vbcm93SWRdW3Jvd0lkXSAqIGNvdmFyaWFuY2VbY29sSWRdW2NvbElkXSkpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coY292YXJpYW5jZSk7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgWyR7dGl0bGV9XSBDb3ZhcmlhbmNlWyR7cm93SWR9XVske2NvbElkfV0gc2hvdWxkIHZlcmlmeSBDYXVjaHkgU2Nod2FyeiBJbmVxdWFsaXR5IGBcblx0XHRcdFx0KyBgKGV4cGVjdGVkOiB8eHwgPD0gc3FydCgke2NvdmFyaWFuY2Vbcm93SWRdW3Jvd0lkXX0gKiAke2NvdmFyaWFuY2VbY29sSWRdW2NvbElkXX0pYFxuXHRcdFx0XHQrIGAgYWN0dWFsOiAke2l0ZW19KWApO1xuXHRcdFx0fSBlbHNlIGlmIChNYXRoLmFicyhpdGVtIC0gY292YXJpYW5jZVtjb2xJZF1bcm93SWRdKSA+IHRvbGVyYW5jZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gQ292YXJpYW5jZVske3Jvd0lkfV1bJHtjb2xJZH1dIHNob3VsZCBlcXVhbCBDb3ZhcmlhbmNlWyR7Y29sSWR9XVske3Jvd0lkfV0gYFxuXHRcdFx0KyBgIChhY3R1YWwgZGlmZjogJHtNYXRoLmFicyhpdGVtIC0gY292YXJpYW5jZVtjb2xJZF1bcm93SWRdKX0pICA9ICR7aXRlbX0gLSAke2NvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXX1cXG5gXG5cdFx0XHQrIGAke2NvdmFyaWFuY2Uuam9pbignXFxuJyl9IGlzIGludmFsaWRgLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tDb3ZhcmlhbmNlKGFyZ3M6IHtjb3ZhcmlhbmNlOiBudW1iZXJbXVtdLCBlaWdlbj86IGJvb2xlYW59LCBfdGl0bGU/OiBzdHJpbmcpIHtcblx0Y29uc3Qge2NvdmFyaWFuY2UsIGVpZ2VuID0gZmFsc2V9ID0gYXJncztcblx0Y2hlY2tNYXRyaXgoY292YXJpYW5jZSk7XG5cdGNoZWNrU3ltZXRyaWMoY292YXJpYW5jZSk7XG5cdGlmIChlaWdlbikge1xuXHRcdGNoZWNrRGVmaW5pdGVQb3NpdGl2ZShjb3ZhcmlhbmNlKTtcblx0fVxufVxuIiwiaW1wb3J0IGNoZWNrU2hhcGUgZnJvbSAnLi9jaGVjay1zaGFwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrTWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSwgc2hhcGU/OiBudW1iZXJbXSwgdGl0bGUgPSAnY2hlY2tNYXRyaXgnKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShtYXRyaXgpKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFske3RpdGxlfV0gc2hvdWxkIGJlIGEgMi1sZXZlbCBhcnJheSBtYXRyaXggYW5kIGlzICR7bWF0cml4fWApKTtcblx0fVxuXG5cdGZvciAoY29uc3Qgcm93IG9mIG1hdHJpeCkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShyb3cpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgWyR7dGl0bGV9XSAxLWxldmVsIGFycmF5IHNob3VsZCBiZSBhIG1hdHJpeCAke0pTT04uc3RyaW5naWZ5KG1hdHJpeCl9YCkpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChtYXRyaXgucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSkuc29tZShhID0+IE51bWJlci5pc05hTihhKSkpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKFxuXHRcdFx0YFske3RpdGxlfV0gTWF0cml4IHNob3VsZCBub3QgaGF2ZSBhIE5hTlxcbkluIDogXFxuYFxuXHRcdFx0KyBtYXRyaXguam9pbignXFxuJyksXG5cdFx0KSk7XG5cdH1cblxuXHRpZiAoc2hhcGUpIHtcblx0XHRjaGVja1NoYXBlKG1hdHJpeCwgc2hhcGUsIHRpdGxlKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGFwZShtYXRyaXg6IGFueVtdLCBzaGFwZTogbnVtYmVyW10sIHRpdGxlID0gJ2NoZWNrU2hhcGUnKSB7XG5cdGlmIChtYXRyaXgubGVuZ3RoICE9PSBzaGFwZVswXSkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoYFske3RpdGxlfV0gZXhwZWN0ZWQgc2l6ZSAoJHtzaGFwZVswXX0pIGFuZCBsZW5ndGggKCR7bWF0cml4Lmxlbmd0aH0pIGRvZXMgbm90IG1hdGNoYCkpO1xuXHR9XG5cblx0aWYgKHNoYXBlLmxlbmd0aCA+IDEpIHtcblx0XHRyZXR1cm4gbWF0cml4LmZvckVhY2gobSA9PiBjaGVja1NoYXBlKG0sIHNoYXBlLnNsaWNlKDEpLCB0aXRsZSkpO1xuXHR9XG59XG4iLCJpbXBvcnQgY2hlY2tDb3ZhcmlhbmNlIGZyb20gJy4vY2hlY2stY292YXJpYW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlKHtjb3JyZWxhdGlvbiwgdmFyaWFuY2V9KSB7XG5cdGNoZWNrQ292YXJpYW5jZSh7Y292YXJpYW5jZTogY29ycmVsYXRpb259KTtcblx0cmV0dXJuIGNvcnJlbGF0aW9uLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAqIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSk7XG59XG4iLCJpbXBvcnQgY2hlY2tDb3ZhcmlhbmNlIGZyb20gJy4vY2hlY2stY292YXJpYW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvdmFyaWFuY2VUb0NvcnJlbGF0aW9uKGNvdmFyaWFuY2UpIHtcblx0Y2hlY2tDb3ZhcmlhbmNlKHtjb3ZhcmlhbmNlfSk7XG5cdGNvbnN0IHZhcmlhbmNlID0gY292YXJpYW5jZS5tYXAoKF8sIGkpID0+IGNvdmFyaWFuY2VbaV1baV0pO1xuXG5cdHJldHVybiB7XG5cdFx0dmFyaWFuY2UsXG5cdFx0Y29ycmVsYXRpb246IGNvdmFyaWFuY2UubWFwKChjLCByb3dJbmRleCkgPT4gYy5tYXAoKGEsIGNvbEluZGV4KSA9PiBhIC8gTWF0aC5zcXJ0KHZhcmlhbmNlW2NvbEluZGV4XSAqIHZhcmlhbmNlW3Jvd0luZGV4XSkpKSxcblx0fTtcbn1cbiIsImltcG9ydCB1bmlxIGZyb20gJy4vdW5pcSc7XG5cbmNvbnN0IGxpbWl0ID0gMTAwO1xuXG4vKipcbipFcXVpdmFsZW50IHRvIHRoZSBPYmplY3QuYXNzaWduIG1ldGhvZCwgdGFrZXMgc2V2ZXJhbCBhcmd1bWVudHMgYW5kIGNyZWF0ZXMgYSBuZXcgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGFzc2lnbm1lbnQgb2YgdGhlIGFyZ3VtZW50c1xuKiBAcGFyYW0ge09iamVjdH0gYXJnc1xuKiBAcGFyYW0ge051bWJlcn0gc3RlcFxuKiBAcmV0dXJucyB7T2JqZWN0fVxuKi9cbmZ1bmN0aW9uIGRlZXBBc3NpZ25JbnRlcm5hbChhcmdzOiBhbnlbXSwgc3RlcDogbnVtYmVyKTogUmVjb3JkPHN0cmluZywgYW55PiB7XG5cdGlmIChzdGVwID4gbGltaXQpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBJbiBkZWVwQXNzaWduLCBudW1iZXIgb2YgcmVjdXJzaXZlIGNhbGwgKCR7c3RlcH0pIHJlYWNoZWQgbGltaXQgKCR7bGltaXR9KSwgZGVlcEFzc2lnbiBpcyBub3Qgd29ya2luZyBvbiAgc2VsZi1yZWZlcmVuY2luZyBvYmplY3RzYCkpO1xuXHR9XG5cblx0Y29uc3QgZmlsdGVyQXJndW1lbnRzID0gYXJncy5maWx0ZXIoYXJnID0+IChhcmcpICE9PSB1bmRlZmluZWQgJiYgYXJnICE9PSBudWxsKTtcblx0Y29uc3QgbGFzdEFyZ3VtZW50ID0gZmlsdGVyQXJndW1lbnRzLmF0KC0xKTtcblx0aWYgKGZpbHRlckFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gZmlsdGVyQXJndW1lbnRzWzBdO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAobGFzdEFyZ3VtZW50KSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShsYXN0QXJndW1lbnQpKSB7XG5cdFx0cmV0dXJuIGxhc3RBcmd1bWVudDtcblx0fVxuXG5cdGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBvYmplY3RzQXJndW1lbnRzID0gZmlsdGVyQXJndW1lbnRzLmZpbHRlcihhcmcgPT4gdHlwZW9mIChhcmcpID09PSAnb2JqZWN0Jyk7XG5cdGxldCBrZXlzID0gW107XG5cdGZvciAoY29uc3QgYXJnIG9mIG9iamVjdHNBcmd1bWVudHMpIHtcblx0XHRrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmtleXMoYXJnKSk7XG5cdH1cblxuXHRjb25zdCB1bmlxS2V5cyA9IHVuaXEoa2V5cyk7XG5cdGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBvZiB1bmlxS2V5cykge1xuXHRcdGNvbnN0IHZhbHVlcyA9IG9iamVjdHNBcmd1bWVudHMubWFwKGFyZyA9PiBhcmdba2V5XSk7XG5cdFx0cmVzdWx0W2tleV0gPSBkZWVwQXNzaWduSW50ZXJuYWwodmFsdWVzLCBzdGVwICsgMSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWVwQXNzaWduKC4uLmFyZ3M6IGFueVtdKTogYW55IHsgcmV0dXJuIGRlZXBBc3NpZ25JbnRlcm5hbChhcmdzLCAwKTt9XG4iLCIvKipcbiogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvcHRzLm1lYXN1cmVzIGEgbGlzdCBvZiBtZWFzdXJlLCBzaXplIGlzIEx4TiBMIHRoZSBudW1iZXIgb2Ygc2FtcGxlLCBOIHRoZSBkaW1lbnNpb25cbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvcHRzLmF2ZXJhZ2VzIGEgbGlzdCBvZiBhdmVyYWdlcywgc2l6ZSBpcyBMeE4gTCB0aGUgbnVtYmVyIG9mIHNhbXBsZSwgTiB0aGUgZGltZW5zaW9uXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBjb3ZhcmlhbmNlIG1hdHJpeCBzaXplIGlzIE54TlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q292YXJpYW5jZSh7bWVhc3VyZXMsIGF2ZXJhZ2VzfSkge1xuXHRjb25zdCBsID0gbWVhc3VyZXMubGVuZ3RoO1xuXHRjb25zdCBuID0gbWVhc3VyZXNbMF0ubGVuZ3RoO1xuXG5cdGlmIChsID09PSAwKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignQ2Fubm90IGZpbmQgY292YXJpYW5jZSBmb3IgZW1wdHkgc2FtcGxlJykpO1xuXHR9XG5cblx0cmV0dXJuIChuZXcgQXJyYXkobikuZmlsbCgxKSkubWFwKChfLCByb3dJbmRleCkgPT4gKG5ldyBBcnJheShuKS5maWxsKDEpKS5tYXAoKF8sIGNvbEluZGV4KSA9PiB7XG5cdFx0Y29uc3Qgc3RkcyA9IG1lYXN1cmVzLm1hcCgobSwgaSkgPT4gKG1bcm93SW5kZXhdIC0gYXZlcmFnZXNbaV1bcm93SW5kZXhdKSAqIChtW2NvbEluZGV4XSAtIGF2ZXJhZ2VzW2ldW2NvbEluZGV4XSkpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHN0ZHMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBsO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4ocmVzdWx0KSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3Jlc3VsdCBpcyBOYU4nKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSkpO1xufVxuIiwiaW1wb3J0IHtkaWFnfSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBjaGVja01hdHJpeCBmcm9tICcuL2NoZWNrLW1hdHJpeCc7XG5pbXBvcnQgVHlwZUFzc2VydCBmcm9tICcuLi90eXBlcy9UeXBlQXNzZXJ0JztcbmltcG9ydCB7UHJldmlvdXNDb3JyZWN0ZWRDYWxsYmFja30gZnJvbSAnLi4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuXG4vKipcbiogSWYgY292IGlzIGEgbnVtYmVyLCByZXN1bHQgd2lsbCBiZSBJZGVudGl0eSpjb3ZcbiogSWYgY292IGlzIGFuIE51bWJlcltdLCByZXN1bHQgd2lsbCBiZSBkaWFnKGNvdilcbiogSWYgY292IGlzIGFuIE51bWJlcltdW10sIHJlc3VsdCB3aWxsIGJlIGNvdlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvbHltb3JwaE1hdHJpeChjb3Y6IG51bWJlciB8IG51bWJlcltdIHwgbnVtYmVyW11bXSB8IFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2ssIG9wdHM6IHtkaW1lbnNpb24/OiBudW1iZXIsIHRpdGxlPzogc3RyaW5nfSA9IHt9KTogbnVtYmVyW11bXSB8IFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2sgfCB1bmRlZmluZWQge1xuXHRjb25zdCB7ZGltZW5zaW9uLCB0aXRsZSA9ICdwb2x5bW9ycGgnfSA9IG9wdHM7XG5cdC8vaWYgKCFjb3YpIHtcblx0Ly9cdHJldHVybiB1bmRlZmluZWQ7XG5cdC8vfVxuXHRpZiAodHlwZW9mIChjb3YpID09PSAnbnVtYmVyJyB8fCBBcnJheS5pc0FycmF5KGNvdikpIHtcblx0XHRpZiAodHlwZW9mIChjb3YpID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgKGRpbWVuc2lvbikgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhuZXcgQXJyYXkoZGltZW5zaW9uKS5maWxsKGNvdikpO1xuXHRcdH1cblxuXHRcdGlmIChUeXBlQXNzZXJ0LmlzQXJyYXkyRChjb3YpKSB7XG5cdFx0XHRsZXQgc2hhcGU6IFtudW1iZXIsIG51bWJlcl07XG5cdFx0XHRpZiAodHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRzaGFwZSA9IFtkaW1lbnNpb24sIGRpbWVuc2lvbl07XG5cdFx0XHR9XG5cdFx0XHRjaGVja01hdHJpeChjb3YsIHNoYXBlLCB0aXRsZSk7XG5cdFx0XHRyZXR1cm4gY292O1xuXHRcdH1cblxuXHRcdGlmIChUeXBlQXNzZXJ0LmlzQXJyYXkxRChjb3YpKSB7XG5cdFx0XHRyZXR1cm4gZGlhZyhjb3YpO1xuXHRcdH1cblx0fVxuXHQvLyB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5wdXQgdHlwZSBpbiBwb2x5bW9ycGhNYXRyaXggZ2V0ICcgKyBKU09OLnN0cmluZ2lmeShjb3YpLnNsaWNlKDAsIDEwMCkpO1xuXHRyZXR1cm4gY292IGFzIG51bWJlcltdW10gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrIHwgdW5kZWZpbmVkO1xufVxuIiwiLy8gRnJvbSBvYnNlcnZhdGlvblRyYWNrcyB0byBtb3ZpbmdBdmVyYWdlR3JvdW5kVHJ1dGhzU3RhdGVzIHdpdGggc3BlZWRcblxuaW1wb3J0IHttYXRNdWwsIGludmVydH0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2plY3RPYnNlcnZhdGlvbih7b2JzZXJ2YXRpb24sIG9ic0luZGV4ZXMsIHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLCBpbnZlcnRTZWxlY3RlZFN0YXRlUHJvamVjdGlvbn0pIHtcblx0aWYgKCFvYnNlcnZhdGlvbikge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3QgdmFsdWUgPSBvYnNlcnZhdGlvbi5vYnNlcnZhdGlvbiB8fCBvYnNlcnZhdGlvbjtcblxuXHRjb25zdCB2ZWMgPSBvYnNJbmRleGVzLm1hcChpID0+IHtcblx0XHRpZiAoKHZhbHVlW2ldKSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgb2JzSW5kZXhlcyAoJHtvYnNJbmRleGVzfSkgaXMgbm90IG1hdGNoaW5nIHdpdGggb2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb259KWApKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gW3ZhbHVlW2ldXTtcblx0fSk7XG5cblx0Y29uc3QgaW52ZXJzZSA9IGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uIHx8IGludmVydChzZWxlY3RlZFN0YXRlUHJvamVjdGlvbik7XG5cblx0aWYgKGludmVyc2UgPT09IG51bGwpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdzZWxlY3RlZFN0YXRlUHJvamVjdGlvbiBpcyBub3QgaW52ZXJ0aWJsZSwgcGxlYXNlIHByb3ZpZGUgaW52ZXJ0U2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24nKSk7XG5cdH1cblxuXHRjb25zdCBvdXQgPSBtYXRNdWwoaW52ZXJzZSwgdmVjKTtcblxuXHRyZXR1cm4gb3V0XG5cdFx0Lm1hcCh2ID0+IHZbMF0pXG5cdFx0Lm1hcCh2ID0+IHtcblx0XHRcdGlmIChOdW1iZXIuaXNOYU4odikpIHtcblx0XHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ05hTiBpbiBwcm9qZWN0aW9uJykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdjtcblx0XHR9KTtcbn1cbiIsIi8vIENvbnN0IHtkaWFnfSA9IHJlcXVpcmUoJ3NpbXBsZS1saW5hbGcnKTs7XG5cbi8qKlxuKiBAY2FsbGJhY2sgTWF0cml4Q2FsbGJhY2tcbiogQHJldHVybnMgPEFycmF5LjxBcnJheS48TnVtYmVyPj5cbiovXG5cbi8qKlxuKiBUcmFuZm9ybXM6XG4qKiBhIDJkIGFycmF5IGludG8gYSBmdW5jdGlvbiAoKCkgPT4gYXJyYXkpXG4qKiBhIDFkIGFycmF5IGludG8gYSBmdW5jdGlvbiAoKCkgPT4gZGlhZyhhcnJheSkpXG4qQHBhcmFtIHtBcnJheS48TnVtYmVyPiB8IEFycmF5LjxBcnJheS48TnVtYmVyPj59IGFycmF5XG4qQHJldHVybnMge01hdHJpeENhbGxiYWNrfVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9GdW5jdGlvbihhcnJheSwge2xhYmVsID0gJyd9ID0ge30pIHtcblx0aWYgKHR5cGVvZiAoYXJyYXkpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblx0dGhyb3cgKG5ldyBFcnJvcihgJHtsYWJlbCA9PT0gbnVsbCA/ICcnIDogbGFiZWwgKyAnIDogJ31Pbmx5IGFycmF5cyBhbmQgZnVuY3Rpb25zIGFyZSBhdXRob3JpemVkIChnb3Q6IFwiJHthcnJheX1cIilgKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmlxKGFycmF5KSB7XG5cdHJldHVybiBhcnJheS5maWx0ZXIoKHZhbHVlLCBpbmRleCkgPT5cblx0XHRhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgsXG5cdCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBjb3NpbmUgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNvcyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuc3VidHJhY3QobmV3IHRoaXMoTWF0aC5QSSAvIDIpLCB0aGlzLmFzaW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNvczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBjb3RhbmdlbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBpLCAtaSwgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBjb3RhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY290KG51bSkge1xuICByZXR1cm4gdGhpcy5hdGFuKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY290OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvc2VjYW50IGZ1bmN0aW9uIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBjb3NlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjc2MobnVtKSB7XG4gIHJldHVybiB0aGlzLmFzaW4odGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzdW0gb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICcrJyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICcrJyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBTdW0gb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBhZGQobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtMS5yZSArIG51bTIucmUsIG51bTEuaW0gKyBudW0yLmltKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugc2VjYW50IGZ1bmN0aW9uIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgMCB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2VjKG51bSkge1xuICByZXR1cm4gdGhpcy5hY29zKHRoaXMuaW52ZXJzZShudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2VjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIHNpbmUgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYXNpbihudW0pIHtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgLTEpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLm11bHRpcGx5KG5ldyB0aGlzKDAsIDEpLCBudW0pLCB0aGlzLnBvdyh0aGlzLnN1YnRyYWN0KHRoaXMuT05FLCB0aGlzLnBvdyhudW0sIDIpKSwgMC41KSkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc2luOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBpLCAtaSB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgaW52ZXJzZSB0YW5nZW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYXRhbihudW0pIHtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSAvIDIpLCB0aGlzLnN1YnRyYWN0KHRoaXMubG9nKHRoaXMuc3VidHJhY3QodGhpcy5PTkUsIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSkpKSwgdGhpcy5sb2codGhpcy5hZGQodGhpcy5PTkUsIHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSkpKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGF0YW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvbXBsZXggY29uanVnYXRlIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSBjb21wbGV4IGNvbmp1Z2F0ZVxyXG4gKi9cbmZ1bmN0aW9uIGNvbmp1Z2F0ZShudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtLmdldFJlYWwoKSwgbnVtLmdldEltYWdpbmFyeSgpICogLTEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmp1Z2F0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgY29zaW5lIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQ1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggY29zaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gY29zKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLmNvcyhhKSAqIE1hdGguY29zaChiKSwgTWF0aC5zaW4oYSkgKiBNYXRoLnNpbmgoYikgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3RhbmdlbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyBrICogUEkgLyAyIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIE5vdGUgdGhhdCBjb3QoUEkgLyAyKSBzaG91bGQgZ2l2ZXMgTmFOIGluc3RlYWQgb2YgMFxyXG4gKiBiZWNhdXNlIHdlIHdvbid0IGludHJvZHVjZSB0aGUgY29uY2VwdCBvZiBJbmZpbml0eSBpbiB0aGlzIGNsYXNzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3RhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy50YW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY290OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3NlY2FudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGsgKiBQSSA6IGsgaXMgYW55IGludGVnZXIgfVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggY29zZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjc2MobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy5zaW4obnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3NjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgcXVvdGllbnQgb2YgdHdvIGNvbXBsZXggbnVtYmVycy5cclxuICogSWYgdGhlIGRlbm9taW5hdG9yIGlzIGNvbnNpZGVyZWQgYXMgMCxcclxuICogcmV0dXJuIE5hTiBpbnN0ZWFkIG9mIEluZmluaXR5XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJy8nIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJy8nIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFF1b3RpZW50IG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gZGl2aWRlKG51bTEsIG51bTIpIHtcbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGEgPSBudW0xLnJlO1xuICB2YXIgYiA9IG51bTEuaW07XG4gIHZhciBjID0gbnVtMi5yZTtcbiAgdmFyIGQgPSBudW0yLmltO1xuXG4gIGlmIChNYXRoLmFicyhjKSA8IHRoaXMuRVBTSUxPTiAmJiBNYXRoLmFicyhkKSA8IHRoaXMuRVBTSUxPTikge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBkZW5vbWluYXRvciA9IE1hdGgucG93KGMsIDIpICsgTWF0aC5wb3coZCwgMik7XG4gIHJldHVybiBuZXcgdGhpcygoYSAqIGMgKyBiICogZCkgLyBkZW5vbWluYXRvciwgKGIgKiBjIC0gYSAqIGQpIC8gZGVub21pbmF0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpdmlkZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgZnVuY3Rpb24gd2l0aCBiYXNlIEVcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIGUgdG8gdGhlIHBvd2VyIG9mIG51bVxyXG4gKi9cbmZ1bmN0aW9uIGV4cChudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHZhciByID0gTWF0aC5leHAocmUpO1xuICByZXR1cm4gbmV3IHRoaXMociAqIE1hdGguY29zKHRoZXRhKSwgciAqIE1hdGguc2luKHRoZXRhKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogTm90ZSB0aGF0IHRoZSBhcmd1bWVudCBpcyByZXN0cmljdGVkIHRvIHRoZSBpbnRlcnZhbCBbIDAsIDIgKiBQSSApXHJcbiAqIElmIHRoZSBnaXZlbiBudW1iZXIgaXMgY29uc2lkZXJlZCBhcyAwLCByZXR1cm4gdW5kZWZpbmVkXHJcbiAqIEByZXR1cm4geyBOdW1iZXIgfSAtIFJldHVybiB0aGUgYXJndW1lbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRBcmd1bWVudCgpIHtcbiAgdmFyIHggPSB0aGlzLnJlO1xuICB2YXIgeSA9IHRoaXMuaW07XG4gIHZhciBlcHNpbG9uID0gMSAvIChNYXRoLnBvdygxMCwgMTUpICogMik7XG5cbiAgaWYgKE1hdGguYWJzKHgpIDwgZXBzaWxvbiAmJiBNYXRoLmFicyh5KSA8IGVwc2lsb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHggPT09IDApIHtcbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIHJldHVybiBNYXRoLlBJICogMC41O1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJICogMS41O1xuICB9XG5cbiAgaWYgKHkgPT09IDApIHtcbiAgICBpZiAoeCA+IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLlBJO1xuICB9XG5cbiAgaWYgKHggPiAwICYmIHkgPiAwKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbih5IC8geCk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSAtIE1hdGguYXRhbih5IC8gKHggKiAtMSkpO1xuICB9XG5cbiAgaWYgKHggPCAwICYmIHkgPCAwKSB7XG4gICAgcmV0dXJuIE1hdGguUEkgKyBNYXRoLmF0YW4oeSAqIC0xIC8gKHggKiAtMSkpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguUEkgKiAyIC0gTWF0aC5hdGFuKHkgKiAtMSAvIHgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFyZ3VtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBpbWFnaW5hcnkgcGFydCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEltYWdpbmFyeSgpIHtcbiAgcmV0dXJuIHRoaXMuaW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SW1hZ2luYXJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBtb2R1bHVzIChsZW5ndGgpIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gZ2V0TW9kdWx1cygpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLnJlLCAyKSArIE1hdGgucG93KHRoaXMuaW0sIDIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNb2R1bHVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSByZWFsIHBhcnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRSZWFsKCkge1xuICByZXR1cm4gdGhpcy5yZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSZWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyLCBpLmUuIDEvelxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgaW52ZXJzZVxyXG4gKi9cbmZ1bmN0aW9uIGludmVyc2UobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCBudW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0d28gY29tcGxleCBudW1iZXJzIGFyZSBjb25zaWRlcmVkIGFzIGlkZW50aWNhbC5cclxuICogRWl0aGVyIGJvdGggYXJlIE5hTiBvciBib3RoIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0cyBhcmUgZXh0cmVtZWx5IGNsb3NlZC5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IEludGVnZXIgfSBkaWdpdCAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybiB7IEJvb2xlYW4gfSAtIFJldHVybiB0cnVlIGlmIHR3byBjb21wbGV4IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsXHJcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbChudW0xLCBudW0yKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogMTU7XG5cbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGRpZ2l0KSB8fCBkaWdpdCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgZGlnaXQnKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBhID0gbnVtMS5nZXRSZWFsKCk7XG4gIHZhciBiID0gbnVtMS5nZXRJbWFnaW5hcnkoKTtcbiAgdmFyIGMgPSBudW0yLmdldFJlYWwoKTtcbiAgdmFyIGQgPSBudW0yLmdldEltYWdpbmFyeSgpO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oYSkgJiYgTnVtYmVyLmlzTmFOKGIpICYmIE51bWJlci5pc05hTihjKSAmJiBOdW1iZXIuaXNOYU4oZCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmFicyhhIC0gYykgPCBFUFNJTE9OICYmIE1hdGguYWJzKGIgLSBkKSA8IEVQU0lMT047XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBnaXZlbiBjb21wbGV4IG51bWJlciBpcyBOYU4gb3Igbm90XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQm9vbGVhbiB9IC0gUmV0dXJuIHRydWUgaWYgb25lIG9mIHJlYWwgYW5kIGltYWdpbmFyeSBwYXJ0IGFyZSBOYU5cclxuICovXG5mdW5jdGlvbiBpc05hTihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcmUgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgaW0gPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihyZSkgfHwgTnVtYmVyLmlzTmFOKGltKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmFOOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBuYXR1cmFsIGxvZyBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBOb3RlIHRoYXQgY29tcGxleCBsb2cgaXMgYSBtdWx0aXZhbHVlZCBmdW5jdGlvbixcclxuICogQnV0IHRoaXMgZnVuY3Rpb24gb25seSBwcm92aWRlcyB0aGUgcHJpbmNpcGFsIHZhbHVlIGJ5XHJcbiAqIHJlc3RyaWN0aW5nIHRoZSBpbWFnaW5hcnkgcGFydCB0byB0aGUgaW50ZXJ2YWwgWzAsIDIgKiBQaSkuXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgYWZ0ZXIgdGFraW5nIG5hdHVyYWwgbG9nXHJcbiAqL1xuZnVuY3Rpb24gbG9nKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciByID0gbnVtLmdldE1vZHVsdXMoKTtcbiAgdmFyIHRoZXRhID0gbnVtLmdldEFyZ3VtZW50KCk7XG5cbiAgaWYgKHIgPCB0aGlzLkVQU0lMT04gfHwgdGhldGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLmxvZyhyKSwgdGhldGEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHByb2R1Y3Qgb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICd4JyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICd4JyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBQcm9kdWN0IG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG4gIHJldHVybiBuZXcgdGhpcyhhICogYyAtIGIgKiBkLCBhICogZCArIGIgKiBjKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgcG93ZXIgb2YgY29tcGxleCBudW1iZXIsXHJcbiAqIFRoZSBleHBvbmVudCBjYW4gYmUgYW55IHJlYWwgbnVtYmVyXHJcbiAqIElmIHlvdSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgay10aCByb290LFxyXG4gKiBZb3Ugc2hvdWxkIGtub3cgdGhhdCBpdCBvbmx5IHJldHVybnMgb25lIG91dCBvZiBrIHNvbHV0aW9ucyxcclxuICogQWx0aG91Z2ggdGhlcmUgYXJlIHRvdGFsIGsgcG9zc2libGUgc29sdXRpb25zIGZvciBrLXRoIHJvb3QgcHJvYmxlbS5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIEJhc2VcclxuICogQHBhcmFtIHsgQ29tcGxleCB8IE51bWJlciB9IG4gLSBFeHBvbmVudFxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0aW9uXHJcbiAqL1xuZnVuY3Rpb24gcG93KG51bSwgbikge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSB8fCB0eXBlb2YgbiAhPT0gJ251bWJlcicgJiYgIShuIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICBpZiAodHlwZW9mIG4gPT09ICdudW1iZXInKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobikgfHwgTnVtYmVyLmlzTmFOKG4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5OYU47XG4gICAgfVxuXG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLk9ORTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VxdWFsKG51bSwgdGhpcy5aRVJPKSkge1xuICAgICAgcmV0dXJuIHRoaXMuWkVSTztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5leHAodGhpcy5tdWx0aXBseShuZXcgdGhpcyhuLCAwKSwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiB0aGlzKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwKHRoaXMubXVsdGlwbHkobiwgdGhpcy5sb2cobnVtKSkpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuTmFOO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgc2VjYW50IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgKCAyayArIDEpICogUEkgLyAyIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBzZWNhbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBzZWMobnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLk9ORSwgdGhpcy5jb3MobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VjOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBzaW5lIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQ1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggc2luZSBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNpbihudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBiID0gbnVtLmdldEltYWdpbmFyeSgpO1xuICByZXR1cm4gbmV3IHRoaXMoTWF0aC5zaW4oYSkgKiBNYXRoLmNvc2goYiksIE1hdGguY29zKGEpICogTWF0aC5zaW5oKGIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBjb21wbGV4IG51bWJlcnNcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgbGVmdCBvZiAnLScgc2lnblxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSByaWdodCBvZiAnLScgc2lnblxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gRGlmZmVyZW5jZSBvZiB0d28gbnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0KG51bTEsIG51bTIpIHtcbiAgaWYgKCEobnVtMSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEobnVtMiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG51bTEucmUgLSBudW0yLnJlLCBudW0xLmltIC0gbnVtMi5pbSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VidHJhY3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIHRhbmdlbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAoIDJrICsgMSkgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IHRhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiB0YW4obnVtKSB7XG4gIHJldHVybiB0aGlzLmRpdmlkZSh0aGlzLnNpbihudW0pLCB0aGlzLmNvcyhudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgU3RyaW5nIH0gLSBSZXR1cm4gdGhlIHN0cmluZ2lmaWVkIGFuZCBmb3JtYXR0ZWQgY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIHJlID0gdGhpcy5yZSxcbiAgICAgIGltID0gdGhpcy5pbTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKHJlKSB8fCBOdW1iZXIuaXNOYU4oaW0pKSB7XG4gICAgcmV0dXJuICdOYU4nO1xuICB9XG5cbiAgaWYgKHJlID09PSAwICYmIGltID09PSAwKSB7XG4gICAgcmV0dXJuICcwJztcbiAgfVxuXG4gIGlmIChyZSA9PT0gMCkge1xuICAgIGlmIChpbSA9PT0gMSkge1xuICAgICAgcmV0dXJuICdpJztcbiAgICB9XG5cbiAgICBpZiAoaW0gPT09IC0xKSB7XG4gICAgICByZXR1cm4gJy1pJztcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQoaW0sIFwiaVwiKTtcbiAgfVxuXG4gIGlmIChpbSA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSk7XG4gIH1cblxuICBpZiAoaW0gPiAwKSB7XG4gICAgaWYgKGltID09PSAxKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiICsgaVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiICsgXCIpLmNvbmNhdChpbSwgXCJpXCIpO1xuICB9XG5cbiAgaWYgKGltID09PSAtMSkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgLSBpXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiAtIFwiKS5jb25jYXQoTWF0aC5hYnMoaW0pLCBcImlcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXHJcbiAqIFJldHVybnMgYSBDb21wbGV4IE51bWJlclxyXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBhcmcxIC0gcmVhbCBwYXJ0IG9mIHRoZSBjb21wbGV4IG51bWJlclxyXG4gKiBAcGFyYW0geyBOdW1iZXIgfSBhcmcyIC0gaW1hZ2luYXJ5IHBhcnQgb2YgdGhlIGNvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBDb21wbGV4IE51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIENvbXBsZXgoYXJnMSwgYXJnMikge1xuICB2YXIgdHlwZTEgPSBfdHlwZW9mKGFyZzEpO1xuXG4gIHZhciB0eXBlMiA9IF90eXBlb2YoYXJnMik7XG5cbiAgaWYgKHR5cGUxID09PSAnbnVtYmVyJyAmJiB0eXBlMiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGFyZzEpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkpIHtcbiAgICAgIHRoaXMucmUgPSBOYU47XG4gICAgICB0aGlzLmltID0gTmFOO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5yZSA9IGFyZzE7XG4gICAgdGhpcy5pbSA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAnbnVtYmVyJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgTnVtYmVyLmlzTmFOKGFyZzIpIHx8ICFOdW1iZXIuaXNGaW5pdGUoYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcyKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gYXJnMjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMucmUgPSBOYU47XG4gIHRoaXMuaW0gPSBOYU47XG4gIHJldHVybiB0aGlzO1xufVxuXG5Db21wbGV4LnByb3RvdHlwZS5nZXRSZWFsID0gcmVxdWlyZSgnLi9jb3JlL2dldFJlYWwnKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldEltYWdpbmFyeSA9IHJlcXVpcmUoJy4vY29yZS9nZXRJbWFnaW5hcnknKTtcbkNvbXBsZXgucHJvdG90eXBlLmdldE1vZHVsdXMgPSByZXF1aXJlKCcuL2NvcmUvZ2V0TW9kdWx1cycpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0QXJndW1lbnQgPSByZXF1aXJlKCcuL2NvcmUvZ2V0QXJndW1lbnQnKTtcbkNvbXBsZXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL3RvU3RyaW5nJyk7XG5Db21wbGV4LmlzTmFOID0gcmVxdWlyZSgnLi9jb3JlL2lzTmFOJyk7XG5Db21wbGV4LmlzRXF1YWwgPSByZXF1aXJlKCcuL2NvcmUvaXNFcXVhbCcpO1xuQ29tcGxleC5jb25qdWdhdGUgPSByZXF1aXJlKCcuL2NvcmUvY29uanVnYXRlJyk7XG5Db21wbGV4LmludmVyc2UgPSByZXF1aXJlKCcuL2NvcmUvaW52ZXJzZScpO1xuQ29tcGxleC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvYWRkJyk7XG5Db21wbGV4LnN1YnRyYWN0ID0gcmVxdWlyZSgnLi9jb3JlL3N1YnRyYWN0Jyk7XG5Db21wbGV4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL211bHRpcGx5Jyk7XG5Db21wbGV4LmRpdmlkZSA9IHJlcXVpcmUoJy4vY29yZS9kaXZpZGUnKTtcbkNvbXBsZXguZXhwID0gcmVxdWlyZSgnLi9jb3JlL2V4cCcpO1xuQ29tcGxleC5sb2cgPSByZXF1aXJlKCcuL2NvcmUvbG9nJyk7XG5Db21wbGV4LnBvdyA9IHJlcXVpcmUoJy4vY29yZS9wb3cnKTtcbkNvbXBsZXguc2luID0gcmVxdWlyZSgnLi9jb3JlL3NpbicpO1xuQ29tcGxleC5jb3MgPSByZXF1aXJlKCcuL2NvcmUvY29zJyk7XG5Db21wbGV4LnRhbiA9IHJlcXVpcmUoJy4vY29yZS90YW4nKTtcbkNvbXBsZXguY3NjID0gcmVxdWlyZSgnLi9jb3JlL2NzYycpO1xuQ29tcGxleC5zZWMgPSByZXF1aXJlKCcuL2NvcmUvc2VjJyk7XG5Db21wbGV4LmNvdCA9IHJlcXVpcmUoJy4vY29yZS9jb3QnKTtcbkNvbXBsZXguYXNpbiA9IHJlcXVpcmUoJy4vY29yZS9hc2luJyk7XG5Db21wbGV4LmFjb3MgPSByZXF1aXJlKCcuL2NvcmUvYWNvcycpO1xuQ29tcGxleC5hdGFuID0gcmVxdWlyZSgnLi9jb3JlL2F0YW4nKTtcbkNvbXBsZXguYWNzYyA9IHJlcXVpcmUoJy4vY29yZS9hY3NjJyk7XG5Db21wbGV4LmFzZWMgPSByZXF1aXJlKCcuL2NvcmUvYXNlYycpO1xuQ29tcGxleC5hY290ID0gcmVxdWlyZSgnLi9jb3JlL2Fjb3QnKTtcbkNvbXBsZXguTmFOID0gbmV3IENvbXBsZXgoTmFOKTtcbkNvbXBsZXguT05FID0gbmV3IENvbXBsZXgoMSk7XG5Db21wbGV4LlpFUk8gPSBuZXcgQ29tcGxleCgwKTtcbkNvbXBsZXguUEkgPSBuZXcgQ29tcGxleChNYXRoLlBJKTtcbkNvbXBsZXguRSA9IG5ldyBDb21wbGV4KE1hdGguRSk7XG5Db21wbGV4LkVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTtcbm1vZHVsZS5leHBvcnRzID0gQ29tcGxleDsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIElOVkFMSURfQVJSQVk6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1hcnJheSBhcmd1bWVudCcsXG4gIElOVkFMSURfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYW4gaW52YWxpZCBtYXRyaXgnLFxuICBJTlZBTElEX1NRVUFSRV9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhIG5vbi1zcXVhcmUgbWF0cml4JyxcbiAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIHVwcGVyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uIGxvd2VyLXRyaWFuZ3VsYXIgbWF0cml4JyxcbiAgSU5WQUxJRF9FWFBPTkVOVDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgZXhwb25lbnQnLFxuICBJTlZBTElEX1JPV19DT0w6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cgYW5kIGNvbHVtbicsXG4gIElOVkFMSURfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgbm9uLW5lZ2F0aXZlIGludGVnZXIgcm93JyxcbiAgSU5WQUxJRF9DT0xVTU46ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciBjb2x1bW4nLFxuICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgcm93cyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT046ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIGNvbHVtbnMgZXhwcmVzc2lvbicsXG4gIElOVkFMSURfUF9OT1JNOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCBwLW5vcm0nLFxuICBPVkVSRkxPV19JTkRFWDogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IENvbHVtbiBpbmRleCBvdmVyZmxvdycsXG4gIE9WRVJGTE9XX1JPVzogJ0ludmFsaWQgYXJndW1lbnQ6IFJvdyBpbmRleCBvdmVyZmxvdycsXG4gIE5PX1VOSVFVRV9TT0xVVElPTjogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgc3lzdGVtIGhhcyBubyB1bmlxdWUgc29sdXRpb24nLFxuICBTSVpFX0lOQ09NUEFUSUJMRTogJ0ludmFsaWQgYXJndW1lbnQ6IE1hdHJpeCBzaXplLWluY29tcGF0aWJsZScsXG4gIFNJTkdVTEFSX01BVFJJWDogJ0FyaXRobWV0aWMgRXhjZXB0aW9uOiBUaGUgbWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlJyxcbiAgRVhQRUNURURfU1RSSU5HX05VTUJFUl9BVF9QT1NfMV8yOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYSBudW1iZXIgYXQgYXJndW1lbnRzWzFdIGFuZCBhcmd1bWVudHNbMl0nLFxuICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgZWl0aGVyIGFuIGFycmF5IG9mIG51bWJlcnMgb3IgYW4gYXJyYXkgb2Ygc3F1YXJlIG1hdHJpY2VzJ1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTFVQIGRlY29tcG9zaXRpb24gb2YgdGhlIE1hdHJpeCxcclxuICogd2hlcmUgTCBpcyBsb3dlciB0cmlhbmd1bGFyIG1hdHJpeCB3aGljaCBkaWFnb25hbCBlbnRyaWVzIGFyZSBhbHdheXMgMSxcclxuICogVSBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeCwgYW5kIFAgaXMgcGVybXV0YXRpb24gbWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBJdCBpcyBpbXBsZW1lbnRlZCB1c2luZyBHYXVzc2lhbiBFbGltaW5hdGlvbiB3aXRoIFBhcnRpYWwgUGl2b3RpbmcgaW4gb3JkZXIgdG9cclxuICogcmVkdWNlIHRoZSBlcnJvciBjYXVzZWQgYnkgZmxvYXRpbmctcG9pbnQgYXJpdGhtZXRpYy48YnI+PGJyPlxyXG4gKiBcclxuICogTm90ZSB0aGF0IGlmIG9wdGltaXplZCBpcyB0cnVlLCBQIGlzIGEgUGVybXV0YXRpb24gQXJyYXkgYW5kIGJvdGggTCBhbmQgVSBhcmUgbWVyZ2VkXHJcbiAqIGludG8gb25lIG1hdHJpeCBpbiBvcmRlciB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGltaXplZD1mYWxzZV0gLSBSZXR1cm5zIFtQLCBMVV0gaWYgaXQgaXMgdHJ1ZSwgW1AsIEwsIFVdIGlmIGl0IGlzIGZhbHNlXHJcbiAqIEByZXR1cm5zIHtNYXRyaXhbXX0gVGhlIExVUCBkZWNvbXBvc2l0aW9uIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBMVShBKSB7XG4gIHZhciBvcHRpbWl6ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihyb3cpO1xuXG4gIHZhciBjb3B5ID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93IC0gMTsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRDb2wgPSBNYXRoLm1pbihpLCBjb2wpOyAvLyBhcHBseSBQYXJ0aWFsIFBpdm90aW5nXG5cbiAgICBQYXJ0aWFsUGl2b3RpbmcoY29weSwgcGVybXV0YXRpb24sIGN1cnJlbnRDb2wsIHJvdywgY29sKTtcbiAgICB2YXIgaXRoID0gcGVybXV0YXRpb25baV07XG4gICAgdmFyIHBpdm90ID0gY29weVtpdGhdW2N1cnJlbnRDb2xdO1xuXG4gICAgaWYgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSBpICsgMTsgaiA8IHJvdzsgaisrKSB7XG4gICAgICB2YXIganRoID0gcGVybXV0YXRpb25bal07XG4gICAgICB2YXIgZW50cnkgPSBjb3B5W2p0aF1bY3VycmVudENvbF07XG5cbiAgICAgIGlmIChNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB2YXIgZmFjdG9yID0gZW50cnkgLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBrID0gY3VycmVudENvbDsgayA8IGNvbDsgaysrKSB7XG4gICAgICAgICAgY29weVtqdGhdW2tdIC09IGZhY3RvciAqIGNvcHlbaXRoXVtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHlbanRoXVtjdXJyZW50Q29sXSA9IGZhY3RvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgcm93OyBfaTIrKykge1xuICAgIHJlc3VsdFtfaTJdID0gY29weVtwZXJtdXRhdGlvbltfaTJdXTtcbiAgfVxuXG4gIGlmIChvcHRpbWl6ZWQpIHtcbiAgICByZXR1cm4gW3Blcm11dGF0aW9uLCBuZXcgdGhpcyhyZXN1bHQpXTtcbiAgfVxuXG4gIHZhciBQID0gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICB2YXIgaWR4ID0gcGVybXV0YXRpb25baV07XG5cbiAgICBpZiAoaiA9PT0gaWR4KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIHZhciBMID0gdGhpcy5nZW5lcmF0ZShyb3csIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGlmIChpIDwgaikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFtpXVtqXTtcbiAgfSk7XG4gIHZhciBVID0gdGhpcy5nZW5lcmF0ZShzaXplLCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPiBqKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0W2ldW2pdO1xuICB9KTtcbiAgcmV0dXJuIFtQLCBMLCBVXTtcbn1cblxuO1xuXG5mdW5jdGlvbiBpbml0UGVybXV0YXRpb24oc2l6ZSkge1xuICB2YXIgcGVybXV0YXRpb24gPSBuZXcgQXJyYXkoc2l6ZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBwZXJtdXRhdGlvbltpXSA9IGk7XG4gIH1cblxuICByZXR1cm4gcGVybXV0YXRpb247XG59XG5cbmZ1bmN0aW9uIFBhcnRpYWxQaXZvdGluZyhtYXRyaXgsIHBlcm11dGF0aW9uLCBwb3MsIHJvdywgY29sKSB7XG4gIHZhciBjdXJyZW50Q29sID0gTWF0aC5taW4ocG9zLCBjb2wpO1xuICB2YXIgbWF4SWR4ID0gcG9zO1xuICB2YXIgbWF4ID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW3Bvc11dW2N1cnJlbnRDb2xdKTtcblxuICBmb3IgKHZhciBpID0gcG9zICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gTWF0aC5hYnMobWF0cml4W3Blcm11dGF0aW9uW2ldXVtjdXJyZW50Q29sXSk7XG5cbiAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgIG1heElkeCA9IGk7XG4gICAgICBtYXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICB2YXIgdCA9IHBlcm11dGF0aW9uW3Bvc107XG4gIHBlcm11dGF0aW9uW3Bvc10gPSBwZXJtdXRhdGlvblttYXhJZHhdO1xuICBwZXJtdXRhdGlvblttYXhJZHhdID0gdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMVTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgUVIgZGVjb21wb3NpdGlvbiBvZiB0aGUgTWF0cml4XHJcbiAqIHdoZXJlIFEgaXMgb3J0aG9nb25hbCBtYXRyaXgsIFIgaXMgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBhbGdvcml0aG0gaXMgaW1wbGVtZW50ZWQgdXNpbmcgSG91c2Vob2xkZXIgVHJhbnNmb3JtIGluc3RlYWQgb2YgR3JhbeKAk1NjaG1pZHQgcHJvY2Vzc1xyXG4gKiBiZWNhdXNlIHRoZSBIb3VzZWhvbGRlciBUcmFuc2Zvcm0gaXMgbW9yZSBudW1lcmljYWxseSBzdGFibGUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBtYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeFtdfSBUaGUgUVIgZGVjb21wb3NpdGlvbiBvZiBtYXRyaXggaW4gdGhlIGZvcm0gb2YgW1EsIFJdXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIFFSKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgbWF0cml4UiA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICB2YXIgbWF0cml4USA9IHRoaXMuaWRlbnRpdHkocm93KS5fbWF0cml4O1xuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgLy8gaWYgYWxsIGVudHJpZXMgYmVsb3cgbWFpbiBkaWFnb25hbCBhcmUgY29uc2lkZXJlZCBhcyB6ZXJvLCBza2lwIHRoaXMgcm91bmRcbiAgICB2YXIgc2tpcCA9IHRydWU7XG5cbiAgICBmb3IgKHZhciBpID0gaiArIDE7IGkgPCByb3c7IGkrKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeFJbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgc2tpcCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXApIHtcbiAgICAgIC8vIEFwcGx5IEhvdXNlaG9sZGVyIHRyYW5zZm9ybVxuICAgICAgdmFyIG5vcm0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBfaTIgPSBqOyBfaTIgPCByb3c7IF9pMisrKSB7XG4gICAgICAgIG5vcm0gKz0gTWF0aC5wb3cobWF0cml4UltfaTJdW2pdLCAyKTtcbiAgICAgIH1cblxuICAgICAgbm9ybSA9IE1hdGguc3FydChub3JtKTsgLy8gcmVkdWNlIGZsb2F0aW5nIHBvaW50IGFyaXRobWF0aWMgZXJyb3JcblxuICAgICAgdmFyIHMgPSAtMTtcblxuICAgICAgaWYgKG1hdHJpeFJbal1bal0gPCAwKSB7XG4gICAgICAgIHMgPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgdTEgPSBtYXRyaXhSW2pdW2pdIC0gcyAqIG5vcm07XG4gICAgICB2YXIgdyA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgcm93IC0gajsgX2kzKyspIHtcbiAgICAgICAgd1tfaTNdID0gbWF0cml4UltfaTMgKyBqXVtqXSAvIHUxO1xuICAgICAgfVxuXG4gICAgICB3WzBdID0gMTtcbiAgICAgIHZhciB0YXUgPSAtMSAqIHMgKiB1MSAvIG5vcm07XG4gICAgICB2YXIgc3ViUiA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgcm93IC0gajsgX2k0KyspIHtcbiAgICAgICAgdmFyIG5ld1JvdyA9IG5ldyBBcnJheShjb2wpO1xuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY29sOyBrKyspIHtcbiAgICAgICAgICBuZXdSb3dba10gPSBtYXRyaXhSW2ogKyBfaTRdW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViUltfaTRdID0gbmV3Um93O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTUgPSBqOyBfaTUgPCByb3c7IF9pNSsrKSB7XG4gICAgICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBjb2w7IF9rKyspIHtcbiAgICAgICAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgcm93IC0gajsgbSsrKSB7XG4gICAgICAgICAgICBzdW1tYXRpb24gKz0gc3ViUlttXVtfa10gKiB3W21dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdHJpeFJbX2k1XVtfa10gPSBzdWJSW19pNSAtIGpdW19rXSAtIHRhdSAqIHdbX2k1IC0gal0gKiBzdW1tYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN1YlEgPSBuZXcgQXJyYXkocm93KTtcblxuICAgICAgZm9yICh2YXIgX2k2ID0gMDsgX2k2IDwgcm93OyBfaTYrKykge1xuICAgICAgICB2YXIgX25ld1JvdyA9IG5ldyBBcnJheShyb3cgLSBqKTtcblxuICAgICAgICBmb3IgKHZhciBfazIgPSAwOyBfazIgPCByb3cgLSBqOyBfazIrKykge1xuICAgICAgICAgIF9uZXdSb3dbX2syXSA9IG1hdHJpeFFbX2k2XVtqICsgX2syXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1YlFbX2k2XSA9IF9uZXdSb3c7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNyA9IDA7IF9pNyA8IHJvdzsgX2k3KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2szID0gajsgX2szIDwgcm93OyBfazMrKykge1xuICAgICAgICAgIHZhciBfc3VtbWF0aW9uID0gMDtcblxuICAgICAgICAgIGZvciAodmFyIF9tID0gMDsgX20gPCByb3cgLSBqOyBfbSsrKSB7XG4gICAgICAgICAgICBfc3VtbWF0aW9uICs9IHN1YlFbX2k3XVtfbV0gKiB3W19tXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYXRyaXhRW19pN11bX2szXSA9IHN1YlFbX2k3XVtfazMgLSBqXSAtIHRhdSAqIHdbX2szIC0gal0gKiBfc3VtbWF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2k4ID0gMDsgX2k4IDwgcm93OyBfaTgrKykge1xuICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBjb2w7IF9qKyspIHtcbiAgICAgIGlmIChfaTggPiBfaikge1xuICAgICAgICBtYXRyaXhSW19pOF1bX2pdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gW25ldyB0aGlzKG1hdHJpeFEpLCBuZXcgdGhpcyhtYXRyaXhSKV07XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gUVI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgVXggPSB5IHVzaW5nIGJhY2t3YXJkIHN1YnN0aXR1dGlvbixcclxuKiB3aGVyZSBVIGlzIGFuIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4qIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuKiBAbWVtYmVyb2YgTWF0cml4XHJcbiogQHN0YXRpY1xyXG4qIEBwYXJhbSB7TWF0cml4fSBVIC0gQW55IG4geCBuIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4XHJcbiogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBVeCA9IHlcclxuKi9cblxuXG5mdW5jdGlvbiBiYWNrd2FyZChVLCB5KSB7XG4gIGlmICghKFUgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIVUuaXNVcHBlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IFUuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhVID0gVS5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoeXJvdyAhPT0gc2l6ZSB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgVS5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4VVtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gc2l6ZSAtIDE7IF9pMiA+PSAwOyBfaTItLSkge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IF9pMiArIDE7IGogPCBzaXplOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhVW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeFVbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gYmFja3dhcmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OO1xuLyoqXHJcbiAqIFNvbHZlIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zIEx4ID0geSB1c2luZyBmb3J3YXJkIHN1YnN0aXR1dGlvbixcclxuICogd2hlcmUgTCBpcyBhIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4LlxyXG4gKiBJZiB0aGVyZSBpcyBubyB1bmlxdWUgc29sdXRpb25zLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gTCAtIEFueSBuIHggbiBsb3dlciB0cmlhbmd1bGFyIE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gbiB4IDEgTWF0cml4IHdoaWNoIGlzIHRoZSBzb2x1dGlvbiBvZiBMeCA9IHlcclxuICovXG5cblxuZnVuY3Rpb24gZm9yd2FyZChMLCB5KSB7XG4gIGlmICghKEwgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKHkgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUwuaXNMb3dlclRyaWFuZ3VsYXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTC5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEwuc2l6ZSgpWzBdO1xuXG4gIHZhciBfeSRzaXplID0geS5zaXplKCksXG4gICAgICBfeSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF95JHNpemUsIDIpLFxuICAgICAgeXJvdyA9IF95JHNpemUyWzBdLFxuICAgICAgeWNvbCA9IF95JHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXhMID0gTC5fbWF0cml4O1xuICB2YXIgbWF0cml4WSA9IHkuX21hdHJpeDtcblxuICBpZiAoc2l6ZSAhPT0geXJvdyB8fCB5Y29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgTC5fZGlnaXQpICogMik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoTWF0aC5hYnMobWF0cml4TFtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29lZmZpY2llbnRzID0gZW1wdHkoc2l6ZSwgMSk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgc2l6ZTsgX2kyKyspIHtcbiAgICB2YXIgc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2kyOyBqKyspIHtcbiAgICAgIHN1bW1hdGlvbiArPSBjb2VmZmljaWVudHNbal1bMF0gKiBtYXRyaXhMW19pMl1bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pMl1bMF0gPSAobWF0cml4WVtfaTJdWzBdIC0gc3VtbWF0aW9uKSAvIG1hdHJpeExbX2kyXVtfaTJdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZm9yd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgTk9fVU5JUVVFX1NPTFVUSU9OID0gX3JlcXVpcmUuTk9fVU5JUVVFX1NPTFVUSU9OLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFO1xuLyoqXHJcbiAqIFNvbHZlIHN5c3RlbSBvZiBsaW5lYXIgZXF1YXRpb25zIEF4ID0geSB1c2luZyBMVSBkZWNvbXBvc2l0aW9uLlxyXG4gKiBJZiB0aGVyZSBpcyBubyB1bmlxdWUgc29sdXRpb25zLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gTCAtIEFueSBuIHggbiBzcXVhcmUgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSB5IC0gQW55IG4geCAxIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIEF4ID0geVxyXG4gKi9cblxuXG5mdW5jdGlvbiBzb2x2ZShBLCBiKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKGIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBhUm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBhQ29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9iJHNpemUgPSBiLnNpemUoKSxcbiAgICAgIF9iJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX2Ikc2l6ZSwgMiksXG4gICAgICBiUm93ID0gX2Ikc2l6ZTJbMF0sXG4gICAgICBiQ29sID0gX2Ikc2l6ZTJbMV07XG5cbiAgaWYgKGFDb2wgIT09IGJSb3cgfHwgYkNvbCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBfdGhpcyRMVSA9IHRoaXMuTFUoQSwgdHJ1ZSksXG4gICAgICBfdGhpcyRMVTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRMVSwgMiksXG4gICAgICBQID0gX3RoaXMkTFUyWzBdLFxuICAgICAgTFUgPSBfdGhpcyRMVTJbMV07XG5cbiAgdmFyIG1hdHJpeExVID0gTFUuX21hdHJpeDtcbiAgdmFyIG1hdHJpeEIgPSBiLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaSA9IGFSb3cgLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhMVVtpXVtpXSkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVU5JUVVFX1NPTFVUSU9OKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2xvbmVkVmVjdG9yID0gbmV3IEFycmF5KGJSb3cpO1xuICB2YXIgY29lZmZpY2llbnRzID0gbmV3IEFycmF5KGJSb3cpO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGJSb3c7IF9pMisrKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgY2xvbmVkVmVjdG9yW19pMl0gPSBtYXRyaXhCW1BbX2kyXV1bMF07XG4gIH1cblxuICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBhUm93OyBfaTMrKykge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBfaTM7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXSAqIG1hdHJpeExVW19pM11bal07XG4gICAgfVxuXG4gICAgY29lZmZpY2llbnRzW19pM10gPSBjbG9uZWRWZWN0b3JbX2kzXSAtIHN1bW1hdGlvbjtcbiAgfVxuXG4gIGZvciAodmFyIF9pNCA9IGFSb3cgLSAxOyBfaTQgPj0gMDsgX2k0LS0pIHtcbiAgICB2YXIgX3N1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBfaiA9IF9pNCArIDE7IF9qIDwgYVJvdzsgX2orKykge1xuICAgICAgX3N1bW1hdGlvbiArPSBtYXRyaXhMVVtfaTRdW19qXSAqIGNsb25lZFZlY3Rvcltfal07XG4gICAgfVxuXG4gICAgY2xvbmVkVmVjdG9yW19pNF0gPSAoY29lZmZpY2llbnRzW19pNF0gLSBfc3VtbWF0aW9uKSAvIG1hdHJpeExVW19pNF1bX2k0XTtcbiAgfVxuXG4gIGZvciAodmFyIF9pNSA9IDA7IF9pNSA8IGJSb3c7IF9pNSsrKSB7XG4gICAgY29lZmZpY2llbnRzW19pNV0gPSBbY2xvbmVkVmVjdG9yW19pNV1dO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKGNvZWZmaWNpZW50cyk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc29sdmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3VtIG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBoYXMgc2FtZSBzaXplIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgc3VtIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5mdW5jdGlvbiBhZGQoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgcm93MiA9IF9CJHNpemUyWzBdLFxuICAgICAgY29sMiA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgIT09IHJvdzIgfHwgY29sICE9PSBjb2wyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBtYXRyaXgxID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4MiA9IEIuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeDFbaV1bal0gKyBtYXRyaXgyW2ldW2pdO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBhZGQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBGaW5kIHRoZSBpbnZlcnNlIG9mIG5vbi1zaW5ndWxhciBtYXRyaXggdXNpbmcgRWxlbWVudGFyeSBSb3cgT3BlcmF0aW9ucy5cclxuICogSWYgdGhlIG1hdHJpeCBpcyBzaW5ndWxhciwgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgaW52ZXJzZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGludmVyc2UoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFBLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gQS5zaXplKClbMF07XG5cbiAgaWYgKHNpemUgPT09IDApIHtcbiAgICAvLyBpbnZlcnNlIG9mIDB4MCBtYXRyaXggaXMgaXRzZWxmXG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoW10pO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcblxuICB2YXIgaW52ID0gdGhpcy5pZGVudGl0eShzaXplKS5fbWF0cml4O1xuXG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmUoQSkuX21hdHJpeDtcblxuICB2YXIgcGVybXV0YXRpb24gPSBpbml0UGVybXV0YXRpb24oc2l6ZSk7IC8vIGl0ZXJhdGUgZWFjaCBjb2x1bW5cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgIHZhciBwaXZvdElkeCA9IGo7XG4gICAgdmFyIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bal1dW2pdO1xuXG4gICAgd2hpbGUgKE1hdGguYWJzKHBpdm90KSA8IEVQU0lMT04gJiYgcGl2b3RJZHggPCBzaXplIC0gMSkge1xuICAgICAgcGl2b3RJZHgrKztcbiAgICAgIHBpdm90ID0gY2xvbmVbcGVybXV0YXRpb25bcGl2b3RJZHhdXVtqXTtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFNJTkdVTEFSX01BVFJJWCk7XG4gICAgfVxuXG4gICAgaWYgKGogIT09IHBpdm90SWR4KSB7XG4gICAgICB2YXIgdGVtcCA9IHBlcm11dGF0aW9uW2pdO1xuICAgICAgcGVybXV0YXRpb25bal0gPSBwZXJtdXRhdGlvbltwaXZvdElkeF07XG4gICAgICBwZXJtdXRhdGlvbltwaXZvdElkeF0gPSB0ZW1wO1xuICAgIH1cblxuICAgIHZhciBwaXZvdFJvdyA9IHBlcm11dGF0aW9uW2pdOyAvLyB0aGUgcGl2b3QgaXMgZ3VhcmFudGVlZCB0byBiZSBub24temVyb1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBpdGggPSBwZXJtdXRhdGlvbltpXTtcblxuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgICBpZiAoayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtrXSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGsgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW2tdIC89IHBpdm90O1xuICAgICAgICB9XG5cbiAgICAgICAgcGl2b3QgPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhjbG9uZVtpdGhdW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBjbG9uZVtpdGhdW2pdIC8gcGl2b3Q7XG5cbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IHNpemU7IF9rKyspIHtcbiAgICAgICAgICBpZiAoX2sgPT09IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2sgPiBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW19rXSAtPSBmYWN0b3IgKiBjbG9uZVtwaXZvdFJvd11bX2tdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGludltpdGhdW19rXSAtPSBmYWN0b3IgKiBpbnZbcGl2b3RSb3ddW19rXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBzaXplOyBfaSsrKSB7XG4gICAgY2xvbmVbX2ldID0gaW52W3Blcm11dGF0aW9uW19pXV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY2xvbmUpO1xufVxuXG47XG5cbmZ1bmN0aW9uIGluaXRQZXJtdXRhdGlvbihzaXplKSB7XG4gIHZhciBwZXJtdXRhdGlvbiA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHBlcm11dGF0aW9uW2ldID0gaTtcbiAgfVxuXG4gIHJldHVybiBwZXJtdXRhdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBlbXB0eSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZW1wdHknKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4IHRoYXQgaXMgc2l6ZS1jb21wYXRpYmxlIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgcHJvZHVjdCBvZiB0d28gTWF0cmljZXNcclxuICovXG5cblxuZnVuY3Rpb24gbXVsdGlwbHkoQSwgQikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykgfHwgIShCIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICBBcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBBY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICBCcm93ID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBCY29sID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKEFjb2wgIT09IEJyb3cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gZW1wdHkoQXJvdywgQmNvbCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBBcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEJjb2w7IGorKykge1xuICAgICAgcmVzdWx0W2ldW2pdID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBCcm93OyBrKyspIHtcbiAgICAgICAgcmVzdWx0W2ldW2pdICs9IG1hdHJpeEFbaV1ba10gKiBtYXRyaXhCW2tdW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhyZXN1bHQpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIElOVkFMSURfRVhQT05FTlQgPSBfcmVxdWlyZS5JTlZBTElEX0VYUE9ORU5UO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHBvd2VyIG9mIGFueSBzcXVhcmUgbWF0cml4LlxyXG4gKiBUaGUgYWxnb3JpdGhtIGlzIGltcGxlbWVudGVkIHJlY3Vyc2l2ZWx5LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgc3F1YXJlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnQgLSBBbnkgTm9uLW5lZ2F0aXZlIGludGVnZXJcclxuICogQHJldHVybnMge01hdHJpeH0gVGhlIHBvd2VyIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcG93KEEsIGV4cG9uZW50KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGV4cG9uZW50KSB8fCBleHBvbmVudCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9FWFBPTkVOVCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IEEuc2l6ZSgpWzBdO1xuXG4gIGlmIChleHBvbmVudCA9PT0gMCkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5KHNpemUpO1xuICB9XG5cbiAgaWYgKGV4cG9uZW50ID09PSAxKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoQSk7XG4gIH1cblxuICBpZiAoZXhwb25lbnQgJSAyID09PSAwKSB7XG4gICAgdmFyIF90ZW1wID0gdGhpcy5wb3coQSwgZXhwb25lbnQgLyAyKTtcblxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KF90ZW1wLCBfdGVtcCk7XG4gIH1cblxuICB2YXIgdGVtcCA9IHRoaXMucG93KEEsIChleHBvbmVudCAtIDEpIC8gMik7XG4gIHJldHVybiB0aGlzLm11bHRpcGx5KHRoaXMubXVsdGlwbHkodGVtcCwgdGVtcCksIEEpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHBvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEUsXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBoYXMgc2FtZSBzaXplIHdpdGggQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgZGlmZmVyZW5jZSBvZiB0d28gTWF0cmljZXNcclxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJ0cmFjdChBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICByb3cyID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBjb2wyID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyAhPT0gcm93MiB8fCBjb2wgIT09IGNvbDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeDEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXgyID0gQi5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4MVtpXVtqXSAtIG1hdHJpeDJbaV1bal07XG4gIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRmluZCB0aGUgdHJhbnNwb3NlIG9mIGEgbWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHsgTWF0cml4IH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMgeyBNYXRyaXggfSBSZXR1cm5zIHRyYW5zcG9zZSBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyYW5zcG9zZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoY29sLCByb3csIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtqXVtpXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNwb3NlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1BfTk9STSA9IF9yZXF1aXJlLklOVkFMSURfUF9OT1JNLFxuICAgIFNJTkdVTEFSX01BVFJJWCA9IF9yZXF1aXJlLlNJTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRpb25zIHRoZSBjb25kaXRpb24gbnVtYmVyIG9mIHNxdWFyZSBNYXRyaXhcclxuICogd2l0aCByZXNwZWN0IHRvIHRoZSBjaG9pY2Ugb2YgTWF0cml4IG5vcm0uIFxyXG4gKiBJZiB0aGUgTWF0cml4IGlzIHNpbmd1bGFyLCByZXR1cm5zIEluZmluaXR5Ljxicj48YnI+XHJcbiAqIFRoZSBjb25kaXRpb24gbnVtYmVyIGlzIG5vdCBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7KDF8MnxJbmZpbml0eXwnRicpfSBwIC0gVHlwZSBvZiBNYXRyaXggbm9ybVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY29uZGl0aW9uIG51bWJlciBvZiBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gY29uZCgpIHtcbiAgdmFyIHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDI7XG5cbiAgaWYgKHAgIT09IDEgJiYgcCAhPT0gMiAmJiBwICE9PSBJbmZpbml0eSAmJiBwICE9PSAnRicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9QX05PUk0pO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdmFyIGludmVyc2UgPSBNYXRyaXguaW52ZXJzZSh0aGlzKTtcbiAgICByZXR1cm4gaW52ZXJzZS5ub3JtKHApICogdGhpcy5ub3JtKHApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlID09PSBTSU5HVUxBUl9NQVRSSVgpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBzcXVhcmUgTWF0cml4LlxyXG4gKiBJZiB0aGUgTWF0cml4IHNpemUgaXMgbGFyZ2VyIHRoYW4gMywgaXQgY2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgdXNpbmdcclxuICogTFUgZGVjb21wb3NpdGlvbiwgb3RoZXJ3aXNlLCB1c2luZyBMZWlibml6IEZvcm11bGEuPGJyPjxicj5cclxuICogVGhlIGRldGVybWluYW50IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgZGV0ZXJtaW5hbnQgb2Ygc3F1YXJlIG1hdHJpcnhcclxuICovXG5cblxuZnVuY3Rpb24gZGV0KCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2RldCA9IDE7XG4gICAgcmV0dXJuIDE7IC8vIHRoZSBkZXRlcm1pbmFudCBvZiAweDAgbWF0cml4IG11c3QgYmUgMVxuICB9XG5cbiAgaWYgKHNpemUgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIGlmIChzaXplID09PSAyKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzFdIC0gbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzBdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMykge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVsyXSArIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVswXSArIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsxXSAtIG1hdHJpeFswXVsyXSAqIG1hdHJpeFsxXVsxXSAqIG1hdHJpeFsyXVswXSAtIG1hdHJpeFswXVsxXSAqIG1hdHJpeFsxXVswXSAqIG1hdHJpeFsyXVsyXSAtIG1hdHJpeFswXVswXSAqIG1hdHJpeFsxXVsyXSAqIG1hdHJpeFsyXVsxXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdmFyIF9NYXRyaXgkTFUgPSBNYXRyaXguTFUodGhpcywgdHJ1ZSksXG4gICAgICBfTWF0cml4JExVMiA9IF9zbGljZWRUb0FycmF5KF9NYXRyaXgkTFUsIDIpLFxuICAgICAgUCA9IF9NYXRyaXgkTFUyWzBdLFxuICAgICAgTFUgPSBfTWF0cml4JExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4OyAvLyBjb3VudCB3aGV0aGVyIHRoZSBudW1iZXIgb2YgcGVybXV0YXRpb25zIDxzd2FwPiBpcyBvZGQgb3IgZXZlblxuICAvLyBPKG5eMilcblxuICB2YXIgc3dhcCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBpZiAoUFtpXSA9PT0gaSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgd2hpbGUgKFBbaV0gIT09IGkpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBQW2ldO1xuICAgICAgUFtpXSA9IFBbdGFyZ2V0XTtcbiAgICAgIFBbdGFyZ2V0XSA9IHRhcmdldDtcbiAgICAgIHN3YXArKztcbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gMTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzaXplOyBfaTIrKykge1xuICAgIHJlc3VsdCAqPSBtYXRyaXhMVVtfaTJdW19pMl07XG4gIH1cblxuICBpZiAoc3dhcCAlIDIgPT09IDEpIHtcbiAgICB0aGlzLl9kZXQgPSByZXN1bHQgKiAtMTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdGhpcy5fZGV0ID0gcmVzdWx0O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGRldDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLy8gcmVmZXJlbmNlOiBodHRwczovL3Blb3BsZS5pbmYuZXRoei5jaC9hcmJlbnovZXdwL0xub3Rlcy9jaGFwdGVyNC5wZGZcbnZhciBDb21wbGV4ID0gcmVxdWlyZSgnQHJheXlhbWhrL2NvbXBsZXgnKTtcblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGVpZ2VudmFsdWVzIG9mIGFueSBzcXVhcmUgTWF0cml4IHVzaW5nIFFSIEFsZ29yaXRobS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGVpZ2VudmFsdWVzIGNhbiBiZSBlaXRoZXIgcmVhbCBudW1iZXIgb3IgY29tcGxleCBudW1iZXIuXHJcbiAqIE5vdGUgdGhhdCBhbGwgZWlnZW52YWx1ZXMgYXJlIGluc3RhbmNlIG9mIENvbXBsZXgsXHJcbiAqIGZvciBtb3JlIGRldGFpbHMgcGxlYXNlIHZpc2l0IFtDb21wbGV4LmpzXXtAbGluayBodHRwczovL3JheXlhbWhrLmdpdGh1Yi5pby9Db21wbGV4LmpzfS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGVpZ2VudmFsdWVzIGFyZSBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtDb21wbGV4W119IEFycmF5IG9mIGVpZ2VudmFsdWVzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVpZ2VudmFsdWVzKCkge1xuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2VpZ2VudmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZWlnZW52YWx1ZXM7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpWzBdO1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBkaWdpdCA9IHRoaXMuX2RpZ2l0O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIHZhciBjbG9uZSA9IE1hdHJpeC5jbG9uZSh0aGlzKS5fbWF0cml4O1xuXG4gIHZhciBpc0NvbnZlcmdlbnQgPSB0cnVlOyAvLyBmbGFnXG5cbiAgdmFyIHNraXAgPSBmYWxzZTsgLy8gVHJhbnNmb3JtIG1hdHJpeCB0byBIZXNzZW5iZXJnIG1hdHJpeFxuXG4gIEhvdXNlaG9sZGVyVHJhbnNmb3JtKGNsb25lLCBkaWdpdCk7XG5cbiAgZm9yICh2YXIgaSA9IHNpemUgLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGRpdmVyZ2VuY2VDb3VudCA9IDA7XG4gICAgdmFyIHByZXYgPSB2b2lkIDA7IC8vIHVzZWQgdG8gZGV0ZXJtaW5lIGNvbnZlcmdlbmNlXG4gICAgLy8gaWYgb2J0YWlucyBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXIgaW4gcHJldmlvdXMgaXRlcmF0aW9uLCBza2lwIGN1cnJlbnQgcm91bmRcblxuICAgIGlmIChza2lwKSB7XG4gICAgICBza2lwID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgc2hpZnQgPSBjbG9uZVtzaXplIC0gMV1bc2l6ZSAtIDFdOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyBub3QgcmVhbFxuICAgICAgICBwcmV2ID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLm1ldHJpYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbFxuICAgICAgICBwcmV2ID0gTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKTtcbiAgICAgIH0gLy8gYXBwbHkgc2luZ2xlIHNoaWZ0XG5cblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgY2xvbmVbal1bal0gLT0gc2hpZnQ7XG4gICAgICB9IC8vIEFwcGx5IFFSIEFsZ29yaXRobVxuXG5cbiAgICAgIEhlc3NlbmJlcmdRUihjbG9uZSwgZGlnaXQpO1xuXG4gICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgc2l6ZTsgX2orKykge1xuICAgICAgICBjbG9uZVtfal1bX2pdICs9IHNoaWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIHByZXYgPCBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pKSB7XG4gICAgICAgIGRpdmVyZ2VuY2VDb3VudCsrO1xuICAgICAgfSAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIHJlYWwgYW5kIHRoZSBlbnRyeSBpcyBhbG1vc3QgWkVSTyA9PiBicmVhaztcblxuXG4gICAgICBpZiAoaXNDb252ZXJnZW50ICYmIE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkgPCBFUFNJTE9OKSB7XG4gICAgICAgIHZhbHVlc1tpXSA9IG5ldyBDb21wbGV4KGNsb25lW2ldW2ldKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWVzIHBhaXIgaXMgY29tcGxleCwgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIGVpZ2FudmFsdWVzIGFuZCB0aGVcbiAgICAgIC8vIGVpZ2VudmFsdWVzIG9mIHN1Ym1hdHJpeCBpcyBhbG1vc3QgWkVSTyA9PiBicmVha1xuXG5cbiAgICAgIHZhciBfc2l6ZTJFaWdlbnZhbHVlcyA9IHNpemUyRWlnZW52YWx1ZXMoY2xvbmVbaSAtIDFdW2kgLSAxXSwgY2xvbmVbaSAtIDFdW2ldLCBjbG9uZVtpXVtpIC0gMV0sIGNsb25lW2ldW2ldKSxcbiAgICAgICAgICBtZXRyaWMgPSBfc2l6ZTJFaWdlbnZhbHVlcy5tZXRyaWMsXG4gICAgICAgICAgZWlnZW4xID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4xLFxuICAgICAgICAgIGVpZ2VuMiA9IF9zaXplMkVpZ2VudmFsdWVzLmVpZ2VuMjtcblxuICAgICAgaWYgKCFpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMocHJldiAtIG1ldHJpYykgPCBFUFNJTE9OKSB7XG4gICAgICAgIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIHJlLWluaXRpYWxpemVcblxuICAgICAgICBza2lwID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJlMSA9IGVpZ2VuMS5yZSxcbiAgICAgICAgICAgIGltMSA9IGVpZ2VuMS5pbTtcbiAgICAgICAgdmFyIHJlMiA9IGVpZ2VuMi5yZSxcbiAgICAgICAgICAgIGltMiA9IGVpZ2VuMi5pbTtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgocmUxLCBpbTEpO1xuICAgICAgICB2YWx1ZXNbaSAtIDFdID0gbmV3IENvbXBsZXgocmUyLCBpbTIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGVudHJ5IGRvZXNuJ3QgY29udmVyZ2UgPT4gY29tcGxleCBlaWdlbnZhbHVlcyBwYWlyXG5cblxuICAgICAgaWYgKGRpdmVyZ2VuY2VDb3VudCA+IDMpIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFza2lwKSB7XG4gICAgdmFsdWVzWzBdID0gbmV3IENvbXBsZXgoY2xvbmVbMF1bMF0pO1xuICB9XG5cbiAgdGhpcy5fZWlnZW52YWx1ZXMgPSB2YWx1ZXM7XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbjtcblxuZnVuY3Rpb24gSG91c2Vob2xkZXJUcmFuc2Zvcm0oQSwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemUgLSAyOyBqKyspIHtcbiAgICB2YXIgeE5vcm0gPSAwO1xuICAgIHZhciB1ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICBmb3IgKHZhciBpID0gaiArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHZhciBlbnRyeSA9IEFbaV1bal07XG4gICAgICB4Tm9ybSArPSBNYXRoLnBvdyhlbnRyeSwgMik7XG4gICAgICB1W2kgLSBqIC0gMV0gPSBlbnRyeTtcbiAgICB9XG5cbiAgICB4Tm9ybSA9IE1hdGguc3FydCh4Tm9ybSk7XG5cbiAgICBpZiAoTWF0aC5hYnMoeE5vcm0pIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHVbMF0gPj0gMCkge1xuICAgICAgdVswXSArPSB4Tm9ybTtcbiAgICB9IGVsc2Uge1xuICAgICAgdVswXSAtPSB4Tm9ybTtcbiAgICB9IC8vIE1ha2UgJ3UnIHVuaXQgdmVjdG9yXG5cblxuICAgIHZhciB1Tm9ybSA9IDA7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgdS5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHVOb3JtICs9IE1hdGgucG93KHVbX2ldLCAyKTtcbiAgICB9XG5cbiAgICB1Tm9ybSA9IE1hdGguc3FydCh1Tm9ybSk7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCB1Lmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHVbX2kyXSAvPSB1Tm9ybTtcbiAgICB9IC8vIHVwZGF0ZSB0aGUgbWF0cml4LCBtdWx0aXBseSBQIGZyb20gbGVmdFxuXG5cbiAgICBmb3IgKHZhciBuID0gajsgbiA8IHNpemU7IG4rKykge1xuICAgICAgLy8gY29sdW1uXG4gICAgICB2YXIgdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBtID0gaiArIDE7IG0gPCBzaXplOyBtKyspIHtcbiAgICAgICAgdlttIC0gaiAtIDFdID0gQVttXVtuXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9tID0gMDsgX20gPCB2Lmxlbmd0aDsgX20rKykge1xuICAgICAgICBzY2FsZXIgKz0gdltfbV0gKiB1W19tXTtcbiAgICAgIH1cblxuICAgICAgc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9tMiA9IGogKyAxOyBfbTIgPCBzaXplOyBfbTIrKykge1xuICAgICAgICAvLyByb3dcbiAgICAgICAgaWYgKG4gPT09IGogJiYgX20yICE9PSBqICsgMSkge1xuICAgICAgICAgIEFbX20yXVtuXSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gdltfbTIgLSBqIC0gMV0gLSBzY2FsZXIgKiB1W19tMiAtIGogLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSByaWdodFxuXG5cbiAgICBmb3IgKHZhciBfbTMgPSAwOyBfbTMgPCBzaXplOyBfbTMrKykge1xuICAgICAgLy8gcm93XG4gICAgICB2YXIgX3YgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgICAgZm9yICh2YXIgX24gPSBqICsgMTsgX24gPCBzaXplOyBfbisrKSB7XG4gICAgICAgIF92W19uIC0gaiAtIDFdID0gQVtfbTNdW19uXTtcbiAgICAgIH1cblxuICAgICAgdmFyIF9zY2FsZXIgPSAwO1xuXG4gICAgICBmb3IgKHZhciBfbjIgPSAwOyBfbjIgPCBfdi5sZW5ndGg7IF9uMisrKSB7XG4gICAgICAgIF9zY2FsZXIgKz0gX3ZbX24yXSAqIHVbX24yXTtcbiAgICAgIH1cblxuICAgICAgX3NjYWxlciAqPSAyO1xuXG4gICAgICBmb3IgKHZhciBfbjMgPSBqICsgMTsgX24zIDwgc2l6ZTsgX24zKyspIHtcbiAgICAgICAgLy8gY29sdW1uXG4gICAgICAgIEFbX20zXVtfbjNdID0gX3ZbX24zIC0gaiAtIDFdIC0gX3NjYWxlciAqIHVbX24zIC0gaiAtIDFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBIZXNzZW5iZXJnUVIoSCwgZGlnaXQpIHtcbiAgdmFyIHNpemUgPSBILmxlbmd0aDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpbmNvcyA9IG5ldyBBcnJheShzaXplIC0gMSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgdmFyIGEgPSBIW2ldW2ldO1xuICAgIHZhciBjID0gSFtpICsgMV1baV07XG4gICAgdmFyIG5vcm0gPSBNYXRoLnNxcnQoTWF0aC5wb3coYSwgMikgKyBNYXRoLnBvdyhjLCAyKSk7XG5cbiAgICBpZiAobm9ybSA8IEVQU0lMT04pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBjb3MgPSBhIC8gbm9ybTtcbiAgICB2YXIgc2luID0gYyAqIC0xIC8gbm9ybTtcbiAgICBzaW5jb3NbaV0gPSBbc2luLCBjb3NdO1xuICAgIHZhciByb3cxID0gbmV3IEFycmF5KHNpemUgLSBpKTtcbiAgICB2YXIgcm93MiA9IG5ldyBBcnJheShzaXplIC0gaSk7XG5cbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgcm93MVtqIC0gaV0gPSBIW2ldW2pdO1xuICAgICAgcm93MltqIC0gaV0gPSBIW2kgKyAxXVtqXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfajIgPSBpOyBfajIgPCBzaXplOyBfajIrKykge1xuICAgICAgSFtpXVtfajJdID0gY29zICogcm93MVtfajIgLSBpXSArIHNpbiAqIC0xICogcm93MltfajIgLSBpXTtcblxuICAgICAgaWYgKGkgPT09IF9qMikge1xuICAgICAgICBIW2kgKyAxXVtfajJdID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSBzaW4gKiByb3cxW19qMiAtIGldICsgY29zICogcm93MltfajIgLSBpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfajMgPSAwOyBfajMgPCBzaXplIC0gMTsgX2ozKyspIHtcbiAgICBpZiAoIXNpbmNvc1tfajNdKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgX3NpbmNvcyRfaiA9IF9zbGljZWRUb0FycmF5KHNpbmNvc1tfajNdLCAyKSxcbiAgICAgICAgX3NpbiA9IF9zaW5jb3MkX2pbMF0sXG4gICAgICAgIF9jb3MgPSBfc2luY29zJF9qWzFdO1xuXG4gICAgdmFyIGNvbDEgPSBuZXcgQXJyYXkoX2ozICsgMik7XG4gICAgdmFyIGNvbDIgPSBuZXcgQXJyYXkoX2ozICsgMik7XG5cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPD0gX2ozICsgMTsgX2kzKyspIHtcbiAgICAgIGNvbDFbX2kzXSA9IEhbX2kzXVtfajNdO1xuICAgICAgY29sMltfaTNdID0gSFtfaTNdW19qMyArIDFdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8PSBfajMgKyAxOyBfaTQrKykge1xuICAgICAgSFtfaTRdW19qM10gPSBjb2wxW19pNF0gKiBfY29zIC0gY29sMltfaTRdICogX3NpbjtcbiAgICAgIEhbX2k0XVtfajMgKyAxXSA9IGNvbDFbX2k0XSAqIF9zaW4gKyBjb2wyW19pNF0gKiBfY29zO1xuICAgIH1cbiAgfVxufSAvLyBmaW5kIHRoZSBlaWdlbnZhbHVlcyBvZiAyeDIgbWF0cml4XG5cblxuZnVuY3Rpb24gc2l6ZTJFaWdlbnZhbHVlcyhlMTEsIGUxMiwgZTIxLCBlMjIpIHtcbiAgdmFyIGIgPSAoZTExICsgZTIyKSAqIC0xO1xuICB2YXIgYyA9IGUxMSAqIGUyMiAtIGUyMSAqIGUxMjtcbiAgdmFyIGRlbHRhID0gTWF0aC5wb3coYiwgMikgLSA0ICogYztcbiAgdmFyIHJlMTtcbiAgdmFyIGltMTtcbiAgdmFyIHJlMjtcbiAgdmFyIGltMjtcblxuICBpZiAoZGVsdGEgPj0gMCkge1xuICAgIGltMSA9IDA7XG4gICAgaW0yID0gMDtcblxuICAgIGlmIChiID49IDApIHtcbiAgICAgIHJlMSA9IChiICogLTEgLSBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlMSA9IChiICogLTEgKyBNYXRoLnNxcnQoZGVsdGEpKSAvIDI7XG4gICAgfVxuXG4gICAgcmUyID0gYyAvIHJlMTtcbiAgfSBlbHNlIHtcbiAgICByZTEgPSAtYiAvIDI7XG4gICAgcmUyID0gcmUxO1xuICAgIGltMSA9IE1hdGguc3FydChkZWx0YSAqIC0xKSAvIDI7XG4gICAgaW0yID0gaW0xICogLTE7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1ldHJpYzogTWF0aC5zcXJ0KE1hdGgucG93KHJlMSwgMikgKyBNYXRoLnBvdyhpbTEsIDIpKSxcbiAgICBlaWdlbjE6IHtcbiAgICAgIHJlOiByZTEsXG4gICAgICBpbTogaW0xXG4gICAgfSxcbiAgICBlaWdlbjI6IHtcbiAgICAgIHJlOiByZTIsXG4gICAgICBpbTogaW0yXG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVpZ2VudmFsdWVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk07XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgTWF0cml4IG5vcm0gb2YgYW55IE1hdHJpeCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBub3JtLjxicj48YnI+XHJcbiAqIFxyXG4gKiAxLW5vcm06IE1heGltdW0gYWJzb2x1dGUgY29sdW1uIHN1bSBvZiB0aGUgTWF0cml4Ljxicj5cclxuICogMi1ub3JtOiBUaGUgbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZSBvZiBNYXRyaXguPGJyPlxyXG4gKiBJbmZpbml0eS1ub3JtOiBNYXhpbXVtIGFic29sdXRlIHJvdyBzdW0gb2YgdGhlIE1hdHJpeC48YnI+XHJcbiAqIEZyb2Jlbml1cy1ub3JtOiBFdWNsaWRlYW4gbm9ybSBpbnZsb3ZpbmcgYWxsIGVudHJpZXMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBub3JtcyBhcmUgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUaGUgY2hvaWNlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBub3JtIG9mIHRoZSBNYXRyaXguXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG5vcm0oKSB7XG4gIHZhciBwID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAyO1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICB2YXIgbWF0cml4ID0gdGhpcy5fbWF0cml4O1xuICB2YXIgcmVzdWx0ID0gMDtcblxuICBpZiAocCA9PT0gMSkge1xuICAgIC8vIG1heCBvZiBjb2x1bW4gc3VtXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgdmFyIGNvbHVtblN1bSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICAgICAgY29sdW1uU3VtICs9IE1hdGguYWJzKG1hdHJpeFtpXVtqXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW5TdW0gPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gY29sdW1uU3VtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gLy8gbGFyZ2VzdCBzaW5ndWxhciB2YWx1ZVxuXG5cbiAgaWYgKHAgPT09IDIpIHtcbiAgICB2YXIgdHJhbnNwb3NlID0gTWF0cml4LnRyYW5zcG9zZSh0aGlzKTtcbiAgICB2YXIgTSA9IE1hdHJpeC5tdWx0aXBseSh0cmFuc3Bvc2UsIHRoaXMpO1xuICAgIHZhciBlaWdlbnZhbHVlcyA9IE0uZWlnZW52YWx1ZXMoKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGVpZ2VudmFsdWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGVpZ2VudmFsdWVzW19pMl0uZ2V0TW9kdWx1cygpO1xuXG4gICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xuICB9XG5cbiAgaWYgKHAgPT09IEluZmluaXR5KSB7XG4gICAgLy8gbWF4IG9mIHJvdyBzdW1cbiAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3c7IF9pMysrKSB7XG4gICAgICB2YXIgcm93U3VtID0gMDtcblxuICAgICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgICByb3dTdW0gKz0gTWF0aC5hYnMobWF0cml4W19pM11bX2pdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvd1N1bSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSByb3dTdW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBGXG5cblxuICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3c7IF9pNCsrKSB7XG4gICAgZm9yICh2YXIgX2oyID0gMDsgX2oyIDwgY29sOyBfajIrKykge1xuICAgICAgcmVzdWx0ICs9IE1hdGgucG93KG1hdHJpeFtfaTRdW19qMl0sIDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBub3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbnVsbGl0eSBvZiBhbnkgTWF0cml4LCB3aGljaCBpcyB0aGUgZGltZW5zaW9uXHJcbiAqIG9mIHRoZSBudWxsc3BhY2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBudWxsaXR5IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bGxpdHkgb2YgdGhlIG1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIG51bGxpdHkoKSB7XG4gIGlmICh0aGlzLl9udWxsaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVsbGl0eTtcbiAgfVxuXG4gIHZhciBjb2wgPSB0aGlzLnNpemUoKVsxXTtcbiAgdmFyIHJhbmsgPSB0aGlzLnJhbmsoKTtcbiAgdGhpcy5fbnVsbGl0eSA9IGNvbCAtIHJhbms7XG4gIHJldHVybiB0aGlzLl9udWxsaXR5O1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG51bGxpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcmFuayBvZiBhbnkgTWF0cml4LFxyXG4gKiB3aGljaCBpcyB0aGUgZGltZW5zaW9uIG9mIHRoZSByb3cgc3BhY2UuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByYW5rIGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJhbmsgb2YgdGhlIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiByYW5rKCkge1xuICBpZiAodGhpcy5fcmFuayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhbms7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIHRoaXMuX2RpZ2l0KSAqIDIpO1xuICB2YXIgUiA9IE1hdHJpeC5RUih0aGlzKVsxXTtcbiAgdmFyIG1hdHJpeFIgPSBSLl9tYXRyaXg7XG5cbiAgdmFyIF9SJHNpemUgPSBSLnNpemUoKSxcbiAgICAgIF9SJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX1Ikc2l6ZSwgMiksXG4gICAgICByb3cgPSBfUiRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9SJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICB0aGlzLl9yYW5rID0gMTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciByayA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSBpOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhSW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHJrKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX3JhbmsgPSByaztcbiAgcmV0dXJuIHJrO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHJhbms7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzaXplIG9mIGFueSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIGluIHRoZSBmb3JtIG9mIFtyb3csIGNvbHVtbl0uPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSBzaXplIG9mIE1hdHJpeCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gVGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zIG9mIGEgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gc2l6ZSgpIHtcbiAgaWYgKHRoaXMuX3NpemUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgaWYgKEEubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fc2l6ZSA9IFswLCAwXTtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIHRoaXMuX3NpemUgPSBbQS5sZW5ndGgsIEFbMF0ubGVuZ3RoXTtcbiAgcmV0dXJuIHRoaXMuX3NpemU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc2l6ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgdHJhY2Ugb2YgYW55IHNxdWFyZSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIHRoZSBzdW0gb2YgYWxsIGVudHJpZXMgb24gdGhlIG1haW4gZGlhZ29uYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSB0cmFjZSBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSB0cmFjZSBvZiB0aGUgc3F1YXJlIE1hdHJpeC5cclxuICovXG5cblxuZnVuY3Rpb24gdHJhY2UoKSB7XG4gIHZhciBpc1NxdWFyZSA9IHRoaXMuX2lzU3F1YXJlICE9PSB1bmRlZmluZWQgPyB0aGlzLl9pc1NxdWFyZSA6IHRoaXMuaXNTcXVhcmUoKTtcblxuICBpZiAoIWlzU3F1YXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fdHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl90cmFjZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICB2YXIgdHIgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgdHIgKz0gQVtpXVtpXTtcbiAgfVxuXG4gIHRoaXMuX3RyYWNlID0gdHI7XG4gIHJldHVybiB0cjtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFjZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGRpYWdvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogRGlhZ29uYWwgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIHRoZSBlbnRyaWVzIG91dHNpZGUgdGhlIG1haW4gZGlhZ29uYWxcclxuICogYXJlIGFsbCB6ZXJvLiBOb3RlIHRoYXQgdGhlIHRlcm0gZGlhZ29uYWwgcmVmZXJzIHRvIHJlY3Rhbmd1bGFyIGRpYWdvbmFsLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgcnVlIGlmIHRoZSBNYXRyaXggaXMgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaXNEaWFnb25hbCgpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNEaWFnb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlhZ29uYWw7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5pc0RpYWdvbmFsID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0RpYWdvbmFsID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNEaWFnb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogTG93ZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzXHJcbiAqIGFib3ZlIHRoZSBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWRcclxuICogdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgTWF0cml4IGlzIGxvd2VyIHRyaWFuZ3VsYXJcclxuICovXG5mdW5jdGlvbiBpc0xvd2VyVHJpYW5ndWxhcigpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhcjtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgLy8gW11cbiAgICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzTG93ZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBvcnRob2dvbmFsIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogT3J0aG9nb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHJvd3MgYW5kIGNvbHVtbnMgYXJlXHJcbiAqIG9ydGhvbm9ybWFsIHZlY3RvcnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIG9ydGhvZ29uYWxcclxuICovXG5mdW5jdGlvbiBpc09ydGhvZ29uYWwoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzT3J0aG9nb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3J0aG9nb25hbDtcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhpcy5faXNPcnRob2dvbmFsID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaTsgaiA8IHNpemU7IGorKykge1xuICAgICAgdmFyIGVudHJ5ID0gMDtcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzaXplOyBrKyspIHtcbiAgICAgICAgZW50cnkgKz0gQVtpXVtrXSAqIEFbal1ba107XG4gICAgICB9XG5cbiAgICAgIGlmIChpID09PSBqICYmIE1hdGguYWJzKGVudHJ5IC0gMSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaSAhPT0gaiAmJiBNYXRoLmFicyhlbnRyeSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzT3J0aG9nb25hbCA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzT3J0aG9nb25hbDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgc2tldyBzeW1tZXRyaWMgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTa2V3IHN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHdob3NlIHRyYW5zcG9zZSBlcXVhbHMgaXRzIG5lZ2F0aXZlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBza2V3IHN5bW1ldHJpY1xyXG4gKi9cbmZ1bmN0aW9uIGlzU2tld1N5bW1ldHJpYygpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNTa2V3U3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTa2V3U3ltbWV0cmljO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSArIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1NrZXdTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgc3F1YXJlIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU3F1YXJlIE1hdHJpeCBpcyBhIE1hdHJpeCB3aXRoIHNhbWUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgc3F1YXJlXHJcbiAqL1xuZnVuY3Rpb24gaXNTcXVhcmUoKSB7XG4gIGlmICh0aGlzLl9pc1NxdWFyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU3F1YXJlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgaWYgKEEubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gMHgwIG1hdHJpeFxuICAgIHRoaXMuX2lzU3F1YXJlID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuX2lzU3F1YXJlID0gQS5sZW5ndGggPT09IEFbMF0ubGVuZ3RoO1xuICByZXR1cm4gdGhpcy5faXNTcXVhcmU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTcXVhcmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIHN5bW1ldHJpYyBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFN5bW1ldHJpYyBNYXRyaXggaXMgYSBzcXVhcmUgTWF0cml4IHRoYXQgaXMgZXF1YWwgdG8gaXRzIHRyYW5zcG9zZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgc3ltbWV0cmljXHJcbiAqL1xuZnVuY3Rpb24gaXNTeW1tZXRyaWMoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzU3ltbWV0cmljICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTeW1tZXRyaWM7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPD0gaTsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSAtIEFbal1baV0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzU3ltbWV0cmljID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNTeW1tZXRyaWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIE1hdHJpeCBpcyB1cHBlciB0cmlhbmd1bGFyIE1hdHJpeCBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4IGlzIGEgTWF0cml4IGluIHdoaWNoIGFsbCB0aGUgZW50cmllcyBiZWxvdyB0aGVcclxuICogbWFpbiBkaWFnb25hbCBhcmUgemVyby4gTm90ZSB0aGF0IGl0IGNhbiBiZSBhcHBsaWVkIHRvIGFueSBub24tc3F1YXJlIE1hdHJpeC48YnI+PGJyPlxyXG4gKiAgXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgdXBwZXIgdHJpYW5ndWxhclxyXG4gKi9cbmZ1bmN0aW9uIGlzVXBwZXJUcmlhbmd1bGFyKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICAvLyBbXVxuICAgIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBpZiAoaSA8PSBqKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1VwcGVyVHJpYW5ndWxhcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIGNvcHkgb2YgTWF0cml4LiBOb3RlIHRoYXQgaXQgcmVzZXRzIHRoZSBjYWNoZWQgZGF0YS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBDb3B5IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY2xvbmUoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXhbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX0NPTFVNTiA9IF9yZXF1aXJlLk9WRVJGTE9XX0NPTFVNTixcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGNvbHVtbiBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gQ29sdW1uIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gY29sdW1uKEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHIsIDEsIGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtpbmRleF07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGNvbHVtbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvaXNOdW1iZXInKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX0FSUkFZID0gX3JlcXVpcmUuSU5WQUxJRF9BUlJBWSxcbiAgICBFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTID0gX3JlcXVpcmUuRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogR2VuZXJhdGVzIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgbnVtYmVycyxcclxuICogZ2VuZXJhdGVzIGJsb2NrIGRpYWdvbmFsIE1hdHJpeCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXkgb2YgTWF0cmljZXMuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyhudW1iZXJbXXxNYXRyaXhbXSl9IHZhbHVlcyAtIEFycmF5IG9mIG51bWJlcnMgb3IgTWF0cmljZXNcclxuICogQHJldHVybnMge01hdHJpeH0gQmxvY2sgZGlhZ29uYWwgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGRpYWcodmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQVJSQVkpO1xuICB9XG5cbiAgdmFyIGFyZ3NOdW0gPSB2YWx1ZXMubGVuZ3RoO1xuICB2YXIgdmFyaWFudDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3NOdW07IGkrKykge1xuICAgIHZhciBlbnRyeSA9IHZhbHVlc1tpXTtcblxuICAgIGlmICghaXNOdW1iZXIoZW50cnkpICYmICEoZW50cnkgaW5zdGFuY2VvZiBNYXRyaXgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVtYmVyKGVudHJ5KSkge1xuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnbnVtYmVyJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZW50cnkuaXNTcXVhcmUoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF2YXJpYW50KSB7XG4gICAgICAgIHZhcmlhbnQgPSAnc3F1YXJlJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJpYW50ICE9PSAnc3F1YXJlJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVhQRUNURURfQVJSQVlfT0ZfTlVNQkVSU19PUl9NQVRSSUNFUyk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIEhFUkU6IHZhcmlhbnQgc2hvdWxkIGJlIGVpdGhlciAnbnVtYmVyJyBvciAnc3F1YXJlJ1xuXG5cbiAgaWYgKHZhcmlhbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdHJpeC5nZW5lcmF0ZShhcmdzTnVtLCBhcmdzTnVtLCBmdW5jdGlvbiAoaSwgaikge1xuICAgICAgaWYgKGkgPT09IGopIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0gLy8gR3VhcmFudGVlZCB0aGF0IFt2YWx1ZXNdIGlzIGEgbGlzdCBvZiBzcXVhcmUgbWF0cmljZXNcblxuXG4gIHZhciBzaXplID0gMDtcbiAgdmFyIHRlbXAgPSBuZXcgQXJyYXkoYXJnc051bSk7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3NOdW07IF9pKyspIHtcbiAgICB2YXIgX2xlbiA9IHZhbHVlc1tfaV0uc2l6ZSgpWzBdO1xuXG4gICAgc2l6ZSArPSBfbGVuO1xuICAgIHRlbXBbX2ldID0gX2xlbjtcbiAgfVxuXG4gIHZhciBpZHggPSAwO1xuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgbGVuID0gdGVtcFtpZHhdO1xuICByZXR1cm4gTWF0cml4LmdlbmVyYXRlKHNpemUsIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgLSBzdGFydCA9PT0gbGVuICYmIGogLSBzdGFydCA9PT0gbGVuKSB7XG4gICAgICBzdGFydCArPSBsZW47XG4gICAgICBpZHgrKztcbiAgICB9XG5cbiAgICB2YXIgaXRoID0gaSAtIHN0YXJ0OyAvLyBpdGggPCAwIGlmIGJlbG93IG1haW4gZGlhZ29uYWxcblxuICAgIHZhciBqdGggPSBqIC0gc3RhcnQ7IC8vIGp0aCA8IDAgaWYgYWJvdmUgbWFpbiBkaWFnb25hbFxuICAgIC8vIHNraXAgMHgwIG1hdHJpY2VzXG5cbiAgICBsZW4gPSB0ZW1wW2lkeF07XG5cbiAgICB3aGlsZSAobGVuID09PSAwKSB7XG4gICAgICBpZHgrKztcbiAgICAgIGxlbiA9IHRlbXBbaWR4XTtcbiAgICB9XG5cbiAgICBpZiAoaXRoIDwgbGVuICYmIGl0aCA+PSAwICYmIGp0aCA8IGxlbiAmJiBqdGggPj0gMCkge1xuICAgICAgcmV0dXJuIHZhbHVlc1tpZHhdLl9tYXRyaXhbaXRoXVtqdGhdO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBkaWFnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBUaGlzIGNhbGxiYWNrIGFwcGxpZXMgb24gZWFjaCBlbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAY2FsbGJhY2sgZW50cnlDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gZW50cnkgLSBFbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOZXcgZW50cnkgdmFsdWVcclxuICovXG5cbi8qKlxyXG4gKiBBcHBseXMgYSBmdW5jdGlvbiBvdmVyIGVhY2ggZW50cnkgb2YgYSBNYXRyaXggYW5kIHJldHVybnNcclxuICogYSBuZXcgY29weSBvZiB0aGUgbmV3IE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge2VudHJ5Q2FsbGJhY2t9IGNiIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggYXBwbGllcyBvbiBlYWNoIGVudHJ5IG9mIEFcclxuICogQHJldHVybnMge01hdHJpeH0gQSBjb3B5IG9mIG5ldyBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZWxlbWVudHdpc2UoQSwgY2IpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gY2IobWF0cml4W2ldW2pdKTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZWxlbWVudHdpc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfSU5ERVggPSBfcmVxdWlyZS5PVkVSRkxPV19JTkRFWDtcbi8qKlxyXG4gKiBHZXRzIHRoZSBlbnRyeSBvZiBhIE1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIEFueSB2YWxpZCBjb2x1bW4gaW5kZXhcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgdGhlIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbnRyeShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA+PSByIHx8IGNvbCA+PSBjKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0lOREVYKTtcbiAgfVxuXG4gIHJldHVybiBBW3Jvd11bY29sXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbnRyeTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRmxhdHRlbiB0aGUgbWF0cml4IHRvIGFuIGFycmF5XHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gQSBmbGF0dGVuIGFycmF5XHJcbiAqL1xuZnVuY3Rpb24gZmxhdHRlbigpIHtcbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIHZhciBsZW5ndGggPSByb3cgKiBjb2w7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgYXJyW2kgKiBjb2wgKyBqXSA9IHRoaXMuX21hdHJpeFtpXVtqXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIG1hdHJpeCBmcm9tIGFuIGFycmF5IHdpdGggY29tcGF0aWJsZSBkaW1lbnNpb25zIFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gU291cmNlIGFycmF5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBSb3cgb2YgdGhlIG1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gQ29sdW1uIG9mIHRoZSBtYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGZyb21BcnJheShhcnIsIHJvdywgY29sKSB7XG4gIGlmIChyb3cgKiBjb2wgIT09IGFyci5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIGFycltpICogY29sICsgal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGZyb21BcnJheTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgZ2VuZXJhdGVzIGVhY2ggZW50cnkgb2YgYSBNYXRyaXhcclxuICogQGNhbGxiYWNrIGdlbmVyYXRlQ2FsbGJhY2tcclxuICogQHBhcmFtIHtudW1iZXJ9IGkgLSBUaGUgaS10aCByb3cgb2YgTWF0cml4IFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiAtIFRoZSBqLXRoIGNvbHVtbiBvZiBNYXRyaXggXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEVudHJ5IG9mIE1hdHJpeFxyXG4gKi9cblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIE1hdHJpeCB3aGljaCBlbnRyaWVzIGFyZSB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtnZW5lcmF0ZUNhbGxiYWNrfSBjYiAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIHRha2VzIHJvdyBhbmQgY29sdW1uIGFzIGFyZ3VtZW50c1xyXG4gKiBhbmQgZ2VuZXJhdGVzIHRoZSBjb3JyZXNwb25kaW5nIGVudHJ5XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IC0gR2VuZXJhdGVkIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZShyb3csIGNvbCwgY2IpIHtcbiAgdmFyIG1hdHJpeCA9IGVtcHR5KHJvdywgY29sKTtcblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgdGhpcyhbXSk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgbWF0cml4W2ldW2pdID0gY2IoaSwgaik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKG1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJpZXMgb24gdGhlIG1haW4gZGlhZ29uYWwuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHJldHVybnMge251bWJlcltdfSBBcnJheSBvZiBlbnRyaWVzIG9mIEEgb24gdGhlIG1haW4gZGlhZ29uYWxcclxuICovXG5cblxuZnVuY3Rpb24gZ2V0RGlhZyhBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHNpemUgPSBNYXRoLm1pbihyb3csIGNvbCk7XG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBkaWFncyA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGRpYWdzW2ldID0gbWF0cml4W2ldW2ldO1xuICB9XG5cbiAgcmV0dXJuIGRpYWdzO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldERpYWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIE51bWJlciBvZiByb3dzIG9mIGEgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiBhIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIC0gTG93ZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IC0gVXBwZXIgYm91bmQgb2YgZWFjaCBlbnRyeVxyXG4gKiBAcGFyYW0ge251bWJlcn0gdG9GaXhlZCAtIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBHZW5lcmF0ZWQgcmFuZG9tIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbU1hdHJpeChyb3csIGNvbCkge1xuICB2YXIgbWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAwO1xuICB2YXIgbWF4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAxO1xuICB2YXIgdG9GaXhlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogMDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlRmxvYXQoKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbikudG9GaXhlZCh0b0ZpeGVkKSk7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhbmRvbU1hdHJpeDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBpZGVudGl0eSBNYXRyaXggd2l0aCBnaXZlbiBzaXplLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgLSBUaGUgc2l6ZSBvZiBNYXRyaXhcclxuICogQHJldHVybnMge01hdHJpeH0gSWRlbnRpdHkgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkoc2l6ZSkge1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShzaXplLCBzaXplLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIGlmIChpID09PSBqKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0d28gTWF0cmljZXMgYXJlIGNvbnNpZGVyZWQgYXMgZXF1YWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSB0ZXN0IGNyaXRlcmlvbiBpcyBNYXRoLmFicyh4IC0geSkgPCAxIC8gKDEwICoqIGRpZ2l0ICogMikuXHJcbiAqIEZvciBkZWZhdWx0IHZhbHVlIDUsIGl0IHNob3VsZCBiZSA1ZS01LlxyXG4gKiBUaGF0IG1lYW5zIGlmIHRoZSBkaWZmZXJlbmNlIG9mIHR3byBudW1iZXJzIGlzIGxlc3MgdGhhbiA1ZS01LFxyXG4gKiB0aGV5IGFyZSBjb25zaWRlcmVkIGFzIHNhbWUgdmFsdWUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IEIgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaWdpdCAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0d28gTWF0cmljZXMgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZVxyXG4gKi9cblxuXG5mdW5jdGlvbiBpc0VxdWFsKEEsIEIpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiA1O1xuXG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIEFyb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIEFjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIEJyb3cgPSBfQiRzaXplMlswXSxcbiAgICAgIEJjb2wgPSBfQiRzaXplMlsxXTtcblxuICBpZiAoQXJvdyAhPT0gQnJvdyB8fCBBY29sICE9PSBCY29sKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEVQSVNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBtYXRyaXhBID0gQS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IEIuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IEFyb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgQWNvbDsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4QVtpXVtqXSAtIG1hdHJpeEJbaV1bal0pID49IEVQSVNJTE9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIEdldHMgdGhlIHJvdyBvZiBhIE1hdHJpeCB3aXRoIHZhbGlkIGluZGV4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEFueSB2YWxpZCByb3cgaW5kZXhcclxuICogQHJldHVybnMge01hdHJpeH0gUm93IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gcm93KEEsIGluZGV4KSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaW5kZXgpIHx8IGluZGV4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjID0gX0Ekc2l6ZTJbMV07XG5cbiAgaWYgKGluZGV4ID49IHIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKDEsIGMsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpbmRleF1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHJvdzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIgPSBfcmVxdWlyZS5FWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIsXG4gICAgSU5WQUxJRF9ST1cgPSBfcmVxdWlyZS5JTlZBTElEX1JPVyxcbiAgICBJTlZBTElEX0NPTFVNTiA9IF9yZXF1aXJlLklOVkFMSURfQ09MVU1OLFxuICAgIE9WRVJGTE9XX1JPVyA9IF9yZXF1aXJlLk9WRVJGTE9XX1JPVyxcbiAgICBJTlZBTElEX1JPV1NfRVhQUkVTU0lPTiA9IF9yZXF1aXJlLklOVkFMSURfUk9XU19FWFBSRVNTSU9OLFxuICAgIElOVkFMSURfQ09MVU1OU19FWFBSRVNTSU9OID0gX3JlcXVpcmUuSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04sXG4gICAgT1ZFUkZMT1dfQ09MVU1OID0gX3JlcXVpcmUuT1ZFUkZMT1dfQ09MVU1OO1xuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHN1Ym1hdHJpeCBvZiBhIG1hdHJpeC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHJvd3MgLSBSb3dzIGV4cHJlc3Npb25cclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBjb2xzIC0gQ29sdW1ucyBleHByZXNzaW9uXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFN1Ym1hdHJpeCBvZiBBXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHN1Ym1hdHJpeChBLCByb3dzLCBjb2xzKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgYXJnMVR5cGUgPSBfdHlwZW9mKHJvd3MpO1xuXG4gIHZhciBhcmcyVHlwZSA9IF90eXBlb2YoY29scyk7XG5cbiAgaWYgKGFyZzFUeXBlICE9PSAnc3RyaW5nJyAmJiBhcmcxVHlwZSAhPT0gJ251bWJlcicgfHwgYXJnMlR5cGUgIT09ICdzdHJpbmcnICYmIGFyZzJUeXBlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzIpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciByb3dTdGFydDtcbiAgdmFyIHJvd0VuZDtcbiAgdmFyIGNvbFN0YXJ0O1xuICB2YXIgY29sRW5kO1xuXG4gIGlmIChhcmcxVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93cykgfHwgcm93cyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPVyk7XG4gICAgfVxuXG4gICAgaWYgKHJvd3MgPj0gcm93KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICB9XG5cbiAgICByb3dTdGFydCA9IHJvd3M7XG4gICAgcm93RW5kID0gcm93cztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgYXJnID0gcm93cy5zcGxpdCgnOicpO1xuXG4gICAgaWYgKGFyZy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV1NfRVhQUkVTU0lPTik7XG4gICAgfVxuXG4gICAgdmFyIF9hcmcgPSBfc2xpY2VkVG9BcnJheShhcmcsIDIpLFxuICAgICAgICByMSA9IF9hcmdbMF0sXG4gICAgICAgIHIyID0gX2FyZ1sxXTtcblxuICAgIGlmIChyMSA9PT0gJycpIHtcbiAgICAgIHJvd1N0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHIgPSBOdW1iZXIocjEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocikgfHwgciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPj0gcm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgICAgfVxuXG4gICAgICByb3dTdGFydCA9IHI7XG4gICAgfVxuXG4gICAgaWYgKHIyID09PSAnJykge1xuICAgICAgcm93RW5kID0gcm93IC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9yID0gTnVtYmVyKHIyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9yKSB8fCBfciA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9yID49IHJvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfUk9XKTtcbiAgICAgIH1cblxuICAgICAgcm93RW5kID0gX3I7XG4gICAgfVxuXG4gICAgaWYgKHJvd1N0YXJ0ID4gcm93RW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmcyVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29scykgfHwgY29scyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTik7XG4gICAgfVxuXG4gICAgaWYgKGNvbHMgPj0gY29sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICB9XG5cbiAgICBjb2xTdGFydCA9IGNvbHM7XG4gICAgY29sRW5kID0gY29scztcbiAgfSBlbHNlIHtcbiAgICAvLyBzdHJpbmdcbiAgICB2YXIgX2FyZzIgPSBjb2xzLnNwbGl0KCc6Jyk7XG5cbiAgICBpZiAoX2FyZzIubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cblxuICAgIHZhciBfYXJnMyA9IF9zbGljZWRUb0FycmF5KF9hcmcyLCAyKSxcbiAgICAgICAgYzEgPSBfYXJnM1swXSxcbiAgICAgICAgYzIgPSBfYXJnM1sxXTtcblxuICAgIGlmIChjMSA9PT0gJycpIHtcbiAgICAgIGNvbFN0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGMgPSBOdW1iZXIoYzEpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoYykgfHwgYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGMgPj0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBjb2xTdGFydCA9IGM7XG4gICAgfVxuXG4gICAgaWYgKGMyID09PSAnJykge1xuICAgICAgY29sRW5kID0gY29sIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9jID0gTnVtYmVyKGMyKTtcblxuICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKF9jKSB8fCBfYyA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jID49IGNvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfQ09MVU1OKTtcbiAgICAgIH1cblxuICAgICAgY29sRW5kID0gX2M7XG4gICAgfVxuXG4gICAgaWYgKGNvbFN0YXJ0ID4gY29sRW5kKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHZhciBzdWJSb3cgPSByb3dFbmQgLSByb3dTdGFydCArIDE7XG4gIHZhciBzdWJDb2wgPSBjb2xFbmQgLSBjb2xTdGFydCArIDE7XG4gIHZhciBzdWJNYXRyaXggPSBuZXcgQXJyYXkoc3ViUm93KTtcblxuICBmb3IgKHZhciBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcbiAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KHN1YkNvbCk7XG5cbiAgICBmb3IgKHZhciBqID0gY29sU3RhcnQ7IGogPD0gY29sRW5kOyBqKyspIHtcbiAgICAgIG5ld1Jvd1tqIC0gY29sU3RhcnRdID0gbWF0cml4W2ldW2pdO1xuICAgIH1cblxuICAgIHN1Yk1hdHJpeFtpIC0gcm93U3RhcnRdID0gbmV3Um93O1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKHN1Yk1hdHJpeCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gc3VibWF0cml4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBHZXRzIHRoZSBzdHJpbmdpZmllZCBNYXRyaXhcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5naWZpZWQgTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIHZhciBzdHIgPSAnJztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgc3RyICs9IG1hdHJpeFtpXVtqXS50b1N0cmluZygpO1xuXG4gICAgICBpZiAoaiAhPT0gY29sIC0gMSkge1xuICAgICAgICBzdHIgKz0gJyAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpICE9PSByb3cgLSAxKSB7XG4gICAgICBzdHIgKz0gJ1xcbic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHplcm8gTWF0cml4XHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgdGhlIE1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gTnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBaZXJvIE1hdHJpeFxyXG4gKi9cbmZ1bmN0aW9uIHplcm8ocm93LCBjb2wpIHtcbiAgaWYgKGNvbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCByb3csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gemVybzsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTWF0cml4ID0gcmVxdWlyZSgnLi91dGlsL2lzTWF0cml4Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgTWF0cml4XHJcbiAqIEBuYW1lc3BhY2UgTWF0cml4XHJcbiAqIEBjbGFzc1xyXG4gKiBAcGFyYW0ge251bWJlcltdW119IEEgLSBUd28gZGltZW5zaW9uYWwgYXJyYXkgd2hlcmVcclxuICogQVtpXVtqXSByZXByZXNlbnRzIHRoZSBpLXRoIHJvdyBhbmQgai10aCBjb2x1bW4gb2YgYSBtYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gTWF0cml4KEEpIHtcbiAgaWYgKCFpc01hdHJpeChBKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB0aGlzLl9tYXRyaXggPSBBO1xuICB0aGlzLl9kaWdpdCA9IDg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWF0cml4OyAvLyBzdHJ1Y3R1cmVcblxuTWF0cml4LnByb3RvdHlwZS5pc0RpYWdvbmFsID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc0RpYWdvbmFsJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU2tld1N5bW1ldHJpYyA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNTa2V3U3ltbWV0cmljJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU3F1YXJlID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1NxdWFyZScpO1xuTWF0cml4LnByb3RvdHlwZS5pc1N5bW1ldHJpYyA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNTeW1tZXRyaWMnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNMb3dlclRyaWFuZ3VsYXIgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzTG93ZXJUcmlhbmd1bGFyJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzVXBwZXJUcmlhbmd1bGFyID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1VwcGVyVHJpYW5ndWxhcicpO1xuTWF0cml4LnByb3RvdHlwZS5pc09ydGhvZ29uYWwgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzT3J0aG9nb25hbCcpOyAvLyBwcm9wZXJ0eVxuXG5NYXRyaXgucHJvdG90eXBlLmNvbmQgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9jb25kJyk7XG5NYXRyaXgucHJvdG90eXBlLmRldCA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2RldCcpO1xuTWF0cml4LnByb3RvdHlwZS5laWdlbnZhbHVlcyA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2VpZ2VudmFsdWVzJyk7XG5NYXRyaXgucHJvdG90eXBlLm51bGxpdHkgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9udWxsaXR5Jyk7XG5NYXRyaXgucHJvdG90eXBlLm5vcm0gPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9ub3JtJyk7XG5NYXRyaXgucHJvdG90eXBlLnJhbmsgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9yYW5rJyk7XG5NYXRyaXgucHJvdG90eXBlLnNpemUgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy9zaXplJyk7XG5NYXRyaXgucHJvdG90eXBlLnRyYWNlID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvdHJhY2UnKTsgLy8gb3BlcmF0aW9uc1xuXG5NYXRyaXguYWRkID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvYWRkJyk7XG5NYXRyaXguaW52ZXJzZSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL2ludmVyc2UnKTtcbk1hdHJpeC5tdWx0aXBseSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL211bHRpcGx5Jyk7XG5NYXRyaXgucG93ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvcG93Jyk7XG5NYXRyaXguc3VidHJhY3QgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9zdWJ0cmFjdCcpO1xuTWF0cml4LnRyYW5zcG9zZSA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3RyYW5zcG9zZScpOyAvLyBMaW5lYXItZXF1YXRpb25zXG5cbk1hdHJpeC5iYWNrd2FyZCA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL2JhY2t3YXJkJyk7XG5NYXRyaXguZm9yd2FyZCA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL2ZvcndhcmQnKTtcbk1hdHJpeC5zb2x2ZSA9IHJlcXVpcmUoJy4vY29yZS9saW5lYXItZXF1YXRpb25zL3NvbHZlJyk7IC8vIGRlY29tcG9zaXRpb25zXG5cbk1hdHJpeC5MVSA9IHJlcXVpcmUoJy4vY29yZS9kZWNvbXBvc2l0aW9ucy9MVScpO1xuTWF0cml4LlFSID0gcmVxdWlyZSgnLi9jb3JlL2RlY29tcG9zaXRpb25zL1FSJyk7IC8vIHV0aWxzXG5cbk1hdHJpeC5jbG9uZSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9jbG9uZScpO1xuTWF0cml4LmNvbHVtbiA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9jb2x1bW4nKTtcbk1hdHJpeC5kaWFnID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2RpYWcnKTtcbk1hdHJpeC5lbGVtZW50d2lzZSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9lbGVtZW50d2lzZScpO1xuTWF0cml4LmdlbmVyYXRlID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dlbmVyYXRlJyk7XG5NYXRyaXguZ2V0RGlhZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9nZXREaWFnJyk7XG5NYXRyaXguZ2V0UmFuZG9tTWF0cml4ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dldFJhbmRvbU1hdHJpeCcpO1xuTWF0cml4LmlkZW50aXR5ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2lkZW50aXR5Jyk7XG5NYXRyaXguaXNFcXVhbCA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9pc0VxdWFsJyk7XG5NYXRyaXgucm93ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3JvdycpO1xuTWF0cml4LnN1Ym1hdHJpeCA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9zdWJtYXRyaXgnKTtcbk1hdHJpeC56ZXJvID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3plcm8nKTtcbk1hdHJpeC5mcm9tQXJyYXkgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZnJvbUFycmF5Jyk7XG5NYXRyaXgucHJvdG90eXBlLmZsYXR0ZW4gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZmxhdHRlbicpO1xuTWF0cml4LnByb3RvdHlwZS5lbnRyeSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9lbnRyeScpO1xuTWF0cml4LnByb3RvdHlwZS50b1N0cmluZyA9IHJlcXVpcmUoJy4vY29yZS91dGlscy90b1N0cmluZycpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbXB0eShyb3csIGNvbCkge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocm93KSB8fCByb3cgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGNvbCkgfHwgY29sIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV19DT0wpO1xuICB9XG5cbiAgaWYgKHJvdyA9PT0gMCB8fCBjb2wgPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgbWF0cml4ID0gbmV3IEFycmF5KHJvdyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIG1hdHJpeFtpXSA9IG5ldyBBcnJheShjb2wpO1xuICB9XG5cbiAgcmV0dXJuIG1hdHJpeDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc051bWJlciA9IHJlcXVpcmUoJy4vaXNOdW1iZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc01hdHJpeChtYXRyaXgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG1hdHJpeCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaGVpZ2h0ID0gbWF0cml4Lmxlbmd0aDtcblxuICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7IC8vIFtdIHJlcHJlc2VudHMgZW1wdHkgbWF0cml4ICgwIHggMCBtYXRyaXgpXG4gIH1cblxuICB2YXIgZmlyc3RSb3cgPSBtYXRyaXhbMF07XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpcnN0Um93KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB3aWR0aCA9IGZpcnN0Um93Lmxlbmd0aDtcblxuICBpZiAod2lkdGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7IC8vIFsgW10gXSBpcyBub3QgYWxsb3dlZFxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgIHZhciByb3cgPSBtYXRyaXhbaV07XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocm93KSB8fCByb3cubGVuZ3RoICE9PSB3aWR0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgaWYgKCFpc051bWJlcihyb3dbal0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNOdW1iZXIoX2ludCkge1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKF9pbnQpO1xufTsiLCJ2YXIgU3lsdmVzdGVyID0ge31cblxuU3lsdmVzdGVyLk1hdHJpeCA9IGZ1bmN0aW9uICgpIHt9XG5cblN5bHZlc3Rlci5NYXRyaXguY3JlYXRlID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIHZhciBNID0gbmV3IFN5bHZlc3Rlci5NYXRyaXgoKVxuICByZXR1cm4gTS5zZXRFbGVtZW50cyhlbGVtZW50cylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5JID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGVscyA9IFtdLFxuICAgIGkgPSBuLFxuICAgIGpcbiAgd2hpbGUgKGktLSkge1xuICAgIGogPSBuXG4gICAgZWxzW2ldID0gW11cbiAgICB3aGlsZSAoai0tKSB7XG4gICAgICBlbHNbaV1bal0gPSBpID09PSBqID8gMSA6IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVscylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5wcm90b3R5cGUgPSB7XG4gIGR1cDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZSh0aGlzLmVsZW1lbnRzKVxuICB9LFxuXG4gIGlzU3F1YXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IDAgOiB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gY29sc1xuICB9LFxuXG4gIHRvUmlnaHRUcmlhbmd1bGFyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoW10pXG4gICAgdmFyIE0gPSB0aGlzLmR1cCgpLFxuICAgICAgZWxzXG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgbnAgPSB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgIHBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSA9PT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIGlmIChNLmVsZW1lbnRzW2pdW2ldICE9PSAwKSB7XG4gICAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tpXVtwXSArIE0uZWxlbWVudHNbal1bcF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE0uZWxlbWVudHNbaV1baV0gIT09IDApIHtcbiAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IE0uZWxlbWVudHNbal1baV0gLyBNLmVsZW1lbnRzW2ldW2ldXG4gICAgICAgICAgZWxzID0gW11cbiAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgLy8gRWxlbWVudHMgd2l0aCBjb2x1bW4gbnVtYmVycyB1cCB0byBhbiBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiB0aGVcbiAgICAgICAgICAgIC8vIHJvdyB0aGF0IHdlJ3JlIHN1YnRyYWN0aW5nIGNhbiBzYWZlbHkgYmUgc2V0IHN0cmFpZ2h0IHRvIHplcm8sXG4gICAgICAgICAgICAvLyBzaW5jZSB0aGF0J3MgdGhlIHBvaW50IG9mIHRoaXMgcm91dGluZSBhbmQgaXQgYXZvaWRzIGhhdmluZyB0b1xuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGFuZCBjb3JyZWN0IHJvdW5kaW5nIGVycm9ycyBsYXRlclxuICAgICAgICAgICAgZWxzLnB1c2goXG4gICAgICAgICAgICAgIHAgPD0gaSA/IDAgOiBNLmVsZW1lbnRzW2pdW3BdIC0gTS5lbGVtZW50c1tpXVtwXSAqIG11bHRpcGxpZXJcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgTS5lbGVtZW50c1tqXSA9IGVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNXG4gIH0sXG5cbiAgZGV0ZXJtaW5hbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgTSA9IHRoaXMudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBkZXQgPSBNLmVsZW1lbnRzWzBdWzBdLFxuICAgICAgbiA9IE0uZWxlbWVudHMubGVuZ3RoXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGRldCA9IGRldCAqIE0uZWxlbWVudHNbaV1baV1cbiAgICB9XG4gICAgcmV0dXJuIGRldFxuICB9LFxuXG4gIGlzU2luZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NxdWFyZSgpICYmIHRoaXMuZGV0ZXJtaW5hbnQoKSA9PT0gMFxuICB9LFxuXG4gIGF1Z21lbnQ6IGZ1bmN0aW9uIChtYXRyaXgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmR1cCgpXG4gICAgfVxuICAgIHZhciBNID0gbWF0cml4LmVsZW1lbnRzIHx8IG1hdHJpeFxuICAgIGlmICh0eXBlb2YgTVswXVswXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIE0gPSBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShNKS5lbGVtZW50c1xuICAgIH1cbiAgICB2YXIgVCA9IHRoaXMuZHVwKCksXG4gICAgICBjb2xzID0gVC5lbGVtZW50c1swXS5sZW5ndGhcbiAgICB2YXIgaSA9IFQuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgbmogPSBNWzBdLmxlbmd0aCxcbiAgICAgIGpcbiAgICBpZiAoaSAhPT0gTS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGogPSBualxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBULmVsZW1lbnRzW2ldW2NvbHMgKyBqXSA9IE1baV1bal1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFRcbiAgfSxcblxuICBpbnZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNTcXVhcmUoKSB8fCB0aGlzLmlzU2luZ3VsYXIoKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgdmFyIG4gPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIGkgPSBuLFxuICAgICAgalxuICAgIHZhciBNID0gdGhpcy5hdWdtZW50KFN5bHZlc3Rlci5NYXRyaXguSShuKSkudG9SaWdodFRyaWFuZ3VsYXIoKVxuICAgIHZhciBucCA9IE0uZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcCxcbiAgICAgIGVscyxcbiAgICAgIGRpdmlzb3JcbiAgICB2YXIgaW52ZXJzZV9lbGVtZW50cyA9IFtdLFxuICAgICAgbmV3X2VsZW1lbnRcbiAgICAvLyBTeWx2ZXN0ZXIuTWF0cml4IGlzIG5vbi1zaW5ndWxhciBzbyB0aGVyZSB3aWxsIGJlIG5vIHplcm9zIG9uIHRoZVxuICAgIC8vIGRpYWdvbmFsLiBDeWNsZSB0aHJvdWdoIHJvd3MgZnJvbSBsYXN0IHRvIGZpcnN0LlxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIC8vIEZpcnN0LCBub3JtYWxpc2UgZGlhZ29uYWwgZWxlbWVudHMgdG8gMVxuICAgICAgZWxzID0gW11cbiAgICAgIGludmVyc2VfZWxlbWVudHNbaV0gPSBbXVxuICAgICAgZGl2aXNvciA9IE0uZWxlbWVudHNbaV1baV1cbiAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgIG5ld19lbGVtZW50ID0gTS5lbGVtZW50c1tpXVtwXSAvIGRpdmlzb3JcbiAgICAgICAgZWxzLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIC8vIFNodWZmbGUgb2ZmIHRoZSBjdXJyZW50IHJvdyBvZiB0aGUgcmlnaHQgaGFuZCBzaWRlIGludG8gdGhlIHJlc3VsdHNcbiAgICAgICAgLy8gYXJyYXkgYXMgaXQgd2lsbCBub3QgYmUgbW9kaWZpZWQgYnkgbGF0ZXIgcnVucyB0aHJvdWdoIHRoaXMgbG9vcFxuICAgICAgICBpZiAocCA+PSBuKSB7XG4gICAgICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXS5wdXNoKG5ld19lbGVtZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBNLmVsZW1lbnRzW2ldID0gZWxzXG4gICAgICAvLyBUaGVuLCBzdWJ0cmFjdCB0aGlzIHJvdyBmcm9tIHRob3NlIGFib3ZlIGl0IHRvIGdpdmUgdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAgLy8gb24gdGhlIGxlZnQgaGFuZCBzaWRlXG4gICAgICBqID0gaVxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICBlbHMgPSBbXVxuICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgIGVscy5wdXNoKE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogTS5lbGVtZW50c1tqXVtpXSlcbiAgICAgICAgfVxuICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShpbnZlcnNlX2VsZW1lbnRzKVxuICB9LFxuXG4gIHNldEVsZW1lbnRzOiBmdW5jdGlvbiAoZWxzKSB7XG4gICAgdmFyIGksXG4gICAgICBqLFxuICAgICAgZWxlbWVudHMgPSBlbHMuZWxlbWVudHMgfHwgZWxzXG4gICAgaWYgKGVsZW1lbnRzWzBdICYmIHR5cGVvZiBlbGVtZW50c1swXVswXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkgPSBlbGVtZW50cy5sZW5ndGhcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBqID0gZWxlbWVudHNbaV0ubGVuZ3RoXG4gICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBbXVxuICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50c1tpXVtqXSA9IGVsZW1lbnRzW2ldW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHZhciBuID0gZWxlbWVudHMubGVuZ3RoXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKFtlbGVtZW50c1tpXV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIGNvbnN0IG1hdCA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVsZW1lbnRzKS5pbnZlcnNlKClcbiAgaWYgKG1hdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtYXQuZWxlbWVudHNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4LmpzJyk7XG4iLCJjb25zdCBlbGVtV2lzZSA9IHJlcXVpcmUoJy4vZWxlbS13aXNlJyk7XG4vKipcbiogQWRkIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7Li4uQXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gYXJncyBsaXN0IG9mIG1hdHJpeFxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gc3VtXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGQoLi4uYXJncykge1xuXHRyZXR1cm4gZWxlbVdpc2UoYXJncywgYXJnczIgPT4ge1xuXHRcdHJldHVybiBhcmdzMi5yZWR1Y2UoKGEsIGIpID0+IHtcblx0XHRcdGlmIChhID09PSBudWxsIHx8IGIgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhICsgYjtcblx0XHR9LCAwKTtcblx0fSk7XG59O1xuIiwiY29uc3QgZG90UHJvZHVjdCA9IHJlcXVpcmUoJy4vZG90LXByb2R1Y3QuanMnKTtcbmNvbnN0IG5vcm0gPSByZXF1aXJlKCcuL25vcm0uanMnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoZSB0d28gdmVjdG9ycy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbGVuZ3RocyBvZiB0aGUgdmVjdG9ycyBkbyBub3QgbWF0Y2guXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29zU2ltaWxhcml0eSh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG5cdGlmICh2ZWN0b3IxLmxlbmd0aCAhPT0gdmVjdG9yMi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgbGVuZ3RocyBvZiB0aGUgdmVjdG9ycyBkbyBub3QgbWF0Y2gnKSk7XG5cdH1cblxuXHRjb25zdCBub3JtUHJvZCA9IChub3JtKHZlY3RvcjEpICogbm9ybSh2ZWN0b3IyKSk7XG5cblx0aWYgKG5vcm1Qcm9kID09PSAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gZG90UHJvZHVjdCh2ZWN0b3IxLCB2ZWN0b3IyKSAvIG5vcm1Qcm9kO1xufTtcbiIsImNvbnN0IGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eS5qcycpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBibG9jayBkaWFnb25hbCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYmxvY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJbXVtdW119IG9wdGlvbnMuYmxvY2tzIFRoZSBibG9ja3MgdG8gZm9ybSB0aGUgZGlhZ29uYWwgbWF0cml4LlxuICogQHBhcmFtIHtudW1iZXJbXX0gW29wdGlvbnMub3JkZXI9bnVsbF0gT3B0aW9uYWwgb3JkZXIgZm9yIGFycmFuZ2luZyB0aGUgYmxvY2tzLlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBibG9jayBkaWFnb25hbCBtYXRyaXguXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlhZ0Jsb2NrKHtibG9ja3MsIG9yZGVyID0gbnVsbH0pIHtcblx0Y29uc3QgZGltTCA9IGJsb2Nrcy5tYXAoYSA9PiBhLmxlbmd0aCkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cdGNvbnN0IHJlc3VsdCA9IGlkZW50aXR5KGRpbUwpO1xuXHRsZXQgY3VycmVudCA9IDA7XG5cdGZvciAoY29uc3QgbWF0IG9mIGJsb2Nrcykge1xuXHRcdGZvciAoY29uc3QgW2ldIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdGZvciAoY29uc3QgW2pdIG9mIG1hdC5lbnRyaWVzKCkpIHtcblx0XHRcdFx0cmVzdWx0W2kgKyBjdXJyZW50XVtqICsgY3VycmVudF0gPSBtYXRbaV1bal07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y3VycmVudCArPSBtYXQubGVuZ3RoO1xuXHR9XG5cblx0aWYgKG9yZGVyKSB7XG5cdFx0cmV0dXJuIG9yZGVyLm1hcChpID0+IG9yZGVyLm1hcChqID0+IHJlc3VsdFtpXVtqXSkpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJjb25zdCB6ZXJvcyA9IHJlcXVpcmUoJy4vemVyb3MnKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgZGlhZ29uYWwgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJbXX0gZGlhZ29uYWwgVGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgZGlhZ29uYWwgZWxlbWVudHMgb2YgdGhlIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBUaGUgZGlhZ29uYWwgbWF0cml4LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpYWcoZGlhZ29uYWwpIHtcblx0Y29uc3QgcmVzdWx0ID0gemVyb3MoZGlhZ29uYWwubGVuZ3RoLCBkaWFnb25hbC5sZW5ndGgpO1xuXHRmb3IgKGNvbnN0IFtpLCBlbGVtZW50XSBvZiBkaWFnb25hbC5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHRbaV1baV0gPSBlbGVtZW50O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycy5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvcjEgVGhlIGZpcnN0IHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvcjIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZG90IHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkb3RQcm9kdWN0KHZlY3RvcjEsIHZlY3RvcjIpIHtcblx0aWYgKHZlY3RvcjEubGVuZ3RoICE9PSB2ZWN0b3IyLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ0xlbmd0aHMgbm90IG1hY2hpbmcnKSk7XG5cdH1cblxuXHRsZXQgcmVzdWx0ID0gMDtcblx0Zm9yIChjb25zdCBbaSwgZWxlbWVudF0gb2YgdmVjdG9yMS5lbnRyaWVzKCkpIHtcblx0XHRyZXN1bHQgKz0gZWxlbWVudCAqIHZlY3RvcjJbaV07XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuKiBAY2FsbGJhY2sgZWxlbVdpc2VDYlxuKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBhcnJcbiogQHBhcmFtIHtOdW1iZXJ9IHJvd0lkXG4qIEBwYXJhbSB7TnVtYmVyfSBjb2xJZFxuKi9cbi8qKlxuKiBSdW4gYSBmdW5jdGlvbiBvbiBjZWxsIHBlciBjZWxsIGZvciBlYWNoIE1hdHJpeGVzXG4qIEBwYXJhbSB7PEFycmF5LjxBcnJheS48QXJyYXkuPE51bWJlcj4+Pn0gYXJyTWF0cml4ZXMgbGlzdCBvZiBtYXRyaXhlc1xuKiBAcGFyYW0ge2VsZW1XaXNlQ2J9IGZuXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSByZXN1bHRpbmcgbWF0cml4XG4qIEBleGFtcGxlXG4vLyB0aGlzIHdpbGwgZG8gbTEgKyBtMiArIG0zICsgbTQgb24gbWF0cml4ZXNcbmVsZW1XaXNlKFttMSwgbTIsIG0zLCBtNF0sIGFyZ3MyID0+IHtcblx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xufSk7XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVsZW1XaXNlKGFycmF5TWF0cml4ZXMsIGZuKSB7XG5cdHJldHVybiBhcnJheU1hdHJpeGVzWzBdLm1hcCgocm93LCByb3dJZCkgPT4ge1xuXHRcdHJldHVybiByb3cubWFwKChjZWxsLCBjb2xJZCkgPT4ge1xuXHRcdFx0Y29uc3QgYXJyYXkgPSBhcnJheU1hdHJpeGVzLm1hcChtID0+IG1bcm93SWRdW2NvbElkXSk7XG5cdFx0XHRyZXR1cm4gZm4oYXJyYXksIHJvd0lkLCBjb2xJZCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBFdWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGFycmF5MSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkyIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gdmVjdG9ycy5cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYXJyYXlzIGhhdmUgZGlmZmVyZW50IGxlbmd0aHMgb3IgaWYgZWl0aGVyIGFycmF5IGlzIG5vdCBhbiBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldWNsaWRlYW5EaXN0KGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFycmF5IGxlbmd0aHMnKTtcblx0fVxuXG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheTEpKSB7XG5cdFx0Y29uc29sZS5sb2coe2FycmF5MX0pO1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcnJheScpO1xuXHR9XG5cblx0Y29uc3QgZGlmZiA9IGFycmF5MS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBlbGVtZW50IC0gYXJyYXkyW2luZGV4XSkubWFwKGVsZW1lbnQgPT4gZWxlbWVudCAqIGVsZW1lbnQpO1xuXHRyZXR1cm4gTWF0aC5zcXJ0KGRpZmYucmVkdWNlKChhLCBiKSA9PiBhICsgYikpO1xufTtcbiIsImNvbnN0IHRyYWNlID0gcmVxdWlyZSgnLi90cmFjZS5qcycpO1xuY29uc3QgdHJhbnNwb3NlID0gcmVxdWlyZSgnLi90cmFuc3Bvc2UuanMnKTtcbmNvbnN0IG1hdFN1YiA9IHJlcXVpcmUoJy4vc3VidHJhY3QuanMnKTtcbmNvbnN0IG1hdE11bCA9IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpO1xuY29uc3Qgc3VtID0gcmVxdWlyZSgnLi9zdW0uanMnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBGcm9iZW5pdXMgbm9ybSBvZiB0aGUgZ2l2ZW4gbWF0cmljZXMgb3IgdmVjdG9ycy5cbiAqIFtGcm9iZW5pdXMgbm9ybV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF0cml4X25vcm0jRnJvYmVuaXVzX25vcm0pXG4gKiBAcGFyYW0ge251bWJlcltdW119IFthcnJheTFdIFRoZSBmaXJzdCBtYXRyaXggb3IgdmVjdG9yIChvcHRpb25hbCkuXG4gKiBAcGFyYW0ge251bWJlcltdW119IFthcnJheTJdIFRoZSBzZWNvbmQgbWF0cml4IG9yIHZlY3RvciAob3B0aW9uYWwpLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEZyb2Jlbml1cyBub3JtIG9mIHRoZSBtYXRyaWNlcyBvciB2ZWN0b3JzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb2Jlbml1cyhhcnJheTEsIGFycmF5Mikge1xuXHRpZiAoYXJyYXkxID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3VtKGFycmF5Mik7XG5cdH1cblxuXHRpZiAoYXJyYXkyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3VtKGFycmF5MSk7XG5cdH1cblxuXHRjb25zdCBtID0gbWF0U3ViKGFycmF5MSwgYXJyYXkyKTtcblx0Y29uc3QgcCA9IG1hdE11bCh0cmFuc3Bvc2UobSksIG0pO1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRyYWNlKHApKTtcbn07XG4iLCIvKipcbiAqIGJ1aWxkIGFuIGlkZW50aXR5IHNxdWFyZSBtYXRyaXhcbiAqIEBwYXJhbSBzdGF0ZVNpemUgbWF0cml4IHNpemVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZGVudGl0eShzdGF0ZVNpemUpIHtcbiAgY29uc3QgaWRlbnRpdHlBcnJheSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlU2l6ZTsgaSsrKSB7XG4gICAgY29uc3Qgcm93SWRlbnRpdHkgPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0YXRlU2l6ZTsgaisrKSB7XG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICByb3dJZGVudGl0eS5wdXNoKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93SWRlbnRpdHkucHVzaCgwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZGVudGl0eUFycmF5LnB1c2gocm93SWRlbnRpdHkpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aXR5QXJyYXk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGFkZDogcmVxdWlyZSgnLi9hZGQuanMnKSxcblx0Y29zU2ltaWxhcml0eTogcmVxdWlyZSgnLi9jb3Mtc2ltaWxhcml0eScpLFxuXHRldWNsaWRlYW5EaXN0OiByZXF1aXJlKCcuL2V1Y2xpZGVhbi1kaXN0JyksXG5cdGRpYWc6IHJlcXVpcmUoJy4vZGlhZy5qcycpLFxuXHRkaWFnQmxvY2s6IHJlcXVpcmUoJy4vZGlhZy1ibG9jaycpLFxuXHRkb3RQcm9kdWN0OiByZXF1aXJlKCcuL2RvdC1wcm9kdWN0JyksXG5cdGVsZW1XaXNlOiByZXF1aXJlKCcuL2VsZW0td2lzZS5qcycpLFxuXHRmcm9iZW5pdXM6IHJlcXVpcmUoJy4vZnJvYmVuaXVzLmpzJyksXG5cdGlkZW50aXR5OiByZXF1aXJlKCcuL2lkZW50aXR5LmpzJyksXG5cdGludmVydDogcmVxdWlyZSgnLi9pbnZlcnQuanMnKSxcblx0bWFwTWF0cml4OiByZXF1aXJlKCcuL21hcC1tYXRyaXguanMnKSxcblx0bWF0TXVsOiByZXF1aXJlKCcuL21hdC1tdWwuanMnKSxcblx0bWF0UGVybXV0YXRpb246IHJlcXVpcmUoJy4vbWF0LXBlcm11dGF0aW9uLmpzJyksXG5cdHBhZFdpdGhaZXJvQ29sczogcmVxdWlyZSgnLi9wYWQtd2l0aC16ZXJvLWNvbHMuanMnKSxcblx0c3VidHJhY3Q6IHJlcXVpcmUoJy4vc3VidHJhY3QuanMnKSxcblx0c3ViU3F1YXJlTWF0cml4OiByZXF1aXJlKCcuL3N1Yi1zcXVhcmUtbWF0cml4LmpzJyksXG5cdHN1bTogcmVxdWlyZSgnLi9zdW0uanMnKSxcblx0dHJhY2U6IHJlcXVpcmUoJy4vdHJhY2UuanMnKSxcblx0dHJhbnNwb3NlOiByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpLFxuXHR6ZXJvczogcmVxdWlyZSgnLi96ZXJvcy5qcycpLFxuXHRub3JtOiByZXF1aXJlKCcuL25vcm0uanMnKSxcblx0c3VtVmVjdG9yOiByZXF1aXJlKCcuL3N1bS12ZWN0b3IuanMnKSxcbn07XG4iLCJjb25zdCBtYXRyaXhJbnZlcnNlID0gcmVxdWlyZSgnbWF0cml4LWludmVyc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnZlcnQobSkge1xuXHRyZXR1cm4gbWF0cml4SW52ZXJzZShtKTtcbn07XG4iLCIvKipcbiAqIE1hcHMgYSBmdW5jdGlvbiBvdmVyIGVhY2ggZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbWF0cml4LlxuICogQHBhcmFtIHtBcnJheTxBcnJheTxhbnk+Pn0gYSBUaGUgbWF0cml4IHRvIG1hcCBvdmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbnksIG51bWJlciwgbnVtYmVyKTogYW55fSBmbiBUaGUgbWFwcGluZyBmdW5jdGlvbiB0byBhcHBseS5cbiAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxhbnk+Pn0gVGhlIG1hdHJpeCB3aXRoIHRoZSBmdW5jdGlvbiBhcHBsaWVkIHRvIGVhY2ggZWxlbWVudC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXBNYXRyaXgoYSwgZm4pIHtcblx0cmV0dXJuIGEubWFwKChyb3csIHJvd0lkKSA9PiByb3cubWFwKChjZWxsLCBjb2xJZCkgPT4gZm4oY2VsbCwgcm93SWQsIGNvbElkKSkpO1xufTtcbiIsIi8qKlxuKiBNdWx0aXBseSAyIG1hdHJpeGVzIHRvZ2V0aGVyXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbTFcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtMlxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdE11bChtMSwgbTIpIHtcblx0Ly8gQ29uc29sZS5sb2coe20xLCBtMn0pO1xuXHRjb25zdCByZXN1bHQgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtMS5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdFtpXSA9IFtdO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgbTJbMF0ubGVuZ3RoOyBqKyspIHtcblx0XHRcdGxldCBzdW0gPSAwO1xuXHRcdFx0bGV0IGlzTnVsbCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBtMVswXS5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRpZiAoKG0xW2ldW2tdID09PSBudWxsICYmIG0yW2tdW2pdICE9PSAwKSB8fCAobTJba11bal0gPT09IG51bGwgJiYgbTFbaV1ba10gIT09IDApKSB7XG5cdFx0XHRcdFx0aXNOdWxsID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdW0gKz0gbTFbaV1ba10gKiBtMltrXVtqXTtcblx0XHRcdH1cblx0XHRcdHJlc3VsdFtpXVtqXSA9IGlzTnVsbCA/IG51bGwgOiBzdW07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeFxuICogQHBhcmFtIHtbTnVtYmVyLCBOdW1iZXJdfSBvdXRwdXRTaXplXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSByb3dJbmRleGVzIHRoZSBwZXJtdXRhdGlvbiBpbmRleGVzLCByZXN1bHRbal1ba10gPSBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGopXVtjb2xJbmRleGVzLmluZGV4T2YoayldXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBjb2xJbmRleGVzIHRoZSBwZXJtdXRhdGlvbiBpbmRleGVzLCByZXN1bHRbal1ba10gPSBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGopXVtjb2xJbmRleGVzLmluZGV4T2YoayldXG4gKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRQZXJtdXRhdGlvbih7XG5cdG1hdHJpeCxcblx0b3V0cHV0U2l6ZSxcblx0cm93SW5kZXhlcyxcblx0Y29sSW5kZXhlcyxcbn0pIHtcblx0Y29uc3QgW25Sb3csIG5Db2xdID0gb3V0cHV0U2l6ZTtcblxuXHRpZiAoIUFycmF5LmlzQXJyYXkocm93SW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCByb3dJbmRleGVzICR7cm93SW5kZXhlc31gKSk7XG5cdH1cblxuXHRpZiAoIUFycmF5LmlzQXJyYXkoY29sSW5kZXhlcykpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb2xJbmRleGVzICR7Y29sSW5kZXhlc31gKSk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEFycmF5KG5Sb3cpLmZpbGwoMCkubWFwKChfLCBpKSA9PiBuZXcgQXJyYXkobkNvbCkuZmlsbCgwKS5tYXAoKF8sIGopID0+IHtcblx0XHRpZiAoY29sSW5kZXhlcy5pbmNsdWRlcyhqKSAmJiByb3dJbmRleGVzLmluY2x1ZGVzKGkpKSB7XG5cdFx0XHRyZXR1cm4gbWF0cml4W3Jvd0luZGV4ZXMuaW5kZXhPZihpKV1bY29sSW5kZXhlcy5pbmRleE9mKGopXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSkpO1xufTtcbiIsIi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgRXVjbGlkZWFuIG5vcm0gb2YgdGhlIGdpdmVuIHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvciBUaGUgdmVjdG9yIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIEV1Y2xpZGVhbiBub3JtLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIEV1Y2xpZGVhbiBub3JtIG9mIHRoZSB2ZWN0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybSh2ZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiB2ZWN0b3IpIHtcblx0XHRyZXN1bHQgKz0gKGVsZW1lbnQgKiBlbGVtZW50KTtcblx0fVxuXHRyZXR1cm4gTWF0aC5zcXJ0KHJlc3VsdCk7XG59O1xuIiwiY29uc3QgbWF0UGVybXV0YXRpb24gPSByZXF1aXJlKCcuL21hdC1wZXJtdXRhdGlvbicpO1xuLyoqXG4qIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcGFkZGVkIG1hdHJpeCB3aXRoIHplcm9zIHdpdGggcmVzcGVjdCB0byBhIGdpdmVuXG4qIHRhcmdldCBjb2x1bW5zIG51bWJlclxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG1hdHJpeCB0aGUgbWF0cml4IHdlIG5lZWQgdG8gcGFkXG4qIEBwYXJhbSB7TnVtYmVyfSBjb2x1bW5zIGluIG91ciBjYXNlLCB0aGUgZHluYW1pYyBkaW1lbnNpb25cbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHBhZGRlZCBtYXRyaXhcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRyaXgsIHtjb2x1bW5zfSkge1xuXHRpZiAoY29sdW1ucyA8IG1hdHJpeFswXS5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgT3V0cHV0IGNvbHVtbnMgJHtjb2x1bW5zfSBpcyBncmVhdGVyIHRoYW4gaW5wdXQgY29sdW1ucyAke21hdHJpeFswXS5sZW5ndGh9YCkpO1xuXHR9XG5cblx0cmV0dXJuIG1hdFBlcm11dGF0aW9uKHtcblx0XHRtYXRyaXgsXG5cdFx0b3V0cHV0U2l6ZTogW21hdHJpeC5sZW5ndGgsIGNvbHVtbnNdLFxuXHRcdHJvd0luZGV4ZXM6IG5ldyBBcnJheShtYXRyaXgubGVuZ3RoKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IGluZGV4KSxcblx0XHRjb2xJbmRleGVzOiBuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbCgwKS5tYXAoKF8sIGluZGV4KSA9PiBpbmRleCksXG5cdH0pO1xufTtcbiIsIi8qKlxuICogRXh0cmFjdHMgYSBzdWItc3F1YXJlIG1hdHJpeCBmcm9tIHRoZSBwcm92aWRlZCBtYXRyaXggYmFzZWQgb24gdGhlIGdpdmVuIGluZGV4ZXMuXG4gKiBAcGFyYW0ge251bWJlcltdW119IG1hdCBUaGUgbWF0cml4IGZyb20gd2hpY2ggdG8gZXh0cmFjdCB0aGUgc3ViLXNxdWFyZSBtYXRyaXguXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRleGVzIFRoZSBpbmRleGVzIHRvIHNlbGVjdCByb3dzIGFuZCBjb2x1bW5zIGZyb20gdGhlIG1hdHJpeC5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBUaGUgc3ViLXNxdWFyZSBtYXRyaXggZXh0cmFjdGVkIGZyb20gdGhlIG9yaWdpbmFsIG1hdHJpeC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJTcXVhcmVNYXRyaXgobWF0LCBpbmRleGVzKSB7XG5cdHJldHVybiBpbmRleGVzLm1hcChzMSA9PiBpbmRleGVzLm1hcChzMiA9PiBtYXRbczFdW3MyXSkpO1xufTtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdWJ0cmFjdCguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCAoW2EsIGJdKSA9PiBhIC0gYik7XG59O1xuIiwiLyoqXG4gKiBTdW1zIGFsbCB0aGUgZWxlbWVudHMgb2YgdGhlIGdpdmVuIHZlY3Rvci5cbiAqIEBwYXJhbSB7bnVtYmVyW119IHZlY3RvciBUaGUgdmVjdG9yIHdob3NlIGVsZW1lbnRzIGFyZSB0byBiZSBzdW1tZWQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgc3VtIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgdmVjdG9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1bVZlY3Rvcih2ZWN0b3IpIHtcblx0bGV0IHMgPSAwO1xuXHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdmVjdG9yKSB7XG5cdFx0cyArPSBlbGVtZW50O1xuXHR9XG5cdHJldHVybiBzO1xufTtcbiIsImNvbnN0IHN1bVZlY3RvciA9IHJlcXVpcmUoJy4vc3VtLXZlY3RvcicpO1xuXG4vLyBTdW0gYWxsIHRoZSB0ZXJtcyBvZiBhIGdpdmVuIG1hdHJpeFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdW0oYXJyYXkpIHtcblx0bGV0IHMgPSAwO1xuXHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYXJyYXkpIHtcblx0XHRzICs9IHN1bVZlY3RvcihlbGVtZW50KTtcblx0fVxuXG5cdHJldHVybiBzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhY2UoYXJyYXkpIHtcblx0bGV0IGRpYWcgPSAwO1xuXHRmb3IgKGNvbnN0IFtyb3csIGVsZW1lbnRdIG9mIGFycmF5LmVudHJpZXMoKSkge1xuXHRcdGRpYWcgKz0gZWxlbWVudFtyb3ddO1xuXHR9XG5cdHJldHVybiBkaWFnO1xufTtcbiIsIi8qKlxuICogVHJhbnNwb3NlcyB0aGUgZ2l2ZW4gMkQgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PGFueT4+fSBhcnJheSBUaGUgMkQgYXJyYXkgdG8gdHJhbnNwb3NlLlxuICogQHJldHVybnMge0FycmF5PEFycmF5PGFueT4+fSBUaGUgdHJhbnNwb3NlZCAyRCBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc3Bvc2UoYXJyYXkpIHtcblx0cmV0dXJuIGFycmF5WzBdLm1hcCgoY29sLCBpKSA9PiBhcnJheS5tYXAocm93ID0+IHJvd1tpXSkpO1xufTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgMkQgYXJyYXkgZmlsbGVkIHdpdGggemVyb3Mgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvd3MgVGhlIG51bWJlciBvZiByb3dzIGZvciB0aGUgMkQgYXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29scyBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgZm9yIHRoZSAyRCBhcnJheS5cbiAqIEByZXR1cm5zIHtudW1iZXJbXVtdfSBBIDJEIGFycmF5IGZpbGxlZCB3aXRoIHplcm9zLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9zKHJvd3MsIGNvbHMpIHtcblx0cmV0dXJuIG5ldyBBcnJheShyb3dzKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQXJyYXkoY29scykuZmlsbCgwKSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDaGVjayBpZiBtb2R1bGUgZXhpc3RzIChkZXZlbG9wbWVudCBvbmx5KVxuXHRpZiAoX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=