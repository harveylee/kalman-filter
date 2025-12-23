const lZ = Object.create; const {getPrototypeOf: mZ, defineProperty: f0, getOwnPropertyNames: sZ} = Object; const tZ = Object.prototype.hasOwnProperty; const g = (J, Y, K) => {
	K = J == null ? {} : lZ(mZ(J)); const Z = Y || !J || !J.__esModule ? f0(K, 'default', {value: J, enumerable: !0}) : K; for (const G of sZ(J)) {
		if (!tZ.call(Z, G)) {
			f0(Z, G, {get: () => J[G], enumerable: !0});
		}
	}

	return Z;
};

const $ = (J, Y) => () => (Y || J((Y = {exports: {}}).exports, Y), Y.exports); const R1 = (J, Y) => {
	for (var K in Y) {
		f0(J, K, {
			get: Y[K], enumerable: !0, configurable: !0, set: Z => Y[K] = () => Z,
		});
	}
};

const U0 = $((TF, f1) => {
	f1.exports = function (Y, K) {
		return Y[0].map((Z, G) => Z.map((F, Q) => {
			const W = Y.map(X => X[G][Q]); return K(W, G, Q);
		}));
	};
}); const T1 = $((LF, I1) => {
	const nZ = U0(); I1.exports = function (...Y) {
		return nZ(Y, K => K.reduce((Z, G) => {
			if (Z === null || G === null) {
				return null;
			}

			return Z + G;
		}, 0));
	};
}); const L0 = $((wF, L1) => {
	L1.exports = function (Y, K) {
		if (Y.length !== K.length) {
			throw new Error('Lengths not maching');
		}

		let Z = 0; for (const [G, F] of Y.entries()) {
			Z += F * K[G];
		}

		return Z;
	};
}); const w0 = $((CF, w1) => {
	w1.exports = function (Y) {
		let K = 0; for (const Z of Y) {
			K += Z * Z;
		}

		return Math.sqrt(K);
	};
}); const h1 = $((MF, M1) => {
	const oZ = L0(); const C1 = w0(); M1.exports = function (Y, K) {
		if (Y.length !== K.length) {
			throw new Error('The lengths of the vectors do not match');
		}

		const Z = C1(Y) * C1(K); if (Z === 0) {
			return 0;
		}

		return oZ(Y, K) / Z;
	};
}); const A1 = $((hF, g1) => {
	g1.exports = function (Y, K) {
		if (Y.length !== K.length) {
			throw new Error('Invalid array lengths');
		}

		if (!Array.isArray(Y)) {
			throw console.log({array1: Y}), new Error('Invalid array');
		}

		const Z = Y.map((G, F) => G - K[F]).map(G => G * G); return Math.sqrt(Z.reduce((G, F) => G + F));
	};
}); const C0 = $((gF, v1) => {
	v1.exports = function (Y, K) {
		return new Array(Y).fill(1).map(() => new Array(K).fill(0));
	};
}); const j1 = $((AF, y1) => {
	const aZ = C0(); y1.exports = function (Y) {
		const K = aZ(Y.length, Y.length); for (const [Z, G] of Y.entries()) {
			K[Z][Z] = G;
		}

		return K;
	};
}); const M0 = $((vF, b1) => {
	b1.exports = function (Y) {
		const K = []; for (let Z = 0; Z < Y; Z++) {
			const G = []; for (let F = 0; F < Y; F++) {
				if (Z === F) {
					G.push(1);
				} else {
					G.push(0);
				}
			}

			K.push(G);
		}

		return K;
	};
}); const p1 = $((yF, x1) => {
	const eZ = M0(); x1.exports = function ({blocks: Y, order: K = null}) {
		const Z = Y.map(Q => Q.length).reduce((Q, W) => Q + W, 0); const G = eZ(Z); let F = 0; for (const Q of Y) {
			for (const [W] of Q.entries()) {
				for (const [X] of Q.entries()) {
					G[W + F][X + F] = Q[W][X];
				}
			}

			F += Q.length;
		}

		if (K) {
			return K.map(Q => K.map(W => G[Q][W]));
		}

		return G;
	};
}); const h0 = $((jF, d1) => {
	d1.exports = function (Y) {
		let K = 0; for (const [Z, G] of Y.entries()) {
			K += G[Z];
		}

		return K;
	};
}); const g0 = $((bF, u1) => {
	u1.exports = function (Y) {
		return Y[0].map((K, Z) => Y.map(G => G[Z]));
	};
}); const A0 = $((xF, c1) => {
	const iZ = U0(); c1.exports = function (...Y) {
		return iZ(Y, ([K, Z]) => K - Z);
	};
}); const v0 = $((pF, _1) => {
	_1.exports = function (Y, K) {
		const Z = []; for (let G = 0; G < Y.length; G++) {
			Z[G] = []; for (let F = 0; F < K[0].length; F++) {
				let Q = 0; let W = !1; for (let X = 0; X < Y[0].length; X++) {
					if (Y[G][X] === null && K[X][F] !== 0 || K[X][F] === null && Y[G][X] !== 0) {
						W = !0; break;
					}

					Q += Y[G][X] * K[X][F];
				}

				Z[G][F] = W ? null : Q;
			}
		}

		return Z;
	};
}); const y0 = $((dF, l1) => {
	l1.exports = function (Y) {
		let K = 0; for (const Z of Y) {
			K += Z;
		}

		return K;
	};
}); const j0 = $((uF, m1) => {
	const rZ = y0(); m1.exports = function (Y) {
		let K = 0; for (const Z of Y) {
			K += rZ(Z);
		}

		return K;
	};
}); const n1 = $((cF, t1) => {
	const J7 = h0(); const Y7 = g0(); const K7 = A0(); const Z7 = v0(); const s1 = j0(); t1.exports = function (Y, K) {
		if (Y === void 0) {
			return s1(K);
		}

		if (K === void 0) {
			return s1(Y);
		}

		const Z = K7(Y, K); const G = Z7(Y7(Z), Z); return Math.sqrt(J7(G));
	};
}); const a1 = $((_F, o1) => {
	const x = {}; x.Matrix = function () {}; x.Matrix.create = function (J) {
		const Y = new x.Matrix(); return Y.setElements(J);
	};

	x.Matrix.I = function (J) {
		const Y = []; let K = J; let Z; while (K--) {
			Z = J, Y[K] = []; while (Z--) {
				Y[K][Z] = K === Z ? 1 : 0;
			}
		}

		return x.Matrix.create(Y);
	};

	x.Matrix.prototype = {
		dup: function () {
			return x.Matrix.create(this.elements);
		}, isSquare: function () {
			const J = this.elements.length === 0 ? 0 : this.elements[0].length; return this.elements.length === J;
		}, toRightTriangular: function () {
			if (this.elements.length === 0) {
				return x.Matrix.create([]);
			}

			const J = this.dup(); let Y; const K = this.elements.length; let Z; let G; const F = this.elements[0].length; let Q; for (Z = 0; Z < K; Z++) {
				if (J.elements[Z][Z] === 0) {
					for (G = Z + 1; G < K; G++) {
						if (J.elements[G][Z] !== 0) {
							Y = []; for (Q = 0; Q < F; Q++) {
								Y.push(J.elements[Z][Q] + J.elements[G][Q]);
							}

							J.elements[Z] = Y; break;
						}
					}
				}

				if (J.elements[Z][Z] !== 0) {
					for (G = Z + 1; G < K; G++) {
						const W = J.elements[G][Z] / J.elements[Z][Z]; Y = []; for (Q = 0; Q < F; Q++) {
							Y.push(Q <= Z ? 0 : J.elements[G][Q] - J.elements[Z][Q] * W);
						}

						J.elements[G] = Y;
					}
				}
			}

			return J;
		}, determinant: function () {
			if (this.elements.length === 0) {
				return 1;
			}

			if (!this.isSquare()) {
				return null;
			}

			const J = this.toRightTriangular(); let Y = J.elements[0][0]; const K = J.elements.length; for (let Z = 1; Z < K; Z++) {
				Y *= J.elements[Z][Z];
			}

			return Y;
		}, isSingular: function () {
			return this.isSquare() && this.determinant() === 0;
		}, augment: function (J) {
			if (this.elements.length === 0) {
				return this.dup();
			}

			let Y = J.elements || J; if (typeof Y[0][0] > 'u') {
				Y = x.Matrix.create(Y).elements;
			}

			const K = this.dup(); const Z = K.elements[0].length; let G = K.elements.length; const F = Y[0].length; let Q; if (G !== Y.length) {
				return null;
			}

			while (G--) {
				Q = F; while (Q--) {
					K.elements[G][Z + Q] = Y[G][Q];
				}
			}

			return K;
		}, inverse: function () {
			if (this.elements.length === 0) {
				return null;
			}

			if (!this.isSquare() || this.isSingular()) {
				return null;
			}

			const J = this.elements.length; let Y = J; let K; const Z = this.augment(x.Matrix.I(J)).toRightTriangular(); const G = Z.elements[0].length; let F; let Q; let W; const X = []; let V; while (Y--) {
				Q = [], X[Y] = [], W = Z.elements[Y][Y]; for (F = 0; F < G; F++) {
					if (V = Z.elements[Y][F] / W, Q.push(V), F >= J) {
						X[Y].push(V);
					}
				}

				Z.elements[Y] = Q, K = Y; while (K--) {
					Q = []; for (F = 0; F < G; F++) {
						Q.push(Z.elements[K][F] - Z.elements[Y][F] * Z.elements[K][Y]);
					}

					Z.elements[K] = Q;
				}
			}

			return x.Matrix.create(X);
		}, setElements: function (J) {
			let Y; let K; const Z = J.elements || J; if (Z[0] && typeof Z[0][0] < 'u') {
				Y = Z.length, this.elements = []; while (Y--) {
					K = Z[Y].length, this.elements[Y] = []; while (K--) {
						this.elements[Y][K] = Z[Y][K];
					}
				}

				return this;
			}

			const G = Z.length; this.elements = []; for (Y = 0; Y < G; Y++) {
				this.elements.push([Z[Y]]);
			}

			return this;
		},
	}; o1.exports = function (J) {
		const Y = x.Matrix.create(J).inverse(); if (Y !== null) {
			return Y.elements;
		}

		return null;
	};
}); const i1 = $((lF, e1) => {
	const G7 = a1(); e1.exports = function (Y) {
		return G7(Y);
	};
}); const JJ = $((mF, r1) => {
	r1.exports = function (Y, K) {
		return Y.map((Z, G) => Z.map((F, Q) => K(F, G, Q)));
	};
}); const b0 = $((sF, YJ) => {
	YJ.exports = function ({matrix: Y, outputSize: K, rowIndexes: Z, colIndexes: G}) {
		const [F, Q] = K; if (!Array.isArray(Z)) {
			throw new TypeError(`Invalid rowIndexes ${Z}`);
		}

		if (!Array.isArray(G)) {
			throw new TypeError(`Invalid colIndexes ${G}`);
		}

		return new Array(F).fill(0).map((W, X) => new Array(Q).fill(0).map((V, H) => {
			if (G.includes(H) && Z.includes(X)) {
				return Y[Z.indexOf(X)][G.indexOf(H)];
			}

			return 0;
		}));
	};
}); const ZJ = $((tF, KJ) => {
	const F7 = b0(); KJ.exports = function (J, {columns: Y}) {
		if (Y < J[0].length) {
			throw new TypeError(`Output columns ${Y} is greater than input columns ${J[0].length}`);
		}

		return F7({
			matrix: J, outputSize: [J.length, Y], rowIndexes: new Array(J.length).fill(0).map((K, Z) => Z), colIndexes: new Array(J[0].length).fill(0).map((K, Z) => Z),
		});
	};
}); const FJ = $((nF, GJ) => {
	GJ.exports = function (Y, K) {
		return K.map(Z => K.map(G => Y[Z][G]));
	};
}); const A = $((oF, QJ) => {
	QJ.exports = {
		add: T1(), cosSimilarity: h1(), euclideanDist: A1(), diag: j1(), diagBlock: p1(), dotProduct: L0(), elemWise: U0(), frobenius: n1(), identity: M0(), invert: i1(), mapMatrix: JJ(), matMul: v0(), matPermutation: b0(), padWithZeroCols: ZJ(), subtract: A0(), subSquareMatrix: FJ(), sum: j0(), trace: h0(), transpose: g0(), zeros: C0(), norm: w0(), sumVector: y0(),
	};
}); const o0 = $((IQ, qJ) => {
	qJ.exports = function (Y) {
		return Number.isFinite(Y);
	};
}); const UJ = $((TQ, HJ) => {
	const V7 = o0(); HJ.exports = function (Y) {
		if (!Array.isArray(Y)) {
			return !1;
		}

		const K = Y.length; if (K === 0) {
			return !0;
		}

		const Z = Y[0]; if (!Array.isArray(Z)) {
			return !1;
		}

		const G = Z.length; if (G === 0) {
			return !1;
		}

		for (let F = 0; F < K; F++) {
			const Q = Y[F]; if (!Array.isArray(Q) || Q.length !== G) {
				return !1;
			}

			for (let W = 0; W < G; W++) {
				if (!V7(Q[W])) {
					return !1;
				}
			}
		}

		return !0;
	};
}); const I = $((LQ, $J) => {
	$J.exports = {
		INVALID_ARRAY: 'Invalid argument: Received a non-array argument', INVALID_MATRIX: 'Invalid argument: Received an invalid matrix', INVALID_SQUARE_MATRIX: 'Invalid argument: Received a non-square matrix', INVALID_UPPER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non upper-triangular matrix', INVALID_LOWER_TRIANGULAR_MATRIX: 'Invalid argument: Received a non lower-triangular matrix', INVALID_EXPONENT: 'Invalid argument: Expected a non-negative integer exponent', INVALID_ROW_COL: 'Invalid argument: Expected non-negative integer row and column', INVALID_ROW: 'Invalid argument: Expected non-negative integer row', INVALID_COLUMN: 'Invalid argument: Expected non-negative integer column', INVALID_ROWS_EXPRESSION: 'Invalid argument: Received invalid rows expression', INVALID_COLUMNS_EXPRESSION: 'Invalid argument: Received invalid columns expression', INVALID_P_NORM: 'Invalid argument: Received invalid p-norm', OVERFLOW_INDEX: 'Invalid argument: Matrix index overflow', OVERFLOW_COLUMN: 'Invalid argument: Column index overflow', OVERFLOW_ROW: 'Invalid argument: Row index overflow', NO_UNIQUE_SOLUTION: 'Arithmetic Exception: The system has no unique solution', SIZE_INCOMPATIBLE: 'Invalid argument: Matrix size-incompatible', SINGULAR_MATRIX: 'Arithmetic Exception: The matrix is not invertible', EXPECTED_STRING_NUMBER_AT_POS_1_2: 'Invalid argument: Expected a string or a number at arguments[1] and arguments[2]', EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES: 'Invalid argument: Expected either an array of numbers or an array of square matrices',
	};
}); const OJ = $((wQ, EJ) => {
	function q7(J, Y) {
		return B7(J) || $7(J, Y) || U7(J, Y) || H7();
	}

	function H7() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function U7(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return BJ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return BJ(J, Y);
		}
	}

	function BJ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function $7(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function B7(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function E7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isDiagonal !== void 0) {
			return this._isDiagonal;
		}

		const Y = 1 / (10 ** J * 2); const K = this._matrix; const Z = this.size(); const G = q7(Z, 2); const F = G[0]; const Q = G[1]; if (F === 0) {
			return this._isDiagonal = !0, !0;
		}

		for (let W = 0; W < F; W++) {
			for (let X = 0; X < Q; X++) {
				if (W !== X && Math.abs(K[W][X]) >= Y) {
					return this.isDiagonal = !1, !1;
				}
			}
		}

		return this._isDiagonal = !0, !0;
	}

	EJ.exports = E7;
}); const PJ = $((CQ, NJ) => {
	function O7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isSkewSymmetric !== void 0) {
			return this._isSkewSymmetric;
		}

		if (!this.isSquare()) {
			return this._isSkewSymmetric = !1, !1;
		}

		const Y = this._matrix; const K = 1 / (10 ** J * 2); const Z = Y.length; if (Z === 0) {
			return this._isSkewSymmetric = !0, !0;
		}

		for (let G = 0; G < Z; G++) {
			for (let F = 0; F < G; F++) {
				if (Math.abs(Y[G][F] + Y[F][G]) >= K) {
					return this._isSkewSymmetric = !1, !1;
				}
			}
		}

		return this._isSkewSymmetric = !0, !0;
	}

	NJ.exports = O7;
}); const RJ = $((MQ, DJ) => {
	function N7() {
		if (this._isSquare !== void 0) {
			return this._isSquare;
		}

		const J = this._matrix; if (J.length === 0) {
			return this._isSquare = !0, !0;
		}

		return this._isSquare = J.length === J[0].length, this._isSquare;
	}

	DJ.exports = N7;
}); const SJ = $((hQ, zJ) => {
	function P7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isSymmetric !== void 0) {
			return this._isSymmetric;
		}

		if (!this.isSquare()) {
			return !1;
		}

		const Y = this._matrix; const K = 1 / (10 ** J * 2); const Z = Y.length; for (let G = 0; G < Z; G++) {
			for (let F = 0; F <= G; F++) {
				if (Math.abs(Y[G][F] - Y[F][G]) >= K) {
					return this._isSymmetric = !1, !1;
				}
			}
		}

		return this._isSymmetric = !0, !0;
	}

	zJ.exports = P7;
}); const IJ = $((gQ, fJ) => {
	function D7(J, Y) {
		return k7(J) || S7(J, Y) || z7(J, Y) || R7();
	}

	function R7() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function z7(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return kJ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return kJ(J, Y);
		}
	}

	function kJ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function S7(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function k7(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function f7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isLowerTriangular !== void 0) {
			return this._isLowerTriangular;
		}

		const Y = 1 / (10 ** J * 2); const K = this._matrix; const Z = this.size(); const G = D7(Z, 2); const F = G[0]; const Q = G[1]; if (F === 0) {
			return this._isLowerTriangular = !0, !0;
		}

		for (let W = 0; W < F; W++) {
			for (let X = W + 1; X < Q; X++) {
				if (Math.abs(K[W][X]) >= Y) {
					return this._isLowerTriangular = !1, !1;
				}
			}
		}

		return this._isLowerTriangular = !0, !0;
	}

	fJ.exports = f7;
}); const wJ = $((AQ, LJ) => {
	function I7(J, Y) {
		return C7(J) || w7(J, Y) || L7(J, Y) || T7();
	}

	function T7() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function L7(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return TJ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return TJ(J, Y);
		}
	}

	function TJ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function w7(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function C7(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function M7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isUpperTriangular !== void 0) {
			return this._isUpperTriangular;
		}

		const Y = 1 / (10 ** J * 2); const K = this._matrix; const Z = this.size(); const G = I7(Z, 2); const F = G[0]; const Q = G[1]; if (F === 0) {
			return this._isUpperTriangular = !0, !0;
		}

		for (let W = 0; W < F; W++) {
			for (let X = 0; X < Q; X++) {
				if (W <= X) {
					continue;
				}

				if (Math.abs(K[W][X]) >= Y) {
					return this._isUpperTriangular = !1, !1;
				}
			}
		}

		return this._isUpperTriangular = !0, !0;
	}

	LJ.exports = M7;
}); const MJ = $((vQ, CJ) => {
	function h7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this._digit; if (this._isOrthogonal !== void 0) {
			return this._isOrthogonal;
		}

		if (!this.isSquare()) {
			return this._isOrthogonal = !1, !1;
		}

		const Y = this._matrix; const K = 1 / (10 ** J * 2); const Z = Y.length; for (let G = 0; G < Z; G++) {
			for (let F = G; F < Z; F++) {
				let Q = 0; for (let W = 0; W < Z; W++) {
					Q += Y[G][W] * Y[F][W];
				}

				if (G === F && Math.abs(Q - 1) >= K) {
					return this._isOrthogonal = !1, !1;
				}

				if (G !== F && Math.abs(Q) >= K) {
					return this._isOrthogonal = !1, !1;
				}
			}
		}

		return this._isOrthogonal = !0, !0;
	}

	CJ.exports = h7;
}); const gJ = $((yQ, hJ) => {
	const g7 = c(); const a0 = I(); const A7 = a0.INVALID_P_NORM; const v7 = a0.SINGULAR_MATRIX; const y7 = a0.INVALID_SQUARE_MATRIX; function j7() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2; if (J !== 1 && J !== 2 && J !== 1 / 0 && J !== 'F') {
			throw new Error(A7);
		}

		if (!this.isSquare()) {
			throw new Error(y7);
		}

		try {
			const Y = g7.inverse(this); return Y.norm(J) * this.norm(J);
		} catch (error) {
			if (error.message === v7) {
				return 1 / 0;
			}

			throw error;
		}
	}

	hJ.exports = j7;
}); const yJ = $((jQ, vJ) => {
	function b7(J, Y) {
		return u7(J) || d7(J, Y) || p7(J, Y) || x7();
	}

	function x7() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function p7(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return AJ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return AJ(J, Y);
		}
	}

	function AJ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function d7(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function u7(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const c7 = c(); const _7 = I(); const l7 = _7.INVALID_SQUARE_MATRIX; function m7() {
		if (!this.isSquare()) {
			throw new Error(l7);
		}

		if (this._det !== void 0) {
			return this._det;
		}

		const J = this._matrix; const Y = J.length; if (Y === 0) {
			return this._det = 1, 1;
		}

		if (Y === 1) {
			return this._det = J[0][0], this._det;
		}

		if (Y === 2) {
			return this._det = J[0][0] * J[1][1] - J[0][1] * J[1][0], this._det;
		}

		if (Y === 3) {
			return this._det = J[0][0] * J[1][1] * J[2][2] + J[0][1] * J[1][2] * J[2][0] + J[0][2] * J[1][0] * J[2][1] - J[0][2] * J[1][1] * J[2][0] - J[0][1] * J[1][0] * J[2][2] - J[0][0] * J[1][2] * J[2][1], this._det;
		}

		const K = c7.LU(this, !0); const Z = b7(K, 2); const G = Z[0]; const F = Z[1]; const Q = F._matrix; let W = 0; for (let X = 0; X < Y; X++) {
			if (G[X] === X) {
				continue;
			}

			while (G[X] !== X) {
				const V = G[X]; G[X] = G[V], G[V] = V, W++;
			}
		}

		let H = 1; for (let q = 0; q < Y; q++) {
			H *= Q[q][q];
		}

		if (W % 2 === 1) {
			return this._det = H * -1, this._det;
		}

		return this._det = H, H;
	}

	vJ.exports = m7;
}); const bJ = $((bQ, jJ) => {
	function s7() {
		return this.re;
	}

	jJ.exports = s7;
}); const pJ = $((xQ, xJ) => {
	function t7() {
		return this.im;
	}

	xJ.exports = t7;
}); const uJ = $((pQ, dJ) => {
	function n7() {
		return Math.hypot(this.re, this.im);
	}

	dJ.exports = n7;
}); const _J = $((dQ, cJ) => {
	function o7() {
		const J = this.re; const Y = this.im; const K = 1 / (10 ** 15 * 2); if (Math.abs(J) < K && Math.abs(Y) < K) {
			return;
		}

		if (J === 0) {
			if (Y > 0) {
				return Math.PI * 0.5;
			}

			return Math.PI * 1.5;
		}

		if (Y === 0) {
			if (J > 0) {
				return 0;
			}

			return Math.PI;
		}

		if (J > 0 && Y > 0) {
			return Math.atan(Y / J);
		}

		if (J < 0 && Y > 0) {
			return Math.PI - Math.atan(Y / (J * -1));
		}

		if (J < 0 && Y < 0) {
			return Math.PI + Math.atan(Y * -1 / (J * -1));
		}

		return Math.PI * 2 - Math.atan(Y * -1 / J);
	}

	cJ.exports = o7;
}); const mJ = $((uQ, lJ) => {
	function a7() {
		const J = this.re; const Y = this.im; if (Number.isNaN(J) || Number.isNaN(Y)) {
			return 'NaN';
		}

		if (J === 0 && Y === 0) {
			return '0';
		}

		if (J === 0) {
			if (Y === 1) {
				return 'i';
			}

			if (Y === -1) {
				return '-i';
			}

			return ''.concat(Y, 'i');
		}

		if (Y === 0) {
			return ''.concat(J);
		}

		if (Y > 0) {
			if (Y === 1) {
				return ''.concat(J, ' + i');
			}

			return ''.concat(J, ' + ').concat(Y, 'i');
		}

		if (Y === -1) {
			return ''.concat(J, ' - i');
		}

		return ''.concat(J, ' - ').concat(Math.abs(Y), 'i');
	}

	lJ.exports = a7;
}); const tJ = $((cQ, sJ) => {
	function e7(J) {
		if (!(J instanceof this)) {
			return !1;
		}

		const Y = J.getReal(); const K = J.getImaginary(); if (Number.isNaN(Y) || Number.isNaN(K)) {
			return !0;
		}

		return !1;
	}

	sJ.exports = e7;
}); const oJ = $((_Q, nJ) => {
	function i7(J, Y) {
		const K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 15; if (!(J instanceof this) || !(Y instanceof this)) {
			return !1;
		}

		if (!Number.isInteger(K) || K < 0) {
			throw new Error('Invalid argument: Expected a non-negative integer digit');
		}

		const Z = 1 / (10 ** K * 2); const G = J.getReal(); const F = J.getImaginary(); const Q = Y.getReal(); const W = Y.getImaginary(); if (Number.isNaN(G) && Number.isNaN(F) && Number.isNaN(Q) && Number.isNaN(W)) {
			return !0;
		}

		return Math.abs(G - Q) < Z && Math.abs(F - W) < Z;
	}

	nJ.exports = i7;
}); const eJ = $((lQ, aJ) => {
	function r7(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		return new this(J.getReal(), J.getImaginary() * -1);
	}

	aJ.exports = r7;
}); const rJ = $((mQ, iJ) => {
	function J9(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		return this.divide(this.ONE, J);
	}

	iJ.exports = J9;
}); const YY = $((sQ, JY) => {
	function Y9(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			return this.NaN;
		}

		return new this(J.re + Y.re, J.im + Y.im);
	}

	JY.exports = Y9;
}); const ZY = $((tQ, KY) => {
	function K9(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			return this.NaN;
		}

		return new this(J.re - Y.re, J.im - Y.im);
	}

	KY.exports = K9;
}); const FY = $((nQ, GY) => {
	function Z9(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			return this.NaN;
		}

		const {re: K, im: Z} = J; const G = Y.re; const F = Y.im; return new this(K * G - Z * F, K * F + Z * G);
	}

	GY.exports = Z9;
}); const WY = $((oQ, QY) => {
	function G9(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			return this.NaN;
		}

		const {re: K, im: Z} = J; const G = Y.re; const F = Y.im; if (Math.abs(G) < this.EPSILON && Math.abs(F) < this.EPSILON) {
			return this.NaN;
		}

		const Q = G ** 2 + F ** 2; return new this((K * G + Z * F) / Q, (Z * G - K * F) / Q);
	}

	QY.exports = G9;
}); const VY = $((aQ, XY) => {
	function F9(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		const Y = J.getReal(); const K = J.getImaginary(); const Z = Math.exp(Y); return new this(Z * Math.cos(K), Z * Math.sin(K));
	}

	XY.exports = F9;
}); const HY = $((eQ, qY) => {
	function Q9(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		const Y = J.getModulus(); const K = J.getArgument(); if (Y < this.EPSILON || K === void 0) {
			return this.NaN;
		}

		return new this(Math.log(Y), K);
	}

	qY.exports = Q9;
}); const $Y = $((iQ, UY) => {
	function W9(J, Y) {
		if (!(J instanceof this) || typeof Y !== 'number' && !(Y instanceof this)) {
			return this.NaN;
		}

		if (typeof Y === 'number') {
			if (!Number.isFinite(Y) || Number.isNaN(Y)) {
				return this.NaN;
			}

			if (Y === 0) {
				return this.ONE;
			}

			if (this.isEqual(J, this.ZERO)) {
				return this.ZERO;
			}

			return this.exp(this.multiply(new this(Y, 0), this.log(J)));
		}

		if (Y instanceof this) {
			return this.exp(this.multiply(Y, this.log(J)));
		}

		return this.NaN;
	}

	UY.exports = W9;
}); const EY = $((rQ, BY) => {
	function X9(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		const Y = J.getReal(); const K = J.getImaginary(); return new this(Math.sin(Y) * Math.cosh(K), Math.cos(Y) * Math.sinh(K));
	}

	BY.exports = X9;
}); const NY = $((JW, OY) => {
	function V9(J) {
		if (!(J instanceof this)) {
			return this.NaN;
		}

		const Y = J.getReal(); const K = J.getImaginary(); return new this(Math.cos(Y) * Math.cosh(K), Math.sin(Y) * Math.sinh(K) * -1);
	}

	OY.exports = V9;
}); const DY = $((YW, PY) => {
	function q9(J) {
		return this.divide(this.sin(J), this.cos(J));
	}

	PY.exports = q9;
}); const zY = $((KW, RY) => {
	function H9(J) {
		return this.divide(this.ONE, this.sin(J));
	}

	RY.exports = H9;
}); const kY = $((ZW, SY) => {
	function U9(J) {
		return this.divide(this.ONE, this.cos(J));
	}

	SY.exports = U9;
}); const IY = $((GW, fY) => {
	function $9(J) {
		return this.divide(this.ONE, this.tan(J));
	}

	fY.exports = $9;
}); const LY = $((FW, TY) => {
	function B9(J) {
		return this.multiply(new this(0, -1), this.log(this.add(this.multiply(new this(0, 1), J), this.pow(this.subtract(this.ONE, this.pow(J, 2)), 0.5))));
	}

	TY.exports = B9;
}); const CY = $((QW, wY) => {
	function E9(J) {
		return this.subtract(new this(Math.PI / 2), this.asin(J));
	}

	wY.exports = E9;
}); const hY = $((WW, MY) => {
	function O9(J) {
		return this.multiply(new this(0, 0.5), this.subtract(this.log(this.subtract(this.ONE, this.multiply(new this(0, 1), J))), this.log(this.add(this.ONE, this.multiply(new this(0, 1), J)))));
	}

	MY.exports = O9;
}); const AY = $((XW, gY) => {
	function N9(J) {
		return this.asin(this.inverse(J));
	}

	gY.exports = N9;
}); const yY = $((VW, vY) => {
	function P9(J) {
		return this.acos(this.inverse(J));
	}

	vY.exports = P9;
}); const bY = $((qW, jY) => {
	function D9(J) {
		return this.atan(this.inverse(J));
	}

	jY.exports = D9;
}); const pY = $((HW, xY) => {
	function Y0(J) {
		Y0 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
			? function (K) {
				return typeof K;
			}
			: function (K) {
				return K && typeof Symbol === 'function' && K.constructor === Symbol && K !== Symbol.prototype ? 'symbol' : typeof K;
			};

		return Y0(J);
	}

	function z(J, Y) {
		const K = Y0(J); const Z = Y0(Y); if (K === 'number' && Z === 'undefined') {
			if (Number.isNaN(J) || !Number.isFinite(J)) {
				return this.re = Number.NaN, this.im = Number.NaN, this;
			}

			return this.re = J, this.im = 0, this;
		}

		if (K === 'number' && Z === 'number') {
			if (Number.isNaN(J) || Number.isNaN(Y) || !Number.isFinite(J) || !Number.isFinite(Y)) {
				return this.re = Number.NaN, this.im = Number.NaN, this;
			}

			return this.re = J, this.im = Y, this;
		}

		return this.re = Number.NaN, this.im = Number.NaN, this;
	}

	z.prototype.getReal = bJ(); z.prototype.getImaginary = pJ(); z.prototype.getModulus = uJ(); z.prototype.getArgument = _J(); z.prototype.toString = mJ(); z.isNaN = tJ(); z.isEqual = oJ(); z.conjugate = eJ(); z.inverse = rJ(); z.add = YY(); z.subtract = ZY(); z.multiply = FY(); z.divide = WY(); z.exp = VY(); z.log = HY(); z.pow = $Y(); z.sin = EY(); z.cos = NY(); z.tan = DY(); z.csc = zY(); z.sec = kY(); z.cot = IY(); z.asin = LY(); z.acos = CY(); z.atan = hY(); z.acsc = AY(); z.asec = yY(); z.acot = bY(); z.NaN = new z(Number.NaN); z.ONE = new z(1); z.ZERO = new z(0); z.PI = new z(Math.PI); z.E = new z(Math.E); z.EPSILON = 1 / (10 ** 15 * 2); xY.exports = z;
}); const _Y = $((UW, cY) => {
	function R9(J, Y) {
		return f9(J) || k9(J, Y) || S9(J, Y) || z9();
	}

	function z9() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function S9(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return dY(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return dY(J, Y);
		}
	}

	function dY(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function k9(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function f9(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const O0 = pY(); const I9 = c(); const T9 = I(); const L9 = T9.INVALID_SQUARE_MATRIX; function w9() {
		if (!this.isSquare()) {
			throw new Error(L9);
		}

		if (this._eigenvalues !== void 0) {
			return this._eigenvalues;
		}

		const J = this.size()[0]; const Y = []; const K = this._digit; const Z = 1 / (10 ** K * 2); const G = I9.clone(this)._matrix; let F = !0; let Q = !1; C9(G, K); for (let W = J - 1; W > 0; W--) {
			let X = 0; let V = void 0; if (Q) {
				Q = !1; continue;
			}

			const H = G[J - 1][J - 1]; while (!0) {
				V = F ? Math.abs(G[W][W - 1]) : uY(G[W - 1][W - 1], G[W - 1][W], G[W][W - 1], G[W][W]).metric; for (let q = 0; q < J; q++) {
					G[q][q] -= H;
				}

				M9(G, K); for (let U = 0; U < J; U++) {
					G[U][U] += H;
				}

				if (F && V < Math.abs(G[W][W - 1])) {
					X++;
				}

				if (F && Math.abs(G[W][W - 1]) < Z) {
					Y[W] = new O0(G[W][W]); break;
				}

				const B = uY(G[W - 1][W - 1], G[W - 1][W], G[W][W - 1], G[W][W]); const E = B.metric; const O = B.eigen1; const N = B.eigen2; if (!F && Math.abs(V - E) < Z) {
					F = !0, Q = !0; const {re: P, im: S} = O; const R = N.re; const k = N.im; Y[W] = new O0(P, S), Y[W - 1] = new O0(R, k); break;
				}

				if (X > 3) {
					F = !1;
				}
			}
		}

		if (!Q) {
			Y[0] = new O0(G[0][0]);
		}

		return this._eigenvalues = Y, Y;
	}

	function C9(J, Y) {
		const K = J.length; const Z = 1 / (10 ** Y * 2); for (let G = 0; G < K - 2; G++) {
			let F = 0; const Q = new Array(K - G - 1); for (let W = G + 1; W < K; W++) {
				const X = J[W][G]; F += X ** 2, Q[W - G - 1] = X;
			}

			if (F = Math.sqrt(F), Math.abs(F) < Z) {
				continue;
			}

			if (Q[0] >= 0) {
				Q[0] += F;
			} else {
				Q[0] -= F;
			}

			let V = 0; for (const element of Q) {
				V += element ** 2;
			}

			V = Math.sqrt(V); for (let q = 0; q < Q.length; q++) {
				Q[q] /= V;
			}

			for (let U = G; U < K; U++) {
				const B = new Array(K - G - 1); for (let E = G + 1; E < K; E++) {
					B[E - G - 1] = J[E][U];
				}

				let O = 0; for (const [N, element] of B.entries()) {
					O += element * Q[N];
				}

				O *= 2; for (let P = G + 1; P < K; P++) {
					J[P][U] = U === G && P !== G + 1 ? 0 : B[P - G - 1] - O * Q[P - G - 1];
				}
			}

			for (let S = 0; S < K; S++) {
				const R = new Array(K - G - 1); for (let k = G + 1; k < K; k++) {
					R[k - G - 1] = J[S][k];
				}

				let f = 0; for (const [w, element] of R.entries()) {
					f += element * Q[w];
				}

				f *= 2; for (let M = G + 1; M < K; M++) {
					J[S][M] = R[M - G - 1] - f * Q[M - G - 1];
				}
			}
		}
	}

	function M9(J, Y) {
		const K = J.length; const Z = 1 / (10 ** Y * 2); const G = new Array(K - 1); for (let F = 0; F < K - 1; F++) {
			const Q = J[F][F]; const W = J[F + 1][F]; const X = Math.hypot(Q, W); if (X < Z) {
				continue;
			}

			const V = Q / X; const H = W * -1 / X; G[F] = [H, V]; const q = new Array(K - F); const U = new Array(K - F); for (let B = F; B < K; B++) {
				q[B - F] = J[F][B], U[B - F] = J[F + 1][B];
			}

			for (let E = F; E < K; E++) {
				if (J[F][E] = V * q[E - F] + H * -1 * U[E - F], F === E) {
					J[F + 1][E] = 0;
				} else {
					J[F + 1][E] = H * q[E - F] + V * U[E - F];
				}
			}
		}

		for (let O = 0; O < K - 1; O++) {
			if (!G[O]) {
				continue;
			}

			const N = R9(G[O], 2); const P = N[0]; const S = N[1]; const R = new Array(O + 2); const k = new Array(O + 2); for (let f = 0; f <= O + 1; f++) {
				R[f] = J[f][O], k[f] = J[f][O + 1];
			}

			for (let w = 0; w <= O + 1; w++) {
				J[w][O] = R[w] * S - k[w] * P, J[w][O + 1] = R[w] * P + k[w] * S;
			}
		}
	}

	function uY(J, Y, K, Z) {
		const G = (J + Z) * -1; const F = J * Z - K * Y; const Q = G ** 2 - 4 * F; let W; let X; let V; let H; if (Q >= 0) {
			W = (X = 0, H = 0, G >= 0) ? (G * -1 - Math.sqrt(Q)) / 2 : (G * -1 + Math.sqrt(Q)) / 2; V = F / W;
		} else {
			W = -G / 2, V = W, X = Math.sqrt(Q * -1) / 2, H = X * -1;
		}

		return {metric: Math.hypot(W, X), eigen1: {re: W, im: X}, eigen2: {re: V, im: H}};
	}

	cY.exports = w9;
}); const mY = $(($W, lY) => {
	function h9() {
		if (this._nullity !== void 0) {
			return this._nullity;
		}

		const J = this.size()[1]; const Y = this.rank(); return this._nullity = J - Y, this._nullity;
	}

	lY.exports = h9;
}); const oY = $((BW, nY) => {
	function g9(J, Y) {
		return j9(J) || y9(J, Y) || v9(J, Y) || A9();
	}

	function A9() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function v9(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return sY(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return sY(J, Y);
		}
	}

	function sY(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function y9(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function j9(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const tY = c(); const b9 = I(); const x9 = b9.INVALID_P_NORM; function p9() {
		const J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2; const Y = this.size(); const K = g9(Y, 2); const Z = K[0]; const G = K[1]; if (J !== 1 && J !== 2 && J !== 1 / 0 && J !== 'F') {
			throw new Error(x9);
		}

		const F = this._matrix; let Q = 0; if (J === 1) {
			for (let W = 0; W < G; W++) {
				let X = 0; for (let V = 0; V < Z; V++) {
					X += Math.abs(F[V][W]);
				}

				if (X > Q) {
					Q = X;
				}
			}

			return Q;
		}

		if (J === 2) {
			const H = tY.transpose(this); const q = tY.multiply(H, this); const U = q.eigenvalues(); for (const element of U) {
				const E = element.getModulus(); if (E > Q) {
					Q = E;
				}
			}

			return Math.sqrt(Q);
		}

		if (J === 1 / 0) {
			for (let O = 0; O < Z; O++) {
				let N = 0; for (let P = 0; P < G; P++) {
					N += Math.abs(F[O][P]);
				}

				if (N > Q) {
					Q = N;
				}
			}

			return Q;
		}

		for (let S = 0; S < Z; S++) {
			for (let R = 0; R < G; R++) {
				Q += F[S][R] ** 2;
			}
		}

		return Math.sqrt(Q);
	}

	nY.exports = p9;
}); const iY = $((EW, eY) => {
	function d9(J, Y) {
		return l9(J) || _9(J, Y) || c9(J, Y) || u9();
	}

	function u9() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function c9(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return aY(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return aY(J, Y);
		}
	}

	function aY(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function _9(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function l9(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const m9 = c(); function s9() {
		if (this._rank !== void 0) {
			return this._rank;
		}

		const J = 1 / (10 ** this._digit * 2); const Y = m9.QR(this)[1]; const K = Y._matrix; const Z = Y.size(); const G = d9(Z, 2); const F = G[0]; const Q = G[1]; if (F === 0) {
			return this._rank = 1, 1;
		}

		let W = 0; for (let X = 0; X < F; X++) {
			for (let V = X; V < Q; V++) {
				if (Math.abs(K[X][V]) >= J) {
					W++; break;
				}
			}
		}

		return this._rank = W, W;
	}

	eY.exports = s9;
}); const JK = $((OW, rY) => {
	function t9() {
		if (this._size !== void 0) {
			return this._size;
		}

		const J = this._matrix; if (J.length === 0) {
			return this._size = [0, 0], this._size;
		}

		return this._size = [J.length, J[0].length], this._size;
	}

	rY.exports = t9;
}); const KK = $((NW, YK) => {
	const n9 = I(); const o9 = n9.INVALID_SQUARE_MATRIX; function a9() {
		const J = this._isSquare === void 0 ? this.isSquare() : this._isSquare; if (!J) {
			throw new Error(o9);
		}

		if (this._trace !== void 0) {
			return this._trace;
		}

		const Y = this._matrix; const K = Y.length; let Z = 0; for (let G = 0; G < K; G++) {
			Z += Y[G][G];
		}

		return this._trace = Z, Z;
	}

	YK.exports = a9;
}); const WK = $((PW, QK) => {
	function ZK(J, Y) {
		return J8(J) || r9(J, Y) || i9(J, Y) || e9();
	}

	function e9() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function i9(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return GK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return GK(J, Y);
		}
	}

	function GK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function r9(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function J8(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const FK = I(); const Y8 = FK.INVALID_MATRIX; const K8 = FK.SIZE_INCOMPATIBLE; function Z8(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(Y8);
		}

		const K = J.size(); const Z = ZK(K, 2); const G = Z[0]; const F = Z[1]; const Q = Y.size(); const W = ZK(Q, 2); const X = W[0]; const V = W[1]; if (G !== X || F !== V) {
			throw new Error(K8);
		}

		const H = J._matrix; const q = Y._matrix; return this.generate(G, F, (U, B) => H[U][B] + q[U][B]);
	}

	QK.exports = Z8;
}); const VK = $((DW, XK) => {
	const e0 = I(); const G8 = e0.INVALID_MATRIX; const F8 = e0.INVALID_SQUARE_MATRIX; const Q8 = e0.SINGULAR_MATRIX; const W8 = c(); function X8(J) {
		if (!(J instanceof this)) {
			throw new TypeError(G8);
		}

		if (!J.isSquare()) {
			throw new Error(F8);
		}

		const Y = J.size()[0]; if (Y === 0) {
			return new W8([]);
		}

		const K = 1 / (10 ** J._digit * 2); const Z = this.identity(Y)._matrix; const G = this.clone(J)._matrix; const F = V8(Y); for (let Q = 0; Q < Y; Q++) {
			let W = Q; let X = G[F[Q]][Q]; while (Math.abs(X) < K && W < Y - 1) {
				W++, X = G[F[W]][Q];
			}

			if (Math.abs(X) < K) {
				throw new Error(Q8);
			}

			if (Q !== W) {
				const V = F[Q]; F[Q] = F[W], F[W] = V;
			}

			const H = F[Q]; for (let q = 0; q < Y; q++) {
				const U = F[q]; if (q === Q) {
					for (let B = 0; B < Y; B++) {
						if (B === Q) {
							G[U][B] = 1;
						}

						if (B > Q) {
							G[U][B] /= X;
						}

						Z[U][B] /= X;
					}

					X = 1;
				}

				if (q !== Q && Math.abs(G[U][Q]) >= K) {
					const E = G[U][Q] / X; for (let O = 0; O < Y; O++) {
						if (O === Q) {
							G[U][O] = 0;
						}

						if (O > Q) {
							G[U][O] -= E * G[H][O];
						}

						Z[U][O] -= E * Z[H][O];
					}
				}
			}
		}

		for (let N = 0; N < Y; N++) {
			G[N] = Z[F[N]];
		}

		return new this(G);
	}

	function V8(J) {
		const Y = new Array(J); for (let K = 0; K < J; K++) {
			Y[K] = K;
		}

		return Y;
	}

	XK.exports = X8;
}); const K0 = $((RW, qK) => {
	const q8 = I(); const H8 = q8.INVALID_ROW_COL; qK.exports = function (Y, K) {
		if (!Number.isInteger(Y) || Y < 0 || !Number.isInteger(K) || K < 0) {
			throw new Error(H8);
		}

		if (Y === 0 || K === 0) {
			return [];
		}

		const Z = new Array(Y); for (let G = 0; G < Y; G++) {
			Z[G] = new Array(K);
		}

		return Z;
	};
}); const EK = $((zW, BK) => {
	function HK(J, Y) {
		return E8(J) || B8(J, Y) || $8(J, Y) || U8();
	}

	function U8() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function $8(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return UK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return UK(J, Y);
		}
	}

	function UK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function B8(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function E8(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const O8 = K0(); const $K = I(); const N8 = $K.INVALID_MATRIX; const P8 = $K.SIZE_INCOMPATIBLE; function D8(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(N8);
		}

		const K = J.size(); const Z = HK(K, 2); const G = Z[0]; const F = Z[1]; const Q = Y.size(); const W = HK(Q, 2); const X = W[0]; const V = W[1]; if (F !== X) {
			throw new Error(P8);
		}

		const H = J._matrix; const q = Y._matrix; const U = O8(G, V); for (let B = 0; B < G; B++) {
			for (let E = 0; E < V; E++) {
				U[B][E] = 0; for (let O = 0; O < X; O++) {
					U[B][E] += H[B][O] * q[O][E];
				}
			}
		}

		return new this(U);
	}

	BK.exports = D8;
}); const NK = $((SW, OK) => {
	const i0 = I(); const R8 = i0.INVALID_MATRIX; const z8 = i0.INVALID_SQUARE_MATRIX; const S8 = i0.INVALID_EXPONENT; function k8(J, Y) {
		if (!(J instanceof this)) {
			throw new TypeError(R8);
		}

		if (!J.isSquare()) {
			throw new Error(z8);
		}

		if (!Number.isInteger(Y) || Y < 0) {
			throw new Error(S8);
		}

		const K = J.size()[0]; if (Y === 0) {
			return this.identity(K);
		}

		if (Y === 1) {
			return this.clone(J);
		}

		if (Y % 2 === 0) {
			const Z = this.pow(J, Y / 2); return this.multiply(Z, Z);
		}

		const G = this.pow(J, (Y - 1) / 2); return this.multiply(this.multiply(G, G), J);
	}

	OK.exports = k8;
}); const SK = $((kW, zK) => {
	function PK(J, Y) {
		return L8(J) || T8(J, Y) || I8(J, Y) || f8();
	}

	function f8() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function I8(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return DK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return DK(J, Y);
		}
	}

	function DK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function T8(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function L8(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const RK = I(); const w8 = RK.SIZE_INCOMPATIBLE; const C8 = RK.INVALID_MATRIX; zK.exports = function (Y, K) {
		if (!(Y instanceof this) || !(K instanceof this)) {
			throw new TypeError(C8);
		}

		const Z = Y.size(); const G = PK(Z, 2); const F = G[0]; const Q = G[1]; const W = K.size(); const X = PK(W, 2); const V = X[0]; const H = X[1]; if (F !== V || Q !== H) {
			throw new Error(w8);
		}

		const q = Y._matrix; const U = K._matrix; return this.generate(F, Q, (B, E) => q[B][E] - U[B][E]);
	};
}); const IK = $((fW, fK) => {
	function M8(J, Y) {
		return v8(J) || A8(J, Y) || g8(J, Y) || h8();
	}

	function h8() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function g8(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return kK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return kK(J, Y);
		}
	}

	function kK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function A8(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function v8(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const y8 = I(); const j8 = y8.INVALID_MATRIX; function b8(J) {
		if (!(J instanceof this)) {
			throw new TypeError(j8);
		}

		const Y = J.size(); const K = M8(Y, 2); const Z = K[0]; const G = K[1]; const F = J._matrix; return this.generate(G, Z, (Q, W) => F[W][Q]);
	}

	fK.exports = b8;
}); const wK = $((IW, LK) => {
	function x8(J, Y) {
		return c8(J) || u8(J, Y) || d8(J, Y) || p8();
	}

	function p8() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function d8(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return TK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return TK(J, Y);
		}
	}

	function TK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function u8(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function c8(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const _8 = K0(); const Z0 = I(); const l8 = Z0.INVALID_MATRIX; const m8 = Z0.INVALID_UPPER_TRIANGULAR_MATRIX; const s8 = Z0.INVALID_SQUARE_MATRIX; const t8 = Z0.SIZE_INCOMPATIBLE; const n8 = Z0.NO_UNIQUE_SOLUTION; function o8(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(l8);
		}

		if (!J.isUpperTriangular()) {
			throw new Error(m8);
		}

		if (!J.isSquare()) {
			throw new Error(s8);
		}

		const K = J.size()[0]; const Z = Y.size(); const G = x8(Z, 2); const F = G[0]; const Q = G[1]; const W = J._matrix; const X = Y._matrix; if (F !== K || Q !== 1) {
			throw new Error(t8);
		}

		const V = 1 / (10 ** J._digit * 2); for (let H = 0; H < K; H++) {
			if (Math.abs(W[H][H]) < V) {
				throw new Error(n8);
			}
		}

		const q = _8(K, 1); for (let U = K - 1; U >= 0; U--) {
			let B = 0; for (let E = U + 1; E < K; E++) {
				B += q[E][0] * W[U][E];
			}

			q[U][0] = (X[U][0] - B) / W[U][U];
		}

		return new this(q);
	}

	LK.exports = o8;
}); const hK = $((TW, MK) => {
	function a8(J, Y) {
		return JG(J) || r8(J, Y) || i8(J, Y) || e8();
	}

	function e8() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function i8(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return CK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return CK(J, Y);
		}
	}

	function CK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function r8(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function JG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const YG = K0(); const G0 = I(); const KG = G0.INVALID_MATRIX; const ZG = G0.INVALID_LOWER_TRIANGULAR_MATRIX; const GG = G0.INVALID_SQUARE_MATRIX; const FG = G0.SIZE_INCOMPATIBLE; const QG = G0.NO_UNIQUE_SOLUTION; function WG(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(KG);
		}

		if (!J.isLowerTriangular()) {
			throw new Error(ZG);
		}

		if (!J.isSquare()) {
			throw new Error(GG);
		}

		const K = J.size()[0]; const Z = Y.size(); const G = a8(Z, 2); const F = G[0]; const Q = G[1]; const W = J._matrix; const X = Y._matrix; if (K !== F || Q !== 1) {
			throw new Error(FG);
		}

		const V = 1 / (10 ** J._digit * 2); for (let H = 0; H < K; H++) {
			if (Math.abs(W[H][H]) < V) {
				throw new Error(QG);
			}
		}

		const q = YG(K, 1); for (let U = 0; U < K; U++) {
			let B = 0; for (let E = 0; E < U; E++) {
				B += q[E][0] * W[U][E];
			}

			q[U][0] = (X[U][0] - B) / W[U][U];
		}

		return new this(q);
	}

	MK.exports = WG;
}); const vK = $((LW, AK) => {
	function r0(J, Y) {
		return HG(J) || qG(J, Y) || VG(J, Y) || XG();
	}

	function XG() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function VG(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return gK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return gK(J, Y);
		}
	}

	function gK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function qG(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function HG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const N0 = I(); const UG = N0.INVALID_MATRIX; const $G = N0.NO_UNIQUE_SOLUTION; const BG = N0.INVALID_SQUARE_MATRIX; const EG = N0.SIZE_INCOMPATIBLE; function OG(J, Y) {
		if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(UG);
		}

		if (!J.isSquare()) {
			throw new Error(BG);
		}

		const K = J.size(); const Z = r0(K, 2); const G = Z[0]; const F = Z[1]; const Q = Y.size(); const W = r0(Q, 2); const X = W[0]; const V = W[1]; if (F !== X || V !== 1) {
			throw new Error(EG);
		}

		const H = 1 / (10 ** J._digit * 2); const q = this.LU(J, !0); const U = r0(q, 2); const B = U[0]; const E = U[1]; const O = E._matrix; const N = Y._matrix; for (let P = G - 1; P >= 0; P--) {
			if (Math.abs(O[P][P]) < H) {
				throw new Error($G);
			}
		}

		const S = new Array(X); const R = new Array(X); for (let k = 0; k < X; k++) {
			S[k] = N[B[k]][0];
		}

		for (let f = 0; f < G; f++) {
			let w = 0; for (let M = 0; M < f; M++) {
				w += R[M] * O[f][M];
			}

			R[f] = S[f] - w;
		}

		for (let T = G - 1; T >= 0; T--) {
			let v = 0; for (let b = T + 1; b < G; b++) {
				v += O[T][b] * S[b];
			}

			S[T] = (R[T] - v) / O[T][T];
		}

		for (let p = 0; p < X; p++) {
			R[p] = [S[p]];
		}

		return new this(R);
	}

	AK.exports = OG;
}); const bK = $((wW, jK) => {
	function NG(J, Y) {
		return zG(J) || RG(J, Y) || DG(J, Y) || PG();
	}

	function PG() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function DG(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return yK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return yK(J, Y);
		}
	}

	function yK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function RG(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function zG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const SG = I(); const kG = SG.INVALID_MATRIX; function fG(J) {
		const Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1; if (!(J instanceof this)) {
			throw new TypeError(kG);
		}

		const K = J.size(); const Z = NG(K, 2); const G = Z[0]; const F = Z[1]; const Q = Math.min(G, F); const W = 1 / (10 ** J._digit * 2); const X = IG(G); const V = this.clone(J)._matrix; for (let H = 0; H < G - 1; H++) {
			const q = Math.min(H, F); TG(V, X, q, G, F); const U = X[H]; const B = V[U][q]; if (Math.abs(B) < W) {
				continue;
			}

			for (let E = H + 1; E < G; E++) {
				const O = X[E]; const N = V[O][q]; if (Math.abs(N) >= W) {
					const P = N / B; for (let S = q; S < F; S++) {
						V[O][S] -= P * V[U][S];
					}

					V[O][q] = P;
				}
			}
		}

		const R = new Array(G); for (let k = 0; k < G; k++) {
			R[k] = V[X[k]];
		}

		if (Y) {
			return [X, new this(R)];
		}

		const f = this.generate(G, G, (T, v) => {
			const b = X[T]; if (v === b) {
				return 1;
			}

			return 0;
		}); const w = this.generate(G, Q, (T, v) => {
			if (T === v) {
				return 1;
			}

			if (T < v) {
				return 0;
			}

			return R[T][v];
		}); const M = this.generate(Q, F, (T, v) => {
			if (T > v) {
				return 0;
			}

			return R[T][v];
		}); return [f, w, M];
	}

	function IG(J) {
		const Y = new Array(J); for (let K = 0; K < J; K++) {
			Y[K] = K;
		}

		return Y;
	}

	function TG(J, Y, K, Z, G) {
		const F = Math.min(K, G); let Q = K; let W = Math.abs(J[Y[K]][F]); for (let X = K + 1; X < Z; X++) {
			const V = Math.abs(J[Y[X]][F]); if (V > W) {
				Q = X, W = V;
			}
		}

		const H = Y[K]; Y[K] = Y[Q], Y[Q] = H;
	}

	jK.exports = fG;
}); const dK = $((CW, pK) => {
	function LG(J, Y) {
		return hG(J) || MG(J, Y) || CG(J, Y) || wG();
	}

	function wG() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function CG(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return xK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return xK(J, Y);
		}
	}

	function xK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function MG(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function hG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const gG = I(); const AG = gG.INVALID_MATRIX; function vG(J) {
		if (!(J instanceof this)) {
			throw new TypeError(AG);
		}

		const Y = J.size(); const K = LG(Y, 2); const Z = K[0]; const G = K[1]; const F = Math.min(Z, G); const Q = 1 / (10 ** J._digit * 2); const W = this.clone(J)._matrix; const X = this.identity(Z)._matrix; for (let V = 0; V < F; V++) {
			let H = !0; for (let q = V + 1; q < Z; q++) {
				if (Math.abs(W[q][V]) >= Q) {
					H = !1; break;
				}
			}

			if (!H) {
				let U = 0; for (let B = V; B < Z; B++) {
					U += W[B][V] ** 2;
				}

				U = Math.sqrt(U); let E = -1; if (W[V][V] < 0) {
					E = 1;
				}

				const O = W[V][V] - E * U; const N = new Array(Z - V); for (let P = 0; P < Z - V; P++) {
					N[P] = W[P + V][V] / O;
				}

				N[0] = 1; const S = -1 * E * O / U; const R = new Array(Z - V); for (let k = 0; k < Z - V; k++) {
					const f = new Array(G); for (let w = 0; w < G; w++) {
						f[w] = W[V + k][w];
					}

					R[k] = f;
				}

				for (let M = V; M < Z; M++) {
					for (let T = 0; T < G; T++) {
						let v = 0; for (let b = 0; b < Z - V; b++) {
							v += R[b][T] * N[b];
						}

						W[M][T] = R[M - V][T] - S * N[M - V] * v;
					}
				}

				const p = new Array(Z); for (let m = 0; m < Z; m++) {
					const s = new Array(Z - V); for (let t = 0; t < Z - V; t++) {
						s[t] = X[m][V + t];
					}

					p[m] = s;
				}

				for (let d = 0; d < Z; d++) {
					for (let a = V; a < Z; a++) {
						let D1 = 0; for (let W0 = 0; W0 < Z - V; W0++) {
							D1 += p[d][W0] * N[W0];
						}

						X[d][a] = p[d][a - V] - S * N[a - V] * D1;
					}
				}
			}
		}

		for (let X0 = 0; X0 < Z; X0++) {
			for (let V0 = 0; V0 < G; V0++) {
				if (X0 > V0) {
					W[X0][V0] = 0;
				}
			}
		}

		return [new this(X), new this(W)];
	}

	pK.exports = vG;
}); const _K = $((MW, cK) => {
	function yG(J, Y) {
		return pG(J) || xG(J, Y) || bG(J, Y) || jG();
	}

	function jG() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function bG(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return uK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return uK(J, Y);
		}
	}

	function uK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function xG(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function pG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const dG = I(); const uG = dG.INVALID_MATRIX; function cG(J) {
		if (!(J instanceof this)) {
			throw new TypeError(uG);
		}

		const Y = J.size(); const K = yG(Y, 2); const Z = K[0]; const G = K[1]; const F = J._matrix; return this.generate(Z, G, (Q, W) => F[Q][W]);
	}

	cK.exports = cG;
}); const sK = $((hW, mK) => {
	function _G(J, Y) {
		return tG(J) || sG(J, Y) || mG(J, Y) || lG();
	}

	function lG() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function mG(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return lK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return lK(J, Y);
		}
	}

	function lK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function sG(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function tG(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const J1 = I(); const nG = J1.INVALID_ROW_COL; const oG = J1.OVERFLOW_COLUMN; const aG = J1.INVALID_MATRIX; function eG(J, Y) {
		if (!(J instanceof this)) {
			throw new TypeError(aG);
		}

		if (!Number.isInteger(Y) || Y < 0) {
			throw new Error(nG);
		}

		const K = J.size(); const Z = _G(K, 2); const G = Z[0]; const F = Z[1]; if (Y >= F) {
			throw new Error(oG);
		}

		const Q = J._matrix; return this.generate(G, 1, W => Q[W][Y]);
	}

	mK.exports = eG;
}); const oK = $((gW, nK) => {
	const Y1 = c(); const tK = o0(); const Z1 = I(); const iG = Z1.INVALID_ARRAY; const K1 = Z1.EXPECTED_ARRAY_OF_NUMBERS_OR_MATRICES; const rG = Z1.INVALID_SQUARE_MATRIX; function J6(J) {
		if (!Array.isArray(J)) {
			throw new TypeError(iG);
		}

		const Y = J.length; let K; for (let Z = 0; Z < Y; Z++) {
			const G = J[Z]; if (!tK(G) && !(G instanceof Y1)) {
				throw new Error(K1);
			}

			if (tK(G)) {
				if (!K) {
					K = 'number'; continue;
				}

				if (K !== 'number') {
					throw new Error(K1);
				}
			} else {
				if (!G.isSquare()) {
					throw new Error(rG);
				}

				if (!K) {
					K = 'square'; continue;
				}

				if (K !== 'square') {
					throw new Error(K1);
				}
			}
		}

		if (K === 'number') {
			return Y1.generate(Y, Y, (U, B) => {
				if (U === B) {
					return J[U];
				}

				return 0;
			});
		}

		let F = 0; const Q = new Array(Y); for (let W = 0; W < Y; W++) {
			const X = J[W].size()[0]; F += X, Q[W] = X;
		}

		let V = 0; let H = 0; let q = Q[V]; return Y1.generate(F, F, (U, B) => {
			if (U - H === q && B - H === q) {
				H += q, V++;
			}

			const E = U - H; const O = B - H; q = Q[V]; while (q === 0) {
				V++, q = Q[V];
			}

			if (E < q && E >= 0 && O < q && O >= 0) {
				return J[V]._matrix[E][O];
			}

			return 0;
		});
	}

	nK.exports = J6;
}); const iK = $((AW, eK) => {
	function Y6(J, Y) {
		return F6(J) || G6(J, Y) || Z6(J, Y) || K6();
	}

	function K6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function Z6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return aK(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return aK(J, Y);
		}
	}

	function aK(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function G6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function F6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const Q6 = I(); const W6 = Q6.INVALID_MATRIX; function X6(J, Y) {
		if (!(J instanceof this)) {
			throw new TypeError(W6);
		}

		const K = J.size(); const Z = Y6(K, 2); const G = Z[0]; const F = Z[1]; const Q = J._matrix; return this.generate(G, F, (W, X) => Y(Q[W][X]));
	}

	eK.exports = X6;
}); const JZ = $((vW, rK) => {
	const V6 = K0(); function q6(J, Y, K) {
		const Z = V6(J, Y); if (J === 0 || Y === 0) {
			return new this([]);
		}

		for (let G = 0; G < J; G++) {
			for (let F = 0; F < Y; F++) {
				Z[G][F] = K(G, F);
			}
		}

		return new this(Z);
	}

	rK.exports = q6;
}); const ZZ = $((yW, KZ) => {
	function H6(J, Y) {
		return E6(J) || B6(J, Y) || $6(J, Y) || U6();
	}

	function U6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function $6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return YZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return YZ(J, Y);
		}
	}

	function YZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function B6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function E6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const O6 = I(); const N6 = O6.INVALID_MATRIX; function P6(J) {
		if (!(J instanceof this)) {
			throw new TypeError(N6);
		}

		const Y = J.size(); const K = H6(Y, 2); const Z = K[0]; const G = K[1]; const F = Math.min(Z, G); const Q = J._matrix; const W = new Array(F); for (let X = 0; X < F; X++) {
			W[X] = Q[X][X];
		}

		return W;
	}

	KZ.exports = P6;
}); const FZ = $((jW, GZ) => {
	function D6(J, Y) {
		const K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0; const Z = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1; const G = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0; return this.generate(J, Y, () => Number.parseFloat((Math.random() * (Z - K) + K).toFixed(G)));
	}

	GZ.exports = D6;
}); const WZ = $((bW, QZ) => {
	function R6(J) {
		return this.generate(J, J, (Y, K) => {
			if (Y === K) {
				return 1;
			}

			return 0;
		});
	}

	QZ.exports = R6;
}); const HZ = $((xW, qZ) => {
	function XZ(J, Y) {
		return f6(J) || k6(J, Y) || S6(J, Y) || z6();
	}

	function z6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function S6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return VZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return VZ(J, Y);
		}
	}

	function VZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function k6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function f6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const I6 = I(); const T6 = I6.INVALID_MATRIX; function L6(J, Y) {
		const K = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5; if (!(J instanceof this) || !(Y instanceof this)) {
			throw new TypeError(T6);
		}

		const Z = J.size(); const G = XZ(Z, 2); const F = G[0]; const Q = G[1]; const W = Y.size(); const X = XZ(W, 2); const V = X[0]; const H = X[1]; if (F !== V || Q !== H) {
			return !1;
		}

		const q = 1 / (10 ** K * 2); const U = J._matrix; const B = Y._matrix; for (let E = 0; E < F; E++) {
			for (let O = 0; O < Q; O++) {
				if (Math.abs(U[E][O] - B[E][O]) >= q) {
					return !1;
				}
			}
		}

		return !0;
	}

	qZ.exports = L6;
}); const BZ = $((pW, $Z) => {
	function w6(J, Y) {
		return g6(J) || h6(J, Y) || M6(J, Y) || C6();
	}

	function C6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function M6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return UZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return UZ(J, Y);
		}
	}

	function UZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function h6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function g6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const G1 = I(); const A6 = G1.INVALID_ROW_COL; const v6 = G1.OVERFLOW_ROW; const y6 = G1.INVALID_MATRIX; function j6(J, Y) {
		if (!(J instanceof this)) {
			throw new TypeError(y6);
		}

		if (!Number.isInteger(Y) || Y < 0) {
			throw new Error(A6);
		}

		const K = J.size(); const Z = w6(K, 2); const G = Z[0]; const F = Z[1]; if (Y >= G) {
			throw new Error(v6);
		}

		const Q = J._matrix; return this.generate(1, F, (W, X) => Q[Y][X]);
	}

	$Z.exports = j6;
}); const DZ = $((dW, PZ) => {
	function F1(J, Y) {
		return d6(J) || p6(J, Y) || x6(J, Y) || b6();
	}

	function b6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function x6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return EZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return EZ(J, Y);
		}
	}

	function EZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function p6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function d6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function F0(J) {
		F0 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
			? function (K) {
				return typeof K;
			}
			: function (K) {
				return K && typeof Symbol === 'function' && K.constructor === Symbol && K !== Symbol.prototype ? 'symbol' : typeof K;
			};

		return F0(J);
	}

	const _ = I(); const u6 = _.INVALID_MATRIX; const c6 = _.EXPECTED_STRING_NUMBER_AT_POS_1_2; const Q1 = _.INVALID_ROW; const W1 = _.INVALID_COLUMN; const X1 = _.OVERFLOW_ROW; const OZ = _.INVALID_ROWS_EXPRESSION; const NZ = _.INVALID_COLUMNS_EXPRESSION; const V1 = _.OVERFLOW_COLUMN; function _6(J, Y, K) {
		if (!(J instanceof this)) {
			throw new TypeError(u6);
		}

		const Z = F0(Y); const G = F0(K); if (Z !== 'string' && Z !== 'number' || G !== 'string' && G !== 'number') {
			throw new Error(c6);
		}

		const F = J.size(); const Q = F1(F, 2); const W = Q[0]; const X = Q[1]; let V; let H; let q; let U; if (Z === 'number') {
			if (!Number.isInteger(Y) || Y < 0) {
				throw new Error(Q1);
			}

			if (Y >= W) {
				throw new Error(X1);
			}

			V = Y, H = Y;
		} else {
			const B = Y.split(':'); if (B.length !== 2) {
				throw new Error(OZ);
			}

			const E = F1(B, 2); const O = E[0]; const N = E[1]; if (O === '') {
				V = 0;
			} else {
				const P = Number(O); if (!Number.isInteger(P) || P < 0) {
					throw new Error(Q1);
				}

				if (P >= W) {
					throw new Error(X1);
				}

				V = P;
			}

			if (N === '') {
				H = W - 1;
			} else {
				const S = Number(N); if (!Number.isInteger(S) || S < 0) {
					throw new Error(Q1);
				}

				if (S >= W) {
					throw new Error(X1);
				}

				H = S;
			}

			if (V > H) {
				throw new Error(OZ);
			}
		}

		if (G === 'number') {
			if (!Number.isInteger(K) || K < 0) {
				throw new Error(W1);
			}

			if (K >= X) {
				throw new Error(V1);
			}

			q = K, U = K;
		} else {
			const R = K.split(':'); if (R.length !== 2) {
				throw new Error(NZ);
			}

			const k = F1(R, 2); const f = k[0]; const w = k[1]; if (f === '') {
				q = 0;
			} else {
				const M = Number(f); if (!Number.isInteger(M) || M < 0) {
					throw new Error(W1);
				}

				if (M >= X) {
					throw new Error(V1);
				}

				q = M;
			}

			if (w === '') {
				U = X - 1;
			} else {
				const T = Number(w); if (!Number.isInteger(T) || T < 0) {
					throw new Error(W1);
				}

				if (T >= X) {
					throw new Error(V1);
				}

				U = T;
			}

			if (q > U) {
				throw new Error(NZ);
			}
		}

		const v = J._matrix; const b = H - V + 1; const p = U - q + 1; const m = new Array(b); for (let s = V; s <= H; s++) {
			const t = new Array(p); for (let d = q; d <= U; d++) {
				t[d - q] = v[s][d];
			}

			m[s - V] = t;
		}

		return new this(m);
	}

	PZ.exports = _6;
}); const zZ = $((uW, RZ) => {
	function l6(J, Y) {
		if (Y === void 0) {
			return this.generate(J, J, () => 0);
		}

		return this.generate(J, Y, () => 0);
	}

	RZ.exports = l6;
}); const kZ = $((cW, SZ) => {
	const m6 = I(); const s6 = m6.SIZE_INCOMPATIBLE; function t6(J, Y, K) {
		if (Y * K !== J.length) {
			throw new Error(s6);
		}

		return this.generate(Y, K, (Z, G) => J[Z * K + G]);
	}

	SZ.exports = t6;
}); const TZ = $((_W, IZ) => {
	function n6(J, Y) {
		return i6(J) || e6(J, Y) || a6(J, Y) || o6();
	}

	function o6() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function a6(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return fZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return fZ(J, Y);
		}
	}

	function fZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function e6(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function i6(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function r6() {
		const J = this.size(); const Y = n6(J, 2); const K = Y[0]; const Z = Y[1]; const G = K * Z; const F = new Array(G); for (let Q = 0; Q < K; Q++) {
			for (let W = 0; W < Z; W++) {
				F[Q * Z + W] = this._matrix[Q][W];
			}
		}

		return F;
	}

	IZ.exports = r6;
}); const MZ = $((lW, CZ) => {
	function JF(J, Y) {
		return GF(J) || ZF(J, Y) || KF(J, Y) || YF();
	}

	function YF() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function KF(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return LZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return LZ(J, Y);
		}
	}

	function LZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function ZF(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function GF(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	const wZ = I(); const FF = wZ.INVALID_ROW_COL; const QF = wZ.OVERFLOW_INDEX; function WF(J, Y) {
		if (!Number.isInteger(J) || J < 0 || !Number.isInteger(Y) || Y < 0) {
			throw new Error(FF);
		}

		const K = this._matrix; const Z = this.size(); const G = JF(Z, 2); const F = G[0]; const Q = G[1]; if (J >= F || Y >= Q) {
			throw new Error(QF);
		}

		return K[J][Y];
	}

	CZ.exports = WF;
}); const AZ = $((mW, gZ) => {
	function XF(J, Y) {
		return UF(J) || HF(J, Y) || qF(J, Y) || VF();
	}

	function VF() {
		throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
	}

	function qF(J, Y) {
		if (!J) {
			return;
		}

		if (typeof J === 'string') {
			return hZ(J, Y);
		}

		let K = Object.prototype.toString.call(J).slice(8, -1); if (K === 'Object' && J.constructor) {
			K = J.constructor.name;
		}

		if (K === 'Map' || K === 'Set') {
			return [...J];
		}

		if (K === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(K)) {
			return hZ(J, Y);
		}
	}

	function hZ(J, Y) {
		if (Y == null || Y > J.length) {
			Y = J.length;
		}

		for (var K = 0, Z = new Array(Y); K < Y; K++) {
			Z[K] = J[K];
		}

		return Z;
	}

	function HF(J, Y) {
		let K = J == null ? null : typeof Symbol < 'u' && J[Symbol.iterator] || J['@@iterator']; if (K == null) {
			return;
		}

		const Z = []; let G = !0; let F = !1; let Q; let W; try {
			for (K = K.call(J); !(G = (Q = K.next()).done); G = !0) {
				if (Z.push(Q.value), Y && Z.length === Y) {
					break;
				}
			}
		} catch (error) {
			F = !0, W = error;
		} finally {
			try {
				if (!G && K.return != null) {
					K.return();
				}
			} finally {
				if (F) {
					throw W;
				}
			}
		}

		return Z;
	}

	function UF(J) {
		if (Array.isArray(J)) {
			return J;
		}
	}

	function $F() {
		const J = this._matrix; const Y = this.size(); const K = XF(Y, 2); const Z = K[0]; const G = K[1]; let F = ''; for (let Q = 0; Q < Z; Q++) {
			for (let W = 0; W < G; W++) {
				if (F += J[Q][W].toString(), W !== G - 1) {
					F += ' ';
				}
			}

			if (Q !== Z - 1) {
				F += `
`;
			}
		}

		return F;
	}

	gZ.exports = $F;
}); var c = $((sW, vZ) => {
	const BF = UJ(); const EF = I(); const OF = EF.INVALID_MATRIX; function D(J) {
		if (!BF(J)) {
			throw new Error(OF);
		}

		this._matrix = J, this._digit = 8;
	}

	vZ.exports = D; D.prototype.isDiagonal = OJ(); D.prototype.isSkewSymmetric = PJ(); D.prototype.isSquare = RJ(); D.prototype.isSymmetric = SJ(); D.prototype.isLowerTriangular = IJ(); D.prototype.isUpperTriangular = wJ(); D.prototype.isOrthogonal = MJ(); D.prototype.cond = gJ(); D.prototype.det = yJ(); D.prototype.eigenvalues = _Y(); D.prototype.nullity = mY(); D.prototype.norm = oY(); D.prototype.rank = iY(); D.prototype.size = JK(); D.prototype.trace = KK(); D.add = WK(); D.inverse = VK(); D.multiply = EK(); D.pow = NK(); D.subtract = SK(); D.transpose = IK(); D.backward = wK(); D.forward = hK(); D.solve = vK(); D.LU = bK(); D.QR = dK(); D.clone = _K(); D.column = sK(); D.diag = oK(); D.elementwise = iK(); D.generate = JZ(); D.getDiag = ZZ(); D.getRandomMatrix = FZ(); D.identity = WZ(); D.isEqual = HZ(); D.row = BZ(); D.submatrix = DZ(); D.zero = zZ(); D.fromArray = kZ(); D.prototype.flatten = TZ(); D.prototype.entry = MZ(); D.prototype.toString = AZ();
}); const I0 = {}; const T0 = {}; function z1(J, Y) {
	I0[J] = Y;
}

function S1(J, Y) {
	T0[J] = Y;
}

function q0(J) {
	if (typeof I0[J.name] !== 'function') {
		throw new TypeError(`The provided observation model name (${J.name}) is not registered`);
	}

	return I0[J.name](J);
}

function H0(J, Y) {
	if (typeof T0[J.name] !== 'function') {
		throw new TypeError(`The provided dynamic model (${J.name}) name is not registered`);
	}

	return T0[J.name](J, Y);
}

const B0 = {}; R1(B0, {
	shorttermConstantSpeed: () => l0, constantSpeedDynamic: () => i, constantSpeed: () => d0, constantPositionWithNull: () => _0, constantPosition: () => p0, constantAcceleration: () => u0, composition: () => c0,
}); const x0 = g(A(), 1); function p0(J, Y) {
	let {dimension: K} = J; const Z = Y.dimension; const {observedProjection: G} = Y; const {stateProjection: F} = Y; let {covariance: Q} = J; if (!J.dimension) {
		if (Z) {
			K = Z;
		} else if (G) {
			K = G[0].length;
		} else if (F) {
			K = F[0].length;
		}
	}

	const W = x0.identity(K); return Q ||= x0.identity(K), {
		...J, dimension: K, transition: W, covariance: Q,
	};
}

const WJ = g(A(), 1); function d0(J, Y) {
	const K = J.timeStep || 1; const {observedProjection: Z} = Y; const {stateProjection: G} = Y; const F = Y.dimension; let Q; if (G && Number.isInteger(G[0].length / 2)) {
		Q = Y.stateProjection[0].length;
	} else if (Z) {
		Q = Z[0].length * 2;
	} else if (F) {
		Q = F * 2;
	} else {
		throw new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter');
	}

	const W = Q / 2; const X = WJ.identity(Q); for (let q = 0; q < W; q++) {
		X[q][q + W] = K;
	}

	const V = new Array(W).fill(1).concat(new Array(W).fill(K * K)); const H = J.covariance || V; return {
		...J, dimension: Q, transition: X, covariance: H,
	};
}

const XJ = g(A(), 1); function u0(J, Y) {
	const K = J.timeStep || 1; const {observedProjection: Z} = Y; const {stateProjection: G} = Y; const F = Y.dimension; let Q; if (G && Number.isInteger(G[0].length / 3)) {
		Q = Y.stateProjection[0].length;
	} else if (Z) {
		Q = Z[0].length * 3;
	} else if (F) {
		Q = F * 3;
	} else {
		throw new Error('observedProjection or stateProjection should be defined in observation in order to use constant-speed filter');
	}

	const W = Q / 3; const X = XJ.identity(Q); for (let q = 0; q < W; q++) {
		X[q][q + W] = K, X[q][q + 2 * W] = 0.5 * K ** 2, X[q + W][q + 2 * W] = K;
	}

	const V = new Array(W).fill(1).concat(new Array(W).fill(K * K)).concat(new Array(W).fill(K ** 4)); const H = J.covariance || V; return {
		...J, dimension: Q, transition: X, covariance: H,
	};
}

function c0({perName: J}, Y) {
	const {observedProjection: K} = Y; const Z = K[0].length; const G = Object.keys(J); const F = {}; let Q = Z; let W = 0; G.forEach(H => {
		const q = J[H].obsDynaIndexes; if (typeof J[H].name === 'string' && J[H].name !== H) {
			throw new Error(`${J[H].name} and "${H}" should match`);
		}

		J[H].name = H; const {dimension: U, transition: B, covariance: E, init: O} = H0(J[H], Y); const N = []; for (let P = 0; P < U; P++) {
			const S = P < q.length; let R; if (S) {
				if (R = W, R !== q[P]) {
					throw new Error('thsoe should match');
				}

				W++;
			} else {
				R = Q, Q++;
			}

			N.push(R);
		}

		F[H] = {
			dynamicIndexes: N, transition: B, dimension: U, covariance: E, init: O,
		};
	}); const X = G.map(H => F[H].dimension).reduce((H, q) => H + q, 0); if (Q !== X) {
		throw new Error('miscalculation of transition');
	}

	const V = {index: -1, mean: new Array(X), covariance: new Array(X).fill(0).map(() => new Array(X).fill(0))}; return G.forEach(H => {
		const {dynamicIndexes: q, init: U} = F[H]; if (typeof U !== 'object') {
			throw new TypeError('Init is mandatory');
		}

		q.forEach((B, E) => q.forEach((O, N) => {
			V.covariance[B][O] = U.covariance[E][N];
		})), q.forEach((B, E) => {
			V.mean[B] = U.mean[E];
		});
	}), {
		dimension: X, init: V, transition(H) {
			const {previousCorrected: q} = H; const U = new Array(X).fill(void 0).map(() => new Array(X).fill(0)); return G.forEach(B => {
				const {dynamicIndexes: E, transition: O} = F[B]; const N = {...H, previousCorrected: q.subState(E)}; const P = O(N); E.forEach((S, R) => E.forEach((k, f) => {
					U[S][k] = P[R][f];
				}));
			}), U;
		}, covariance(H) {
			const {previousCorrected: q} = H; const U = new Array(X).fill(void 0).map(() => new Array(X).fill(0)); return G.forEach(B => {
				const {dynamicIndexes: E, covariance: O} = F[B]; const N = {...H, previousCorrected: q.subState(E)}; const P = O(N); E.forEach((S, R) => E.forEach((k, f) => {
					U[S][k] = P[R][f];
				}));
			}), U;
		},
	};
}

const e = g(A(), 1); const Q7 = 1e6; function _0({staticCovariance: J, obsDynaIndexes: Y, init: K}) {
	const Z = Y.length; if (K ||= {mean: new Array(Y.length).fill(0).map(() => [0]), covariance: e.diag(new Array(Y.length).fill(Q7)), index: -1}, J && J.length !== Z) {
		throw new Error('staticCovariance has wrong size');
	}

	return {
		dimension: Z, transition() {
			return e.identity(Z);
		}, covariance({previousCorrected: G, index: F}) {
			const Q = F - G.index; if (J) {
				return J.map(W => W.map(X => X * Q));
			}

			return e.identity(Z);
		}, init: K,
	};
}

const $0 = g(A(), 1); function i(J, Y) {
	const {staticCovariance: K, avSpeed: Z, center: G} = J; const F = Y.observedProjection[0].length; const Q = 2 * F; if (G === void 0) {
		throw new TypeError('Center must be defined');
	}

	if (G.length !== F) {
		throw new TypeError(`Center size should be ${F}`);
	}

	if (Z.length !== F) {
		throw new TypeError(`avSpeed size should be ${F}`);
	}

	const W = $0.diag(G.map(q => q * q / 3).concat(Z.map(q => q * q / 3))); return {
		init: {mean: G.map(q => [q]).concat(G.map(() => [0])), covariance: W, index: -1}, dimension: Q, transition: q => {
			const {getTime: U, index: B, previousCorrected: E} = q; const O = U(B) - U(E.index); if (typeof O !== 'number' || Number.isNaN(O)) {
				throw new TypeError(`dT (${O}) should be a number`);
			}

			const N = $0.diag(G.map(() => 1).concat(G.map(() => 1))); for (let P = 0; P < F; P++) {
				N[P][F + P] = O;
			}

			if (Number.isNaN(N[0][2])) {
				throw new TypeError('nan mat');
			}

			return N;
		}, covariance: q => {
			const {index: U, previousCorrected: B, getTime: E} = q; const O = E(U) - E(B.index); if (typeof O !== 'number') {
				throw new TypeError(`dT (${O}) should be a number`);
			}

			const N = Math.sqrt(O); if (Number.isNaN(N)) {
				throw console.log({lastPreviousIndex: B.index, index: U}), console.log(O, B.index, U, E(U), E(B.index)), new Error('Sqrt(dT) is NaN');
			}

			return $0.diag(K.map(P => P * N));
		},
	};
}

const r = g(A(), 1); const W7 = function (J, Y) {
	if (J === 0) {
		return 0;
	}

	if (Y === 0) {
		return 1;
	}

	return J / Y;
};

function l0(J, Y) {
	const {typicalTimes: K} = J; if (!Array.isArray(K)) {
		throw new TypeError('typicalTimes must be defined');
	}

	const Z = i(J, Y); const {dimension: G, init: F} = Z; if (K.length !== G) {
		throw new TypeError(`typicalTimes (${K.length}) length is not as expected (${G})`);
	}

	const Q = function ({ratios: W, aMat: X, bMat: V}) {
		return r.elemWise([X, V], ([H, q], U, B) => {
			const E = U === B ? W[U] : (W[U] + W[B]) / 2; return E * H + (1 - E) * q;
		});
	};

	return {
		dimension: G, init: F, transition(W) {
			const X = Z.transition(W); const {getTime: V, index: H, previousCorrected: q} = W; const U = V(H) - V(q.index); const B = K.map(O => Math.exp(-1 * U / O)); const E = r.diag(r.elemWise([F.mean, q.mean], ([O, N]) => W7(O, N)).reduce((O, N) => O.concat(N))); return Q({ratios: B, aMat: X, bMat: E});
		}, covariance(W, X) {
			const {getTime: V, index: H, previousCorrected: q} = W; const U = V(H) - V(q.index); const B = K.map(O => Math.exp(-1 * U / O)); const E = Z.covariance(W); return Q({ratios: B, aMat: E, bMat: F.covariance});
		},
	};
}

const z0 = {}; R1(z0, {sensorProjected: () => q1, sensorLocalVariance: () => n0, sensor: () => t0}); const s0 = g(A(), 1); const m0 = g(A(), 1); function E0(J, Y, K = 'checkShape') {
	if (J.length !== Y[0]) {
		throw new Error(`[${K}] expected size (${Y[0]}) and length (${J.length}) does not match`);
	}

	if (Y.length > 1) {
		return J.forEach(Z => E0(Z, Y.slice(1), K));
	}
}

function y(J, Y, K = 'checkMatrix') {
	if (!Array.isArray(J)) {
		throw new TypeError(`[${K}] should be a 2-level array matrix and is ${J}`);
	}

	for (const Z of J) {
		if (!Array.isArray(Z)) {
			throw new TypeError(`[${K}] 1-level array should be a matrix ${JSON.stringify(J)}`);
		}
	}

	if (J.reduce((Z, G) => Z.concat(G)).some(Z => Number.isNaN(Z))) {
		throw new Error(`[${K}] Matrix should not have a NaN
In : 
			` + J.join(`
`));
	}

	if (Y) {
		E0(J, Y, K);
	}
}

function n(J) {
	if (J === void 0) {
		return 'undefined';
	}

	let Y = ''; if (Y = typeof J === 'function' ? J.toString() : JSON.stringify(J), Y.length < 100) {
		return Y;
	}

	return Y.slice(0, 97) + '...';
}

class J0 {
	constructor() {
		throw new Error('do not constuct me');
	}

	dummy() {}

	static assertNotArray(J, Y = 'parameter') {
		if (Array.isArray(J)) {
			throw new TypeError(`E001 ${Y} cannot be an array. current value is ${n(J)}.`);
		}
	}

	static assertIsArray2D(J, Y = 'parameter') {
		if (!Array.isArray(J)) {
			throw new TypeError(`E002 ${Y} is not an array. current value is ${n(J)}.`);
		}

		if (J.length === 0) {
			return;
		}

		if (!Array.isArray(J[0])) {
			throw new TypeError(`E003 ${Y} must be an array of array. current value is ${n(J)}.`);
		}
	}

	static assertIsArray2DOrFnc(J, Y = 'parameter') {
		if (typeof J === 'function') {
			return;
		}

		J0.assertIsArray2D(J, Y);
	}

	static assertIsNumbersArray(J, Y = 'parameter') {
		if (typeof J === 'number') {
			return;
		}

		if (!J0.isArray(J)) {
			throw new TypeError(`E004 ${Y} is not an array. current value is ${n(J)}.`);
		}

		if (J.length === 0) {
			return;
		}

		if (typeof J[0] === 'number') {
			return;
		}

		if (!J0.isArray(J[0])) {
			throw new TypeError(`E005 ${Y} is not an array of array. current value is ${n(J)}.`);
		}

		if (typeof J[0][0] !== 'number') {
			throw new TypeError(`E006 ${Y} is not an array of array of number. current value is ${n(J)}.`);
		}
	}

	static isArray2D(J) {
		if (!Array.isArray(J)) {
			return !1;
		}

		return Array.isArray(J[0]);
	}

	static isArray1D(J) {
		if (!Array.isArray(J)) {
			return !1;
		}

		return typeof J[0] === 'number';
	}

	static isArray(J) {
		if (!Array.isArray(J)) {
			return !1;
		}

		return !0;
	}

	static isFunction(J) {
		if (typeof J === 'function') {
			return !0;
		}

		return !1;
	}
} const j = J0; function u(J, Y = {}) {
	const {dimension: K, title: Z = 'polymorph'} = Y; if (typeof J === 'number' || Array.isArray(J)) {
		if (typeof J === 'number' && typeof K === 'number') {
			return m0.diag(new Array(K).fill(J));
		}

		if (j.isArray2D(J)) {
			let G; if (typeof K === 'number') {
				G = [K, K];
			}

			return y(J, G, Z), J;
		}

		if (j.isArray1D(J)) {
			return m0.diag(J);
		}
	}

	return J;
}

const X7 = J => J.map(Y => [...Y]); function t0(J) {
	const {sensorDimension: Y = 1, sensorCovariance: K = 1, nSensors: Z = 1} = J; const G = u(K, {dimension: Y}); if (j.isFunction(G)) {
		throw new TypeError('sensorCovarianceFormatted can not be a function here');
	}

	y(G, [Y, Y], 'observation.sensorCovariance'); const F = s0.identity(Y); let Q = []; const W = Y * Z; const X = s0.identity(W); for (let V = 0; V < Z; V++) {
		Q = Q.concat(X7(F)); for (const [H, q] of G.entries()) {
			for (const [U, B] of q.entries()) {
				X[H + V * Y][U + V * Y] = B;
			}
		}
	}

	return {
		...J, dimension: W, observedProjection: Q, covariance: X,
	};
}

const VJ = g(A(), 1); function n0(J) {
	const {dimension: Y, observedProjection: K, covariance: Z} = q0({...J, name: 'sensor'}); return {
		dimension: Y, observedProjection: K, covariance(G) {
			const F = VJ.identity(Y); const {variance: Q} = G; return Q.forEach((W, X) => {
				F[X][X] = W * Z[X][X];
			}), F;
		},
	};
}

const R0 = g(A(), 1); const yZ = g(c(), 1); const NF = 0.1; const PF = function (J, Y = 0.000_000_000_1) {
	const Z = new yZ.default(J).eigenvalues(); for (const G of Z) {
		if (G <= -Y) {
			throw console.log(J, G), new Error(`Eigenvalue should be positive (actual: ${G})`);
		}
	}

	console.log('is definite positive', J);
};

const DF = function (J, Y = 'checkSymetric') {
	for (const [K, Z] of J.entries()) {
		for (const [G, F] of Z.entries()) {
			if (K === G && F < 0) {
				throw new Error(`[${Y}] Variance[${G}] should be positive (actual: ${F})`);
			} else if (Math.abs(F) > Math.sqrt(J[K][K] * J[G][G])) {
				throw console.log(J), new Error(`[${Y}] Covariance[${K}][${G}] should verify Cauchy Schwarz Inequality (expected: |x| <= sqrt(${J[K][K]} * ${J[G][G]}) actual: ${F})`);
			} else if (Math.abs(F - J[G][K]) > NF) {
				throw new Error(`[${Y}] Covariance[${K}][${G}] should equal Covariance[${G}][${K}]  (actual diff: ${Math.abs(F - J[G][K])})  = ${F} - ${J[G][K]}
${J.join(`
`)} is invalid`);
			}
		}
	}
};

function l(J, Y) {
	const {covariance: K, eigen: Z = !1} = J; if (y(K), DF(K), Z) {
		PF(K);
	}
}

function P0({correlation: J, variance: Y}) {
	return l({covariance: J}), J.map((K, Z) => K.map((G, F) => G * Math.sqrt(Y[F] * Y[Z])));
}

function D0(J) {
	l({covariance: J}); const Y = J.map((K, Z) => J[Z][Z]); return {variance: Y, correlation: J.map((K, Z) => K.map((G, F) => G / Math.sqrt(Y[F] * Y[Z])))};
}

function q1({selectedCovariance: J, totalDimension: Y, obsIndexes: K, selectedStateProjection: Z}) {
	if (!Z) {
		Z = new Array(K.length).fill(0).map(() => new Array(K.length).fill(0)), K.forEach((V, H) => {
			Z[H][H] = 1;
		});
	} else if (Z.length !== K.length) {
		throw new Error(`[Sensor-projected] Shape mismatch between ${Z.length} and ${K.length}`);
	}

	const G = R0.identity(Y); K.forEach((V, H) => {
		if (J) {
			K.forEach((q, U) => {
				G[V][q] = J[H][U];
			});
		}
	}); const {correlation: F, variance: Q} = D0(G); const W = Z[0].length; if (Z.length !== K.length) {
		throw new Error(`shape mismatch (${Z.length} vs ${K.length})`);
	}

	const X = R0.matPermutation({
		outputSize: [Y, W], colIndexes: Z[0].map((V, H) => H), rowIndexes: K, matrix: Z,
	}); return {
		dimension: Y, observedProjection: X, covariance(V) {
			const {variance: H} = V; if (!H) {
				return G;
			}

			if (H.length !== G.length) {
				throw new Error('variance is difference size from baseCovariance');
			}

			return P0({correlation: F, variance: Q.map((U, B) => H[B] * U)});
		},
	};
}

const dZ = g(A(), 1); function Q0(J) {
	const {observation: Y, dimension: K} = J; if (!Array.isArray(Y)) {
		if (K === 1 && typeof Y === 'number') {
			return [[Y]];
		}

		throw new TypeError(`The observation (${Y}) should be an array (dimension: ${K})`);
	}

	if (Y.length !== K) {
		throw new TypeError(`Observation (${Y.length}) and dimension (${K}) not matching`);
	}

	if (typeof Y[0] === 'number' || Y[0] === null) {
		return Y.map(Z => [Z]);
	}

	return Y;
}

function H1(J) {
	const {observation: Y, dynamic: K} = J; const {stateProjection: Z} = Y; const {transition: G} = K; const F = K.dimension; const Q = Y.dimension; if (F && Q && Array.isArray(Z) && (F !== Z[0].length || Q !== Z.length)) {
		throw new TypeError('stateProjection dimensions not matching with observation and dynamic dimensions');
	}

	if (F && Array.isArray(G) && F !== G.length) {
		throw new TypeError('transition dimension not matching with dynamic dimension');
	}

	if (Array.isArray(Z)) {
		return {observation: {...Y, dimension: Z.length}, dynamic: {...K, dimension: Z[0].length}};
	}

	if (Array.isArray(G)) {
		return {observation: Y, dynamic: {...K, dimension: G.length}};
	}

	return {observation: Y, dynamic: K};
}

function U1(J) {
	const {observation: Y, dynamic: K} = J; const Z = K.dimension; const G = Y.dimension; if (!Z || !G) {
		throw new TypeError('Dimension is not set');
	}

	return {observation: Y, dynamic: K};
}

const $1 = g(A(), 1); const jZ = g(A(), 1); function B1(J) {
	const {observation: Y, dynamic: K} = J; const {observedProjection: Z, stateProjection: G} = Y; const F = Y.dimension; const Q = K.dimension; if (Z && G) {
		throw new TypeError('You cannot use both observedProjection and stateProjection');
	}

	if (Z) {
		const W = $1.padWithZeroCols(Z, {columns: Q}); return {observation: {...Y, stateProjection: W}, dynamic: K};
	}

	if (F && Q && !G) {
		const W = jZ.identity(F); return {observation: {...Y, stateProjection: $1.padWithZeroCols(W, {columns: Q})}, dynamic: K};
	}

	return {observation: Y, dynamic: K};
}

const bZ = g(A(), 1); function E1(J) {
	const {observation: Y, dynamic: K} = J; if (!K.init) {
		const F = K.dimension; const Q = new Array(F).fill(0); const W = new Array(F).fill(1e6); return {observation: Y, dynamic: {...K, init: {mean: Q.map(V => [V]), covariance: bZ.diag(W), index: -1}}};
	}

	if (K.init && !K.init.mean) {
		throw new Error('dynamic.init should have a mean key');
	}

	const Z = u(K.init.covariance, {dimension: K.dimension}); if (j.isFunction(Z)) {
		throw new TypeError('covariance can not be a function');
	}

	return K.init = {...K.init, covariance: Z}, {observation: Y, dynamic: K};
}

function o(J, {label: Y = ''} = {}) {
	if (typeof J === 'function') {
		return J;
	}

	if (Array.isArray(J)) {
		return J;
	}

	throw new Error(`${Y === null ? '' : Y + ' : '}Only arrays and functions are authorized (got: "${J}")`);
}

function O1(J) {
	return J.filter((Y, K) => J.indexOf(Y) === K);
}

const xZ = 100; function pZ(J, Y) {
	if (Y > xZ) {
		throw new Error(`In deepAssign, number of recursive call (${Y}) reached limit (${xZ}), deepAssign is not working on  self-referencing objects`);
	}

	const K = J.filter(X => X !== void 0 && X !== null); const Z = K.at(-1); if (K.length === 1) {
		return K[0];
	}

	if (typeof Z !== 'object' || Array.isArray(Z)) {
		return Z;
	}

	if (K.length === 0) {
		return null;
	}

	const G = K.filter(X => typeof X === 'object'); let F = []; for (const X of G) {
		F = F.concat(Object.keys(X));
	}

	const Q = O1(F); const W = {}; for (const X of Q) {
		const V = G.map(H => H[X]); W[X] = pZ(V, Y + 1);
	}

	return W;
}

function N1(...J) {
	return pZ(J, 0);
}

const C = g(A(), 1); class h {
	mean; covariance; index;

	constructor(J) {
		this.mean = J.mean, this.covariance = J.covariance, this.index = J.index || void 0;
	}

	check(J) {
		h.check(this, J);
	}

	static check(J, Y = {}) {
		const {dimension: K, title: Z, eigen: G} = Y; if (!(J instanceof h)) {
			throw new TypeError(`The argument is not a state 
Tips: maybe you are using 2 different version of kalman-filter in your npm deps tree`);
		}

		const {mean: F, covariance: Q} = J; const W = F.length; if (typeof K === 'number' && W !== K) {
			throw new Error(`[${Z}] State.mean ${F} with dimension ${W} does not match expected dimension (${K})`);
		}

		y(F, [W, 1], Z ? Z + '.mean' : 'mean'), y(Q, [W, W], Z ? Z + '.covariance' : 'covariance'), l({covariance: Q, eigen: G}, Z ? Z + '.covariance' : 'covariance');
	}

	static matMul(J) {
		const {state: Y, matrix: K} = J; const Z = C.matMul(C.matMul(K, Y.covariance), C.transpose(K)); const G = C.matMul(K, Y.mean); return new h({mean: G, covariance: Z, index: Y.index});
	}

	subState(J) {
		return new h({mean: J.map(K => this.mean[K]), covariance: C.subSquareMatrix(this.covariance, J), index: this.index});
	}

	rawDetailedMahalanobis(J) {
		const Y = C.subtract(this.mean, J); this.check(); const K = C.invert(this.covariance); if (K === null) {
			throw this.check({eigen: !0}), new Error(`Cannot invert covariance ${JSON.stringify(this.covariance)}`);
		}

		const Z = C.transpose(Y); const G = C.matMul(C.matMul(Z, K), Y); const F = Math.sqrt(G[0][0]); if (Number.isNaN(F)) {
			const Q = C.matMul(C.matMul(Z, K), Y); throw console.log({
				diff: Y, covarianceInvert: K, this: this, point: J,
			}, Q), new Error('mahalanobis is NaN');
		}

		return {diff: Y, covarianceInvert: K, value: F};
	}

	detailedMahalanobis(J) {
		const {kf: Y, observation: K, obsIndexes: Z} = J; if (K.length !== Y.observation.dimension) {
			throw new Error(`Mahalanobis observation ${K} (dimension: ${K.length}) does not match with kf observation dimension (${Y.observation.dimension})`);
		}

		let G = Q0({observation: K, dimension: K.length}); j.assertIsArray2D(Y.observation.stateProjection, 'State.detailedMahalanobis'); const F = Y.getValue(Y.observation.stateProjection, {}); let Q = h.matMul({state: this, matrix: F}); if (Array.isArray(Z)) {
			Q = Q.subState(Z), G = Z.map(W => G[W]);
		}

		return Q.rawDetailedMahalanobis(G);
	}

	mahalanobis(J) {
		const Y = this.detailedMahalanobis(J).value; if (Number.isNaN(Y)) {
			throw new TypeError('mahalanobis is NaN');
		}

		return Y;
	}

	obsBhattacharyya(J) {
		const {kf: Y, state: K, obsIndexes: Z} = J; j.assertIsArray2D(Y.observation.stateProjection, 'State.obsBhattacharyya'); const G = Y.getValue(Y.observation.stateProjection, {}); let F = h.matMul({state: this, matrix: G}); let Q = h.matMul({state: K, matrix: G}); if (Array.isArray(Z)) {
			F = F.subState(Z), Q = Q.subState(Z);
		}

		return F.bhattacharyya(Q);
	}

	bhattacharyya(J) {
		const {covariance: Y, mean: K} = this; const Z = C.elemWise([Y, J.covariance], ([Q, W]) => (Q + W) / 2); let G; try {
			G = C.invert(Z);
		} catch (error) {
			throw console.log('Cannot invert', Z), error;
		}

		const F = C.subtract(K, J.mean); return C.matMul(C.transpose(F), C.matMul(G, F))[0][0];
	}
} const L = g(A(), 1); const RF = {
	info: (...J) => console.log(...J), debug() {}, warn: (...J) => console.log(...J), error: (...J) => console.log(...J),
}; class S0 {
	dynamic; observation; logger;

	constructor(J) {
		const {dynamic: Y, observation: K, logger: Z = RF} = J; this.dynamic = Y, this.observation = K, this.logger = Z;
	}

	getValue(J, Y) {
		return typeof J === 'function' ? J(Y) : J;
	}

	getInitState() {
		const {mean: J, covariance: Y, index: K} = this.dynamic.init; const Z = new h({mean: J, covariance: Y, index: K}); return h.check(Z, {title: 'dynamic.init'}), Z;
	}

	getPredictedCovariance(J = {}) {
		let {previousCorrected: Y, index: K} = J; Y ||= this.getInitState(); const Z = {previousCorrected: Y, index: K, ...J}; const G = this.getValue(this.dynamic.transition, Z); y(G, [this.dynamic.dimension, this.dynamic.dimension], 'dynamic.transition'); const F = L.transpose(G); const Q = L.matMul(G, Y.covariance); const W = L.matMul(Q, F); const X = this.getValue(this.dynamic.covariance, Z); const V = L.add(X, W); return y(V, [this.dynamic.dimension, this.dynamic.dimension], 'predicted.covariance'), V;
	}

	predictMean(J) {
		const Y = this.predictMeanWithoutControl(J); if (!this.dynamic.constant) {
			return Y;
		}

		const {opts: K} = J; const Z = this.dynamic.constant(K); return y(Z, [this.dynamic.dimension, 1], 'dynamic.constant'), L.add(Y, Z);
	}

	predictMeanWithoutControl(J) {
		const {opts: Y, transition: K} = J; if (this.dynamic.fn) {
			return this.dynamic.fn(Y);
		}

		const {previousCorrected: Z} = Y; return L.matMul(K, Z.mean);
	}

	predict(J = {}) {
		let {previousCorrected: Y, index: K} = J; if (Y ||= this.getInitState(), typeof K !== 'number' && typeof Y.index === 'number') {
			K = Y.index + 1;
		}

		h.check(Y, {dimension: this.dynamic.dimension}); const Z = {...J, previousCorrected: Y, index: K}; const G = this.getValue(this.dynamic.transition, Z); const F = this.predictMean({transition: G, opts: Z}); const Q = this.getPredictedCovariance(Z); const W = new h({mean: F, covariance: Q, index: K}); if (this.logger.debug('Prediction done', W), Number.isNaN(W.mean[0][0])) {
			throw new TypeError('nan');
		}

		return W;
	}

	getGain(J) {
		let {predicted: Y, stateProjection: K} = J; const Z = {index: Y.index, ...J}; j.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.getGain'), K ||= this.getValue(this.observation.stateProjection, Z); const G = this.getValue(this.observation.covariance, Z); y(G, [this.observation.dimension, this.observation.dimension], 'observation.covariance'); const F = L.transpose(K); y(K, [this.observation.dimension, this.dynamic.dimension], 'observation.stateProjection'); const Q = L.matMul(L.matMul(K, Y.covariance), F); const W = L.add(Q, G); return L.matMul(L.matMul(Y.covariance, F), L.invert(W));
	}

	getCorrectedCovariance(J) {
		let {predicted: Y, optimalKalmanGain: K, stateProjection: Z} = J; const G = L.identity(Y.covariance.length); if (!Z) {
			j.assertIsArray2D(this.observation.stateProjection, 'CoreKalmanFilter.getCorrectedCovariance'); const F = {index: Y.index, ...J}; Z = this.getValue(this.observation.stateProjection, F);
		}

		return K ||= this.getGain({stateProjection: Z, ...J}), L.matMul(L.subtract(G, L.matMul(K, Z)), Y.covariance);
	}

	getPredictedObservation(J) {
		const {opts: Y, stateProjection: K} = J; if (this.observation.fn) {
			return this.observation.fn(Y);
		}

		const {predicted: Z} = Y; return L.matMul(K, Z.mean);
	}

	correct(J) {
		const {predicted: Y, observation: K} = J; if (h.check(Y, {dimension: this.dynamic.dimension}), !K) {
			throw new Error('no measure available');
		}

		const Z = {
			observation: K, predicted: Y, index: Y.index, ...J,
		}; j.assertIsArray2DOrFnc(this.observation.stateProjection, 'CoreKalmanFilter.correct'); const G = this.getValue(this.observation.stateProjection, Z); const F = this.getGain({predicted: Y, stateProjection: G, ...J}); const Q = L.subtract(K, this.getPredictedObservation({stateProjection: G, opts: Z})); const W = L.add(Y.mean, L.matMul(F, Q)); if (Number.isNaN(W[0][0])) {
			throw console.log({optimalKalmanGain: F, innovation: Q, predicted: Y}), new TypeError('Mean is NaN after correction');
		}

		const X = this.getCorrectedCovariance({
			predicted: Y, optimalKalmanGain: F, stateProjection: G, ...J,
		}); const V = new h({mean: W, covariance: X, index: Y.index}); return this.logger.debug('Correction done', V), V;
	}
} const zF = function (J) {
	if (typeof J === 'string') {
		return {name: J};
	}

	return {name: 'constant-position'};
};

const SF = function (J) {
	if (typeof J === 'number') {
		return {name: 'sensor', sensorDimension: J};
	}

	if (typeof J === 'string') {
		return {name: J};
	}

	return {name: 'sensor'};
};

const kF = function (J) {
	let {observation: Y, dynamic: K} = J; if (typeof Y !== 'object' || Y === null) {
		Y = SF(Y);
	}

	if (typeof K !== 'object' || K === null) {
		K = zF(K);
	}

	if (typeof Y.name === 'string') {
		Y = q0(Y);
	}

	if (typeof K.name === 'string') {
		K = H0(K, Y);
	}

	const Z = H1({observation: Y, dynamic: K}); const G = U1(Z); const F = B1(G); return E1(F);
};

const fF = function (J) {
	const {observation: Y, dynamic: K} = J; return j.assertNotArray(Y, 'modelsParametersToCoreOptions: observation'), N1(J, {observation: {stateProjection: o(u(Y.stateProjection), {label: 'observation.stateProjection'}), covariance: o(u(Y.covariance, {dimension: Y.dimension}), {label: 'observation.covariance'})}, dynamic: {transition: o(u(K.transition), {label: 'dynamic.transition'}), covariance: o(u(K.covariance, {dimension: K.dimension}), {label: 'dynamic.covariance'})}});
};

class P1 extends S0 {
	constructor(J = {}) {
		const Y = kF(J); const K = fF(Y); super({...J, ...K});
	}

	correct(J) {
		const Y = Q0({observation: J.observation, dimension: this.observation.dimension}); return super.correct({...J, observation: Y});
	}

	filter(J) {
		const Y = super.predict(J); return this.correct({...J, predicted: Y});
	}

	filterAll(J) {
		let Y = this.getInitState(); const K = []; for (const Z of J) {
			const G = this.predict({previousCorrected: Y}); Y = this.correct({predicted: G, observation: Z}), K.push(Y.mean.map(F => F[0]));
		}

		return K;
	}

	asymptoticStateCovariance({limitIterations: J = 100, tolerance: Y = 0.000_001} = {}) {
		let K = super.getInitState(); const Z = []; for (let G = 0; G < J; G++) {
			const F = new h({mean: [], covariance: super.getPredictedCovariance({previousCorrected: K})}); if (K = new h({mean: [], covariance: super.getCorrectedCovariance({predicted: F})}), Z.push(K.covariance), dZ.frobenius(K.covariance, Z[G - 1]) < Y) {
				return Z[G];
			}
		}

		throw new Error('The state covariance does not converge asymptotically');
	}

	asymptoticGain({tolerance: J = 0.000_001} = {}) {
		const Y = this.asymptoticStateCovariance({tolerance: J}); const K = new h({mean: Array.from({length: Y.length}).fill(0).map(() => [0]), covariance: Y}); return super.getGain({predicted: K});
	}
} function uZ({measures: J, averages: Y}) {
	const K = J.length; const Z = J[0].length; if (K === 0) {
		throw new Error('Cannot find covariance for empty sample');
	}

	return new Array(Z).fill(1).map((G, F) => new Array(Z).fill(1).map((Q, W) => {
		const V = J.map((H, q) => (H[F] - Y[q][F]) * (H[W] - Y[q][W])).reduce((H, q) => H + q) / K; if (Number.isNaN(V)) {
			throw new TypeError('result is NaN');
		}

		return V;
	}));
}

const k0 = g(A(), 1); function cZ({observation: J, obsIndexes: Y, selectedStateProjection: K, invertSelectedStateProjection: Z}) {
	if (!J) {
		return null;
	}

	const G = J.observation || J; const F = Y.map(X => {
		if (G[X] === void 0) {
			throw new TypeError(`obsIndexes (${Y}) is not matching with observation (${J})`);
		}

		return [G[X]];
	}); const Q = Z || k0.invert(K); if (Q === null) {
		throw new Error('selectedStateProjection is not invertible, please provide invertSelectedStateProjection');
	}

	return k0.matMul(Q, F).map(X => X[0]).map(X => {
		if (Number.isNaN(X)) {
			throw new TypeError('NaN in projection');
		}

		return X;
	});
}

function _Z(J) {
	if (J === J.toLowerCase()) {
		return J;
	}

	return J.replaceAll(/[A-Z]/g, Y => '-' + Y.toLowerCase());
}

Object.keys(B0).forEach(J => {
	S1(_Z(J), B0[J]);
}); Object.keys(z0).forEach(J => {
	z1(_Z(J), z0[J]);
}); export {
	l0 as shorttermConstantSpeed, q1 as sensorProjected, n0 as sensorLocalVariance, t0 as sensor, z1 as registerObservation, S1 as registerDynamic, cZ as projectObservation, uZ as getCovariance, D0 as covarianceToCorrelation, P0 as correlationToCovariance, i as constantSpeedDynamic, d0 as constantSpeed, _0 as constantPositionWithNull, p0 as constantPosition, u0 as constantAcceleration, c0 as composition, l as checkCovariance, q0 as buildObservation, H0 as buildDynamic, h as State, P1 as KalmanFilter,
};

// # debugId=D419DAA626069A2364756E2164756E21
// # sourceMappingURL=index.js.map
