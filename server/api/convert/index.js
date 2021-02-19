import * as stats from '../../modules/stats.js';
import * as validation from './validation.js';

export function get(req, res) {
	const { from, to, amount, errors } = validation.get(req);

	if (errors.length > 0) {
		return res.status(400).send({ errors });
	}

	stats.incrementTotalNoOfRequests();
	stats.increaseTotalAmountConverted(amount);
	stats.updateTotalNoOfRequestsByDestCurrency(to);

	return res.send({
		from,
		to,
		amount,
		converted: 'TODO',
	});
}