import { Request } from 'express';
import currenciesJson from '../../../src/enums/currencies.json';

export function get(req: Request) {
	const from = req.query.from as string;
	const to = req.query.to as string;
	const currencies = currenciesJson as { [key:string]: string };

	const errors = [];

	if (!from || !currencies[from.toUpperCase()]) {
		errors.push({
			param: 'from',
			message: 'Parameter `from` is missing or is not a valid currency.'
		});
	}

	if (!to || !currencies[to.toUpperCase()]) {
		errors.push({
			param: 'to',
			message: 'Parameter `to` is missing or is not a valid currency.'
		});
	}

	const amount = parseFloat(req.query.amount as string);
	if (!amount || !Number.isSafeInteger(amount) || amount <= 0) {
		errors.push({
			param: 'amount',
			message: 'Parameter `amount` is missing or is not a valid number greater than zero.'
		})
	}

	if (errors.length > 0) {
		return { errors };
	}

	return {
		from: from.toUpperCase(),
		to: to.toUpperCase(),
		amount
	};
}