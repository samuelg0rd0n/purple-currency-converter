import currencies from './currencies.json';

export function get(req) {
	const { from, to } = req.query;

	const errors = [];

	if (!from || typeof from !== 'string' || !currencies[from.toUpperCase()]) {
		errors.push({
			param: 'from',
			message: 'Parameter `from` is missing or is not a valid currency.'
		});
	}

	if (!to || typeof to !== 'string' || !currencies[to.toUpperCase()]) {
		errors.push({
			param: 'to',
			message: 'Parameter `to` is missing or is not a valid currency.'
		});
	}

	const amount = parseFloat(req.query.amount);
	if (!amount || !Number.isSafeInteger(amount) || amount <= 0) {
		errors.push({
			param: 'amount',
			message: 'Parameter `amount` is missing or is not a valid number greater than zero.'
		})
	}

	return {
		from: from ? from.toUpperCase() : null,
		to: to ? to.toUpperCase() : null,
		amount,
		errors
	};
}