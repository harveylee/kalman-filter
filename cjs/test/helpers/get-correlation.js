"use strict";
// This function enables to get the correlation between two parameters following
// Gaussian models
Object.defineProperty(exports, "__esModule", { value: true });
function getCorrelation(covariance, i, j) {
    const varI = covariance[i][i];
    const varJ = covariance[j][j];
    const covIj = covariance[i][j];
    return covIj / (Math.sqrt(varI) * Math.sqrt(varJ));
}
exports.default = getCorrelation;
//# sourceMappingURL=get-correlation.js.map