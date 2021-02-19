import StatsCache from '../../caching/StatsCache.js';

export function get(req, res) {
	res.send(StatsCache.get());
}