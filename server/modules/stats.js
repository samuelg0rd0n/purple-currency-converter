import fs from 'fs';

const STATS_PATH = './data/stats.json';

const TOTAL_NO_OF_REQUESTS = 'totalNoOfRequests';
const TOTAL_AMOUNT_CONVERTED = 'totalAmountConverted';
const TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY = 'totalNoOfRequestsByDestCurrency';
const MOST_POPULAR_DEST_CURRENCY = 'mostPopularDestCurrency';

function readStatsFile() {
	if (!fs.existsSync(STATS_PATH)) {
		return {};
	}

	const content = fs.readFileSync(STATS_PATH, { encoding: 'utf-8' });

	try {
		return JSON.parse(content);

	} catch (err) {
		return {};
	}
}

function writeStatsFile(stats) {
	fs.writeFileSync(STATS_PATH, JSON.stringify(stats));
}

function getMostPopularDestinationCurrency(currencies) {
	return Object.keys(currencies).reduce((a, b) => currencies[a] > currencies[b] ? a : b);
}

export function incrementTotalNoOfRequests() {
	const stats = readStatsFile();

	if (!stats[TOTAL_NO_OF_REQUESTS]) {
		stats[TOTAL_NO_OF_REQUESTS] = 1;

	} else {
		stats[TOTAL_NO_OF_REQUESTS] += 1;
	}

	writeStatsFile(stats);

	return stats[TOTAL_NO_OF_REQUESTS];
}

export function increaseTotalAmountConverted(amount) {
	const stats = readStatsFile();

	if (!stats[TOTAL_AMOUNT_CONVERTED]) {
		stats[TOTAL_AMOUNT_CONVERTED] = amount;

	} else {
		stats[TOTAL_AMOUNT_CONVERTED] += amount;
	}

	writeStatsFile(stats);

	return stats[TOTAL_AMOUNT_CONVERTED];
}

export function updateTotalNoOfRequestsByDestCurrency(currency) {
	const stats = readStatsFile();

	if (!stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY]) {
		stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY] = {};
	}

	if (!stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency]) {
		stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency] = 1;

	} else {
		stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency] += 1;
	}

	writeStatsFile(stats);

	return stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY];
}

export function getStats() {
	const stats = readStatsFile();

	const totalNoOfRequests = stats[TOTAL_NO_OF_REQUESTS] ?? null;
	const totalAmountConverted = stats[TOTAL_AMOUNT_CONVERTED] ?? null;
	const mostPopularDestCurrency = stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY]
		? getMostPopularDestinationCurrency(stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY])
		: null;

	return {
		[TOTAL_NO_OF_REQUESTS]: totalNoOfRequests,
		[TOTAL_AMOUNT_CONVERTED]: totalAmountConverted,
		[MOST_POPULAR_DEST_CURRENCY]: mostPopularDestCurrency,
	};
}