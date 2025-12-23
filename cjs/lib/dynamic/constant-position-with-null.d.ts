/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {Number} observationDimension
* @returns {DynamicConfig}
*/
export default function constantPositionWithNull({ staticCovariance, obsDynaIndexes, init }: {
    staticCovariance: any;
    obsDynaIndexes: any;
    init: any;
}): {
    dimension: any;
    transition(): number[][];
    covariance({ previousCorrected, index }: {
        previousCorrected: any;
        index: any;
    }): any;
    init: any;
};
//# sourceMappingURL=constant-position-with-null.d.ts.map