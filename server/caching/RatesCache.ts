import Cache from './Cache';

class RatesCache extends Cache {
	cachePeriod = 86400;
	path = './data/rates.json';

	get(currency: any) {
		const rates = this.readFile();
		const currentTimestamp = Math.floor(Date.now() / 1000);

		if (!rates[currency] || (currentTimestamp - rates[currency].timestamp) > this.cachePeriod) {
			return null;
		}

		return rates[currency].rates;
	}

	set(newRates: any) {
		const rates = this.readFile();

		rates[newRates.base] = newRates;

		this.writeFile(rates);
	}
}

export default new RatesCache();