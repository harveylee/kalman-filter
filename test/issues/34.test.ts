import {test, expect} from 'bun:test';
import sl from 'simple-linalg';
import {KalmanFilter} from '../../index';

const {diag} = sl;

test('#34 1-D', () => {
	const dataset = [0, 0, 0, 0, 16.1, 0, 0, 30.9, 0, 0, 0, 0, 26.1, null, null].map(a => [a]);
	const baseVariance = 1;
	const huge = 1e30;
	const kf = new KalmanFilter({
		observation: {
			dimension: 1,
			covariance(o) {
				if (o.observation[0][0] === null) {
					return [[huge]];
				}

				return [[baseVariance]];
			},
		},
	});

	const response = kf.filterAll(dataset);
	expect(response.length).toBe(dataset.length);
});

test('#34 2D', () => {
	const dataset = [
		[22, null],
		[25, null],
		[4, 4],
		[4, 4],
		[22, 5],
		[null, null],
		[34, 45],
	];

	const baseVariance = 1;
	const huge = 1e15;
	const kf = new KalmanFilter({
		observation: {
			stateProjection: [[1], [1]],
			covariance(o) {
				const variances = o.observation.map(a => {
					if (a[0] === null) {
						return huge;
					}

					return baseVariance;
				});
				return diag(variances);
			},
		},
	});

	const response = kf.filterAll(dataset);
	expect(response.length).toBe(dataset.length);
});

