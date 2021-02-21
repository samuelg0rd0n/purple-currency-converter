import React, { useState } from 'react';

import CurrencyConverter from '../../components/CurrencyConverter';
import { IStats } from '../../../server/caching/IStats';
import Stats from '../../components/Stats';

type Props = {
	stats: IStats,
}

function Homepage(props: Props) {
	const [ stats, setStats ] = useState<IStats|undefined>(undefined);

	return (
		<div>
			<div className="container">
				<h1 className="text-center text-primary mt-5">Purple <strong>Currency Converter</strong></h1>

				<div className="bg-primary shadow-lg rounded-lg p-4 p-sm-5 mt-5">
					<CurrencyConverter setStats={setStats} />
				</div>

				<Stats stats={stats || props.stats} />

				<footer className="text-center text-muted mt-5">
					<span>Created with ❤️ by Adam Štěpánek</span>
					<span className="px-2">•</span>
					<a href="https://github.com/samuelg0rd0n/purple-currency-converter" target="_blank" rel="noreferrer">GitHub</a>
				</footer>
			</div>
		</div>
	);
}

export default Homepage;
