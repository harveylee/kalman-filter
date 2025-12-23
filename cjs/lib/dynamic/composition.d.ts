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
export default function composition({ perName }: {
    perName: any;
}, observation: any): {
    dimension: any;
    init: {
        index: number;
        mean: any[];
        covariance: any[][];
    };
    transition(options: any): any[][];
    covariance(options: any): any[][];
};
//# sourceMappingURL=composition.d.ts.map