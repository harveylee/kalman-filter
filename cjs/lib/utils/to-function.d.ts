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
export default function toFunction(array: any, { label }?: {
    label?: string;
}): any;
//# sourceMappingURL=to-function.d.ts.map