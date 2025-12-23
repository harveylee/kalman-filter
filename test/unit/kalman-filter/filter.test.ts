import {test, expect} from 'bun:test';
import equalState from '../../../test/helpers/equal-state';
import {KalmanFilter} from '../../../index';

const t = {
	true: (v: any) => expect(v).toBeTruthy(),
	is: (a: any, b: any) => expect(a).toBe(b),
	deepEqual: (a: any, b: any) => expect(a).toEqual(b),
	not: (a: any, b: any) => expect(a).not.toBe(b),
};

test('Filter method', () => {
	const observations = [[0.11], [0.21], [0.3]];
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
		},
		observation: {
			name: 'sensor',
		},
	});
	const filtered = kf.filter({observation: observations[0]});
	expect(filtered && Array.isArray(filtered.mean) && Array.isArray(filtered.covariance)).toBeTruthy();

	const predicted = kf.predict();
	const corrected = kf.correct({predicted, observation: observations[0]});
	t.true(equalState(filtered, corrected));
});

test('FilterAll', () => {
	const observations = [[0.11], [0.21], [0.3]];
	const kf = new KalmanFilter({
		dynamic: {
			name: 'constant-speed',
		},
		observation: {
			name: 'sensor',
		},
	});
	const allFiltered = kf.filterAll(observations);
	t.is(allFiltered.length, 3);
	const filtered = kf.filter({observation: observations[0]});
	const firstMean = filtered.mean.map(m => m[0]);
	t.deepEqual(firstMean, allFiltered[0]);
});
