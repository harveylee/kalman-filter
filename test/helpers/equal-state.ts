import sl from 'simple-linalg';
const {frobenius: distanceMat} = sl;

export function isState(obj:any) {
	return !!obj && Array.isArray(obj.mean) && Array.isArray(obj.covariance);
}

export default function equalState(state1:any, state2:any, tolerance = 1e-6) {
	if (!isState(state1) || !isState(state2)) {
		// return false (don't throw) to avoid cross-module identity issues
		return false;
	}

	return (
		(distanceMat(state1.mean, state2.mean) < tolerance)
		&& (distanceMat(state1.covariance, state2.covariance) < tolerance)
	);
}

// convenience property
(equalState as any).isState = isState;
