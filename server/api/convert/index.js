import axios from 'axios';

import RatesCache from '../../caching/RatesCache.js';
import * as validation from './validation.js';
import StatsCache from '../../caching/StatsCache.js';

const TOTAL_AMOUNT_CONVERTED_CURRENCY = 'USD';
const OPEN_EXCHANGE_RATES_LATEST_URL = 'https://openexchangerates.org/api/latest.json';
const OPEN_EXCHANGE_RATES_APP_ID = 'bb78bc71446c4c1ea4b28d589cf9a829';

const FIXER_LATEST_URL = 'http://data.fixer.io/api/latest';
const FIXER_API_KEY = 'b0f095bd7e567a9e3a18b4c0f66bbc07';

export async function get(req, res) {
	const { from, to, amount, errors } = validation.get(req);

	if (errors.length > 0) {
		return res.status(400).send({ errors });
	}

	let rates = RatesCache.get(from);

	if (!rates) {
		try {
			const response = await axios.get(FIXER_LATEST_URL, {
				params: {
					access_key: FIXER_API_KEY,
					base: from,
				}
			});

			if (!response || !response.data || !response.data.rates) {
				return handleOpenExchangeRatesError(res, response.data.error?.info ?? 'Data provider sent unexpected data.');
			}

			rates = response.data.rates;
			RatesCache.set(response.data);

		} catch (err) {
			if (err.response && err.response.data && err.response.data.error && err.response.data.description) {
				return handleOpenExchangeRatesError(res, err.response.data.description);

			} else if (err.request) {
				return handleOpenExchangeRatesError(res, 'No response received from the data provider.');

			} else {
				return handleOpenExchangeRatesError(res, err.message);
			}
		}
	}

	const converted = amount * rates[to];

	StatsCache.incrementTotalNoOfRequests();
	StatsCache.increaseTotalAmountConverted(amount * rates[TOTAL_AMOUNT_CONVERTED_CURRENCY]);
	StatsCache.updateTotalNoOfRequestsByDestCurrency(to);

	return res.send({
		from,
		to,
		amount,
		converted,
	});
}

function handleOpenExchangeRatesError(res, message) {
	return res.status(503).send({
		errors: [{ message }]
	});
}