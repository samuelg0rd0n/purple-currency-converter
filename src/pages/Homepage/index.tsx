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

				<div className="bg-primary shadow-lg rounded-lg p-4 p-sm-5 mt-5">
					<CurrencyConverter setStats={setStats} />
				</div>

				<Stats stats={stats || props.stats} />

			</div>
		</div>
	);
}

export default Homepage;
