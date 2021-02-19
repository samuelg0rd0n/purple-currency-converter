import * as stats from '../../modules/stats.js';

export function get(req, res) {
	res.send(stats.getStats());
}