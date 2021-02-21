import React from 'react';
import { IStats } from '../../server/caching/IStats';

type Props = {
	stats: IStats,
}

const Stats = (props: Props) => {
	if (!props.stats) {
		return null;
	}

	return (
		<div className="row text-center mt-5">
			<div className="col-md d-flex flex-column mb-5">
				<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
					<span>Most popular destination currency</span>
				</h6>
				<h3 className="mb-0">{props.stats.mostPopularDestCurrency || 'N/A'}</h3>
			</div>
			<div className="col-md d-flex flex-column mb-5">
				<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
					<span>Total amount converted</span>
				</h6>
				<h3 className="mb-0">{props.stats.totalAmountConverted} USD</h3>
			</div>
			<div className="col-md d-flex flex-column mb-5">
				<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
					<span>Total number of conversion requests made</span>
				</h6>
				<h3 className="mb-0">{props.stats.totalNoOfRequests}</h3>
			</div>
		</div>
	)
}

export default Stats;