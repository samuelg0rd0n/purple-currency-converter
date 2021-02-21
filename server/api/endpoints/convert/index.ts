import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import RatesCache from '../../../caching/RatesCache';
import * as validation from './validation';
import StatsCache from '../../../caching/StatsCache';
import { IFixerGetResponse } from './IFixerGetResponse';

const TOTAL_AMOUNT_CONVERTED_CURRENCY = 'USD';
// const OPEN_EXCHANGE_RATES_LATEST_URL = 'https://openexchangerates.org/api/latest.json';
// const OPEN_EXCHANGE_RATES_APP_ID = 'bb78bc71446c4c1ea4b28d589cf9a829';

const FIXER_LATEST_URL = 'http://data.fixer.io/api/latest';
const FIXER_API_KEY = 'b0f095bd7e567a9e3a18b4c0f66bbc07';

export async function get(req: Request, res: Response) {
	const validatedParams = validation.get(req);

	if (validatedParams.errors) {
		return res.status(400).send({ errors: validatedParams.errors });
	}

	let rates = RatesCache.get(validatedParams.from);

	if (!rates) {
		try {
			const response: AxiosResponse<IFixerGetResponse> = await axios.get(FIXER_LATEST_URL, {
				params: {
					access_key: FIXER_API_KEY,
					base: validatedParams.from,
				}
			});

			if (!response || !response.data || !response.data.rates) {
				const message = response.data.error
					? `An error occurred at data provider, code: ${response.data.error.code}, type: ${response.data.error.type}.`
					: 'Data provider sent unexpected data.'
				return handleFixerApiError(res, message);
			}

			rates = response.data.rates;
			RatesCache.set(response.data);

		} catch (err) {
			if (err.response && err.response.data && err.response.data.error && err.response.data.description) {
				return handleFixerApiError(res, err.response.data.description);

			} else if (err.request) {
				return handleFixerApiError(res, 'No response received from the data provider.');

			} else {
				return handleFixerApiError(res, err.message);
			}
		}
	}

	const converted = validatedParams.amount * rates[validatedParams.to];

	StatsCache.incrementTotalNoOfRequests();
	StatsCache.increaseTotalAmountConverted(validatedParams.amount * rates[TOTAL_AMOUNT_CONVERTED_CURRENCY]);
	StatsCache.updateTotalNoOfRequestsByDestCurrency(validatedParams.to);

	const stats = StatsCache.get();

	return res.send({
		from: validatedParams.from,
		to: validatedParams.to,
		amount: validatedParams.amount,
		converted,
		stats,
	});
}

function handleFixerApiError(res: Response, message: string) {
	return res.status(503).send({
		errors: [{ message }]
	});
}