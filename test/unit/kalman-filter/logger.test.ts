import {test, expect} from 'bun:test';
const t = {
	true: (v:any) => expect(v).toBeTruthy(),
	is: (a:any, b:any) => expect(a).toBe(b),
	deepEqual: (a:any, b:any) => expect(a).toEqual(b),
	not: (a:any, b:any) => expect(a).not.toBe(b),
};
import {KalmanFilter} from '../../../index.mjs';

test('Logger.debug', () => {
	let hasDebug = false;
	const kf = new KalmanFilter({
		observation: {
			name: 'sensor',
		},
		dynamic: {
			name: 'constant-speed',
		},
		logger: {
			info: (...args) => {console.log(...args);},
			debug() {
				hasDebug = true;
				// Console.log(...args);
			},
			warn: (...args) => {console.log(...args);},
			error: (...args) => {console.log(...args);},
		},
	});
	kf.predict();
	t.is(hasDebug, true);
});
