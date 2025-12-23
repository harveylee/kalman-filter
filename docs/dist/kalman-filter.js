let kalmanFilter;
/******/ (() => { // webpackBootstrap
/******/ const __webpack_modules__ = ({

		/***/ './node_modules/@rayyamhk/complex/lib/core/acos.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acos.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/acot.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acot.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/acsc.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/acsc.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/add.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/add.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/asec.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/asec.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/asin.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/asin.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/atan.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/atan.js ***!
  \*********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/conjugate.js':
		/*! **************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/conjugate.js ***!
  \**************************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/cos.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/cos.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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

				const a = num.getReal();
				const b = num.getImaginary();
				return new this(Math.cos(a) * Math.cosh(b), Math.sin(a) * Math.sinh(b) * -1);
			}

			module.exports = cos;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/cot.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/cot.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/csc.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/csc.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/divide.js':
		/*! ***********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/divide.js ***!
  \***********************************************************/
		/***/ (module => {
			'use strict';

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

				const a = num1.re;
				const b = num1.im;
				const c = num2.re;
				const d = num2.im;

				if (Math.abs(c) < this.EPSILON && Math.abs(d) < this.EPSILON) {
					return this.NaN;
				}

				const denominator = c ** 2 + d ** 2;
				return new this((a * c + b * d) / denominator, (b * c - a * d) / denominator);
			}

			module.exports = divide;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/exp.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/exp.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

			/**
 * Calculate the exponential function with base E
 * @param { Complex } num - Exponent
 * @return { Complex } - Return the e to the power of num
 */
			function exp(num) {
				if (!(num instanceof this)) {
					return this.NaN;
				}

				const re = num.getReal();
				const theta = num.getImaginary();
				const r = Math.exp(re);
				return new this(r * Math.cos(theta), r * Math.sin(theta));
			}

			module.exports = exp;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/getArgument.js':
		/*! ****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getArgument.js ***!
  \****************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * Note that the argument is restricted to the interval [ 0, 2 * PI )
 * If the given number is considered as 0, return undefined
 * @return { Number } - Return the argument of given complex number
 */
			function getArgument() {
				const x = this.re;
				const y = this.im;
				const epsilon = 1 / (10 ** 15 * 2);

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/getImaginary.js':
		/*! *****************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getImaginary.js ***!
  \*****************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * @return { Number } - Return the imaginary part of given complex number
 */
			function getImaginary() {
				return this.im;
			}

			module.exports = getImaginary;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/getModulus.js':
		/*! ***************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getModulus.js ***!
  \***************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * @return { Number } - Return the modulus (length) of given complex number
 */
			function getModulus() {
				return Math.hypot(this.re, this.im);
			}

			module.exports = getModulus;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/getReal.js':
		/*! ************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/getReal.js ***!
  \************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * @return { Number } - Return the real part of given complex number
 */
			function getReal() {
				return this.re;
			}

			module.exports = getReal;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/inverse.js':
		/*! ************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/inverse.js ***!
  \************************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/isEqual.js':
		/*! ************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/isEqual.js ***!
  \************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * Determine whether two complex numbers are considered as identical.
 * Either both are NaN or both real and imaginary parts are extremely closed.
 * @param { Complex } num1 - Complex number
 * @param { Complex } num2 - Complex number
 * @param { Integer } digit - Number of significant digits
 * @return { Boolean } - Return true if two complex numbers are considered as identical
 */
			function isEqual(num1, num2) {
				const digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

				if (!(num1 instanceof this) || !(num2 instanceof this)) {
					return false;
				}

				if (!Number.isInteger(digit) || digit < 0) {
					throw new Error('Invalid argument: Expected a non-negative integer digit');
				}

				const EPSILON = 1 / (10 ** digit * 2);
				const a = num1.getReal();
				const b = num1.getImaginary();
				const c = num2.getReal();
				const d = num2.getImaginary();

				if (Number.isNaN(a) && Number.isNaN(b) && Number.isNaN(c) && Number.isNaN(d)) {
					return true;
				}

				return Math.abs(a - c) < EPSILON && Math.abs(b - d) < EPSILON;
			}

			module.exports = isEqual;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/isNaN.js':
		/*! **********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/isNaN.js ***!
  \**********************************************************/
		/***/ (module => {
			'use strict';

			/**
 * Determine whether the given complex number is NaN or not
 * @param { Complex } num - Complex number
 * @return { Boolean } - Return true if one of real and imaginary part are NaN
 */
			function isNaN(num) {
				if (!(num instanceof this)) {
					return false;
				}

				const re = num.getReal();
				const im = num.getImaginary();

				if (Number.isNaN(re) || Number.isNaN(im)) {
					return true;
				}

				return false;
			}

			module.exports = isNaN;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/log.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/log.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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

				const r = num.getModulus();
				const theta = num.getArgument();

				if (r < this.EPSILON || theta === undefined) {
					return this.NaN;
				}

				return new this(Math.log(r), theta);
			}

			module.exports = log;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/multiply.js':
		/*! *************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/multiply.js ***!
  \*************************************************************/
		/***/ (module => {
			'use strict';

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

				const a = num1.re;
				const b = num1.im;
				const c = num2.re;
				const d = num2.im;
				return new this(a * c - b * d, a * d + b * c);
			}

			module.exports = multiply;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/pow.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/pow.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/sec.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/sec.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/sin.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/sin.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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

				const a = num.getReal();
				const b = num.getImaginary();
				return new this(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
			}

			module.exports = sin;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/subtract.js':
		/*! *************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/subtract.js ***!
  \*************************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/tan.js':
		/*! ********************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/tan.js ***!
  \********************************************************/
		/***/ (module => {
			'use strict';

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
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/core/toString.js':
		/*! *************************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/core/toString.js ***!
  \*************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * @return { String } - Return the stringified and formatted complex number
 */
			function toString() {
				const {re} = this;
				const {im} = this;

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

					return ''.concat(im, 'i');
				}

				if (im === 0) {
					return ''.concat(re);
				}

				if (im > 0) {
					if (im === 1) {
						return ''.concat(re, ' + i');
					}

					return ''.concat(re, ' + ').concat(im, 'i');
				}

				if (im === -1) {
					return ''.concat(re, ' - i');
				}

				return ''.concat(re, ' - ').concat(Math.abs(im), 'i');
			}

			module.exports = toString;
			/***/}),

		/***/ './node_modules/@rayyamhk/complex/lib/index.js':
		/*! *****************************************************!*\
  !*** ./node_modules/@rayyamhk/complex/lib/index.js ***!
  \*****************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _typeof(obj) {
				'@babel/helpers - typeof'; _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
					? function _typeof(obj) {
						return typeof obj;
					}
					: function _typeof(obj) {
						return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
					};

				return _typeof(obj);
			}

			/**
 * Returns a Complex Number
 * @param { Number } arg1 - real part of the complex number
 * @param { Number } arg2 - imaginary part of the complex number
 * @return { Complex } - Complex Number
 */
			function Complex(arg1, arg2) {
				const type1 = _typeof(arg1);

				const type2 = _typeof(arg2);

				if (type1 === 'number' && type2 === 'undefined') {
					if (Number.isNaN(arg1) || !Number.isFinite(arg1)) {
						this.re = Number.NaN;
						this.im = Number.NaN;
						return this;
					}

					this.re = arg1;
					this.im = 0;
					return this;
				}

				if (type1 === 'number' && type2 === 'number') {
					if (Number.isNaN(arg1) || Number.isNaN(arg2) || !Number.isFinite(arg1) || !Number.isFinite(arg2)) {
						this.re = Number.NaN;
						this.im = Number.NaN;
						return this;
					}

					this.re = arg1;
					this.im = arg2;
					return this;
				}

				this.re = Number.NaN;
				this.im = Number.NaN;
				return this;
			}

			Complex.prototype.getReal = __webpack_require__(/*! ./core/getReal */ './node_modules/@rayyamhk/complex/lib/core/getReal.js');
			Complex.prototype.getImaginary = __webpack_require__(/*! ./core/getImaginary */ './node_modules/@rayyamhk/complex/lib/core/getImaginary.js');
			Complex.prototype.getModulus = __webpack_require__(/*! ./core/getModulus */ './node_modules/@rayyamhk/complex/lib/core/getModulus.js');
			Complex.prototype.getArgument = __webpack_require__(/*! ./core/getArgument */ './node_modules/@rayyamhk/complex/lib/core/getArgument.js');
			Complex.prototype.toString = __webpack_require__(/*! ./core/toString */ './node_modules/@rayyamhk/complex/lib/core/toString.js');
			Complex.isNaN = __webpack_require__(/*! ./core/isNaN */ './node_modules/@rayyamhk/complex/lib/core/isNaN.js');
			Complex.isEqual = __webpack_require__(/*! ./core/isEqual */ './node_modules/@rayyamhk/complex/lib/core/isEqual.js');
			Complex.conjugate = __webpack_require__(/*! ./core/conjugate */ './node_modules/@rayyamhk/complex/lib/core/conjugate.js');
			Complex.inverse = __webpack_require__(/*! ./core/inverse */ './node_modules/@rayyamhk/complex/lib/core/inverse.js');
			Complex.add = __webpack_require__(/*! ./core/add */ './node_modules/@rayyamhk/complex/lib/core/add.js');
			Complex.subtract = __webpack_require__(/*! ./core/subtract */ './node_modules/@rayyamhk/complex/lib/core/subtract.js');
			Complex.multiply = __webpack_require__(/*! ./core/multiply */ './node_modules/@rayyamhk/complex/lib/core/multiply.js');
			Complex.divide = __webpack_require__(/*! ./core/divide */ './node_modules/@rayyamhk/complex/lib/core/divide.js');
			Complex.exp = __webpack_require__(/*! ./core/exp */ './node_modules/@rayyamhk/complex/lib/core/exp.js');
			Complex.log = __webpack_require__(/*! ./core/log */ './node_modules/@rayyamhk/complex/lib/core/log.js');
			Complex.pow = __webpack_require__(/*! ./core/pow */ './node_modules/@rayyamhk/complex/lib/core/pow.js');
			Complex.sin = __webpack_require__(/*! ./core/sin */ './node_modules/@rayyamhk/complex/lib/core/sin.js');
			Complex.cos = __webpack_require__(/*! ./core/cos */ './node_modules/@rayyamhk/complex/lib/core/cos.js');
			Complex.tan = __webpack_require__(/*! ./core/tan */ './node_modules/@rayyamhk/complex/lib/core/tan.js');
			Complex.csc = __webpack_require__(/*! ./core/csc */ './node_modules/@rayyamhk/complex/lib/core/csc.js');
			Complex.sec = __webpack_require__(/*! ./core/sec */ './node_modules/@rayyamhk/complex/lib/core/sec.js');
			Complex.cot = __webpack_require__(/*! ./core/cot */ './node_modules/@rayyamhk/complex/lib/core/cot.js');
			Complex.asin = __webpack_require__(/*! ./core/asin */ './node_modules/@rayyamhk/complex/lib/core/asin.js');
			Complex.acos = __webpack_require__(/*! ./core/acos */ './node_modules/@rayyamhk/complex/lib/core/acos.js');
			Complex.atan = __webpack_require__(/*! ./core/atan */ './node_modules/@rayyamhk/complex/lib/core/atan.js');
			Complex.acsc = __webpack_require__(/*! ./core/acsc */ './node_modules/@rayyamhk/complex/lib/core/acsc.js');
			Complex.asec = __webpack_require__(/*! ./core/asec */ './node_modules/@rayyamhk/complex/lib/core/asec.js');
			Complex.acot = __webpack_require__(/*! ./core/acot */ './node_modules/@rayyamhk/complex/lib/core/acot.js');
			Complex.NaN = new Complex(Number.NaN);
			Complex.ONE = new Complex(1);
			Complex.ZERO = new Complex(0);
			Complex.PI = new Complex(Math.PI);
			Complex.E = new Complex(Math.E);
			Complex.EPSILON = 1 / (10 ** 15 * 2);
			module.exports = Complex;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/Error.js':
		/*! ****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/Error.js ***!
  \****************************************************/
		/***/ (module => {
			'use strict';

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
				EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES: 'Invalid argument: Expected either an array of numbers or an array of square matrices',
			};
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js':
		/*! *********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js ***!
  \*********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
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
				const optimized = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (!(A instanceof this)) {
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const size = Math.min(row, col);
				const EPSILON = 1 / (10 ** A._digit * 2);
				const permutation = initPermutation(row);

				const copy = this.clone(A)._matrix;

				for (let i = 0; i < row - 1; i++) {
					const currentCol = Math.min(i, col); // apply Partial Pivoting

					PartialPivoting(copy, permutation, currentCol, row, col);
					const ith = permutation[i];
					const pivot = copy[ith][currentCol];

					if (Math.abs(pivot) < EPSILON) {
						continue;
					}

					for (let j = i + 1; j < row; j++) {
						const jth = permutation[j];
						const entry = copy[jth][currentCol];

						if (Math.abs(entry) >= EPSILON) {
							const factor = entry / pivot;

							for (let k = currentCol; k < col; k++) {
								copy[jth][k] -= factor * copy[ith][k];
							}

							copy[jth][currentCol] = factor;
						}
					}
				}

				const result = new Array(row);

				for (let _i2 = 0; _i2 < row; _i2++) {
					result[_i2] = copy[permutation[_i2]];
				}

				if (optimized) {
					return [permutation, new this(result)];
				}

				const P = this.generate(row, row, (i, j) => {
					const idx = permutation[i];

					if (j === idx) {
						return 1;
					}

					return 0;
				});
				const L = this.generate(row, size, (i, j) => {
					if (i === j) {
						return 1;
					}

					if (i < j) {
						return 0;
					}

					return result[i][j];
				});
				const U = this.generate(size, col, (i, j) => {
					if (i > j) {
						return 0;
					}

					return result[i][j];
				});
				return [P, L, U];
			}

			function initPermutation(size) {
				const permutation = new Array(size);

				for (let i = 0; i < size; i++) {
					permutation[i] = i;
				}

				return permutation;
			}

			function PartialPivoting(matrix, permutation, pos, row, col) {
				const currentCol = Math.min(pos, col);
				let maxIdx = pos;
				let max = Math.abs(matrix[permutation[pos]][currentCol]);

				for (let i = pos + 1; i < row; i++) {
					const value = Math.abs(matrix[permutation[i]][currentCol]);

					if (value > max) {
						maxIdx = i;
						max = value;
					}
				}

				const t = permutation[pos];
				permutation[pos] = permutation[maxIdx];
				permutation[maxIdx] = t;
			}

			module.exports = LU;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js':
		/*! *********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js ***!
  \*********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const size = Math.min(row, col);
				const EPSILON = 1 / (10 ** A._digit * 2);

				const matrixR = this.clone(A)._matrix;

				const matrixQ = this.identity(row)._matrix;

				for (let j = 0; j < size; j++) {
					// if all entries below main diagonal are considered as zero, skip this round
					let skip = true;

					for (let i = j + 1; i < row; i++) {
						if (Math.abs(matrixR[i][j]) >= EPSILON) {
							skip = false;
							break;
						}
					}

					if (!skip) {
						// Apply Householder transform
						let norm = 0;

						for (let _i2 = j; _i2 < row; _i2++) {
							norm += matrixR[_i2][j] ** 2;
						}

						norm = Math.sqrt(norm); // reduce floating point arithmatic error

						let s = -1;

						if (matrixR[j][j] < 0) {
							s = 1;
						}

						const u1 = matrixR[j][j] - s * norm;
						const w = new Array(row - j);

						for (let _i3 = 0; _i3 < row - j; _i3++) {
							w[_i3] = matrixR[_i3 + j][j] / u1;
						}

						w[0] = 1;
						const tau = -1 * s * u1 / norm;
						const subR = new Array(row - j);

						for (let _i4 = 0; _i4 < row - j; _i4++) {
							const newRow = new Array(col);

							for (let k = 0; k < col; k++) {
								newRow[k] = matrixR[j + _i4][k];
							}

							subR[_i4] = newRow;
						}

						for (let _i5 = j; _i5 < row; _i5++) {
							for (let _k = 0; _k < col; _k++) {
								let summation = 0;

								for (let m = 0; m < row - j; m++) {
									summation += subR[m][_k] * w[m];
								}

								matrixR[_i5][_k] = subR[_i5 - j][_k] - tau * w[_i5 - j] * summation;
							}
						}

						const subQ = new Array(row);

						for (let _i6 = 0; _i6 < row; _i6++) {
							const _newRow = new Array(row - j);

							for (let _k2 = 0; _k2 < row - j; _k2++) {
								_newRow[_k2] = matrixQ[_i6][j + _k2];
							}

							subQ[_i6] = _newRow;
						}

						for (let _i7 = 0; _i7 < row; _i7++) {
							for (let _k3 = j; _k3 < row; _k3++) {
								let _summation = 0;

								for (let _m = 0; _m < row - j; _m++) {
									_summation += subQ[_i7][_m] * w[_m];
								}

								matrixQ[_i7][_k3] = subQ[_i7][_k3 - j] - tau * w[_k3 - j] * _summation;
							}
						}
					}
				}

				for (let _i8 = 0; _i8 < row; _i8++) {
					for (let _j = 0; _j < col; _j++) {
						if (_i8 > _j) {
							matrixR[_i8][_j] = 0;
						}
					}
				}

				return [new this(matrixQ), new this(matrixR)];
			}

			module.exports = QR;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js':
		/*! *****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js ***!
  \*****************************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const empty = __webpack_require__(/*! ../../util/empty */ './node_modules/@rayyamhk/matrix/lib/util/empty.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {INVALID_UPPER_TRIANGULAR_MATRIX} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
			const {SIZE_INCOMPATIBLE} = _require;
			const {NO_UNIQUE_SOLUTION} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!U.isUpperTriangular()) {
					throw new Error(INVALID_UPPER_TRIANGULAR_MATRIX);
				}

				if (!U.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				const size = U.size()[0];

				const _y$size = y.size();
				const _y$size2 = _slicedToArray(_y$size, 2);
				const yrow = _y$size2[0];
				const ycol = _y$size2[1];

				const matrixU = U._matrix;
				const matrixY = y._matrix;

				if (yrow !== size || ycol !== 1) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const EPSILON = 1 / (10 ** U._digit * 2);

				for (let i = 0; i < size; i++) {
					if (Math.abs(matrixU[i][i]) < EPSILON) {
						throw new Error(NO_UNIQUE_SOLUTION);
					}
				}

				const coefficients = empty(size, 1);

				for (let _i2 = size - 1; _i2 >= 0; _i2--) {
					let summation = 0;

					for (let j = _i2 + 1; j < size; j++) {
						summation += coefficients[j][0] * matrixU[_i2][j];
					}

					coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixU[_i2][_i2];
				}

				return new this(coefficients);
			}

			module.exports = backward;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js':
		/*! ****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js ***!
  \****************************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const empty = __webpack_require__(/*! ../../util/empty */ './node_modules/@rayyamhk/matrix/lib/util/empty.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {INVALID_LOWER_TRIANGULAR_MATRIX} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
			const {SIZE_INCOMPATIBLE} = _require;
			const {NO_UNIQUE_SOLUTION} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!L.isLowerTriangular()) {
					throw new Error(INVALID_LOWER_TRIANGULAR_MATRIX);
				}

				if (!L.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				const size = L.size()[0];

				const _y$size = y.size();
				const _y$size2 = _slicedToArray(_y$size, 2);
				const yrow = _y$size2[0];
				const ycol = _y$size2[1];

				const matrixL = L._matrix;
				const matrixY = y._matrix;

				if (size !== yrow || ycol !== 1) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const EPSILON = 1 / (10 ** L._digit * 2);

				for (let i = 0; i < size; i++) {
					if (Math.abs(matrixL[i][i]) < EPSILON) {
						throw new Error(NO_UNIQUE_SOLUTION);
					}
				}

				const coefficients = empty(size, 1);

				for (let _i2 = 0; _i2 < size; _i2++) {
					let summation = 0;

					for (let j = 0; j < _i2; j++) {
						summation += coefficients[j][0] * matrixL[_i2][j];
					}

					coefficients[_i2][0] = (matrixY[_i2][0] - summation) / matrixL[_i2][_i2];
				}

				return new this(coefficients);
			}

			module.exports = forward;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js':
		/*! **************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js ***!
  \**************************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {NO_UNIQUE_SOLUTION} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
			const {SIZE_INCOMPATIBLE} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!A.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const aRow = _A$size2[0];
				const aCol = _A$size2[1];

				const _b$size = b.size();
				const _b$size2 = _slicedToArray(_b$size, 2);
				const bRow = _b$size2[0];
				const bCol = _b$size2[1];

				if (aCol !== bRow || bCol !== 1) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const EPSILON = 1 / (10 ** A._digit * 2);

				const _this$LU = this.LU(A, true);
				const _this$LU2 = _slicedToArray(_this$LU, 2);
				const P = _this$LU2[0];
				const LU = _this$LU2[1];

				const matrixLU = LU._matrix;
				const matrixB = b._matrix;

				for (let i = aRow - 1; i >= 0; i--) {
					if (Math.abs(matrixLU[i][i]) < EPSILON) {
						throw new Error(NO_UNIQUE_SOLUTION);
					}
				}

				const clonedVector = new Array(bRow);
				const coefficients = new Array(bRow);

				for (let _i2 = 0; _i2 < bRow; _i2++) {
					clonedVector[_i2] = matrixB[P[_i2]][0];
				}

				for (let _i3 = 0; _i3 < aRow; _i3++) {
					let summation = 0;

					for (let j = 0; j < _i3; j++) {
						summation += coefficients[j] * matrixLU[_i3][j];
					}

					coefficients[_i3] = clonedVector[_i3] - summation;
				}

				for (let _i4 = aRow - 1; _i4 >= 0; _i4--) {
					let _summation = 0;

					for (let _j = _i4 + 1; _j < aRow; _j++) {
						_summation += matrixLU[_i4][_j] * clonedVector[_j];
					}

					clonedVector[_i4] = (coefficients[_i4] - _summation) / matrixLU[_i4][_i4];
				}

				for (let _i5 = 0; _i5 < bRow; _i5++) {
					coefficients[_i5] = [clonedVector[_i5]];
				}

				return new this(coefficients);
			}

			module.exports = solve;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/add.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/add.js ***!
  \******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {SIZE_INCOMPATIBLE} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const _B$size = B.size();
				const _B$size2 = _slicedToArray(_B$size, 2);
				const row2 = _B$size2[0];
				const col2 = _B$size2[1];

				if (row !== row2 || col !== col2) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const matrix1 = A._matrix;
				const matrix2 = B._matrix;
				return this.generate(row, col, (i, j) => matrix1[i][j] + matrix2[i][j]);
			}

			module.exports = add;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js':
		/*! **********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js ***!
  \**********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
			const {SINGULAR_MATRIX} = _require;

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!A.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				const size = A.size()[0];

				if (size === 0) {
					// inverse of 0x0 matrix is itself
					return new Matrix([]);
				}

				const EPSILON = 1 / (10 ** A._digit * 2);

				const inv = this.identity(size)._matrix;

				const clone = this.clone(A)._matrix;

				const permutation = initPermutation(size); // iterate each column

				for (let j = 0; j < size; j++) {
					let pivotIdx = j;
					let pivot = clone[permutation[j]][j];

					while (Math.abs(pivot) < EPSILON && pivotIdx < size - 1) {
						pivotIdx++;
						pivot = clone[permutation[pivotIdx]][j];
					}

					if (Math.abs(pivot) < EPSILON) {
						throw new Error(SINGULAR_MATRIX);
					}

					if (j !== pivotIdx) {
						const temp = permutation[j];
						permutation[j] = permutation[pivotIdx];
						permutation[pivotIdx] = temp;
					}

					const pivotRow = permutation[j]; // the pivot is guaranteed to be non-zero

					for (let i = 0; i < size; i++) {
						const ith = permutation[i];

						if (i === j) {
							for (let k = 0; k < size; k++) {
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
							const factor = clone[ith][j] / pivot;

							for (let _k = 0; _k < size; _k++) {
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

				for (let _i = 0; _i < size; _i++) {
					clone[_i] = inv[permutation[_i]];
				}

				return new this(clone);
			}

			function initPermutation(size) {
				const permutation = new Array(size);

				for (let i = 0; i < size; i++) {
					permutation[i] = i;
				}

				return permutation;
			}

			module.exports = inverse;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js':
		/*! ***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js ***!
  \***********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const empty = __webpack_require__(/*! ../../util/empty */ './node_modules/@rayyamhk/matrix/lib/util/empty.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {SIZE_INCOMPATIBLE} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const Arow = _A$size2[0];
				const Acol = _A$size2[1];

				const _B$size = B.size();
				const _B$size2 = _slicedToArray(_B$size, 2);
				const Brow = _B$size2[0];
				const Bcol = _B$size2[1];

				if (Acol !== Brow) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const matrixA = A._matrix;
				const matrixB = B._matrix;
				const result = empty(Arow, Bcol);

				for (let i = 0; i < Arow; i++) {
					for (let j = 0; j < Bcol; j++) {
						result[i][j] = 0;

						for (let k = 0; k < Brow; k++) {
							result[i][j] += matrixA[i][k] * matrixB[k][j];
						}
					}
				}

				return new this(result);
			}

			module.exports = multiply;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/pow.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/pow.js ***!
  \******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
			const {INVALID_EXPONENT} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!A.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				if (!Number.isInteger(exponent) || exponent < 0) {
					throw new Error(INVALID_EXPONENT);
				}

				const size = A.size()[0];

				if (exponent === 0) {
					return this.identity(size);
				}

				if (exponent === 1) {
					return this.clone(A);
				}

				if (exponent % 2 === 0) {
					const _temp = this.pow(A, exponent / 2);

					return this.multiply(_temp, _temp);
				}

				const temp = this.pow(A, (exponent - 1) / 2);
				return this.multiply(this.multiply(temp, temp), A);
			}

			module.exports = pow;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js':
		/*! ***********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js ***!
  \***********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {SIZE_INCOMPATIBLE} = _require;
			const {INVALID_MATRIX} = _require;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const _B$size = B.size();
				const _B$size2 = _slicedToArray(_B$size, 2);
				const row2 = _B$size2[0];
				const col2 = _B$size2[1];

				if (row !== row2 || col !== col2) {
					throw new Error(SIZE_INCOMPATIBLE);
				}

				const matrix1 = A._matrix;
				const matrix2 = B._matrix;
				return this.generate(row, col, (i, j) => matrix1[i][j] - matrix2[i][j]);
			};
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js':
		/*! ************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js ***!
  \************************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_MATRIX} = _require;
			/**
 * Find the transpose of a matrix.
 * @memberof Matrix
 * @static
 * @param { Matrix } A - Any Matrix
 * @returns { Matrix } Returns transpose of A
 */

			function transpose(A) {
				if (!(A instanceof this)) {
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const matrix = A._matrix;
				return this.generate(col, row, (i, j) => matrix[j][i]);
			}

			module.exports = transpose;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/cond.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/cond.js ***!
  \*******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const {INVALID_P_NORM} = _require;
			const {SINGULAR_MATRIX} = _require;
			const {INVALID_SQUARE_MATRIX} = _require;
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
				const p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

				if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
					throw new Error(INVALID_P_NORM);
				}

				if (!this.isSquare()) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				try {
					const inverse = Matrix.inverse(this);
					return inverse.norm(p) * this.norm(p);
				} catch (error) {
					if (error.message === SINGULAR_MATRIX) {
						return Infinity;
					}

					throw error;
				}
			}

			module.exports = cond;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/det.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/det.js ***!
  \******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			/* eslint-disable prefer-destructuring */
			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
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

				const matrix = this._matrix;
				const size = matrix.length;

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

				const _Matrix$LU = Matrix.LU(this, true);
				const _Matrix$LU2 = _slicedToArray(_Matrix$LU, 2);
				const P = _Matrix$LU2[0];
				const LU = _Matrix$LU2[1];

				const matrixLU = LU._matrix; // count whether the number of permutations <swap> is odd or even
				// O(n^2)

				let swap = 0;

				for (let i = 0; i < size; i++) {
					if (P[i] === i) {
						continue;
					}

					while (P[i] !== i) {
						const target = P[i];
						P[i] = P[target];
						P[target] = target;
						swap++;
					}
				}

				let result = 1;

				for (let _i2 = 0; _i2 < size; _i2++) {
					result *= matrixLU[_i2][_i2];
				}

				if (swap % 2 === 1) {
					this._det = result * -1;
					return this._det;
				}

				this._det = result;
				return result;
			}

			module.exports = det;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js':
		/*! **************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js ***!
  \**************************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			// reference: https://people.inf.ethz.ch/arbenz/ewp/Lnotes/chapter4.pdf
			const Complex = __webpack_require__(/*! @rayyamhk/complex */ './node_modules/@rayyamhk/complex/lib/index.js');

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
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

				const size = this.size()[0];
				const values = [];
				const digit = this._digit;
				const EPSILON = 1 / (10 ** digit * 2);

				const clone = Matrix.clone(this)._matrix;

				let isConvergent = true; // flag

				let skip = false; // Transform matrix to Hessenberg matrix

				HouseholderTransform(clone, digit);

				for (let i = size - 1; i > 0; i--) {
					let divergenceCount = 0;
					let prev = void 0; // used to determine convergence
					// if obtains complex eigenvalues pair in previous iteration, skip current round

					if (skip) {
						skip = false;
						continue;
					}

					const shift = clone[size - 1][size - 1];

					while (true) {
						if (isConvergent) {
							// if the current eigenvalue is real
							prev = Math.abs(clone[i][i - 1]);
						} else {
							// if the current eigenvalue is not real
							prev = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]).metric;
						} // apply single shift

						for (let j = 0; j < size; j++) {
							clone[j][j] -= shift;
						} // Apply QR Algorithm

						HessenbergQR(clone, digit);

						for (let _j = 0; _j < size; _j++) {
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

						const _size2Eigenvalues = size2Eigenvalues(clone[i - 1][i - 1], clone[i - 1][i], clone[i][i - 1], clone[i][i]);
						const metric = _size2Eigenvalues.metric;
						const eigen1 = _size2Eigenvalues.eigen1;
						const eigen2 = _size2Eigenvalues.eigen2;

						if (!isConvergent && Math.abs(prev - metric) < EPSILON) {
							isConvergent = true; // re-initialize

							skip = true;
							const re1 = eigen1.re;
							const im1 = eigen1.im;
							const re2 = eigen2.re;
							const im2 = eigen2.im;
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

			function HouseholderTransform(A, digit) {
				const size = A.length;
				const EPSILON = 1 / (10 ** digit * 2);

				for (let j = 0; j < size - 2; j++) {
					let xNorm = 0;
					const u = new Array(size - j - 1);

					for (let i = j + 1; i < size; i++) {
						const entry = A[i][j];
						xNorm += entry ** 2;
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

					let uNorm = 0;

					for (const element of u) {
						uNorm += element ** 2;
					}

					uNorm = Math.sqrt(uNorm);

					for (let _i2 = 0; _i2 < u.length; _i2++) {
						u[_i2] /= uNorm;
					} // update the matrix, multiply P from left

					for (let n = j; n < size; n++) {
						// column
						const v = new Array(size - j - 1);

						for (let m = j + 1; m < size; m++) {
							v[m - j - 1] = A[m][n];
						}

						let scaler = 0;

						for (const [_m, element] of v.entries()) {
							scaler += element * u[_m];
						}

						scaler *= 2;

						for (let _m2 = j + 1; _m2 < size; _m2++) {
							// row
							A[_m2][n] = n === j && _m2 !== j + 1 ? 0 : v[_m2 - j - 1] - scaler * u[_m2 - j - 1];
						}
					} // update the matrix, multiply P from right

					for (let _m3 = 0; _m3 < size; _m3++) {
						// row
						const _v = new Array(size - j - 1);

						for (let _n = j + 1; _n < size; _n++) {
							_v[_n - j - 1] = A[_m3][_n];
						}

						let _scaler = 0;

						for (const [_n2, element] of _v.entries()) {
							_scaler += element * u[_n2];
						}

						_scaler *= 2;

						for (let _n3 = j + 1; _n3 < size; _n3++) {
							// column
							A[_m3][_n3] = _v[_n3 - j - 1] - _scaler * u[_n3 - j - 1];
						}
					}
				}
			}

			function HessenbergQR(H, digit) {
				const size = H.length;
				const EPSILON = 1 / (10 ** digit * 2);
				const sincos = new Array(size - 1);

				for (let i = 0; i < size - 1; i++) {
					const a = H[i][i];
					const c = H[i + 1][i];
					const norm = Math.hypot(a, c);

					if (norm < EPSILON) {
						continue;
					}

					const cos = a / norm;
					const sin = c * -1 / norm;
					sincos[i] = [sin, cos];
					const row1 = new Array(size - i);
					const row2 = new Array(size - i);

					for (let j = i; j < size; j++) {
						row1[j - i] = H[i][j];
						row2[j - i] = H[i + 1][j];
					}

					for (let _j2 = i; _j2 < size; _j2++) {
						H[i][_j2] = cos * row1[_j2 - i] + sin * -1 * row2[_j2 - i];

						if (i === _j2) {
							H[i + 1][_j2] = 0;
						} else {
							H[i + 1][_j2] = sin * row1[_j2 - i] + cos * row2[_j2 - i];
						}
					}
				}

				for (let _j3 = 0; _j3 < size - 1; _j3++) {
					if (!sincos[_j3]) {
						continue;
					}

					const _sincos$_j = _slicedToArray(sincos[_j3], 2);
					const _sin = _sincos$_j[0];
					const _cos = _sincos$_j[1];

					const col1 = new Array(_j3 + 2);
					const col2 = new Array(_j3 + 2);

					for (let _i3 = 0; _i3 <= _j3 + 1; _i3++) {
						col1[_i3] = H[_i3][_j3];
						col2[_i3] = H[_i3][_j3 + 1];
					}

					for (let _i4 = 0; _i4 <= _j3 + 1; _i4++) {
						H[_i4][_j3] = col1[_i4] * _cos - col2[_i4] * _sin;
						H[_i4][_j3 + 1] = col1[_i4] * _sin + col2[_i4] * _cos;
					}
				}
			} // find the eigenvalues of 2x2 matrix

			function size2Eigenvalues(e11, e12, e21, e22) {
				const b = (e11 + e22) * -1;
				const c = e11 * e22 - e21 * e12;
				const delta = b ** 2 - 4 * c;
				let re1;
				let im1;
				let re2;
				let im2;

				if (delta >= 0) {
					im1 = 0;
					im2 = 0;

					re1 = b >= 0 ? (b * -1 - Math.sqrt(delta)) / 2 : (b * -1 + Math.sqrt(delta)) / 2;

					re2 = c / re1;
				} else {
					re1 = -b / 2;
					re2 = re1;
					im1 = Math.sqrt(delta * -1) / 2;
					im2 = im1 * -1;
				}

				return {
					metric: Math.hypot(re1, im1),
					eigen1: {
						re: re1,
						im: im1,
					},
					eigen2: {
						re: re2,
						im: im2,
					},
				};
			}

			module.exports = eigenvalues;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/norm.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/norm.js ***!
  \*******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_P_NORM = _require.INVALID_P_NORM;
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
				const p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				if (p !== 1 && p !== 2 && p !== Infinity && p !== 'F') {
					throw new Error(INVALID_P_NORM);
				}

				const matrix = this._matrix;
				let result = 0;

				if (p === 1) {
					// max of column sum
					for (let j = 0; j < col; j++) {
						let columnSum = 0;

						for (let i = 0; i < row; i++) {
							columnSum += Math.abs(matrix[i][j]);
						}

						if (columnSum > result) {
							result = columnSum;
						}
					}

					return result;
				} // largest singular value

				if (p === 2) {
					const transpose = Matrix.transpose(this);
					const M = Matrix.multiply(transpose, this);
					const eigenvalues = M.eigenvalues();

					for (const eigenvalue of eigenvalues) {
						const value = eigenvalue.getModulus();

						if (value > result) {
							result = value;
						}
					}

					return Math.sqrt(result);
				}

				if (p === Infinity) {
					// max of row sum
					for (let _i3 = 0; _i3 < row; _i3++) {
						let rowSum = 0;

						for (let _j = 0; _j < col; _j++) {
							rowSum += Math.abs(matrix[_i3][_j]);
						}

						if (rowSum > result) {
							result = rowSum;
						}
					}

					return result;
				} // F

				for (let _i4 = 0; _i4 < row; _i4++) {
					for (let _j2 = 0; _j2 < col; _j2++) {
						result += matrix[_i4][_j2] ** 2;
					}
				}

				return Math.sqrt(result);
			}

			module.exports = norm;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js':
		/*! **********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js ***!
  \**********************************************************************/
		/***/ (module => {
			'use strict';

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

				const col = this.size()[1];
				const rank = this.rank();
				this._nullity = col - rank;
				return this._nullity;
			}

			module.exports = nullity;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/rank.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/rank.js ***!
  \*******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');
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

				const EPSILON = 1 / (10 ** this._digit * 2);
				const R = Matrix.QR(this)[1];
				const matrixR = R._matrix;

				const _R$size = R.size();
				const _R$size2 = _slicedToArray(_R$size, 2);
				const row = _R$size2[0];
				const col = _R$size2[1];

				if (row === 0) {
					this._rank = 1;
					return 1;
				}

				let rk = 0;

				for (let i = 0; i < row; i++) {
					for (let j = i; j < col; j++) {
						if (Math.abs(matrixR[i][j]) >= EPSILON) {
							rk++;
							break;
						}
					}
				}

				this._rank = rk;
				return rk;
			}

			module.exports = rank;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/size.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/size.js ***!
  \*******************************************************************/
		/***/ (module => {
			'use strict';

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

				const A = this._matrix;

				if (A.length === 0) {
					this._size = [0, 0];
					return this._size;
				}

				this._size = [A.length, A[0].length];
				return this._size;
			}

			module.exports = size;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/properties/trace.js':
		/*! ********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/properties/trace.js ***!
  \********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
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
				const isSquare = this._isSquare === undefined ? this.isSquare() : this._isSquare;

				if (!isSquare) {
					throw new Error(INVALID_SQUARE_MATRIX);
				}

				if (this._trace !== undefined) {
					return this._trace;
				}

				const A = this._matrix;
				const size = A.length;
				let tr = 0;

				for (let i = 0; i < size; i++) {
					tr += A[i][i];
				}

				this._trace = tr;
				return tr;
			}

			module.exports = trace;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js':
		/*! ************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js ***!
  \************************************************************************/
		/***/ (module => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isDiagonal !== undefined) {
					return this._isDiagonal;
				}

				const EPSILON = 1 / (10 ** digit * 2);
				const A = this._matrix;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				if (row === 0) {
					this._isDiagonal = true;
					return true;
				}

				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
						if (i !== j && Math.abs(A[i][j]) >= EPSILON) {
							this.isDiagonal = false;
							return false;
						}
					}
				}

				this._isDiagonal = true;
				return true;
			}

			module.exports = isDiagonal;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js':
		/*! *******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js ***!
  \*******************************************************************************/
		/***/ (module => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isLowerTriangular !== undefined) {
					return this._isLowerTriangular;
				}

				const EPSILON = 1 / (10 ** digit * 2);
				const A = this._matrix;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				if (row === 0) {
					// []
					this._isLowerTriangular = true;
					return true;
				}

				for (let i = 0; i < row; i++) {
					for (let j = i + 1; j < col; j++) {
						if (Math.abs(A[i][j]) >= EPSILON) {
							this._isLowerTriangular = false;
							return false;
						}
					}
				}

				this._isLowerTriangular = true;
				return true;
			}

			module.exports = isLowerTriangular;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js':
		/*! **************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js ***!
  \**************************************************************************/
		/***/ (module => {
			'use strict';

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isOrthogonal !== undefined) {
					return this._isOrthogonal;
				}

				if (!this.isSquare()) {
					this._isOrthogonal = false;
					return false;
				}

				const A = this._matrix;
				const EPSILON = 1 / (10 ** digit * 2);
				const size = A.length;

				for (let i = 0; i < size; i++) {
					for (let j = i; j < size; j++) {
						let entry = 0;

						for (let k = 0; k < size; k++) {
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

			module.exports = isOrthogonal;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js':
		/*! *****************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js ***!
  \*****************************************************************************/
		/***/ (module => {
			'use strict';

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isSkewSymmetric !== undefined) {
					return this._isSkewSymmetric;
				}

				if (!this.isSquare()) {
					this._isSkewSymmetric = false;
					return false;
				}

				const A = this._matrix;
				const EPSILON = 1 / (10 ** digit * 2);
				const size = A.length;

				if (size === 0) {
					this._isSkewSymmetric = true;
					return true; // []
				}

				for (let i = 0; i < size; i++) {
					for (let j = 0; j < i; j++) {
						if (Math.abs(A[i][j] + A[j][i]) >= EPSILON) {
							this._isSkewSymmetric = false;
							return false;
						}
					}
				}

				this._isSkewSymmetric = true;
				return true;
			}

			module.exports = isSkewSymmetric;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js':
		/*! **********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js ***!
  \**********************************************************************/
		/***/ (module => {
			'use strict';

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

				const A = this._matrix;

				if (A.length === 0) {
					// 0x0 matrix
					this._isSquare = true;
					return true;
				}

				this._isSquare = A.length === A[0].length;
				return this._isSquare;
			}

			module.exports = isSquare;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js':
		/*! *************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js ***!
  \*************************************************************************/
		/***/ (module => {
			'use strict';

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isSymmetric !== undefined) {
					return this._isSymmetric;
				}

				if (!this.isSquare()) {
					return false;
				}

				const A = this._matrix;
				const EPSILON = 1 / (10 ** digit * 2);
				const size = A.length;

				for (let i = 0; i < size; i++) {
					for (let j = 0; j <= i; j++) {
						if (Math.abs(A[i][j] - A[j][i]) >= EPSILON) {
							this._isSymmetric = false;
							return false;
						}
					}
				}

				this._isSymmetric = true;
				return true;
			}

			module.exports = isSymmetric;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js':
		/*! *******************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js ***!
  \*******************************************************************************/
		/***/ (module => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

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
				const digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._digit;

				if (this._isUpperTriangular !== undefined) {
					return this._isUpperTriangular;
				}

				const EPSILON = 1 / (10 ** digit * 2);
				const A = this._matrix;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				if (row === 0) {
					// []
					this._isUpperTriangular = true;
					return true;
				}

				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
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

			module.exports = isUpperTriangular;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/clone.js':
		/*! ***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/clone.js ***!
  \***************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
			/**
 * Creates a copy of Matrix. Note that it resets the cached data.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {Matrix} Copy of A
 */

			function clone(A) {
				if (!(A instanceof this)) {
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const matrix = A._matrix;
				return this.generate(row, col, (i, j) => matrix[i][j]);
			}

			module.exports = clone;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/column.js':
		/*! ****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/column.js ***!
  \****************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_ROW_COL = _require.INVALID_ROW_COL;
			const OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN;
			const INVALID_MATRIX = _require.INVALID_MATRIX;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!Number.isInteger(index) || index < 0) {
					throw new Error(INVALID_ROW_COL);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const r = _A$size2[0];
				const c = _A$size2[1];

				if (index >= c) {
					throw new Error(OVERFLOW_COLUMN);
				}

				const matrix = A._matrix;
				return this.generate(r, 1, i => matrix[i][index]);
			}

			module.exports = column;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/diag.js':
		/*! **************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/diag.js ***!
  \**************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const Matrix = __webpack_require__(/*! ../.. */ './node_modules/@rayyamhk/matrix/lib/index.js');

			const isNumber = __webpack_require__(/*! ../../util/isNumber */ './node_modules/@rayyamhk/matrix/lib/util/isNumber.js');

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_ARRAY = _require.INVALID_ARRAY;
			const EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES = _require.EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES;
			const INVALID_SQUARE_MATRIX = _require.INVALID_SQUARE_MATRIX;
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
					throw new TypeError(INVALID_ARRAY);
				}

				const argsNum = values.length;
				let variant;

				for (let i = 0; i < argsNum; i++) {
					const entry = values[i];

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
					return Matrix.generate(argsNum, argsNum, (i, j) => {
						if (i === j) {
							return values[i];
						}

						return 0;
					});
				} // Guaranteed that [values] is a list of square matrices

				let size = 0;
				const temp = new Array(argsNum);

				for (let _i = 0; _i < argsNum; _i++) {
					const _len = values[_i].size()[0];

					size += _len;
					temp[_i] = _len;
				}

				let idx = 0;
				let start = 0;
				let len = temp[idx];
				return Matrix.generate(size, size, (i, j) => {
					if (i - start === len && j - start === len) {
						start += len;
						idx++;
					}

					const ith = i - start; // ith < 0 if below main diagonal

					const jth = j - start; // jth < 0 if above main diagonal
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

			module.exports = diag;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js':
		/*! *********************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js ***!
  \*********************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const matrix = A._matrix;
				return this.generate(row, col, (i, j) => cb(matrix[i][j]));
			}

			module.exports = elementwise;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/entry.js':
		/*! ***************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/entry.js ***!
  \***************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_ROW_COL = _require.INVALID_ROW_COL;
			const OVERFLOW_INDEX = _require.OVERFLOW_INDEX;
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

				const A = this._matrix;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const r = _this$size2[0];
				const c = _this$size2[1];

				if (row >= r || col >= c) {
					throw new Error(OVERFLOW_INDEX);
				}

				return A[row][col];
			}

			module.exports = entry;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js':
		/*! *****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js ***!
  \*****************************************************************/
		/***/ (module => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			/**
 * Flatten the matrix to an array
 * @memberof Matrix
 * @instance
 * @returns {Array} A flatten array
 */
			function flatten() {
				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				const length = row * col;
				const arr = new Array(length);

				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
						arr[i * col + j] = this._matrix[i][j];
					}
				}

				return arr;
			}

			module.exports = flatten;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js ***!
  \*******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const SIZE_INCOMPATIBLE = _require.SIZE_INCOMPATIBLE;
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

				return this.generate(row, col, (i, j) => arr[i * col + j]);
			}

			module.exports = fromArray;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/generate.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/generate.js ***!
  \******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const empty = __webpack_require__(/*! ../../util/empty */ './node_modules/@rayyamhk/matrix/lib/util/empty.js');
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
				const matrix = empty(row, col);

				if (row === 0 || col === 0) {
					return new this([]);
				}

				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
						matrix[i][j] = cb(i, j);
					}
				}

				return new this(matrix);
			}

			module.exports = generate;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js':
		/*! *****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js ***!
  \*****************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
			/**
 * Gets the entries on the main diagonal.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @returns {number[]} Array of entries of A on the main diagonal
 */

			function getDiag(A) {
				if (!(A instanceof this)) {
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				const size = Math.min(row, col);
				const matrix = A._matrix;
				const diags = new Array(size);

				for (let i = 0; i < size; i++) {
					diags[i] = matrix[i][i];
				}

				return diags;
			}

			module.exports = getDiag;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js':
		/*! *************************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js ***!
  \*************************************************************************/
		/***/ (module => {
			'use strict';

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
				const min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				const max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
				const toFixed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
				return this.generate(row, col, () => Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed)));
			}

			module.exports = getRandomMatrix;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/identity.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/identity.js ***!
  \******************************************************************/
		/***/ (module => {
			'use strict';

			/**
 * Generates identity Matrix with given size.
 * @memberof Matrix
 * @static
 * @param {number} size - The size of Matrix
 * @returns {Matrix} Identity Matrix
 */
			function identity(size) {
				return this.generate(size, size, (i, j) => {
					if (i === j) {
						return 1;
					}

					return 0;
				});
			}

			module.exports = identity;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js':
		/*! *****************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js ***!
  \*****************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
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
				const digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

				if (!(A instanceof this) || !(B instanceof this)) {
					throw new TypeError(INVALID_MATRIX);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const Arow = _A$size2[0];
				const Acol = _A$size2[1];

				const _B$size = B.size();
				const _B$size2 = _slicedToArray(_B$size, 2);
				const Brow = _B$size2[0];
				const Bcol = _B$size2[1];

				if (Arow !== Brow || Acol !== Bcol) {
					return false;
				}

				const EPISILON = 1 / (10 ** digit * 2);
				const matrixA = A._matrix;
				const matrixB = B._matrix;

				for (let i = 0; i < Arow; i++) {
					for (let j = 0; j < Acol; j++) {
						if (Math.abs(matrixA[i][j] - matrixB[i][j]) >= EPISILON) {
							return false;
						}
					}
				}

				return true;
			}

			module.exports = isEqual;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/row.js':
		/*! *************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/row.js ***!
  \*************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_ROW_COL = _require.INVALID_ROW_COL;
			const OVERFLOW_ROW = _require.OVERFLOW_ROW;
			const INVALID_MATRIX = _require.INVALID_MATRIX;
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
					throw new TypeError(INVALID_MATRIX);
				}

				if (!Number.isInteger(index) || index < 0) {
					throw new Error(INVALID_ROW_COL);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const r = _A$size2[0];
				const c = _A$size2[1];

				if (index >= r) {
					throw new Error(OVERFLOW_ROW);
				}

				const matrix = A._matrix;
				return this.generate(1, c, (i, j) => matrix[index][j]);
			}

			module.exports = row;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js':
		/*! *******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js ***!
  \*******************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			function _typeof(obj) {
				'@babel/helpers - typeof'; _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
					? function _typeof(obj) {
						return typeof obj;
					}
					: function _typeof(obj) {
						return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
					};

				return _typeof(obj);
			}

			const _require = __webpack_require__(/*! ../../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
			const EXPECTED_STRING_NUMBER_AT_POS_1_2 = _require.EXPECTED_STRING_NUMBER_AT_POS_1_2;
			const INVALID_ROW = _require.INVALID_ROW;
			const INVALID_COLUMN = _require.INVALID_COLUMN;
			const OVERFLOW_ROW = _require.OVERFLOW_ROW;
			const INVALID_ROWS_EXPRESSION = _require.INVALID_ROWS_EXPRESSION;
			const INVALID_COLUMNS_EXPRESSION = _require.INVALID_COLUMNS_EXPRESSION;
			const OVERFLOW_COLUMN = _require.OVERFLOW_COLUMN;
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
					throw new TypeError(INVALID_MATRIX);
				}

				const arg1Type = _typeof(rows);

				const arg2Type = _typeof(cols);

				if (arg1Type !== 'string' && arg1Type !== 'number' || arg2Type !== 'string' && arg2Type !== 'number') {
					throw new Error(EXPECTED_STRING_NUMBER_AT_POS_1_2);
				}

				const _A$size = A.size();
				const _A$size2 = _slicedToArray(_A$size, 2);
				const row = _A$size2[0];
				const col = _A$size2[1];

				let rowStart;
				let rowEnd;
				let colStart;
				let colEnd;

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
					const arg = rows.split(':');

					if (arg.length !== 2) {
						throw new Error(INVALID_ROWS_EXPRESSION);
					}

					const _arg = _slicedToArray(arg, 2);
					const r1 = _arg[0];
					const r2 = _arg[1];

					if (r1 === '') {
						rowStart = 0;
					} else {
						const r = Number(r1);

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
						const _r = Number(r2);

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
					const _arg2 = cols.split(':');

					if (_arg2.length !== 2) {
						throw new Error(INVALID_COLUMNS_EXPRESSION);
					}

					const _arg3 = _slicedToArray(_arg2, 2);
					const c1 = _arg3[0];
					const c2 = _arg3[1];

					if (c1 === '') {
						colStart = 0;
					} else {
						const c = Number(c1);

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
						const _c = Number(c2);

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

				const matrix = A._matrix;
				const subRow = rowEnd - rowStart + 1;
				const subCol = colEnd - colStart + 1;
				const subMatrix = new Array(subRow);

				for (let i = rowStart; i <= rowEnd; i++) {
					const newRow = new Array(subCol);

					for (let j = colStart; j <= colEnd; j++) {
						newRow[j - colStart] = matrix[i][j];
					}

					subMatrix[i - rowStart] = newRow;
				}

				return new this(subMatrix);
			}

			module.exports = submatrix;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/toString.js':
		/*! ******************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/toString.js ***!
  \******************************************************************/
		/***/ (module => {
			'use strict';

			function _slicedToArray(arr, i) {
				return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
			}

			function _nonIterableRest() {
				throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
			}

			function _unsupportedIterableToArray(o, minLen) {
				if (!o) {
					return;
				}

				if (typeof o === 'string') {
					return _arrayLikeToArray(o, minLen);
				}

				let n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) {
					n = o.constructor.name;
				}

				if (n === 'Map' || n === 'Set') {
					return [...o];
				}

				if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
					return _arrayLikeToArray(o, minLen);
				}
			}

			function _arrayLikeToArray(arr, len) {
				if (len == null || len > arr.length) {
					len = arr.length;
				}

				for (var i = 0, arr2 = new Array(len); i < len; i++) {
					arr2[i] = arr[i];
				}

				return arr2;
			}

			function _iterableToArrayLimit(arr, i) {
				let _i = arr == null ? null : typeof Symbol !== 'undefined' && arr[Symbol.iterator] || arr['@@iterator']; if (_i == null) {
					return;
				}

				const _arr = []; let _n = true; let _d = false; let _s; let _e; try {
					for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
						_arr.push(_s.value); if (i && _arr.length === i) {
							break;
						}
					}
				} catch (error) {
					_d = true; _e = error;
				} finally {
					try {
						if (!_n && _i.return != null) {
							_i.return();
						}
					} finally {
						if (_d) {
							throw _e;
						}
					}
				}

				return _arr;
			}

			function _arrayWithHoles(arr) {
				if (Array.isArray(arr)) {
					return arr;
				}
			}

			/**
 * Gets the stringified Matrix
 * @memberof Matrix
 * @instance
 * @returns {string} Stringified Matrix
 */
			function toString() {
				const matrix = this._matrix;

				const _this$size = this.size();
				const _this$size2 = _slicedToArray(_this$size, 2);
				const row = _this$size2[0];
				const col = _this$size2[1];

				let str = '';

				for (let i = 0; i < row; i++) {
					for (let j = 0; j < col; j++) {
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

			module.exports = toString;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/core/utils/zero.js':
		/*! **************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/core/utils/zero.js ***!
  \**************************************************************/
		/***/ (module => {
			'use strict';

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
					return this.generate(row, row, () => 0);
				}

				return this.generate(row, col, () => 0);
			}

			module.exports = zero;
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/index.js':
		/*! ****************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/index.js ***!
  \****************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const isMatrix = __webpack_require__(/*! ./util/isMatrix */ './node_modules/@rayyamhk/matrix/lib/util/isMatrix.js');

			const _require = __webpack_require__(/*! ./Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_MATRIX = _require.INVALID_MATRIX;
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

			Matrix.prototype.isDiagonal = __webpack_require__(/*! ./core/structure/isDiagonal */ './node_modules/@rayyamhk/matrix/lib/core/structure/isDiagonal.js');
			Matrix.prototype.isSkewSymmetric = __webpack_require__(/*! ./core/structure/isSkewSymmetric */ './node_modules/@rayyamhk/matrix/lib/core/structure/isSkewSymmetric.js');
			Matrix.prototype.isSquare = __webpack_require__(/*! ./core/structure/isSquare */ './node_modules/@rayyamhk/matrix/lib/core/structure/isSquare.js');
			Matrix.prototype.isSymmetric = __webpack_require__(/*! ./core/structure/isSymmetric */ './node_modules/@rayyamhk/matrix/lib/core/structure/isSymmetric.js');
			Matrix.prototype.isLowerTriangular = __webpack_require__(/*! ./core/structure/isLowerTriangular */ './node_modules/@rayyamhk/matrix/lib/core/structure/isLowerTriangular.js');
			Matrix.prototype.isUpperTriangular = __webpack_require__(/*! ./core/structure/isUpperTriangular */ './node_modules/@rayyamhk/matrix/lib/core/structure/isUpperTriangular.js');
			Matrix.prototype.isOrthogonal = __webpack_require__(/*! ./core/structure/isOrthogonal */ './node_modules/@rayyamhk/matrix/lib/core/structure/isOrthogonal.js'); // property

			Matrix.prototype.cond = __webpack_require__(/*! ./core/properties/cond */ './node_modules/@rayyamhk/matrix/lib/core/properties/cond.js');
			Matrix.prototype.det = __webpack_require__(/*! ./core/properties/det */ './node_modules/@rayyamhk/matrix/lib/core/properties/det.js');
			Matrix.prototype.eigenvalues = __webpack_require__(/*! ./core/properties/eigenvalues */ './node_modules/@rayyamhk/matrix/lib/core/properties/eigenvalues.js');
			Matrix.prototype.nullity = __webpack_require__(/*! ./core/properties/nullity */ './node_modules/@rayyamhk/matrix/lib/core/properties/nullity.js');
			Matrix.prototype.norm = __webpack_require__(/*! ./core/properties/norm */ './node_modules/@rayyamhk/matrix/lib/core/properties/norm.js');
			Matrix.prototype.rank = __webpack_require__(/*! ./core/properties/rank */ './node_modules/@rayyamhk/matrix/lib/core/properties/rank.js');
			Matrix.prototype.size = __webpack_require__(/*! ./core/properties/size */ './node_modules/@rayyamhk/matrix/lib/core/properties/size.js');
			Matrix.prototype.trace = __webpack_require__(/*! ./core/properties/trace */ './node_modules/@rayyamhk/matrix/lib/core/properties/trace.js'); // operations

			Matrix.add = __webpack_require__(/*! ./core/operations/add */ './node_modules/@rayyamhk/matrix/lib/core/operations/add.js');
			Matrix.inverse = __webpack_require__(/*! ./core/operations/inverse */ './node_modules/@rayyamhk/matrix/lib/core/operations/inverse.js');
			Matrix.multiply = __webpack_require__(/*! ./core/operations/multiply */ './node_modules/@rayyamhk/matrix/lib/core/operations/multiply.js');
			Matrix.pow = __webpack_require__(/*! ./core/operations/pow */ './node_modules/@rayyamhk/matrix/lib/core/operations/pow.js');
			Matrix.subtract = __webpack_require__(/*! ./core/operations/subtract */ './node_modules/@rayyamhk/matrix/lib/core/operations/subtract.js');
			Matrix.transpose = __webpack_require__(/*! ./core/operations/transpose */ './node_modules/@rayyamhk/matrix/lib/core/operations/transpose.js'); // Linear-equations

			Matrix.backward = __webpack_require__(/*! ./core/linear-equations/backward */ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/backward.js');
			Matrix.forward = __webpack_require__(/*! ./core/linear-equations/forward */ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/forward.js');
			Matrix.solve = __webpack_require__(/*! ./core/linear-equations/solve */ './node_modules/@rayyamhk/matrix/lib/core/linear-equations/solve.js'); // decompositions

			Matrix.LU = __webpack_require__(/*! ./core/decompositions/LU */ './node_modules/@rayyamhk/matrix/lib/core/decompositions/LU.js');
			Matrix.QR = __webpack_require__(/*! ./core/decompositions/QR */ './node_modules/@rayyamhk/matrix/lib/core/decompositions/QR.js'); // utils

			Matrix.clone = __webpack_require__(/*! ./core/utils/clone */ './node_modules/@rayyamhk/matrix/lib/core/utils/clone.js');
			Matrix.column = __webpack_require__(/*! ./core/utils/column */ './node_modules/@rayyamhk/matrix/lib/core/utils/column.js');
			Matrix.diag = __webpack_require__(/*! ./core/utils/diag */ './node_modules/@rayyamhk/matrix/lib/core/utils/diag.js');
			Matrix.elementwise = __webpack_require__(/*! ./core/utils/elementwise */ './node_modules/@rayyamhk/matrix/lib/core/utils/elementwise.js');
			Matrix.generate = __webpack_require__(/*! ./core/utils/generate */ './node_modules/@rayyamhk/matrix/lib/core/utils/generate.js');
			Matrix.getDiag = __webpack_require__(/*! ./core/utils/getDiag */ './node_modules/@rayyamhk/matrix/lib/core/utils/getDiag.js');
			Matrix.getRandomMatrix = __webpack_require__(/*! ./core/utils/getRandomMatrix */ './node_modules/@rayyamhk/matrix/lib/core/utils/getRandomMatrix.js');
			Matrix.identity = __webpack_require__(/*! ./core/utils/identity */ './node_modules/@rayyamhk/matrix/lib/core/utils/identity.js');
			Matrix.isEqual = __webpack_require__(/*! ./core/utils/isEqual */ './node_modules/@rayyamhk/matrix/lib/core/utils/isEqual.js');
			Matrix.row = __webpack_require__(/*! ./core/utils/row */ './node_modules/@rayyamhk/matrix/lib/core/utils/row.js');
			Matrix.submatrix = __webpack_require__(/*! ./core/utils/submatrix */ './node_modules/@rayyamhk/matrix/lib/core/utils/submatrix.js');
			Matrix.zero = __webpack_require__(/*! ./core/utils/zero */ './node_modules/@rayyamhk/matrix/lib/core/utils/zero.js');
			Matrix.fromArray = __webpack_require__(/*! ./core/utils/fromArray */ './node_modules/@rayyamhk/matrix/lib/core/utils/fromArray.js');
			Matrix.prototype.flatten = __webpack_require__(/*! ./core/utils/flatten */ './node_modules/@rayyamhk/matrix/lib/core/utils/flatten.js');
			Matrix.prototype.entry = __webpack_require__(/*! ./core/utils/entry */ './node_modules/@rayyamhk/matrix/lib/core/utils/entry.js');
			Matrix.prototype.toString = __webpack_require__(/*! ./core/utils/toString */ './node_modules/@rayyamhk/matrix/lib/core/utils/toString.js');
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/util/empty.js':
		/*! *********************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/empty.js ***!
  \*********************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const _require = __webpack_require__(/*! ../Error */ './node_modules/@rayyamhk/matrix/lib/Error.js');
			const INVALID_ROW_COL = _require.INVALID_ROW_COL;

			module.exports = function empty(row, col) {
				if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
					throw new Error(INVALID_ROW_COL);
				}

				if (row === 0 || col === 0) {
					return [];
				}

				const matrix = new Array(row);

				for (let i = 0; i < row; i++) {
					matrix[i] = new Array(col);
				}

				return matrix;
			};
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/util/isMatrix.js':
		/*! ************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isMatrix.js ***!
  \************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			'use strict';

			const isNumber = __webpack_require__(/*! ./isNumber */ './node_modules/@rayyamhk/matrix/lib/util/isNumber.js');

			module.exports = function isMatrix(matrix) {
				if (!Array.isArray(matrix)) {
					return false;
				}

				const height = matrix.length;

				if (height === 0) {
					return true; // [] represents empty matrix (0 x 0 matrix)
				}

				const firstRow = matrix[0];

				if (!Array.isArray(firstRow)) {
					return false;
				}

				const width = firstRow.length;

				if (width === 0) {
					return false; // [ [] ] is not allowed
				}

				for (let i = 0; i < height; i++) {
					const row = matrix[i];

					if (!Array.isArray(row) || row.length !== width) {
						return false;
					}

					for (let j = 0; j < width; j++) {
						if (!isNumber(row[j])) {
							return false;
						}
					}
				}

				return true;
			};
			/***/}),

		/***/ './node_modules/@rayyamhk/matrix/lib/util/isNumber.js':
		/*! ************************************************************!*\
  !*** ./node_modules/@rayyamhk/matrix/lib/util/isNumber.js ***!
  \************************************************************/
		/***/ (module => {
			'use strict';

			module.exports = function isNumber(_int) {
				return Number.isFinite(_int);
			};
			/***/}),

		/***/ './node_modules/matrix-inverse/matrix-inverse.js':
		/*! *******************************************************!*\
  !*** ./node_modules/matrix-inverse/matrix-inverse.js ***!
  \*******************************************************/
		/***/ (module => {
			const Sylvester = {};

			Sylvester.Matrix = function () {};

			Sylvester.Matrix.create = function (elements) {
				const M = new Sylvester.Matrix();
				return M.setElements(elements);
			};

			Sylvester.Matrix.I = function (n) {
				const els = [];
				let i = n;
				let j;
				while (i--) {
					j = n;
					els[i] = [];
					while (j--) {
						els[i][j] = i === j ? 1 : 0;
					}
				}

				return Sylvester.Matrix.create(els);
			};

			Sylvester.Matrix.prototype = {
				dup: function () {
					return Sylvester.Matrix.create(this.elements);
				},

				isSquare: function () {
					const cols = this.elements.length === 0 ? 0 : this.elements[0].length;
					return this.elements.length === cols;
				},

				toRightTriangular: function () {
					if (this.elements.length === 0) {
						return Sylvester.Matrix.create([]);
					}

					const M = this.dup();
					let els;
					const n = this.elements.length;
					let i;
					let j;
					const np = this.elements[0].length;
					let p;
					for (i = 0; i < n; i++) {
						if (M.elements[i][i] === 0) {
							for (j = i + 1; j < n; j++) {
								if (M.elements[j][i] !== 0) {
									els = [];
									for (p = 0; p < np; p++) {
										els.push(M.elements[i][p] + M.elements[j][p]);
									}

									M.elements[i] = els;
									break;
								}
							}
						}

						if (M.elements[i][i] !== 0) {
							for (j = i + 1; j < n; j++) {
								const multiplier = M.elements[j][i] / M.elements[i][i];
								els = [];
								for (p = 0; p < np; p++) {
									// Elements with column numbers up to an including the number of the
									// row that we're subtracting can safely be set straight to zero,
									// since that's the point of this routine and it avoids having to
									// loop over and correct rounding errors later
									els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier);
								}

								M.elements[j] = els;
							}
						}
					}

					return M;
				},

				determinant: function () {
					if (this.elements.length === 0) {
						return 1;
					}

					if (!this.isSquare()) {
						return null;
					}

					const M = this.toRightTriangular();
					let det = M.elements[0][0];
					const n = M.elements.length;
					for (let i = 1; i < n; i++) {
						det *= M.elements[i][i];
					}

					return det;
				},

				isSingular: function () {
					return this.isSquare() && this.determinant() === 0;
				},

				augment: function (matrix) {
					if (this.elements.length === 0) {
						return this.dup();
					}

					let M = matrix.elements || matrix;
					if (M[0][0] === undefined) {
						M = Sylvester.Matrix.create(M).elements;
					}

					const T = this.dup();
					const cols = T.elements[0].length;
					let i = T.elements.length;
					const nj = M[0].length;
					let j;
					if (i !== M.length) {
						return null;
					}

					while (i--) {
						j = nj;
						while (j--) {
							T.elements[i][cols + j] = M[i][j];
						}
					}

					return T;
				},

				inverse: function () {
					if (this.elements.length === 0) {
						return null;
					}

					if (!this.isSquare() || this.isSingular()) {
						return null;
					}

					const n = this.elements.length;
					let i = n;
					let j;
					const M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular();
					const np = M.elements[0].length;
					let p;
					let els;
					let divisor;
					const inverse_elements = [];
					let new_element;
					// Sylvester.Matrix is non-singular so there will be no zeros on the
					// diagonal. Cycle through rows from last to first.
					while (i--) {
						// First, normalise diagonal elements to 1
						els = [];
						inverse_elements[i] = [];
						divisor = M.elements[i][i];
						for (p = 0; p < np; p++) {
							new_element = M.elements[i][p] / divisor;
							els.push(new_element);
							// Shuffle off the current row of the right hand side into the results
							// array as it will not be modified by later runs through this loop
							if (p >= n) {
								inverse_elements[i].push(new_element);
							}
						}

						M.elements[i] = els;
						// Then, subtract this row from those above it to give the identity matrix
						// on the left hand side
						j = i;
						while (j--) {
							els = [];
							for (p = 0; p < np; p++) {
								els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
							}

							M.elements[j] = els;
						}
					}

					return Sylvester.Matrix.create(inverse_elements);
				},

				setElements: function (els) {
					let i;
					let j;
					const elements = els.elements || els;
					if (elements[0] && elements[0][0] !== undefined) {
						i = elements.length;
						this.elements = [];
						while (i--) {
							j = elements[i].length;
							this.elements[i] = [];
							while (j--) {
								this.elements[i][j] = elements[i][j];
							}
						}

						return this;
					}

					const n = elements.length;
					this.elements = [];
					for (i = 0; i < n; i++) {
						this.elements.push([elements[i]]);
					}

					return this;
				},
			};

			module.exports = function (elements) {
				const mat = Sylvester.Matrix.create(elements).inverse();
				if (mat !== null) {
					return mat.elements;
				}

				return null;
			};
			/***/}),

		/***/ './node_modules/simple-linalg/index.js':
		/*! *********************************************!*\
  !*** ./node_modules/simple-linalg/index.js ***!
  \*********************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			module.exports = __webpack_require__(/*! ./lib/index.js */ './node_modules/simple-linalg/lib/index.js');
			/***/}),

		/***/ './node_modules/simple-linalg/lib/add.js':
		/*! ***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/add.js ***!
  \***********************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const elemWise = __webpack_require__(/*! ./elem-wise */ './node_modules/simple-linalg/lib/elem-wise.js');
			/**
* Add matrixes together
* @param {...Array.<Array.<Number>>} args list of matrix
* @returns {Array.<Array.<Number>>} sum
*/
			module.exports = function add(...args) {
				return elemWise(args, args2 => args2.reduce((a, b) => {
					if (a === null || b === null) {
						return null;
					}

					return a + b;
				}, 0));
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/cos-similarity.js':
		/*! **********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/cos-similarity.js ***!
  \**********************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const dotProduct = __webpack_require__(/*! ./dot-product.js */ './node_modules/simple-linalg/lib/dot-product.js');
			const norm = __webpack_require__(/*! ./norm.js */ './node_modules/simple-linalg/lib/norm.js');

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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/diag-block.js':
		/*! ******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag-block.js ***!
  \******************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const identity = __webpack_require__(/*! ./identity.js */ './node_modules/simple-linalg/lib/identity.js');

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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/diag.js':
		/*! ************************************************!*\
  !*** ./node_modules/simple-linalg/lib/diag.js ***!
  \************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const zeros = __webpack_require__(/*! ./zeros */ './node_modules/simple-linalg/lib/zeros.js');

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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/dot-product.js':
		/*! *******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/dot-product.js ***!
  \*******************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/elem-wise.js':
		/*! *****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/elem-wise.js ***!
  \*****************************************************/
		/***/ (module => {
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
				return arrayMatrixes[0].map((row, rowId) => row.map((cell, colId) => {
					const array = arrayMatrixes.map(m => m[rowId][colId]);
					return fn(array, rowId, colId);
				}));
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/euclidean-dist.js':
		/*! **********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/euclidean-dist.js ***!
  \**********************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/frobenius.js':
		/*! *****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/frobenius.js ***!
  \*****************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const trace = __webpack_require__(/*! ./trace.js */ './node_modules/simple-linalg/lib/trace.js');
			const transpose = __webpack_require__(/*! ./transpose.js */ './node_modules/simple-linalg/lib/transpose.js');
			const matSub = __webpack_require__(/*! ./subtract.js */ './node_modules/simple-linalg/lib/subtract.js');
			const matMul = __webpack_require__(/*! ./mat-mul.js */ './node_modules/simple-linalg/lib/mat-mul.js');
			const sum = __webpack_require__(/*! ./sum.js */ './node_modules/simple-linalg/lib/sum.js');

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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/identity.js':
		/*! ****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/identity.js ***!
  \****************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/index.js':
		/*! *************************************************!*\
  !*** ./node_modules/simple-linalg/lib/index.js ***!
  \*************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			module.exports = {
				add: __webpack_require__(/*! ./add.js */ './node_modules/simple-linalg/lib/add.js'),
				cosSimilarity: __webpack_require__(/*! ./cos-similarity */ './node_modules/simple-linalg/lib/cos-similarity.js'),
				euclideanDist: __webpack_require__(/*! ./euclidean-dist */ './node_modules/simple-linalg/lib/euclidean-dist.js'),
				diag: __webpack_require__(/*! ./diag.js */ './node_modules/simple-linalg/lib/diag.js'),
				diagBlock: __webpack_require__(/*! ./diag-block */ './node_modules/simple-linalg/lib/diag-block.js'),
				dotProduct: __webpack_require__(/*! ./dot-product */ './node_modules/simple-linalg/lib/dot-product.js'),
				elemWise: __webpack_require__(/*! ./elem-wise.js */ './node_modules/simple-linalg/lib/elem-wise.js'),
				frobenius: __webpack_require__(/*! ./frobenius.js */ './node_modules/simple-linalg/lib/frobenius.js'),
				identity: __webpack_require__(/*! ./identity.js */ './node_modules/simple-linalg/lib/identity.js'),
				invert: __webpack_require__(/*! ./invert.js */ './node_modules/simple-linalg/lib/invert.js'),
				mapMatrix: __webpack_require__(/*! ./map-matrix.js */ './node_modules/simple-linalg/lib/map-matrix.js'),
				matMul: __webpack_require__(/*! ./mat-mul.js */ './node_modules/simple-linalg/lib/mat-mul.js'),
				matPermutation: __webpack_require__(/*! ./mat-permutation.js */ './node_modules/simple-linalg/lib/mat-permutation.js'),
				padWithZeroCols: __webpack_require__(/*! ./pad-with-zero-cols.js */ './node_modules/simple-linalg/lib/pad-with-zero-cols.js'),
				subtract: __webpack_require__(/*! ./subtract.js */ './node_modules/simple-linalg/lib/subtract.js'),
				subSquareMatrix: __webpack_require__(/*! ./sub-square-matrix.js */ './node_modules/simple-linalg/lib/sub-square-matrix.js'),
				sum: __webpack_require__(/*! ./sum.js */ './node_modules/simple-linalg/lib/sum.js'),
				trace: __webpack_require__(/*! ./trace.js */ './node_modules/simple-linalg/lib/trace.js'),
				transpose: __webpack_require__(/*! ./transpose.js */ './node_modules/simple-linalg/lib/transpose.js'),
				zeros: __webpack_require__(/*! ./zeros.js */ './node_modules/simple-linalg/lib/zeros.js'),
				norm: __webpack_require__(/*! ./norm.js */ './node_modules/simple-linalg/lib/norm.js'),
				sumVector: __webpack_require__(/*! ./sum-vector.js */ './node_modules/simple-linalg/lib/sum-vector.js'),
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/invert.js':
		/*! **************************************************!*\
  !*** ./node_modules/simple-linalg/lib/invert.js ***!
  \**************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const matrixInverse = __webpack_require__(/*! matrix-inverse */ './node_modules/matrix-inverse/matrix-inverse.js');

			module.exports = function invert(m) {
				return matrixInverse(m);
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/map-matrix.js':
		/*! ******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/map-matrix.js ***!
  \******************************************************/
		/***/ (module => {
			/**
 * Maps a function over each element of the given matrix.
 * @param {Array<Array<any>>} a The matrix to map over.
 * @param {function(any, number, number): any} fn The mapping function to apply.
 * @returns {Array<Array<any>>} The matrix with the function applied to each element.
 */
			module.exports = function mapMatrix(a, fn) {
				return a.map((row, rowId) => row.map((cell, colId) => fn(cell, rowId, colId)));
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/mat-mul.js':
		/*! ***************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-mul.js ***!
  \***************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/mat-permutation.js':
		/*! ***********************************************************!*\
  !*** ./node_modules/simple-linalg/lib/mat-permutation.js ***!
  \***********************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/norm.js':
		/*! ************************************************!*\
  !*** ./node_modules/simple-linalg/lib/norm.js ***!
  \************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/pad-with-zero-cols.js':
		/*! **************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/pad-with-zero-cols.js ***!
  \**************************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const matPermutation = __webpack_require__(/*! ./mat-permutation */ './node_modules/simple-linalg/lib/mat-permutation.js');
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/sub-square-matrix.js':
		/*! *************************************************************!*\
  !*** ./node_modules/simple-linalg/lib/sub-square-matrix.js ***!
  \*************************************************************/
		/***/ (module => {
			/**
 * Extracts a sub-square matrix from the provided matrix based on the given indexes.
 * @param {number[][]} mat The matrix from which to extract the sub-square matrix.
 * @param {number[]} indexes The indexes to select rows and columns from the matrix.
 * @returns {number[][]} The sub-square matrix extracted from the original matrix.
 */
			module.exports = function subSquareMatrix(mat, indexes) {
				return indexes.map(s1 => indexes.map(s2 => mat[s1][s2]));
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/subtract.js':
		/*! ****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/subtract.js ***!
  \****************************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const elemWise = __webpack_require__(/*! ./elem-wise */ './node_modules/simple-linalg/lib/elem-wise.js');

			module.exports = function subtract(...args) {
				return elemWise(args, ([a, b]) => a - b);
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/sum-vector.js':
		/*! ******************************************************!*\
  !*** ./node_modules/simple-linalg/lib/sum-vector.js ***!
  \******************************************************/
		/***/ (module => {
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
			/***/}),

		/***/ './node_modules/simple-linalg/lib/sum.js':
		/*! ***********************************************!*\
  !*** ./node_modules/simple-linalg/lib/sum.js ***!
  \***********************************************/
		/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
			const sumVector = __webpack_require__(/*! ./sum-vector */ './node_modules/simple-linalg/lib/sum-vector.js');

			// Sum all the terms of a given matrix
			module.exports = function sum(array) {
				let s = 0;
				for (const element of array) {
					s += sumVector(element);
				}

				return s;
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/trace.js':
		/*! *************************************************!*\
  !*** ./node_modules/simple-linalg/lib/trace.js ***!
  \*************************************************/
		/***/ (module => {
			module.exports = function trace(array) {
				let diag = 0;
				for (const [row, element] of array.entries()) {
					diag += element[row];
				}

				return diag;
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/transpose.js':
		/*! *****************************************************!*\
  !*** ./node_modules/simple-linalg/lib/transpose.js ***!
  \*****************************************************/
		/***/ (module => {
			/**
 * Transposes the given 2D array.
 * @param {Array<Array<any>>} array The 2D array to transpose.
 * @returns {Array<Array<any>>} The transposed 2D array.
 */
			module.exports = function transpose(array) {
				return array[0].map((col, i) => array.map(row => row[i]));
			};
			/***/}),

		/***/ './node_modules/simple-linalg/lib/zeros.js':
		/*! *************************************************!*\
  !*** ./node_modules/simple-linalg/lib/zeros.js ***!
  \*************************************************/
		/***/ (module => {
			/**
 * Generates a 2D array filled with zeros with the specified number of rows and columns.
 * @param {number} rows The number of rows for the 2D array.
 * @param {number} cols The number of columns for the 2D array.
 * @returns {number[][]} A 2D array filled with zeros.
 */
			module.exports = function zeros(rows, cols) {
				return new Array(rows).fill(1).map(() => new Array(cols).fill(0));
			};
			/***/}),

		/***/ './index.ts':
		/*! ******************!*\
  !*** ./index.ts ***!
  \******************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __createBinding = (this && this.__createBinding) || (Object.create
				? (function (o, m, k, k2) {
					if (k2 === undefined) {
						k2 = k;
					}

					let desc = Object.getOwnPropertyDescriptor(m, k);
					if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
						desc = {
							enumerable: true, get: function () {
								return m[k];
							},
						};
					}

					Object.defineProperty(o, k2, desc);
				})
				: (function (o, m, k, k2) {
					if (k2 === undefined) {
						k2 = k;
					}

					o[k2] = m[k];
				}));
			const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
				? (function (o, v) {
					Object.defineProperty(o, 'default', {enumerable: true, value: v});
				})
				: function (o, v) {
					o.default = v;
				});
			const __importStar = (this && this.__importStar) || function (mod) {
				if (mod && mod.__esModule) {
					return mod;
				}

				const result = {};
				if (mod != null) {
					for (const k in mod) {
						if (k !== 'default' && Object.hasOwn(mod, k)) {
							__createBinding(result, mod, k);
						}
					}
				}

				__setModuleDefault(result, mod);
				return result;
			};

			const __exportStar = (this && this.__exportStar) || function (m, exports) {
				for (const p in m) {
					if (p !== 'default' && !Object.hasOwn(exports, p)) {
						__createBinding(exports, m, p);
					}
				}
			};

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			exports.projectObservation = exports.covarianceToCorrelation = exports.correlationToCovariance = exports.checkCovariance = exports.State = exports.getCovariance = exports.KalmanFilter = void 0;
			const modelCollection = __importStar(__webpack_require__(/*! ./lib/model-collection */ './lib/model-collection.ts'));
			const defaultDynamicModels = __importStar(__webpack_require__(/*! ./lib/dynamic */ './lib/dynamic/index.ts'));
			const defaultObservationModels = __importStar(__webpack_require__(/*! ./lib/observation */ './lib/observation/index.ts'));
			function camelToDash(str) {
				if (str === str.toLowerCase()) {
					return str;
				}

				return str.replaceAll(/[A-Z]/g, m => '-' + m.toLowerCase());
			}

			Object.keys(defaultDynamicModels).forEach(k => {
				modelCollection.registerDynamic(camelToDash(k), defaultDynamicModels[k]);
			});
			Object.keys(defaultObservationModels).forEach(k => {
				modelCollection.registerObservation(camelToDash(k), defaultObservationModels[k]);
			});
			__exportStar(__webpack_require__(/*! ./lib/model-collection */ './lib/model-collection.ts'), exports);
			__exportStar(__webpack_require__(/*! ./lib/dynamic */ './lib/dynamic/index.ts'), exports);
			__exportStar(__webpack_require__(/*! ./lib/observation */ './lib/observation/index.ts'), exports);
			const kalman_filter_1 = __webpack_require__(/*! ./lib/kalman-filter */ './lib/kalman-filter.ts');
			Object.defineProperty(exports, 'KalmanFilter', ({
				enumerable: true, get: function () {
					return __importDefault(kalman_filter_1).default;
				},
			}));
			const get_covariance_1 = __webpack_require__(/*! ./lib/utils/get-covariance */ './lib/utils/get-covariance.ts');
			Object.defineProperty(exports, 'getCovariance', ({
				enumerable: true, get: function () {
					return __importDefault(get_covariance_1).default;
				},
			}));
			const state_1 = __webpack_require__(/*! ./lib/state */ './lib/state.ts');
			Object.defineProperty(exports, 'State', ({
				enumerable: true, get: function () {
					return __importDefault(state_1).default;
				},
			}));
			const check_covariance_1 = __webpack_require__(/*! ./lib/utils/check-covariance */ './lib/utils/check-covariance.ts');
			Object.defineProperty(exports, 'checkCovariance', ({
				enumerable: true, get: function () {
					return __importDefault(check_covariance_1).default;
				},
			}));
			const correlation_to_covariance_1 = __webpack_require__(/*! ./lib/utils/correlation-to-covariance */ './lib/utils/correlation-to-covariance.ts');
			Object.defineProperty(exports, 'correlationToCovariance', ({
				enumerable: true, get: function () {
					return __importDefault(correlation_to_covariance_1).default;
				},
			}));
			const covariance_to_correlation_1 = __webpack_require__(/*! ./lib/utils/covariance-to-correlation */ './lib/utils/covariance-to-correlation.ts');
			Object.defineProperty(exports, 'covarianceToCorrelation', ({
				enumerable: true, get: function () {
					return __importDefault(covariance_to_correlation_1).default;
				},
			}));
			const project_observation_1 = __webpack_require__(/*! ./lib/utils/project-observation */ './lib/utils/project-observation.ts');
			Object.defineProperty(exports, 'projectObservation', ({
				enumerable: true, get: function () {
					return __importDefault(project_observation_1).default;
				},
			}));
			/***/}),

		/***/ './lib/core-kalman-filter.ts':
		/*! ***********************************!*\
  !*** ./lib/core-kalman-filter.ts ***!
  \***********************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const state_1 = __importDefault(__webpack_require__(/*! ./state */ './lib/state.ts'));
			const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ './lib/utils/check-matrix.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ './lib/types/TypeAssert.ts'));
			const defaultLogger = {
				info: (...args) => console.log(...args),
				debug() {},
				warn: (...args) => console.log(...args),
				error: (...args) => console.log(...args),
			};
			class CoreKalmanFilter {
				dynamic;
				observation;
				logger;

				constructor(options) {
					const {dynamic, observation, logger = defaultLogger} = options;
					this.dynamic = dynamic;
					this.observation = observation;
					this.logger = logger;
				}

				// | number[]
				getValue(fn, options) {
					return (typeof (fn) === 'function' ? fn(options) : fn);
				}

				getInitState() {
					const {mean: meanInit, covariance: covarianceInit, index: indexInit} = this.dynamic.init;
					const initState = new state_1.default({
						mean: meanInit,
						covariance: covarianceInit,
						index: indexInit,
					});
					state_1.default.check(initState, {title: 'dynamic.init'});
					return initState;
				}

				/**
    This will return the predicted covariance of a given previousCorrected State, this will help us to build the asymptoticState.
    * @param {State} previousCorrected
    * @returns{Array.<Array.<Number>>}
    */
				getPredictedCovariance(options = {}) {
					let {previousCorrected, index} = options;
					previousCorrected ||= this.getInitState();
					const getValueOptions = {previousCorrected, index, ...options};
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

					const {opts} = o;
					const control = this.dynamic.constant(opts);
					(0, check_matrix_1.default)(control, [this.dynamic.dimension, 1], 'dynamic.constant');
					return (0, simple_linalg_1.add)(mean, control);
				}

				predictMeanWithoutControl(args) {
					const {opts, transition} = args;
					if (this.dynamic.fn) {
						return this.dynamic.fn(opts);
					}

					const {previousCorrected} = opts;
					return (0, simple_linalg_1.matMul)(transition, previousCorrected.mean);
				}

				/**
    This will return the new prediction, relatively to the dynamic model chosen
    * @param {State} previousCorrected State relative to our dynamic model
    * @returns{State} predicted State
    */
				predict(options = {}) {
					let {previousCorrected, index} = options;
					previousCorrected ||= this.getInitState();
					if (typeof (index) !== 'number' && typeof (previousCorrected.index) === 'number') {
						index = previousCorrected.index + 1;
					}

					state_1.default.check(previousCorrected, {dimension: this.dynamic.dimension});
					const getValueOptions = {
						...options,
						previousCorrected,
						index,
					};
					const transition = this.getValue(this.dynamic.transition, getValueOptions);
					const mean = this.predictMean({transition, opts: getValueOptions});
					const covariance = this.getPredictedCovariance(getValueOptions);
					const predicted = new state_1.default({mean, covariance, index});
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
					let {predicted, stateProjection} = options;
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
					let {predicted, optimalKalmanGain, stateProjection} = options;
					const identity = (0, simple_linalg_1.identity)(predicted.covariance.length);
					if (!stateProjection) {
						TypeAssert_1.default.assertIsArray2D(this.observation.stateProjection, 'CoreKalmanFilter.getCorrectedCovariance');
						const getValueOptions = {
							index: predicted.index,
							...options,
						};
						stateProjection = this.getValue(this.observation.stateProjection, getValueOptions);
					}

					optimalKalmanGain ||= this.getGain({stateProjection, ...options});
					return (0, simple_linalg_1.matMul)((0, simple_linalg_1.subtract)(identity, (0, simple_linalg_1.matMul)(optimalKalmanGain, stateProjection)), predicted.covariance);
				}

				getPredictedObservation(args) {
					const {opts, stateProjection} = args;
					if (this.observation.fn) {
						return this.observation.fn(opts);
					}

					const {predicted} = opts;
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
					const {predicted, observation} = options;
					state_1.default.check(predicted, {dimension: this.dynamic.dimension});
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
					const innovation = (0, simple_linalg_1.subtract)(observation, this.getPredictedObservation({stateProjection, opts: getValueOptions}));
					const mean = (0, simple_linalg_1.add)(predicted.mean, (0, simple_linalg_1.matMul)(optimalKalmanGain, innovation));
					if (Number.isNaN(mean[0][0])) {
						console.log({optimalKalmanGain, innovation, predicted});
						throw (new TypeError('Mean is NaN after correction'));
					}

					const covariance = this.getCorrectedCovariance({
						predicted,
						optimalKalmanGain,
						stateProjection,
						...options,
					});
					const corrected = new state_1.default({mean, covariance, index: predicted.index});
					this.logger.debug('Correction done', corrected);
					return corrected;
				}
			}
			exports.default = CoreKalmanFilter;
			/***/}),

		/***/ './lib/dynamic/composition.ts':
		/*! ************************************!*\
  !*** ./lib/dynamic/composition.ts ***!
  \************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const model_collection_1 = __webpack_require__(/*! ../model-collection */ './lib/model-collection.ts');
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
			function composition({perName}, observation) {
				const {observedProjection} = observation;
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
					const {dimension, transition, covariance, init} = (0, model_collection_1.buildDynamic)(perName[k], observation);
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
						} else {
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
					const {dynamicIndexes, init: localInit} = confs[k];
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
						const {previousCorrected} = options;
						const resultTransition = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
						dynamicNames.forEach(k => {
							const {dynamicIndexes, transition} = confs[k];
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
						const {previousCorrected} = options;
						const resultCovariance = new Array(totalDimension).fill(undefined).map(() => new Array(totalDimension).fill(0));
						dynamicNames.forEach(k => {
							const {dynamicIndexes, covariance} = confs[k];
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

			exports.default = composition;
			/***/}),

		/***/ './lib/dynamic/constant-acceleration.ts':
		/*! **********************************************!*\
  !*** ./lib/dynamic/constant-acceleration.ts ***!
  \**********************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			/**
* Creates a dynamic model, following constant acceleration model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
			function constantAcceleration(dynamic, observation) {
				const timeStep = dynamic.timeStep || 1;
				const {observedProjection} = observation;
				const {stateProjection} = observation;
				const observationDimension = observation.dimension;
				let dimension;
				if (stateProjection && Number.isInteger(stateProjection[0].length / 3)) {
					dimension = observation.stateProjection[0].length;
				} else if (observedProjection) {
					dimension = observedProjection[0].length * 3;
				} else if (observationDimension) {
					dimension = observationDimension * 3;
				} else {
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

			exports.default = constantAcceleration;
			// export default constantAcceleration;
			/***/}),

		/***/ './lib/dynamic/constant-position-with-null.ts':
		/*! ****************************************************!*\
  !*** ./lib/dynamic/constant-position-with-null.ts ***!
  \****************************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const huge = 1e6;
			/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {Array.<Array.<Number>>} staticCovariance generated with moving average
* @param {Number} observationDimension
* @returns {DynamicConfig}
*/
			function constantPositionWithNull({staticCovariance, obsDynaIndexes, init}) {
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
					covariance({previousCorrected, index}) {
						const diffBetweenIndexes = index - previousCorrected.index;
						if (staticCovariance) {
							return staticCovariance.map(row => row.map(element => element * diffBetweenIndexes));
						}

						return (0, simple_linalg_1.identity)(dimension);
					},
					init,
				};
			}

			exports.default = constantPositionWithNull;
			/***/}),

		/***/ './lib/dynamic/constant-position.ts':
		/*! ******************************************!*\
  !*** ./lib/dynamic/constant-position.ts ***!
  \******************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			/**
* Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
			function constantPosition(dynamic, observation) {
				let {dimension} = dynamic;
				const observationDimension = observation.dimension;
				const {observedProjection} = observation;
				const {stateProjection} = observation;
				let {covariance} = dynamic;
				if (!dynamic.dimension) {
					if (observationDimension) {
						dimension = observationDimension;
					} else if (observedProjection) {
						dimension = observedProjection[0].length;
					} else if (stateProjection) {
						dimension = stateProjection[0].length;
					}
				}

				const transition = (0, simple_linalg_1.identity)(dimension);
				covariance ||= (0, simple_linalg_1.identity)(dimension);
				return {
					...dynamic, dimension, transition, covariance,
				};
			}

			exports.default = constantPosition;
			/***/}),

		/***/ './lib/dynamic/constant-speed-dynamic.ts':
		/*! ***********************************************!*\
  !*** ./lib/dynamic/constant-speed-dynamic.ts ***!
  \***********************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			/**
* Creates a dynamic model, considering the null in order to make the predictions
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
			function constantSpeedDynamic(args, observation) {
				const {staticCovariance, avSpeed, center} = args;
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
				const transition = args => {
					const {getTime, index, previousCorrected} = args;
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

				const covariance = args => {
					const {index, previousCorrected, getTime} = args;
					const dT = getTime(index) - getTime(previousCorrected.index);
					if (typeof (dT) !== 'number') {
						throw (new TypeError(`dT (${dT}) should be a number`));
					}

					// State is (x, y, vx, vy)
					const sqrt = Math.sqrt(dT);
					if (Number.isNaN(sqrt)) {
						console.log({lastPreviousIndex: previousCorrected.index, index});
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

			exports.default = constantSpeedDynamic;
			// module.exports = constantSpeedDynamic;
			/***/}),

		/***/ './lib/dynamic/constant-speed.ts':
		/*! ***************************************!*\
  !*** ./lib/dynamic/constant-speed.ts ***!
  \***************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			/**
*Creates a dynamic model, following constant position model with respect with the dimensions provided in the observation parameters
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
			function constantSpeed(dynamic, observation) {
				const timeStep = dynamic.timeStep || 1;
				const {observedProjection} = observation;
				const {stateProjection} = observation;
				const observationDimension = observation.dimension;
				let dimension;
				if (stateProjection && Number.isInteger(stateProjection[0].length / 2)) {
					dimension = observation.stateProjection[0].length;
				} else if (observedProjection) {
					dimension = observedProjection[0].length * 2;
				} else if (observationDimension) {
					dimension = observationDimension * 2;
				} else {
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

			exports.default = constantSpeed;
			/***/}),

		/***/ './lib/dynamic/index.ts':
		/*! ******************************!*\
  !*** ./lib/dynamic/index.ts ***!
  \******************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			exports.shorttermConstantSpeed = exports.constantSpeedDynamic = exports.constantPositionWithNull = exports.composition = exports.constantAcceleration = exports.constantSpeed = exports.constantPosition = void 0;
			const constant_position_1 = __webpack_require__(/*! ./constant-position */ './lib/dynamic/constant-position.ts');
			Object.defineProperty(exports, 'constantPosition', ({
				enumerable: true, get: function () {
					return __importDefault(constant_position_1).default;
				},
			}));
			const constant_speed_1 = __webpack_require__(/*! ./constant-speed */ './lib/dynamic/constant-speed.ts');
			Object.defineProperty(exports, 'constantSpeed', ({
				enumerable: true, get: function () {
					return __importDefault(constant_speed_1).default;
				},
			}));
			const constant_acceleration_1 = __webpack_require__(/*! ./constant-acceleration */ './lib/dynamic/constant-acceleration.ts');
			Object.defineProperty(exports, 'constantAcceleration', ({
				enumerable: true, get: function () {
					return __importDefault(constant_acceleration_1).default;
				},
			}));
			const composition_1 = __webpack_require__(/*! ./composition */ './lib/dynamic/composition.ts');
			Object.defineProperty(exports, 'composition', ({
				enumerable: true, get: function () {
					return __importDefault(composition_1).default;
				},
			}));
			const constant_position_with_null_1 = __webpack_require__(/*! ./constant-position-with-null */ './lib/dynamic/constant-position-with-null.ts');
			Object.defineProperty(exports, 'constantPositionWithNull', ({
				enumerable: true, get: function () {
					return __importDefault(constant_position_with_null_1).default;
				},
			}));
			const constant_speed_dynamic_1 = __webpack_require__(/*! ./constant-speed-dynamic */ './lib/dynamic/constant-speed-dynamic.ts');
			Object.defineProperty(exports, 'constantSpeedDynamic', ({
				enumerable: true, get: function () {
					return __importDefault(constant_speed_dynamic_1).default;
				},
			}));
			const shortterm_constant_speed_1 = __webpack_require__(/*! ./shortterm-constant-speed */ './lib/dynamic/shortterm-constant-speed.ts');
			Object.defineProperty(exports, 'shorttermConstantSpeed', ({
				enumerable: true, get: function () {
					return __importDefault(shortterm_constant_speed_1).default;
				},
			}));
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
			/***/}),

		/***/ './lib/dynamic/shortterm-constant-speed.ts':
		/*! *************************************************!*\
  !*** ./lib/dynamic/shortterm-constant-speed.ts ***!
  \*************************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const constant_speed_dynamic_1 = __importDefault(__webpack_require__(/*! ./constant-speed-dynamic */ './lib/dynamic/constant-speed-dynamic.ts'));
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
				const {typicalTimes} = options;
				if (!Array.isArray(typicalTimes)) {
					throw (new TypeError('typicalTimes must be defined'));
				}

				const constantSpeed = (0, constant_speed_dynamic_1.default)(options, observation);
				const {dimension, init} = constantSpeed;
				if (typicalTimes.length !== dimension) {
					throw (new TypeError(`typicalTimes (${typicalTimes.length}) length is not as expected (${dimension})`));
				}

				const mixMatrix = function ({ratios, aMat, bMat}) {
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
						const {getTime, index, previousCorrected} = options;
						const dT = getTime(index) - getTime(previousCorrected.index);
						const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
						// 'back to init' matrix
						const bMat = (0, simple_linalg_1.diag)((0, simple_linalg_1.elemWise)([init.mean, previousCorrected.mean], ([m, d]) => safeDiv(m, d))
						// Flatten cause this is a Nx1 matrix -> N array
							.reduce((a, b) => a.concat(b)));
						return mixMatrix({ratios, aMat, bMat});
					},
					covariance(options, observation) {
						const {getTime, index, previousCorrected} = options;
						const dT = getTime(index) - getTime(previousCorrected.index);
						// State is (x, y, vx, vy)
						const ratios = typicalTimes.map(t => Math.exp(-1 * dT / t));
						const aMat = constantSpeed.covariance(options /* , observation */);
						return mixMatrix({ratios, aMat, bMat: init.covariance});
					},
				};
			}

			exports.default = shorttermConstantSpeed;
			/***/}),

		/***/ './lib/kalman-filter.ts':
		/*! ******************************!*\
  !*** ./lib/kalman-filter.ts ***!
  \******************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __createBinding = (this && this.__createBinding) || (Object.create
				? (function (o, m, k, k2) {
					if (k2 === undefined) {
						k2 = k;
					}

					let desc = Object.getOwnPropertyDescriptor(m, k);
					if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
						desc = {
							enumerable: true, get: function () {
								return m[k];
							},
						};
					}

					Object.defineProperty(o, k2, desc);
				})
				: (function (o, m, k, k2) {
					if (k2 === undefined) {
						k2 = k;
					}

					o[k2] = m[k];
				}));
			const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
				? (function (o, v) {
					Object.defineProperty(o, 'default', {enumerable: true, value: v});
				})
				: function (o, v) {
					o.default = v;
				});
			const __importStar = (this && this.__importStar) || function (mod) {
				if (mod && mod.__esModule) {
					return mod;
				}

				const result = {};
				if (mod != null) {
					for (const k in mod) {
						if (k !== 'default' && Object.hasOwn(mod, k)) {
							__createBinding(result, mod, k);
						}
					}
				}

				__setModuleDefault(result, mod);
				return result;
			};

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/array-to-matrix */ './lib/utils/array-to-matrix.ts'));
			const set_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/set-dimensions */ './lib/setup/set-dimensions.ts'));
			const check_dimensions_1 = __importDefault(__webpack_require__(/*! ../lib/setup/check-dimensions */ './lib/setup/check-dimensions.ts'));
			const build_state_projection_1 = __importDefault(__webpack_require__(/*! ../lib/setup/build-state-projection */ './lib/setup/build-state-projection.ts'));
			const extend_dynamic_init_1 = __importDefault(__webpack_require__(/*! ../lib/setup/extend-dynamic-init */ './lib/setup/extend-dynamic-init.ts'));
			const to_function_1 = __importDefault(__webpack_require__(/*! ../lib/utils/to-function */ './lib/utils/to-function.ts'));
			const deep_assign_1 = __importDefault(__webpack_require__(/*! ../lib/utils/deep-assign */ './lib/utils/deep-assign.ts'));
			const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../lib/utils/polymorph-matrix */ './lib/utils/polymorph-matrix.ts'));
			const state_1 = __importDefault(__webpack_require__(/*! ./state */ './lib/state.ts'));
			const modelCollection = __importStar(__webpack_require__(/*! ./model-collection */ './lib/model-collection.ts'));
			const core_kalman_filter_1 = __importDefault(__webpack_require__(/*! ./core-kalman-filter */ './lib/core-kalman-filter.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ './lib/types/TypeAssert.ts'));
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
					return {name: dynamic};
				}

				return {name: 'constant-position'};
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
					return {name: 'sensor', sensorDimension: observation};
				}

				if (typeof (observation) === 'string') {
					return {name: observation};
				}

				return {name: 'sensor'};
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
				let {observation, dynamic} = args;
				if (typeof (observation) !== 'object' || observation === null) {
					observation = buildDefaultObservation(observation);
				}

				if (typeof (dynamic) !== 'object' || dynamic === null) {
					dynamic = buildDefaultDynamic(dynamic /* , observation */);
				}

				if (typeof (observation.name) === 'string') {
					observation = modelCollection.buildObservation(observation);
				}

				if (typeof (dynamic.name) === 'string') {
					dynamic = modelCollection.buildDynamic(dynamic, observation);
				}

				const withDimensionOptions = (0, set_dimensions_1.default)({observation, dynamic});
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
				const {observation, dynamic} = modelToBeChanged;
				TypeAssert_1.default.assertNotArray(observation, 'modelsParametersToCoreOptions: observation');
				// TypeAssert.assertIsArray2D(observation.stateProjection, 'modelsParametersToCoreOptions: observation.stateProjection');
				// TypeAssert.assertIsArray2D(observation.covariance, 'modelsParametersToCoreOptions: observation.covariance');
				// TypeAssert.assertIsArray2D(dynamic.transition, 'modelsParametersToCoreOptions: dynamic.transition');
				// TypeAssert.assertIsNumbersArray(dynamic.covariance, 'modelsParametersToCoreOptions: dynamic.covariance');
				return (0, deep_assign_1.default)(modelToBeChanged, {
					observation: {
						stateProjection: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.stateProjection), {label: 'observation.stateProjection'}),
						covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(observation.covariance, {dimension: observation.dimension}), {label: 'observation.covariance'}),
					},
					dynamic: {
						transition: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.transition), {label: 'dynamic.transition'}),
						covariance: (0, to_function_1.default)((0, polymorph_matrix_1.default)(dynamic.covariance, {dimension: dynamic.dimension}), {label: 'dynamic.covariance'}),
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
					super({...options, ...coreOptions});
				}

				// previousCorrected?: State, index?: number,
				correct(options) {
					const coreObservation = (0, array_to_matrix_1.default)({observation: options.observation, dimension: this.observation.dimension});
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
						const predicted = this.predict({previousCorrected});
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
				asymptoticStateCovariance({limitIterations = 1e2, tolerance = 1e-6} = {}) {
					let previousCorrected = super.getInitState();
					const results = [];
					for (let i = 0; i < limitIterations; i++) {
						// We create a fake mean that will not be used in order to keep coherence
						const predicted = new state_1.default({
							mean: [],
							covariance: super.getPredictedCovariance({previousCorrected}),
						});
						previousCorrected = new state_1.default({
							mean: [],
							covariance: super.getCorrectedCovariance({predicted}),
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
				asymptoticGain({tolerance = 1e-6} = {}) {
					const covariance = this.asymptoticStateCovariance({tolerance});
					const asymptoticState = new state_1.default({
						// We create a fake mean that will not be used in order to keep coherence
						mean: Array.from({length: covariance.length}).fill(0).map(() => [0]),
						covariance,
					});
					return super.getGain({predicted: asymptoticState});
				}
			}
			exports.default = KalmanFilter;
			/***/}),

		/***/ './lib/model-collection.ts':
		/*! *********************************!*\
  !*** ./lib/model-collection.ts ***!
  \*********************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
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
			/***/}),

		/***/ './lib/observation/index.ts':
		/*! **********************************!*\
  !*** ./lib/observation/index.ts ***!
  \**********************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			exports.sensorProjected = exports.sensorLocalVariance = exports.sensor = void 0;
			const sensor_1 = __webpack_require__(/*! ./sensor */ './lib/observation/sensor.ts');
			Object.defineProperty(exports, 'sensor', ({
				enumerable: true, get: function () {
					return __importDefault(sensor_1).default;
				},
			}));
			const sensor_local_variance_1 = __webpack_require__(/*! ./sensor-local-variance */ './lib/observation/sensor-local-variance.ts');
			Object.defineProperty(exports, 'sensorLocalVariance', ({
				enumerable: true, get: function () {
					return __importDefault(sensor_local_variance_1).default;
				},
			}));
			const sensor_projected_1 = __webpack_require__(/*! ./sensor-projected */ './lib/observation/sensor-projected.ts');
			Object.defineProperty(exports, 'sensorProjected', ({
				enumerable: true, get: function () {
					return __importDefault(sensor_projected_1).default;
				},
			}));
			/***/}),

		/***/ './lib/observation/sensor-local-variance.ts':
		/*! **************************************************!*\
  !*** ./lib/observation/sensor-local-variance.ts ***!
  \**************************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const model_collection_1 = __webpack_require__(/*! ../model-collection */ './lib/model-collection.ts');
			/**
* @param {Object} options
* @param {Number} options.sensorDimension
* @param {CovarianceParam} options.sensorCovariance
* @param {Number} options.nSensors
* @returns {ObservationConfig}
*/
			function nullableSensor(options) {
				const {dimension, observedProjection, covariance: baseCovariance} = (0, model_collection_1.buildObservation)({...options, name: 'sensor'});
				return {
					dimension,
					observedProjection,
					covariance(o) {
						const covariance = (0, simple_linalg_1.identity)(dimension);
						const {variance} = o;
						variance.forEach((v, i) => {
							covariance[i][i] = v * baseCovariance[i][i];
						});
						return covariance;
					},
				};
			}

			exports.default = nullableSensor;
			/***/}),

		/***/ './lib/observation/sensor-projected.ts':
		/*! *********************************************!*\
  !*** ./lib/observation/sensor-projected.ts ***!
  \*********************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const correlation_to_covariance_1 = __importDefault(__webpack_require__(/*! ../utils/correlation-to-covariance */ './lib/utils/correlation-to-covariance.ts'));
			const covariance_to_correlation_1 = __importDefault(__webpack_require__(/*! ../utils/covariance-to-correlation */ './lib/utils/covariance-to-correlation.ts'));
			/**
*Creates an observation model with a observedProjection corresponding to
* @param {DynamicConfig} dynamic
* @param {ObservationConfig} observation
* @returns {DynamicConfig}
*/
			function sensorProjected({selectedCovariance, totalDimension, obsIndexes, selectedStateProjection}) {
				if (!selectedStateProjection) {
					selectedStateProjection = new Array(obsIndexes.length).fill(0).map(() => new Array(obsIndexes.length).fill(0));
					obsIndexes.forEach((index1, i1) => {
						selectedStateProjection[i1][i1] = 1;
					});
				} else if (selectedStateProjection.length !== obsIndexes.length) {
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
				const {correlation: baseCorrelation, variance: baseVariance} = (0, covariance_to_correlation_1.default)(baseCovariance);
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
						const {variance} = o;
						if (!variance) {
							return baseCovariance;
						}

						if (variance.length !== baseCovariance.length) {
							throw (new Error('variance is difference size from baseCovariance'));
						}

						const result = (0, correlation_to_covariance_1.default)({correlation: baseCorrelation, variance: baseVariance.map((b, i) => variance[i] * b)});
						return result;
					},
				};
			}

			exports.default = sensorProjected;
			/***/}),

		/***/ './lib/observation/sensor.ts':
		/*! ***********************************!*\
  !*** ./lib/observation/sensor.ts ***!
  \***********************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ './lib/utils/polymorph-matrix.ts'));
			const check_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/check-matrix */ './lib/utils/check-matrix.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ './lib/types/TypeAssert.ts'));
			/**
* @param {Number} sensorDimension
* @param {CovarianceParam} sensorCovariance
* @param {Number} nSensors
* @returns {ObservationConfig}
*/
			const copy = mat => mat.map(a => [...a]);
			function sensor(options) {
				const {sensorDimension = 1, sensorCovariance = 1, nSensors = 1} = options;
				const sensorCovarianceFormatted = (0, polymorph_matrix_1.default)(sensorCovariance, {dimension: sensorDimension});
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

			exports.default = sensor;
			/***/}),

		/***/ './lib/setup/build-state-projection.ts':
		/*! *********************************************!*\
  !*** ./lib/setup/build-state-projection.ts ***!
  \*********************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const simple_linalg_2 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			/**
* Builds the stateProjection given an observedProjection
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
* @returns {ObservationConfig, DynamicConfig} the model containing the created stateProjection
*/
			function buildStateProjection(args) {
				const {observation, dynamic} = args;
				const {observedProjection, stateProjection} = observation;
				const observationDimension = observation.dimension;
				const dynamicDimension = dynamic.dimension;
				if (observedProjection && stateProjection) {
					throw (new TypeError('You cannot use both observedProjection and stateProjection'));
				}

				if (observedProjection) {
					const stateProjection = (0, simple_linalg_1.padWithZeroCols)(observedProjection, {columns: dynamicDimension});
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
							stateProjection: (0, simple_linalg_1.padWithZeroCols)(observationMatrix, {columns: dynamicDimension}),
						},
						dynamic,
					};
				}

				return {observation, dynamic};
			}

			exports.default = buildStateProjection;
			/***/}),

		/***/ './lib/setup/check-dimensions.ts':
		/*! ***************************************!*\
  !*** ./lib/setup/check-dimensions.ts ***!
  \***************************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			/**
* Verifies that dynamic.dimension and observation.dimension are set
* Only used by setupModelsParameters
* @param {ObservationConfig} observation
* @param {DynamicConfig} dynamic
*/
			function checkDimensions(args) {
				const {observation, dynamic} = args;
				const dynamicDimension = dynamic.dimension;
				const observationDimension = observation.dimension;
				if (!dynamicDimension || !observationDimension) {
					throw (new TypeError('Dimension is not set'));
				}

				return {observation, dynamic};
			}

			exports.default = checkDimensions;
			/***/}),

		/***/ './lib/setup/extend-dynamic-init.ts':
		/*! ******************************************!*\
  !*** ./lib/setup/extend-dynamic-init.ts ***!
  \******************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const polymorph_matrix_1 = __importDefault(__webpack_require__(/*! ../utils/polymorph-matrix */ './lib/utils/polymorph-matrix.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ './lib/types/TypeAssert.ts'));
			/**
 * Initializes the dynamic.init when not given
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfigParcial} dynamic
 * @returns {CoreConfig}
 */
			function extendDynamicInit(args) {
				const {observation, dynamic} = args;
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

				const covariance = (0, polymorph_matrix_1.default)(dynamic.init.covariance, {dimension: dynamic.dimension});
				if (TypeAssert_1.default.isFunction(covariance)) {
					throw new TypeError('covariance can not be a function');
				}

				dynamic.init = {
					...dynamic.init,
					covariance,
				};
				return {observation, dynamic: dynamic};
			}

			exports.default = extendDynamicInit;
			/***/}),

		/***/ './lib/setup/set-dimensions.ts':
		/*! *************************************!*\
  !*** ./lib/setup/set-dimensions.ts ***!
  \*************************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			/**
 * Verifies that dimensions are matching and set dynamic.dimension and observation.dimension
 * with respect of stateProjection and transition dimensions
 * Only used by setupModelsParameters
 * @param {ObservationConfig} observation
 * @param {DynamicConfig} dynamic
 * @returns {ObservationConfig, DynamicConfig}
 */
			function setDimensions(args) {
				const {observation, dynamic} = args;
				const {stateProjection} = observation;
				const {transition} = dynamic;
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

				return {observation, dynamic: dynamic};
			}

			exports.default = setDimensions;
			/***/}),

		/***/ './lib/state.ts':
		/*! **********************!*\
  !*** ./lib/state.ts ***!
  \**********************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const array_to_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/array-to-matrix */ './lib/utils/array-to-matrix.ts'));
			const check_matrix_1 = __importDefault(__webpack_require__(/*! ./utils/check-matrix */ './lib/utils/check-matrix.ts'));
			const check_covariance_1 = __importDefault(__webpack_require__(/*! ./utils/check-covariance */ './lib/utils/check-covariance.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ./types/TypeAssert */ './lib/types/TypeAssert.ts'));
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
					const {dimension, title, eigen} = args;
					if (!(state instanceof State)) {
						throw (new TypeError('The argument is not a state \n'
							+ 'Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree'));
					}

					const {mean, covariance} = state; // Index
					const meanDimension = mean.length;
					if (typeof (dimension) === 'number' && meanDimension !== dimension) {
						throw (new Error(`[${title}] State.mean ${mean} with dimension ${meanDimension} does not match expected dimension (${dimension})`));
					}

					(0, check_matrix_1.default)(mean, [meanDimension, 1], title ? title + '.mean' : 'mean');
					(0, check_matrix_1.default)(covariance, [meanDimension, meanDimension], title ? title + '.covariance' : 'covariance');
					(0, check_covariance_1.default)({covariance, eigen}, title ? title + '.covariance' : 'covariance');
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
					const {state, matrix} = args;
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
						this.check({eigen: true});
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
					const {kf, observation, obsIndexes} = args;
					if (observation.length !== kf.observation.dimension) {
						throw (new Error(`Mahalanobis observation ${observation} (dimension: ${observation.length}) does not match with kf observation dimension (${kf.observation.dimension})`));
					}

					let correctlySizedObservation = (0, array_to_matrix_1.default)({observation, dimension: observation.length});
					TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.detailedMahalanobis');
					const stateProjection = kf.getValue(kf.observation.stateProjection, {});
					let projectedState = State.matMul({state: this, matrix: stateProjection});
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
					const {kf, state, obsIndexes} = options;
					TypeAssert_1.default.assertIsArray2D(kf.observation.stateProjection, 'State.obsBhattacharyya');
					const stateProjection = kf.getValue(kf.observation.stateProjection, {});
					let projectedSelfState = State.matMul({state: this, matrix: stateProjection});
					let projectedOtherState = State.matMul({state, matrix: stateProjection});
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
					const {covariance, mean} = this;
					const average = (0, simple_linalg_1.elemWise)([covariance, otherState.covariance], ([a, b]) => (a + b) / 2);
					let covarInverted;
					try {
						covarInverted = (0, simple_linalg_1.invert)(average);
					} catch (error) {
						console.log('Cannot invert', average);
						throw error;
					}

					const diff = (0, simple_linalg_1.subtract)(mean, otherState.mean);
					return (0, simple_linalg_1.matMul)((0, simple_linalg_1.transpose)(diff), (0, simple_linalg_1.matMul)(covarInverted, diff))[0][0];
				}
			}
			exports.default = State;
			/***/}),

		/***/ './lib/types/TypeAssert.ts':
		/*! *********************************!*\
  !*** ./lib/types/TypeAssert.ts ***!
  \*********************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
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

				dummy() {}

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
			exports.default = TypeAssert;
			/***/}),

		/***/ './lib/utils/array-to-matrix.ts':
		/*! **************************************!*\
  !*** ./lib/utils/array-to-matrix.ts ***!
  \**************************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			/**
*Returns the corresponding matrix in dim*1, given an dim matrix, and checks
* if corresponding with the observation dimension
*@param {Array.<Number> | Array.<Array.<Number>>} observation
*@param {Number} dimension
*@returns {Array.<Array.<Number>>}
*/
			// export default function arrayToMatrix(args: {observation: number, dimension: 1}): number[][];
			function arrayToMatrix(args) {
				const {observation, dimension} = args;
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

			exports.default = arrayToMatrix;
			/***/}),

		/***/ './lib/utils/check-covariance.ts':
		/*! ***************************************!*\
  !*** ./lib/utils/check-covariance.ts ***!
  \***************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const matrix_1 = __importDefault(__webpack_require__(/*! @rayyamhk/matrix */ './node_modules/@rayyamhk/matrix/lib/index.js'));
			const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ './lib/utils/check-matrix.ts'));
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
						} else if (Math.abs(item) > Math.sqrt(covariance[rowId][rowId] * covariance[colId][colId])) {
							console.log(covariance);
							throw new Error(`[${title}] Covariance[${rowId}][${colId}] should verify Cauchy Schwarz Inequality `
								+ `(expected: |x| <= sqrt(${covariance[rowId][rowId]} * ${covariance[colId][colId]})`
								+ ` actual: ${item})`);
						} else if (Math.abs(item - covariance[colId][rowId]) > tolerance) {
							throw new Error(`[${title}] Covariance[${rowId}][${colId}] should equal Covariance[${colId}][${rowId}] `
								+ ` (actual diff: ${Math.abs(item - covariance[colId][rowId])})  = ${item} - ${covariance[colId][rowId]}\n`
								+ `${covariance.join('\n')} is invalid`);
						}
					}
				}
			};

			function checkCovariance(args, _title) {
				const {covariance, eigen = false} = args;
				(0, check_matrix_1.default)(covariance);
				checkSymetric(covariance);
				if (eigen) {
					checkDefinitePositive(covariance);
				}
			}

			exports.default = checkCovariance;
			/***/}),

		/***/ './lib/utils/check-matrix.ts':
		/*! ***********************************!*\
  !*** ./lib/utils/check-matrix.ts ***!
  \***********************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const check_shape_1 = __importDefault(__webpack_require__(/*! ./check-shape */ './lib/utils/check-shape.ts'));
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

			exports.default = checkMatrix;
			/***/}),

		/***/ './lib/utils/check-shape.ts':
		/*! **********************************!*\
  !*** ./lib/utils/check-shape.ts ***!
  \**********************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			function checkShape(matrix, shape, title = 'checkShape') {
				if (matrix.length !== shape[0]) {
					throw (new Error(`[${title}] expected size (${shape[0]}) and length (${matrix.length}) does not match`));
				}

				if (shape.length > 1) {
					return matrix.forEach(m => checkShape(m, shape.slice(1), title));
				}
			}

			exports.default = checkShape;
			/***/}),

		/***/ './lib/utils/correlation-to-covariance.ts':
		/*! ************************************************!*\
  !*** ./lib/utils/correlation-to-covariance.ts ***!
  \************************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ './lib/utils/check-covariance.ts'));
			function correlationToCovariance({correlation, variance}) {
				(0, check_covariance_1.default)({covariance: correlation});
				return correlation.map((c, rowIndex) => c.map((a, colIndex) => a * Math.sqrt(variance[colIndex] * variance[rowIndex])));
			}

			exports.default = correlationToCovariance;
			/***/}),

		/***/ './lib/utils/covariance-to-correlation.ts':
		/*! ************************************************!*\
  !*** ./lib/utils/covariance-to-correlation.ts ***!
  \************************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const check_covariance_1 = __importDefault(__webpack_require__(/*! ./check-covariance */ './lib/utils/check-covariance.ts'));
			function covarianceToCorrelation(covariance) {
				(0, check_covariance_1.default)({covariance});
				const variance = covariance.map((_, i) => covariance[i][i]);
				return {
					variance,
					correlation: covariance.map((c, rowIndex) => c.map((a, colIndex) => a / Math.sqrt(variance[colIndex] * variance[rowIndex]))),
				};
			}

			exports.default = covarianceToCorrelation;
			/***/}),

		/***/ './lib/utils/deep-assign.ts':
		/*! **********************************!*\
  !*** ./lib/utils/deep-assign.ts ***!
  \**********************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const uniq_1 = __importDefault(__webpack_require__(/*! ./uniq */ './lib/utils/uniq.ts'));
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

			function deepAssign(...args) {
				return deepAssignInternal(args, 0);
			}

			exports.default = deepAssign;
			/***/}),

		/***/ './lib/utils/get-covariance.ts':
		/*! *************************************!*\
  !*** ./lib/utils/get-covariance.ts ***!
  \*************************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			/**
* @param {Object} opts
* @param {Array.<Array.<Number>>} opts.measures a list of measure, size is LxN L the number of sample, N the dimension
* @param {Array.<Array.<Number>>} opts.averages a list of averages, size is LxN L the number of sample, N the dimension
* @returns {Array.<Array.<Number>>} covariance matrix size is NxN
*/
			Object.defineProperty(exports, '__esModule', ({value: true}));
			function getCovariance({measures, averages}) {
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

			exports.default = getCovariance;
			/***/}),

		/***/ './lib/utils/polymorph-matrix.ts':
		/*! ***************************************!*\
  !*** ./lib/utils/polymorph-matrix.ts ***!
  \***************************************/
		/***/ (function (__unused_webpack_module, exports, __webpack_require__) {
			'use strict';

			const __importDefault = (this && this.__importDefault) || function (mod) {
				return (mod && mod.__esModule) ? mod : {default: mod};
			};

			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			const check_matrix_1 = __importDefault(__webpack_require__(/*! ./check-matrix */ './lib/utils/check-matrix.ts'));
			const TypeAssert_1 = __importDefault(__webpack_require__(/*! ../types/TypeAssert */ './lib/types/TypeAssert.ts'));
			/**
* If cov is a number, result will be Identity*cov
* If cov is an Number[], result will be diag(cov)
* If cov is an Number[][], result will be cov
*/
			function polymorphMatrix(cov, opts = {}) {
				const {dimension, title = 'polymorph'} = opts;
				// if (!cov) {
				//	return undefined;
				// }
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

			exports.default = polymorphMatrix;
			/***/}),

		/***/ './lib/utils/project-observation.ts':
		/*! ******************************************!*\
  !*** ./lib/utils/project-observation.ts ***!
  \******************************************/
		/***/ ((__unused_webpack_module, exports, __webpack_require__) => {
			'use strict';

			// From observationTracks to movingAverageGroundTruthsStates with speed
			Object.defineProperty(exports, '__esModule', ({value: true}));
			const simple_linalg_1 = __webpack_require__(/*! simple-linalg */ './node_modules/simple-linalg/index.js');
			function projectObservation({observation, obsIndexes, selectedStateProjection, invertSelectedStateProjection}) {
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

			exports.default = projectObservation;
			/***/}),

		/***/ './lib/utils/to-function.ts':
		/*! **********************************!*\
  !*** ./lib/utils/to-function.ts ***!
  \**********************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			// Const {diag} = require('simple-linalg');;
			Object.defineProperty(exports, '__esModule', ({value: true}));
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
			function toFunction(array, {label = ''} = {}) {
				if (typeof (array) === 'function') {
					return array;
				}

				if (Array.isArray(array)) {
					return array;
				}

				throw (new Error(`${label === null ? '' : label + ' : '}Only arrays and functions are authorized (got: "${array}")`));
			}

			exports.default = toFunction;
			/***/}),

		/***/ './lib/utils/uniq.ts':
		/*! ***************************!*\
  !*** ./lib/utils/uniq.ts ***!
  \***************************/
		/***/ ((__unused_webpack_module, exports) => {
			'use strict';

			Object.defineProperty(exports, '__esModule', ({value: true}));
			function uniq(array) {
				return array.filter((value, index) => array.indexOf(value) === index);
			}

			exports.default = uniq;
			/***/}),

		/******/});
	/************************************************************************/
	/******/ // The module cache
	/******/ const __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ const cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/}

		/******/ // Create a new module (and put it into the cache)
		/******/ const module = __webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/};
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/}

	/******/
	/************************************************************************/
	/******/
	/******/ // startup
	/******/ // Load entry module and return exports
	/******/ // This entry module is referenced by other modules so it can't be inlined
	/******/ const __webpack_exports__ = __webpack_require__('./index.ts');
	/******/ kalmanFilter = __webpack_exports__;
/******/
/******/ })();

// # sourceMappingURL=data:application/json;charset=utf-8;base64,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RTtJQUMxRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUMxQixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLG1EQUFtRCxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkgsQ0FBQztBQVZELGdDQVVDOzs7Ozs7Ozs7Ozs7OztBQ3pCRCxTQUF3QixJQUFJLENBQUMsS0FBSztJQUNqQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQzlCLENBQUM7QUFDSCxDQUFDO0FBSkQsMEJBSUM7Ozs7Ozs7VUNKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Fjb3MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Fjb3QuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2Fjc2MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYXNlYy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYXNpbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvYXRhbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY29uanVnYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9jb3MuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2NvdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvY3NjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9kaXZpZGUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2V4cC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0QXJndW1lbnQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2dldEltYWdpbmFyeS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0TW9kdWx1cy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvZ2V0UmVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaXNFcXVhbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvaXNOYU4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL2xvZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3Bvdy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL2NvbXBsZXgvbGliL2NvcmUvc2VjLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS9zaW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvY29yZS90YW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9jb21wbGV4L2xpYi9jb3JlL3RvU3RyaW5nLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvY29tcGxleC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL0Vycm9yLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL0xVLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2RlY29tcG9zaXRpb25zL1FSLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvbGluZWFyLWVxdWF0aW9ucy9mb3J3YXJkLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9hZGQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9pbnZlcnNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9wb3cuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvb3BlcmF0aW9ucy9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9vcGVyYXRpb25zL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL2NvbmQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9kZXQuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9laWdlbnZhbHVlcy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL25vcm0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy9udWxsaXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3Byb3BlcnRpZXMvcmFuay5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9wcm9wZXJ0aWVzL3NpemUuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvcHJvcGVydGllcy90cmFjZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNEaWFnb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXIuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzT3J0aG9nb25hbC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTa2V3U3ltbWV0cmljLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3N0cnVjdHVyZS9pc1NxdWFyZS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS9zdHJ1Y3R1cmUvaXNTeW1tZXRyaWMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2Nsb25lLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2NvbHVtbi5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy9kaWFnLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2VudHJ5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2ZsYXR0ZW4uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZnJvbUFycmF5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dlbmVyYXRlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2dldERpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL0ByYXl5YW1oay9tYXRyaXgvbGliL2NvcmUvdXRpbHMvcm93LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9jb3JlL3V0aWxzL3N1Ym1hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvY29yZS91dGlscy96ZXJvLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9AcmF5eWFtaGsvbWF0cml4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9lbXB0eS5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc01hdHJpeC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvQHJheXlhbWhrL21hdHJpeC9saWIvdXRpbC9pc051bWJlci5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvbWF0cml4LWludmVyc2UvbWF0cml4LWludmVyc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvaW5kZXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2FkZC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvY29zLXNpbWlsYXJpdHkuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RpYWctYmxvY2suanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RpYWcuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2RvdC1wcm9kdWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9lbGVtLXdpc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2V1Y2xpZGVhbi1kaXN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9mcm9iZW5pdXMuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL2lkZW50aXR5LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvaW52ZXJ0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXAtbWF0cml4LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXQtbXVsLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9tYXQtcGVybXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL25vcm0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3BhZC13aXRoLXplcm8tY29scy5qcyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9ub2RlX21vZHVsZXMvc2ltcGxlLWxpbmFsZy9saWIvc3ViLXNxdWFyZS1tYXRyaXguanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3N1YnRyYWN0LmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdW0tdmVjdG9yLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi9zdW0uanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3RyYWNlLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL25vZGVfbW9kdWxlcy9zaW1wbGUtbGluYWxnL2xpYi90cmFuc3Bvc2UuanMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZS1saW5hbGcvbGliL3plcm9zLmpzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2luZGV4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9jb3JlLWthbG1hbi1maWx0ZXIudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29tcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL2R5bmFtaWMvY29uc3RhbnQtYWNjZWxlcmF0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvZHluYW1pYy9jb25zdGFudC1zcGVlZC1keW5hbWljLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2NvbnN0YW50LXNwZWVkLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL2luZGV4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9keW5hbWljL3Nob3J0dGVybS1jb25zdGFudC1zcGVlZC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIva2FsbWFuLWZpbHRlci50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvbW9kZWwtY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL29ic2VydmF0aW9uL3NlbnNvci1sb2NhbC12YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLXByb2plY3RlZC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvb2JzZXJ2YXRpb24vc2Vuc29yLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9idWlsZC1zdGF0ZS1wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9jaGVjay1kaW1lbnNpb25zLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9leHRlbmQtZHluYW1pYy1pbml0LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi9zZXR1cC9zZXQtZGltZW5zaW9ucy50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvc3RhdGUudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3R5cGVzL1R5cGVBc3NlcnQudHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2FycmF5LXRvLW1hdHJpeC50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stY292YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY2hlY2stbWF0cml4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9jaGVjay1zaGFwZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY29ycmVsYXRpb24tdG8tY292YXJpYW5jZS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvY292YXJpYW5jZS10by1jb3JyZWxhdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvZGVlcC1hc3NpZ24udHMiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyLy4vbGliL3V0aWxzL2dldC1jb3ZhcmlhbmNlLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9wb2x5bW9ycGgtbWF0cml4LnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy9wcm9qZWN0LW9ic2VydmF0aW9uLnRzIiwid2VicGFjazovL2thbG1hbkZpbHRlci8uL2xpYi91dGlscy90by1mdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvLi9saWIvdXRpbHMvdW5pcS50cyIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8va2FsbWFuRmlsdGVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9rYWxtYW5GaWx0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvc2luZSBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIENcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhY29zKG51bSkge1xuICByZXR1cm4gdGhpcy5zdWJ0cmFjdChuZXcgdGhpcyhNYXRoLlBJIC8gMiksIHRoaXMuYXNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY29zOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIGNvdGFuZ2VudCBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGksIC1pLCAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFjb3QobnVtKSB7XG4gIHJldHVybiB0aGlzLmF0YW4odGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgY29zZWNhbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIGNvc2VjYW50IGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gYWNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuYXNpbih0aGlzLmludmVyc2UobnVtKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWNzYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHN1bSBvZiB0d28gY29tcGxleCBudW1iZXJzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJysnIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJysnIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFN1bSBvZiB0d28gbnVtYmVyc1xyXG4gKi9cbmZ1bmN0aW9uIGFkZChudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0xLnJlICsgbnVtMi5yZSwgbnVtMS5pbSArIG51bTIuaW0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgaW52ZXJzZSBzZWNhbnQgZnVuY3Rpb24gb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAwIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGFzZWMobnVtKSB7XG4gIHJldHVybiB0aGlzLmFjb3ModGhpcy5pbnZlcnNlKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugc2luZSBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIENcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHNpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhc2luKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAtMSksIHRoaXMubG9nKHRoaXMuYWRkKHRoaXMubXVsdGlwbHkobmV3IHRoaXMoMCwgMSksIG51bSksIHRoaXMucG93KHRoaXMuc3VidHJhY3QodGhpcy5PTkUsIHRoaXMucG93KG51bSwgMikpLCAwLjUpKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzaW47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2UgdGFuZ2VudCBmdW5jdGlvbiBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGksIC1pIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBpbnZlcnNlIHRhbmdlbnQgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBhdGFuKG51bSkge1xuICByZXR1cm4gdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxIC8gMiksIHRoaXMuc3VidHJhY3QodGhpcy5sb2codGhpcy5zdWJ0cmFjdCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpLCB0aGlzLmxvZyh0aGlzLmFkZCh0aGlzLk9ORSwgdGhpcy5tdWx0aXBseShuZXcgdGhpcygwLCAxKSwgbnVtKSkpKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgY29tcGxleCBjb25qdWdhdGUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIGNvbXBsZXggY29uanVnYXRlXHJcbiAqL1xuZnVuY3Rpb24gY29uanVnYXRlKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhudW0uZ2V0UmVhbCgpLCBudW0uZ2V0SW1hZ2luYXJ5KCkgKiAtMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uanVnYXRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBjb3NpbmUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3NpbmUgZnVuY3Rpb25cclxuICovXG5mdW5jdGlvbiBjb3MobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGEgPSBudW0uZ2V0UmVhbCgpO1xuICB2YXIgYiA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGguY29zKGEpICogTWF0aC5jb3NoKGIpLCBNYXRoLnNpbihhKSAqIE1hdGguc2luaChiKSAqIC0xKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvdGFuZ2VudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7IGsgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogTm90ZSB0aGF0IGNvdChQSSAvIDIpIHNob3VsZCBnaXZlcyBOYU4gaW5zdGVhZCBvZiAwXHJcbiAqIGJlY2F1c2Ugd2Ugd29uJ3QgaW50cm9kdWNlIHRoZSBjb25jZXB0IG9mIEluZmluaXR5IGluIHRoaXMgY2xhc3NcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IGNvdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNvdChudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnRhbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGNvc2VjYW50IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIFRoZSBkb21haW4gaXMgQyAvIHsgayAqIFBJIDogayBpcyBhbnkgaW50ZWdlciB9XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBjb3NlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIGNzYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLnNpbihudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjc2M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBxdW90aWVudCBvZiB0d28gY29tcGxleCBudW1iZXJzLlxyXG4gKiBJZiB0aGUgZGVub21pbmF0b3IgaXMgY29uc2lkZXJlZCBhcyAwLFxyXG4gKiByZXR1cm4gTmFOIGluc3RlYWQgb2YgSW5maW5pdHlcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTEgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgbGVmdCBvZiAnLycgc2lnblxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMiAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSByaWdodCBvZiAnLycgc2lnblxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUXVvdGllbnQgb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBkaXZpZGUobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICB2YXIgYSA9IG51bTEucmU7XG4gIHZhciBiID0gbnVtMS5pbTtcbiAgdmFyIGMgPSBudW0yLnJlO1xuICB2YXIgZCA9IG51bTIuaW07XG5cbiAgaWYgKE1hdGguYWJzKGMpIDwgdGhpcy5FUFNJTE9OICYmIE1hdGguYWJzKGQpIDwgdGhpcy5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIGRlbm9taW5hdG9yID0gTWF0aC5wb3coYywgMikgKyBNYXRoLnBvdyhkLCAyKTtcbiAgcmV0dXJuIG5ldyB0aGlzKChhICogYyArIGIgKiBkKSAvIGRlbm9taW5hdG9yLCAoYiAqIGMgLSBhICogZCkgLyBkZW5vbWluYXRvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGl2aWRlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudGlhbCBmdW5jdGlvbiB3aXRoIGJhc2UgRVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gRXhwb25lbnRcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgZSB0byB0aGUgcG93ZXIgb2YgbnVtXHJcbiAqL1xuZnVuY3Rpb24gZXhwKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciB0aGV0YSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcbiAgdmFyIHIgPSBNYXRoLmV4cChyZSk7XG4gIHJldHVybiBuZXcgdGhpcyhyICogTWF0aC5jb3ModGhldGEpLCByICogTWF0aC5zaW4odGhldGEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHA7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBOb3RlIHRoYXQgdGhlIGFyZ3VtZW50IGlzIHJlc3RyaWN0ZWQgdG8gdGhlIGludGVydmFsIFsgMCwgMiAqIFBJIClcclxuICogSWYgdGhlIGdpdmVuIG51bWJlciBpcyBjb25zaWRlcmVkIGFzIDAsIHJldHVybiB1bmRlZmluZWRcclxuICogQHJldHVybiB7IE51bWJlciB9IC0gUmV0dXJuIHRoZSBhcmd1bWVudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldEFyZ3VtZW50KCkge1xuICB2YXIgeCA9IHRoaXMucmU7XG4gIHZhciB5ID0gdGhpcy5pbTtcbiAgdmFyIGVwc2lsb24gPSAxIC8gKE1hdGgucG93KDEwLCAxNSkgKiAyKTtcblxuICBpZiAoTWF0aC5hYnMoeCkgPCBlcHNpbG9uICYmIE1hdGguYWJzKHkpIDwgZXBzaWxvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoeCA9PT0gMCkge1xuICAgIGlmICh5ID4gMCkge1xuICAgICAgcmV0dXJuIE1hdGguUEkgKiAwLjU7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEkgKiAxLjU7XG4gIH1cblxuICBpZiAoeSA9PT0gMCkge1xuICAgIGlmICh4ID4gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguUEk7XG4gIH1cblxuICBpZiAoeCA+IDAgJiYgeSA+IDApIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuKHkgLyB4KTtcbiAgfVxuXG4gIGlmICh4IDwgMCAmJiB5ID4gMCkge1xuICAgIHJldHVybiBNYXRoLlBJIC0gTWF0aC5hdGFuKHkgLyAoeCAqIC0xKSk7XG4gIH1cblxuICBpZiAoeCA8IDAgJiYgeSA8IDApIHtcbiAgICByZXR1cm4gTWF0aC5QSSArIE1hdGguYXRhbih5ICogLTEgLyAoeCAqIC0xKSk7XG4gIH1cblxuICByZXR1cm4gTWF0aC5QSSAqIDIgLSBNYXRoLmF0YW4oeSAqIC0xIC8geCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXJndW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIGltYWdpbmFyeSBwYXJ0IG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gZ2V0SW1hZ2luYXJ5KCkge1xuICByZXR1cm4gdGhpcy5pbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJbWFnaW5hcnk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIG1vZHVsdXMgKGxlbmd0aCkgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICovXG5mdW5jdGlvbiBnZXRNb2R1bHVzKCkge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMucmUsIDIpICsgTWF0aC5wb3codGhpcy5pbSwgMikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1vZHVsdXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBAcmV0dXJuIHsgTnVtYmVyIH0gLSBSZXR1cm4gdGhlIHJlYWwgcGFydCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIGdldFJlYWwoKSB7XG4gIHJldHVybiB0aGlzLnJlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJlYWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIGludmVyc2Ugb2YgZ2l2ZW4gY29tcGxleCBudW1iZXIsIGkuZS4gMS96XHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSBpbnZlcnNlXHJcbiAqL1xuZnVuY3Rpb24gaW52ZXJzZShudW0pIHtcbiAgaWYgKCEobnVtIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gdGhpcy5kaXZpZGUodGhpcy5PTkUsIG51bSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52ZXJzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHR3byBjb21wbGV4IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgYXMgaWRlbnRpY2FsLlxyXG4gKiBFaXRoZXIgYm90aCBhcmUgTmFOIG9yIGJvdGggcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnRzIGFyZSBleHRyZW1lbHkgY2xvc2VkLlxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXJcclxuICogQHBhcmFtIHsgSW50ZWdlciB9IGRpZ2l0IC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJuIHsgQm9vbGVhbiB9IC0gUmV0dXJuIHRydWUgaWYgdHdvIGNvbXBsZXggbnVtYmVycyBhcmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWxcclxuICovXG5mdW5jdGlvbiBpc0VxdWFsKG51bTEsIG51bTIpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAxNTtcblxuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZGlnaXQpIHx8IGRpZ2l0IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBkaWdpdCcpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIGEgPSBudW0xLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0xLmdldEltYWdpbmFyeSgpO1xuICB2YXIgYyA9IG51bTIuZ2V0UmVhbCgpO1xuICB2YXIgZCA9IG51bTIuZ2V0SW1hZ2luYXJ5KCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYikgJiYgTnVtYmVyLmlzTmFOKGMpICYmIE51bWJlci5pc05hTihkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBjKSA8IEVQU0lMT04gJiYgTWF0aC5hYnMoYiAtIGQpIDwgRVBTSUxPTjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGdpdmVuIGNvbXBsZXggbnVtYmVyIGlzIE5hTiBvciBub3RcclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBCb29sZWFuIH0gLSBSZXR1cm4gdHJ1ZSBpZiBvbmUgb2YgcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnQgYXJlIE5hTlxyXG4gKi9cbmZ1bmN0aW9uIGlzTmFOKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciByZSA9IG51bS5nZXRSZWFsKCk7XG4gIHZhciBpbSA9IG51bS5nZXRJbWFnaW5hcnkoKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKHJlKSB8fCBOdW1iZXIuaXNOYU4oaW0pKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYU47IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIG5hdHVyYWwgbG9nIG9mIGdpdmVuIGNvbXBsZXggbnVtYmVyXHJcbiAqIE5vdGUgdGhhdCBjb21wbGV4IGxvZyBpcyBhIG11bHRpdmFsdWVkIGZ1bmN0aW9uLFxyXG4gKiBCdXQgdGhpcyBmdW5jdGlvbiBvbmx5IHByb3ZpZGVzIHRoZSBwcmluY2lwYWwgdmFsdWUgYnlcclxuICogcmVzdHJpY3RpbmcgdGhlIGltYWdpbmFyeSBwYXJ0IHRvIHRoZSBpbnRlcnZhbCBbMCwgMiAqIFBpKS5cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBhZnRlciB0YWtpbmcgbmF0dXJhbCBsb2dcclxuICovXG5mdW5jdGlvbiBsb2cobnVtKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgdmFyIHIgPSBudW0uZ2V0TW9kdWx1cygpO1xuICB2YXIgdGhldGEgPSBudW0uZ2V0QXJndW1lbnQoKTtcblxuICBpZiAociA8IHRoaXMuRVBTSUxPTiB8fCB0aGV0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuTmFOO1xuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKE1hdGgubG9nKHIpLCB0aGV0YSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgcHJvZHVjdCBvZiB0d28gY29tcGxleCBudW1iZXJzXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0xIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIGxlZnQgb2YgJ3gnIHNpZ25cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bTIgLSBDb21wbGV4IG51bWJlciBvbiB0aGUgcmlnaHQgb2YgJ3gnIHNpZ25cclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFByb2R1Y3Qgb2YgdHdvIG51bWJlcnNcclxuICovXG5mdW5jdGlvbiBtdWx0aXBseShudW0xLCBudW0yKSB7XG4gIGlmICghKG51bTEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKG51bTIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtMS5yZTtcbiAgdmFyIGIgPSBudW0xLmltO1xuICB2YXIgYyA9IG51bTIucmU7XG4gIHZhciBkID0gbnVtMi5pbTtcbiAgcmV0dXJuIG5ldyB0aGlzKGEgKiBjIC0gYiAqIGQsIGEgKiBkICsgYiAqIGMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBwb3dlciBvZiBjb21wbGV4IG51bWJlcixcclxuICogVGhlIGV4cG9uZW50IGNhbiBiZSBhbnkgcmVhbCBudW1iZXJcclxuICogSWYgeW91IHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBrLXRoIHJvb3QsXHJcbiAqIFlvdSBzaG91bGQga25vdyB0aGF0IGl0IG9ubHkgcmV0dXJucyBvbmUgb3V0IG9mIGsgc29sdXRpb25zLFxyXG4gKiBBbHRob3VnaCB0aGVyZSBhcmUgdG90YWwgayBwb3NzaWJsZSBzb2x1dGlvbnMgZm9yIGstdGggcm9vdCBwcm9ibGVtLlxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQmFzZVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IHwgTnVtYmVyIH0gbiAtIEV4cG9uZW50XHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZXhwb25lbnRpYXRpb25cclxuICovXG5mdW5jdGlvbiBwb3cobnVtLCBuKSB7XG4gIGlmICghKG51bSBpbnN0YW5jZW9mIHRoaXMpIHx8IHR5cGVvZiBuICE9PSAnbnVtYmVyJyAmJiAhKG4gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbiA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShuKSB8fCBOdW1iZXIuaXNOYU4obikpIHtcbiAgICAgIHJldHVybiB0aGlzLk5hTjtcbiAgICB9XG5cbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuT05FO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRXF1YWwobnVtLCB0aGlzLlpFUk8pKSB7XG4gICAgICByZXR1cm4gdGhpcy5aRVJPO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmV4cCh0aGlzLm11bHRpcGx5KG5ldyB0aGlzKG4sIDApLCB0aGlzLmxvZyhudW0pKSk7XG4gIH1cblxuICBpZiAobiBpbnN0YW5jZW9mIHRoaXMpIHtcbiAgICByZXR1cm4gdGhpcy5leHAodGhpcy5tdWx0aXBseShuLCB0aGlzLmxvZyhudW0pKSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5OYU47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG93OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBzZWNhbnQgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDIC8geyAoIDJrICsgMSkgKiBQSSAvIDIgOiBrIGlzIGFueSBpbnRlZ2VyIH1cclxuICogQHBhcmFtIHsgQ29tcGxleCB9IG51bSAtIENvbXBsZXggbnVtYmVyXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBSZXR1cm4gdGhlIHJlc3VsdCBvZiBjb21wbGV4IHNlY2FudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHNlYyhudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuT05FLCB0aGlzLmNvcyhudW0pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGUgdGhlIHNpbmUgb2YgZ2l2ZW4gY29tcGxleCBudW1iZXJcclxuICogVGhlIGRvbWFpbiBpcyBDXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0gLSBDb21wbGV4IG51bWJlclxyXG4gKiBAcmV0dXJuIHsgQ29tcGxleCB9IC0gUmV0dXJuIHRoZSByZXN1bHQgb2YgY29tcGxleCBzaW5lIGZ1bmN0aW9uXHJcbiAqL1xuZnVuY3Rpb24gc2luKG51bSkge1xuICBpZiAoIShudW0gaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHJldHVybiB0aGlzLk5hTjtcbiAgfVxuXG4gIHZhciBhID0gbnVtLmdldFJlYWwoKTtcbiAgdmFyIGIgPSBudW0uZ2V0SW1hZ2luYXJ5KCk7XG4gIHJldHVybiBuZXcgdGhpcyhNYXRoLnNpbihhKSAqIE1hdGguY29zaChiKSwgTWF0aC5jb3MoYSkgKiBNYXRoLnNpbmgoYikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNpbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIGNvbXBsZXggbnVtYmVyc1xyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtMSAtIENvbXBsZXggbnVtYmVyIG9uIHRoZSBsZWZ0IG9mICctJyBzaWduXHJcbiAqIEBwYXJhbSB7IENvbXBsZXggfSBudW0yIC0gQ29tcGxleCBudW1iZXIgb24gdGhlIHJpZ2h0IG9mICctJyBzaWduXHJcbiAqIEByZXR1cm4geyBDb21wbGV4IH0gLSBEaWZmZXJlbmNlIG9mIHR3byBudW1iZXJzXHJcbiAqL1xuZnVuY3Rpb24gc3VidHJhY3QobnVtMSwgbnVtMikge1xuICBpZiAoIShudW0xIGluc3RhbmNlb2YgdGhpcykgfHwgIShudW0yIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICByZXR1cm4gdGhpcy5OYU47XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobnVtMS5yZSAtIG51bTIucmUsIG51bTEuaW0gLSBudW0yLmltKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJ0cmFjdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZSB0aGUgdGFuZ2VudCBvZiBnaXZlbiBjb21wbGV4IG51bWJlclxyXG4gKiBUaGUgZG9tYWluIGlzIEMgLyB7ICggMmsgKyAxKSAqIFBJIC8gMiA6IGsgaXMgYW55IGludGVnZXIgfVxyXG4gKiBAcGFyYW0geyBDb21wbGV4IH0gbnVtIC0gQ29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIFJldHVybiB0aGUgcmVzdWx0IG9mIGNvbXBsZXggdGFuZ2VudCBmdW5jdGlvblxyXG4gKi9cbmZ1bmN0aW9uIHRhbihudW0pIHtcbiAgcmV0dXJuIHRoaXMuZGl2aWRlKHRoaXMuc2luKG51bSksIHRoaXMuY29zKG51bSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEByZXR1cm4geyBTdHJpbmcgfSAtIFJldHVybiB0aGUgc3RyaW5naWZpZWQgYW5kIGZvcm1hdHRlZCBjb21wbGV4IG51bWJlclxyXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICB2YXIgcmUgPSB0aGlzLnJlLFxuICAgICAgaW0gPSB0aGlzLmltO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4ocmUpIHx8IE51bWJlci5pc05hTihpbSkpIHtcbiAgICByZXR1cm4gJ05hTic7XG4gIH1cblxuICBpZiAocmUgPT09IDAgJiYgaW0gPT09IDApIHtcbiAgICByZXR1cm4gJzAnO1xuICB9XG5cbiAgaWYgKHJlID09PSAwKSB7XG4gICAgaWYgKGltID09PSAxKSB7XG4gICAgICByZXR1cm4gJ2knO1xuICAgIH1cblxuICAgIGlmIChpbSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAnLWknO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChpbSwgXCJpXCIpO1xuICB9XG5cbiAgaWYgKGltID09PSAwKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlKTtcbiAgfVxuXG4gIGlmIChpbSA+IDApIHtcbiAgICBpZiAoaW0gPT09IDEpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBpXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChyZSwgXCIgKyBcIikuY29uY2F0KGltLCBcImlcIik7XG4gIH1cblxuICBpZiAoaW0gPT09IC0xKSB7XG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KHJlLCBcIiAtIGlcIik7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQocmUsIFwiIC0gXCIpLmNvbmNhdChNYXRoLmFicyhpbSksIFwiaVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1N0cmluZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKipcclxuICogUmV0dXJucyBhIENvbXBsZXggTnVtYmVyXHJcbiAqIEBwYXJhbSB7IE51bWJlciB9IGFyZzEgLSByZWFsIHBhcnQgb2YgdGhlIGNvbXBsZXggbnVtYmVyXHJcbiAqIEBwYXJhbSB7IE51bWJlciB9IGFyZzIgLSBpbWFnaW5hcnkgcGFydCBvZiB0aGUgY29tcGxleCBudW1iZXJcclxuICogQHJldHVybiB7IENvbXBsZXggfSAtIENvbXBsZXggTnVtYmVyXHJcbiAqL1xuZnVuY3Rpb24gQ29tcGxleChhcmcxLCBhcmcyKSB7XG4gIHZhciB0eXBlMSA9IF90eXBlb2YoYXJnMSk7XG5cbiAgdmFyIHR5cGUyID0gX3R5cGVvZihhcmcyKTtcblxuICBpZiAodHlwZTEgPT09ICdudW1iZXInICYmIHR5cGUyID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYXJnMSkgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSkge1xuICAgICAgdGhpcy5yZSA9IE5hTjtcbiAgICAgIHRoaXMuaW0gPSBOYU47XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLnJlID0gYXJnMTtcbiAgICB0aGlzLmltID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh0eXBlMSA9PT0gJ251bWJlcicgJiYgdHlwZTIgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKE51bWJlci5pc05hTihhcmcxKSB8fCBOdW1iZXIuaXNOYU4oYXJnMikgfHwgIU51bWJlci5pc0Zpbml0ZShhcmcxKSB8fCAhTnVtYmVyLmlzRmluaXRlKGFyZzIpKSB7XG4gICAgICB0aGlzLnJlID0gTmFOO1xuICAgICAgdGhpcy5pbSA9IE5hTjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMucmUgPSBhcmcxO1xuICAgIHRoaXMuaW0gPSBhcmcyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdGhpcy5yZSA9IE5hTjtcbiAgdGhpcy5pbSA9IE5hTjtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbkNvbXBsZXgucHJvdG90eXBlLmdldFJlYWwgPSByZXF1aXJlKCcuL2NvcmUvZ2V0UmVhbCcpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0SW1hZ2luYXJ5ID0gcmVxdWlyZSgnLi9jb3JlL2dldEltYWdpbmFyeScpO1xuQ29tcGxleC5wcm90b3R5cGUuZ2V0TW9kdWx1cyA9IHJlcXVpcmUoJy4vY29yZS9nZXRNb2R1bHVzJyk7XG5Db21wbGV4LnByb3RvdHlwZS5nZXRBcmd1bWVudCA9IHJlcXVpcmUoJy4vY29yZS9nZXRBcmd1bWVudCcpO1xuQ29tcGxleC5wcm90b3R5cGUudG9TdHJpbmcgPSByZXF1aXJlKCcuL2NvcmUvdG9TdHJpbmcnKTtcbkNvbXBsZXguaXNOYU4gPSByZXF1aXJlKCcuL2NvcmUvaXNOYU4nKTtcbkNvbXBsZXguaXNFcXVhbCA9IHJlcXVpcmUoJy4vY29yZS9pc0VxdWFsJyk7XG5Db21wbGV4LmNvbmp1Z2F0ZSA9IHJlcXVpcmUoJy4vY29yZS9jb25qdWdhdGUnKTtcbkNvbXBsZXguaW52ZXJzZSA9IHJlcXVpcmUoJy4vY29yZS9pbnZlcnNlJyk7XG5Db21wbGV4LmFkZCA9IHJlcXVpcmUoJy4vY29yZS9hZGQnKTtcbkNvbXBsZXguc3VidHJhY3QgPSByZXF1aXJlKCcuL2NvcmUvc3VidHJhY3QnKTtcbkNvbXBsZXgubXVsdGlwbHkgPSByZXF1aXJlKCcuL2NvcmUvbXVsdGlwbHknKTtcbkNvbXBsZXguZGl2aWRlID0gcmVxdWlyZSgnLi9jb3JlL2RpdmlkZScpO1xuQ29tcGxleC5leHAgPSByZXF1aXJlKCcuL2NvcmUvZXhwJyk7XG5Db21wbGV4LmxvZyA9IHJlcXVpcmUoJy4vY29yZS9sb2cnKTtcbkNvbXBsZXgucG93ID0gcmVxdWlyZSgnLi9jb3JlL3BvdycpO1xuQ29tcGxleC5zaW4gPSByZXF1aXJlKCcuL2NvcmUvc2luJyk7XG5Db21wbGV4LmNvcyA9IHJlcXVpcmUoJy4vY29yZS9jb3MnKTtcbkNvbXBsZXgudGFuID0gcmVxdWlyZSgnLi9jb3JlL3RhbicpO1xuQ29tcGxleC5jc2MgPSByZXF1aXJlKCcuL2NvcmUvY3NjJyk7XG5Db21wbGV4LnNlYyA9IHJlcXVpcmUoJy4vY29yZS9zZWMnKTtcbkNvbXBsZXguY290ID0gcmVxdWlyZSgnLi9jb3JlL2NvdCcpO1xuQ29tcGxleC5hc2luID0gcmVxdWlyZSgnLi9jb3JlL2FzaW4nKTtcbkNvbXBsZXguYWNvcyA9IHJlcXVpcmUoJy4vY29yZS9hY29zJyk7XG5Db21wbGV4LmF0YW4gPSByZXF1aXJlKCcuL2NvcmUvYXRhbicpO1xuQ29tcGxleC5hY3NjID0gcmVxdWlyZSgnLi9jb3JlL2Fjc2MnKTtcbkNvbXBsZXguYXNlYyA9IHJlcXVpcmUoJy4vY29yZS9hc2VjJyk7XG5Db21wbGV4LmFjb3QgPSByZXF1aXJlKCcuL2NvcmUvYWNvdCcpO1xuQ29tcGxleC5OYU4gPSBuZXcgQ29tcGxleChOYU4pO1xuQ29tcGxleC5PTkUgPSBuZXcgQ29tcGxleCgxKTtcbkNvbXBsZXguWkVSTyA9IG5ldyBDb21wbGV4KDApO1xuQ29tcGxleC5QSSA9IG5ldyBDb21wbGV4KE1hdGguUEkpO1xuQ29tcGxleC5FID0gbmV3IENvbXBsZXgoTWF0aC5FKTtcbkNvbXBsZXguRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIDE1KSAqIDIpO1xubW9kdWxlLmV4cG9ydHMgPSBDb21wbGV4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSU5WQUxJRF9BUlJBWTogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLWFycmF5IGFyZ3VtZW50JyxcbiAgSU5WQUxJRF9NQVRSSVg6ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBhbiBpbnZhbGlkIG1hdHJpeCcsXG4gIElOVkFMSURfU1FVQVJFX01BVFJJWDogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGEgbm9uLXNxdWFyZSBtYXRyaXgnLFxuICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gdXBwZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgYSBub24gbG93ZXItdHJpYW5ndWxhciBtYXRyaXgnLFxuICBJTlZBTElEX0VYUE9ORU5UOiAnSW52YWxpZCBhcmd1bWVudDogRXhwZWN0ZWQgYSBub24tbmVnYXRpdmUgaW50ZWdlciBleHBvbmVudCcsXG4gIElOVkFMSURfUk9XX0NPTDogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIHJvdyBhbmQgY29sdW1uJyxcbiAgSU5WQUxJRF9ST1c6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBub24tbmVnYXRpdmUgaW50ZWdlciByb3cnLFxuICBJTlZBTElEX0NPTFVNTjogJ0ludmFsaWQgYXJndW1lbnQ6IEV4cGVjdGVkIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIGNvbHVtbicsXG4gIElOVkFMSURfUk9XU19FWFBSRVNTSU9OOiAnSW52YWxpZCBhcmd1bWVudDogUmVjZWl2ZWQgaW52YWxpZCByb3dzIGV4cHJlc3Npb24nLFxuICBJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTjogJ0ludmFsaWQgYXJndW1lbnQ6IFJlY2VpdmVkIGludmFsaWQgY29sdW1ucyBleHByZXNzaW9uJyxcbiAgSU5WQUxJRF9QX05PUk06ICdJbnZhbGlkIGFyZ3VtZW50OiBSZWNlaXZlZCBpbnZhbGlkIHAtbm9ybScsXG4gIE9WRVJGTE9XX0lOREVYOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfQ09MVU1OOiAnSW52YWxpZCBhcmd1bWVudDogQ29sdW1uIGluZGV4IG92ZXJmbG93JyxcbiAgT1ZFUkZMT1dfUk9XOiAnSW52YWxpZCBhcmd1bWVudDogUm93IGluZGV4IG92ZXJmbG93JyxcbiAgTk9fVU5JUVVFX1NPTFVUSU9OOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBzeXN0ZW0gaGFzIG5vIHVuaXF1ZSBzb2x1dGlvbicsXG4gIFNJWkVfSU5DT01QQVRJQkxFOiAnSW52YWxpZCBhcmd1bWVudDogTWF0cml4IHNpemUtaW5jb21wYXRpYmxlJyxcbiAgU0lOR1VMQVJfTUFUUklYOiAnQXJpdGhtZXRpYyBFeGNlcHRpb246IFRoZSBtYXRyaXggaXMgbm90IGludmVydGlibGUnLFxuICBFWFBFQ1RFRF9TVFJJTkdfTlVNQkVSX0FUX1BPU18xXzI6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBhIHN0cmluZyBvciBhIG51bWJlciBhdCBhcmd1bWVudHNbMV0gYW5kIGFyZ3VtZW50c1syXScsXG4gIEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVM6ICdJbnZhbGlkIGFyZ3VtZW50OiBFeHBlY3RlZCBlaXRoZXIgYW4gYXJyYXkgb2YgbnVtYmVycyBvciBhbiBhcnJheSBvZiBzcXVhcmUgbWF0cmljZXMnXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBMVVAgZGVjb21wb3NpdGlvbiBvZiB0aGUgTWF0cml4LFxyXG4gKiB3aGVyZSBMIGlzIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4IHdoaWNoIGRpYWdvbmFsIGVudHJpZXMgYXJlIGFsd2F5cyAxLFxyXG4gKiBVIGlzIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4LCBhbmQgUCBpcyBwZXJtdXRhdGlvbiBtYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIEl0IGlzIGltcGxlbWVudGVkIHVzaW5nIEdhdXNzaWFuIEVsaW1pbmF0aW9uIHdpdGggUGFydGlhbCBQaXZvdGluZyBpbiBvcmRlciB0b1xyXG4gKiByZWR1Y2UgdGhlIGVycm9yIGNhdXNlZCBieSBmbG9hdGluZy1wb2ludCBhcml0aG1ldGljLjxicj48YnI+XHJcbiAqIFxyXG4gKiBOb3RlIHRoYXQgaWYgb3B0aW1pemVkIGlzIHRydWUsIFAgaXMgYSBQZXJtdXRhdGlvbiBBcnJheSBhbmQgYm90aCBMIGFuZCBVIGFyZSBtZXJnZWRcclxuICogaW50byBvbmUgbWF0cml4IGluIG9yZGVyIHRvIGltcHJvdmUgcGVyZm9ybWFuY2UuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBtYXRyaXhcclxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW1pemVkPWZhbHNlXSAtIFJldHVybnMgW1AsIExVXSBpZiBpdCBpcyB0cnVlLCBbUCwgTCwgVV0gaWYgaXQgaXMgZmFsc2VcclxuICogQHJldHVybnMge01hdHJpeFtdfSBUaGUgTFVQIGRlY29tcG9zaXRpb24gb2YgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIExVKEEpIHtcbiAgdmFyIG9wdGltaXplZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBBLl9kaWdpdCkgKiAyKTtcbiAgdmFyIHBlcm11dGF0aW9uID0gaW5pdFBlcm11dGF0aW9uKHJvdyk7XG5cbiAgdmFyIGNvcHkgPSB0aGlzLmNsb25lKEEpLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3cgLSAxOyBpKyspIHtcbiAgICB2YXIgY3VycmVudENvbCA9IE1hdGgubWluKGksIGNvbCk7IC8vIGFwcGx5IFBhcnRpYWwgUGl2b3RpbmdcblxuICAgIFBhcnRpYWxQaXZvdGluZyhjb3B5LCBwZXJtdXRhdGlvbiwgY3VycmVudENvbCwgcm93LCBjb2wpO1xuICAgIHZhciBpdGggPSBwZXJtdXRhdGlvbltpXTtcbiAgICB2YXIgcGl2b3QgPSBjb3B5W2l0aF1bY3VycmVudENvbF07XG5cbiAgICBpZiAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgcm93OyBqKyspIHtcbiAgICAgIHZhciBqdGggPSBwZXJtdXRhdGlvbltqXTtcbiAgICAgIHZhciBlbnRyeSA9IGNvcHlbanRoXVtjdXJyZW50Q29sXTtcblxuICAgICAgaWYgKE1hdGguYWJzKGVudHJ5KSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHZhciBmYWN0b3IgPSBlbnRyeSAvIHBpdm90O1xuXG4gICAgICAgIGZvciAodmFyIGsgPSBjdXJyZW50Q29sOyBrIDwgY29sOyBrKyspIHtcbiAgICAgICAgICBjb3B5W2p0aF1ba10gLT0gZmFjdG9yICogY29weVtpdGhdW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29weVtqdGhdW2N1cnJlbnRDb2xdID0gZmFjdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocm93KTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCByb3c7IF9pMisrKSB7XG4gICAgcmVzdWx0W19pMl0gPSBjb3B5W3Blcm11dGF0aW9uW19pMl1dO1xuICB9XG5cbiAgaWYgKG9wdGltaXplZCkge1xuICAgIHJldHVybiBbcGVybXV0YXRpb24sIG5ldyB0aGlzKHJlc3VsdCldO1xuICB9XG5cbiAgdmFyIFAgPSB0aGlzLmdlbmVyYXRlKHJvdywgcm93LCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHZhciBpZHggPSBwZXJtdXRhdGlvbltpXTtcblxuICAgIGlmIChqID09PSBpZHgpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbiAgdmFyIEwgPSB0aGlzLmdlbmVyYXRlKHJvdywgc2l6ZSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSA9PT0gaikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgaWYgKGkgPCBqKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0W2ldW2pdO1xuICB9KTtcbiAgdmFyIFUgPSB0aGlzLmdlbmVyYXRlKHNpemUsIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSA+IGopIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRbaV1bal07XG4gIH0pO1xuICByZXR1cm4gW1AsIEwsIFVdO1xufVxuXG47XG5cbmZ1bmN0aW9uIGluaXRQZXJtdXRhdGlvbihzaXplKSB7XG4gIHZhciBwZXJtdXRhdGlvbiA9IG5ldyBBcnJheShzaXplKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIHBlcm11dGF0aW9uW2ldID0gaTtcbiAgfVxuXG4gIHJldHVybiBwZXJtdXRhdGlvbjtcbn1cblxuZnVuY3Rpb24gUGFydGlhbFBpdm90aW5nKG1hdHJpeCwgcGVybXV0YXRpb24sIHBvcywgcm93LCBjb2wpIHtcbiAgdmFyIGN1cnJlbnRDb2wgPSBNYXRoLm1pbihwb3MsIGNvbCk7XG4gIHZhciBtYXhJZHggPSBwb3M7XG4gIHZhciBtYXggPSBNYXRoLmFicyhtYXRyaXhbcGVybXV0YXRpb25bcG9zXV1bY3VycmVudENvbF0pO1xuXG4gIGZvciAodmFyIGkgPSBwb3MgKyAxOyBpIDwgcm93OyBpKyspIHtcbiAgICB2YXIgdmFsdWUgPSBNYXRoLmFicyhtYXRyaXhbcGVybXV0YXRpb25baV1dW2N1cnJlbnRDb2xdKTtcblxuICAgIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgbWF4SWR4ID0gaTtcbiAgICAgIG1heCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHZhciB0ID0gcGVybXV0YXRpb25bcG9zXTtcbiAgcGVybXV0YXRpb25bcG9zXSA9IHBlcm11dGF0aW9uW21heElkeF07XG4gIHBlcm11dGF0aW9uW21heElkeF0gPSB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExVOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIHRoZSBNYXRyaXhcclxuICogd2hlcmUgUSBpcyBvcnRob2dvbmFsIG1hdHJpeCwgUiBpcyB1cHBlciB0cmlhbmd1bGFyIG1hdHJpeC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIGFsZ29yaXRobSBpcyBpbXBsZW1lbnRlZCB1c2luZyBIb3VzZWhvbGRlciBUcmFuc2Zvcm0gaW5zdGVhZCBvZiBHcmFt4oCTU2NobWlkdCBwcm9jZXNzXHJcbiAqIGJlY2F1c2UgdGhlIEhvdXNlaG9sZGVyIFRyYW5zZm9ybSBpcyBtb3JlIG51bWVyaWNhbGx5IHN0YWJsZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4W119IFRoZSBRUiBkZWNvbXBvc2l0aW9uIG9mIG1hdHJpeCBpbiB0aGUgZm9ybSBvZiBbUSwgUl1cclxuICovXG5cblxuZnVuY3Rpb24gUVIoQSkge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBzaXplID0gTWF0aC5taW4ocm93LCBjb2wpO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBtYXRyaXhSID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBtYXRyaXhRID0gdGhpcy5pZGVudGl0eShyb3cpLl9tYXRyaXg7XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAvLyBpZiBhbGwgZW50cmllcyBiZWxvdyBtYWluIGRpYWdvbmFsIGFyZSBjb25zaWRlcmVkIGFzIHplcm8sIHNraXAgdGhpcyByb3VuZFxuICAgIHZhciBza2lwID0gdHJ1ZTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHJvdzsgaSsrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobWF0cml4UltpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICBza2lwID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcCkge1xuICAgICAgLy8gQXBwbHkgSG91c2Vob2xkZXIgdHJhbnNmb3JtXG4gICAgICB2YXIgbm9ybSA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9pMiA9IGo7IF9pMiA8IHJvdzsgX2kyKyspIHtcbiAgICAgICAgbm9ybSArPSBNYXRoLnBvdyhtYXRyaXhSW19pMl1bal0sIDIpO1xuICAgICAgfVxuXG4gICAgICBub3JtID0gTWF0aC5zcXJ0KG5vcm0pOyAvLyByZWR1Y2UgZmxvYXRpbmcgcG9pbnQgYXJpdGhtYXRpYyBlcnJvclxuXG4gICAgICB2YXIgcyA9IC0xO1xuXG4gICAgICBpZiAobWF0cml4UltqXVtqXSA8IDApIHtcbiAgICAgICAgcyA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciB1MSA9IG1hdHJpeFJbal1bal0gLSBzICogbm9ybTtcbiAgICAgIHZhciB3ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCByb3cgLSBqOyBfaTMrKykge1xuICAgICAgICB3W19pM10gPSBtYXRyaXhSW19pMyArIGpdW2pdIC8gdTE7XG4gICAgICB9XG5cbiAgICAgIHdbMF0gPSAxO1xuICAgICAgdmFyIHRhdSA9IC0xICogcyAqIHUxIC8gbm9ybTtcbiAgICAgIHZhciBzdWJSID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICBmb3IgKHZhciBfaTQgPSAwOyBfaTQgPCByb3cgLSBqOyBfaTQrKykge1xuICAgICAgICB2YXIgbmV3Um93ID0gbmV3IEFycmF5KGNvbCk7XG5cbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjb2w7IGsrKykge1xuICAgICAgICAgIG5ld1Jvd1trXSA9IG1hdHJpeFJbaiArIF9pNF1ba107XG4gICAgICAgIH1cblxuICAgICAgICBzdWJSW19pNF0gPSBuZXdSb3c7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNSA9IGo7IF9pNSA8IHJvdzsgX2k1KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IGNvbDsgX2srKykge1xuICAgICAgICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCByb3cgLSBqOyBtKyspIHtcbiAgICAgICAgICAgIHN1bW1hdGlvbiArPSBzdWJSW21dW19rXSAqIHdbbV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWF0cml4UltfaTVdW19rXSA9IHN1YlJbX2k1IC0gal1bX2tdIC0gdGF1ICogd1tfaTUgLSBqXSAqIHN1bW1hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3ViUSA9IG5ldyBBcnJheShyb3cpO1xuXG4gICAgICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCByb3c7IF9pNisrKSB7XG4gICAgICAgIHZhciBfbmV3Um93ID0gbmV3IEFycmF5KHJvdyAtIGopO1xuXG4gICAgICAgIGZvciAodmFyIF9rMiA9IDA7IF9rMiA8IHJvdyAtIGo7IF9rMisrKSB7XG4gICAgICAgICAgX25ld1Jvd1tfazJdID0gbWF0cml4UVtfaTZdW2ogKyBfazJdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViUVtfaTZdID0gX25ld1JvdztcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k3ID0gMDsgX2k3IDwgcm93OyBfaTcrKykge1xuICAgICAgICBmb3IgKHZhciBfazMgPSBqOyBfazMgPCByb3c7IF9rMysrKSB7XG4gICAgICAgICAgdmFyIF9zdW1tYXRpb24gPSAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHJvdyAtIGo7IF9tKyspIHtcbiAgICAgICAgICAgIF9zdW1tYXRpb24gKz0gc3ViUVtfaTddW19tXSAqIHdbX21dO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdHJpeFFbX2k3XVtfazNdID0gc3ViUVtfaTddW19rMyAtIGpdIC0gdGF1ICogd1tfazMgLSBqXSAqIF9zdW1tYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfaTggPSAwOyBfaTggPCByb3c7IF9pOCsrKSB7XG4gICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IGNvbDsgX2orKykge1xuICAgICAgaWYgKF9pOCA+IF9qKSB7XG4gICAgICAgIG1hdHJpeFJbX2k4XVtfal0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbbmV3IHRoaXMobWF0cml4USksIG5ldyB0aGlzKG1hdHJpeFIpXTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBRUjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1VQUEVSX1RSSUFOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9VUFBFUl9UUklBTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT047XG4vKipcclxuKiBTb2x2ZSBzeXN0ZW0gb2YgbGluZWFyIGVxdWF0aW9ucyBVeCA9IHkgdXNpbmcgYmFja3dhcmQgc3Vic3RpdHV0aW9uLFxyXG4qIHdoZXJlIFUgaXMgYW4gdXBwZXIgdHJpYW5ndWxhciBtYXRyaXguXHJcbiogSWYgdGhlcmUgaXMgbm8gdW5pcXVlIHNvbHV0aW9ucywgYW4gZXJyb3IgaXMgdGhyb3duLlxyXG4qIEBtZW1iZXJvZiBNYXRyaXhcclxuKiBAc3RhdGljXHJcbiogQHBhcmFtIHtNYXRyaXh9IFUgLSBBbnkgbiB4IG4gdXBwZXIgdHJpYW5ndWxhciBNYXRyaXhcclxuKiBAcGFyYW0ge01hdHJpeH0geSAtIEFueSBuIHggMSBNYXRyaXhcclxuKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIFV4ID0geVxyXG4qL1xuXG5cbmZ1bmN0aW9uIGJhY2t3YXJkKFUsIHkpIHtcbiAgaWYgKCEoVSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoeSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghVS5pc1VwcGVyVHJpYW5ndWxhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVBQRVJfVFJJQU5HVUxBUl9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFVLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gVS5zaXplKClbMF07XG5cbiAgdmFyIF95JHNpemUgPSB5LnNpemUoKSxcbiAgICAgIF95JHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3kkc2l6ZSwgMiksXG4gICAgICB5cm93ID0gX3kkc2l6ZTJbMF0sXG4gICAgICB5Y29sID0gX3kkc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeFUgPSBVLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhZID0geS5fbWF0cml4O1xuXG4gIGlmICh5cm93ICE9PSBzaXplIHx8IHljb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBVLl9kaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2VmZmljaWVudHMgPSBlbXB0eShzaXplLCAxKTtcblxuICBmb3IgKHZhciBfaTIgPSBzaXplIC0gMTsgX2kyID49IDA7IF9pMi0tKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gX2kyICsgMTsgaiA8IHNpemU7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXVswXSAqIG1hdHJpeFVbX2kyXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kyXVswXSA9IChtYXRyaXhZW19pMl1bMF0gLSBzdW1tYXRpb24pIC8gbWF0cml4VVtfaTJdW19pMl07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBiYWNrd2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX0xPV0VSX1RSSUFOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9MT1dFUl9UUklBTkdVTEFSX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT047XG4vKipcclxuICogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgTHggPSB5IHVzaW5nIGZvcndhcmQgc3Vic3RpdHV0aW9uLFxyXG4gKiB3aGVyZSBMIGlzIGEgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXguXHJcbiAqIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBMIC0gQW55IG4geCBuIGxvd2VyIHRyaWFuZ3VsYXIgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSB5IC0gQW55IG4geCAxIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBuIHggMSBNYXRyaXggd2hpY2ggaXMgdGhlIHNvbHV0aW9uIG9mIEx4ID0geVxyXG4gKi9cblxuXG5mdW5jdGlvbiBmb3J3YXJkKEwsIHkpIHtcbiAgaWYgKCEoTCBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoeSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTC5pc0xvd2VyVHJpYW5ndWxhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTE9XRVJfVFJJQU5HVUxBUl9NQVRSSVgpO1xuICB9XG5cbiAgaWYgKCFMLmlzU3F1YXJlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBzaXplID0gTC5zaXplKClbMF07XG5cbiAgdmFyIF95JHNpemUgPSB5LnNpemUoKSxcbiAgICAgIF95JHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3kkc2l6ZSwgMiksXG4gICAgICB5cm93ID0gX3kkc2l6ZTJbMF0sXG4gICAgICB5Y29sID0gX3kkc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeEwgPSBMLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhZID0geS5fbWF0cml4O1xuXG4gIGlmIChzaXplICE9PSB5cm93IHx8IHljb2wgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBMLl9kaWdpdCkgKiAyKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChNYXRoLmFicyhtYXRyaXhMW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2VmZmljaWVudHMgPSBlbXB0eShzaXplLCAxKTtcblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBzaXplOyBfaTIrKykge1xuICAgIHZhciBzdW1tYXRpb24gPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBfaTI7IGorKykge1xuICAgICAgc3VtbWF0aW9uICs9IGNvZWZmaWNpZW50c1tqXVswXSAqIG1hdHJpeExbX2kyXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kyXVswXSA9IChtYXRyaXhZW19pMl1bMF0gLSBzdW1tYXRpb24pIC8gbWF0cml4TFtfaTJdW19pMl07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBmb3J3YXJkOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBOT19VTklRVUVfU09MVVRJT04gPSBfcmVxdWlyZS5OT19VTklRVUVfU09MVVRJT04sXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYLFxuICAgIFNJWkVfSU5DT01QQVRJQkxFID0gX3JlcXVpcmUuU0laRV9JTkNPTVBBVElCTEU7XG4vKipcclxuICogU29sdmUgc3lzdGVtIG9mIGxpbmVhciBlcXVhdGlvbnMgQXggPSB5IHVzaW5nIExVIGRlY29tcG9zaXRpb24uXHJcbiAqIElmIHRoZXJlIGlzIG5vIHVuaXF1ZSBzb2x1dGlvbnMsIGFuIGVycm9yIGlzIHRocm93bi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBMIC0gQW55IG4geCBuIHNxdWFyZSBNYXRyaXhcclxuICogQHBhcmFtIHtNYXRyaXh9IHkgLSBBbnkgbiB4IDEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IG4geCAxIE1hdHJpeCB3aGljaCBpcyB0aGUgc29sdXRpb24gb2YgQXggPSB5XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHNvbHZlKEEsIGIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoYiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghQS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIGFSb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGFDb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX2Ikc2l6ZSA9IGIuc2l6ZSgpLFxuICAgICAgX2Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfYiRzaXplLCAyKSxcbiAgICAgIGJSb3cgPSBfYiRzaXplMlswXSxcbiAgICAgIGJDb2wgPSBfYiRzaXplMlsxXTtcblxuICBpZiAoYUNvbCAhPT0gYlJvdyB8fCBiQ29sICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFNJWkVfSU5DT01QQVRJQkxFKTtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgQS5fZGlnaXQpICogMik7XG5cbiAgdmFyIF90aGlzJExVID0gdGhpcy5MVShBLCB0cnVlKSxcbiAgICAgIF90aGlzJExVMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJExVLCAyKSxcbiAgICAgIFAgPSBfdGhpcyRMVTJbMF0sXG4gICAgICBMVSA9IF90aGlzJExVMlsxXTtcblxuICB2YXIgbWF0cml4TFUgPSBMVS5fbWF0cml4O1xuICB2YXIgbWF0cml4QiA9IGIuX21hdHJpeDtcblxuICBmb3IgKHZhciBpID0gYVJvdyAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKE1hdGguYWJzKG1hdHJpeExVW2ldW2ldKSA8IEVQU0lMT04pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19VTklRVUVfU09MVVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjbG9uZWRWZWN0b3IgPSBuZXcgQXJyYXkoYlJvdyk7XG4gIHZhciBjb2VmZmljaWVudHMgPSBuZXcgQXJyYXkoYlJvdyk7XG5cbiAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYlJvdzsgX2kyKyspIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICBjbG9uZWRWZWN0b3JbX2kyXSA9IG1hdHJpeEJbUFtfaTJdXVswXTtcbiAgfVxuXG4gIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IGFSb3c7IF9pMysrKSB7XG4gICAgdmFyIHN1bW1hdGlvbiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pMzsgaisrKSB7XG4gICAgICBzdW1tYXRpb24gKz0gY29lZmZpY2llbnRzW2pdICogbWF0cml4TFVbX2kzXVtqXTtcbiAgICB9XG5cbiAgICBjb2VmZmljaWVudHNbX2kzXSA9IGNsb25lZFZlY3RvcltfaTNdIC0gc3VtbWF0aW9uO1xuICB9XG5cbiAgZm9yICh2YXIgX2k0ID0gYVJvdyAtIDE7IF9pNCA+PSAwOyBfaTQtLSkge1xuICAgIHZhciBfc3VtbWF0aW9uID0gMDtcblxuICAgIGZvciAodmFyIF9qID0gX2k0ICsgMTsgX2ogPCBhUm93OyBfaisrKSB7XG4gICAgICBfc3VtbWF0aW9uICs9IG1hdHJpeExVW19pNF1bX2pdICogY2xvbmVkVmVjdG9yW19qXTtcbiAgICB9XG5cbiAgICBjbG9uZWRWZWN0b3JbX2k0XSA9IChjb2VmZmljaWVudHNbX2k0XSAtIF9zdW1tYXRpb24pIC8gbWF0cml4TFVbX2k0XVtfaTRdO1xuICB9XG5cbiAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgYlJvdzsgX2k1KyspIHtcbiAgICBjb2VmZmljaWVudHNbX2k1XSA9IFtjbG9uZWRWZWN0b3JbX2k1XV07XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoY29lZmZpY2llbnRzKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzb2x2ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBzdW0gb2YgdHdvIE1hdHJpY2VzXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGFkZChBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIF9CJHNpemUgPSBCLnNpemUoKSxcbiAgICAgIF9CJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ikc2l6ZSwgMiksXG4gICAgICByb3cyID0gX0Ikc2l6ZTJbMF0sXG4gICAgICBjb2wyID0gX0Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyAhPT0gcm93MiB8fCBjb2wgIT09IGNvbDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoU0laRV9JTkNPTVBBVElCTEUpO1xuICB9XG5cbiAgdmFyIG1hdHJpeDEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXgyID0gQi5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4MVtpXVtqXSArIG1hdHJpeDJbaV1bal07XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWCxcbiAgICBTSU5HVUxBUl9NQVRSSVggPSBfcmVxdWlyZS5TSU5HVUxBUl9NQVRSSVg7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuLyoqXHJcbiAqIEZpbmQgdGhlIGludmVyc2Ugb2Ygbm9uLXNpbmd1bGFyIG1hdHJpeCB1c2luZyBFbGVtZW50YXJ5IFJvdyBPcGVyYXRpb25zLlxyXG4gKiBJZiB0aGUgbWF0cml4IGlzIHNpbmd1bGFyLCBhbiBlcnJvciBpcyB0aHJvd24uXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBzcXVhcmUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBpbnZlcnNlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gaW52ZXJzZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIUEuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSBBLnNpemUoKVswXTtcblxuICBpZiAoc2l6ZSA9PT0gMCkge1xuICAgIC8vIGludmVyc2Ugb2YgMHgwIG1hdHJpeCBpcyBpdHNlbGZcbiAgICByZXR1cm4gbmV3IE1hdHJpeChbXSk7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIEEuX2RpZ2l0KSAqIDIpO1xuXG4gIHZhciBpbnYgPSB0aGlzLmlkZW50aXR5KHNpemUpLl9tYXRyaXg7XG5cbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZShBKS5fbWF0cml4O1xuXG4gIHZhciBwZXJtdXRhdGlvbiA9IGluaXRQZXJtdXRhdGlvbihzaXplKTsgLy8gaXRlcmF0ZSBlYWNoIGNvbHVtblxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgdmFyIHBpdm90SWR4ID0gajtcbiAgICB2YXIgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltqXV1bal07XG5cbiAgICB3aGlsZSAoTWF0aC5hYnMocGl2b3QpIDwgRVBTSUxPTiAmJiBwaXZvdElkeCA8IHNpemUgLSAxKSB7XG4gICAgICBwaXZvdElkeCsrO1xuICAgICAgcGl2b3QgPSBjbG9uZVtwZXJtdXRhdGlvbltwaXZvdElkeF1dW2pdO1xuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhwaXZvdCkgPCBFUFNJTE9OKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoU0lOR1VMQVJfTUFUUklYKTtcbiAgICB9XG5cbiAgICBpZiAoaiAhPT0gcGl2b3RJZHgpIHtcbiAgICAgIHZhciB0ZW1wID0gcGVybXV0YXRpb25bal07XG4gICAgICBwZXJtdXRhdGlvbltqXSA9IHBlcm11dGF0aW9uW3Bpdm90SWR4XTtcbiAgICAgIHBlcm11dGF0aW9uW3Bpdm90SWR4XSA9IHRlbXA7XG4gICAgfVxuXG4gICAgdmFyIHBpdm90Um93ID0gcGVybXV0YXRpb25bal07IC8vIHRoZSBwaXZvdCBpcyBndWFyYW50ZWVkIHRvIGJlIG5vbi16ZXJvXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGl0aCA9IHBlcm11dGF0aW9uW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHNpemU7IGsrKykge1xuICAgICAgICAgIGlmIChrID09PSBqKSB7XG4gICAgICAgICAgICBjbG9uZVtpdGhdW2tdID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1ba10gLz0gcGl2b3Q7XG4gICAgICAgIH1cblxuICAgICAgICBwaXZvdCA9IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKGNsb25lW2l0aF1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdmFyIGZhY3RvciA9IGNsb25lW2l0aF1bal0gLyBwaXZvdDtcblxuICAgICAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgc2l6ZTsgX2srKykge1xuICAgICAgICAgIGlmIChfayA9PT0gaikge1xuICAgICAgICAgICAgY2xvbmVbaXRoXVtfa10gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfayA+IGopIHtcbiAgICAgICAgICAgIGNsb25lW2l0aF1bX2tdIC09IGZhY3RvciAqIGNsb25lW3Bpdm90Um93XVtfa107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW52W2l0aF1bX2tdIC09IGZhY3RvciAqIGludltwaXZvdFJvd11bX2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHNpemU7IF9pKyspIHtcbiAgICBjbG9uZVtfaV0gPSBpbnZbcGVybXV0YXRpb25bX2ldXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgdGhpcyhjbG9uZSk7XG59XG5cbjtcblxuZnVuY3Rpb24gaW5pdFBlcm11dGF0aW9uKHNpemUpIHtcbiAgdmFyIHBlcm11dGF0aW9uID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgcGVybXV0YXRpb25baV0gPSBpO1xuICB9XG5cbiAgcmV0dXJuIHBlcm11dGF0aW9uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmVyc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIGVtcHR5ID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9lbXB0eScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVgsXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBwcm9kdWN0IG9mIHR3byBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXggdGhhdCBpcyBzaXplLWNvbXBhdGlibGUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBwcm9kdWN0IG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5mdW5jdGlvbiBtdWx0aXBseShBLCBCKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSB8fCAhKEIgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIEFyb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIEFjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIEJyb3cgPSBfQiRzaXplMlswXSxcbiAgICAgIEJjb2wgPSBfQiRzaXplMlsxXTtcblxuICBpZiAoQWNvbCAhPT0gQnJvdykge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgbWF0cml4QSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeEIgPSBCLl9tYXRyaXg7XG4gIHZhciByZXN1bHQgPSBlbXB0eShBcm93LCBCY29sKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IEFyb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgQmNvbDsgaisrKSB7XG4gICAgICByZXN1bHRbaV1bal0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IEJyb3c7IGsrKykge1xuICAgICAgICByZXN1bHRbaV1bal0gKz0gbWF0cml4QVtpXVtrXSAqIG1hdHJpeEJba11bal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyB0aGlzKHJlc3VsdCk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWCxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVgsXG4gICAgSU5WQUxJRF9FWFBPTkVOVCA9IF9yZXF1aXJlLklOVkFMSURfRVhQT05FTlQ7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgcG93ZXIgb2YgYW55IHNxdWFyZSBtYXRyaXguXHJcbiAqIFRoZSBhbGdvcml0aG0gaXMgaW1wbGVtZW50ZWQgcmVjdXJzaXZlbHkuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBzcXVhcmUgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBleHBvbmVudCAtIEFueSBOb24tbmVnYXRpdmUgaW50ZWdlclxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBUaGUgcG93ZXIgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBwb3coQSwgZXhwb25lbnQpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghQS5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZXhwb25lbnQpIHx8IGV4cG9uZW50IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0VYUE9ORU5UKTtcbiAgfVxuXG4gIHZhciBzaXplID0gQS5zaXplKClbMF07XG5cbiAgaWYgKGV4cG9uZW50ID09PSAwKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoc2l6ZSk7XG4gIH1cblxuICBpZiAoZXhwb25lbnQgPT09IDEpIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZShBKTtcbiAgfVxuXG4gIGlmIChleHBvbmVudCAlIDIgPT09IDApIHtcbiAgICB2YXIgX3RlbXAgPSB0aGlzLnBvdyhBLCBleHBvbmVudCAvIDIpO1xuXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkoX3RlbXAsIF90ZW1wKTtcbiAgfVxuXG4gIHZhciB0ZW1wID0gdGhpcy5wb3coQSwgKGV4cG9uZW50IC0gMSkgLyAyKTtcbiAgcmV0dXJuIHRoaXMubXVsdGlwbHkodGhpcy5tdWx0aXBseSh0ZW1wLCB0ZW1wKSwgQSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcG93OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgU0laRV9JTkNPTVBBVElCTEUgPSBfcmVxdWlyZS5TSVpFX0lOQ09NUEFUSUJMRSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIE1hdHJpY2VzLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7TWF0cml4fSBCIC0gQW55IE1hdHJpeCB0aGF0IGhhcyBzYW1lIHNpemUgd2l0aCBBXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFRoZSBkaWZmZXJlbmNlIG9mIHR3byBNYXRyaWNlc1xyXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YnRyYWN0KEEsIEIpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgX0Ikc2l6ZSA9IEIuc2l6ZSgpLFxuICAgICAgX0Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQiRzaXplLCAyKSxcbiAgICAgIHJvdzIgPSBfQiRzaXplMlswXSxcbiAgICAgIGNvbDIgPSBfQiRzaXplMlsxXTtcblxuICBpZiAocm93ICE9PSByb3cyIHx8IGNvbCAhPT0gY29sMikge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICB2YXIgbWF0cml4MSA9IEEuX21hdHJpeDtcbiAgdmFyIG1hdHJpeDIgPSBCLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBtYXRyaXgxW2ldW2pdIC0gbWF0cml4MltpXVtqXTtcbiAgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBGaW5kIHRoZSB0cmFuc3Bvc2Ugb2YgYSBtYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0geyBNYXRyaXggfSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7IE1hdHJpeCB9IFJldHVybnMgdHJhbnNwb3NlIG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gdHJhbnNwb3NlKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgbWF0cml4ID0gQS5fbWF0cml4O1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShjb2wsIHJvdywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2pdW2ldO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBNYXRyaXggPSByZXF1aXJlKCcuLi8uLicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUF9OT1JNID0gX3JlcXVpcmUuSU5WQUxJRF9QX05PUk0sXG4gICAgU0lOR1VMQVJfTUFUUklYID0gX3JlcXVpcmUuU0lOR1VMQVJfTUFUUklYLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGlvbnMgdGhlIGNvbmRpdGlvbiBudW1iZXIgb2Ygc3F1YXJlIE1hdHJpeFxyXG4gKiB3aXRoIHJlc3BlY3QgdG8gdGhlIGNob2ljZSBvZiBNYXRyaXggbm9ybS4gXHJcbiAqIElmIHRoZSBNYXRyaXggaXMgc2luZ3VsYXIsIHJldHVybnMgSW5maW5pdHkuPGJyPjxicj5cclxuICogVGhlIGNvbmRpdGlvbiBudW1iZXIgaXMgbm90IGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHsoMXwyfEluZmluaXR5fCdGJyl9IHAgLSBUeXBlIG9mIE1hdHJpeCBub3JtXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb25kaXRpb24gbnVtYmVyIG9mIE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBjb25kKCkge1xuICB2YXIgcCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMjtcblxuICBpZiAocCAhPT0gMSAmJiBwICE9PSAyICYmIHAgIT09IEluZmluaXR5ICYmIHAgIT09ICdGJykge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1BfTk9STSk7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB2YXIgaW52ZXJzZSA9IE1hdHJpeC5pbnZlcnNlKHRoaXMpO1xuICAgIHJldHVybiBpbnZlcnNlLm5vcm0ocCkgKiB0aGlzLm5vcm0ocCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFNJTkdVTEFSX01BVFJJWCkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY29uZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9TUVVBUkVfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9TUVVBUkVfTUFUUklYO1xuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIHNxdWFyZSBNYXRyaXguXHJcbiAqIElmIHRoZSBNYXRyaXggc2l6ZSBpcyBsYXJnZXIgdGhhbiAzLCBpdCBjYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCB1c2luZ1xyXG4gKiBMVSBkZWNvbXBvc2l0aW9uLCBvdGhlcndpc2UsIHVzaW5nIExlaWJuaXogRm9ybXVsYS48YnI+PGJyPlxyXG4gKiBUaGUgZGV0ZXJtaW5hbnQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBkZXRlcm1pbmFudCBvZiBzcXVhcmUgbWF0cmlyeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBkZXQoKSB7XG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fZGV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIHNpemUgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIGlmIChzaXplID09PSAwKSB7XG4gICAgdGhpcy5fZGV0ID0gMTtcbiAgICByZXR1cm4gMTsgLy8gdGhlIGRldGVybWluYW50IG9mIDB4MCBtYXRyaXggbXVzdCBiZSAxXG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gMSkge1xuICAgIHRoaXMuX2RldCA9IG1hdHJpeFswXVswXTtcbiAgICByZXR1cm4gdGhpcy5fZGV0O1xuICB9XG5cbiAgaWYgKHNpemUgPT09IDIpIHtcbiAgICB0aGlzLl9kZXQgPSBtYXRyaXhbMF1bMF0gKiBtYXRyaXhbMV1bMV0gLSBtYXRyaXhbMF1bMV0gKiBtYXRyaXhbMV1bMF07XG4gICAgcmV0dXJuIHRoaXMuX2RldDtcbiAgfVxuXG4gIGlmIChzaXplID09PSAzKSB7XG4gICAgdGhpcy5fZGV0ID0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzFdICogbWF0cml4WzJdWzJdICsgbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzJdICogbWF0cml4WzJdWzBdICsgbWF0cml4WzBdWzJdICogbWF0cml4WzFdWzBdICogbWF0cml4WzJdWzFdIC0gbWF0cml4WzBdWzJdICogbWF0cml4WzFdWzFdICogbWF0cml4WzJdWzBdIC0gbWF0cml4WzBdWzFdICogbWF0cml4WzFdWzBdICogbWF0cml4WzJdWzJdIC0gbWF0cml4WzBdWzBdICogbWF0cml4WzFdWzJdICogbWF0cml4WzJdWzFdO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICB2YXIgX01hdHJpeCRMVSA9IE1hdHJpeC5MVSh0aGlzLCB0cnVlKSxcbiAgICAgIF9NYXRyaXgkTFUyID0gX3NsaWNlZFRvQXJyYXkoX01hdHJpeCRMVSwgMiksXG4gICAgICBQID0gX01hdHJpeCRMVTJbMF0sXG4gICAgICBMVSA9IF9NYXRyaXgkTFUyWzFdO1xuXG4gIHZhciBtYXRyaXhMVSA9IExVLl9tYXRyaXg7IC8vIGNvdW50IHdoZXRoZXIgdGhlIG51bWJlciBvZiBwZXJtdXRhdGlvbnMgPHN3YXA+IGlzIG9kZCBvciBldmVuXG4gIC8vIE8obl4yKVxuXG4gIHZhciBzd2FwID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGlmIChQW2ldID09PSBpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB3aGlsZSAoUFtpXSAhPT0gaSkge1xuICAgICAgdmFyIHRhcmdldCA9IFBbaV07XG4gICAgICBQW2ldID0gUFt0YXJnZXRdO1xuICAgICAgUFt0YXJnZXRdID0gdGFyZ2V0O1xuICAgICAgc3dhcCsrO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSAxO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHNpemU7IF9pMisrKSB7XG4gICAgcmVzdWx0ICo9IG1hdHJpeExVW19pMl1bX2kyXTtcbiAgfVxuXG4gIGlmIChzd2FwICUgMiA9PT0gMSkge1xuICAgIHRoaXMuX2RldCA9IHJlc3VsdCAqIC0xO1xuICAgIHJldHVybiB0aGlzLl9kZXQ7XG4gIH1cblxuICB0aGlzLl9kZXQgPSByZXN1bHQ7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZGV0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vLyByZWZlcmVuY2U6IGh0dHBzOi8vcGVvcGxlLmluZi5ldGh6LmNoL2FyYmVuei9ld3AvTG5vdGVzL2NoYXB0ZXI0LnBkZlxudmFyIENvbXBsZXggPSByZXF1aXJlKCdAcmF5eWFtaGsvY29tcGxleCcpO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1NRVUFSRV9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX1NRVUFSRV9NQVRSSVg7XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZWlnZW52YWx1ZXMgb2YgYW55IHNxdWFyZSBNYXRyaXggdXNpbmcgUVIgQWxnb3JpdGhtLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgY2FuIGJlIGVpdGhlciByZWFsIG51bWJlciBvciBjb21wbGV4IG51bWJlci5cclxuICogTm90ZSB0aGF0IGFsbCBlaWdlbnZhbHVlcyBhcmUgaW5zdGFuY2Ugb2YgQ29tcGxleCxcclxuICogZm9yIG1vcmUgZGV0YWlscyBwbGVhc2UgdmlzaXQgW0NvbXBsZXguanNde0BsaW5rIGh0dHBzOi8vcmF5eWFtaGsuZ2l0aHViLmlvL0NvbXBsZXguanN9Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgZWlnZW52YWx1ZXMgYXJlIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge0NvbXBsZXhbXX0gQXJyYXkgb2YgZWlnZW52YWx1ZXNcclxuICovXG5cblxuZnVuY3Rpb24gZWlnZW52YWx1ZXMoKSB7XG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1FVQVJFX01BVFJJWCk7XG4gIH1cblxuICBpZiAodGhpcy5fZWlnZW52YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9laWdlbnZhbHVlcztcbiAgfVxuXG4gIHZhciBzaXplID0gdGhpcy5zaXplKClbMF07XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgdmFyIGRpZ2l0ID0gdGhpcy5fZGlnaXQ7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG5cbiAgdmFyIGNsb25lID0gTWF0cml4LmNsb25lKHRoaXMpLl9tYXRyaXg7XG5cbiAgdmFyIGlzQ29udmVyZ2VudCA9IHRydWU7IC8vIGZsYWdcblxuICB2YXIgc2tpcCA9IGZhbHNlOyAvLyBUcmFuc2Zvcm0gbWF0cml4IHRvIEhlc3NlbmJlcmcgbWF0cml4XG5cbiAgSG91c2Vob2xkZXJUcmFuc2Zvcm0oY2xvbmUsIGRpZ2l0KTtcblxuICBmb3IgKHZhciBpID0gc2l6ZSAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICB2YXIgZGl2ZXJnZW5jZUNvdW50ID0gMDtcbiAgICB2YXIgcHJldiA9IHZvaWQgMDsgLy8gdXNlZCB0byBkZXRlcm1pbmUgY29udmVyZ2VuY2VcbiAgICAvLyBpZiBvYnRhaW5zIGNvbXBsZXggZWlnZW52YWx1ZXMgcGFpciBpbiBwcmV2aW91cyBpdGVyYXRpb24sIHNraXAgY3VycmVudCByb3VuZFxuXG4gICAgaWYgKHNraXApIHtcbiAgICAgIHNraXAgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBzaGlmdCA9IGNsb25lW3NpemUgLSAxXVtzaXplIC0gMV07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCkge1xuICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBlaWdlbnZhbHVlIGlzIG5vdCByZWFsXG4gICAgICAgIHByZXYgPSBzaXplMkVpZ2VudmFsdWVzKGNsb25lW2kgLSAxXVtpIC0gMV0sIGNsb25lW2kgLSAxXVtpXSwgY2xvbmVbaV1baSAtIDFdLCBjbG9uZVtpXVtpXSkubWV0cmljO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZSBpcyByZWFsXG4gICAgICAgIHByZXYgPSBNYXRoLmFicyhjbG9uZVtpXVtpIC0gMV0pO1xuICAgICAgfSAvLyBhcHBseSBzaW5nbGUgc2hpZnRcblxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBjbG9uZVtqXVtqXSAtPSBzaGlmdDtcbiAgICAgIH0gLy8gQXBwbHkgUVIgQWxnb3JpdGhtXG5cblxuICAgICAgSGVzc2VuYmVyZ1FSKGNsb25lLCBkaWdpdCk7XG5cbiAgICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCBzaXplOyBfaisrKSB7XG4gICAgICAgIGNsb25lW19qXVtfal0gKz0gc2hpZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgcHJldiA8IE1hdGguYWJzKGNsb25lW2ldW2kgLSAxXSkpIHtcbiAgICAgICAgZGl2ZXJnZW5jZUNvdW50Kys7XG4gICAgICB9IC8vIGlmIHRoZSBjdXJyZW50IGVpZ2VudmFsdWUgaXMgcmVhbCBhbmQgdGhlIGVudHJ5IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrO1xuXG5cbiAgICAgIGlmIChpc0NvbnZlcmdlbnQgJiYgTWF0aC5hYnMoY2xvbmVbaV1baSAtIDFdKSA8IEVQU0lMT04pIHtcbiAgICAgICAgdmFsdWVzW2ldID0gbmV3IENvbXBsZXgoY2xvbmVbaV1baV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gLy8gaWYgdGhlIGN1cnJlbnQgZWlnZW52YWx1ZXMgcGFpciBpcyBjb21wbGV4LCBpZiB0aGUgZGlmZmVyZW5jZSBvZiB0aGUgcHJldmlvdXMgZWlnYW52YWx1ZXMgYW5kIHRoZVxuICAgICAgLy8gZWlnZW52YWx1ZXMgb2Ygc3VibWF0cml4IGlzIGFsbW9zdCBaRVJPID0+IGJyZWFrXG5cblxuICAgICAgdmFyIF9zaXplMkVpZ2VudmFsdWVzID0gc2l6ZTJFaWdlbnZhbHVlcyhjbG9uZVtpIC0gMV1baSAtIDFdLCBjbG9uZVtpIC0gMV1baV0sIGNsb25lW2ldW2kgLSAxXSwgY2xvbmVbaV1baV0pLFxuICAgICAgICAgIG1ldHJpYyA9IF9zaXplMkVpZ2VudmFsdWVzLm1ldHJpYyxcbiAgICAgICAgICBlaWdlbjEgPSBfc2l6ZTJFaWdlbnZhbHVlcy5laWdlbjEsXG4gICAgICAgICAgZWlnZW4yID0gX3NpemUyRWlnZW52YWx1ZXMuZWlnZW4yO1xuXG4gICAgICBpZiAoIWlzQ29udmVyZ2VudCAmJiBNYXRoLmFicyhwcmV2IC0gbWV0cmljKSA8IEVQU0lMT04pIHtcbiAgICAgICAgaXNDb252ZXJnZW50ID0gdHJ1ZTsgLy8gcmUtaW5pdGlhbGl6ZVxuXG4gICAgICAgIHNraXAgPSB0cnVlO1xuICAgICAgICB2YXIgcmUxID0gZWlnZW4xLnJlLFxuICAgICAgICAgICAgaW0xID0gZWlnZW4xLmltO1xuICAgICAgICB2YXIgcmUyID0gZWlnZW4yLnJlLFxuICAgICAgICAgICAgaW0yID0gZWlnZW4yLmltO1xuICAgICAgICB2YWx1ZXNbaV0gPSBuZXcgQ29tcGxleChyZTEsIGltMSk7XG4gICAgICAgIHZhbHVlc1tpIC0gMV0gPSBuZXcgQ29tcGxleChyZTIsIGltMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSAvLyBpZiB0aGUgZW50cnkgZG9lc24ndCBjb252ZXJnZSA9PiBjb21wbGV4IGVpZ2VudmFsdWVzIHBhaXJcblxuXG4gICAgICBpZiAoZGl2ZXJnZW5jZUNvdW50ID4gMykge1xuICAgICAgICBpc0NvbnZlcmdlbnQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIXNraXApIHtcbiAgICB2YWx1ZXNbMF0gPSBuZXcgQ29tcGxleChjbG9uZVswXVswXSk7XG4gIH1cblxuICB0aGlzLl9laWdlbnZhbHVlcyA9IHZhbHVlcztcbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuO1xuXG5mdW5jdGlvbiBIb3VzZWhvbGRlclRyYW5zZm9ybShBLCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZSAtIDI7IGorKykge1xuICAgIHZhciB4Tm9ybSA9IDA7XG4gICAgdmFyIHUgPSBuZXcgQXJyYXkoc2l6ZSAtIGogLSAxKTtcblxuICAgIGZvciAodmFyIGkgPSBqICsgMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgdmFyIGVudHJ5ID0gQVtpXVtqXTtcbiAgICAgIHhOb3JtICs9IE1hdGgucG93KGVudHJ5LCAyKTtcbiAgICAgIHVbaSAtIGogLSAxXSA9IGVudHJ5O1xuICAgIH1cblxuICAgIHhOb3JtID0gTWF0aC5zcXJ0KHhOb3JtKTtcblxuICAgIGlmIChNYXRoLmFicyh4Tm9ybSkgPCBFUFNJTE9OKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodVswXSA+PSAwKSB7XG4gICAgICB1WzBdICs9IHhOb3JtO1xuICAgIH0gZWxzZSB7XG4gICAgICB1WzBdIC09IHhOb3JtO1xuICAgIH0gLy8gTWFrZSAndScgdW5pdCB2ZWN0b3JcblxuXG4gICAgdmFyIHVOb3JtID0gMDtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB1Lmxlbmd0aDsgX2krKykge1xuICAgICAgdU5vcm0gKz0gTWF0aC5wb3codVtfaV0sIDIpO1xuICAgIH1cblxuICAgIHVOb3JtID0gTWF0aC5zcXJ0KHVOb3JtKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHUubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdVtfaTJdIC89IHVOb3JtO1xuICAgIH0gLy8gdXBkYXRlIHRoZSBtYXRyaXgsIG11bHRpcGx5IFAgZnJvbSBsZWZ0XG5cblxuICAgIGZvciAodmFyIG4gPSBqOyBuIDwgc2l6ZTsgbisrKSB7XG4gICAgICAvLyBjb2x1bW5cbiAgICAgIHZhciB2ID0gbmV3IEFycmF5KHNpemUgLSBqIC0gMSk7XG5cbiAgICAgIGZvciAodmFyIG0gPSBqICsgMTsgbSA8IHNpemU7IG0rKykge1xuICAgICAgICB2W20gLSBqIC0gMV0gPSBBW21dW25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2NhbGVyID0gMDtcblxuICAgICAgZm9yICh2YXIgX20gPSAwOyBfbSA8IHYubGVuZ3RoOyBfbSsrKSB7XG4gICAgICAgIHNjYWxlciArPSB2W19tXSAqIHVbX21dO1xuICAgICAgfVxuXG4gICAgICBzY2FsZXIgKj0gMjtcblxuICAgICAgZm9yICh2YXIgX20yID0gaiArIDE7IF9tMiA8IHNpemU7IF9tMisrKSB7XG4gICAgICAgIC8vIHJvd1xuICAgICAgICBpZiAobiA9PT0gaiAmJiBfbTIgIT09IGogKyAxKSB7XG4gICAgICAgICAgQVtfbTJdW25dID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW19tMl1bbl0gPSB2W19tMiAtIGogLSAxXSAtIHNjYWxlciAqIHVbX20yIC0gaiAtIDFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyB1cGRhdGUgdGhlIG1hdHJpeCwgbXVsdGlwbHkgUCBmcm9tIHJpZ2h0XG5cblxuICAgIGZvciAodmFyIF9tMyA9IDA7IF9tMyA8IHNpemU7IF9tMysrKSB7XG4gICAgICAvLyByb3dcbiAgICAgIHZhciBfdiA9IG5ldyBBcnJheShzaXplIC0gaiAtIDEpO1xuXG4gICAgICBmb3IgKHZhciBfbiA9IGogKyAxOyBfbiA8IHNpemU7IF9uKyspIHtcbiAgICAgICAgX3ZbX24gLSBqIC0gMV0gPSBBW19tM11bX25dO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3NjYWxlciA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9uMiA9IDA7IF9uMiA8IF92Lmxlbmd0aDsgX24yKyspIHtcbiAgICAgICAgX3NjYWxlciArPSBfdltfbjJdICogdVtfbjJdO1xuICAgICAgfVxuXG4gICAgICBfc2NhbGVyICo9IDI7XG5cbiAgICAgIGZvciAodmFyIF9uMyA9IGogKyAxOyBfbjMgPCBzaXplOyBfbjMrKykge1xuICAgICAgICAvLyBjb2x1bW5cbiAgICAgICAgQVtfbTNdW19uM10gPSBfdltfbjMgLSBqIC0gMV0gLSBfc2NhbGVyICogdVtfbjMgLSBqIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEhlc3NlbmJlcmdRUihILCBkaWdpdCkge1xuICB2YXIgc2l6ZSA9IEgubGVuZ3RoO1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2luY29zID0gbmV3IEFycmF5KHNpemUgLSAxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICB2YXIgYSA9IEhbaV1baV07XG4gICAgdmFyIGMgPSBIW2kgKyAxXVtpXTtcbiAgICB2YXIgbm9ybSA9IE1hdGguc3FydChNYXRoLnBvdyhhLCAyKSArIE1hdGgucG93KGMsIDIpKTtcblxuICAgIGlmIChub3JtIDwgRVBTSUxPTikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGNvcyA9IGEgLyBub3JtO1xuICAgIHZhciBzaW4gPSBjICogLTEgLyBub3JtO1xuICAgIHNpbmNvc1tpXSA9IFtzaW4sIGNvc107XG4gICAgdmFyIHJvdzEgPSBuZXcgQXJyYXkoc2l6ZSAtIGkpO1xuICAgIHZhciByb3cyID0gbmV3IEFycmF5KHNpemUgLSBpKTtcblxuICAgIGZvciAodmFyIGogPSBpOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICByb3cxW2ogLSBpXSA9IEhbaV1bal07XG4gICAgICByb3cyW2ogLSBpXSA9IEhbaSArIDFdW2pdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9qMiA9IGk7IF9qMiA8IHNpemU7IF9qMisrKSB7XG4gICAgICBIW2ldW19qMl0gPSBjb3MgKiByb3cxW19qMiAtIGldICsgc2luICogLTEgKiByb3cyW19qMiAtIGldO1xuXG4gICAgICBpZiAoaSA9PT0gX2oyKSB7XG4gICAgICAgIEhbaSArIDFdW19qMl0gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgSFtpICsgMV1bX2oyXSA9IHNpbiAqIHJvdzFbX2oyIC0gaV0gKyBjb3MgKiByb3cyW19qMiAtIGldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9qMyA9IDA7IF9qMyA8IHNpemUgLSAxOyBfajMrKykge1xuICAgIGlmICghc2luY29zW19qM10pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBfc2luY29zJF9qID0gX3NsaWNlZFRvQXJyYXkoc2luY29zW19qM10sIDIpLFxuICAgICAgICBfc2luID0gX3NpbmNvcyRfalswXSxcbiAgICAgICAgX2NvcyA9IF9zaW5jb3MkX2pbMV07XG5cbiAgICB2YXIgY29sMSA9IG5ldyBBcnJheShfajMgKyAyKTtcbiAgICB2YXIgY29sMiA9IG5ldyBBcnJheShfajMgKyAyKTtcblxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8PSBfajMgKyAxOyBfaTMrKykge1xuICAgICAgY29sMVtfaTNdID0gSFtfaTNdW19qM107XG4gICAgICBjb2wyW19pM10gPSBIW19pM11bX2ozICsgMV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDw9IF9qMyArIDE7IF9pNCsrKSB7XG4gICAgICBIW19pNF1bX2ozXSA9IGNvbDFbX2k0XSAqIF9jb3MgLSBjb2wyW19pNF0gKiBfc2luO1xuICAgICAgSFtfaTRdW19qMyArIDFdID0gY29sMVtfaTRdICogX3NpbiArIGNvbDJbX2k0XSAqIF9jb3M7XG4gICAgfVxuICB9XG59IC8vIGZpbmQgdGhlIGVpZ2VudmFsdWVzIG9mIDJ4MiBtYXRyaXhcblxuXG5mdW5jdGlvbiBzaXplMkVpZ2VudmFsdWVzKGUxMSwgZTEyLCBlMjEsIGUyMikge1xuICB2YXIgYiA9IChlMTEgKyBlMjIpICogLTE7XG4gIHZhciBjID0gZTExICogZTIyIC0gZTIxICogZTEyO1xuICB2YXIgZGVsdGEgPSBNYXRoLnBvdyhiLCAyKSAtIDQgKiBjO1xuICB2YXIgcmUxO1xuICB2YXIgaW0xO1xuICB2YXIgcmUyO1xuICB2YXIgaW0yO1xuXG4gIGlmIChkZWx0YSA+PSAwKSB7XG4gICAgaW0xID0gMDtcbiAgICBpbTIgPSAwO1xuXG4gICAgaWYgKGIgPj0gMCkge1xuICAgICAgcmUxID0gKGIgKiAtMSAtIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmUxID0gKGIgKiAtMSArIE1hdGguc3FydChkZWx0YSkpIC8gMjtcbiAgICB9XG5cbiAgICByZTIgPSBjIC8gcmUxO1xuICB9IGVsc2Uge1xuICAgIHJlMSA9IC1iIC8gMjtcbiAgICByZTIgPSByZTE7XG4gICAgaW0xID0gTWF0aC5zcXJ0KGRlbHRhICogLTEpIC8gMjtcbiAgICBpbTIgPSBpbTEgKiAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWV0cmljOiBNYXRoLnNxcnQoTWF0aC5wb3cocmUxLCAyKSArIE1hdGgucG93KGltMSwgMikpLFxuICAgIGVpZ2VuMToge1xuICAgICAgcmU6IHJlMSxcbiAgICAgIGltOiBpbTFcbiAgICB9LFxuICAgIGVpZ2VuMjoge1xuICAgICAgcmU6IHJlMixcbiAgICAgIGltOiBpbTJcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZWlnZW52YWx1ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIE1hdHJpeCA9IHJlcXVpcmUoJy4uLy4uJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9QX05PUk0gPSBfcmVxdWlyZS5JTlZBTElEX1BfTk9STTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBNYXRyaXggbm9ybSBvZiBhbnkgTWF0cml4IHdpdGggcmVzcGVjdCB0byB0aGUgY2hvaWNlIG9mIG5vcm0uPGJyPjxicj5cclxuICogXHJcbiAqIDEtbm9ybTogTWF4aW11bSBhYnNvbHV0ZSBjb2x1bW4gc3VtIG9mIHRoZSBNYXRyaXguPGJyPlxyXG4gKiAyLW5vcm06IFRoZSBsYXJnZXN0IHNpbmd1bGFyIHZhbHVlIG9mIE1hdHJpeC48YnI+XHJcbiAqIEluZmluaXR5LW5vcm06IE1heGltdW0gYWJzb2x1dGUgcm93IHN1bSBvZiB0aGUgTWF0cml4Ljxicj5cclxuICogRnJvYmVuaXVzLW5vcm06IEV1Y2xpZGVhbiBub3JtIGludmxvdmluZyBhbGwgZW50cmllcy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIG5vcm1zIGFyZSBub3QgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0geygxfDJ8SW5maW5pdHl8J0YnKX0gcCAtIFRoZSBjaG9pY2Ugb2YgTWF0cml4IG5vcm1cclxuICogQHJldHVybnMge251bWJlcn0gVGhlIG5vcm0gb2YgdGhlIE1hdHJpeC5cclxuICovXG5cblxuZnVuY3Rpb24gbm9ybSgpIHtcbiAgdmFyIHAgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDI7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChwICE9PSAxICYmIHAgIT09IDIgJiYgcCAhPT0gSW5maW5pdHkgJiYgcCAhPT0gJ0YnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUF9OT1JNKTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSB0aGlzLl9tYXRyaXg7XG4gIHZhciByZXN1bHQgPSAwO1xuXG4gIGlmIChwID09PSAxKSB7XG4gICAgLy8gbWF4IG9mIGNvbHVtbiBzdW1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICB2YXIgY29sdW1uU3VtID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgICAgICBjb2x1bW5TdW0gKz0gTWF0aC5hYnMobWF0cml4W2ldW2pdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtblN1bSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSBjb2x1bW5TdW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSAvLyBsYXJnZXN0IHNpbmd1bGFyIHZhbHVlXG5cblxuICBpZiAocCA9PT0gMikge1xuICAgIHZhciB0cmFuc3Bvc2UgPSBNYXRyaXgudHJhbnNwb3NlKHRoaXMpO1xuICAgIHZhciBNID0gTWF0cml4Lm11bHRpcGx5KHRyYW5zcG9zZSwgdGhpcyk7XG4gICAgdmFyIGVpZ2VudmFsdWVzID0gTS5laWdlbnZhbHVlcygpO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgZWlnZW52YWx1ZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIHZhbHVlID0gZWlnZW52YWx1ZXNbX2kyXS5nZXRNb2R1bHVzKCk7XG5cbiAgICAgIGlmICh2YWx1ZSA+IHJlc3VsdCkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KHJlc3VsdCk7XG4gIH1cblxuICBpZiAocCA9PT0gSW5maW5pdHkpIHtcbiAgICAvLyBtYXggb2Ygcm93IHN1bVxuICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IHJvdzsgX2kzKyspIHtcbiAgICAgIHZhciByb3dTdW0gPSAwO1xuXG4gICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgY29sOyBfaisrKSB7XG4gICAgICAgIHJvd1N1bSArPSBNYXRoLmFicyhtYXRyaXhbX2kzXVtfal0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocm93U3VtID4gcmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IHJvd1N1bTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IC8vIEZcblxuXG4gIGZvciAodmFyIF9pNCA9IDA7IF9pNCA8IHJvdzsgX2k0KyspIHtcbiAgICBmb3IgKHZhciBfajIgPSAwOyBfajIgPCBjb2w7IF9qMisrKSB7XG4gICAgICByZXN1bHQgKz0gTWF0aC5wb3cobWF0cml4W19pNF1bX2oyXSwgMik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydChyZXN1bHQpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IG5vcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBudWxsaXR5IG9mIGFueSBNYXRyaXgsIHdoaWNoIGlzIHRoZSBkaW1lbnNpb25cclxuICogb2YgdGhlIG51bGxzcGFjZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIG51bGxpdHkgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVsbGl0eSBvZiB0aGUgbWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gbnVsbGl0eSgpIHtcbiAgaWYgKHRoaXMuX251bGxpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9udWxsaXR5O1xuICB9XG5cbiAgdmFyIGNvbCA9IHRoaXMuc2l6ZSgpWzFdO1xuICB2YXIgcmFuayA9IHRoaXMucmFuaygpO1xuICB0aGlzLl9udWxsaXR5ID0gY29sIC0gcmFuaztcbiAgcmV0dXJuIHRoaXMuX251bGxpdHk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gbnVsbGl0eTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSByYW5rIG9mIGFueSBNYXRyaXgsXHJcbiAqIHdoaWNoIGlzIHRoZSBkaW1lbnNpb24gb2YgdGhlIHJvdyBzcGFjZS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJhbmsgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgcmFuayBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIHJhbmsoKSB7XG4gIGlmICh0aGlzLl9yYW5rICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5fcmFuaztcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgdGhpcy5fZGlnaXQpICogMik7XG4gIHZhciBSID0gTWF0cml4LlFSKHRoaXMpWzFdO1xuICB2YXIgbWF0cml4UiA9IFIuX21hdHJpeDtcblxuICB2YXIgX1Ikc2l6ZSA9IFIuc2l6ZSgpLFxuICAgICAgX1Ikc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfUiRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9SJHNpemUyWzBdLFxuICAgICAgY29sID0gX1Ikc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIHRoaXMuX3JhbmsgPSAxO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIHJrID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IGk7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKG1hdHJpeFJbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgcmsrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fcmFuayA9IHJrO1xuICByZXR1cm4gcms7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcmFuazsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNpemUgb2YgYW55IE1hdHJpeCxcclxuICogd2hpY2ggaXMgaW4gdGhlIGZvcm0gb2YgW3JvdywgY29sdW1uXS48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHNpemUgb2YgTWF0cml4IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMgb2YgYSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBzaXplKCkge1xuICBpZiAodGhpcy5fc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICBpZiAoQS5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLl9zaXplID0gWzAsIDBdO1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgdGhpcy5fc2l6ZSA9IFtBLmxlbmd0aCwgQVswXS5sZW5ndGhdO1xuICByZXR1cm4gdGhpcy5fc2l6ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzaXplOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSB0cmFjZSBvZiBhbnkgc3F1YXJlIE1hdHJpeCxcclxuICogd2hpY2ggaXMgdGhlIHN1bSBvZiBhbGwgZW50cmllcyBvbiB0aGUgbWFpbiBkaWFnb25hbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRyYWNlIGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHRyYWNlIG9mIHRoZSBzcXVhcmUgTWF0cml4LlxyXG4gKi9cblxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgdmFyIGlzU3F1YXJlID0gdGhpcy5faXNTcXVhcmUgIT09IHVuZGVmaW5lZCA/IHRoaXMuX2lzU3F1YXJlIDogdGhpcy5pc1NxdWFyZSgpO1xuXG4gIGlmICghaXNTcXVhcmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9TUVVBUkVfTUFUUklYKTtcbiAgfVxuXG4gIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYWNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG4gIHZhciB0ciA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICB0ciArPSBBW2ldW2ldO1xuICB9XG5cbiAgdGhpcy5fdHJhY2UgPSB0cjtcbiAgcmV0dXJuIHRyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRyYWNlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgZGlhZ29uYWwgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBEaWFnb25hbCBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggdGhlIGVudHJpZXMgb3V0c2lkZSB0aGUgbWFpbiBkaWFnb25hbFxyXG4gKiBhcmUgYWxsIHplcm8uIE5vdGUgdGhhdCB0aGUgdGVybSBkaWFnb25hbCByZWZlcnMgdG8gcmVjdGFuZ3VsYXIgZGlhZ29uYWwuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBydWUgaWYgdGhlIE1hdHJpeCBpcyBkaWFnb25hbCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBpc0RpYWdvbmFsKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc0RpYWdvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaWFnb25hbDtcbiAgfVxuXG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuXG4gIHZhciBfdGhpcyRzaXplID0gdGhpcy5zaXplKCksXG4gICAgICBfdGhpcyRzaXplMiA9IF9zbGljZWRUb0FycmF5KF90aGlzJHNpemUsIDIpLFxuICAgICAgcm93ID0gX3RoaXMkc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID09PSAwKSB7XG4gICAgdGhpcy5faXNEaWFnb25hbCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKGkgIT09IGogJiYgTWF0aC5hYnMoQVtpXVtqXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLmlzRGlhZ29uYWwgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzRGlhZ29uYWwgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc0RpYWdvbmFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBNYXRyaXggaXMgbG93ZXIgdHJpYW5ndWxhciBNYXRyaXggb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBMb3dlciB0cmlhbmd1bGFyIE1hdHJpeCBpcyBhIE1hdHJpeCBpbiB3aGljaCBhbGwgdGhlIGVudHJpZXNcclxuICogYWJvdmUgdGhlIG1haW4gZGlhZ29uYWwgYXJlIHplcm8uIE5vdGUgdGhhdCBpdCBjYW4gYmUgYXBwbGllZFxyXG4gKiB0byBhbnkgbm9uLXNxdWFyZSBNYXRyaXguPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBNYXRyaXggaXMgbG93ZXIgdHJpYW5ndWxhclxyXG4gKi9cbmZ1bmN0aW9uIGlzTG93ZXJUcmlhbmd1bGFyKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc0xvd2VyVHJpYW5ndWxhciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyO1xuICB9XG5cbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG5cbiAgdmFyIF90aGlzJHNpemUgPSB0aGlzLnNpemUoKSxcbiAgICAgIF90aGlzJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX3RoaXMkc2l6ZSwgMiksXG4gICAgICByb3cgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGNvbCA9IF90aGlzJHNpemUyWzFdO1xuXG4gIGlmIChyb3cgPT09IDApIHtcbiAgICAvLyBbXVxuICAgIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBjb2w7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKEFbaV1bal0pID49IEVQU0lMT04pIHtcbiAgICAgICAgdGhpcy5faXNMb3dlclRyaWFuZ3VsYXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzTG93ZXJUcmlhbmd1bGFyID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNMb3dlclRyaWFuZ3VsYXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxyXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzcXVhcmUgTWF0cml4IGlzIG9ydGhvZ29uYWwgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBPcnRob2dvbmFsIE1hdHJpeCBpcyBhIE1hdHJpeCBpbiB3aGljaCBhbGwgcm93cyBhbmQgY29sdW1ucyBhcmVcclxuICogb3J0aG9ub3JtYWwgdmVjdG9ycy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHNxdWFyZSBNYXRyaXggaXMgb3J0aG9nb25hbFxyXG4gKi9cbmZ1bmN0aW9uIGlzT3J0aG9nb25hbCgpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNPcnRob2dvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcnRob2dvbmFsO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICB0aGlzLl9pc09ydGhvZ29uYWwgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcbiAgdmFyIEVQU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIHNpemUgPSBBLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGZvciAodmFyIGogPSBpOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICB2YXIgZW50cnkgPSAwO1xuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHNpemU7IGsrKykge1xuICAgICAgICBlbnRyeSArPSBBW2ldW2tdICogQVtqXVtrXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPT09IGogJiYgTWF0aC5hYnMoZW50cnkgLSAxKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzT3J0aG9nb25hbCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChpICE9PSBqICYmIE1hdGguYWJzKGVudHJ5KSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzT3J0aG9nb25hbCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNPcnRob2dvbmFsID0gdHJ1ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gaXNPcnRob2dvbmFsOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3F1YXJlIE1hdHJpeCBpcyBza2V3IHN5bW1ldHJpYyBvciBub3QuPGJyPjxicj5cclxuICogXHJcbiAqIFNrZXcgc3ltbWV0cmljIE1hdHJpeCBpcyBhIHNxdWFyZSBNYXRyaXggd2hvc2UgdHJhbnNwb3NlIGVxdWFscyBpdHMgbmVnYXRpdmUuPGJyPjxicj5cclxuICogXHJcbiAqIFRoZSByZXN1bHQgaXMgY2FjaGVkLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0PThdIC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzcXVhcmUgTWF0cml4IGlzIHNrZXcgc3ltbWV0cmljXHJcbiAqL1xuZnVuY3Rpb24gaXNTa2V3U3ltbWV0cmljKCkge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuX2RpZ2l0O1xuXG4gIGlmICh0aGlzLl9pc1NrZXdTeW1tZXRyaWMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NrZXdTeW1tZXRyaWM7XG4gIH1cblxuICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBBID0gdGhpcy5fbWF0cml4O1xuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgc2l6ZSA9IEEubGVuZ3RoO1xuXG4gIGlmIChzaXplID09PSAwKSB7XG4gICAgdGhpcy5faXNTa2V3U3ltbWV0cmljID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gW11cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdICsgQVtqXVtpXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1NrZXdTeW1tZXRyaWMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2lzU2tld1N5bW1ldHJpYyA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzU2tld1N5bW1ldHJpYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIE1hdHJpeCBpcyBzcXVhcmUgb3Igbm90Ljxicj48YnI+XHJcbiAqIFxyXG4gKiBTcXVhcmUgTWF0cml4IGlzIGEgTWF0cml4IHdpdGggc2FtZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucy48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyBzcXVhcmVcclxuICovXG5mdW5jdGlvbiBpc1NxdWFyZSgpIHtcbiAgaWYgKHRoaXMuX2lzU3F1YXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTcXVhcmU7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICBpZiAoQS5sZW5ndGggPT09IDApIHtcbiAgICAvLyAweDAgbWF0cml4XG4gICAgdGhpcy5faXNTcXVhcmUgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdGhpcy5faXNTcXVhcmUgPSBBLmxlbmd0aCA9PT0gQVswXS5sZW5ndGg7XG4gIHJldHVybiB0aGlzLl9pc1NxdWFyZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1NxdWFyZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciBhIHNxdWFyZSBNYXRyaXggaXMgc3ltbWV0cmljIG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogU3ltbWV0cmljIE1hdHJpeCBpcyBhIHNxdWFyZSBNYXRyaXggdGhhdCBpcyBlcXVhbCB0byBpdHMgdHJhbnNwb3NlLjxicj48YnI+XHJcbiAqIFxyXG4gKiBUaGUgcmVzdWx0IGlzIGNhY2hlZC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdD04XSAtIE51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgc3F1YXJlIE1hdHJpeCBpcyBzeW1tZXRyaWNcclxuICovXG5mdW5jdGlvbiBpc1N5bW1ldHJpYygpIHtcbiAgdmFyIGRpZ2l0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLl9kaWdpdDtcblxuICBpZiAodGhpcy5faXNTeW1tZXRyaWMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLl9pc1N5bW1ldHJpYztcbiAgfVxuXG4gIGlmICghdGhpcy5pc1NxdWFyZSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIEEgPSB0aGlzLl9tYXRyaXg7XG4gIHZhciBFUFNJTE9OID0gMSAvIChNYXRoLnBvdygxMCwgZGlnaXQpICogMik7XG4gIHZhciBzaXplID0gQS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBpOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdIC0gQVtqXVtpXSkgPj0gRVBTSUxPTikge1xuICAgICAgICB0aGlzLl9pc1N5bW1ldHJpYyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5faXNTeW1tZXRyaWMgPSB0cnVlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpc1N5bW1ldHJpYzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgTWF0cml4IGlzIHVwcGVyIHRyaWFuZ3VsYXIgTWF0cml4IG9yIG5vdC48YnI+PGJyPlxyXG4gKiBcclxuICogVXBwZXIgdHJpYW5ndWxhciBNYXRyaXggaXMgYSBNYXRyaXggaW4gd2hpY2ggYWxsIHRoZSBlbnRyaWVzIGJlbG93IHRoZVxyXG4gKiBtYWluIGRpYWdvbmFsIGFyZSB6ZXJvLiBOb3RlIHRoYXQgaXQgY2FuIGJlIGFwcGxpZWQgdG8gYW55IG5vbi1zcXVhcmUgTWF0cml4Ljxicj48YnI+XHJcbiAqICBcclxuICogVGhlIHJlc3VsdCBpcyBjYWNoZWQuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXQ9OF0gLSBOdW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIE1hdHJpeCBpcyB1cHBlciB0cmlhbmd1bGFyXHJcbiAqL1xuZnVuY3Rpb24gaXNVcHBlclRyaWFuZ3VsYXIoKSB7XG4gIHZhciBkaWdpdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdGhpcy5fZGlnaXQ7XG5cbiAgaWYgKHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNVcHBlclRyaWFuZ3VsYXI7XG4gIH1cblxuICB2YXIgRVBTSUxPTiA9IDEgLyAoTWF0aC5wb3coMTAsIGRpZ2l0KSAqIDIpO1xuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgaWYgKHJvdyA9PT0gMCkge1xuICAgIC8vIFtdXG4gICAgdGhpcy5faXNVcHBlclRyaWFuZ3VsYXIgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3c7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sOyBqKyspIHtcbiAgICAgIGlmIChpIDw9IGopIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChNYXRoLmFicyhBW2ldW2pdKSA+PSBFUFNJTE9OKSB7XG4gICAgICAgIHRoaXMuX2lzVXBwZXJUcmlhbmd1bGFyID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLl9pc1VwcGVyVHJpYW5ndWxhciA9IHRydWU7XG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzVXBwZXJUcmlhbmd1bGFyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uLy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9NQVRSSVggPSBfcmVxdWlyZS5JTlZBTElEX01BVFJJWDtcbi8qKlxyXG4gKiBDcmVhdGVzIGEgY29weSBvZiBNYXRyaXguIE5vdGUgdGhhdCBpdCByZXNldHMgdGhlIGNhY2hlZCBkYXRhLlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IENvcHkgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZShBKSB7XG4gIGlmICghKEEgaW5zdGFuY2VvZiB0aGlzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX01BVFJJWCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUocm93LCBjb2wsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgcmV0dXJuIG1hdHJpeFtpXVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY2xvbmU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfQ09MVU1OID0gX3JlcXVpcmUuT1ZFUkZMT1dfQ09MVU1OLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgY29sdW1uIG9mIGEgTWF0cml4IHdpdGggdmFsaWQgaW5kZXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQW55IHZhbGlkIGNvbHVtbiBpbmRleFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBDb2x1bW4gb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiBjb2x1bW4oQSwgaW5kZXgpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgfHwgaW5kZXggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHIgPSBfQSRzaXplMlswXSxcbiAgICAgIGMgPSBfQSRzaXplMlsxXTtcblxuICBpZiAoaW5kZXggPj0gYykge1xuICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUociwgMSwgZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gbWF0cml4W2ldW2luZGV4XTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gY29sdW1uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTWF0cml4ID0gcmVxdWlyZSgnLi4vLi4nKTtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9pc051bWJlcicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfQVJSQVkgPSBfcmVxdWlyZS5JTlZBTElEX0FSUkFZLFxuICAgIEVYUEVDVEVEX0FSUkFZX09GX05VTUJFUlNfT1JfTUFUUklDRVMgPSBfcmVxdWlyZS5FWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTLFxuICAgIElOVkFMSURfU1FVQVJFX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfU1FVQVJFX01BVFJJWDtcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgZGlhZ29uYWwgTWF0cml4IGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSBvZiBudW1iZXJzLFxyXG4gKiBnZW5lcmF0ZXMgYmxvY2sgZGlhZ29uYWwgTWF0cml4IGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSBvZiBNYXRyaWNlcy5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7KG51bWJlcltdfE1hdHJpeFtdKX0gdmFsdWVzIC0gQXJyYXkgb2YgbnVtYmVycyBvciBNYXRyaWNlc1xyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBCbG9jayBkaWFnb25hbCBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZGlhZyh2YWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9BUlJBWSk7XG4gIH1cblxuICB2YXIgYXJnc051bSA9IHZhbHVlcy5sZW5ndGg7XG4gIHZhciB2YXJpYW50O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJnc051bTsgaSsrKSB7XG4gICAgdmFyIGVudHJ5ID0gdmFsdWVzW2ldO1xuXG4gICAgaWYgKCFpc051bWJlcihlbnRyeSkgJiYgIShlbnRyeSBpbnN0YW5jZW9mIE1hdHJpeCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOdW1iZXIoZW50cnkpKSB7XG4gICAgICBpZiAoIXZhcmlhbnQpIHtcbiAgICAgICAgdmFyaWFudCA9ICdudW1iZXInO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhcmlhbnQgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFlbnRyeS5pc1NxdWFyZSgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1NRVUFSRV9NQVRSSVgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXZhcmlhbnQpIHtcbiAgICAgICAgdmFyaWFudCA9ICdzcXVhcmUnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhcmlhbnQgIT09ICdzcXVhcmUnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFWFBFQ1RFRF9BUlJBWV9PRl9OVU1CRVJTX09SX01BVFJJQ0VTKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gSEVSRTogdmFyaWFudCBzaG91bGQgYmUgZWl0aGVyICdudW1iZXInIG9yICdzcXVhcmUnXG5cblxuICBpZiAodmFyaWFudCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0cml4LmdlbmVyYXRlKGFyZ3NOdW0sIGFyZ3NOdW0sIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgICBpZiAoaSA9PT0gaikge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfSAvLyBHdWFyYW50ZWVkIHRoYXQgW3ZhbHVlc10gaXMgYSBsaXN0IG9mIHNxdWFyZSBtYXRyaWNlc1xuXG5cbiAgdmFyIHNpemUgPSAwO1xuICB2YXIgdGVtcCA9IG5ldyBBcnJheShhcmdzTnVtKTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJnc051bTsgX2krKykge1xuICAgIHZhciBfbGVuID0gdmFsdWVzW19pXS5zaXplKClbMF07XG5cbiAgICBzaXplICs9IF9sZW47XG4gICAgdGVtcFtfaV0gPSBfbGVuO1xuICB9XG5cbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBsZW4gPSB0ZW1wW2lkeF07XG4gIHJldHVybiBNYXRyaXguZ2VuZXJhdGUoc2l6ZSwgc2l6ZSwgZnVuY3Rpb24gKGksIGopIHtcbiAgICBpZiAoaSAtIHN0YXJ0ID09PSBsZW4gJiYgaiAtIHN0YXJ0ID09PSBsZW4pIHtcbiAgICAgIHN0YXJ0ICs9IGxlbjtcbiAgICAgIGlkeCsrO1xuICAgIH1cblxuICAgIHZhciBpdGggPSBpIC0gc3RhcnQ7IC8vIGl0aCA8IDAgaWYgYmVsb3cgbWFpbiBkaWFnb25hbFxuXG4gICAgdmFyIGp0aCA9IGogLSBzdGFydDsgLy8ganRoIDwgMCBpZiBhYm92ZSBtYWluIGRpYWdvbmFsXG4gICAgLy8gc2tpcCAweDAgbWF0cmljZXNcblxuICAgIGxlbiA9IHRlbXBbaWR4XTtcblxuICAgIHdoaWxlIChsZW4gPT09IDApIHtcbiAgICAgIGlkeCsrO1xuICAgICAgbGVuID0gdGVtcFtpZHhdO1xuICAgIH1cblxuICAgIGlmIChpdGggPCBsZW4gJiYgaXRoID49IDAgJiYganRoIDwgbGVuICYmIGp0aCA+PSAwKSB7XG4gICAgICByZXR1cm4gdmFsdWVzW2lkeF0uX21hdHJpeFtpdGhdW2p0aF07XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0pO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGRpYWc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYO1xuLyoqXHJcbiAqIFRoaXMgY2FsbGJhY2sgYXBwbGllcyBvbiBlYWNoIGVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEBjYWxsYmFjayBlbnRyeUNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbnRyeSAtIEVudHJ5IG9mIGEgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE5ldyBlbnRyeSB2YWx1ZVxyXG4gKi9cblxuLyoqXHJcbiAqIEFwcGx5cyBhIGZ1bmN0aW9uIG92ZXIgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeCBhbmQgcmV0dXJuc1xyXG4gKiBhIG5ldyBjb3B5IG9mIHRoZSBuZXcgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgTWF0cml4XHJcbiAqIEBwYXJhbSB7ZW50cnlDYWxsYmFja30gY2IgLSBDYWxsYmFjayBmdW5jdGlvbiB3aGljaCBhcHBsaWVzIG9uIGVhY2ggZW50cnkgb2YgQVxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBBIGNvcHkgb2YgbmV3IE1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBlbGVtZW50d2lzZShBLCBjYikge1xuICBpZiAoIShBIGluc3RhbmNlb2YgdGhpcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9NQVRSSVgpO1xuICB9XG5cbiAgdmFyIF9BJHNpemUgPSBBLnNpemUoKSxcbiAgICAgIF9BJHNpemUyID0gX3NsaWNlZFRvQXJyYXkoX0Ekc2l6ZSwgMiksXG4gICAgICByb3cgPSBfQSRzaXplMlswXSxcbiAgICAgIGNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBtYXRyaXggPSBBLl9tYXRyaXg7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHJvdywgY29sLCBmdW5jdGlvbiAoaSwgaikge1xuICAgIHJldHVybiBjYihtYXRyaXhbaV1bal0pO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBlbGVtZW50d2lzZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfUk9XX0NPTCA9IF9yZXF1aXJlLklOVkFMSURfUk9XX0NPTCxcbiAgICBPVkVSRkxPV19JTkRFWCA9IF9yZXF1aXJlLk9WRVJGTE9XX0lOREVYO1xuLyoqXHJcbiAqIEdldHMgdGhlIGVudHJ5IG9mIGEgTWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcGFyYW0ge251bWJlcn0gY29sIC0gQW55IHZhbGlkIGNvbHVtbiBpbmRleFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBFbnRyeSBvZiB0aGUgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGVudHJ5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgQSA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHIgPSBfdGhpcyRzaXplMlswXSxcbiAgICAgIGMgPSBfdGhpcyRzaXplMlsxXTtcblxuICBpZiAocm93ID49IHIgfHwgY29sID49IGMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoT1ZFUkZMT1dfSU5ERVgpO1xuICB9XG5cbiAgcmV0dXJuIEFbcm93XVtjb2xdO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qKlxyXG4gKiBGbGF0dGVuIHRoZSBtYXRyaXggdG8gYW4gYXJyYXlcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAaW5zdGFuY2VcclxuICogQHJldHVybnMge0FycmF5fSBBIGZsYXR0ZW4gYXJyYXlcclxuICovXG5mdW5jdGlvbiBmbGF0dGVuKCkge1xuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgdmFyIGxlbmd0aCA9IHJvdyAqIGNvbDtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShsZW5ndGgpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBhcnJbaSAqIGNvbCArIGpdID0gdGhpcy5fbWF0cml4W2ldW2pdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBTSVpFX0lOQ09NUEFUSUJMRSA9IF9yZXF1aXJlLlNJWkVfSU5DT01QQVRJQkxFO1xuLyoqXHJcbiAqIEdlbmVyYXRlIGEgbWF0cml4IGZyb20gYW4gYXJyYXkgd2l0aCBjb21wYXRpYmxlIGRpbWVuc2lvbnMgXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBTb3VyY2UgYXJyYXlcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyAtIFJvdyBvZiB0aGUgbWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBDb2x1bW4gb2YgdGhlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBNYXRyaXhcclxuICovXG5cblxuZnVuY3Rpb24gZnJvbUFycmF5KGFyciwgcm93LCBjb2wpIHtcbiAgaWYgKHJvdyAqIGNvbCAhPT0gYXJyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihTSVpFX0lOQ09NUEFUSUJMRSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gYXJyW2kgKiBjb2wgKyBqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZnJvbUFycmF5OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW1wdHkgPSByZXF1aXJlKCcuLi8uLi91dGlsL2VtcHR5Jyk7XG4vKipcclxuICogVGhpcyBjYWxsYmFjayBnZW5lcmF0ZXMgZWFjaCBlbnRyeSBvZiBhIE1hdHJpeFxyXG4gKiBAY2FsbGJhY2sgZ2VuZXJhdGVDYWxsYmFja1xyXG4gKiBAcGFyYW0ge251bWJlcn0gaSAtIFRoZSBpLXRoIHJvdyBvZiBNYXRyaXggXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIC0gVGhlIGotdGggY29sdW1uIG9mIE1hdHJpeCBcclxuICogQHJldHVybnMge251bWJlcn0gRW50cnkgb2YgTWF0cml4XHJcbiAqL1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgTWF0cml4IHdoaWNoIGVudHJpZXMgYXJlIHRoZSByZXR1cm5lZCB2YWx1ZSBvZiBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIE1hdHJpeFxyXG4gKiBAcGFyYW0ge2dlbmVyYXRlQ2FsbGJhY2t9IGNiIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggdGFrZXMgcm93IGFuZCBjb2x1bW4gYXMgYXJndW1lbnRzXHJcbiAqIGFuZCBnZW5lcmF0ZXMgdGhlIGNvcnJlc3BvbmRpbmcgZW50cnlcclxuICogQHJldHVybnMge01hdHJpeH0gLSBHZW5lcmF0ZWQgTWF0cml4XHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlKHJvdywgY29sLCBjYikge1xuICB2YXIgbWF0cml4ID0gZW1wdHkocm93LCBjb2wpO1xuXG4gIGlmIChyb3cgPT09IDAgfHwgY29sID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKFtdKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBtYXRyaXhbaV1bal0gPSBjYihpLCBqKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMobWF0cml4KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgZW50cmllcyBvbiB0aGUgbWFpbiBkaWFnb25hbC5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IEFycmF5IG9mIGVudHJpZXMgb2YgQSBvbiB0aGUgbWFpbiBkaWFnb25hbFxyXG4gKi9cblxuXG5mdW5jdGlvbiBnZXREaWFnKEEpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgcm93ID0gX0Ekc2l6ZTJbMF0sXG4gICAgICBjb2wgPSBfQSRzaXplMlsxXTtcblxuICB2YXIgc2l6ZSA9IE1hdGgubWluKHJvdywgY29sKTtcbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgdmFyIGRpYWdzID0gbmV3IEFycmF5KHNpemUpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgZGlhZ3NbaV0gPSBtYXRyaXhbaV1baV07XG4gIH1cblxuICByZXR1cm4gZGlhZ3M7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2V0RGlhZzsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSBNYXRyaXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gcm93IC0gTnVtYmVyIG9mIHJvd3Mgb2YgYSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGNvbCAtIE51bWJlciBvZiBjb2x1bW5zIG9mIGEgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSBMb3dlciBib3VuZCBvZiBlYWNoIGVudHJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSBVcHBlciBib3VuZCBvZiBlYWNoIGVudHJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0ZpeGVkIC0gTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IEdlbmVyYXRlZCByYW5kb20gTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tTWF0cml4KHJvdywgY29sKSB7XG4gIHZhciBtaW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDA7XG4gIHZhciBtYXggPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDE7XG4gIHZhciB0b0ZpeGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiAwO1xuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VGbG9hdCgoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKS50b0ZpeGVkKHRvRml4ZWQpKTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gZ2V0UmFuZG9tTWF0cml4OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGlkZW50aXR5IE1hdHJpeCB3aXRoIGdpdmVuIHNpemUuXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBzaXplIG9mIE1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBJZGVudGl0eSBNYXRyaXhcclxuICovXG5mdW5jdGlvbiBpZGVudGl0eShzaXplKSB7XG4gIHJldHVybiB0aGlzLmdlbmVyYXRlKHNpemUsIHNpemUsIGZ1bmN0aW9uIChpLCBqKSB7XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuLi8uLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBlcXVhbC48YnI+PGJyPlxyXG4gKiBcclxuICogVGhlIHRlc3QgY3JpdGVyaW9uIGlzIE1hdGguYWJzKHggLSB5KSA8IDEgLyAoMTAgKiogZGlnaXQgKiAyKS5cclxuICogRm9yIGRlZmF1bHQgdmFsdWUgNSwgaXQgc2hvdWxkIGJlIDVlLTUuXHJcbiAqIFRoYXQgbWVhbnMgaWYgdGhlIGRpZmZlcmVuY2Ugb2YgdHdvIG51bWJlcnMgaXMgbGVzcyB0aGFuIDVlLTUsXHJcbiAqIHRoZXkgYXJlIGNvbnNpZGVyZWQgYXMgc2FtZSB2YWx1ZS5cclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7TWF0cml4fSBBIC0gQW55IE1hdHJpeFxyXG4gKiBAcGFyYW0ge01hdHJpeH0gQiAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRpZ2l0IC0gTnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR3byBNYXRyaWNlcyBhcmUgY29uc2lkZXJlZCBhcyBzYW1lXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRXF1YWwoQSwgQikge1xuICB2YXIgZGlnaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IDU7XG5cbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpIHx8ICEoQiBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBfQSRzaXplID0gQS5zaXplKCksXG4gICAgICBfQSRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9BJHNpemUsIDIpLFxuICAgICAgQXJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgQWNvbCA9IF9BJHNpemUyWzFdO1xuXG4gIHZhciBfQiRzaXplID0gQi5zaXplKCksXG4gICAgICBfQiRzaXplMiA9IF9zbGljZWRUb0FycmF5KF9CJHNpemUsIDIpLFxuICAgICAgQnJvdyA9IF9CJHNpemUyWzBdLFxuICAgICAgQmNvbCA9IF9CJHNpemUyWzFdO1xuXG4gIGlmIChBcm93ICE9PSBCcm93IHx8IEFjb2wgIT09IEJjb2wpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgRVBJU0lMT04gPSAxIC8gKE1hdGgucG93KDEwLCBkaWdpdCkgKiAyKTtcbiAgdmFyIG1hdHJpeEEgPSBBLl9tYXRyaXg7XG4gIHZhciBtYXRyaXhCID0gQi5fbWF0cml4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgQXJvdzsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBBY29sOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhtYXRyaXhBW2ldW2pdIC0gbWF0cml4QltpXVtqXSkgPj0gRVBJU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX1JPV19DT0wgPSBfcmVxdWlyZS5JTlZBTElEX1JPV19DT0wsXG4gICAgT1ZFUkZMT1dfUk9XID0gX3JlcXVpcmUuT1ZFUkZMT1dfUk9XLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogR2V0cyB0aGUgcm93IG9mIGEgTWF0cml4IHdpdGggdmFsaWQgaW5kZXguXHJcbiAqIEBtZW1iZXJvZiBNYXRyaXhcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge01hdHJpeH0gQSAtIEFueSBNYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQW55IHZhbGlkIHJvdyBpbmRleFxyXG4gKiBAcmV0dXJucyB7TWF0cml4fSBSb3cgb2YgQVxyXG4gKi9cblxuXG5mdW5jdGlvbiByb3coQSwgaW5kZXgpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihpbmRleCkgfHwgaW5kZXggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHIgPSBfQSRzaXplMlswXSxcbiAgICAgIGMgPSBfQSRzaXplMlsxXTtcblxuICBpZiAoaW5kZXggPj0gcikge1xuICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgcmV0dXJuIHRoaXMuZ2VuZXJhdGUoMSwgYywgZnVuY3Rpb24gKGksIGopIHtcbiAgICByZXR1cm4gbWF0cml4W2luZGV4XVtqXTtcbiAgfSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gcm93OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi4vLi4vRXJyb3InKSxcbiAgICBJTlZBTElEX01BVFJJWCA9IF9yZXF1aXJlLklOVkFMSURfTUFUUklYLFxuICAgIEVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMiA9IF9yZXF1aXJlLkVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMixcbiAgICBJTlZBTElEX1JPVyA9IF9yZXF1aXJlLklOVkFMSURfUk9XLFxuICAgIElOVkFMSURfQ09MVU1OID0gX3JlcXVpcmUuSU5WQUxJRF9DT0xVTU4sXG4gICAgT1ZFUkZMT1dfUk9XID0gX3JlcXVpcmUuT1ZFUkZMT1dfUk9XLFxuICAgIElOVkFMSURfUk9XU19FWFBSRVNTSU9OID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dTX0VYUFJFU1NJT04sXG4gICAgSU5WQUxJRF9DT0xVTU5TX0VYUFJFU1NJT04gPSBfcmVxdWlyZS5JTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTixcbiAgICBPVkVSRkxPV19DT0xVTU4gPSBfcmVxdWlyZS5PVkVSRkxPV19DT0xVTU47XG4vKipcclxuICogR2VuZXJhdGVzIGEgc3VibWF0cml4IG9mIGEgbWF0cml4LlxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtNYXRyaXh9IEEgLSBBbnkgbWF0cml4XHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gcm93cyAtIFJvd3MgZXhwcmVzc2lvblxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGNvbHMgLSBDb2x1bW5zIGV4cHJlc3Npb25cclxuICogQHJldHVybnMge01hdHJpeH0gU3VibWF0cml4IG9mIEFcclxuICovXG5cblxuZnVuY3Rpb24gc3VibWF0cml4KEEsIHJvd3MsIGNvbHMpIHtcbiAgaWYgKCEoQSBpbnN0YW5jZW9mIHRoaXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHZhciBhcmcxVHlwZSA9IF90eXBlb2Yocm93cyk7XG5cbiAgdmFyIGFyZzJUeXBlID0gX3R5cGVvZihjb2xzKTtcblxuICBpZiAoYXJnMVR5cGUgIT09ICdzdHJpbmcnICYmIGFyZzFUeXBlICE9PSAnbnVtYmVyJyB8fCBhcmcyVHlwZSAhPT0gJ3N0cmluZycgJiYgYXJnMlR5cGUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKEVYUEVDVEVEX1NUUklOR19OVU1CRVJfQVRfUE9TXzFfMik7XG4gIH1cblxuICB2YXIgX0Ekc2l6ZSA9IEEuc2l6ZSgpLFxuICAgICAgX0Ekc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfQSRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF9BJHNpemUyWzBdLFxuICAgICAgY29sID0gX0Ekc2l6ZTJbMV07XG5cbiAgdmFyIHJvd1N0YXJ0O1xuICB2YXIgcm93RW5kO1xuICB2YXIgY29sU3RhcnQ7XG4gIHZhciBjb2xFbmQ7XG5cbiAgaWYgKGFyZzFUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3dzKSB8fCByb3dzIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XKTtcbiAgICB9XG5cbiAgICBpZiAocm93cyA+PSByb3cpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgIH1cblxuICAgIHJvd1N0YXJ0ID0gcm93cztcbiAgICByb3dFbmQgPSByb3dzO1xuICB9IGVsc2Uge1xuICAgIC8vIHN0cmluZ1xuICAgIHZhciBhcmcgPSByb3dzLnNwbGl0KCc6Jyk7XG5cbiAgICBpZiAoYXJnLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XU19FWFBSRVNTSU9OKTtcbiAgICB9XG5cbiAgICB2YXIgX2FyZyA9IF9zbGljZWRUb0FycmF5KGFyZywgMiksXG4gICAgICAgIHIxID0gX2FyZ1swXSxcbiAgICAgICAgcjIgPSBfYXJnWzFdO1xuXG4gICAgaWYgKHIxID09PSAnJykge1xuICAgICAgcm93U3RhcnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgciA9IE51bWJlcihyMSk7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihyKSB8fCByIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1cpO1xuICAgICAgfVxuXG4gICAgICBpZiAociA+PSByb3cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX1JPVyk7XG4gICAgICB9XG5cbiAgICAgIHJvd1N0YXJ0ID0gcjtcbiAgICB9XG5cbiAgICBpZiAocjIgPT09ICcnKSB7XG4gICAgICByb3dFbmQgPSByb3cgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3IgPSBOdW1iZXIocjIpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoX3IpIHx8IF9yIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9ST1cpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3IgPj0gcm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19ST1cpO1xuICAgICAgfVxuXG4gICAgICByb3dFbmQgPSBfcjtcbiAgICB9XG5cbiAgICBpZiAocm93U3RhcnQgPiByb3dFbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1JPV1NfRVhQUkVTU0lPTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyZzJUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb2xzKSB8fCBjb2xzIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfQ09MVU1OKTtcbiAgICB9XG5cbiAgICBpZiAoY29scyA+PSBjb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgIH1cblxuICAgIGNvbFN0YXJ0ID0gY29scztcbiAgICBjb2xFbmQgPSBjb2xzO1xuICB9IGVsc2Uge1xuICAgIC8vIHN0cmluZ1xuICAgIHZhciBfYXJnMiA9IGNvbHMuc3BsaXQoJzonKTtcblxuICAgIGlmIChfYXJnMi5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTik7XG4gICAgfVxuXG4gICAgdmFyIF9hcmczID0gX3NsaWNlZFRvQXJyYXkoX2FyZzIsIDIpLFxuICAgICAgICBjMSA9IF9hcmczWzBdLFxuICAgICAgICBjMiA9IF9hcmczWzFdO1xuXG4gICAgaWYgKGMxID09PSAnJykge1xuICAgICAgY29sU3RhcnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYyA9IE51bWJlcihjMSk7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjKSB8fCBjIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYyA+PSBjb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE9WRVJGTE9XX0NPTFVNTik7XG4gICAgICB9XG5cbiAgICAgIGNvbFN0YXJ0ID0gYztcbiAgICB9XG5cbiAgICBpZiAoYzIgPT09ICcnKSB7XG4gICAgICBjb2xFbmQgPSBjb2wgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2MgPSBOdW1iZXIoYzIpO1xuXG4gICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoX2MpIHx8IF9jIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2MgPj0gY29sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihPVkVSRkxPV19DT0xVTU4pO1xuICAgICAgfVxuXG4gICAgICBjb2xFbmQgPSBfYztcbiAgICB9XG5cbiAgICBpZiAoY29sU3RhcnQgPiBjb2xFbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX0NPTFVNTlNfRVhQUkVTU0lPTik7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hdHJpeCA9IEEuX21hdHJpeDtcbiAgdmFyIHN1YlJvdyA9IHJvd0VuZCAtIHJvd1N0YXJ0ICsgMTtcbiAgdmFyIHN1YkNvbCA9IGNvbEVuZCAtIGNvbFN0YXJ0ICsgMTtcbiAgdmFyIHN1Yk1hdHJpeCA9IG5ldyBBcnJheShzdWJSb3cpO1xuXG4gIGZvciAodmFyIGkgPSByb3dTdGFydDsgaSA8PSByb3dFbmQ7IGkrKykge1xuICAgIHZhciBuZXdSb3cgPSBuZXcgQXJyYXkoc3ViQ29sKTtcblxuICAgIGZvciAodmFyIGogPSBjb2xTdGFydDsgaiA8PSBjb2xFbmQ7IGorKykge1xuICAgICAgbmV3Um93W2ogLSBjb2xTdGFydF0gPSBtYXRyaXhbaV1bal07XG4gICAgfVxuXG4gICAgc3ViTWF0cml4W2kgLSByb3dTdGFydF0gPSBuZXdSb3c7XG4gIH1cblxuICByZXR1cm4gbmV3IHRoaXMoc3ViTWF0cml4KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBzdWJtYXRyaXg7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuLyoqXHJcbiAqIEdldHMgdGhlIHN0cmluZ2lmaWVkIE1hdHJpeFxyXG4gKiBAbWVtYmVyb2YgTWF0cml4XHJcbiAqIEBpbnN0YW5jZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmdpZmllZCBNYXRyaXhcclxuICovXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIG1hdHJpeCA9IHRoaXMuX21hdHJpeDtcblxuICB2YXIgX3RoaXMkc2l6ZSA9IHRoaXMuc2l6ZSgpLFxuICAgICAgX3RoaXMkc2l6ZTIgPSBfc2xpY2VkVG9BcnJheShfdGhpcyRzaXplLCAyKSxcbiAgICAgIHJvdyA9IF90aGlzJHNpemUyWzBdLFxuICAgICAgY29sID0gX3RoaXMkc2l6ZTJbMV07XG5cbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcm93OyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbDsgaisrKSB7XG4gICAgICBzdHIgKz0gbWF0cml4W2ldW2pdLnRvU3RyaW5nKCk7XG5cbiAgICAgIGlmIChqICE9PSBjb2wgLSAxKSB7XG4gICAgICAgIHN0ciArPSAnICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgIT09IHJvdyAtIDEpIHtcbiAgICAgIHN0ciArPSAnXFxuJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcclxuICogR2VuZXJhdGVzIGEgemVybyBNYXRyaXhcclxuICogQG1lbWJlcm9mIE1hdHJpeFxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3cgLSBOdW1iZXIgb2Ygcm93cyBvZiB0aGUgTWF0cml4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2wgLSBOdW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgTWF0cml4XHJcbiAqIEByZXR1cm5zIHtNYXRyaXh9IFplcm8gTWF0cml4XHJcbiAqL1xuZnVuY3Rpb24gemVybyhyb3csIGNvbCkge1xuICBpZiAoY29sID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIHJvdywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZW5lcmF0ZShyb3csIGNvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAwO1xuICB9KTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSB6ZXJvOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNNYXRyaXggPSByZXF1aXJlKCcuL3V0aWwvaXNNYXRyaXgnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9FcnJvcicpLFxuICAgIElOVkFMSURfTUFUUklYID0gX3JlcXVpcmUuSU5WQUxJRF9NQVRSSVg7XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBNYXRyaXhcclxuICogQG5hbWVzcGFjZSBNYXRyaXhcclxuICogQGNsYXNzXHJcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gQSAtIFR3byBkaW1lbnNpb25hbCBhcnJheSB3aGVyZVxyXG4gKiBBW2ldW2pdIHJlcHJlc2VudHMgdGhlIGktdGggcm93IGFuZCBqLXRoIGNvbHVtbiBvZiBhIG1hdHJpeFxyXG4gKi9cblxuXG5mdW5jdGlvbiBNYXRyaXgoQSkge1xuICBpZiAoIWlzTWF0cml4KEEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfTUFUUklYKTtcbiAgfVxuXG4gIHRoaXMuX21hdHJpeCA9IEE7XG4gIHRoaXMuX2RpZ2l0ID0gODtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXRyaXg7IC8vIHN0cnVjdHVyZVxuXG5NYXRyaXgucHJvdG90eXBlLmlzRGlhZ29uYWwgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzRGlhZ29uYWwnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTa2V3U3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1NrZXdTeW1tZXRyaWMnKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNTcXVhcmUgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzU3F1YXJlJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzU3ltbWV0cmljID0gcmVxdWlyZSgnLi9jb3JlL3N0cnVjdHVyZS9pc1N5bW1ldHJpYycpO1xuTWF0cml4LnByb3RvdHlwZS5pc0xvd2VyVHJpYW5ndWxhciA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNMb3dlclRyaWFuZ3VsYXInKTtcbk1hdHJpeC5wcm90b3R5cGUuaXNVcHBlclRyaWFuZ3VsYXIgPSByZXF1aXJlKCcuL2NvcmUvc3RydWN0dXJlL2lzVXBwZXJUcmlhbmd1bGFyJyk7XG5NYXRyaXgucHJvdG90eXBlLmlzT3J0aG9nb25hbCA9IHJlcXVpcmUoJy4vY29yZS9zdHJ1Y3R1cmUvaXNPcnRob2dvbmFsJyk7IC8vIHByb3BlcnR5XG5cbk1hdHJpeC5wcm90b3R5cGUuY29uZCA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL2NvbmQnKTtcbk1hdHJpeC5wcm90b3R5cGUuZGV0ID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZGV0Jyk7XG5NYXRyaXgucHJvdG90eXBlLmVpZ2VudmFsdWVzID0gcmVxdWlyZSgnLi9jb3JlL3Byb3BlcnRpZXMvZWlnZW52YWx1ZXMnKTtcbk1hdHJpeC5wcm90b3R5cGUubnVsbGl0eSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL251bGxpdHknKTtcbk1hdHJpeC5wcm90b3R5cGUubm9ybSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL25vcm0nKTtcbk1hdHJpeC5wcm90b3R5cGUucmFuayA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3JhbmsnKTtcbk1hdHJpeC5wcm90b3R5cGUuc2l6ZSA9IHJlcXVpcmUoJy4vY29yZS9wcm9wZXJ0aWVzL3NpemUnKTtcbk1hdHJpeC5wcm90b3R5cGUudHJhY2UgPSByZXF1aXJlKCcuL2NvcmUvcHJvcGVydGllcy90cmFjZScpOyAvLyBvcGVyYXRpb25zXG5cbk1hdHJpeC5hZGQgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9hZGQnKTtcbk1hdHJpeC5pbnZlcnNlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvaW52ZXJzZScpO1xuTWF0cml4Lm11bHRpcGx5ID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvbXVsdGlwbHknKTtcbk1hdHJpeC5wb3cgPSByZXF1aXJlKCcuL2NvcmUvb3BlcmF0aW9ucy9wb3cnKTtcbk1hdHJpeC5zdWJ0cmFjdCA9IHJlcXVpcmUoJy4vY29yZS9vcGVyYXRpb25zL3N1YnRyYWN0Jyk7XG5NYXRyaXgudHJhbnNwb3NlID0gcmVxdWlyZSgnLi9jb3JlL29wZXJhdGlvbnMvdHJhbnNwb3NlJyk7IC8vIExpbmVhci1lcXVhdGlvbnNcblxuTWF0cml4LmJhY2t3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvYmFja3dhcmQnKTtcbk1hdHJpeC5mb3J3YXJkID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvZm9yd2FyZCcpO1xuTWF0cml4LnNvbHZlID0gcmVxdWlyZSgnLi9jb3JlL2xpbmVhci1lcXVhdGlvbnMvc29sdmUnKTsgLy8gZGVjb21wb3NpdGlvbnNcblxuTWF0cml4LkxVID0gcmVxdWlyZSgnLi9jb3JlL2RlY29tcG9zaXRpb25zL0xVJyk7XG5NYXRyaXguUVIgPSByZXF1aXJlKCcuL2NvcmUvZGVjb21wb3NpdGlvbnMvUVInKTsgLy8gdXRpbHNcblxuTWF0cml4LmNsb25lID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2Nsb25lJyk7XG5NYXRyaXguY29sdW1uID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2NvbHVtbicpO1xuTWF0cml4LmRpYWcgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZGlhZycpO1xuTWF0cml4LmVsZW1lbnR3aXNlID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VsZW1lbnR3aXNlJyk7XG5NYXRyaXguZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2VuZXJhdGUnKTtcbk1hdHJpeC5nZXREaWFnID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2dldERpYWcnKTtcbk1hdHJpeC5nZXRSYW5kb21NYXRyaXggPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvZ2V0UmFuZG9tTWF0cml4Jyk7XG5NYXRyaXguaWRlbnRpdHkgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvaWRlbnRpdHknKTtcbk1hdHJpeC5pc0VxdWFsID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2lzRXF1YWwnKTtcbk1hdHJpeC5yb3cgPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvcm93Jyk7XG5NYXRyaXguc3VibWF0cml4ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3N1Ym1hdHJpeCcpO1xuTWF0cml4Lnplcm8gPSByZXF1aXJlKCcuL2NvcmUvdXRpbHMvemVybycpO1xuTWF0cml4LmZyb21BcnJheSA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9mcm9tQXJyYXknKTtcbk1hdHJpeC5wcm90b3R5cGUuZmxhdHRlbiA9IHJlcXVpcmUoJy4vY29yZS91dGlscy9mbGF0dGVuJyk7XG5NYXRyaXgucHJvdG90eXBlLmVudHJ5ID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL2VudHJ5Jyk7XG5NYXRyaXgucHJvdG90eXBlLnRvU3RyaW5nID0gcmVxdWlyZSgnLi9jb3JlL3V0aWxzL3RvU3RyaW5nJyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4uL0Vycm9yJyksXG4gICAgSU5WQUxJRF9ST1dfQ09MID0gX3JlcXVpcmUuSU5WQUxJRF9ST1dfQ09MO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtcHR5KHJvdywgY29sKSB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihyb3cpIHx8IHJvdyA8IDAgfHwgIU51bWJlci5pc0ludGVnZXIoY29sKSB8fCBjb2wgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfUk9XX0NPTCk7XG4gIH1cblxuICBpZiAocm93ID09PSAwIHx8IGNvbCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBtYXRyaXggPSBuZXcgQXJyYXkocm93KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJvdzsgaSsrKSB7XG4gICAgbWF0cml4W2ldID0gbmV3IEFycmF5KGNvbCk7XG4gIH1cblxuICByZXR1cm4gbWF0cml4O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnLi9pc051bWJlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTWF0cml4KG1hdHJpeCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobWF0cml4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBoZWlnaHQgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gW10gcmVwcmVzZW50cyBlbXB0eSBtYXRyaXggKDAgeCAwIG1hdHJpeClcbiAgfVxuXG4gIHZhciBmaXJzdFJvdyA9IG1hdHJpeFswXTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZmlyc3RSb3cpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHdpZHRoID0gZmlyc3RSb3cubGVuZ3RoO1xuXG4gIGlmICh3aWR0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTsgLy8gWyBbXSBdIGlzIG5vdCBhbGxvd2VkXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgdmFyIHJvdyA9IG1hdHJpeFtpXTtcblxuICAgIGlmICghQXJyYXkuaXNBcnJheShyb3cpIHx8IHJvdy5sZW5ndGggIT09IHdpZHRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyKHJvd1tqXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc051bWJlcihfaW50KSB7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoX2ludCk7XG59OyIsInZhciBTeWx2ZXN0ZXIgPSB7fVxuXG5TeWx2ZXN0ZXIuTWF0cml4ID0gZnVuY3Rpb24gKCkge31cblxuU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgdmFyIE0gPSBuZXcgU3lsdmVzdGVyLk1hdHJpeCgpXG4gIHJldHVybiBNLnNldEVsZW1lbnRzKGVsZW1lbnRzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LkkgPSBmdW5jdGlvbiAobikge1xuICB2YXIgZWxzID0gW10sXG4gICAgaSA9IG4sXG4gICAgalxuICB3aGlsZSAoaS0tKSB7XG4gICAgaiA9IG5cbiAgICBlbHNbaV0gPSBbXVxuICAgIHdoaWxlIChqLS0pIHtcbiAgICAgIGVsc1tpXVtqXSA9IGkgPT09IGogPyAxIDogMFxuICAgIH1cbiAgfVxuICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LnByb3RvdHlwZSA9IHtcbiAgZHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKHRoaXMuZWxlbWVudHMpXG4gIH0sXG5cbiAgaXNTcXVhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29scyA9IHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwID8gMCA6IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSBjb2xzXG4gIH0sXG5cbiAgdG9SaWdodFRyaWFuZ3VsYXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShbXSlcbiAgICB2YXIgTSA9IHRoaXMuZHVwKCksXG4gICAgICBlbHNcbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSxcbiAgICAgIGosXG4gICAgICBucCA9IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcFxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChNLmVsZW1lbnRzW2ldW2ldID09PSAwKSB7XG4gICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKE0uZWxlbWVudHNbal1baV0gIT09IDApIHtcbiAgICAgICAgICAgIGVscyA9IFtdXG4gICAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgICBlbHMucHVzaChNLmVsZW1lbnRzW2ldW3BdICsgTS5lbGVtZW50c1tqXVtwXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gTS5lbGVtZW50c1tqXVtpXSAvIE0uZWxlbWVudHNbaV1baV1cbiAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgICAvLyBFbGVtZW50cyB3aXRoIGNvbHVtbiBudW1iZXJzIHVwIHRvIGFuIGluY2x1ZGluZyB0aGUgbnVtYmVyIG9mIHRoZVxuICAgICAgICAgICAgLy8gcm93IHRoYXQgd2UncmUgc3VidHJhY3RpbmcgY2FuIHNhZmVseSBiZSBzZXQgc3RyYWlnaHQgdG8gemVybyxcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQncyB0aGUgcG9pbnQgb2YgdGhpcyByb3V0aW5lIGFuZCBpdCBhdm9pZHMgaGF2aW5nIHRvXG4gICAgICAgICAgICAvLyBsb29wIG92ZXIgYW5kIGNvcnJlY3Qgcm91bmRpbmcgZXJyb3JzIGxhdGVyXG4gICAgICAgICAgICBlbHMucHVzaChcbiAgICAgICAgICAgICAgcCA8PSBpID8gMCA6IE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogbXVsdGlwbGllclxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE1cbiAgfSxcblxuICBkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3F1YXJlKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHZhciBNID0gdGhpcy50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIGRldCA9IE0uZWxlbWVudHNbMF1bMF0sXG4gICAgICBuID0gTS5lbGVtZW50cy5sZW5ndGhcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgZGV0ID0gZGV0ICogTS5lbGVtZW50c1tpXVtpXVxuICAgIH1cbiAgICByZXR1cm4gZGV0XG4gIH0sXG5cbiAgaXNTaW5ndWxhcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3F1YXJlKCkgJiYgdGhpcy5kZXRlcm1pbmFudCgpID09PSAwXG4gIH0sXG5cbiAgYXVnbWVudDogZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHVwKClcbiAgICB9XG4gICAgdmFyIE0gPSBtYXRyaXguZWxlbWVudHMgfHwgbWF0cml4XG4gICAgaWYgKHR5cGVvZiBNWzBdWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgTSA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKE0pLmVsZW1lbnRzXG4gICAgfVxuICAgIHZhciBUID0gdGhpcy5kdXAoKSxcbiAgICAgIGNvbHMgPSBULmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHZhciBpID0gVC5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBuaiA9IE1bMF0ubGVuZ3RoLFxuICAgICAgalxuICAgIGlmIChpICE9PSBNLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaiA9IG5qXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIFQuZWxlbWVudHNbaV1bY29scyArIGpdID0gTVtpXVtqXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVFxuICB9LFxuXG4gIGludmVyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NxdWFyZSgpIHx8IHRoaXMuaXNTaW5ndWxhcigpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSA9IG4sXG4gICAgICBqXG4gICAgdmFyIE0gPSB0aGlzLmF1Z21lbnQoU3lsdmVzdGVyLk1hdHJpeC5JKG4pKS50b1JpZ2h0VHJpYW5ndWxhcigpXG4gICAgdmFyIG5wID0gTS5lbGVtZW50c1swXS5sZW5ndGgsXG4gICAgICBwLFxuICAgICAgZWxzLFxuICAgICAgZGl2aXNvclxuICAgIHZhciBpbnZlcnNlX2VsZW1lbnRzID0gW10sXG4gICAgICBuZXdfZWxlbWVudFxuICAgIC8vIFN5bHZlc3Rlci5NYXRyaXggaXMgbm9uLXNpbmd1bGFyIHNvIHRoZXJlIHdpbGwgYmUgbm8gemVyb3Mgb24gdGhlXG4gICAgLy8gZGlhZ29uYWwuIEN5Y2xlIHRocm91Z2ggcm93cyBmcm9tIGxhc3QgdG8gZmlyc3QuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy8gRmlyc3QsIG5vcm1hbGlzZSBkaWFnb25hbCBlbGVtZW50cyB0byAxXG4gICAgICBlbHMgPSBbXVxuICAgICAgaW52ZXJzZV9lbGVtZW50c1tpXSA9IFtdXG4gICAgICBkaXZpc29yID0gTS5lbGVtZW50c1tpXVtpXVxuICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgbmV3X2VsZW1lbnQgPSBNLmVsZW1lbnRzW2ldW3BdIC8gZGl2aXNvclxuICAgICAgICBlbHMucHVzaChuZXdfZWxlbWVudClcbiAgICAgICAgLy8gU2h1ZmZsZSBvZmYgdGhlIGN1cnJlbnQgcm93IG9mIHRoZSByaWdodCBoYW5kIHNpZGUgaW50byB0aGUgcmVzdWx0c1xuICAgICAgICAvLyBhcnJheSBhcyBpdCB3aWxsIG5vdCBiZSBtb2RpZmllZCBieSBsYXRlciBydW5zIHRocm91Z2ggdGhpcyBsb29wXG4gICAgICAgIGlmIChwID49IG4pIHtcbiAgICAgICAgICBpbnZlcnNlX2VsZW1lbnRzW2ldLnB1c2gobmV3X2VsZW1lbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgIC8vIFRoZW4sIHN1YnRyYWN0IHRoaXMgcm93IGZyb20gdGhvc2UgYWJvdmUgaXQgdG8gZ2l2ZSB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICAvLyBvbiB0aGUgbGVmdCBoYW5kIHNpZGVcbiAgICAgIGogPSBpXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGVscyA9IFtdXG4gICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgZWxzLnB1c2goTS5lbGVtZW50c1tqXVtwXSAtIE0uZWxlbWVudHNbaV1bcF0gKiBNLmVsZW1lbnRzW2pdW2ldKVxuICAgICAgICB9XG4gICAgICAgIE0uZWxlbWVudHNbal0gPSBlbHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGludmVyc2VfZWxlbWVudHMpXG4gIH0sXG5cbiAgc2V0RWxlbWVudHM6IGZ1bmN0aW9uIChlbHMpIHtcbiAgICB2YXIgaSxcbiAgICAgIGosXG4gICAgICBlbGVtZW50cyA9IGVscy5lbGVtZW50cyB8fCBlbHNcbiAgICBpZiAoZWxlbWVudHNbMF0gJiYgdHlwZW9mIGVsZW1lbnRzWzBdWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaSA9IGVsZW1lbnRzLmxlbmd0aFxuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGogPSBlbGVtZW50c1tpXS5sZW5ndGhcbiAgICAgICAgdGhpcy5lbGVtZW50c1tpXSA9IFtdXG4gICAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldW2pdID0gZWxlbWVudHNbaV1bal1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgdmFyIG4gPSBlbGVtZW50cy5sZW5ndGhcbiAgICB0aGlzLmVsZW1lbnRzID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzLnB1c2goW2VsZW1lbnRzW2ldXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgY29uc3QgbWF0ID0gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxlbWVudHMpLmludmVyc2UoKVxuICBpZiAobWF0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1hdC5lbGVtZW50c1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXguanMnKTtcbiIsImNvbnN0IGVsZW1XaXNlID0gcmVxdWlyZSgnLi9lbGVtLXdpc2UnKTtcbi8qKlxuKiBBZGQgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHsuLi5BcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcmdzIGxpc3Qgb2YgbWF0cml4XG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBzdW1cbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZCguLi5hcmdzKSB7XG5cdHJldHVybiBlbGVtV2lzZShhcmdzLCBhcmdzMiA9PiB7XG5cdFx0cmV0dXJuIGFyZ3MyLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdFx0aWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGEgKyBiO1xuXHRcdH0sIDApO1xuXHR9KTtcbn07XG4iLCJjb25zdCBkb3RQcm9kdWN0ID0gcmVxdWlyZSgnLi9kb3QtcHJvZHVjdC5qcycpO1xuY29uc3Qgbm9ybSA9IHJlcXVpcmUoJy4vbm9ybS5qcycpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdHdvIHZlY3RvcnMuXG4gKiBAcGFyYW0ge251bWJlcltdfSB2ZWN0b3IxIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge251bWJlcltdfSB2ZWN0b3IyIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge251bWJlcn0gVGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb3NTaW1pbGFyaXR5KHZlY3RvcjEsIHZlY3RvcjIpIHtcblx0aWYgKHZlY3RvcjEubGVuZ3RoICE9PSB2ZWN0b3IyLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ1RoZSBsZW5ndGhzIG9mIHRoZSB2ZWN0b3JzIGRvIG5vdCBtYXRjaCcpKTtcblx0fVxuXG5cdGNvbnN0IG5vcm1Qcm9kID0gKG5vcm0odmVjdG9yMSkgKiBub3JtKHZlY3RvcjIpKTtcblxuXHRpZiAobm9ybVByb2QgPT09IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHJldHVybiBkb3RQcm9kdWN0KHZlY3RvcjEsIHZlY3RvcjIpIC8gbm9ybVByb2Q7XG59O1xuIiwiY29uc3QgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5LmpzJyk7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIGJsb2NrIGRpYWdvbmFsIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBibG9ja3MuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcltdW11bXX0gb3B0aW9ucy5ibG9ja3MgVGhlIGJsb2NrcyB0byBmb3JtIHRoZSBkaWFnb25hbCBtYXRyaXguXG4gKiBAcGFyYW0ge251bWJlcltdfSBbb3B0aW9ucy5vcmRlcj1udWxsXSBPcHRpb25hbCBvcmRlciBmb3IgYXJyYW5naW5nIHRoZSBibG9ja3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyW11bXX0gVGhlIGJsb2NrIGRpYWdvbmFsIG1hdHJpeC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaWFnQmxvY2soe2Jsb2Nrcywgb3JkZXIgPSBudWxsfSkge1xuXHRjb25zdCBkaW1MID0gYmxvY2tzLm1hcChhID0+IGEubGVuZ3RoKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcblx0Y29uc3QgcmVzdWx0ID0gaWRlbnRpdHkoZGltTCk7XG5cdGxldCBjdXJyZW50ID0gMDtcblx0Zm9yIChjb25zdCBtYXQgb2YgYmxvY2tzKSB7XG5cdFx0Zm9yIChjb25zdCBbaV0gb2YgbWF0LmVudHJpZXMoKSkge1xuXHRcdFx0Zm9yIChjb25zdCBbal0gb2YgbWF0LmVudHJpZXMoKSkge1xuXHRcdFx0XHRyZXN1bHRbaSArIGN1cnJlbnRdW2ogKyBjdXJyZW50XSA9IG1hdFtpXVtqXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjdXJyZW50ICs9IG1hdC5sZW5ndGg7XG5cdH1cblxuXHRpZiAob3JkZXIpIHtcblx0XHRyZXR1cm4gb3JkZXIubWFwKGkgPT4gb3JkZXIubWFwKGogPT4gcmVzdWx0W2ldW2pdKSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsImNvbnN0IHplcm9zID0gcmVxdWlyZSgnLi96ZXJvcycpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBkaWFnb25hbCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcltdfSBkaWFnb25hbCBUaGUgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBkaWFnb25hbCBlbGVtZW50cyBvZiB0aGUgbWF0cml4LlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBkaWFnb25hbCBtYXRyaXguXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlhZyhkaWFnb25hbCkge1xuXHRjb25zdCByZXN1bHQgPSB6ZXJvcyhkaWFnb25hbC5sZW5ndGgsIGRpYWdvbmFsLmxlbmd0aCk7XG5cdGZvciAoY29uc3QgW2ksIGVsZW1lbnRdIG9mIGRpYWdvbmFsLmVudHJpZXMoKSkge1xuXHRcdHJlc3VsdFtpXVtpXSA9IGVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yMiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkb3QgcHJvZHVjdCBvZiB0aGUgdHdvIHZlY3RvcnMuXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGxlbmd0aHMgb2YgdGhlIHZlY3RvcnMgZG8gbm90IG1hdGNoLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRvdFByb2R1Y3QodmVjdG9yMSwgdmVjdG9yMikge1xuXHRpZiAodmVjdG9yMS5sZW5ndGggIT09IHZlY3RvcjIubGVuZ3RoKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignTGVuZ3RocyBub3QgbWFjaGluZycpKTtcblx0fVxuXG5cdGxldCByZXN1bHQgPSAwO1xuXHRmb3IgKGNvbnN0IFtpLCBlbGVtZW50XSBvZiB2ZWN0b3IxLmVudHJpZXMoKSkge1xuXHRcdHJlc3VsdCArPSBlbGVtZW50ICogdmVjdG9yMltpXTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4qIEBjYWxsYmFjayBlbGVtV2lzZUNiXG4qIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGFyclxuKiBAcGFyYW0ge051bWJlcn0gcm93SWRcbiogQHBhcmFtIHtOdW1iZXJ9IGNvbElkXG4qL1xuLyoqXG4qIFJ1biBhIGZ1bmN0aW9uIG9uIGNlbGwgcGVyIGNlbGwgZm9yIGVhY2ggTWF0cml4ZXNcbiogQHBhcmFtIHs8QXJyYXkuPEFycmF5LjxBcnJheS48TnVtYmVyPj4+fSBhcnJNYXRyaXhlcyBsaXN0IG9mIG1hdHJpeGVzXG4qIEBwYXJhbSB7ZWxlbVdpc2VDYn0gZm5cbiogQHJldHVybnMge0FycmF5LjxBcnJheS48TnVtYmVyPj59IHJlc3VsdGluZyBtYXRyaXhcbiogQGV4YW1wbGVcbi8vIHRoaXMgd2lsbCBkbyBtMSArIG0yICsgbTMgKyBtNCBvbiBtYXRyaXhlc1xuZWxlbVdpc2UoW20xLCBtMiwgbTMsIG00XSwgYXJnczIgPT4ge1xuXHRyZXR1cm4gYXJnczIucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59KTtcbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZWxlbVdpc2UoYXJyYXlNYXRyaXhlcywgZm4pIHtcblx0cmV0dXJuIGFycmF5TWF0cml4ZXNbMF0ubWFwKChyb3csIHJvd0lkKSA9PiB7XG5cdFx0cmV0dXJuIHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiB7XG5cdFx0XHRjb25zdCBhcnJheSA9IGFycmF5TWF0cml4ZXMubWFwKG0gPT4gbVtyb3dJZF1bY29sSWRdKTtcblx0XHRcdHJldHVybiBmbihhcnJheSwgcm93SWQsIGNvbElkKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4iLCIvKipcbiAqIENhbGN1bGF0ZXMgdGhlIEV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkxIFRoZSBmaXJzdCB2ZWN0b3IuXG4gKiBAcGFyYW0ge251bWJlcltdfSBhcnJheTIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhlIHR3byB2ZWN0b3JzLlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBhcnJheXMgaGF2ZSBkaWZmZXJlbnQgbGVuZ3RocyBvciBpZiBlaXRoZXIgYXJyYXkgaXMgbm90IGFuIGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV1Y2xpZGVhbkRpc3QoYXJyYXkxLCBhcnJheTIpIHtcblx0aWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJyYXkgbGVuZ3RocycpO1xuXHR9XG5cblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5MSkpIHtcblx0XHRjb25zb2xlLmxvZyh7YXJyYXkxfSk7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFycmF5Jyk7XG5cdH1cblxuXHRjb25zdCBkaWZmID0gYXJyYXkxLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IGVsZW1lbnQgLSBhcnJheTJbaW5kZXhdKS5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZWxlbWVudCk7XG5cdHJldHVybiBNYXRoLnNxcnQoZGlmZi5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSk7XG59O1xuIiwiY29uc3QgdHJhY2UgPSByZXF1aXJlKCcuL3RyYWNlLmpzJyk7XG5jb25zdCB0cmFuc3Bvc2UgPSByZXF1aXJlKCcuL3RyYW5zcG9zZS5qcycpO1xuY29uc3QgbWF0U3ViID0gcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpO1xuY29uc3QgbWF0TXVsID0gcmVxdWlyZSgnLi9tYXQtbXVsLmpzJyk7XG5jb25zdCBzdW0gPSByZXF1aXJlKCcuL3N1bS5qcycpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIEZyb2Jlbml1cyBub3JtIG9mIHRoZSBnaXZlbiBtYXRyaWNlcyBvciB2ZWN0b3JzLlxuICogW0Zyb2Jlbml1cyBub3JtXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXRyaXhfbm9ybSNGcm9iZW5pdXNfbm9ybSlcbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gW2FycmF5MV0gVGhlIGZpcnN0IG1hdHJpeCBvciB2ZWN0b3IgKG9wdGlvbmFsKS5cbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gW2FycmF5Ml0gVGhlIHNlY29uZCBtYXRyaXggb3IgdmVjdG9yIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRnJvYmVuaXVzIG5vcm0gb2YgdGhlIG1hdHJpY2VzIG9yIHZlY3RvcnMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvYmVuaXVzKGFycmF5MSwgYXJyYXkyKSB7XG5cdGlmIChhcnJheTEgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkyKTtcblx0fVxuXG5cdGlmIChhcnJheTIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdW0oYXJyYXkxKTtcblx0fVxuXG5cdGNvbnN0IG0gPSBtYXRTdWIoYXJyYXkxLCBhcnJheTIpO1xuXHRjb25zdCBwID0gbWF0TXVsKHRyYW5zcG9zZShtKSwgbSk7XG5cdHJldHVybiBNYXRoLnNxcnQodHJhY2UocCkpO1xufTtcbiIsIi8qKlxuICogYnVpbGQgYW4gaWRlbnRpdHkgc3F1YXJlIG1hdHJpeFxuICogQHBhcmFtIHN0YXRlU2l6ZSBtYXRyaXggc2l6ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlkZW50aXR5KHN0YXRlU2l6ZSkge1xuICBjb25zdCBpZGVudGl0eUFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGVTaXplOyBpKyspIHtcbiAgICBjb25zdCByb3dJZGVudGl0eSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RhdGVTaXplOyBqKyspIHtcbiAgICAgIGlmIChpID09PSBqKSB7XG4gICAgICAgIHJvd0lkZW50aXR5LnB1c2goMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dJZGVudGl0eS5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlkZW50aXR5QXJyYXkucHVzaChyb3dJZGVudGl0eSk7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpdHlBcnJheTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YWRkOiByZXF1aXJlKCcuL2FkZC5qcycpLFxuXHRjb3NTaW1pbGFyaXR5OiByZXF1aXJlKCcuL2Nvcy1zaW1pbGFyaXR5JyksXG5cdGV1Y2xpZGVhbkRpc3Q6IHJlcXVpcmUoJy4vZXVjbGlkZWFuLWRpc3QnKSxcblx0ZGlhZzogcmVxdWlyZSgnLi9kaWFnLmpzJyksXG5cdGRpYWdCbG9jazogcmVxdWlyZSgnLi9kaWFnLWJsb2NrJyksXG5cdGRvdFByb2R1Y3Q6IHJlcXVpcmUoJy4vZG90LXByb2R1Y3QnKSxcblx0ZWxlbVdpc2U6IHJlcXVpcmUoJy4vZWxlbS13aXNlLmpzJyksXG5cdGZyb2Jlbml1czogcmVxdWlyZSgnLi9mcm9iZW5pdXMuanMnKSxcblx0aWRlbnRpdHk6IHJlcXVpcmUoJy4vaWRlbnRpdHkuanMnKSxcblx0aW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydC5qcycpLFxuXHRtYXBNYXRyaXg6IHJlcXVpcmUoJy4vbWFwLW1hdHJpeC5qcycpLFxuXHRtYXRNdWw6IHJlcXVpcmUoJy4vbWF0LW11bC5qcycpLFxuXHRtYXRQZXJtdXRhdGlvbjogcmVxdWlyZSgnLi9tYXQtcGVybXV0YXRpb24uanMnKSxcblx0cGFkV2l0aFplcm9Db2xzOiByZXF1aXJlKCcuL3BhZC13aXRoLXplcm8tY29scy5qcycpLFxuXHRzdWJ0cmFjdDogcmVxdWlyZSgnLi9zdWJ0cmFjdC5qcycpLFxuXHRzdWJTcXVhcmVNYXRyaXg6IHJlcXVpcmUoJy4vc3ViLXNxdWFyZS1tYXRyaXguanMnKSxcblx0c3VtOiByZXF1aXJlKCcuL3N1bS5qcycpLFxuXHR0cmFjZTogcmVxdWlyZSgnLi90cmFjZS5qcycpLFxuXHR0cmFuc3Bvc2U6IHJlcXVpcmUoJy4vdHJhbnNwb3NlLmpzJyksXG5cdHplcm9zOiByZXF1aXJlKCcuL3plcm9zLmpzJyksXG5cdG5vcm06IHJlcXVpcmUoJy4vbm9ybS5qcycpLFxuXHRzdW1WZWN0b3I6IHJlcXVpcmUoJy4vc3VtLXZlY3Rvci5qcycpLFxufTtcbiIsImNvbnN0IG1hdHJpeEludmVyc2UgPSByZXF1aXJlKCdtYXRyaXgtaW52ZXJzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGludmVydChtKSB7XG5cdHJldHVybiBtYXRyaXhJbnZlcnNlKG0pO1xufTtcbiIsIi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIG92ZXIgZWFjaCBlbGVtZW50IG9mIHRoZSBnaXZlbiBtYXRyaXguXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PGFueT4+fSBhIFRoZSBtYXRyaXggdG8gbWFwIG92ZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGFueSwgbnVtYmVyLCBudW1iZXIpOiBhbnl9IGZuIFRoZSBtYXBwaW5nIGZ1bmN0aW9uIHRvIGFwcGx5LlxuICogQHJldHVybnMge0FycmF5PEFycmF5PGFueT4+fSBUaGUgbWF0cml4IHdpdGggdGhlIGZ1bmN0aW9uIGFwcGxpZWQgdG8gZWFjaCBlbGVtZW50LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcE1hdHJpeChhLCBmbikge1xuXHRyZXR1cm4gYS5tYXAoKHJvdywgcm93SWQpID0+IHJvdy5tYXAoKGNlbGwsIGNvbElkKSA9PiBmbihjZWxsLCByb3dJZCwgY29sSWQpKSk7XG59O1xuIiwiLyoqXG4qIE11bHRpcGx5IDIgbWF0cml4ZXMgdG9nZXRoZXJcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtMVxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IG0yXG4qIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0TXVsKG0xLCBtMikge1xuXHQvLyBDb25zb2xlLmxvZyh7bTEsIG0yfSk7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG0xLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0W2ldID0gW107XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBtMlswXS5sZW5ndGg7IGorKykge1xuXHRcdFx0bGV0IHN1bSA9IDA7XG5cdFx0XHRsZXQgaXNOdWxsID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IG0xWzBdLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdGlmICgobTFbaV1ba10gPT09IG51bGwgJiYgbTJba11bal0gIT09IDApIHx8IChtMltrXVtqXSA9PT0gbnVsbCAmJiBtMVtpXVtrXSAhPT0gMCkpIHtcblx0XHRcdFx0XHRpc051bGwgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN1bSArPSBtMVtpXVtrXSAqIG0yW2tdW2pdO1xuXHRcdFx0fVxuXHRcdFx0cmVzdWx0W2ldW2pdID0gaXNOdWxsID8gbnVsbCA6IHN1bTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4XG4gKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IG91dHB1dFNpemVcbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IHJvd0luZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGNvbEluZGV4ZXMgdGhlIHBlcm11dGF0aW9uIGluZGV4ZXMsIHJlc3VsdFtqXVtrXSA9IG1hdHJpeFtyb3dJbmRleGVzLmluZGV4T2YoaildW2NvbEluZGV4ZXMuaW5kZXhPZihrKV1cbiAqIEByZXR1cm5zIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdFBlcm11dGF0aW9uKHtcblx0bWF0cml4LFxuXHRvdXRwdXRTaXplLFxuXHRyb3dJbmRleGVzLFxuXHRjb2xJbmRleGVzLFxufSkge1xuXHRjb25zdCBbblJvdywgbkNvbF0gPSBvdXRwdXRTaXplO1xuXG5cdGlmICghQXJyYXkuaXNBcnJheShyb3dJbmRleGVzKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBJbnZhbGlkIHJvd0luZGV4ZXMgJHtyb3dJbmRleGVzfWApKTtcblx0fVxuXG5cdGlmICghQXJyYXkuaXNBcnJheShjb2xJbmRleGVzKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGNvbEluZGV4ZXMgJHtjb2xJbmRleGVzfWApKTtcblx0fVxuXG5cdHJldHVybiBuZXcgQXJyYXkoblJvdykuZmlsbCgwKS5tYXAoKF8sIGkpID0+IG5ldyBBcnJheShuQ29sKS5maWxsKDApLm1hcCgoXywgaikgPT4ge1xuXHRcdGlmIChjb2xJbmRleGVzLmluY2x1ZGVzKGopICYmIHJvd0luZGV4ZXMuaW5jbHVkZXMoaSkpIHtcblx0XHRcdHJldHVybiBtYXRyaXhbcm93SW5kZXhlcy5pbmRleE9mKGkpXVtjb2xJbmRleGVzLmluZGV4T2YoaildO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9KSk7XG59O1xuIiwiLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBFdWNsaWRlYW4gbm9ybSBvZiB0aGUgZ2l2ZW4gdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yIFRoZSB2ZWN0b3IgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgRXVjbGlkZWFuIG5vcm0uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgRXVjbGlkZWFuIG5vcm0gb2YgdGhlIHZlY3Rvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtKHZlY3Rvcikge1xuXHRsZXQgcmVzdWx0ID0gMDtcblx0Zm9yIChjb25zdCBlbGVtZW50IG9mIHZlY3Rvcikge1xuXHRcdHJlc3VsdCArPSAoZWxlbWVudCAqIGVsZW1lbnQpO1xuXHR9XG5cdHJldHVybiBNYXRoLnNxcnQocmVzdWx0KTtcbn07XG4iLCJjb25zdCBtYXRQZXJtdXRhdGlvbiA9IHJlcXVpcmUoJy4vbWF0LXBlcm11dGF0aW9uJyk7XG4vKipcbiogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBwYWRkZWQgbWF0cml4IHdpdGggemVyb3Mgd2l0aCByZXNwZWN0IHRvIGEgZ2l2ZW5cbiogdGFyZ2V0IGNvbHVtbnMgbnVtYmVyXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gbWF0cml4IHRoZSBtYXRyaXggd2UgbmVlZCB0byBwYWRcbiogQHBhcmFtIHtOdW1iZXJ9IGNvbHVtbnMgaW4gb3VyIGNhc2UsIHRoZSBkeW5hbWljIGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gcGFkZGVkIG1hdHJpeFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1hdHJpeCwge2NvbHVtbnN9KSB7XG5cdGlmIChjb2x1bW5zIDwgbWF0cml4WzBdLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBPdXRwdXQgY29sdW1ucyAke2NvbHVtbnN9IGlzIGdyZWF0ZXIgdGhhbiBpbnB1dCBjb2x1bW5zICR7bWF0cml4WzBdLmxlbmd0aH1gKSk7XG5cdH1cblxuXHRyZXR1cm4gbWF0UGVybXV0YXRpb24oe1xuXHRcdG1hdHJpeCxcblx0XHRvdXRwdXRTaXplOiBbbWF0cml4Lmxlbmd0aCwgY29sdW1uc10sXG5cdFx0cm93SW5kZXhlczogbmV3IEFycmF5KG1hdHJpeC5sZW5ndGgpLmZpbGwoMCkubWFwKChfLCBpbmRleCkgPT4gaW5kZXgpLFxuXHRcdGNvbEluZGV4ZXM6IG5ldyBBcnJheShtYXRyaXhbMF0ubGVuZ3RoKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IGluZGV4KSxcblx0fSk7XG59O1xuIiwiLyoqXG4gKiBFeHRyYWN0cyBhIHN1Yi1zcXVhcmUgbWF0cml4IGZyb20gdGhlIHByb3ZpZGVkIG1hdHJpeCBiYXNlZCBvbiB0aGUgZ2l2ZW4gaW5kZXhlcy5cbiAqIEBwYXJhbSB7bnVtYmVyW11bXX0gbWF0IFRoZSBtYXRyaXggZnJvbSB3aGljaCB0byBleHRyYWN0IHRoZSBzdWItc3F1YXJlIG1hdHJpeC5cbiAqIEBwYXJhbSB7bnVtYmVyW119IGluZGV4ZXMgVGhlIGluZGV4ZXMgdG8gc2VsZWN0IHJvd3MgYW5kIGNvbHVtbnMgZnJvbSB0aGUgbWF0cml4LlxuICogQHJldHVybnMge251bWJlcltdW119IFRoZSBzdWItc3F1YXJlIG1hdHJpeCBleHRyYWN0ZWQgZnJvbSB0aGUgb3JpZ2luYWwgbWF0cml4LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YlNxdWFyZU1hdHJpeChtYXQsIGluZGV4ZXMpIHtcblx0cmV0dXJuIGluZGV4ZXMubWFwKHMxID0+IGluZGV4ZXMubWFwKHMyID0+IG1hdFtzMV1bczJdKSk7XG59O1xuIiwiY29uc3QgZWxlbVdpc2UgPSByZXF1aXJlKCcuL2VsZW0td2lzZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1YnRyYWN0KC4uLmFyZ3MpIHtcblx0cmV0dXJuIGVsZW1XaXNlKGFyZ3MsIChbYSwgYl0pID0+IGEgLSBiKTtcbn07XG4iLCIvKipcbiAqIFN1bXMgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gdmVjdG9yLlxuICogQHBhcmFtIHtudW1iZXJbXX0gdmVjdG9yIFRoZSB2ZWN0b3Igd2hvc2UgZWxlbWVudHMgYXJlIHRvIGJlIHN1bW1lZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBzdW0gb2YgYWxsIGVsZW1lbnRzIGluIHRoZSB2ZWN0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VtVmVjdG9yKHZlY3Rvcikge1xuXHRsZXQgcyA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiB2ZWN0b3IpIHtcblx0XHRzICs9IGVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIHM7XG59O1xuIiwiY29uc3Qgc3VtVmVjdG9yID0gcmVxdWlyZSgnLi9zdW0tdmVjdG9yJyk7XG5cbi8vIFN1bSBhbGwgdGhlIHRlcm1zIG9mIGEgZ2l2ZW4gbWF0cml4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1bShhcnJheSkge1xuXHRsZXQgcyA9IDA7XG5cdGZvciAoY29uc3QgZWxlbWVudCBvZiBhcnJheSkge1xuXHRcdHMgKz0gc3VtVmVjdG9yKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFjZShhcnJheSkge1xuXHRsZXQgZGlhZyA9IDA7XG5cdGZvciAoY29uc3QgW3JvdywgZWxlbWVudF0gb2YgYXJyYXkuZW50cmllcygpKSB7XG5cdFx0ZGlhZyArPSBlbGVtZW50W3Jvd107XG5cdH1cblx0cmV0dXJuIGRpYWc7XG59O1xuIiwiLyoqXG4gKiBUcmFuc3Bvc2VzIHRoZSBnaXZlbiAyRCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8YW55Pj59IGFycmF5IFRoZSAyRCBhcnJheSB0byB0cmFuc3Bvc2UuXG4gKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8YW55Pj59IFRoZSB0cmFuc3Bvc2VkIDJEIGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zcG9zZShhcnJheSkge1xuXHRyZXR1cm4gYXJyYXlbMF0ubWFwKChjb2wsIGkpID0+IGFycmF5Lm1hcChyb3cgPT4gcm93W2ldKSk7XG59O1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSAyRCBhcnJheSBmaWxsZWQgd2l0aCB6ZXJvcyB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gcm93cyBUaGUgbnVtYmVyIG9mIHJvd3MgZm9yIHRoZSAyRCBhcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2xzIFRoZSBudW1iZXIgb2YgY29sdW1ucyBmb3IgdGhlIDJEIGFycmF5LlxuICogQHJldHVybnMge251bWJlcltdW119IEEgMkQgYXJyYXkgZmlsbGVkIHdpdGggemVyb3MuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gemVyb3Mocm93cywgY29scykge1xuXHRyZXR1cm4gbmV3IEFycmF5KHJvd3MpLmZpbGwoMSkubWFwKCgpID0+IG5ldyBBcnJheShjb2xzKS5maWxsKDApKTtcbn07XG4iLCJpbXBvcnQgKiBhcyBtb2RlbENvbGxlY3Rpb24gZnJvbSAnLi9saWIvbW9kZWwtY29sbGVjdGlvbic7XG5pbXBvcnQgKiBhcyBkZWZhdWx0RHluYW1pY01vZGVscyBmcm9tICcuL2xpYi9keW5hbWljJztcbmltcG9ydCAqIGFzIGRlZmF1bHRPYnNlcnZhdGlvbk1vZGVscyBmcm9tICcuL2xpYi9vYnNlcnZhdGlvbic7XG5cbmZ1bmN0aW9uIGNhbWVsVG9EYXNoKHN0cjogc3RyaW5nKSB7XG5cdGlmIChzdHIgPT09IHN0ci50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0cmV0dXJuIHN0cjtcblx0fVxuXHRyZXR1cm4gc3RyLnJlcGxhY2VBbGwoL1tBLVpdL2csIG0gPT4gJy0nICsgbS50b0xvd2VyQ2FzZSgpKTtcbn1cblxuT2JqZWN0LmtleXMoZGVmYXVsdER5bmFtaWNNb2RlbHMpLmZvckVhY2goKGs6IHN0cmluZykgPT4ge1xuXG5cdG1vZGVsQ29sbGVjdGlvbi5yZWdpc3RlckR5bmFtaWMoY2FtZWxUb0Rhc2goayksIGRlZmF1bHREeW5hbWljTW9kZWxzW2tdKTtcbn0pO1xuXG5PYmplY3Qua2V5cyhkZWZhdWx0T2JzZXJ2YXRpb25Nb2RlbHMpLmZvckVhY2goKGs6IHN0cmluZykgPT4ge1xuXHRtb2RlbENvbGxlY3Rpb24ucmVnaXN0ZXJPYnNlcnZhdGlvbihjYW1lbFRvRGFzaChrKSwgZGVmYXVsdE9ic2VydmF0aW9uTW9kZWxzW2tdKTtcbn0pO1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbC1jb2xsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2R5bmFtaWMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvb2JzZXJ2YXRpb24nO1xuXG5leHBvcnQge2RlZmF1bHQgYXMgS2FsbWFuRmlsdGVyfSBmcm9tICcuL2xpYi9rYWxtYW4tZmlsdGVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBnZXRDb3ZhcmlhbmNlfSBmcm9tICcuL2xpYi91dGlscy9nZXQtY292YXJpYW5jZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgU3RhdGV9IGZyb20gJy4vbGliL3N0YXRlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjaGVja0NvdmFyaWFuY2V9IGZyb20gJy4vbGliL3V0aWxzL2NoZWNrLWNvdmFyaWFuY2UnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvcnJlbGF0aW9uVG9Db3ZhcmlhbmNlfSBmcm9tICcuL2xpYi91dGlscy9jb3JyZWxhdGlvbi10by1jb3ZhcmlhbmNlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbn0gZnJvbSAnLi9saWIvdXRpbHMvY292YXJpYW5jZS10by1jb3JyZWxhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgcHJvamVjdE9ic2VydmF0aW9ufSBmcm9tICcuL2xpYi91dGlscy9wcm9qZWN0LW9ic2VydmF0aW9uJztcbiIsImltcG9ydCB7XG5cdG1hdE11bCwgdHJhbnNwb3NlLCBhZGQsIGludmVydCwgc3VidHJhY3QgYXMgc3ViLCBpZGVudGl0eSBhcyBnZXRJZGVudGl0eSxcbn0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgY2hlY2tNYXRyaXggZnJvbSAnLi91dGlscy9jaGVjay1tYXRyaXgnO1xuaW1wb3J0IHR5cGUge1xuXHRDb3JlQ29uZmlnLCBEeW5hbWljQ29uZmlnLCBPYnNlcnZhdGlvbkNvbmZpZywgUHJlZGljdGVkQ2FsbGJhY2ssIFByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2ssIFdpbnN0b25Mb2dnZXIsXG59IGZyb20gJy4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuaW1wb3J0IFR5cGVBc3NlcnQgZnJvbSAnLi90eXBlcy9UeXBlQXNzZXJ0JztcblxuY29uc3QgZGVmYXVsdExvZ2dlcjogV2luc3RvbkxvZ2dlciA9IHtcblx0aW5mbzogKC4uLmFyZ3MpID0+IGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuXHRkZWJ1ZygpIHt9LFxuXHR3YXJuOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG5cdGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5sb2coLi4uYXJncyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3JlS2FsbWFuRmlsdGVyIHtcblx0ZHluYW1pYzogRHluYW1pY0NvbmZpZztcblx0b2JzZXJ2YXRpb246IE9ic2VydmF0aW9uQ29uZmlnO1xuXHRsb2dnZXI6IFdpbnN0b25Mb2dnZXI7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9uczogQ29yZUNvbmZpZykge1xuXHRcdGNvbnN0IHtkeW5hbWljLCBvYnNlcnZhdGlvbiwgbG9nZ2VyID0gZGVmYXVsdExvZ2dlcn0gPSBvcHRpb25zO1xuXHRcdHRoaXMuZHluYW1pYyA9IGR5bmFtaWM7XG5cdFx0dGhpcy5vYnNlcnZhdGlvbiA9IG9ic2VydmF0aW9uO1xuXHRcdHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXHR9XG5cdC8vIHwgbnVtYmVyW11cblx0Z2V0VmFsdWUoZm46IG51bWJlcltdW10gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrIHwgUHJlZGljdGVkQ2FsbGJhY2ssIG9wdGlvbnM6IGFueSk6IG51bWJlcltdW10ge1xuXHRcdHJldHVybiAodHlwZW9mIChmbikgPT09ICdmdW5jdGlvbicgPyBmbihvcHRpb25zKSA6IGZuKTtcblx0fVxuXG5cdGdldEluaXRTdGF0ZSgpOiBTdGF0ZSB7XG5cdFx0Y29uc3Qge21lYW46IG1lYW5Jbml0LCBjb3ZhcmlhbmNlOiBjb3ZhcmlhbmNlSW5pdCwgaW5kZXg6IGluZGV4SW5pdH0gPSB0aGlzLmR5bmFtaWMuaW5pdDtcblxuXHRcdGNvbnN0IGluaXRTdGF0ZSA9IG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuOiBtZWFuSW5pdCxcblx0XHRcdGNvdmFyaWFuY2U6IGNvdmFyaWFuY2VJbml0LFxuXHRcdFx0aW5kZXg6IGluZGV4SW5pdCxcblx0XHR9KTtcblx0XHRTdGF0ZS5jaGVjayhpbml0U3RhdGUsIHt0aXRsZTogJ2R5bmFtaWMuaW5pdCd9KTtcblx0XHRyZXR1cm4gaW5pdFN0YXRlO1xuXHR9XG5cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIHByZWRpY3RlZCBjb3ZhcmlhbmNlIG9mIGEgZ2l2ZW4gcHJldmlvdXNDb3JyZWN0ZWQgU3RhdGUsIHRoaXMgd2lsbCBoZWxwIHVzIHRvIGJ1aWxkIHRoZSBhc3ltcHRvdGljU3RhdGUuXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJldmlvdXNDb3JyZWN0ZWRcblx0KiBAcmV0dXJuc3tBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuXHQqL1xuXG5cdGdldFByZWRpY3RlZENvdmFyaWFuY2Uob3B0aW9uczoge3ByZXZpb3VzQ29ycmVjdGVkPzogU3RhdGUsIGluZGV4PzogbnVtYmVyfSA9IHt9KSB7XG5cdFx0bGV0IHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXh9ID0gb3B0aW9ucztcblx0XHRwcmV2aW91c0NvcnJlY3RlZCB8fD0gdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXgsIC4uLm9wdGlvbnN9O1xuXHRcdGNvbnN0IHRyYW5zaXRpb24gPSB0aGlzLmdldFZhbHVlKHRoaXMuZHluYW1pYy50cmFuc2l0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXG5cdFx0Y2hlY2tNYXRyaXgodHJhbnNpdGlvbiwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIHRoaXMuZHluYW1pYy5kaW1lbnNpb25dLCAnZHluYW1pYy50cmFuc2l0aW9uJyk7XG5cblx0XHRjb25zdCB0cmFuc2l0aW9uVHJhbnNwb3NlZCA9IHRyYW5zcG9zZSh0cmFuc2l0aW9uKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlSW50ZXIgPSBtYXRNdWwodHJhbnNpdGlvbiwgcHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG5cdFx0Y29uc3QgY292YXJpYW5jZVByZXZpb3VzID0gbWF0TXVsKGNvdmFyaWFuY2VJbnRlciwgdHJhbnNpdGlvblRyYW5zcG9zZWQpO1xuXHRcdGNvbnN0IGR5bkNvdiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5keW5hbWljLmNvdmFyaWFuY2UgYXMgbnVtYmVyW11bXSwgZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSBhZGQoXG5cdFx0XHRkeW5Db3YsXG5cdFx0XHRjb3ZhcmlhbmNlUHJldmlvdXMsXG5cdFx0KTtcblx0XHRjaGVja01hdHJpeChjb3ZhcmlhbmNlLCBbdGhpcy5keW5hbWljLmRpbWVuc2lvbiwgdGhpcy5keW5hbWljLmRpbWVuc2lvbl0sICdwcmVkaWN0ZWQuY292YXJpYW5jZScpO1xuXG5cdFx0cmV0dXJuIGNvdmFyaWFuY2U7XG5cdH1cblxuXHRwcmVkaWN0TWVhbihvOiB7b3B0cywgdHJhbnNpdGlvbjogbnVtYmVyW11bXX0pIHtcblx0XHRjb25zdCBtZWFuID0gdGhpcy5wcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKG8pO1xuXHRcdGlmICghdGhpcy5keW5hbWljLmNvbnN0YW50KSB7XG5cdFx0XHRyZXR1cm4gbWVhbjtcblx0XHR9XG5cblx0XHRjb25zdCB7b3B0c30gPSBvO1xuXHRcdGNvbnN0IGNvbnRyb2wgPSB0aGlzLmR5bmFtaWMuY29uc3RhbnQob3B0cyk7XG5cdFx0Y2hlY2tNYXRyaXgoY29udHJvbCwgW3RoaXMuZHluYW1pYy5kaW1lbnNpb24sIDFdLCAnZHluYW1pYy5jb25zdGFudCcpO1xuXHRcdHJldHVybiBhZGQobWVhbiwgY29udHJvbCk7XG5cdH1cblxuXHRwcmVkaWN0TWVhbldpdGhvdXRDb250cm9sKGFyZ3M6IHtvcHRzLCB0cmFuc2l0aW9uOiBudW1iZXJbXVtdfSk6IG51bWJlcltdW10ge1xuXHRcdGNvbnN0IHtvcHRzLCB0cmFuc2l0aW9ufSA9IGFyZ3M7XG5cdFx0aWYgKHRoaXMuZHluYW1pYy5mbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZHluYW1pYy5mbihvcHRzKTtcblx0XHR9XG5cblx0XHRjb25zdCB7cHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0cztcblx0XHRyZXR1cm4gbWF0TXVsKHRyYW5zaXRpb24sIHByZXZpb3VzQ29ycmVjdGVkLm1lYW4pO1xuXHR9XG5cdC8qKlxuXHRUaGlzIHdpbGwgcmV0dXJuIHRoZSBuZXcgcHJlZGljdGlvbiwgcmVsYXRpdmVseSB0byB0aGUgZHluYW1pYyBtb2RlbCBjaG9zZW5cblx0KiBAcGFyYW0ge1N0YXRlfSBwcmV2aW91c0NvcnJlY3RlZCBTdGF0ZSByZWxhdGl2ZSB0byBvdXIgZHluYW1pYyBtb2RlbFxuXHQqIEByZXR1cm5ze1N0YXRlfSBwcmVkaWN0ZWQgU3RhdGVcblx0Ki9cblxuXHRwcmVkaWN0KG9wdGlvbnM6IHtwcmV2aW91c0NvcnJlY3RlZD86IFN0YXRlLCBpbmRleD86IG51bWJlciwgb2JzZXJ2YXRpb24/OiBudW1iZXJbXSB8IG51bWJlcltdW119ID0ge30pOiBTdGF0ZSB7XG5cdFx0bGV0IHtwcmV2aW91c0NvcnJlY3RlZCwgaW5kZXh9ID0gb3B0aW9ucztcblx0XHRwcmV2aW91c0NvcnJlY3RlZCB8fD0gdGhpcy5nZXRJbml0U3RhdGUoKTtcblxuXHRcdGlmICh0eXBlb2YgKGluZGV4KSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIChwcmV2aW91c0NvcnJlY3RlZC5pbmRleCkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRpbmRleCA9IHByZXZpb3VzQ29ycmVjdGVkLmluZGV4ICsgMTtcblx0XHR9XG5cblx0XHRTdGF0ZS5jaGVjayhwcmV2aW91c0NvcnJlY3RlZCwge2RpbWVuc2lvbjogdGhpcy5keW5hbWljLmRpbWVuc2lvbn0pO1xuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRwcmV2aW91c0NvcnJlY3RlZCxcblx0XHRcdGluZGV4LFxuXHRcdH07XG5cblx0XHRjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLmR5bmFtaWMudHJhbnNpdGlvbiwgZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNvbnN0IG1lYW4gPSB0aGlzLnByZWRpY3RNZWFuKHt0cmFuc2l0aW9uLCBvcHRzOiBnZXRWYWx1ZU9wdGlvbnN9KTtcblxuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmdldFByZWRpY3RlZENvdmFyaWFuY2UoZ2V0VmFsdWVPcHRpb25zKTtcblxuXHRcdGNvbnN0IHByZWRpY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXh9KTtcblx0XHR0aGlzLmxvZ2dlci5kZWJ1ZygnUHJlZGljdGlvbiBkb25lJywgcHJlZGljdGVkKTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHByZWRpY3RlZC5tZWFuWzBdWzBdKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ25hbicpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJlZGljdGVkO1xuXHR9XG5cdC8qKlxuXHQgKiBUaGlzIHdpbGwgcmV0dXJuIHRoZSBuZXcgY29ycmVjdGlvbiwgdGFraW5nIGludG8gYWNjb3VudCB0aGUgcHJlZGljdGlvbiBtYWRlXG5cdCAqIGFuZCB0aGUgb2JzZXJ2YXRpb24gb2YgdGhlIHNlbnNvclxuXHQgKiBwYXJhbSB7U3RhdGV9IHByZWRpY3RlZCB0aGUgcHJldmlvdXMgU3RhdGVcblx0ICogQHBhcmFtIG9wdGlvbnNcblx0ICogQHJldHVybnMga2FsbWFuR2FpblxuXHQgKi9cblx0Z2V0R2FpbihvcHRpb25zOiB7cHJlZGljdGVkOiBTdGF0ZSwgc3RhdGVQcm9qZWN0aW9uPzogbnVtYmVyW11bXX0pOiBudW1iZXJbXVtdIHtcblx0XHRsZXQge3ByZWRpY3RlZCwgc3RhdGVQcm9qZWN0aW9ufSA9IG9wdGlvbnM7XG5cdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge1xuXHRcdFx0aW5kZXg6IHByZWRpY3RlZC5pbmRleCxcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0fTtcblx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRE9yRm5jKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnQ29yZUthbG1hbkZpbHRlci5nZXRHYWluJyk7XG5cdFx0c3RhdGVQcm9qZWN0aW9uIHx8PSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdGNvbnN0IG9ic0NvdmFyaWFuY2UgPSB0aGlzLmdldFZhbHVlKHRoaXMub2JzZXJ2YXRpb24uY292YXJpYW5jZSBhcyBudW1iZXJbXVtdLCBnZXRWYWx1ZU9wdGlvbnMpO1xuXHRcdGNoZWNrTWF0cml4KG9ic0NvdmFyaWFuY2UsIFt0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbiwgdGhpcy5vYnNlcnZhdGlvbi5kaW1lbnNpb25dLCAnb2JzZXJ2YXRpb24uY292YXJpYW5jZScpO1xuXHRcdGNvbnN0IHN0YXRlUHJvalRyYW5zcG9zZWQgPSB0cmFuc3Bvc2Uoc3RhdGVQcm9qZWN0aW9uKTtcblxuXHRcdGNoZWNrTWF0cml4KHN0YXRlUHJvamVjdGlvbiwgW3RoaXMub2JzZXJ2YXRpb24uZGltZW5zaW9uLCB0aGlzLmR5bmFtaWMuZGltZW5zaW9uXSwgJ29ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbicpO1xuXG5cdFx0Y29uc3Qgbm9pc2VsZXNzSW5ub3ZhdGlvbiA9IG1hdE11bChcblx0XHRcdG1hdE11bChzdGF0ZVByb2plY3Rpb24sIHByZWRpY3RlZC5jb3ZhcmlhbmNlKSxcblx0XHRcdHN0YXRlUHJvalRyYW5zcG9zZWQsXG5cdFx0KTtcblxuXHRcdGNvbnN0IGlubm92YXRpb25Db3ZhcmlhbmNlID0gYWRkKG5vaXNlbGVzc0lubm92YXRpb24sIG9ic0NvdmFyaWFuY2UpO1xuXG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwocHJlZGljdGVkLmNvdmFyaWFuY2UsIHN0YXRlUHJvalRyYW5zcG9zZWQpLFxuXHRcdFx0aW52ZXJ0KGlubm92YXRpb25Db3ZhcmlhbmNlKSxcblx0XHQpO1xuXG5cdFx0cmV0dXJuIG9wdGltYWxLYWxtYW5HYWluO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgd2lsbCByZXR1cm4gdGhlIGNvcnJlY3RlZCBjb3ZhcmlhbmNlIG9mIGEgZ2l2ZW4gcHJlZGljdGVkIFN0YXRlLCB0aGlzIHdpbGwgaGVscCB1cyB0byBidWlsZCB0aGUgYXN5bXB0b3RpY1N0YXRlLlxuXHQgKiBAcGFyYW0ge1N0YXRlfSBwcmVkaWN0ZWQgdGhlIHByZXZpb3VzIFN0YXRlXG5cdCAqIEByZXR1cm5ze0FycmF5LjxBcnJheS48TnVtYmVyPj59XG5cdCAqL1xuXHRnZXRDb3JyZWN0ZWRDb3ZhcmlhbmNlKG9wdGlvbnM6IHtwcmVkaWN0ZWQ6IFN0YXRlLCBvcHRpbWFsS2FsbWFuR2Fpbj86IGFueSwgc3RhdGVQcm9qZWN0aW9uPzogYW55fSk6IG51bWJlcltdW10ge1xuXHRcdGxldCB7cHJlZGljdGVkLCBvcHRpbWFsS2FsbWFuR2Fpbiwgc3RhdGVQcm9qZWN0aW9ufSA9IG9wdGlvbnM7XG5cdFx0Y29uc3QgaWRlbnRpdHkgPSBnZXRJZGVudGl0eShwcmVkaWN0ZWQuY292YXJpYW5jZS5sZW5ndGgpO1xuXHRcdGlmICghc3RhdGVQcm9qZWN0aW9uKSB7XG5cdFx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRCh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgJ0NvcmVLYWxtYW5GaWx0ZXIuZ2V0Q29ycmVjdGVkQ292YXJpYW5jZScpO1xuXHRcdFx0Y29uc3QgZ2V0VmFsdWVPcHRpb25zID0ge1xuXHRcdFx0XHRpbmRleDogcHJlZGljdGVkLmluZGV4LFxuXHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0fTtcblx0XHRcdHN0YXRlUHJvamVjdGlvbiA9IHRoaXMuZ2V0VmFsdWUodGhpcy5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sIGdldFZhbHVlT3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0b3B0aW1hbEthbG1hbkdhaW4gfHw9IHRoaXMuZ2V0R2Fpbih7c3RhdGVQcm9qZWN0aW9uLCAuLi5vcHRpb25zfSk7XG5cblx0XHRyZXR1cm4gbWF0TXVsKFxuXHRcdFx0c3ViKGlkZW50aXR5LCBtYXRNdWwob3B0aW1hbEthbG1hbkdhaW4sIHN0YXRlUHJvamVjdGlvbikpLFxuXHRcdFx0cHJlZGljdGVkLmNvdmFyaWFuY2UsXG5cdFx0KTtcblx0fVxuXG5cdGdldFByZWRpY3RlZE9ic2VydmF0aW9uKGFyZ3M6IHtvcHRzOiBhbnksIHN0YXRlUHJvamVjdGlvbjogbnVtYmVyW11bXX0pOiBudW1iZXJbXVtdIHtcblx0XHRjb25zdCB7b3B0cywgc3RhdGVQcm9qZWN0aW9ufSA9IGFyZ3M7XG5cdFx0aWYgKHRoaXMub2JzZXJ2YXRpb24uZm4pIHtcblx0XHRcdHJldHVybiB0aGlzLm9ic2VydmF0aW9uLmZuKG9wdHMpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtwcmVkaWN0ZWR9ID0gb3B0cztcblx0XHRyZXR1cm4gbWF0TXVsKHN0YXRlUHJvamVjdGlvbiwgcHJlZGljdGVkLm1lYW4pO1xuXHR9XG5cblx0LyoqXG5cdFRoaXMgd2lsbCByZXR1cm4gdGhlIG5ldyBjb3JyZWN0aW9uLCB0YWtpbmcgaW50byBhY2NvdW50IHRoZSBwcmVkaWN0aW9uIG1hZGVcblx0YW5kIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJlZGljdGVkIHRoZSBwcmV2aW91cyBTdGF0ZVxuXHQqIEBwYXJhbSB7QXJyYXl9IG9ic2VydmF0aW9uIHRoZSBvYnNlcnZhdGlvbiBvZiB0aGUgc2Vuc29yXG5cdCogQHJldHVybnN7U3RhdGV9IGNvcnJlY3RlZCBTdGF0ZSBvZiB0aGUgS2FsbWFuIEZpbHRlclxuXHQqL1xuXG5cdGNvcnJlY3Qob3B0aW9uczoge3ByZWRpY3RlZDogYW55LCBvYnNlcnZhdGlvbjogYW55fSk6IFN0YXRlIHtcblx0XHRjb25zdCB7cHJlZGljdGVkLCBvYnNlcnZhdGlvbn0gPSBvcHRpb25zO1xuXHRcdFN0YXRlLmNoZWNrKHByZWRpY3RlZCwge2RpbWVuc2lvbjogdGhpcy5keW5hbWljLmRpbWVuc2lvbn0pO1xuXHRcdGlmICghb2JzZXJ2YXRpb24pIHtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoJ25vIG1lYXN1cmUgYXZhaWxhYmxlJykpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFZhbHVlT3B0aW9ucyA9IHtcblx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0cHJlZGljdGVkLFxuXHRcdFx0aW5kZXg6IHByZWRpY3RlZC5pbmRleCxcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0fTtcblx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRE9yRm5jKHRoaXMub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCAnQ29yZUthbG1hbkZpbHRlci5jb3JyZWN0Jyk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qZWN0aW9uID0gdGhpcy5nZXRWYWx1ZSh0aGlzLm9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvbiwgZ2V0VmFsdWVPcHRpb25zKSBhcyBudW1iZXJbXVtdO1xuXG5cdFx0Y29uc3Qgb3B0aW1hbEthbG1hbkdhaW4gPSB0aGlzLmdldEdhaW4oe1xuXHRcdFx0cHJlZGljdGVkLFxuXHRcdFx0c3RhdGVQcm9qZWN0aW9uLFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9KTtcblxuXHRcdGNvbnN0IGlubm92YXRpb24gPSBzdWIoXG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdHRoaXMuZ2V0UHJlZGljdGVkT2JzZXJ2YXRpb24oe3N0YXRlUHJvamVjdGlvbiwgb3B0czogZ2V0VmFsdWVPcHRpb25zfSksXG5cdFx0KTtcblxuXHRcdGNvbnN0IG1lYW4gPSBhZGQoXG5cdFx0XHRwcmVkaWN0ZWQubWVhbixcblx0XHRcdG1hdE11bChvcHRpbWFsS2FsbWFuR2FpbiwgaW5ub3ZhdGlvbiksXG5cdFx0KTtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKG1lYW5bMF1bMF0pKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh7b3B0aW1hbEthbG1hbkdhaW4sIGlubm92YXRpb24sIHByZWRpY3RlZH0pO1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ01lYW4gaXMgTmFOIGFmdGVyIGNvcnJlY3Rpb24nKSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY292YXJpYW5jZSA9IHRoaXMuZ2V0Q29ycmVjdGVkQ292YXJpYW5jZSh7XG5cdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRvcHRpbWFsS2FsbWFuR2Fpbixcblx0XHRcdHN0YXRlUHJvamVjdGlvbixcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0fSxcblx0XHQpO1xuXHRcdGNvbnN0IGNvcnJlY3RlZCA9IG5ldyBTdGF0ZSh7bWVhbiwgY292YXJpYW5jZSwgaW5kZXg6IHByZWRpY3RlZC5pbmRleH0pO1xuXHRcdHRoaXMubG9nZ2VyLmRlYnVnKCdDb3JyZWN0aW9uIGRvbmUnLCBjb3JyZWN0ZWQpO1xuXHRcdHJldHVybiBjb3JyZWN0ZWQ7XG5cdH1cbn1cbiIsImltcG9ydCB7YnVpbGREeW5hbWljfSBmcm9tICcuLi9tb2RlbC1jb2xsZWN0aW9uJztcblxuLyoqXG4qIEB0eXBlZGVmIHtPYmplY3QuPER5bmFtaWNOYW1lLCBEeW5hbWljQ29uZmlnPn0gUGVyTmFtZUNvbmZpZ3NcbiovXG4vKipcbiogQHR5cGVkZWYge09iamVjdH0gRHluYW1pY0NvbmZpZ1xuKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzXG4qIEBwYXJhbSB7Q292YXJpYW5jZX0gc3RhdGljQ292YXJpYW5jZVxuKi9cblxuLyoqXG4qIENyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBjb25zaWRlcmluZyB0aGUgbnVsbCBpbiBvcmRlciB0byBtYWtlIHRoZSBwcmVkaWN0aW9uc1xuKiBAcGFyYW0ge09iamVjdH0gbWFpblxuKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBEeW5hbWljQ29uZmlnPn0gbWFpbi5wZXJOYW1lXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5vYnNlcnZlZFByb2plY3Rpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcG9zaXRpb24oe3Blck5hbWV9LCBvYnNlcnZhdGlvbikge1xuXHRjb25zdCB7b2JzZXJ2ZWRQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZlZER5bmFtRGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aDtcblxuXHRjb25zdCBkeW5hbWljTmFtZXMgPSBPYmplY3Qua2V5cyhwZXJOYW1lKTtcblxuXHRjb25zdCBjb25mcyA9IHt9O1xuXHRsZXQgbmV4dER5bmFtaWNEaW1lbnNpb24gPSBvYnNlcnZlZER5bmFtRGltZW5zaW9uO1xuXHRsZXQgbmV4dE9ic2VydmVkRGltZW5zaW9uID0gMDtcblx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0Y29uc3Qgb2JzRHluYUluZGV4ZXMgPSBwZXJOYW1lW2tdLm9ic0R5bmFJbmRleGVzO1xuXHRcdGlmICh0eXBlb2YgKHBlck5hbWVba10ubmFtZSkgPT09ICdzdHJpbmcnICYmIHBlck5hbWVba10ubmFtZSAhPT0gaykge1xuXHRcdFx0dGhyb3cgKG5ldyBFcnJvcihgJHtwZXJOYW1lW2tdLm5hbWV9IGFuZCBcIiR7a31cIiBzaG91bGQgbWF0Y2hgKSk7XG5cdFx0fVxuXG5cdFx0cGVyTmFtZVtrXS5uYW1lID0gaztcblxuXHRcdGNvbnN0IHtkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsIGluaXR9ID0gYnVpbGREeW5hbWljKHBlck5hbWVba10sIG9ic2VydmF0aW9uKTtcblxuXHRcdGNvbnN0IGR5bmFtaWNJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGltZW5zaW9uOyBpKyspIHtcblx0XHRcdGNvbnN0IGlzT2JzZXJ2ZWQgPSAoaSA8IG9ic0R5bmFJbmRleGVzLmxlbmd0aCk7XG5cdFx0XHRsZXQgbmV3SW5kZXg6IG51bWJlcjtcblx0XHRcdGlmIChpc09ic2VydmVkKSB7XG5cdFx0XHRcdG5ld0luZGV4ID0gbmV4dE9ic2VydmVkRGltZW5zaW9uO1xuXHRcdFx0XHRpZiAobmV3SW5kZXggIT09IG9ic0R5bmFJbmRleGVzW2ldKSB7XG5cdFx0XHRcdFx0dGhyb3cgKG5ldyBFcnJvcigndGhzb2Ugc2hvdWxkIG1hdGNoJykpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmV4dE9ic2VydmVkRGltZW5zaW9uKys7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdJbmRleCA9IG5leHREeW5hbWljRGltZW5zaW9uO1xuXHRcdFx0XHRuZXh0RHluYW1pY0RpbWVuc2lvbisrO1xuXHRcdFx0fVxuXG5cdFx0XHRkeW5hbWljSW5kZXhlcy5wdXNoKG5ld0luZGV4KTtcblx0XHR9XG5cblx0XHRjb25mc1trXSA9IHtcblx0XHRcdGR5bmFtaWNJbmRleGVzLFxuXHRcdFx0dHJhbnNpdGlvbixcblx0XHRcdGRpbWVuc2lvbixcblx0XHRcdGNvdmFyaWFuY2UsXG5cdFx0XHRpbml0LFxuXHRcdH07XG5cdH0pO1xuXG5cdGNvbnN0IHRvdGFsRGltZW5zaW9uID0gZHluYW1pY05hbWVzLm1hcChrID0+IGNvbmZzW2tdLmRpbWVuc2lvbikucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG5cblx0aWYgKG5leHREeW5hbWljRGltZW5zaW9uICE9PSB0b3RhbERpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ21pc2NhbGN1bGF0aW9uIG9mIHRyYW5zaXRpb24nKSk7XG5cdH1cblxuXHRjb25zdCBpbml0ID0ge1xuXHRcdGluZGV4OiAtMSxcblx0XHRtZWFuOiBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLFxuXHRcdGNvdmFyaWFuY2U6IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKS5tYXAoKCkgPT4gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApKSxcblx0fTtcblx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0ZHluYW1pY0luZGV4ZXMsXG5cdFx0XHRpbml0OiBsb2NhbEluaXQsXG5cdFx0fSA9IGNvbmZzW2tdO1xuXHRcdGlmICh0eXBlb2YgKGxvY2FsSW5pdCkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdJbml0IGlzIG1hbmRhdG9yeScpO1xuXHRcdH1cblxuXHRcdGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4gZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzIsIGkyKSA9PiB7XG5cdFx0XHRpbml0LmNvdmFyaWFuY2VbYzFdW2MyXSA9IGxvY2FsSW5pdC5jb3ZhcmlhbmNlW2kxXVtpMl07XG5cdFx0fSkpO1xuXHRcdGR5bmFtaWNJbmRleGVzLmZvckVhY2goKGMxLCBpMSkgPT4ge1xuXHRcdFx0aW5pdC5tZWFuW2MxXSA9IGxvY2FsSW5pdC5tZWFuW2kxXTtcblx0XHR9KTtcblx0fSk7XG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uOiB0b3RhbERpbWVuc2lvbixcblx0XHRpbml0LFxuXHRcdHRyYW5zaXRpb24ob3B0aW9ucykge1xuXHRcdFx0Y29uc3Qge3ByZXZpb3VzQ29ycmVjdGVkfSA9IG9wdGlvbnM7XG5cdFx0XHRjb25zdCByZXN1bHRUcmFuc2l0aW9uID0gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKHVuZGVmaW5lZCkubWFwKCgpID0+IG5ldyBBcnJheSh0b3RhbERpbWVuc2lvbikuZmlsbCgwKSk7XG5cblx0XHRcdGR5bmFtaWNOYW1lcy5mb3JFYWNoKGsgPT4ge1xuXHRcdFx0XHRjb25zdCB7XG5cdFx0XHRcdFx0ZHluYW1pY0luZGV4ZXMsXG5cdFx0XHRcdFx0dHJhbnNpdGlvbixcblx0XHRcdFx0fSA9IGNvbmZzW2tdO1xuXG5cdFx0XHRcdGNvbnN0IG9wdGlvbnMyID0ge1xuXHRcdFx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQ6IHByZXZpb3VzQ29ycmVjdGVkLnN1YlN0YXRlKGR5bmFtaWNJbmRleGVzKSxcblx0XHRcdFx0fTtcblx0XHRcdFx0Y29uc3QgdHJhbnMgPSB0cmFuc2l0aW9uKG9wdGlvbnMyKTtcblx0XHRcdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcblx0XHRcdFx0XHRyZXN1bHRUcmFuc2l0aW9uW2MxXVtjMl0gPSB0cmFuc1tpMV1baTJdO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHRUcmFuc2l0aW9uO1xuXHRcdH0sXG5cdFx0Y292YXJpYW5jZShvcHRpb25zKSB7XG5cdFx0XHRjb25zdCB7cHJldmlvdXNDb3JyZWN0ZWR9ID0gb3B0aW9ucztcblx0XHRcdGNvbnN0IHJlc3VsdENvdmFyaWFuY2UgPSBuZXcgQXJyYXkodG90YWxEaW1lbnNpb24pLmZpbGwodW5kZWZpbmVkKS5tYXAoKCkgPT4gbmV3IEFycmF5KHRvdGFsRGltZW5zaW9uKS5maWxsKDApKTtcblxuXHRcdFx0ZHluYW1pY05hbWVzLmZvckVhY2goayA9PiB7XG5cdFx0XHRcdGNvbnN0IHtcblx0XHRcdFx0XHRkeW5hbWljSW5kZXhlcyxcblx0XHRcdFx0XHRjb3ZhcmlhbmNlLFxuXHRcdFx0XHR9ID0gY29uZnNba107XG5cblx0XHRcdFx0Y29uc3Qgb3B0aW9uczIgPSB7XG5cdFx0XHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdFx0XHRwcmV2aW91c0NvcnJlY3RlZDogcHJldmlvdXNDb3JyZWN0ZWQuc3ViU3RhdGUoZHluYW1pY0luZGV4ZXMpLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGNvbnN0IGNvdiA9IGNvdmFyaWFuY2Uob3B0aW9uczIpO1xuXHRcdFx0XHQvLyBDb25zb2xlLmxvZygnZHluYW1pYy5jb21wb3NpdGlvbicsaywgY292LCBkeW5hbWljSW5kZXhlcylcblx0XHRcdFx0ZHluYW1pY0luZGV4ZXMuZm9yRWFjaCgoYzEsIGkxKSA9PiBkeW5hbWljSW5kZXhlcy5mb3JFYWNoKChjMiwgaTIpID0+IHtcblx0XHRcdFx0XHRyZXN1bHRDb3ZhcmlhbmNlW2MxXVtjMl0gPSBjb3ZbaTFdW2kyXTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0Q292YXJpYW5jZTtcblx0XHR9LFxuXHR9O1xufVxuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbi8qKlxuKiBDcmVhdGVzIGEgZHluYW1pYyBtb2RlbCwgZm9sbG93aW5nIGNvbnN0YW50IGFjY2VsZXJhdGlvbiBtb2RlbCB3aXRoIHJlc3BlY3Qgd2l0aCB0aGUgZGltZW5zaW9ucyBwcm92aWRlZCBpbiB0aGUgb2JzZXJ2YXRpb24gcGFyYW1ldGVyc1xuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudEFjY2VsZXJhdGlvbihkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGxldCBkaW1lbnNpb247XG5cblx0aWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAzKSkge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDM7XG5cdH0gZWxzZSBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbiAqIDM7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignb2JzZXJ2ZWRQcm9qZWN0aW9uIG9yIHN0YXRlUHJvamVjdGlvbiBzaG91bGQgYmUgZGVmaW5lZCBpbiBvYnNlcnZhdGlvbiBpbiBvcmRlciB0byB1c2UgY29uc3RhbnQtc3BlZWQgZmlsdGVyJykpO1xuXHR9XG5cblx0Y29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDM7XG5cdC8vIFdlIGNvbnN0cnVjdCB0aGUgdHJhbnNpdGlvbiBhbmQgY292YXJpYW5jZSBtYXRyaWNlc1xuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcblx0XHR0cmFuc2l0aW9uW2ldW2kgKyBiYXNlRGltZW5zaW9uXSA9IHRpbWVTdGVwO1xuXHRcdHRyYW5zaXRpb25baV1baSArICgyICogYmFzZURpbWVuc2lvbildID0gMC41ICogKHRpbWVTdGVwICoqIDIpO1xuXHRcdHRyYW5zaXRpb25baSArIGJhc2VEaW1lbnNpb25dW2kgKyAoMiAqIGJhc2VEaW1lbnNpb24pXSA9IHRpbWVTdGVwO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSlcblx0XHQuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKVxuXHRcdC5jb25jYXQobmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwodGltZVN0ZXAgKiogNCkpO1xuXHRjb25zdCBjb3ZhcmlhbmNlID0gZHluYW1pYy5jb3ZhcmlhbmNlIHx8IGFycmF5Q292YXJpYW5jZTtcblx0cmV0dXJuIHtcblx0XHQuLi5keW5hbWljLCBkaW1lbnNpb24sIHRyYW5zaXRpb24sIGNvdmFyaWFuY2UsXG5cdH07XG59XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGNvbnN0YW50QWNjZWxlcmF0aW9uOyIsImltcG9ydCB7aWRlbnRpdHksIGRpYWd9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuXG5jb25zdCBodWdlID0gMWU2O1xuXG4vKipcbiogQ3JlYXRlcyBhIGR5bmFtaWMgbW9kZWwsIGNvbnNpZGVyaW5nIHRoZSBudWxsIGluIG9yZGVyIHRvIG1ha2UgdGhlIHByZWRpY3Rpb25zXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gc3RhdGljQ292YXJpYW5jZSBnZW5lcmF0ZWQgd2l0aCBtb3ZpbmcgYXZlcmFnZVxuKiBAcGFyYW0ge051bWJlcn0gb2JzZXJ2YXRpb25EaW1lbnNpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRQb3NpdGlvbldpdGhOdWxsKHtzdGF0aWNDb3ZhcmlhbmNlLCBvYnNEeW5hSW5kZXhlcywgaW5pdH0pIHtcblx0Y29uc3QgZGltZW5zaW9uID0gb2JzRHluYUluZGV4ZXMubGVuZ3RoO1xuXHRpbml0IHx8PSB7XG5cdFx0bWVhbjogbmV3IEFycmF5KG9ic0R5bmFJbmRleGVzLmxlbmd0aCkuZmlsbCgwKS5tYXAoKCkgPT4gWzBdKSxcblx0XHRjb3ZhcmlhbmNlOiBkaWFnKG5ldyBBcnJheShvYnNEeW5hSW5kZXhlcy5sZW5ndGgpLmZpbGwoaHVnZSkpLFxuXHRcdGluZGV4OiAtMSxcblx0fTtcblxuXHRpZiAoc3RhdGljQ292YXJpYW5jZSAmJiBzdGF0aWNDb3ZhcmlhbmNlLmxlbmd0aCAhPT0gZGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignc3RhdGljQ292YXJpYW5jZSBoYXMgd3Jvbmcgc2l6ZScpKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZGltZW5zaW9uLFxuXHRcdHRyYW5zaXRpb24oKSB7XG5cdFx0XHRyZXR1cm4gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0XHR9LFxuXHRcdGNvdmFyaWFuY2Uoe3ByZXZpb3VzQ29ycmVjdGVkLCBpbmRleH0pIHtcblx0XHRcdGNvbnN0IGRpZmZCZXR3ZWVuSW5kZXhlcyA9IGluZGV4IC0gcHJldmlvdXNDb3JyZWN0ZWQuaW5kZXg7XG5cdFx0XHRpZiAoc3RhdGljQ292YXJpYW5jZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RhdGljQ292YXJpYW5jZS5tYXAocm93ID0+IHJvdy5tYXAoZWxlbWVudCA9PiBlbGVtZW50ICogZGlmZkJldHdlZW5JbmRleGVzKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRcdH0sXG5cdFx0aW5pdCxcblx0fTtcbn1cbiIsImltcG9ydCB7aWRlbnRpdHl9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuLyoqXG4qIENyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgcG9zaXRpb24gbW9kZWwgd2l0aCByZXNwZWN0IHdpdGggdGhlIGRpbWVuc2lvbnMgcHJvdmlkZWQgaW4gdGhlIG9ic2VydmF0aW9uIHBhcmFtZXRlcnNcbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRQb3NpdGlvbihkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRsZXQge2RpbWVuc2lvbn0gPSBkeW5hbWljO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0bGV0IHtjb3ZhcmlhbmNlfSA9IGR5bmFtaWM7XG5cblx0aWYgKCFkeW5hbWljLmRpbWVuc2lvbikge1xuXHRcdGlmIChvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdFx0ZGltZW5zaW9uID0gb2JzZXJ2YXRpb25EaW1lbnNpb247XG5cdFx0fSBlbHNlIGlmIChvYnNlcnZlZFByb2plY3Rpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IG9ic2VydmVkUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZVByb2plY3Rpb24pIHtcblx0XHRcdGRpbWVuc2lvbiA9IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgdHJhbnNpdGlvbiA9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdGNvdmFyaWFuY2UgfHw9IGlkZW50aXR5KGRpbWVuc2lvbik7XG5cdHJldHVybiB7XG5cdFx0Li4uZHluYW1pYywgZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlLFxuXHR9O1xufVxuIiwiaW1wb3J0IHtkaWFnfSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuLi9zdGF0ZSc7XG5cbi8qKlxuKiBDcmVhdGVzIGEgZHluYW1pYyBtb2RlbCwgY29uc2lkZXJpbmcgdGhlIG51bGwgaW4gb3JkZXIgdG8gbWFrZSB0aGUgcHJlZGljdGlvbnNcbiogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiogQHJldHVybnMge0R5bmFtaWNDb25maWd9XG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRTcGVlZER5bmFtaWMoYXJnczoge3N0YXRpY0NvdmFyaWFuY2U6IG51bWJlcltdLCBhdlNwZWVkOiBudW1iZXJbXSwgY2VudGVyOiBudW1iZXJbXX0sIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHtzdGF0aWNDb3ZhcmlhbmNlLCBhdlNwZWVkLCBjZW50ZXJ9ID0gYXJncztcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5vYnNlcnZlZFByb2plY3Rpb25bMF0ubGVuZ3RoO1xuXG5cdGNvbnN0IGRpbWVuc2lvbiA9IDIgKiBvYnNlcnZhdGlvbkRpbWVuc2lvbjtcblxuXHRpZiAoKGNlbnRlcikgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdDZW50ZXIgbXVzdCBiZSBkZWZpbmVkJykpO1xuXHR9XG5cblx0aWYgKGNlbnRlci5sZW5ndGggIT09IG9ic2VydmF0aW9uRGltZW5zaW9uKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYENlbnRlciBzaXplIHNob3VsZCBiZSAke29ic2VydmF0aW9uRGltZW5zaW9ufWApKTtcblx0fVxuXG5cdGlmIChhdlNwZWVkLmxlbmd0aCAhPT0gb2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgYXZTcGVlZCBzaXplIHNob3VsZCBiZSAke29ic2VydmF0aW9uRGltZW5zaW9ufWApKTtcblx0fVxuXG5cdGNvbnN0IGluaXRDb3YgPSBkaWFnKGNlbnRlci5tYXAoYyA9PiBjICogYyAvIDMpLmNvbmNhdChhdlNwZWVkLm1hcChjID0+IGMgKiBjIC8gMykpKTtcblxuXHRjb25zdCBpbml0ID0ge1xuXHRcdG1lYW46IGNlbnRlci5tYXAoYyA9PiBbY10pLmNvbmNhdChjZW50ZXIubWFwKCgpID0+IFswXSkpLFxuXHRcdGNvdmFyaWFuY2U6IGluaXRDb3YsXG5cdFx0aW5kZXg6IC0xLFxuXHR9O1xuXG5cdGNvbnN0IHRyYW5zaXRpb24gPSAoYXJnczoge2dldFRpbWU6IChpbmRleDogbnVtYmVyKSA9PiBudW1iZXIsIGluZGV4OiBudW1iZXIsIHByZXZpb3VzQ29ycmVjdGVkOiBTdGF0ZX0pID0+IHtcblx0XHRjb25zdCB7Z2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkfSA9IGFyZ3M7XG5cdFx0Y29uc3QgZFQgPSBnZXRUaW1lKGluZGV4KSAtIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpO1xuXHRcdGlmICh0eXBlb2YgKGRUKSAhPT0gJ251bWJlcicgfHwgTnVtYmVyLmlzTmFOKGRUKSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYGRUICgke2RUfSkgc2hvdWxkIGJlIGEgbnVtYmVyYCkpO1xuXHRcdH1cblx0XHQvLyBFeGFtcGxlIGlzIDpcblx0XHQvLyBbXG5cdFx0Ly8gXHRbMSwgMCwgZFQsIDBdLFxuXHRcdC8vIFx0WzAsIDEsIDAsIGRUXSxcblx0XHQvLyBcdFswLCAwLCAxLCAwXSxcblx0XHQvLyBcdFswLCAwLCAwLCAxXVxuXHRcdC8vIF07XG5cdFx0Ly8gY29uc3RhbnQgc3BlZWQgdXN1YWwgbWF0cml4XG5cblx0XHQvLyBjcmVhdGUgaWRlbnRpdHkgbWF0cml4XG5cdFx0Y29uc3QgbWF0ID0gZGlhZyhjZW50ZXIubWFwKCgpID0+IDEpLmNvbmNhdChjZW50ZXIubWFwKCgpID0+IDEpKSk7XG5cdFx0Ly8gVGhlbiBhZGQgZFRcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmF0aW9uRGltZW5zaW9uOyBpKyspIHtcblx0XHRcdG1hdFtpXVtvYnNlcnZhdGlvbkRpbWVuc2lvbiArIGldID0gZFQ7XG5cdFx0fVxuXG5cdFx0aWYgKE51bWJlci5pc05hTihtYXRbMF1bMl0pKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignbmFuIG1hdCcpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0O1xuXHR9O1xuXG5cdGNvbnN0IGNvdmFyaWFuY2UgPSAoYXJnczoge2luZGV4OiBudW1iZXIsIHByZXZpb3VzQ29ycmVjdGVkOiBTdGF0ZSwgZ2V0VGltZTogKGluZGV4OiBudW1iZXIpID0+IG51bWJlcn0pID0+IHtcblx0XHRjb25zdCB7aW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkLCBnZXRUaW1lfSA9IGFyZ3M7XG5cdFx0Y29uc3QgZFQgPSBnZXRUaW1lKGluZGV4KSAtIGdldFRpbWUocHJldmlvdXNDb3JyZWN0ZWQuaW5kZXgpO1xuXG5cdFx0aWYgKHR5cGVvZiAoZFQpICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYGRUICgke2RUfSkgc2hvdWxkIGJlIGEgbnVtYmVyYCkpO1xuXHRcdH1cblxuXHRcdC8vIFN0YXRlIGlzICh4LCB5LCB2eCwgdnkpXG5cdFx0Y29uc3Qgc3FydCA9IE1hdGguc3FydChkVCk7XG5cdFx0aWYgKE51bWJlci5pc05hTihzcXJ0KSkge1xuXHRcdFx0Y29uc29sZS5sb2coe2xhc3RQcmV2aW91c0luZGV4OiBwcmV2aW91c0NvcnJlY3RlZC5pbmRleCwgaW5kZXh9KTtcblx0XHRcdGNvbnNvbGUubG9nKGRULCBwcmV2aW91c0NvcnJlY3RlZC5pbmRleCwgaW5kZXgsIGdldFRpbWUoaW5kZXgpLCBnZXRUaW1lKHByZXZpb3VzQ29ycmVjdGVkLmluZGV4KSk7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKCdTcXJ0KGRUKSBpcyBOYU4nKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpYWcoc3RhdGljQ292YXJpYW5jZS5tYXAodiA9PiB2ICogc3FydCkpO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0aW5pdCxcblx0XHRkaW1lbnNpb24sXG5cdFx0dHJhbnNpdGlvbixcblx0XHRjb3ZhcmlhbmNlLFxuXHR9O1xufVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50U3BlZWREeW5hbWljO1xuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbi8qKlxuKkNyZWF0ZXMgYSBkeW5hbWljIG1vZGVsLCBmb2xsb3dpbmcgY29uc3RhbnQgcG9zaXRpb24gbW9kZWwgd2l0aCByZXNwZWN0IHdpdGggdGhlIGRpbWVuc2lvbnMgcHJvdmlkZWQgaW4gdGhlIG9ic2VydmF0aW9uIHBhcmFtZXRlcnNcbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRTcGVlZChkeW5hbWljLCBvYnNlcnZhdGlvbikge1xuXHRjb25zdCB0aW1lU3RlcCA9IGR5bmFtaWMudGltZVN0ZXAgfHwgMTtcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qgb2JzZXJ2YXRpb25EaW1lbnNpb24gPSBvYnNlcnZhdGlvbi5kaW1lbnNpb247XG5cdGxldCBkaW1lbnNpb247XG5cblx0aWYgKHN0YXRlUHJvamVjdGlvbiAmJiBOdW1iZXIuaXNJbnRlZ2VyKHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGggLyAyKSkge1xuXHRcdGRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLnN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cdH0gZWxzZSBpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uKSB7XG5cdFx0ZGltZW5zaW9uID0gb2JzZXJ2ZWRQcm9qZWN0aW9uWzBdLmxlbmd0aCAqIDI7XG5cdH0gZWxzZSBpZiAob2JzZXJ2YXRpb25EaW1lbnNpb24pIHtcblx0XHRkaW1lbnNpb24gPSBvYnNlcnZhdGlvbkRpbWVuc2lvbiAqIDI7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignb2JzZXJ2ZWRQcm9qZWN0aW9uIG9yIHN0YXRlUHJvamVjdGlvbiBzaG91bGQgYmUgZGVmaW5lZCBpbiBvYnNlcnZhdGlvbiBpbiBvcmRlciB0byB1c2UgY29uc3RhbnQtc3BlZWQgZmlsdGVyJykpO1xuXHR9XG5cblx0Y29uc3QgYmFzZURpbWVuc2lvbiA9IGRpbWVuc2lvbiAvIDI7XG5cdC8vIFdlIGNvbnN0cnVjdCB0aGUgdHJhbnNpdGlvbiBhbmQgY292YXJpYW5jZSBtYXRyaWNlc1xuXHRjb25zdCB0cmFuc2l0aW9uID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlRGltZW5zaW9uOyBpKyspIHtcblx0XHR0cmFuc2l0aW9uW2ldW2kgKyBiYXNlRGltZW5zaW9uXSA9IHRpbWVTdGVwO1xuXHR9XG5cblx0Y29uc3QgYXJyYXlDb3ZhcmlhbmNlID0gbmV3IEFycmF5KGJhc2VEaW1lbnNpb24pLmZpbGwoMSkuY29uY2F0KG5ldyBBcnJheShiYXNlRGltZW5zaW9uKS5maWxsKHRpbWVTdGVwICogdGltZVN0ZXApKTtcblx0Y29uc3QgY292YXJpYW5jZSA9IGR5bmFtaWMuY292YXJpYW5jZSB8fCBhcnJheUNvdmFyaWFuY2U7XG5cdHJldHVybiB7XG5cdFx0Li4uZHluYW1pYywgZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlLFxuXHR9O1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGNvbnN0YW50UG9zaXRpb259IGZyb20gJy4vY29uc3RhbnQtcG9zaXRpb24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvbnN0YW50U3BlZWR9IGZyb20gJy4vY29uc3RhbnQtc3BlZWQnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvbnN0YW50QWNjZWxlcmF0aW9ufSBmcm9tICcuL2NvbnN0YW50LWFjY2VsZXJhdGlvbic7XG5leHBvcnQge2RlZmF1bHQgYXMgY29tcG9zaXRpb259IGZyb20gJy4vY29tcG9zaXRpb24nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvbnN0YW50UG9zaXRpb25XaXRoTnVsbH0gZnJvbSAnLi9jb25zdGFudC1wb3NpdGlvbi13aXRoLW51bGwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGNvbnN0YW50U3BlZWREeW5hbWljfSBmcm9tICcuL2NvbnN0YW50LXNwZWVkLWR5bmFtaWMnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNob3J0dGVybUNvbnN0YW50U3BlZWR9IGZyb20gJy4vc2hvcnR0ZXJtLWNvbnN0YW50LXNwZWVkJztcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSB7XG4vLyBcdCdjb25zdGFudC1wb3NpdGlvbic6IHJlcXVpcmUoJy4vY29uc3RhbnQtcG9zaXRpb24uanMnKSxcbi8vIFx0J2NvbnN0YW50LXNwZWVkJzogcmVxdWlyZSgnLi9jb25zdGFudC1zcGVlZC5qcycpLFxuLy8gXHQnY29uc3RhbnQtYWNjZWxlcmF0aW9uJzogcmVxdWlyZSgnLi9jb25zdGFudC1hY2NlbGVyYXRpb24uanMnKSxcbi8vIFx0Y29tcG9zaXRpb246IHJlcXVpcmUoJy4vY29tcG9zaXRpb24uanMnKSxcbi8vIFx0J2NvbnN0YW50LXBvc2l0aW9uLXdpdGgtbnVsbCc6IHJlcXVpcmUoJy4vY29uc3RhbnQtcG9zaXRpb24td2l0aC1udWxsLmpzJyksXG4vLyBcdCdjb25zdGFudC1zcGVlZC13aXRoLW51bGwnOiByZXF1aXJlKCcuL2NvbnN0YW50LXNwZWVkLXdpdGgtbnVsbC5qcycpLFxuLy8gXHQnY29uc3RhbnQtc3BlZWQtZHluYW1pYyc6IHJlcXVpcmUoJy4vY29uc3RhbnQtc3BlZWQtZHluYW1pYy5qcycpLFxuLy8gXHQnc2hvcnR0ZXJtLWNvbnN0YW50LXNwZWVkJzogcmVxdWlyZSgnLi9zaG9ydHRlcm0tY29uc3RhbnQtc3BlZWQuanMnKSxcbi8vIH07XG4vLyIsImltcG9ydCB7ZWxlbVdpc2UsIGRpYWd9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuaW1wb3J0IGNvbnN0YW50U3BlZWREeW5hbWljIGZyb20gJy4vY29uc3RhbnQtc3BlZWQtZHluYW1pYyc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi4vc3RhdGUnO1xuXG5jb25zdCBzYWZlRGl2ID0gZnVuY3Rpb24gKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcblx0aWYgKGEgPT09IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXHRpZiAoYiA9PT0gMCkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cdHJldHVybiBhIC8gYjtcbn07XG5cbi8qKlxuKiBUaGlzIG1vZGVsIGlzIGJhc2VkIG9uIHRoZSBjb25zdGFudCBzcGVlZCBtb2RlbFxuKiBUaGUgY29uc3RhbnQgc3BlZWQgbW9kZWwgY3JlYXRlcyBwcm9ibGVtcyB3aGVuIGRUID4+IGZwcyAodGhlIHRyYWNrIGlzIGxvc3QpXG4qIHRoZW4gdGhlIGV4cGVjdGVkIHBvc2l0aW9uIGNhbiBiZSB2ZXJ5IGZhciBmcm9tIHRoZSBjZW50ZXIgb2YgdGhlIGZpZWxkXG4qIHRvIHNvbHZlIHRoYXQsIHdlIHVzZSBhIG1vZGVsIHdpdGggMiBtb3JlIGhpZGRlbiB2YXJpYWJsZSB0aGF0IGFyZSBhbHdheXMgY2VudGVyIG9mIHRoZSBmaWVsZFxuKiBXaGVuIGRUIDw8IHR5cGljYWxUaW1lIHRoZSBtb2RlbCBhY3RzIGV4YWN0bHkgYXMgYSBjb25zdGFudCBzcGVlZCBtb2RlbFxuKiBXaGVuIGRUID4+IHR5cGljYWxUaW1lIHRoZSBtb2RlbCBpcyBhIGNvbnN0YW50IFt4LHldID0gY2VudGVyIG1vZGVsLCBzaWdtYSA9IGRlZmF1bHRWYXJpYW5jZVxuKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudHlwaWNhbFRpbWU9MTBdXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cbi8vIHt0eXBpY2FsVGltZXM6IGFueSwgc3RhdGljQ292YXJpYW5jZTogYW55LCBhdlNwZWVkLCBjZW50ZXI6IGFueTogYW55fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvcnR0ZXJtQ29uc3RhbnRTcGVlZChvcHRpb25zOiBhbnksIG9ic2VydmF0aW9uKSB7XG5cdGNvbnN0IHt0eXBpY2FsVGltZXN9ID0gb3B0aW9ucztcblxuXHRpZiAoIUFycmF5LmlzQXJyYXkodHlwaWNhbFRpbWVzKSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCd0eXBpY2FsVGltZXMgbXVzdCBiZSBkZWZpbmVkJykpO1xuXHR9XG5cblx0Y29uc3QgY29uc3RhbnRTcGVlZCA9IGNvbnN0YW50U3BlZWREeW5hbWljKG9wdGlvbnMsIG9ic2VydmF0aW9uKTtcblx0Y29uc3Qge2RpbWVuc2lvbiwgaW5pdH0gPSBjb25zdGFudFNwZWVkO1xuXG5cdGlmICh0eXBpY2FsVGltZXMubGVuZ3RoICE9PSBkaW1lbnNpb24pIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihgdHlwaWNhbFRpbWVzICgke3R5cGljYWxUaW1lcy5sZW5ndGh9KSBsZW5ndGggaXMgbm90IGFzIGV4cGVjdGVkICgke2RpbWVuc2lvbn0pYCkpO1xuXHR9XG5cblx0Y29uc3QgbWl4TWF0cml4ID0gZnVuY3Rpb24gKHtcblx0XHRyYXRpb3MsXG5cdFx0YU1hdCxcblx0XHRiTWF0LFxuXHR9KSB7XG5cdFx0cmV0dXJuIGVsZW1XaXNlKFthTWF0LCBiTWF0XSwgKFttLCBkXSwgcm93SW5kZXgsIGNvbEluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCByYXRpbyA9IHJvd0luZGV4ID09PSBjb2xJbmRleCA/IHJhdGlvc1tyb3dJbmRleF0gOiAocmF0aW9zW3Jvd0luZGV4XSArIHJhdGlvc1tjb2xJbmRleF0pIC8gMjtcblxuXHRcdFx0cmV0dXJuIChyYXRpbyAqIG0pICsgKCgxIC0gcmF0aW8pICogZCk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRkaW1lbnNpb24sXG5cdFx0aW5pdCxcblx0XHR0cmFuc2l0aW9uKG9wdGlvbnM6IHtnZXRUaW1lOiAoaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyLCBpbmRleDogbnVtYmVyLCBwcmV2aW91c0NvcnJlY3RlZDogU3RhdGV9KSB7XG5cdFx0XHRjb25zdCBhTWF0ID0gY29uc3RhbnRTcGVlZC50cmFuc2l0aW9uKG9wdGlvbnMpO1xuXG5cdFx0XHRjb25zdCB7Z2V0VGltZSwgaW5kZXgsIHByZXZpb3VzQ29ycmVjdGVkfSA9IG9wdGlvbnM7XG5cdFx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cblx0XHRcdGNvbnN0IHJhdGlvcyA9IHR5cGljYWxUaW1lcy5tYXAodCA9PiBNYXRoLmV4cCgtMSAqIGRUIC8gdCkpO1xuXG5cdFx0XHQvLyAnYmFjayB0byBpbml0JyBtYXRyaXhcblx0XHRcdGNvbnN0IGJNYXQgPSBkaWFnKFxuXHRcdFx0XHRlbGVtV2lzZShbaW5pdC5tZWFuLCBwcmV2aW91c0NvcnJlY3RlZC5tZWFuXSwgKFttLCBkXSkgPT4gc2FmZURpdihtLCBkKSlcblx0XHRcdFx0Ly8gRmxhdHRlbiBjYXVzZSB0aGlzIGlzIGEgTngxIG1hdHJpeCAtPiBOIGFycmF5XG5cdFx0XHRcdFx0LnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpLFxuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIG1peE1hdHJpeCh7cmF0aW9zLCBhTWF0LCBiTWF0fSk7XG5cdFx0fSxcblx0XHRjb3ZhcmlhbmNlKG9wdGlvbnM6IHtnZXRUaW1lOiAoaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyLCBpbmRleDogbnVtYmVyLCBwcmV2aW91c0NvcnJlY3RlZDogU3RhdGV9LCBvYnNlcnZhdGlvbikge1xuXHRcdFx0Y29uc3Qge2dldFRpbWUsIGluZGV4LCBwcmV2aW91c0NvcnJlY3RlZH0gPSBvcHRpb25zO1xuXG5cdFx0XHRjb25zdCBkVCA9IGdldFRpbWUoaW5kZXgpIC0gZ2V0VGltZShwcmV2aW91c0NvcnJlY3RlZC5pbmRleCk7XG5cdFx0XHQvLyBTdGF0ZSBpcyAoeCwgeSwgdngsIHZ5KVxuXHRcdFx0Y29uc3QgcmF0aW9zID0gdHlwaWNhbFRpbWVzLm1hcCh0ID0+IE1hdGguZXhwKC0xICogZFQgLyB0KSk7XG5cdFx0XHRjb25zdCBhTWF0ID0gY29uc3RhbnRTcGVlZC5jb3ZhcmlhbmNlKG9wdGlvbnMvKiwgb2JzZXJ2YXRpb24qLyApO1xuXHRcdFx0cmV0dXJuIG1peE1hdHJpeCh7cmF0aW9zLCBhTWF0LCBiTWF0OiBpbml0LmNvdmFyaWFuY2V9KTtcblx0XHR9LFxuXHR9O1xufVxuIiwiXG5pbXBvcnQge2Zyb2Jlbml1cyBhcyBkaXN0YW5jZU1hdH0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgYXJyYXlUb01hdHJpeCBmcm9tICcuLi9saWIvdXRpbHMvYXJyYXktdG8tbWF0cml4JztcbmltcG9ydCBzZXREaW1lbnNpb25zIGZyb20gJy4uL2xpYi9zZXR1cC9zZXQtZGltZW5zaW9ucyc7XG5pbXBvcnQgY2hlY2tEaW1lbnNpb25zIGZyb20gJy4uL2xpYi9zZXR1cC9jaGVjay1kaW1lbnNpb25zJztcbmltcG9ydCBidWlsZFN0YXRlUHJvamVjdGlvbiBmcm9tICcuLi9saWIvc2V0dXAvYnVpbGQtc3RhdGUtcHJvamVjdGlvbic7XG5pbXBvcnQgZXh0ZW5kRHluYW1pY0luaXQgZnJvbSAnLi4vbGliL3NldHVwL2V4dGVuZC1keW5hbWljLWluaXQnO1xuaW1wb3J0IHRvRnVuY3Rpb24gZnJvbSAnLi4vbGliL3V0aWxzL3RvLWZ1bmN0aW9uJztcbmltcG9ydCBkZWVwQXNzaWduIGZyb20gJy4uL2xpYi91dGlscy9kZWVwLWFzc2lnbic7XG5pbXBvcnQgcG9seW1vcnBoTWF0cml4IGZyb20gJy4uL2xpYi91dGlscy9wb2x5bW9ycGgtbWF0cml4JztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCAqIGFzIG1vZGVsQ29sbGVjdGlvbiBmcm9tICcuL21vZGVsLWNvbGxlY3Rpb24nO1xuaW1wb3J0IENvcmVLYWxtYW5GaWx0ZXIgZnJvbSAnLi9jb3JlLWthbG1hbi1maWx0ZXInO1xuaW1wb3J0IHtcblx0RHluYW1pY0NvbmZpZywgT2JzZXJ2YXRpb25Db25maWcsIE9ic2VydmF0aW9uT2JqZWN0Q29uZmlnLCBXaW5zdG9uTG9nZ2VyLFxufSBmcm9tICcuL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcbmltcG9ydCBUeXBlQXNzZXJ0IGZyb20gJy4vdHlwZXMvVHlwZUFzc2VydCc7XG5cbi8qKlxuICogQHR5cGVkZWYge1N0cmluZ30gRHluYW1pY05vbk9iamVjdENvbmZpZ1xuICovXG4vKipcbiAqIEB0eXBlZGVmIHtEeW5hbWljQ29uZmlnfSBEeW5hbWljT2JqZWN0Q29uZmlnXG4gKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZVxuICovXG4vKipcbiAqIEBwYXJhbSB7RHluYW1pY05vbk9iamVjdENvbmZpZ30gZHluYW1pY1xuICogQHJldHVybnMge0R5bmFtaWNPYmplY3RDb25maWd9XG4gKi9cblxuY29uc3QgYnVpbGREZWZhdWx0RHluYW1pYyA9IGZ1bmN0aW9uIChkeW5hbWljKToge25hbWU6IHN0cmluZ30ge1xuXHRpZiAodHlwZW9mIChkeW5hbWljKSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4ge25hbWU6IGR5bmFtaWN9O1xuXHR9XG5cblx0cmV0dXJuIHtuYW1lOiAnY29uc3RhbnQtcG9zaXRpb24nfTtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge1N0cmluZyB8IE51bWJlcn0gT2JzZXJ2YXRpb25Ob25PYmplY3RDb25maWdcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7T2JzZXJ2YXRpb25Db25maWd9IE9ic2VydmF0aW9uT2JqZWN0Q29uZmlnXG4gKiBAcHJvcGVydHkge1N0cmluZ30gbmFtZVxuICovXG4vKipcbiAqIEBwYXJhbSB7T2JzZXJ2YXRpb25Ob25PYmplY3RDb25maWd9IG9ic2VydmF0aW9uXG4gKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25PYmplY3RDb25maWd9XG4gKi9cbmNvbnN0IGJ1aWxkRGVmYXVsdE9ic2VydmF0aW9uID0gZnVuY3Rpb24gKG9ic2VydmF0aW9uKTogT2JzZXJ2YXRpb25PYmplY3RDb25maWcge1xuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiAnc2Vuc29yJywgc2Vuc29yRGltZW5zaW9uOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHtuYW1lOiBvYnNlcnZhdGlvbn07XG5cdH1cblxuXHRyZXR1cm4ge25hbWU6ICdzZW5zb3InfTtcbn07XG4vKipcbipUaGlzIGZ1bmN0aW9uIGZpbGxzIHRoZSBnaXZlbiBvcHRpb25zIGJ5IHN1Y2Nlc3NpdmVseSBjaGVja2luZyBpZiBpdCB1c2VzIGEgcmVnaXN0ZXJlZCBtb2RlbCxcbiogaXQgYnVpbGRzIGFuZCBjaGVja3MgdGhlIGR5bmFtaWMgYW5kIG9ic2VydmF0aW9uIGRpbWVuc2lvbnMsIGJ1aWxkIHRoZSBzdGF0ZVByb2plY3Rpb24gaWYgb25seSBvYnNlcnZlZFByb2plY3Rpb25cbippcyBnaXZlbiwgYW5kIGluaXRpYWxpemUgZHluYW1pYy5pbml0XG4qQHBhcmFtIHtEeW5hbWljT2JqZWN0Q29uZmlnIHwgRHluYW1pY05vbk9iamVjdENvbmZpZ30gb3B0aW9ucy5keW5hbWljXG4qQHBhcmFtIHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZyB8IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvcHRpb25zLm9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfVxuKi9cblxuY29uc3Qgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKGFyZ3M6IHtcblx0b2JzZXJ2YXRpb24/OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsIHwgT2JzZXJ2YXRpb25PYmplY3RDb25maWcsIC8vIE9ic2VydmF0aW9uQ29uZmlnXG5cdGR5bmFtaWM/OiBhbnlcbn0pIHtcblx0bGV0IHtvYnNlcnZhdGlvbiwgZHluYW1pY30gPSBhcmdzO1xuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbikgIT09ICdvYmplY3QnIHx8IG9ic2VydmF0aW9uID09PSBudWxsKSB7XG5cdFx0b2JzZXJ2YXRpb24gPSBidWlsZERlZmF1bHRPYnNlcnZhdGlvbihvYnNlcnZhdGlvbik7XG5cdH1cblxuXHRpZiAodHlwZW9mIChkeW5hbWljKSAhPT0gJ29iamVjdCcgfHwgZHluYW1pYyA9PT0gbnVsbCkge1xuXHRcdGR5bmFtaWMgPSBidWlsZERlZmF1bHREeW5hbWljKGR5bmFtaWMvKiwgb2JzZXJ2YXRpb24qLyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIChvYnNlcnZhdGlvbi5uYW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHRvYnNlcnZhdGlvbiA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGR5bmFtaWMubmFtZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0ZHluYW1pYyA9IG1vZGVsQ29sbGVjdGlvbi5idWlsZER5bmFtaWMoZHluYW1pYywgb2JzZXJ2YXRpb24pO1xuXHR9XG5cblx0Y29uc3Qgd2l0aERpbWVuc2lvbk9wdGlvbnMgPSBzZXREaW1lbnNpb25zKHtvYnNlcnZhdGlvbiwgZHluYW1pY30pO1xuXHRjb25zdCBjaGVja2VkRGltZW5zaW9uT3B0aW9ucyA9IGNoZWNrRGltZW5zaW9ucyh3aXRoRGltZW5zaW9uT3B0aW9ucyk7XG5cdGNvbnN0IGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyA9IGJ1aWxkU3RhdGVQcm9qZWN0aW9uKGNoZWNrZWREaW1lbnNpb25PcHRpb25zKTtcblx0cmV0dXJuIGV4dGVuZER5bmFtaWNJbml0KGJ1aWxkU3RhdGVQcm9qZWN0aW9uT3B0aW9ucyk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsc1BhcmFtZXRlcnMge1xuXHRkeW5hbWljOiBEeW5hbWljQ29uZmlnO1xuXHRvYnNlcnZhdGlvbjogT2JzZXJ2YXRpb25Db25maWc7Ly8gT2JzZXJ2YXRpb25PYmplY3RDb25maWcgJiB7c3RhdGVQcm9qZWN0aW9uOiBhbnk7IGNvdmFyaWFuY2U6IGFueX07XG59XG5cbi8qKlxuKiBSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIHdpdGhvdXQgYXJyYXlzIGFzIHZhbHVlcyBidXQgb25seSBmdW5jdGlvbnNcbiogQHBhcmFtIHtNb2RlbHNQYXJhbWV0ZXJzfSBtb2RlbFRvQmVDaGFuZ2VkXG4qIEByZXR1cm5zIHtDb3JlQ29uZmlnfSBtb2RlbCB3aXRoIHJlc3BlY3Qgb2YgdGhlIENvcmUgS2FsbWFuIEZpbHRlciBwcm9wZXJ0aWVzXG4qL1xuY29uc3QgbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnMgPSBmdW5jdGlvbiAobW9kZWxUb0JlQ2hhbmdlZDogTW9kZWxzUGFyYW1ldGVycykge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gbW9kZWxUb0JlQ2hhbmdlZDtcblx0VHlwZUFzc2VydC5hc3NlcnROb3RBcnJheShvYnNlcnZhdGlvbiwgJ21vZGVsc1BhcmFtZXRlcnNUb0NvcmVPcHRpb25zOiBvYnNlcnZhdGlvbicpO1xuXHQvLyBUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRChvYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9uczogb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uJyk7XG5cdC8vIFR5cGVBc3NlcnQuYXNzZXJ0SXNBcnJheTJEKG9ic2VydmF0aW9uLmNvdmFyaWFuY2UsICdtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9uczogb2JzZXJ2YXRpb24uY292YXJpYW5jZScpO1xuXHQvLyBUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRChkeW5hbWljLnRyYW5zaXRpb24sICdtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9uczogZHluYW1pYy50cmFuc2l0aW9uJyk7XG5cdC8vIFR5cGVBc3NlcnQuYXNzZXJ0SXNOdW1iZXJzQXJyYXkoZHluYW1pYy5jb3ZhcmlhbmNlLCAnbW9kZWxzUGFyYW1ldGVyc1RvQ29yZU9wdGlvbnM6IGR5bmFtaWMuY292YXJpYW5jZScpO1xuXHRyZXR1cm4gZGVlcEFzc2lnbihtb2RlbFRvQmVDaGFuZ2VkLCB7XG5cdFx0b2JzZXJ2YXRpb246IHtcblx0XHRcdHN0YXRlUHJvamVjdGlvbjogdG9GdW5jdGlvbihwb2x5bW9ycGhNYXRyaXgob2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uKSwge2xhYmVsOiAnb2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uJ30pLFxuXHRcdFx0Y292YXJpYW5jZTogdG9GdW5jdGlvbihwb2x5bW9ycGhNYXRyaXgob2JzZXJ2YXRpb24uY292YXJpYW5jZSwge2RpbWVuc2lvbjogb2JzZXJ2YXRpb24uZGltZW5zaW9ufSksIHtsYWJlbDogJ29ic2VydmF0aW9uLmNvdmFyaWFuY2UnfSksXG5cdFx0fSxcblx0XHRkeW5hbWljOiB7XG5cdFx0XHR0cmFuc2l0aW9uOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChkeW5hbWljLnRyYW5zaXRpb24pLCB7bGFiZWw6ICdkeW5hbWljLnRyYW5zaXRpb24nfSksXG5cdFx0XHRjb3ZhcmlhbmNlOiB0b0Z1bmN0aW9uKHBvbHltb3JwaE1hdHJpeChkeW5hbWljLmNvdmFyaWFuY2UsIHtkaW1lbnNpb246IGR5bmFtaWMuZGltZW5zaW9ufSksIHtsYWJlbDogJ2R5bmFtaWMuY292YXJpYW5jZSd9KSxcblx0XHR9LFxuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEthbG1hbkZpbHRlciBleHRlbmRzIENvcmVLYWxtYW5GaWx0ZXIge1xuXHQvKipcblx0KiBAdHlwZWRlZiB7T2JqZWN0fSBDb25maWdcblx0KiBAcHJvcGVydHkge0R5bmFtaWNPYmplY3RDb25maWcgfCBEeW5hbWljTm9uT2JqZWN0Q29uZmlnfSBkeW5hbWljXG5cdCogQHByb3BlcnR5IHtPYnNlcnZhdGlvbk9iamVjdENvbmZpZyB8IE9ic2VydmF0aW9uTm9uT2JqZWN0Q29uZmlnfSBvYnNlcnZhdGlvblxuXHQqL1xuXHQvKipcblx0KiBAcGFyYW0ge0NvbmZpZ30gb3B0aW9uc1xuXHQqL1xuXHQvLyBjb25zdHJ1Y3RvcihvcHRpb25zOiB7b2JzZXJ2YXRpb24/OiBPYnNlcnZhdGlvbkNvbmZpZywgZHluYW1pYz86IER5bmFtaWNDb25maWcsIGxvZ2dlcj86IFdpbnN0b25Mb2dnZXJ9ID0ge30pIHtcblx0Y29uc3RydWN0b3Iob3B0aW9uczoge29ic2VydmF0aW9uPzogYW55IHwge25hbWU6IHN0cmluZ30sIGR5bmFtaWM/OiBhbnkgfCB7bmFtZTogc3RyaW5nfSwgbG9nZ2VyPzogV2luc3RvbkxvZ2dlcn0gPSB7fSkge1xuXHRcdGNvbnN0IG1vZGVsc1BhcmFtZXRlcnMgPSBzZXR1cE1vZGVsc1BhcmFtZXRlcnMob3B0aW9ucyk7XG5cdFx0Y29uc3QgY29yZU9wdGlvbnMgPSBtb2RlbHNQYXJhbWV0ZXJzVG9Db3JlT3B0aW9ucyhtb2RlbHNQYXJhbWV0ZXJzKTtcblxuXHRcdHN1cGVyKHsuLi5vcHRpb25zLCAuLi5jb3JlT3B0aW9uc30pO1xuXHR9XG5cdC8vIHByZXZpb3VzQ29ycmVjdGVkPzogU3RhdGUsIGluZGV4PzogbnVtYmVyLFxuXHRjb3JyZWN0KG9wdGlvbnM6IHtwcmVkaWN0ZWQ6IFN0YXRlLCBvYnNlcnZhdGlvbjogbnVtYmVyW10gfCBudW1iZXJbXVtdfSk6IFN0YXRlIHtcblx0XHRjb25zdCBjb3JlT2JzZXJ2YXRpb24gPSBhcnJheVRvTWF0cml4KHtvYnNlcnZhdGlvbjogb3B0aW9ucy5vYnNlcnZhdGlvbiwgZGltZW5zaW9uOiB0aGlzLm9ic2VydmF0aW9uLmRpbWVuc2lvbn0pO1xuXHRcdHJldHVybiBzdXBlci5jb3JyZWN0KHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRvYnNlcnZhdGlvbjogY29yZU9ic2VydmF0aW9uLFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCogUGVyZm9ybXMgdGhlIHByZWRpY3Rpb24gYW5kIHRoZSBjb3JyZWN0aW9uIHN0ZXBzXG5cdCogQHBhcmFtIHtTdGF0ZX0gcHJldmlvdXNDb3JyZWN0ZWRcblx0KiBAcGFyYW0gezxBcnJheS48TnVtYmVyPj59IG9ic2VydmF0aW9uXG5cdCogQHJldHVybnMge0FycmF5LjxOdW1iZXI+fSB0aGUgbWVhbiBvZiB0aGUgY29ycmVjdGlvbnNcblx0Ki9cblx0ZmlsdGVyKG9wdGlvbnM6IHtwcmV2aW91c0NvcnJlY3RlZD86IFN0YXRlLCBpbmRleD86IG51bWJlciwgb2JzZXJ2YXRpb246IG51bWJlcltdIHwgbnVtYmVyW11bXX0pOiBTdGF0ZSB7XG5cdFx0Y29uc3QgcHJlZGljdGVkID0gc3VwZXIucHJlZGljdChvcHRpb25zKTtcblx0XHRyZXR1cm4gdGhpcy5jb3JyZWN0KHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRwcmVkaWN0ZWQsXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBGaWx0ZXJzIGFsbCB0aGUgb2JzZXJ2YXRpb25zXG4gICAgICogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvYnNlcnZhdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gdGhlIG1lYW4gb2YgdGhlIGNvcnJlY3Rpb25zXG4gICAgICovXG5cdGZpbHRlckFsbChvYnNlcnZhdGlvbnMpOiBudW1iZXJbXVtdIHtcblx0XHRsZXQgcHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmdldEluaXRTdGF0ZSgpO1xuXHRcdGNvbnN0IHJlc3VsdHM6IG51bWJlcltdW10gPSBbXTtcblx0XHRmb3IgKGNvbnN0IG9ic2VydmF0aW9uIG9mIG9ic2VydmF0aW9ucykge1xuXHRcdFx0Y29uc3QgcHJlZGljdGVkID0gdGhpcy5wcmVkaWN0KHtwcmV2aW91c0NvcnJlY3RlZH0pO1xuXHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSB0aGlzLmNvcnJlY3Qoe1xuXHRcdFx0XHRwcmVkaWN0ZWQsXG5cdFx0XHRcdG9ic2VydmF0aW9uLFxuXHRcdFx0fSk7XG5cdFx0XHRyZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQubWVhbi5tYXAobSA9PiBtWzBdKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIGFuIGVzdGltYXRpb24gb2YgdGhlIGFzeW1wdG90aWMgc3RhdGUgY292YXJpYW5jZSBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBpbiBwcmFjdGljZSB0aGlzIGNhbiBiZSB1c2VkIGFzIGEgaW5pdC5jb3ZhcmlhbmNlIHZhbHVlIGJ1dCBpcyB2ZXJ5IGNvc3RmdWwgY2FsY3VsYXRpb24gKHRoYXQncyB3aHkgdGhpcyBpcyBub3QgbWFkZSBieSBkZWZhdWx0KVxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRJdGVyYXRpb25zPTFlMl0gbWF4IG51bWJlciBvZiBpdGVyYXRpb25zXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFt0b2xlcmFuY2U9MWUtNl0gcmV0dXJucyB3aGVuIHRoZSBsYXN0IHZhbHVlcyBkaWZmZXJlbmNlcyBhcmUgbGVzcyB0aGFuIHRvbGVyYW5jZVxuXHQqIEByZXR1cm4ge0FycmF5LjxBcnJheS48TnVtYmVyPj59IGNvdmFyaWFuY2Vcblx0Ki9cblx0YXN5bXB0b3RpY1N0YXRlQ292YXJpYW5jZSh7bGltaXRJdGVyYXRpb25zID0gMWUyLCB0b2xlcmFuY2UgPSAxZS02fSA9IHt9KTogbnVtYmVyW11bXSB7XG5cdFx0bGV0IHByZXZpb3VzQ29ycmVjdGVkID0gc3VwZXIuZ2V0SW5pdFN0YXRlKCk7XG5cdFx0Y29uc3QgcmVzdWx0czogbnVtYmVyW11bXVtdID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaW1pdEl0ZXJhdGlvbnM7IGkrKykge1xuXHRcdFx0Ly8gV2UgY3JlYXRlIGEgZmFrZSBtZWFuIHRoYXQgd2lsbCBub3QgYmUgdXNlZCBpbiBvcmRlciB0byBrZWVwIGNvaGVyZW5jZVxuXHRcdFx0Y29uc3QgcHJlZGljdGVkID0gbmV3IFN0YXRlKHtcblx0XHRcdFx0bWVhbjogW10sXG5cdFx0XHRcdGNvdmFyaWFuY2U6IHN1cGVyLmdldFByZWRpY3RlZENvdmFyaWFuY2Uoe3ByZXZpb3VzQ29ycmVjdGVkfSksXG5cdFx0XHR9KTtcblx0XHRcdHByZXZpb3VzQ29ycmVjdGVkID0gbmV3IFN0YXRlKHtcblx0XHRcdFx0bWVhbjogW10sXG5cdFx0XHRcdGNvdmFyaWFuY2U6IHN1cGVyLmdldENvcnJlY3RlZENvdmFyaWFuY2Uoe3ByZWRpY3RlZH0pLFxuXHRcdFx0fSk7XG5cdFx0XHRyZXN1bHRzLnB1c2gocHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSk7XG5cdFx0XHRpZiAoZGlzdGFuY2VNYXQocHJldmlvdXNDb3JyZWN0ZWQuY292YXJpYW5jZSwgcmVzdWx0c1tpIC0gMV0pIDwgdG9sZXJhbmNlKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aHJvdyAobmV3IEVycm9yKCdUaGUgc3RhdGUgY292YXJpYW5jZSBkb2VzIG5vdCBjb252ZXJnZSBhc3ltcHRvdGljYWxseScpKTtcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgYXN5bXB0b3RpYyBnYWluLCBhcyBleHBsYWluZWQgaW4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvS2FsbWFuX2ZpbHRlciNBc3ltcHRvdGljX2Zvcm1cblx0KiBAcGFyYW0ge051bWJlcn0gW3RvbGVyYW5jZT0xZS02XSByZXR1cm5zIHdoZW4gdGhlIGxhc3QgdmFsdWVzIGRpZmZlcmVuY2VzIGFyZSBsZXNzIHRoYW4gdG9sZXJhbmNlXG5cdCogQHJldHVybiB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gZ2FpblxuXHQqL1xuXHRhc3ltcHRvdGljR2Fpbih7dG9sZXJhbmNlID0gMWUtNn0gPSB7fSk6IG51bWJlcltdW10ge1xuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSB0aGlzLmFzeW1wdG90aWNTdGF0ZUNvdmFyaWFuY2Uoe3RvbGVyYW5jZX0pO1xuXG5cdFx0Y29uc3QgYXN5bXB0b3RpY1N0YXRlID0gbmV3IFN0YXRlKHtcblx0XHRcdC8vIFdlIGNyZWF0ZSBhIGZha2UgbWVhbiB0aGF0IHdpbGwgbm90IGJlIHVzZWQgaW4gb3JkZXIgdG8ga2VlcCBjb2hlcmVuY2Vcblx0XHRcdG1lYW46IEFycmF5LmZyb20oe2xlbmd0aDogY292YXJpYW5jZS5sZW5ndGh9KS5maWxsKDApLm1hcCgoKSA9PiBbMF0pLFxuXHRcdFx0Y292YXJpYW5jZSxcblx0XHR9KTtcblxuXHRcdHJldHVybiBzdXBlci5nZXRHYWluKHtwcmVkaWN0ZWQ6IGFzeW1wdG90aWNTdGF0ZX0pO1xuXHR9XG59XG4iLCJjb25zdCByZWdpc3RlcmVkT2JzZXJ2YXRpb25Nb2RlbHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcbi8vIGNvbnN0IHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzOiBSZWNvcmQ8KGR5bmFtaWMsIG9ic2VydmF0aW9uKSA9PiBkeW5hbWljLCB7ZGltZW5zaW9uLCB0cmFuc2l0aW9uLCBjb3ZhcmlhbmNlfT4gPSB7fTtcbmNvbnN0IHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG5cbi8qKlxuICogRW5hYmxlcyB0byByZWdpc3RlciBvYnNlcnZhdGlvbiBtb2RlbCBhbmQgc3RvcmUgaXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAY2FsbGJhY2sgZm4gdGhlIGZ1bmN0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlc2lyZWQgbW9kZWxcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJPYnNlcnZhdGlvbihuYW1lOiBzdHJpbmcsIGZuKSB7XG5cdHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tuYW1lXSA9IGZuO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgdG8gcmVnaXN0ZXIgZHluYW1pYyBtb2RlbCBhbmQgc3RvcmUgaXRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAY2FsbGJhY2sgZm4gdGhlIGZ1bmN0aW9uIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlc2lyZWQgbW9kZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRHluYW1pYyhuYW1lOiBzdHJpbmcsIGZuKTogdm9pZCB7XG5cdHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW25hbWVdID0gZm47XG59XG5cbi8qKlxuICogQnVpbGQgYSBtb2RlbCBnaXZlbiBhbiBvYnNlcnZhdGlvbiBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuICogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnfSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIG1vZGVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9ic2VydmF0aW9uKG9ic2VydmF0aW9uKSB7XG5cdGlmICh0eXBlb2YgKHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXSkgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcihcblx0XHRcdGBUaGUgcHJvdmlkZWQgb2JzZXJ2YXRpb24gbW9kZWwgbmFtZSAoJHtvYnNlcnZhdGlvbi5uYW1lfSkgaXMgbm90IHJlZ2lzdGVyZWRgLFxuXHRcdCkpO1xuXHR9XG5cblx0cmV0dXJuIHJlZ2lzdGVyZWRPYnNlcnZhdGlvbk1vZGVsc1tvYnNlcnZhdGlvbi5uYW1lXShvYnNlcnZhdGlvbik7XG59XG5cbi8qKlxuICogQnVpbGQgYSBtb2RlbCBnaXZlbiBkeW5hbWljIGFuZCBvYnNlcnZhdGlvbiBjb25maWd1cmF0aW9uc1xuICogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuICogQHJldHVybnMge0R5bmFtaWNDb25maWd9IHRoZSBkeW5hbWljIGNvbmZpZ3VyYXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBtb2RlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREeW5hbWljKGR5bmFtaWMsIG9ic2VydmF0aW9uKSB7XG5cdGlmICh0eXBlb2YgKHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW2R5bmFtaWMubmFtZV0pICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRgVGhlIHByb3ZpZGVkIGR5bmFtaWMgbW9kZWwgKCR7ZHluYW1pYy5uYW1lfSkgbmFtZSBpcyBub3QgcmVnaXN0ZXJlZGAsXG5cdFx0KSk7XG5cdH1cblx0cmV0dXJuIHJlZ2lzdGVyZWREeW5hbWljTW9kZWxzW2R5bmFtaWMubmFtZV0oZHluYW1pYywgb2JzZXJ2YXRpb24pO1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIHNlbnNvcn0gZnJvbSAnLi9zZW5zb3InO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNlbnNvckxvY2FsVmFyaWFuY2V9IGZyb20gJy4vc2Vuc29yLWxvY2FsLXZhcmlhbmNlJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzZW5zb3JQcm9qZWN0ZWR9IGZyb20gJy4vc2Vuc29yLXByb2plY3RlZCc7XG5cbiIsImltcG9ydCB7aWRlbnRpdHl9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuXG5pbXBvcnQge2J1aWxkT2JzZXJ2YXRpb259IGZyb20gJy4uL21vZGVsLWNvbGxlY3Rpb24nO1xuaW1wb3J0IHtPYnNlcnZhdGlvbkNvbmZpZ30gZnJvbSAnLi4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuLyoqXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnNlbnNvckRpbWVuc2lvblxuKiBAcGFyYW0ge0NvdmFyaWFuY2VQYXJhbX0gb3B0aW9ucy5zZW5zb3JDb3ZhcmlhbmNlXG4qIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm5TZW5zb3JzXG4qIEByZXR1cm5zIHtPYnNlcnZhdGlvbkNvbmZpZ31cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG51bGxhYmxlU2Vuc29yKG9wdGlvbnMpOiBPYnNlcnZhdGlvbkNvbmZpZyB7XG5cdGNvbnN0IHtkaW1lbnNpb24sIG9ic2VydmVkUHJvamVjdGlvbiwgY292YXJpYW5jZTogYmFzZUNvdmFyaWFuY2V9ID0gYnVpbGRPYnNlcnZhdGlvbih7Li4ub3B0aW9ucywgbmFtZTogJ3NlbnNvcid9KTtcblxuXHRyZXR1cm4ge1xuXHRcdGRpbWVuc2lvbixcblx0XHRvYnNlcnZlZFByb2plY3Rpb24sXG5cdFx0Y292YXJpYW5jZShvKTogbnVtYmVyW11bXSB7XG5cdFx0XHRjb25zdCBjb3ZhcmlhbmNlID0gaWRlbnRpdHkoZGltZW5zaW9uKTtcblx0XHRcdGNvbnN0IHt2YXJpYW5jZX0gPSBvO1xuXG5cdFx0XHR2YXJpYW5jZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdGNvdmFyaWFuY2VbaV1baV0gPSB2ICogYmFzZUNvdmFyaWFuY2VbaV1baV07XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGNvdmFyaWFuY2U7XG5cdFx0fSxcblx0fTtcbn1cbiIsImltcG9ydCB7aWRlbnRpdHksIG1hdFBlcm11dGF0aW9ufSBmcm9tICdzaW1wbGUtbGluYWxnJztcbmltcG9ydCBjb3JyZWxhdGlvblRvQ292YXJpYW5jZSBmcm9tICcuLi91dGlscy9jb3JyZWxhdGlvbi10by1jb3ZhcmlhbmNlJztcbmltcG9ydCBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbiBmcm9tICcuLi91dGlscy9jb3ZhcmlhbmNlLXRvLWNvcnJlbGF0aW9uJztcblxuLyoqXG4qQ3JlYXRlcyBhbiBvYnNlcnZhdGlvbiBtb2RlbCB3aXRoIGEgb2JzZXJ2ZWRQcm9qZWN0aW9uIGNvcnJlc3BvbmRpbmcgdG9cbiogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEByZXR1cm5zIHtEeW5hbWljQ29uZmlnfVxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Vuc29yUHJvamVjdGVkKHtzZWxlY3RlZENvdmFyaWFuY2UsIHRvdGFsRGltZW5zaW9uLCBvYnNJbmRleGVzLCBzZWxlY3RlZFN0YXRlUHJvamVjdGlvbn0pIHtcblx0aWYgKCFzZWxlY3RlZFN0YXRlUHJvamVjdGlvbikge1xuXHRcdHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uID0gbmV3IEFycmF5KG9ic0luZGV4ZXMubGVuZ3RoKS5maWxsKDApLm1hcCgoKSA9PiBuZXcgQXJyYXkob2JzSW5kZXhlcy5sZW5ndGgpLmZpbGwoMCkpO1xuXHRcdG9ic0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgxLCBpMSkgPT4ge1xuXHRcdFx0c2VsZWN0ZWRTdGF0ZVByb2plY3Rpb25baTFdW2kxXSA9IDE7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RoICE9PSBvYnNJbmRleGVzLmxlbmd0aCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoYFtTZW5zb3ItcHJvamVjdGVkXSBTaGFwZSBtaXNtYXRjaCBiZXR3ZWVuICR7c2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24ubGVuZ3RofSBhbmQgJHtvYnNJbmRleGVzLmxlbmd0aH1gKSk7XG5cdH1cblxuXHRjb25zdCBiYXNlQ292YXJpYW5jZSA9IGlkZW50aXR5KHRvdGFsRGltZW5zaW9uKTtcblx0b2JzSW5kZXhlcy5mb3JFYWNoKChpbmRleDEsIGkxKSA9PiB7XG5cdFx0aWYgKHNlbGVjdGVkQ292YXJpYW5jZSkge1xuXHRcdFx0b2JzSW5kZXhlcy5mb3JFYWNoKChpbmRleDIsIGkyKSA9PiB7XG5cdFx0XHRcdGJhc2VDb3ZhcmlhbmNlW2luZGV4MV1baW5kZXgyXSA9IHNlbGVjdGVkQ292YXJpYW5jZVtpMV1baTJdO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblx0Y29uc3Qge2NvcnJlbGF0aW9uOiBiYXNlQ29ycmVsYXRpb24sIHZhcmlhbmNlOiBiYXNlVmFyaWFuY2V9ID0gY292YXJpYW5jZVRvQ29ycmVsYXRpb24oYmFzZUNvdmFyaWFuY2UpO1xuXG5cdGNvbnN0IGR5bmFEaW1lbnNpb24gPSBzZWxlY3RlZFN0YXRlUHJvamVjdGlvblswXS5sZW5ndGg7XG5cblx0aWYgKHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLmxlbmd0aCAhPT0gb2JzSW5kZXhlcy5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBzaGFwZSBtaXNtYXRjaCAoJHtzZWxlY3RlZFN0YXRlUHJvamVjdGlvbi5sZW5ndGh9IHZzICR7b2JzSW5kZXhlcy5sZW5ndGh9KWApKTtcblx0fVxuXG5cdGNvbnN0IG9ic2VydmVkUHJvamVjdGlvbiA9IG1hdFBlcm11dGF0aW9uKHtcblx0XHRvdXRwdXRTaXplOiBbdG90YWxEaW1lbnNpb24sIGR5bmFEaW1lbnNpb25dLFxuXHRcdGNvbEluZGV4ZXM6IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uWzBdLm1hcCgoXywgaSkgPT4gaSksXG5cdFx0cm93SW5kZXhlczogb2JzSW5kZXhlcyxcblx0XHRtYXRyaXg6IHNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uLFxuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdGRpbWVuc2lvbjogdG90YWxEaW1lbnNpb24sXG5cdFx0b2JzZXJ2ZWRQcm9qZWN0aW9uLFxuXHRcdGNvdmFyaWFuY2Uobykge1xuXHRcdFx0Y29uc3Qge3ZhcmlhbmNlfSA9IG87XG5cdFx0XHRpZiAoIXZhcmlhbmNlKSB7XG5cdFx0XHRcdHJldHVybiBiYXNlQ292YXJpYW5jZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhcmlhbmNlLmxlbmd0aCAhPT0gYmFzZUNvdmFyaWFuY2UubGVuZ3RoKSB7XG5cdFx0XHRcdHRocm93IChuZXcgRXJyb3IoJ3ZhcmlhbmNlIGlzIGRpZmZlcmVuY2Ugc2l6ZSBmcm9tIGJhc2VDb3ZhcmlhbmNlJykpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCByZXN1bHQgPSBjb3JyZWxhdGlvblRvQ292YXJpYW5jZSh7Y29ycmVsYXRpb246IGJhc2VDb3JyZWxhdGlvbiwgdmFyaWFuY2U6IGJhc2VWYXJpYW5jZS5tYXAoKGIsIGkpID0+IHZhcmlhbmNlW2ldICogYil9KTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHR9O1xufVxuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5cbmltcG9ydCBwb2x5bW9ycGhNYXRyaXggZnJvbSAnLi4vdXRpbHMvcG9seW1vcnBoLW1hdHJpeCc7XG5pbXBvcnQgY2hlY2tNYXRyaXggZnJvbSAnLi4vdXRpbHMvY2hlY2stbWF0cml4JztcbmltcG9ydCB7T2JzZXJ2YXRpb25Db25maWd9IGZyb20gJy4uL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcbmltcG9ydCBUeXBlQXNzZXJ0IGZyb20gJy4uL3R5cGVzL1R5cGVBc3NlcnQnO1xuXG4vKipcbiogQHBhcmFtIHtOdW1iZXJ9IHNlbnNvckRpbWVuc2lvblxuKiBAcGFyYW0ge0NvdmFyaWFuY2VQYXJhbX0gc2Vuc29yQ292YXJpYW5jZVxuKiBAcGFyYW0ge051bWJlcn0gblNlbnNvcnNcbiogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnfVxuKi9cblxuY29uc3QgY29weSA9IChtYXQ6IG51bWJlcltdW10pOiBudW1iZXJbXVtdID0+IG1hdC5tYXAoYSA9PiBhLmNvbmNhdCgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2Vuc29yKG9wdGlvbnM6IGFueSk6IE9ic2VydmF0aW9uQ29uZmlnIHtcblx0Y29uc3Qge3NlbnNvckRpbWVuc2lvbiA9IDEsIHNlbnNvckNvdmFyaWFuY2UgPSAxLCBuU2Vuc29ycyA9IDF9ID0gb3B0aW9ucztcblx0Y29uc3Qgc2Vuc29yQ292YXJpYW5jZUZvcm1hdHRlZCA9IHBvbHltb3JwaE1hdHJpeChzZW5zb3JDb3ZhcmlhbmNlLCB7ZGltZW5zaW9uOiBzZW5zb3JEaW1lbnNpb259KTtcblx0aWYgKFR5cGVBc3NlcnQuaXNGdW5jdGlvbihzZW5zb3JDb3ZhcmlhbmNlRm9ybWF0dGVkKSlcblx0e3Rocm93IG5ldyBUeXBlRXJyb3IoJ3NlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQgY2FuIG5vdCBiZSBhIGZ1bmN0aW9uIGhlcmUnKTt9XG5cdGNoZWNrTWF0cml4KHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQsIFtzZW5zb3JEaW1lbnNpb24sIHNlbnNvckRpbWVuc2lvbl0sICdvYnNlcnZhdGlvbi5zZW5zb3JDb3ZhcmlhbmNlJyk7XG5cdGNvbnN0IG9uZVNlbnNvck9ic2VydmVkUHJvamVjdGlvbiA9IGlkZW50aXR5KHNlbnNvckRpbWVuc2lvbik7XG5cdGxldCBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBbXTtcblx0Y29uc3QgZGltZW5zaW9uID0gc2Vuc29yRGltZW5zaW9uICogblNlbnNvcnM7XG5cdGNvbnN0IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UgPSBpZGVudGl0eShkaW1lbnNpb24pO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5TZW5zb3JzOyBpKyspIHtcblx0XHRjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24gPSBjb25jYXRlbmF0ZWRPYnNlcnZlZFByb2plY3Rpb24uY29uY2F0KGNvcHkob25lU2Vuc29yT2JzZXJ2ZWRQcm9qZWN0aW9uKSk7XG5cblx0XHRmb3IgKGNvbnN0IFtySW5kZXgsIHJdIG9mIHNlbnNvckNvdmFyaWFuY2VGb3JtYXR0ZWQuZW50cmllcygpKSB7XG5cdFx0XHRmb3IgKGNvbnN0IFtjSW5kZXgsIGNdIG9mIHIuZW50cmllcygpKSB7XG5cdFx0XHRcdGNvbmNhdGVuYXRlZENvdmFyaWFuY2VbckluZGV4ICsgKGkgKiBzZW5zb3JEaW1lbnNpb24pXVtjSW5kZXggKyAoaSAqIHNlbnNvckRpbWVuc2lvbildID0gYztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLm9wdGlvbnMsXG5cdFx0ZGltZW5zaW9uLFxuXHRcdG9ic2VydmVkUHJvamVjdGlvbjogY29uY2F0ZW5hdGVkT2JzZXJ2ZWRQcm9qZWN0aW9uLFxuXHRcdGNvdmFyaWFuY2U6IGNvbmNhdGVuYXRlZENvdmFyaWFuY2UsXG5cdH07XG59XG4iLCJpbXBvcnQge3BhZFdpdGhaZXJvQ29scyBhcyBwYWRXaXRoWmVyb3N9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQge0R5bmFtaWNDb25maWdQYXJjaWFsfSBmcm9tICcuLi90eXBlcy9PYnNlcnZhdGlvbkNvbmZpZyc7XG5cbi8qKlxuKiBCdWlsZHMgdGhlIHN0YXRlUHJvamVjdGlvbiBnaXZlbiBhbiBvYnNlcnZlZFByb2plY3Rpb25cbiogT25seSB1c2VkIGJ5IHNldHVwTW9kZWxzUGFyYW1ldGVyc1xuKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuKiBAcGFyYW0ge0R5bmFtaWNDb25maWd9IGR5bmFtaWNcbiogQHJldHVybnMge09ic2VydmF0aW9uQ29uZmlnLCBEeW5hbWljQ29uZmlnfSB0aGUgbW9kZWwgY29udGFpbmluZyB0aGUgY3JlYXRlZCBzdGF0ZVByb2plY3Rpb25cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFN0YXRlUHJvamVjdGlvbihhcmdzOiB7b2JzZXJ2YXRpb24sIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSk6IHtvYnNlcnZhdGlvbjogYW55OyBkeW5hbWljOiBEeW5hbWljQ29uZmlnUGFyY2lhbH0ge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gYXJncztcblx0Y29uc3Qge29ic2VydmVkUHJvamVjdGlvbiwgc3RhdGVQcm9qZWN0aW9ufSA9IG9ic2VydmF0aW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0Y29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuXHRpZiAob2JzZXJ2ZWRQcm9qZWN0aW9uICYmIHN0YXRlUHJvamVjdGlvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdZb3UgY2Fubm90IHVzZSBib3RoIG9ic2VydmVkUHJvamVjdGlvbiBhbmQgc3RhdGVQcm9qZWN0aW9uJykpO1xuXHR9XG5cblx0aWYgKG9ic2VydmVkUHJvamVjdGlvbikge1xuXHRcdGNvbnN0IHN0YXRlUHJvamVjdGlvbiA9IHBhZFdpdGhaZXJvcyhvYnNlcnZlZFByb2plY3Rpb24sIHtjb2x1bW5zOiBkeW5hbWljRGltZW5zaW9ufSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiB7XG5cdFx0XHRcdC4uLm9ic2VydmF0aW9uLFxuXHRcdFx0XHRzdGF0ZVByb2plY3Rpb24sXG5cdFx0XHR9LFxuXHRcdFx0ZHluYW1pYyxcblx0XHR9O1xuXHR9XG5cblx0aWYgKG9ic2VydmF0aW9uRGltZW5zaW9uICYmIGR5bmFtaWNEaW1lbnNpb24gJiYgIXN0YXRlUHJvamVjdGlvbikge1xuXHRcdGNvbnN0IG9ic2VydmF0aW9uTWF0cml4ID0gaWRlbnRpdHkob2JzZXJ2YXRpb25EaW1lbnNpb24pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbjoge1xuXHRcdFx0XHQuLi5vYnNlcnZhdGlvbixcblx0XHRcdFx0c3RhdGVQcm9qZWN0aW9uOiBwYWRXaXRoWmVyb3Mob2JzZXJ2YXRpb25NYXRyaXgsIHtjb2x1bW5zOiBkeW5hbWljRGltZW5zaW9ufSksXG5cdFx0XHR9LFxuXHRcdFx0ZHluYW1pYyxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHtvYnNlcnZhdGlvbiwgZHluYW1pY307XG59XG4iLCJpbXBvcnQge0R5bmFtaWNDb25maWdQYXJjaWFsfSBmcm9tICcuLi90eXBlcy9PYnNlcnZhdGlvbkNvbmZpZyc7XG5cbi8qKlxuKiBWZXJpZmllcyB0aGF0IGR5bmFtaWMuZGltZW5zaW9uIGFuZCBvYnNlcnZhdGlvbi5kaW1lbnNpb24gYXJlIHNldFxuKiBPbmx5IHVzZWQgYnkgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzXG4qIEBwYXJhbSB7T2JzZXJ2YXRpb25Db25maWd9IG9ic2VydmF0aW9uXG4qIEBwYXJhbSB7RHluYW1pY0NvbmZpZ30gZHluYW1pY1xuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrRGltZW5zaW9ucyhhcmdzOiB7b2JzZXJ2YXRpb24sIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSk6IHtvYnNlcnZhdGlvbjogYW55LCBkeW5hbWljOiBEeW5hbWljQ29uZmlnUGFyY2lhbH0ge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gYXJncztcblx0Y29uc3QgZHluYW1pY0RpbWVuc2lvbiA9IGR5bmFtaWMuZGltZW5zaW9uO1xuXHRjb25zdCBvYnNlcnZhdGlvbkRpbWVuc2lvbiA9IG9ic2VydmF0aW9uLmRpbWVuc2lvbjtcblx0aWYgKCFkeW5hbWljRGltZW5zaW9uIHx8ICFvYnNlcnZhdGlvbkRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdEaW1lbnNpb24gaXMgbm90IHNldCcpKTtcblx0fVxuXHRyZXR1cm4ge29ic2VydmF0aW9uLCBkeW5hbWljfTtcbn1cbiIsImltcG9ydCB7ZGlhZ30gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgcG9seW1vcnBoTWF0cml4IGZyb20gJy4uL3V0aWxzL3BvbHltb3JwaC1tYXRyaXgnO1xuaW1wb3J0IHtcblx0RHluYW1pY0NvbmZpZywgRHluYW1pY0NvbmZpZ1BhcmNpYWwsIE9ic2VydmF0aW9uQ29uZmlnLCBPYnNlcnZhdGlvbk9iamVjdENvbmZpZyxcbn0gZnJvbSAnLi4vdHlwZXMvT2JzZXJ2YXRpb25Db25maWcnO1xuaW1wb3J0IFR5cGVBc3NlcnQgZnJvbSAnLi4vdHlwZXMvVHlwZUFzc2VydCc7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGR5bmFtaWMuaW5pdCB3aGVuIG5vdCBnaXZlblxuICogT25seSB1c2VkIGJ5IHNldHVwTW9kZWxzUGFyYW1ldGVyc1xuICogQHBhcmFtIHtPYnNlcnZhdGlvbkNvbmZpZ30gb2JzZXJ2YXRpb25cbiAqIEBwYXJhbSB7RHluYW1pY0NvbmZpZ1BhcmNpYWx9IGR5bmFtaWNcbiAqIEByZXR1cm5zIHtDb3JlQ29uZmlnfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZER5bmFtaWNJbml0KGFyZ3M6IHtvYnNlcnZhdGlvbjogT2JzZXJ2YXRpb25Db25maWcsIGR5bmFtaWM6IER5bmFtaWNDb25maWdQYXJjaWFsfSk6IHtvYnNlcnZhdGlvbjogT2JzZXJ2YXRpb25Db25maWcsIGR5bmFtaWM6IER5bmFtaWNDb25maWd9IHtcblx0Y29uc3Qge29ic2VydmF0aW9uLCBkeW5hbWljfSA9IGFyZ3M7XG5cdGlmICghZHluYW1pYy5pbml0KSB7XG5cdFx0Y29uc3QgaHVnZSA9IDFlNjtcblx0XHRjb25zdCBkeW5hbWljRGltZW5zaW9uID0gZHluYW1pYy5kaW1lbnNpb247XG5cdFx0Y29uc3QgbWVhbkFycmF5ID0gbmV3IEFycmF5KGR5bmFtaWNEaW1lbnNpb24pLmZpbGwoMCk7XG5cdFx0Y29uc3QgY292YXJpYW5jZUFycmF5ID0gbmV3IEFycmF5KGR5bmFtaWNEaW1lbnNpb24pLmZpbGwoaHVnZSk7XG5cdFx0Y29uc3Qgd2l0aEluaXRPcHRpb25zID0ge1xuXHRcdFx0b2JzZXJ2YXRpb24sXG5cdFx0XHRkeW5hbWljOiB7XG5cdFx0XHRcdC4uLmR5bmFtaWMsXG5cdFx0XHRcdGluaXQ6IHtcblx0XHRcdFx0XHRtZWFuOiBtZWFuQXJyYXkubWFwKGVsZW1lbnQgPT4gW2VsZW1lbnRdKSxcblx0XHRcdFx0XHRjb3ZhcmlhbmNlOiBkaWFnKGNvdmFyaWFuY2VBcnJheSksXG5cdFx0XHRcdFx0aW5kZXg6IC0xLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9O1xuXHRcdHJldHVybiB3aXRoSW5pdE9wdGlvbnM7XG5cdH1cblxuXHRpZiAoZHluYW1pYy5pbml0ICYmICFkeW5hbWljLmluaXQubWVhbikge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ2R5bmFtaWMuaW5pdCBzaG91bGQgaGF2ZSBhIG1lYW4ga2V5JykpO1xuXHR9XG5cblx0Y29uc3QgY292YXJpYW5jZSA9IHBvbHltb3JwaE1hdHJpeChkeW5hbWljLmluaXQuY292YXJpYW5jZSwge2RpbWVuc2lvbjogZHluYW1pYy5kaW1lbnNpb259KTtcblx0aWYgKFR5cGVBc3NlcnQuaXNGdW5jdGlvbihjb3ZhcmlhbmNlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvdmFyaWFuY2UgY2FuIG5vdCBiZSBhIGZ1bmN0aW9uJyk7XG5cdH1cblx0ZHluYW1pYy5pbml0ID0ge1xuXHRcdC4uLmR5bmFtaWMuaW5pdCxcblx0XHRjb3ZhcmlhbmNlLFxuXHR9O1xuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWM6IGR5bmFtaWMgYXMgRHluYW1pY0NvbmZpZ307XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxzUGFyYW1ldGVycyB7XG5cdGR5bmFtaWM6IER5bmFtaWNDb25maWc7XG5cdG9ic2VydmF0aW9uOiBPYnNlcnZhdGlvbkNvbmZpZzsvLyBPYnNlcnZhdGlvbk9iamVjdENvbmZpZyAmIHtzdGF0ZVByb2plY3Rpb246IGFueTsgY292YXJpYW5jZTogYW55fTtcbn1cbiIsImltcG9ydCB7RHluYW1pY0NvbmZpZ1BhcmNpYWwsIER5bmFtaWNDb25maWdQYXJjaWFsTm9EaW19IGZyb20gJy4uL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcblxuLyoqXG4gKiBWZXJpZmllcyB0aGF0IGRpbWVuc2lvbnMgYXJlIG1hdGNoaW5nIGFuZCBzZXQgZHluYW1pYy5kaW1lbnNpb24gYW5kIG9ic2VydmF0aW9uLmRpbWVuc2lvblxuICogd2l0aCByZXNwZWN0IG9mIHN0YXRlUHJvamVjdGlvbiBhbmQgdHJhbnNpdGlvbiBkaW1lbnNpb25zXG4gKiBPbmx5IHVzZWQgYnkgc2V0dXBNb2RlbHNQYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge09ic2VydmF0aW9uQ29uZmlnfSBvYnNlcnZhdGlvblxuICogQHBhcmFtIHtEeW5hbWljQ29uZmlnfSBkeW5hbWljXG4gKiBAcmV0dXJucyB7T2JzZXJ2YXRpb25Db25maWcsIER5bmFtaWNDb25maWd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldERpbWVuc2lvbnMoYXJnczoge29ic2VydmF0aW9uLCBkeW5hbWljOiBEeW5hbWljQ29uZmlnUGFyY2lhbE5vRGltfSk6IHtvYnNlcnZhdGlvbjogYW55LCBkeW5hbWljOiBEeW5hbWljQ29uZmlnUGFyY2lhbH0ge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGR5bmFtaWN9ID0gYXJncztcblx0Y29uc3Qge3N0YXRlUHJvamVjdGlvbn0gPSBvYnNlcnZhdGlvbjtcblx0Y29uc3Qge3RyYW5zaXRpb259ID0gZHluYW1pYztcblx0Y29uc3QgZHluYW1pY0RpbWVuc2lvbjogbnVtYmVyIHwgdW5kZWZpbmVkID0gZHluYW1pYy5kaW1lbnNpb247XG5cdGNvbnN0IG9ic2VydmF0aW9uRGltZW5zaW9uID0gb2JzZXJ2YXRpb24uZGltZW5zaW9uO1xuXG5cdGlmIChkeW5hbWljRGltZW5zaW9uICYmIG9ic2VydmF0aW9uRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkoc3RhdGVQcm9qZWN0aW9uKSAmJiAoZHluYW1pY0RpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uWzBdLmxlbmd0aCB8fCBvYnNlcnZhdGlvbkRpbWVuc2lvbiAhPT0gc3RhdGVQcm9qZWN0aW9uLmxlbmd0aCkpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignc3RhdGVQcm9qZWN0aW9uIGRpbWVuc2lvbnMgbm90IG1hdGNoaW5nIHdpdGggb2JzZXJ2YXRpb24gYW5kIGR5bmFtaWMgZGltZW5zaW9ucycpKTtcblx0fVxuXG5cdGlmIChkeW5hbWljRGltZW5zaW9uICYmIEFycmF5LmlzQXJyYXkodHJhbnNpdGlvbikgJiYgZHluYW1pY0RpbWVuc2lvbiAhPT0gdHJhbnNpdGlvbi5sZW5ndGgpIHtcblx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcigndHJhbnNpdGlvbiBkaW1lbnNpb24gbm90IG1hdGNoaW5nIHdpdGggZHluYW1pYyBkaW1lbnNpb24nKSk7XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShzdGF0ZVByb2plY3Rpb24pKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmF0aW9uOiB7XG5cdFx0XHRcdC4uLm9ic2VydmF0aW9uLFxuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvbi5sZW5ndGgsXG5cdFx0XHR9LFxuXHRcdFx0ZHluYW1pYzoge1xuXHRcdFx0XHQuLi5keW5hbWljLFxuXHRcdFx0XHRkaW1lbnNpb246IHN0YXRlUHJvamVjdGlvblswXS5sZW5ndGgsXG5cdFx0XHR9LFxuXHRcdH07XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uKSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZhdGlvbixcblx0XHRcdGR5bmFtaWM6IHtcblx0XHRcdFx0Li4uZHluYW1pYyxcblx0XHRcdFx0ZGltZW5zaW9uOiB0cmFuc2l0aW9uLmxlbmd0aCxcblx0XHRcdH0sXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7b2JzZXJ2YXRpb24sIGR5bmFtaWM6IGR5bmFtaWMgYXMgRHluYW1pY0NvbmZpZ1BhcmNpYWx9O1xufVxuIiwiaW1wb3J0IHtcblx0c3VidHJhY3QsIHRyYW5zcG9zZSwgbWF0TXVsLCBpbnZlcnQsIGVsZW1XaXNlLCBzdWJTcXVhcmVNYXRyaXgsXG59IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuaW1wb3J0IGFycmF5VG9NYXRyaXggZnJvbSAnLi91dGlscy9hcnJheS10by1tYXRyaXgnO1xuaW1wb3J0IGNoZWNrTWF0cml4IGZyb20gJy4vdXRpbHMvY2hlY2stbWF0cml4JztcbmltcG9ydCBjaGVja0NvdmFyaWFuY2UgZnJvbSAnLi91dGlscy9jaGVjay1jb3ZhcmlhbmNlJztcbmltcG9ydCB0eXBlIHtTdGF0ZUxUfSBmcm9tICcuL3R5cGVzL1N0YXRlTFQnO1xuaW1wb3J0IHR5cGUgS2FsbWFuRmlsdGVyIGZyb20gJy4va2FsbWFuLWZpbHRlcic7XG5pbXBvcnQgVHlwZUFzc2VydCBmcm9tICcuL3R5cGVzL1R5cGVBc3NlcnQnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIG11bHRpIGRpbWVuc2lvbm5hbCBnYXVzc2lhbiwgd2l0aCBoaXMgbWVhbiBhbmQgaGlzIGNvdmFyaWFuY2VcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbaW5kZXg9MF0gdGhlIGluZGV4IG9mIHRoZSBTdGF0ZSBpbiB0aGUgcHJvY2VzcywgdGhpcyBpcyBub3QgbWFuZGF0b3J5IGZvciBzaW1wbGUgS2FsbWFuIEZpbHRlciwgYnV0IGlzIG5lZWRlZCBmb3IgbW9zdCBvZiB0aGUgdXNlIGNhc2Ugb2YgZXh0ZW5kZWQga2FsbWFuIGZpbHRlclxuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBjb3ZhcmlhbmNlIHNxdWFyZSBtYXRyaXggb2Ygc2l6ZSBkaW1lbnNpb25cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5PE51bWJlcj4+fSBtZWFuIGNvbHVtbiBtYXRyaXggb2Ygc2l6ZSBkaW1lbnNpb24geCAxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlIGltcGxlbWVudHMgU3RhdGVMVCB7XG5cdG1lYW46IG51bWJlcltdW107XG5cdGNvdmFyaWFuY2U6IG51bWJlcltdW107XG5cdGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cblx0Y29uc3RydWN0b3IoYXJnczoge21lYW46IG51bWJlcltdW10sIGNvdmFyaWFuY2U6IG51bWJlcltdW10sIGluZGV4PzogbnVtYmVyfSkge1xuXHRcdHRoaXMubWVhbiA9IGFyZ3MubWVhbjtcblx0XHR0aGlzLmNvdmFyaWFuY2UgPSBhcmdzLmNvdmFyaWFuY2U7XG5cdFx0dGhpcy5pbmRleCA9IGFyZ3MuaW5kZXggfHwgdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG5cdCogQ2hlY2sgdGhlIGNvbnNpc3RlbmN5IG9mIHRoZSBTdGF0ZVxuXHQqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCogQHNlZSBjaGVja1xuXHQqL1xuXHRjaGVjayhvcHRpb25zPzoge2RpbWVuc2lvbj86IG51bWJlciB8IG51bGwsIHRpdGxlPzogc3RyaW5nLCBlaWdlbj86IGJvb2xlYW59KTogdm9pZCB7XG5cdFx0U3RhdGUuY2hlY2sodGhpcywgb3B0aW9ucyk7XG5cdH1cblxuXHQvKipcblx0KiBDaGVjayB0aGUgY29uc2lzdGVuY3kgb2YgdGhlIFN0YXRlJ3MgYXR0cmlidXRlc1xuXHQqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG5cdCogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuXHQqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmRpbWVuc2lvbj1udWxsXSBpZiBkZWZpbmVkIGNoZWNrIHRoZSBkaW1lbnNpb24gb2YgdGhlIHN0YXRlXG5cdCogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnRpdGxlPW51bGxdIHVzZWQgdG8gbG9nIGVycm9yIG1vciBleHBsaWNpdGx5XG5cdCogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmVpZ2VuXG5cdCogQHJldHVybnMge051bGx9XG5cdCovXG5cdHN0YXRpYyBjaGVjayhzdGF0ZTogU3RhdGUsIGFyZ3M6IHtkaW1lbnNpb24/OiBudW1iZXIgfCBudWxsLCB0aXRsZT86IHN0cmluZywgZWlnZW4/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG5cdFx0Y29uc3Qge2RpbWVuc2lvbiwgdGl0bGUsIGVpZ2VufSA9IGFyZ3M7XG5cdFx0aWYgKCEoc3RhdGUgaW5zdGFuY2VvZiBTdGF0ZSkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnVGhlIGFyZ3VtZW50IGlzIG5vdCBhIHN0YXRlIFxcbidcbiAgICAgICAgKyAnVGlwczogbWF5YmUgeW91IGFyZSB1c2luZyAyIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGthbG1hbi1maWx0ZXIgaW4geW91ciBucG0gZGVwcyB0cmVlJyxcblx0XHRcdCkpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHttZWFuLCBjb3ZhcmlhbmNlfSA9IHN0YXRlOyAvLyBJbmRleFxuXHRcdGNvbnN0IG1lYW5EaW1lbnNpb24gPSBtZWFuLmxlbmd0aDtcblx0XHRpZiAodHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJyAmJiBtZWFuRGltZW5zaW9uICE9PSBkaW1lbnNpb24pIHtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoYFske3RpdGxlfV0gU3RhdGUubWVhbiAke21lYW59IHdpdGggZGltZW5zaW9uICR7bWVhbkRpbWVuc2lvbn0gZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgZGltZW5zaW9uICgke2RpbWVuc2lvbn0pYCkpO1xuXHRcdH1cblxuXHRcdGNoZWNrTWF0cml4KG1lYW4sIFttZWFuRGltZW5zaW9uLCAxXSwgdGl0bGUgPyB0aXRsZSArICcubWVhbicgOiAnbWVhbicpO1xuXHRcdGNoZWNrTWF0cml4KGNvdmFyaWFuY2UsIFttZWFuRGltZW5zaW9uLCBtZWFuRGltZW5zaW9uXSwgdGl0bGUgPyB0aXRsZSArICcuY292YXJpYW5jZScgOiAnY292YXJpYW5jZScpO1xuXHRcdGNoZWNrQ292YXJpYW5jZSh7Y292YXJpYW5jZSwgZWlnZW59LCB0aXRsZSA/IHRpdGxlICsgJy5jb3ZhcmlhbmNlJyA6ICdjb3ZhcmlhbmNlJyk7XG5cdFx0Ly8gSWYgKHR5cGVvZiAoaW5kZXgpICE9PSAnbnVtYmVyJykge1xuXHRcdC8vIFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoJ3QgbXVzdCBiZSBhIG51bWJlcicpKTtcblx0XHQvLyB9XG5cdH1cblxuXHQvKipcblx0KiBNdWx0aXBseSBzdGF0ZSB3aXRoIG1hdHJpeFxuXHQqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG5cdCogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBtYXRyaXhcblx0KiBAcmV0dXJucyB7U3RhdGV9XG5cdCovXG5cdHN0YXRpYyBtYXRNdWwoYXJnczoge3N0YXRlOiBTdGF0ZSwgbWF0cml4OiBudW1iZXJbXVtdfSk6IFN0YXRlIHtcblx0XHRjb25zdCB7c3RhdGUsIG1hdHJpeH0gPSBhcmdzO1xuXHRcdGNvbnN0IGNvdmFyaWFuY2UgPSBtYXRNdWwoXG5cdFx0XHRtYXRNdWwobWF0cml4LCBzdGF0ZS5jb3ZhcmlhbmNlKSxcblx0XHRcdHRyYW5zcG9zZShtYXRyaXgpLFxuXHRcdCk7XG5cdFx0Y29uc3QgbWVhbiA9IG1hdE11bChtYXRyaXgsIHN0YXRlLm1lYW4pO1xuXG5cdFx0cmV0dXJuIG5ldyBTdGF0ZSh7XG5cdFx0XHRtZWFuLFxuXHRcdFx0Y292YXJpYW5jZSxcblx0XHRcdGluZGV4OiBzdGF0ZS5pbmRleCxcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQqIEZyb20gYSBzdGF0ZSBpbiBuLWRpbWVuc2lvbiBjcmVhdGUgYSBzdGF0ZSBpbiBhIHN1YnNwYWNlXG5cdCogSWYgeW91IHNlZSB0aGUgc3RhdGUgYXMgYSBOLWRpbWVuc2lvbiBnYXVzc2lhbixcblx0KiB0aGlzIGNhbiBiZSB2aWV3ZWQgYXMgdGhlIHN1YiBNLWRpbWVuc2lvbiBnYXVzc2lhbiAoTSA8IE4pXG5cdCogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gb2JzSW5kZXhlcyBsaXN0IG9mIGRpbWVuc2lvbiB0byBleHRyYWN0LCAgKE0gPCBOIDw9PiBvYnNJbmRleGVzLmxlbmd0aCA8IHRoaXMubWVhbi5sZW5ndGgpXG5cdCogQHJldHVybnMge1N0YXRlfSBzdWJTdGF0ZSBpbiBzdWJzcGFjZSwgd2l0aCBzdWJTdGF0ZS5tZWFuLmxlbmd0aCA9PT0gb2JzSW5kZXhlcy5sZW5ndGhcblx0Ki9cblx0c3ViU3RhdGUob2JzSW5kZXhlczogbnVtYmVyW10pOiBTdGF0ZSB7XG5cdFx0Y29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoe1xuXHRcdFx0bWVhbjogb2JzSW5kZXhlcy5tYXAoaSA9PiB0aGlzLm1lYW5baV0pLFxuXHRcdFx0Y292YXJpYW5jZTogc3ViU3F1YXJlTWF0cml4KHRoaXMuY292YXJpYW5jZSwgb2JzSW5kZXhlcyksXG5cdFx0XHRpbmRleDogdGhpcy5pbmRleCxcblx0XHR9KTtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHQvKipcblx0KiBAdHlwZWRlZiB7T2JqZWN0fSBEZXRhaWxlZE1haGFsYW5vYmlzXG5cdCogQHByb3BlcnR5IHtBcnJheS48W051bWJlcl0+fSBkaWZmXG5cdCogQHByb3BlcnR5IHtBcnJheS48QXJyYXkuPE51bWJlcj4+fSBjb3ZhcmlhbmNlSW52ZXJ0XG5cdCogQHByb3BlcnR5IHtOdW1iZXJ9IHZhbHVlXG5cdCovXG5cdC8qKlxuXHQqIFNpbXBsZSBNYWxhaGFub2JpcyBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBkaXN0cmlidXRpb24gKHRoaXMpIGFuZCBhIHBvaW50XG5cdCogQHBhcmFtIHtBcnJheS48W051bWJlcl0+fSBwb2ludCBhIE54MSBtYXRyaXggcmVwcmVzZW50aW5nIGEgcG9pbnRcblx0KiBAcmV0dXJucyB7RGV0YWlsZWRNYWhhbGFub2Jpc31cblx0Ki9cblx0cmF3RGV0YWlsZWRNYWhhbGFub2Jpcyhwb2ludDogbnVtYmVyW11bXSk6IHtkaWZmOiBudW1iZXJbXVtdLCBjb3ZhcmlhbmNlSW52ZXJ0OiBudW1iZXJbXVtdLCB2YWx1ZTogbnVtYmVyfSB7XG5cdFx0Y29uc3QgZGlmZiA9IHN1YnRyYWN0KHRoaXMubWVhbiwgcG9pbnQpO1xuXHRcdHRoaXMuY2hlY2soKTtcblx0XHRjb25zdCBjb3ZhcmlhbmNlSW52ZXJ0ID0gaW52ZXJ0KHRoaXMuY292YXJpYW5jZSk7XG5cdFx0aWYgKGNvdmFyaWFuY2VJbnZlcnQgPT09IG51bGwpIHtcblx0XHRcdHRoaXMuY2hlY2soe2VpZ2VuOiB0cnVlfSk7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKGBDYW5ub3QgaW52ZXJ0IGNvdmFyaWFuY2UgJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvdmFyaWFuY2UpfWApKTtcblx0XHR9XG5cblx0XHRjb25zdCBkaWZmVHJhbnNwb3NlZCA9IHRyYW5zcG9zZShkaWZmKTtcblxuXHRcdC8vIENvbnNvbGUubG9nKCdjb3ZhcmlhbmNlIGluIG9icyBzcGFjZScsIGNvdmFyaWFuY2VJbk9ic2VydmF0aW9uU3BhY2UpO1xuXHRcdGNvbnN0IHZhbHVlTWF0cml4ID0gbWF0TXVsKFxuXHRcdFx0bWF0TXVsKGRpZmZUcmFuc3Bvc2VkLCBjb3ZhcmlhbmNlSW52ZXJ0KSxcblx0XHRcdGRpZmYsXG5cdFx0KTtcblx0XHQvLyBDYWxjdWxhdGUgdGhlIE1haGFsYW5vYmlzIGRpc3RhbmNlIHZhbHVlXG5cdFx0Y29uc3QgdmFsdWUgPSBNYXRoLnNxcnQodmFsdWVNYXRyaXhbMF1bMF0pO1xuXHRcdGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG5cdFx0XHRjb25zdCBkZWJ1Z1ZhbHVlID0gbWF0TXVsKFxuXHRcdFx0XHRtYXRNdWwoXG5cdFx0XHRcdFx0ZGlmZlRyYW5zcG9zZWQsXG5cdFx0XHRcdFx0Y292YXJpYW5jZUludmVydCxcblx0XHRcdFx0KSxcblx0XHRcdFx0ZGlmZixcblx0XHRcdCk7XG5cdFx0XHRjb25zb2xlLmxvZyh7XG5cdFx0XHRcdGRpZmYsIGNvdmFyaWFuY2VJbnZlcnQsIHRoaXM6IHRoaXMsIHBvaW50LFxuXHRcdFx0fSwgZGVidWdWYWx1ZSk7XG5cdFx0XHR0aHJvdyAobmV3IEVycm9yKCdtYWhhbGFub2JpcyBpcyBOYU4nKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGRpZmYsXG5cdFx0XHRjb3ZhcmlhbmNlSW52ZXJ0LFxuXHRcdFx0dmFsdWUsXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQqIE1hbGFoYW5vYmlzIGRpc3RhbmNlIGlzIG1hZGUgYWdhaW5zdCBhbiBvYnNlcnZhdGlvbiwgc28gdGhlIG1lYW4gYW5kIGNvdmFyaWFuY2Vcblx0KiBhcmUgcHJvamVjdGVkIGludG8gdGhlIG9ic2VydmF0aW9uIHNwYWNlXG5cdCogQHBhcmFtIHtLYWxtYW5GaWx0ZXJ9IGtmIGthbG1hbiBmaWx0ZXIgdXNlIHRvIHByb2plY3QgdGhlIHN0YXRlIGluIG9ic2VydmF0aW9uJ3Mgc3BhY2Vcblx0KiBAcGFyYW0ge09ic2VydmF0aW9ufSBvYnNlcnZhdGlvblxuXHQqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG9ic0luZGV4ZXMgbGlzdCBvZiBpbmRleGVzIG9mIG9ic2VydmF0aW9uIHN0YXRlIHRvIHVzZSBmb3IgdGhlIG1haGFsYW5vYmlzIGRpc3RhbmNlXG5cdCogQHJldHVybnMge0RldGFpbGVkTWFoYWxhbm9iaXN9XG5cdCovXG5cdGRldGFpbGVkTWFoYWxhbm9iaXMoYXJnczoge2tmOiBLYWxtYW5GaWx0ZXIsIG9ic2VydmF0aW9uOiBudW1iZXJbXVtdIHwgbnVtYmVyW10sIG9ic0luZGV4ZXM/OiBudW1iZXJbXX0pOiB7ZGlmZjogbnVtYmVyW11bXSwgY292YXJpYW5jZUludmVydDogbnVtYmVyW11bXSwgdmFsdWU6IG51bWJlcn0ge1xuXHRcdGNvbnN0IHtrZiwgb2JzZXJ2YXRpb24sIG9ic0luZGV4ZXN9ID0gYXJncztcblx0XHRpZiAob2JzZXJ2YXRpb24ubGVuZ3RoICE9PSBrZi5vYnNlcnZhdGlvbi5kaW1lbnNpb24pIHtcblx0XHRcdHRocm93IChuZXcgRXJyb3IoYE1haGFsYW5vYmlzIG9ic2VydmF0aW9uICR7b2JzZXJ2YXRpb259IChkaW1lbnNpb246ICR7b2JzZXJ2YXRpb24ubGVuZ3RofSkgZG9lcyBub3QgbWF0Y2ggd2l0aCBrZiBvYnNlcnZhdGlvbiBkaW1lbnNpb24gKCR7a2Yub2JzZXJ2YXRpb24uZGltZW5zaW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0bGV0IGNvcnJlY3RseVNpemVkT2JzZXJ2YXRpb24gPSBhcnJheVRvTWF0cml4KHtvYnNlcnZhdGlvbiwgZGltZW5zaW9uOiBvYnNlcnZhdGlvbi5sZW5ndGh9KTtcblx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRChrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdTdGF0ZS5kZXRhaWxlZE1haGFsYW5vYmlzJyk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qZWN0aW9uID0ga2YuZ2V0VmFsdWUoa2Yub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCB7fSkgIGFzIG51bWJlcltdW107XG5cblx0XHRsZXQgcHJvamVjdGVkU3RhdGUgPSBTdGF0ZS5tYXRNdWwoe3N0YXRlOiB0aGlzLCBtYXRyaXg6IHN0YXRlUHJvamVjdGlvbn0pO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JzSW5kZXhlcykpIHtcblx0XHRcdHByb2plY3RlZFN0YXRlID0gcHJvamVjdGVkU3RhdGUuc3ViU3RhdGUob2JzSW5kZXhlcyk7XG5cdFx0XHRjb3JyZWN0bHlTaXplZE9ic2VydmF0aW9uID0gb2JzSW5kZXhlcy5tYXAoaSA9PiBjb3JyZWN0bHlTaXplZE9ic2VydmF0aW9uW2ldKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvamVjdGVkU3RhdGUucmF3RGV0YWlsZWRNYWhhbGFub2Jpcyhjb3JyZWN0bHlTaXplZE9ic2VydmF0aW9uKTtcblx0fVxuXG5cdC8qKlxuXHQqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEBzZWUgZGV0YWlsZWRNYWhhbGFub2Jpc1xuXHQqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCovXG5cdG1haGFsYW5vYmlzKG9wdGlvbnM6IHtrZjogS2FsbWFuRmlsdGVyLCBvYnNlcnZhdGlvbjogbnVtYmVyW11bXSB8IG51bWJlcltdLCBvYnNJbmRleGVzPzogbnVtYmVyW119KTogbnVtYmVyIHtcblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLmRldGFpbGVkTWFoYWxhbm9iaXMob3B0aW9ucykudmFsdWU7XG5cdFx0aWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XG5cdFx0XHR0aHJvdyAobmV3IFR5cGVFcnJvcignbWFoYWxhbm9iaXMgaXMgTmFOJykpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCogQmhhdHRhY2hhcnl5YSBkaXN0YW5jZSBpcyBtYWRlIGFnYWluc3QgaW4gdGhlIG9ic2VydmF0aW9uIHNwYWNlXG5cdCogdG8gZG8gaXQgaW4gdGhlIG5vcm1hbCBzcGFjZSBzZWUgc3RhdGUuYmhhdHRhY2hhcnl5YVxuXHQqIEBwYXJhbSB7S2FsbWFuRmlsdGVyfSBrZiBrYWxtYW4gZmlsdGVyIHVzZSB0byBwcm9qZWN0IHRoZSBzdGF0ZSBpbiBvYnNlcnZhdGlvbidzIHNwYWNlXG5cdCogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcblx0KiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBvYnNJbmRleGVzIGxpc3Qgb2YgaW5kZXhlcyBvZiBvYnNlcnZhdGlvbiBzdGF0ZSB0byB1c2UgZm9yIHRoZSBiaGF0dGFjaGFyeXlhIGRpc3RhbmNlXG5cdCogQHJldHVybnMge051bWJlcn1cblx0Ki9cblx0b2JzQmhhdHRhY2hhcnl5YShvcHRpb25zOiB7a2Y6IEthbG1hbkZpbHRlciwgc3RhdGU6IFN0YXRlLCBvYnNJbmRleGVzOiBudW1iZXJbXX0pOiBudW1iZXIge1xuXHRcdGNvbnN0IHtrZiwgc3RhdGUsIG9ic0luZGV4ZXN9ID0gb3B0aW9ucztcblx0XHRUeXBlQXNzZXJ0LmFzc2VydElzQXJyYXkyRChrZi5vYnNlcnZhdGlvbi5zdGF0ZVByb2plY3Rpb24sICdTdGF0ZS5vYnNCaGF0dGFjaGFyeXlhJyk7XG5cdFx0Y29uc3Qgc3RhdGVQcm9qZWN0aW9uID0ga2YuZ2V0VmFsdWUoa2Yub2JzZXJ2YXRpb24uc3RhdGVQcm9qZWN0aW9uLCB7fSk7XG5cblx0XHRsZXQgcHJvamVjdGVkU2VsZlN0YXRlID0gU3RhdGUubWF0TXVsKHtzdGF0ZTogdGhpcywgbWF0cml4OiBzdGF0ZVByb2plY3Rpb24gYXMgbnVtYmVyW11bXX0pO1xuXHRcdGxldCBwcm9qZWN0ZWRPdGhlclN0YXRlID0gU3RhdGUubWF0TXVsKHtzdGF0ZSwgbWF0cml4OiBzdGF0ZVByb2plY3Rpb24gYXMgbnVtYmVyW11bXX0pO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JzSW5kZXhlcykpIHtcblx0XHRcdHByb2plY3RlZFNlbGZTdGF0ZSA9IHByb2plY3RlZFNlbGZTdGF0ZS5zdWJTdGF0ZShvYnNJbmRleGVzKTtcblx0XHRcdHByb2plY3RlZE90aGVyU3RhdGUgPSBwcm9qZWN0ZWRPdGhlclN0YXRlLnN1YlN0YXRlKG9ic0luZGV4ZXMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9qZWN0ZWRTZWxmU3RhdGUuYmhhdHRhY2hhcnl5YShwcm9qZWN0ZWRPdGhlclN0YXRlKTtcblx0fVxuXG5cdC8qKlxuXHQqIEBwYXJhbSB7U3RhdGV9IG90aGVyU3RhdGUgb3RoZXIgc3RhdGUgdG8gY29tcGFyZSB3aXRoXG5cdCogQHJldHVybnMge051bWJlcn1cblx0Ki9cblx0YmhhdHRhY2hhcnl5YShvdGhlclN0YXRlOiBTdGF0ZSk6IG51bWJlciB7XG5cdFx0Y29uc3Qge2NvdmFyaWFuY2UsIG1lYW59ID0gdGhpcztcblx0XHRjb25zdCBhdmVyYWdlID0gZWxlbVdpc2UoW2NvdmFyaWFuY2UsIG90aGVyU3RhdGUuY292YXJpYW5jZV0sIChbYSwgYl0pID0+IChhICsgYikgLyAyKTtcblxuXHRcdGxldCBjb3ZhckludmVydGVkOiBudW1iZXJbXVtdO1xuXHRcdHRyeSB7XG5cdFx0XHRjb3ZhckludmVydGVkID0gaW52ZXJ0KGF2ZXJhZ2UpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnQ2Fubm90IGludmVydCcsIGF2ZXJhZ2UpO1xuXHRcdFx0dGhyb3cgKGVycm9yIGFzIEVycm9yKTtcblx0XHR9XG5cblx0XHRjb25zdCBkaWZmID0gc3VidHJhY3QobWVhbiwgb3RoZXJTdGF0ZS5tZWFuKTtcblxuXHRcdHJldHVybiBtYXRNdWwodHJhbnNwb3NlKGRpZmYpLCBtYXRNdWwoY292YXJJbnZlcnRlZCwgZGlmZikpWzBdWzBdO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBkZWJ1Z1ZhbHVlKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gJ3VuZGVmaW5lZCc7XG5cdH1cblx0bGV0IGFzU3Rpcm5nID0gJyc7XG5cdGFzU3Rpcm5nID0gdHlwZW9mICh2YWx1ZSkgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS50b1N0cmluZygpIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRpZiAoYXNTdGlybmcubGVuZ3RoIDwgMTAwKVxuXHR7cmV0dXJuIGFzU3Rpcm5nO31cblx0cmV0dXJuIGFzU3Rpcm5nLnNsaWNlKDAsIDk3KSArICcuLi4nO1xufVxuXG5jbGFzcyBUeXBlQXNzZXJ0IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdkbyBub3QgY29uc3R1Y3QgbWUnKTtcblx0fVxuXG5cdGR1bW15KCk6IHZvaWQge31cblxuXHRzdGF0aWMgYXNzZXJ0Tm90QXJyYXk8VD4oYXJnOiBUIHwgVFtdLCBuYW1lID0gJ3BhcmFtZXRlcicpOiBhc3NlcnRzIGFyZyBpcyBUIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDAxICR7bmFtZX0gY2Fubm90IGJlIGFuIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXNzZXJ0SXNBcnJheTJEPFQ+KGFyZzogdW5rbm93biwgbmFtZSA9ICdwYXJhbWV0ZXInKTogYXNzZXJ0cyBhcmcgaXMgVFtdW10ge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDAyICR7bmFtZX0gaXMgbm90IGFuIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdFx0aWYgKGFyZy5sZW5ndGggPT09IDApXG5cdFx0e3JldHVybjt9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGFyZ1swXSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDMgJHtuYW1lfSBtdXN0IGJlIGFuIGFycmF5IG9mIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdFx0Ly8gQWxsb3cgdHlwZSBudW1iZXJbXVtdW11cblx0fVxuXG5cdHN0YXRpYyBhc3NlcnRJc0FycmF5MkRPckZuYzxUPihhcmc6IHVua25vd24sIG5hbWUgPSAncGFyYW1ldGVyJyk6IGFzc2VydHMgYXJnIGlzIFRbXVtdIHwgRnVuY3Rpb24ge1xuXHRcdGlmICh0eXBlb2YgKGFyZykgPT09ICdmdW5jdGlvbicpXG5cdFx0e3JldHVybjt9XG5cdFx0VHlwZUFzc2VydC5hc3NlcnRJc0FycmF5MkQoYXJnLCBuYW1lKTtcblx0fVxuXG5cdC8qKlxuICAgICAqIGVuc3VyZSB0aGF0IHRoZSBwcm92aWRlZCBhcmcgaXMgYSBudW1iZXIsIG51bWJlcltdLCBvciBudW1iZXJbXVtdXG4gICAgICogQHBhcmFtIGFyZ1xuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cblx0c3RhdGljIGFzc2VydElzTnVtYmVyc0FycmF5KGFyZzogdW5rbm93biwgbmFtZSA9ICdwYXJhbWV0ZXInKTogYXNzZXJ0cyBhcmcgaXMgbnVtYmVyW11bXSB8IG51bWJlcltdIHwgbnVtYmVyIHtcblx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCFUeXBlQXNzZXJ0LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRTAwNCAke25hbWV9IGlzIG5vdCBhbiBhcnJheS4gY3VycmVudCB2YWx1ZSBpcyAke2RlYnVnVmFsdWUoYXJnKX0uYCk7XG5cdFx0fVxuXHRcdGlmIChhcmcubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgYXJnWzBdID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIVR5cGVBc3NlcnQuaXNBcnJheShhcmdbMF0pKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDA1ICR7bmFtZX0gaXMgbm90IGFuIGFycmF5IG9mIGFycmF5LiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiAoYXJnWzBdWzBdKSAhPT0gJ251bWJlcicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEUwMDYgJHtuYW1lfSBpcyBub3QgYW4gYXJyYXkgb2YgYXJyYXkgb2YgbnVtYmVyLiBjdXJyZW50IHZhbHVlIGlzICR7ZGVidWdWYWx1ZShhcmcpfS5gKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgaXNBcnJheTJEKG9iajogdW5rbm93bik6IG9iaiBpcyBudW1iZXJbXVtdIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkob2JqKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gKEFycmF5LmlzQXJyYXkob2JqWzBdKSk7XG5cdH1cblxuXHRzdGF0aWMgaXNBcnJheTFEKG9iajogdW5rbm93bik6IG9iaiBpcyBudW1iZXJbXSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KG9iaikpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuICh0eXBlb2YgKG9ialswXSkgPT09ICdudW1iZXInKTtcblx0fVxuXG5cdHN0YXRpYyBpc0FycmF5PFQ+KG9iajogVCB8IFRbXSk6IG9iaiBpcyBUW10ge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShvYmopKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0c3RhdGljIGlzRnVuY3Rpb24oYXJnOiB1bmtub3duKTogIGFyZyBpcyBGdW5jdGlvbiB7XG5cdFx0aWYgKHR5cGVvZiAoYXJnKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHQvLyB0aHJvdyBuZXcgVHlwZUVycm9yKGBFMDAwICR7bmFtZX0gY2Fubm90IGJlIGEgZnVjbnRpb24uIGN1cnJlbnQgdmFsdWUgaXMgJHtkZWJ1Z1ZhbHVlKGFyZyl9LmApO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBlQXNzZXJ0O1xuXG4iLCIvKipcbipSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIG1hdHJpeCBpbiBkaW0qMSwgZ2l2ZW4gYW4gZGltIG1hdHJpeCwgYW5kIGNoZWNrc1xuKiBpZiBjb3JyZXNwb25kaW5nIHdpdGggdGhlIG9ic2VydmF0aW9uIGRpbWVuc2lvblxuKkBwYXJhbSB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBvYnNlcnZhdGlvblxuKkBwYXJhbSB7TnVtYmVyfSBkaW1lbnNpb25cbipAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn1cbiovXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheVRvTWF0cml4KGFyZ3M6IHtvYnNlcnZhdGlvbjogbnVtYmVyLCBkaW1lbnNpb246IDF9KTogbnVtYmVyW11bXTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5VG9NYXRyaXgoYXJnczoge29ic2VydmF0aW9uOiBudW1iZXIgfCBudW1iZXJbXSB8IG51bWJlcltdW10sIGRpbWVuc2lvbjogbnVtYmVyfSk6IG51bWJlcltdW10ge1xuXHRjb25zdCB7b2JzZXJ2YXRpb24sIGRpbWVuc2lvbn0gPSBhcmdzO1xuXHRpZiAoIUFycmF5LmlzQXJyYXkob2JzZXJ2YXRpb24pKSB7XG5cdFx0aWYgKGRpbWVuc2lvbiA9PT0gMSAmJiB0eXBlb2YgKG9ic2VydmF0aW9uKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdHJldHVybiBbW29ic2VydmF0aW9uXV07XG5cdFx0fVxuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBUaGUgb2JzZXJ2YXRpb24gKCR7b2JzZXJ2YXRpb259KSBzaG91bGQgYmUgYW4gYXJyYXkgKGRpbWVuc2lvbjogJHtkaW1lbnNpb259KWApKTtcblx0fVxuXG5cdGlmIChvYnNlcnZhdGlvbi5sZW5ndGggIT09IGRpbWVuc2lvbikge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBPYnNlcnZhdGlvbiAoJHtvYnNlcnZhdGlvbi5sZW5ndGh9KSBhbmQgZGltZW5zaW9uICgke2RpbWVuc2lvbn0pIG5vdCBtYXRjaGluZ2ApKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKG9ic2VydmF0aW9uWzBdKSA9PT0gJ251bWJlcicgfHwgb2JzZXJ2YXRpb25bMF0gPT09IG51bGwpIHtcblx0XHRyZXR1cm4gKG9ic2VydmF0aW9uIGFzIG51bWJlcltdKS5tYXAoZWxlbWVudCA9PiBbZWxlbWVudF0pO1xuXHR9XG5cblx0cmV0dXJuIG9ic2VydmF0aW9uIGFzIG51bWJlcltdW107XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJ0ByYXl5YW1oay9tYXRyaXgnO1xuaW1wb3J0IGNoZWNrTWF0cml4IGZyb20gJy4vY2hlY2stbWF0cml4JztcblxuY29uc3QgdG9sZXJhbmNlID0gMC4xO1xuXG5jb25zdCBjaGVja0RlZmluaXRlUG9zaXRpdmUgPSBmdW5jdGlvbiAoY292YXJpYW5jZTogbnVtYmVyW11bXSwgdG9sZXJhbmNlID0gMWUtMTApIHtcblx0Y29uc3QgY292YXJpYW5jZU1hdHJpeCA9IG5ldyBNYXRyaXgoY292YXJpYW5jZSk7XG5cdGNvbnN0IGVpZ2VudmFsdWVzID0gY292YXJpYW5jZU1hdHJpeC5laWdlbnZhbHVlcygpO1xuXHRmb3IgKGNvbnN0IGVpZ2VudmFsdWUgb2YgZWlnZW52YWx1ZXMpIHtcblx0XHRpZiAoZWlnZW52YWx1ZSA8PSAtdG9sZXJhbmNlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhjb3ZhcmlhbmNlLCBlaWdlbnZhbHVlKTtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRWlnZW52YWx1ZSBzaG91bGQgYmUgcG9zaXRpdmUgKGFjdHVhbDogJHtlaWdlbnZhbHVlfSlgKTtcblx0XHR9XG5cdH1cblxuXHRjb25zb2xlLmxvZygnaXMgZGVmaW5pdGUgcG9zaXRpdmUnLCBjb3ZhcmlhbmNlKTtcbn07XG5cbmNvbnN0IGNoZWNrU3ltZXRyaWMgPSBmdW5jdGlvbiAoY292YXJpYW5jZSwgdGl0bGUgPSAnY2hlY2tTeW1ldHJpYycpIHtcblx0Zm9yIChjb25zdCBbcm93SWQsIHJvd10gb2YgY292YXJpYW5jZS5lbnRyaWVzKCkpIHtcblx0XHRmb3IgKGNvbnN0IFtjb2xJZCwgaXRlbV0gb2Ygcm93LmVudHJpZXMoKSkge1xuXHRcdFx0aWYgKHJvd0lkID09PSBjb2xJZCAmJiBpdGVtIDwgMCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gVmFyaWFuY2VbJHtjb2xJZH1dIHNob3VsZCBiZSBwb3NpdGl2ZSAoYWN0dWFsOiAke2l0ZW19KWApO1xuXHRcdFx0fSBlbHNlIGlmIChNYXRoLmFicyhpdGVtKSA+IE1hdGguc3FydChjb3ZhcmlhbmNlW3Jvd0lkXVtyb3dJZF0gKiBjb3ZhcmlhbmNlW2NvbElkXVtjb2xJZF0pKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGNvdmFyaWFuY2UpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFske3RpdGxlfV0gQ292YXJpYW5jZVske3Jvd0lkfV1bJHtjb2xJZH1dIHNob3VsZCB2ZXJpZnkgQ2F1Y2h5IFNjaHdhcnogSW5lcXVhbGl0eSBgXG5cdFx0XHRcdCsgYChleHBlY3RlZDogfHh8IDw9IHNxcnQoJHtjb3ZhcmlhbmNlW3Jvd0lkXVtyb3dJZF19ICogJHtjb3ZhcmlhbmNlW2NvbElkXVtjb2xJZF19KWBcblx0XHRcdFx0KyBgIGFjdHVhbDogJHtpdGVtfSlgKTtcblx0XHRcdH0gZWxzZSBpZiAoTWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSkgPiB0b2xlcmFuY2UpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbJHt0aXRsZX1dIENvdmFyaWFuY2VbJHtyb3dJZH1dWyR7Y29sSWR9XSBzaG91bGQgZXF1YWwgQ292YXJpYW5jZVske2NvbElkfV1bJHtyb3dJZH1dIGBcblx0XHRcdCsgYCAoYWN0dWFsIGRpZmY6ICR7TWF0aC5hYnMoaXRlbSAtIGNvdmFyaWFuY2VbY29sSWRdW3Jvd0lkXSl9KSAgPSAke2l0ZW19IC0gJHtjb3ZhcmlhbmNlW2NvbElkXVtyb3dJZF19XFxuYFxuXHRcdFx0KyBgJHtjb3ZhcmlhbmNlLmpvaW4oJ1xcbicpfSBpcyBpbnZhbGlkYCxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQ292YXJpYW5jZShhcmdzOiB7Y292YXJpYW5jZTogbnVtYmVyW11bXSwgZWlnZW4/OiBib29sZWFufSwgX3RpdGxlPzogc3RyaW5nKSB7XG5cdGNvbnN0IHtjb3ZhcmlhbmNlLCBlaWdlbiA9IGZhbHNlfSA9IGFyZ3M7XG5cdGNoZWNrTWF0cml4KGNvdmFyaWFuY2UpO1xuXHRjaGVja1N5bWV0cmljKGNvdmFyaWFuY2UpO1xuXHRpZiAoZWlnZW4pIHtcblx0XHRjaGVja0RlZmluaXRlUG9zaXRpdmUoY292YXJpYW5jZSk7XG5cdH1cbn1cbiIsImltcG9ydCBjaGVja1NoYXBlIGZyb20gJy4vY2hlY2stc2hhcGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja01hdHJpeChtYXRyaXg6IG51bWJlcltdW10sIHNoYXBlPzogbnVtYmVyW10sIHRpdGxlID0gJ2NoZWNrTWF0cml4Jykge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkobWF0cml4KSkge1xuXHRcdHRocm93IChuZXcgVHlwZUVycm9yKGBbJHt0aXRsZX1dIHNob3VsZCBiZSBhIDItbGV2ZWwgYXJyYXkgbWF0cml4IGFuZCBpcyAke21hdHJpeH1gKSk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHJvdyBvZiBtYXRyaXgpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocm93KSkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYFske3RpdGxlfV0gMS1sZXZlbCBhcnJheSBzaG91bGQgYmUgYSBtYXRyaXggJHtKU09OLnN0cmluZ2lmeShtYXRyaXgpfWApKTtcblx0XHR9XG5cdH1cblxuXHRpZiAobWF0cml4LnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpLnNvbWUoYSA9PiBOdW1iZXIuaXNOYU4oYSkpKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihcblx0XHRcdGBbJHt0aXRsZX1dIE1hdHJpeCBzaG91bGQgbm90IGhhdmUgYSBOYU5cXG5JbiA6IFxcbmBcblx0XHRcdCsgbWF0cml4LmpvaW4oJ1xcbicpLFxuXHRcdCkpO1xuXHR9XG5cblx0aWYgKHNoYXBlKSB7XG5cdFx0Y2hlY2tTaGFwZShtYXRyaXgsIHNoYXBlLCB0aXRsZSk7XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hhcGUobWF0cml4OiBhbnlbXSwgc2hhcGU6IG51bWJlcltdLCB0aXRsZSA9ICdjaGVja1NoYXBlJykge1xuXHRpZiAobWF0cml4Lmxlbmd0aCAhPT0gc2hhcGVbMF0pIHtcblx0XHR0aHJvdyAobmV3IEVycm9yKGBbJHt0aXRsZX1dIGV4cGVjdGVkIHNpemUgKCR7c2hhcGVbMF19KSBhbmQgbGVuZ3RoICgke21hdHJpeC5sZW5ndGh9KSBkb2VzIG5vdCBtYXRjaGApKTtcblx0fVxuXG5cdGlmIChzaGFwZS5sZW5ndGggPiAxKSB7XG5cdFx0cmV0dXJuIG1hdHJpeC5mb3JFYWNoKG0gPT4gY2hlY2tTaGFwZShtLCBzaGFwZS5zbGljZSgxKSwgdGl0bGUpKTtcblx0fVxufVxuIiwiaW1wb3J0IGNoZWNrQ292YXJpYW5jZSBmcm9tICcuL2NoZWNrLWNvdmFyaWFuY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3JyZWxhdGlvblRvQ292YXJpYW5jZSh7Y29ycmVsYXRpb24sIHZhcmlhbmNlfSkge1xuXHRjaGVja0NvdmFyaWFuY2Uoe2NvdmFyaWFuY2U6IGNvcnJlbGF0aW9ufSk7XG5cdHJldHVybiBjb3JyZWxhdGlvbi5tYXAoKGMsIHJvd0luZGV4KSA9PiBjLm1hcCgoYSwgY29sSW5kZXgpID0+IGEgKiBNYXRoLnNxcnQodmFyaWFuY2VbY29sSW5kZXhdICogdmFyaWFuY2Vbcm93SW5kZXhdKSkpO1xufVxuIiwiaW1wb3J0IGNoZWNrQ292YXJpYW5jZSBmcm9tICcuL2NoZWNrLWNvdmFyaWFuY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb3ZhcmlhbmNlVG9Db3JyZWxhdGlvbihjb3ZhcmlhbmNlKSB7XG5cdGNoZWNrQ292YXJpYW5jZSh7Y292YXJpYW5jZX0pO1xuXHRjb25zdCB2YXJpYW5jZSA9IGNvdmFyaWFuY2UubWFwKChfLCBpKSA9PiBjb3ZhcmlhbmNlW2ldW2ldKTtcblxuXHRyZXR1cm4ge1xuXHRcdHZhcmlhbmNlLFxuXHRcdGNvcnJlbGF0aW9uOiBjb3ZhcmlhbmNlLm1hcCgoYywgcm93SW5kZXgpID0+IGMubWFwKChhLCBjb2xJbmRleCkgPT4gYSAvIE1hdGguc3FydCh2YXJpYW5jZVtjb2xJbmRleF0gKiB2YXJpYW5jZVtyb3dJbmRleF0pKSksXG5cdH07XG59XG4iLCJpbXBvcnQgdW5pcSBmcm9tICcuL3VuaXEnO1xuXG5jb25zdCBsaW1pdCA9IDEwMDtcblxuLyoqXG4qRXF1aXZhbGVudCB0byB0aGUgT2JqZWN0LmFzc2lnbiBtZXRob2QsIHRha2VzIHNldmVyYWwgYXJndW1lbnRzIGFuZCBjcmVhdGVzIGEgbmV3IG9iamVjdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBhc3NpZ25tZW50IG9mIHRoZSBhcmd1bWVudHNcbiogQHBhcmFtIHtPYmplY3R9IGFyZ3NcbiogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBcbiogQHJldHVybnMge09iamVjdH1cbiovXG5mdW5jdGlvbiBkZWVwQXNzaWduSW50ZXJuYWwoYXJnczogYW55W10sIHN0ZXA6IG51bWJlcik6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xuXHRpZiAoc3RlcCA+IGxpbWl0KSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcihgSW4gZGVlcEFzc2lnbiwgbnVtYmVyIG9mIHJlY3Vyc2l2ZSBjYWxsICgke3N0ZXB9KSByZWFjaGVkIGxpbWl0ICgke2xpbWl0fSksIGRlZXBBc3NpZ24gaXMgbm90IHdvcmtpbmcgb24gIHNlbGYtcmVmZXJlbmNpbmcgb2JqZWN0c2ApKTtcblx0fVxuXG5cdGNvbnN0IGZpbHRlckFyZ3VtZW50cyA9IGFyZ3MuZmlsdGVyKGFyZyA9PiAoYXJnKSAhPT0gdW5kZWZpbmVkICYmIGFyZyAhPT0gbnVsbCk7XG5cdGNvbnN0IGxhc3RBcmd1bWVudCA9IGZpbHRlckFyZ3VtZW50cy5hdCgtMSk7XG5cdGlmIChmaWx0ZXJBcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGZpbHRlckFyZ3VtZW50c1swXTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGxhc3RBcmd1bWVudCkgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkobGFzdEFyZ3VtZW50KSkge1xuXHRcdHJldHVybiBsYXN0QXJndW1lbnQ7XG5cdH1cblxuXHRpZiAoZmlsdGVyQXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3Qgb2JqZWN0c0FyZ3VtZW50cyA9IGZpbHRlckFyZ3VtZW50cy5maWx0ZXIoYXJnID0+IHR5cGVvZiAoYXJnKSA9PT0gJ29iamVjdCcpO1xuXHRsZXQga2V5cyA9IFtdO1xuXHRmb3IgKGNvbnN0IGFyZyBvZiBvYmplY3RzQXJndW1lbnRzKSB7XG5cdFx0a2V5cyA9IGtleXMuY29uY2F0KE9iamVjdC5rZXlzKGFyZykpO1xuXHR9XG5cblx0Y29uc3QgdW5pcUtleXMgPSB1bmlxKGtleXMpO1xuXHRjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcblx0Zm9yIChjb25zdCBrZXkgb2YgdW5pcUtleXMpIHtcblx0XHRjb25zdCB2YWx1ZXMgPSBvYmplY3RzQXJndW1lbnRzLm1hcChhcmcgPT4gYXJnW2tleV0pO1xuXHRcdHJlc3VsdFtrZXldID0gZGVlcEFzc2lnbkludGVybmFsKHZhbHVlcywgc3RlcCArIDEpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVlcEFzc2lnbiguLi5hcmdzOiBhbnlbXSk6IGFueSB7IHJldHVybiBkZWVwQXNzaWduSW50ZXJuYWwoYXJncywgMCk7fVxuIiwiLyoqXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5tZWFzdXJlcyBhIGxpc3Qgb2YgbWVhc3VyZSwgc2l6ZSBpcyBMeE4gTCB0aGUgbnVtYmVyIG9mIHNhbXBsZSwgTiB0aGUgZGltZW5zaW9uXG4qIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gb3B0cy5hdmVyYWdlcyBhIGxpc3Qgb2YgYXZlcmFnZXMsIHNpemUgaXMgTHhOIEwgdGhlIG51bWJlciBvZiBzYW1wbGUsIE4gdGhlIGRpbWVuc2lvblxuKiBAcmV0dXJucyB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gY292YXJpYW5jZSBtYXRyaXggc2l6ZSBpcyBOeE5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvdmFyaWFuY2Uoe21lYXN1cmVzLCBhdmVyYWdlc30pIHtcblx0Y29uc3QgbCA9IG1lYXN1cmVzLmxlbmd0aDtcblx0Y29uc3QgbiA9IG1lYXN1cmVzWzBdLmxlbmd0aDtcblxuXHRpZiAobCA9PT0gMCkge1xuXHRcdHRocm93IChuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGNvdmFyaWFuY2UgZm9yIGVtcHR5IHNhbXBsZScpKTtcblx0fVxuXG5cdHJldHVybiAobmV3IEFycmF5KG4pLmZpbGwoMSkpLm1hcCgoXywgcm93SW5kZXgpID0+IChuZXcgQXJyYXkobikuZmlsbCgxKSkubWFwKChfLCBjb2xJbmRleCkgPT4ge1xuXHRcdGNvbnN0IHN0ZHMgPSBtZWFzdXJlcy5tYXAoKG0sIGkpID0+IChtW3Jvd0luZGV4XSAtIGF2ZXJhZ2VzW2ldW3Jvd0luZGV4XSkgKiAobVtjb2xJbmRleF0gLSBhdmVyYWdlc1tpXVtjb2xJbmRleF0pKTtcblx0XHRjb25zdCByZXN1bHQgPSBzdGRzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpIC8gbDtcblx0XHRpZiAoTnVtYmVyLmlzTmFOKHJlc3VsdCkpIHtcblx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdyZXN1bHQgaXMgTmFOJykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pKTtcbn1cbiIsImltcG9ydCB7ZGlhZ30gZnJvbSAnc2ltcGxlLWxpbmFsZyc7XG5pbXBvcnQgY2hlY2tNYXRyaXggZnJvbSAnLi9jaGVjay1tYXRyaXgnO1xuaW1wb3J0IFR5cGVBc3NlcnQgZnJvbSAnLi4vdHlwZXMvVHlwZUFzc2VydCc7XG5pbXBvcnQge1ByZXZpb3VzQ29ycmVjdGVkQ2FsbGJhY2t9IGZyb20gJy4uL3R5cGVzL09ic2VydmF0aW9uQ29uZmlnJztcblxuLyoqXG4qIElmIGNvdiBpcyBhIG51bWJlciwgcmVzdWx0IHdpbGwgYmUgSWRlbnRpdHkqY292XG4qIElmIGNvdiBpcyBhbiBOdW1iZXJbXSwgcmVzdWx0IHdpbGwgYmUgZGlhZyhjb3YpXG4qIElmIGNvdiBpcyBhbiBOdW1iZXJbXVtdLCByZXN1bHQgd2lsbCBiZSBjb3ZcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwb2x5bW9ycGhNYXRyaXgoY292OiBudW1iZXIgfCBudW1iZXJbXSB8IG51bWJlcltdW10gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrLCBvcHRzOiB7ZGltZW5zaW9uPzogbnVtYmVyLCB0aXRsZT86IHN0cmluZ30gPSB7fSk6IG51bWJlcltdW10gfCBQcmV2aW91c0NvcnJlY3RlZENhbGxiYWNrIHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qge2RpbWVuc2lvbiwgdGl0bGUgPSAncG9seW1vcnBoJ30gPSBvcHRzO1xuXHQvL2lmICghY292KSB7XG5cdC8vXHRyZXR1cm4gdW5kZWZpbmVkO1xuXHQvL31cblx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgfHwgQXJyYXkuaXNBcnJheShjb3YpKSB7XG5cdFx0aWYgKHR5cGVvZiAoY292KSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIChkaW1lbnNpb24pID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGRpYWcobmV3IEFycmF5KGRpbWVuc2lvbikuZmlsbChjb3YpKTtcblx0XHR9XG5cblx0XHRpZiAoVHlwZUFzc2VydC5pc0FycmF5MkQoY292KSkge1xuXHRcdFx0bGV0IHNoYXBlOiBbbnVtYmVyLCBudW1iZXJdO1xuXHRcdFx0aWYgKHR5cGVvZiAoZGltZW5zaW9uKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0c2hhcGUgPSBbZGltZW5zaW9uLCBkaW1lbnNpb25dO1xuXHRcdFx0fVxuXHRcdFx0Y2hlY2tNYXRyaXgoY292LCBzaGFwZSwgdGl0bGUpO1xuXHRcdFx0cmV0dXJuIGNvdjtcblx0XHR9XG5cblx0XHRpZiAoVHlwZUFzc2VydC5pc0FycmF5MUQoY292KSkge1xuXHRcdFx0cmV0dXJuIGRpYWcoY292KTtcblx0XHR9XG5cdH1cblx0Ly8gdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IHR5cGUgaW4gcG9seW1vcnBoTWF0cml4IGdldCAnICsgSlNPTi5zdHJpbmdpZnkoY292KS5zbGljZSgwLCAxMDApKTtcblx0cmV0dXJuIGNvdiBhcyBudW1iZXJbXVtdIHwgUHJldmlvdXNDb3JyZWN0ZWRDYWxsYmFjayB8IHVuZGVmaW5lZDtcbn1cbiIsIi8vIEZyb20gb2JzZXJ2YXRpb25UcmFja3MgdG8gbW92aW5nQXZlcmFnZUdyb3VuZFRydXRoc1N0YXRlcyB3aXRoIHNwZWVkXG5cbmltcG9ydCB7bWF0TXVsLCBpbnZlcnR9IGZyb20gJ3NpbXBsZS1saW5hbGcnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9qZWN0T2JzZXJ2YXRpb24oe29ic2VydmF0aW9uLCBvYnNJbmRleGVzLCBzZWxlY3RlZFN0YXRlUHJvamVjdGlvbiwgaW52ZXJ0U2VsZWN0ZWRTdGF0ZVByb2plY3Rpb259KSB7XG5cdGlmICghb2JzZXJ2YXRpb24pIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IHZhbHVlID0gb2JzZXJ2YXRpb24ub2JzZXJ2YXRpb24gfHwgb2JzZXJ2YXRpb247XG5cblx0Y29uc3QgdmVjID0gb2JzSW5kZXhlcy5tYXAoaSA9PiB7XG5cdFx0aWYgKCh2YWx1ZVtpXSkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgKG5ldyBUeXBlRXJyb3IoYG9ic0luZGV4ZXMgKCR7b2JzSW5kZXhlc30pIGlzIG5vdCBtYXRjaGluZyB3aXRoIG9ic2VydmF0aW9uICgke29ic2VydmF0aW9ufSlgKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFt2YWx1ZVtpXV07XG5cdH0pO1xuXG5cdGNvbnN0IGludmVyc2UgPSBpbnZlcnRTZWxlY3RlZFN0YXRlUHJvamVjdGlvbiB8fCBpbnZlcnQoc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24pO1xuXG5cdGlmIChpbnZlcnNlID09PSBudWxsKSB7XG5cdFx0dGhyb3cgKG5ldyBFcnJvcignc2VsZWN0ZWRTdGF0ZVByb2plY3Rpb24gaXMgbm90IGludmVydGlibGUsIHBsZWFzZSBwcm92aWRlIGludmVydFNlbGVjdGVkU3RhdGVQcm9qZWN0aW9uJykpO1xuXHR9XG5cblx0Y29uc3Qgb3V0ID0gbWF0TXVsKGludmVyc2UsIHZlYyk7XG5cblx0cmV0dXJuIG91dFxuXHRcdC5tYXAodiA9PiB2WzBdKVxuXHRcdC5tYXAodiA9PiB7XG5cdFx0XHRpZiAoTnVtYmVyLmlzTmFOKHYpKSB7XG5cdFx0XHRcdHRocm93IChuZXcgVHlwZUVycm9yKCdOYU4gaW4gcHJvamVjdGlvbicpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHY7XG5cdFx0fSk7XG59XG4iLCIvLyBDb25zdCB7ZGlhZ30gPSByZXF1aXJlKCdzaW1wbGUtbGluYWxnJyk7O1xuXG4vKipcbiogQGNhbGxiYWNrIE1hdHJpeENhbGxiYWNrXG4qIEByZXR1cm5zIDxBcnJheS48QXJyYXkuPE51bWJlcj4+XG4qL1xuXG4vKipcbiogVHJhbmZvcm1zOlxuKiogYSAyZCBhcnJheSBpbnRvIGEgZnVuY3Rpb24gKCgpID0+IGFycmF5KVxuKiogYSAxZCBhcnJheSBpbnRvIGEgZnVuY3Rpb24gKCgpID0+IGRpYWcoYXJyYXkpKVxuKkBwYXJhbSB7QXJyYXkuPE51bWJlcj4gfCBBcnJheS48QXJyYXkuPE51bWJlcj4+fSBhcnJheVxuKkByZXR1cm5zIHtNYXRyaXhDYWxsYmFja31cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRnVuY3Rpb24oYXJyYXksIHtsYWJlbCA9ICcnfSA9IHt9KSB7XG5cdGlmICh0eXBlb2YgKGFycmF5KSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdHRocm93IChuZXcgRXJyb3IoYCR7bGFiZWwgPT09IG51bGwgPyAnJyA6IGxhYmVsICsgJyA6ICd9T25seSBhcnJheXMgYW5kIGZ1bmN0aW9ucyBhcmUgYXV0aG9yaXplZCAoZ290OiBcIiR7YXJyYXl9XCIpYCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcShhcnJheSkge1xuXHRyZXR1cm4gYXJyYXkuZmlsdGVyKCh2YWx1ZSwgaW5kZXgpID0+XG5cdFx0YXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4LFxuXHQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
