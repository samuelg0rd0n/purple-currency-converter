import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import Homepage from '../src/pages/Homepage';
import StatsCache from './caching/StatsCache';

export default function renderer(req: Request, res: Response) {
	const stats = StatsCache.get();
	const app = ReactDOMServer.renderToString(<Homepage stats={stats} />);

	const indexFile = path.resolve('./build/index.html');
	fs.readFile(indexFile, 'utf8', (err, data) => {
		if (err) {
			console.error('Something went wrong:', err);
			return res.status(500).send('Oops, better luck next time!');
		}

		return res.send(
			data.replace('<div id="root"></div>', `
				<div id="root">${app}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify({ stats })}
				</script>
			`)
		);
	});
};