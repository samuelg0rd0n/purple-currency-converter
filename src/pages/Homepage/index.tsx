import React from 'react';

import CurrencyConvertor from 'components/CurrencyConvertor';

import styles from './index.module.scss';

function App() {
	return (
		<div className={styles.container}>
			<div className="container">
				<div className="bg-white shadow rounded-lg p-5">
					<CurrencyConvertor />

					<hr />

					<div className="row text-center">
						<div className="col d-flex flex-column">
							<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
								<span>Most popular destination currency</span>
							</h6>
							<h3 className="mb-0">CZK</h3>
						</div>
						<div className="col d-flex flex-column">
							<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
								<span>Total amount converted</span>
							</h6>
							<h3 className="mb-0">280 USD</h3>
						</div>
						<div className="col d-flex flex-column">
							<h6 className="flex-grow-1 d-flex align-items-center justify-content-center">
								<span>Total number of conversion requests made</span>
							</h6>
							<h3 className="mb-0">5000</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
