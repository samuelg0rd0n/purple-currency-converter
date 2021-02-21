import { Request, Response } from 'express';

import StatsCache from '../../../caching/StatsCache';

export function get(req: Request, res: Response) {
	res.send(StatsCache.get());
}