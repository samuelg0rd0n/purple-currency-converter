export const roundNumber = (number: number): number =>
	Math.round((number + Number.EPSILON) * 100) / 100;