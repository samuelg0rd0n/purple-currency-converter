import React from 'react';

import CurrencyConverter from '../../components/CurrencyConverter';
import { IStats } from '../../../server/caching/IStats';
import Stats from '../../components/Stats';

type Props = {
	stats: IStats,
}

function Homepage(props: Props) {
	return (
		<div>
			<div className="container">

				{/*<img src={logo} alt="Purple Currency Converter" />*/}

				<div className="bg-primary shadow-lg rounded-lg p-4 p-sm-5 mt-5">
					<CurrencyConverter />
				</div>

				<Stats stats={props.stats} />

			</div>
		</div>
	);
}

export default Homepage;
