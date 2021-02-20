import Cache from './Cache';
import { IStats } from './IStats';

const TOTAL_NO_OF_REQUESTS = 'totalNoOfRequests';
const TOTAL_AMOUNT_CONVERTED = 'totalAmountConverted';
const TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY = 'totalNoOfRequestsByDestCurrency';
const MOST_POPULAR_DEST_CURRENCY = 'mostPopularDestCurrency';

class StatsCache extends Cache {
	path = './data/stats.json';

	getMostPopularDestinationCurrency(currencies: { [key:string]: string }): string {
		return Object.keys(currencies).reduce((a, b) => currencies[a] > currencies[b] ? a : b);
	}

	incrementTotalNoOfRequests(): number {
		const stats = this.readFile();

		if (!stats[TOTAL_NO_OF_REQUESTS]) {
			stats[TOTAL_NO_OF_REQUESTS] = 1;

		} else {
			stats[TOTAL_NO_OF_REQUESTS] += 1;
		}

		this.writeFile(stats);

		return stats[TOTAL_NO_OF_REQUESTS];
	}

	increaseTotalAmountConverted(amount: number): number {
		const stats = this.readFile();

		if (!stats[TOTAL_AMOUNT_CONVERTED]) {
			stats[TOTAL_AMOUNT_CONVERTED] = amount;

		} else {
			stats[TOTAL_AMOUNT_CONVERTED] += amount;
		}

		this.writeFile(stats);

		return stats[TOTAL_AMOUNT_CONVERTED];
	}

	updateTotalNoOfRequestsByDestCurrency(currency: string): number {
		const stats = this.readFile();

		if (!stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY]) {
			stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY] = {};
		}

		if (!stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency]) {
			stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency] = 1;

		} else {
			stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY][currency] += 1;
		}

		this.writeFile(stats);

		return stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY];
	}

	get(): IStats {
		const stats = this.readFile();

		const totalNoOfRequests = stats[TOTAL_NO_OF_REQUESTS];
		const totalAmountConverted = Math.round( stats[TOTAL_AMOUNT_CONVERTED] * 100 + Number.EPSILON ) / 100;
		const mostPopularDestCurrency = stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY]
			? this.getMostPopularDestinationCurrency(stats[TOTAL_NO_OF_REQUESTS_BY_DEST_CURRENCY])
			: undefined;

		return {
			[TOTAL_NO_OF_REQUESTS]: totalNoOfRequests,
			[TOTAL_AMOUNT_CONVERTED]: totalAmountConverted,
			[MOST_POPULAR_DEST_CURRENCY]: mostPopularDestCurrency,
		};
	}
}

export default new StatsCache();