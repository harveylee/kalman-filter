require = (function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					const c = typeof require === 'function' && require; if (!f && c) {
						return c(i, !0);
					}

					if (u) {
						return u(i, !0);
					}

					const a = new Error('Cannot find module \'' + i + '\''); throw a.code = 'MODULE_NOT_FOUND', a;
				}

				const p = n[i] = {exports: {}}; e[i][0].call(p.exports, r => {
					const n = e[i][1][r]; return o(n || r);
				}, p, p.exports, r, e, n, t);
			}

			return n[i].exports;
		}

		for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++) {
			o(t[i]);
		}

		return o;
	}

	return r;
})()({
	1: [function (require, module, exports) {
		const posVar = 10;
		const timeStep = 1;
		const huge = 1000;
		const floor = 438;

		module.exports = {
			observation: {
				dimension: 2,
				stateProjection: [
					[1, 0, 0, 0, 0],
					[0, 1, 0, 0, 0],
				],
				// Covariance generated thanks to getCovariance
				covariance: [posVar / 5, posVar / 5],
				// Covariance: [posVar, posVar, posVar, posVar],

			},

			dynamic: {
				init: {
					mean: [[943], [385], [0], [0], [0]],

					covariance: [
						[huge, 0, 0, 0, 0],
						[0, huge, 0, 0, 0],
						[0, 0, huge, 0, 0],
						[0, 0, 0, huge, 0],
						[0, 0, 0, 0, huge],
					],
				},

				constant({previousCorrected}) {
					const normalY = previousCorrected.mean[1][0] + (previousCorrected.mean[3][0] * timeStep);

					let controlY = 0;

					if (normalY > floor) {
						controlY = 2 * (floor - normalY);
					}

					return [[0], [controlY], [0], [0], [0]];
				},

				transition({previousCorrected}) {
					const normalY = previousCorrected.mean[1][0] + (previousCorrected.mean[3][0] * timeStep);
					let vY = 1;

					if (normalY > floor) {
						vY = -1;
					}

					return [
						[1, 0, timeStep, 0, 0],
						[0, 1, 0, timeStep, 0],
						[0, 0, 1, 0, 0],
						[0, 0, 0, vY, timeStep],
						[0, 0, 0, 0, 1],
					];
				},

				dimension: 5,

				covariance: [
					posVar,
					posVar,
					posVar * timeStep * timeStep,
					posVar * timeStep * timeStep,
					posVar * (timeStep ** 4),
				],
			},
		};
	}, {}], 2: [function (require, module, exports) {
		module.exports = {
			ground: {
				y: 442,
			},
			observations: [
				[
					15,
					40,
				],
				[
					39,
					70,
				],
				[
					62,
					106,
				],
				[
					83,
					148,
				],
				[
					105,
					197,
				],
				[
					126,
					253,
				],
				[
					145,
					315,
				],
				[
					165,
					383,
				],
				[
					183,
					423,
				],
				[
					202,
					364,
				],
				[
					219,
					315,
				],
				[
					236,
					274,
				],
				[
					253,
					241,
				],
				[
					270,
					216,
				],
				[
					286,
					198,
				],
				[
					302,
					187,
				],
				[
					318,
					184,
				],
				[
					334,
					187,
				],
				[
					350,
					197,
				],
				[
					364,
					214,
				],
				[
					378,
					236,
				],
				[
					393,
					265,
				],
				[
					406,
					301,
				],
				[
					419,
					343,
				],
				[
					432,
					391,
				],
				[
					443,
					434,
				],
				[
					456,
					390,
				],
				[
					469,
					354,
				],
				[
					481,
					326,
				],
				[
					494,
					305,
				],
				[
					506,
					292,
				],
				[
					519,
					285,
				],
				[
					531,
					285,
				],
				[
					544,
					291,
				],
				[
					556,
					305,
				],
				[
					568,
					323,
				],
				[
					580,
					350,
				],
				[
					591,
					380,
				],
				[
					602,
					419,
				],
				[
					613,
					420,
				],
				[
					624,
					390,
				],
				[
					613,
					420,
				],
			],
		};
	}, {}], 3: [function (require, module, exports) {
		module.exports = function ({className, tag = 'div', bbox, parent, rotationCoefficient, scale, color}) {
			const element = document.createElement(tag);// eslint-disable-line no-undef
			element.id = 'arrow';
			element.className = className;
			element.style.top = Math.round(bbox[1]) + 'px';
			element.style.left = Math.round(bbox[0]) + 'px';
			if (rotationCoefficient) {
				element.style.transform = `rotate(${rotationCoefficient}deg)`;
				element.style.transformOrigin = '-5px 12px';
			}

			element.style.scale = scale;
			element.style.color = color;
			parent.append(element);
			return element;
		};
	}, {}], 4: [function (require, module, exports) {
		module.exports = function ({id, className, tag = 'div', bbox, parent, rotationCoefficient}) {
			const element = document.createElement(tag);// eslint-disable-line no-undef
			element.className = className;
			element.id = id;
			// If (color && lineStyle) {
			// 	el.style.border = `1px ${lineStyle} ${color}`
			// }
			element.style.width = Math.round(bbox[2]) + 'px';
			element.style.height = Math.round(bbox[3]) + 'px';
			element.style.top = Math.round(bbox[1] - (bbox[3] / 2)) + 'px';
			element.style.left = Math.round(bbox[0] - (bbox[2] / 2)) + 'px';
			if (rotationCoefficient) {
				element.style.transform = `rotate(${rotationCoefficient}deg)`;
			}

			parent.append(element);
			return element;
		};
	}, {}], 5: [function (require, module, exports) {
		const createElement = require('./create-element');
		const createPoint = require('./create-point');
		const createArrow = require('./create-arrow');

		module.exports = function ({mean, covariance, color, parent, className, tag = 'div'}) {
			const container = document.createElement(tag); // eslint-disable-line no-undef

			container.className = className;
			const center = [mean[0][0], mean[1][0]];

			createPoint({
				bbox: [center[0], center[1], 2, 2],
				parent: container,
				color,
			});

			const correlationXY = covariance[0][1] / (Math.sqrt(covariance[0][0]) * Math.sqrt(covariance[1][1]));
			createElement({
				className: 'ellipse stdDev',
				bbox: [
					center[0],
					center[1],
					2 * 3 * Math.sqrt(covariance[0][0]),
					2 * 3 * Math.sqrt(covariance[1][1]),
				],
				parent: container,
				rotationCoefficient: correlationXY,
				color,
			});
			const arrowRotation = (-1 * Math.atan(mean[2][0] / mean[3][0]) * 180 / Math.PI) - 45;
			const arrowScale = Math.hypot(mean[2][0], mean[3][0]);
			createArrow({
				className: 'arrow',
				bbox: [
					center[0] + 6,
					center[1] - 9,
				],
				parent: container,
				rotationCoefficient: arrowRotation,
				scale: arrowScale,
				color,
			});
			parent.append(container);
		};
	}, {'./create-arrow': 3, './create-element': 4, './create-point': 6}], 6: [function (require, module, exports) {
		module.exports = function ({className = 'point', tag = 'div', bbox, parent}) {
			const element = document.createElement(tag);// eslint-disable-line no-undef
			element.className = className;
			// If (color) {
			// 	el.style.border = `2px solid ${color}`,
			// 	el.style.backgroundColor = `${color}`
			// }
			element.style.width = Math.round(bbox[2]) + 'px';
			element.style.height = Math.round(bbox[3]) + 'px';
			element.style.top = Math.round(bbox[1] - (bbox[3] / 2)) + 'px';
			element.style.left = Math.round(bbox[0] - (bbox[2] / 2)) + 'px';
			parent.append(element);
			return element;
		};
	}, {}], 'bouncing-ball': [function (require, module, exports) {
		const {KalmanFilter} = kalmanFilter;// eslint-disable-line no-undef
		const createElement = require('../shared/views/create-element');
		const createGroupPoint = require('../shared/views/create-group-point');
		const kfOptions = require('./kf-options.js');
		const noisyObservations = require('./observations.json').observations;

		const kf = new KalmanFilter(kfOptions);
		let predicted = kf.predict();

		const img = document.querySelector('#bouncing-ball');// eslint-disable-line no-undef

		// Create all the elements of the prediction or correction phase
		const delay = 200;

		let promise = Promise.resolve();
		let previousCorrected = null;

		const delayPromise = delay => new Promise(resolve => {
			setTimeout(resolve, delay);
		});

		module.exports = {
			run() {
				for (const [index, box] of noisyObservations.entries()) {
					promise = promise
						.then(() => {
							predicted = kf.predict({previousCorrected});
							const {mean, covariance} = predicted;

							createGroupPoint({
								mean, covariance, parent: img, className: 'predicted', color: 'blue',
							});

							return delayPromise(delay);
						})
						.then((b => {
							console.log({b});
							const w = 10;
							const h = 10;
							createElement({
								className: 'observation',
								bbox: [
									b[0],
									b[1],
									w,
									h,
								],
								parent: img,
								color: 'white',
								lineStyle: 'solid',
							});

							return delayPromise(delay);
						}).bind(null, box, index))
						.then((b => {
							previousCorrected = kf.correct({predicted, observation: b});
							const {mean, covariance} = previousCorrected;

							createGroupPoint({
								mean, covariance, parent: img, className: 'corrected', color: 'red',
							});

							return delayPromise(delay);
						}).bind(null, box, index));
				}
			},
		};
	}, {
		'../shared/views/create-element': 4, '../shared/views/create-group-point': 5, './kf-options.js': 1, './observations.json': 2,
	}],
}, {}, []);
// # sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vL2JvdW5jaW5nLWJhbGwva2Ytb3B0aW9ucy5qcyIsImRlbW8vYm91bmNpbmctYmFsbC9vYnNlcnZhdGlvbnMuanNvbiIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1hcnJvdy5qcyIsImRlbW8vc2hhcmVkL3ZpZXdzL2NyZWF0ZS1lbGVtZW50LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLWdyb3VwLXBvaW50LmpzIiwiZGVtby9zaGFyZWQvdmlld3MvY3JlYXRlLXBvaW50LmpzIiwiZGVtby9ib3VuY2luZy1iYWxsL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBwb3NWYXIgPSAxMDtcbmNvbnN0IHRpbWVTdGVwID0gMTtcbmNvbnN0IGh1Z2UgPSAxMDAwO1xuY29uc3QgZmxvb3IgPSA0Mzg7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRvYnNlcnZhdGlvbjoge1xuXHRcdGRpbWVuc2lvbjogMixcblx0XHRzdGF0ZVByb2plY3Rpb246IFtcblx0XHRcdFsxLCAwLCAwLCAwLCAwXSxcblx0XHRcdFswLCAxLCAwLCAwLCAwXSxcblx0XHRdLFxuXHRcdC8vIENvdmFyaWFuY2UgZ2VuZXJhdGVkIHRoYW5rcyB0byBnZXRDb3ZhcmlhbmNlXG5cdFx0Y292YXJpYW5jZTogW3Bvc1ZhciAvIDUsIHBvc1ZhciAvIDVdLFxuXHRcdC8vIENvdmFyaWFuY2U6IFtwb3NWYXIsIHBvc1ZhciwgcG9zVmFyLCBwb3NWYXJdLFxuXG5cdH0sXG5cblx0ZHluYW1pYzoge1xuXHRcdGluaXQ6IHtcblx0XHRcdG1lYW46IFtbOTQzXSwgWzM4NV0sIFswXSwgWzBdLCBbMF1dLFxuXG5cdFx0XHRjb3ZhcmlhbmNlOiBbXG5cdFx0XHRcdFtodWdlLCAwLCAwLCAwLCAwXSxcblx0XHRcdFx0WzAsIGh1Z2UsIDAsIDAsIDBdLFxuXHRcdFx0XHRbMCwgMCwgaHVnZSwgMCwgMF0sXG5cdFx0XHRcdFswLCAwLCAwLCBodWdlLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIDAsIGh1Z2VdLFxuXHRcdFx0XSxcblx0XHR9LFxuXG5cdFx0Y29uc3RhbnQoe3ByZXZpb3VzQ29ycmVjdGVkfSkge1xuXHRcdFx0Y29uc3Qgbm9ybWFsWSA9IHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bMV1bMF0gKyAocHJldmlvdXNDb3JyZWN0ZWQubWVhblszXVswXSAqIHRpbWVTdGVwKTtcblxuXHRcdFx0bGV0IGNvbnRyb2xZID0gMDtcblxuXHRcdFx0aWYgKG5vcm1hbFkgPiBmbG9vcikge1xuXHRcdFx0XHRjb250cm9sWSA9IDIgKiAoZmxvb3IgLSBub3JtYWxZKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFtbMF0sIFtjb250cm9sWV0sIFswXSwgWzBdLCBbMF1dO1xuXHRcdH0sXG5cblx0XHR0cmFuc2l0aW9uKHtwcmV2aW91c0NvcnJlY3RlZH0pIHtcblx0XHRcdGNvbnN0IG5vcm1hbFkgPSBwcmV2aW91c0NvcnJlY3RlZC5tZWFuWzFdWzBdICsgKHByZXZpb3VzQ29ycmVjdGVkLm1lYW5bM11bMF0gKiB0aW1lU3RlcCk7XG5cdFx0XHRsZXQgdlkgPSAxO1xuXG5cdFx0XHRpZiAobm9ybWFsWSA+IGZsb29yKSB7XG5cdFx0XHRcdHZZID0gLTE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFsxLCAwLCB0aW1lU3RlcCwgMCwgMF0sXG5cdFx0XHRcdFswLCAxLCAwLCB0aW1lU3RlcCwgMF0sXG5cdFx0XHRcdFswLCAwLCAxLCAwLCAwXSxcblx0XHRcdFx0WzAsIDAsIDAsIHZZLCB0aW1lU3RlcF0sXG5cdFx0XHRcdFswLCAwLCAwLCAwLCAxXSxcblx0XHRcdF07XG5cdFx0fSxcblxuXHRcdGRpbWVuc2lvbjogNSxcblxuXHRcdGNvdmFyaWFuY2U6IFtcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1Zhcixcblx0XHRcdHBvc1ZhciAqIHRpbWVTdGVwICogdGltZVN0ZXAsXG5cdFx0XHRwb3NWYXIgKiB0aW1lU3RlcCAqIHRpbWVTdGVwLFxuXHRcdFx0cG9zVmFyICogKHRpbWVTdGVwICoqIDQpLFxuXHRcdF0sXG5cdH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcImdyb3VuZFwiOiB7XG5cdFx0XCJ5XCI6IDQ0MlxuXHR9LFxuXHRcIm9ic2VydmF0aW9uc1wiOiBbXG5cdFx0W1xuXHRcdFx0MTUsXG5cdFx0XHQ0MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzksXG5cdFx0XHQ3MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjIsXG5cdFx0XHQxMDZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDgzLFxuXHRcdFx0MTQ4XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxMDUsXG5cdFx0XHQxOTdcblx0XHRdLFxuXHRcdFtcblx0XHRcdDEyNixcblx0XHRcdDI1M1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MTQ1LFxuXHRcdFx0MzE1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQxNjUsXG5cdFx0XHQzODNcblx0XHRdLFxuXHRcdFtcblx0XHRcdDE4Myxcblx0XHRcdDQyM1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjAyLFxuXHRcdFx0MzY0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyMTksXG5cdFx0XHQzMTVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDIzNixcblx0XHRcdDI3NFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MjUzLFxuXHRcdFx0MjQxXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQyNzAsXG5cdFx0XHQyMTZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDI4Nixcblx0XHRcdDE5OFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzAyLFxuXHRcdFx0MTg3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzMTgsXG5cdFx0XHQxODRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDMzNCxcblx0XHRcdDE4N1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzUwLFxuXHRcdFx0MTk3XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQzNjQsXG5cdFx0XHQyMTRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDM3OCxcblx0XHRcdDIzNlxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0MzkzLFxuXHRcdFx0MjY1XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0MDYsXG5cdFx0XHQzMDFcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQxOSxcblx0XHRcdDM0M1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDMyLFxuXHRcdFx0MzkxXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0NDMsXG5cdFx0XHQ0MzRcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ1Nixcblx0XHRcdDM5MFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NDY5LFxuXHRcdFx0MzU0XG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ0ODEsXG5cdFx0XHQzMjZcblx0XHRdLFxuXHRcdFtcblx0XHRcdDQ5NCxcblx0XHRcdDMwNVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTA2LFxuXHRcdFx0MjkyXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1MTksXG5cdFx0XHQyODVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDUzMSxcblx0XHRcdDI4NVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTQ0LFxuXHRcdFx0MjkxXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1NTYsXG5cdFx0XHQzMDVcblx0XHRdLFxuXHRcdFtcblx0XHRcdDU2OCxcblx0XHRcdDMyM1xuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NTgwLFxuXHRcdFx0MzUwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ1OTEsXG5cdFx0XHQzODBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYwMixcblx0XHRcdDQxOVxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0NjEzLFxuXHRcdFx0NDIwXG5cdFx0XSxcblx0XHRbXG5cdFx0XHQ2MjQsXG5cdFx0XHQzOTBcblx0XHRdLFxuXHRcdFtcblx0XHRcdDYxMyxcblx0XHRcdDQyMFxuXHRcdF1cblx0XVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtjbGFzc05hbWUsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnQsIHJvdGF0aW9uQ29lZmZpY2llbnQsIHNjYWxlLCBjb2xvcn0pIHtcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cdGVsZW1lbnQuaWQgPSAnYXJyb3cnO1xuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChiYm94WzBdKSArICdweCc7XG5cdGlmIChyb3RhdGlvbkNvZWZmaWNpZW50KSB7XG5cdFx0ZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb25Db2VmZmljaWVudH1kZWcpYDtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICctNXB4IDEycHgnO1xuXHR9XG5cblx0ZWxlbWVudC5zdHlsZS5zY2FsZSA9IHNjYWxlO1xuXHRlbGVtZW50LnN0eWxlLmNvbG9yID0gY29sb3I7XG5cdHBhcmVudC5hcHBlbmQoZWxlbWVudCk7XG5cdHJldHVybiBlbGVtZW50O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHtpZCwgY2xhc3NOYW1lLCB0YWcgPSAnZGl2JywgYmJveCwgcGFyZW50LCByb3RhdGlvbkNvZWZmaWNpZW50fSkge1xuXHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpOy8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGVsZW1lbnQuaWQgPSBpZDtcblx0Ly8gSWYgKGNvbG9yICYmIGxpbmVTdHlsZSkge1xuXHQvLyBcdGVsLnN0eWxlLmJvcmRlciA9IGAxcHggJHtsaW5lU3R5bGV9ICR7Y29sb3J9YFxuXHQvLyB9XG5cdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKGJib3hbMl0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGJib3hbM10pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0gLSAoYmJveFszXSAvIDIpKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSAtIChiYm94WzJdIC8gMikpICsgJ3B4Jztcblx0aWYgKHJvdGF0aW9uQ29lZmZpY2llbnQpIHtcblx0XHRlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtyb3RhdGlvbkNvZWZmaWNpZW50fWRlZylgO1xuXHR9XG5cblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwiY29uc3QgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4vY3JlYXRlLWVsZW1lbnQnKTtcbmNvbnN0IGNyZWF0ZVBvaW50ID0gcmVxdWlyZSgnLi9jcmVhdGUtcG9pbnQnKTtcbmNvbnN0IGNyZWF0ZUFycm93ID0gcmVxdWlyZSgnLi9jcmVhdGUtYXJyb3cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe21lYW4sIGNvdmFyaWFuY2UsIGNvbG9yLCBwYXJlbnQsIGNsYXNzTmFtZSwgdGFnID0gJ2Rpdid9KSB7XG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdGNvbnN0IGNlbnRlciA9IFttZWFuWzBdWzBdLCBtZWFuWzFdWzBdXTtcblxuXHRjcmVhdGVQb2ludCh7XG5cdFx0YmJveDogW2NlbnRlclswXSwgY2VudGVyWzFdLCAyLCAyXSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRjb2xvcixcblx0fSk7XG5cblx0Y29uc3QgY29ycmVsYXRpb25YWSA9IGNvdmFyaWFuY2VbMF1bMV0gLyAoTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMV1bMV0pKTtcblx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0Y2xhc3NOYW1lOiAnZWxsaXBzZSBzdGREZXYnLFxuXHRcdGJib3g6IFtcblx0XHRcdGNlbnRlclswXSxcblx0XHRcdGNlbnRlclsxXSxcblx0XHRcdDIgKiAzICogTWF0aC5zcXJ0KGNvdmFyaWFuY2VbMF1bMF0pLFxuXHRcdFx0MiAqIDMgKiBNYXRoLnNxcnQoY292YXJpYW5jZVsxXVsxXSksXG5cdFx0XSxcblx0XHRwYXJlbnQ6IGNvbnRhaW5lcixcblx0XHRyb3RhdGlvbkNvZWZmaWNpZW50OiBjb3JyZWxhdGlvblhZLFxuXHRcdGNvbG9yLFxuXHR9KTtcblx0Y29uc3QgYXJyb3dSb3RhdGlvbiA9ICgtMSAqIE1hdGguYXRhbihtZWFuWzJdWzBdIC8gbWVhblszXVswXSkgKiAxODAgLyBNYXRoLlBJKSAtIDQ1O1xuXHRjb25zdCBhcnJvd1NjYWxlID0gTWF0aC5oeXBvdChtZWFuWzJdWzBdLCBtZWFuWzNdWzBdKTtcblx0Y3JlYXRlQXJyb3coe1xuXHRcdGNsYXNzTmFtZTogJ2Fycm93Jyxcblx0XHRiYm94OiBbXG5cdFx0XHRjZW50ZXJbMF0gKyA2LFxuXHRcdFx0Y2VudGVyWzFdIC0gOSxcblx0XHRdLFxuXHRcdHBhcmVudDogY29udGFpbmVyLFxuXHRcdHJvdGF0aW9uQ29lZmZpY2llbnQ6IGFycm93Um90YXRpb24sXG5cdFx0c2NhbGU6IGFycm93U2NhbGUsXG5cdFx0Y29sb3IsXG5cdH0pO1xuXHRwYXJlbnQuYXBwZW5kKGNvbnRhaW5lcik7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoe2NsYXNzTmFtZSA9ICdwb2ludCcsIHRhZyA9ICdkaXYnLCBiYm94LCBwYXJlbnR9KSB7XG5cdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0Ly8gSWYgKGNvbG9yKSB7XG5cdC8vIFx0ZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke2NvbG9yfWAsXG5cdC8vIFx0ZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYCR7Y29sb3J9YFxuXHQvLyB9XG5cdGVsZW1lbnQuc3R5bGUud2lkdGggPSBNYXRoLnJvdW5kKGJib3hbMl0pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLnJvdW5kKGJib3hbM10pICsgJ3B4Jztcblx0ZWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKGJib3hbMV0gLSAoYmJveFszXSAvIDIpKSArICdweCc7XG5cdGVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoYmJveFswXSAtIChiYm94WzJdIC8gMikpICsgJ3B4Jztcblx0cGFyZW50LmFwcGVuZChlbGVtZW50KTtcblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwiY29uc3Qge0thbG1hbkZpbHRlcn0gPSBrYWxtYW5GaWx0ZXI7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuY29uc3QgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL3NoYXJlZC92aWV3cy9jcmVhdGUtZWxlbWVudCcpO1xuY29uc3QgY3JlYXRlR3JvdXBQb2ludCA9IHJlcXVpcmUoJy4uL3NoYXJlZC92aWV3cy9jcmVhdGUtZ3JvdXAtcG9pbnQnKTtcbmNvbnN0IGtmT3B0aW9ucyA9IHJlcXVpcmUoJy4va2Ytb3B0aW9ucy5qcycpO1xuY29uc3Qgbm9pc3lPYnNlcnZhdGlvbnMgPSByZXF1aXJlKCcuL29ic2VydmF0aW9ucy5qc29uJykub2JzZXJ2YXRpb25zO1xuXG5jb25zdCBrZiA9IG5ldyBLYWxtYW5GaWx0ZXIoa2ZPcHRpb25zKTtcbmxldCBwcmVkaWN0ZWQgPSBrZi5wcmVkaWN0KCk7XG5cbmNvbnN0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3VuY2luZy1iYWxsJyk7Ly8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vLyBDcmVhdGUgYWxsIHRoZSBlbGVtZW50cyBvZiB0aGUgcHJlZGljdGlvbiBvciBjb3JyZWN0aW9uIHBoYXNlXG5jb25zdCBkZWxheSA9IDIwMDtcblxubGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCBwcmV2aW91c0NvcnJlY3RlZCA9IG51bGw7XG5cbmNvbnN0IGRlbGF5UHJvbWlzZSA9IGRlbGF5ID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cnVuKCkge1xuXHRcdGZvciAoY29uc3QgW2luZGV4LCBib3hdIG9mIG5vaXN5T2JzZXJ2YXRpb25zLmVudHJpZXMoKSkge1xuXHRcdFx0cHJvbWlzZSA9IHByb21pc2Vcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHByZWRpY3RlZCA9IGtmLnByZWRpY3Qoe3ByZXZpb3VzQ29ycmVjdGVkfSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJlZGljdGVkO1xuXG5cdFx0XHRcdFx0Y3JlYXRlR3JvdXBQb2ludCh7XG5tZWFuLCBjb3ZhcmlhbmNlLCBwYXJlbnQ6IGltZywgY2xhc3NOYW1lOiAncHJlZGljdGVkJywgY29sb3I6ICdibHVlJyxcbn0pO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGF5UHJvbWlzZShkZWxheSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChiID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh7Yn0pO1xuXHRcdFx0XHRcdGNvbnN0IHcgPSAxMDtcblx0XHRcdFx0XHRjb25zdCBoID0gMTA7XG5cdFx0XHRcdFx0Y3JlYXRlRWxlbWVudCh7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdvYnNlcnZhdGlvbicsXG5cdFx0XHRcdFx0XHRiYm94OiBbXG5cdFx0XHRcdFx0XHRcdGJbMF0sXG5cdFx0XHRcdFx0XHRcdGJbMV0sXG5cdFx0XHRcdFx0XHRcdHcsXG5cdFx0XHRcdFx0XHRcdGgsXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0cGFyZW50OiBpbWcsXG5cdFx0XHRcdFx0XHRjb2xvcjogJ3doaXRlJyxcblx0XHRcdFx0XHRcdGxpbmVTdHlsZTogJ3NvbGlkJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKVxuXHRcdFx0XHQudGhlbigoYiA9PiB7XG5cdFx0XHRcdFx0cHJldmlvdXNDb3JyZWN0ZWQgPSBrZi5jb3JyZWN0KHtwcmVkaWN0ZWQsIG9ic2VydmF0aW9uOiBifSk7XG5cdFx0XHRcdFx0Y29uc3Qge21lYW4sIGNvdmFyaWFuY2V9ID0gcHJldmlvdXNDb3JyZWN0ZWQ7XG5cblx0XHRcdFx0XHRjcmVhdGVHcm91cFBvaW50KHtcbm1lYW4sIGNvdmFyaWFuY2UsIHBhcmVudDogaW1nLCBjbGFzc05hbWU6ICdjb3JyZWN0ZWQnLCBjb2xvcjogJ3JlZCcsXG59KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWxheVByb21pc2UoZGVsYXkpO1xuXHRcdFx0XHR9KS5iaW5kKG51bGwsIGJveCwgaW5kZXgpKTtcblx0XHR9XG5cdH0sXG59O1xuIl19
