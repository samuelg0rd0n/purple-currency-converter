import path from 'path';
import fs from 'fs';

import express from 'express';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/api/test', (req, res) => {

	const totalNoOfRequests = incrementTotalNoOfRequests();
	const totalAmountConverted = increaseTotalAmountConverted(500);
	const currencies = updateTotalNoOfRequestsByDestCurrency('USD');
	const mostPopularCurrency = getMostPopularDestinationCurrency(currencies);

	return res.send({
		[TOTAL_NO_OF_REQUESTS]: totalNoOfRequests,
		[TOTAL_AMOUNT_CONVERTED]: totalAmountConverted,
		[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY]: currencies,
		'mostPopularCurrency': mostPopularCurrency,
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
