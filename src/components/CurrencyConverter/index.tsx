import React, { Dispatch, SetStateAction, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Field, Formik } from 'formik';

import CurrencySelect from './CurrencySelect';
import { ICurrencyConverter } from './ICurrencyConverter';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { IStats } from '../../../server/caching/IStats';
import { roundNumber } from './helpers';
import { IConvertGetResponse } from '../../../server/api/endpoints/convert/IConvertGetResponse';
import { IApiError } from '../../../server/api/interfaces/IApiError';

type Props = {
	setStats: Dispatch<SetStateAction<IStats|undefined>>,
}

const CurrencyConvertor = (props: Props) => {
	const [ converted, setConverted ] = useState<number|undefined>(undefined);
	const [ convertedCurrency, setConvertedCurrency ] = useState<string|undefined>(undefined);
	const [ apiErrors, setApiErrors ] = useState<Array<IApiError>>([]);

	const onSubmit = async (values: ICurrencyConverter) => {
		setApiErrors([]);

		try {
			const response: AxiosResponse<IConvertGetResponse> = await axios.get('/api/convert', {
				params: {
					from: values.fromCurrency,
					to: values.toCurrency,
					amount: values.fromAmount
				}
			});

			if (response && response.data) {
				setConverted(response.data.converted);
				setConvertedCurrency(response.data.to);
				props.setStats(response.data.stats);
			}

		} catch (err) {
			console.error(err);

			if (err.response && err.response.data && err.response.data.errors) {
				setApiErrors(err.response.data.errors);
			} else {
				setApiErrors([{
					message: err.response ? err.response.statusText : err.message
				}]);
			}
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{ formik => (
				<form onSubmit={formik.handleSubmit}>
					<div className="form-row align-items-end">
						<div className="col-lg">
							<div className="form-row">
								<div className="col-sm-12 col-md-4 form-group">
									<label className="text-white">Amount</label>
									<Field
										type="number"
										name="fromAmount"
										className="form-control form-control-lg"
									/>
								</div>
								<div className="col-sm-6 col-md-4 form-group">
									<label className="text-white">From</label>
									<Field
										name="fromCurrency"
										component={CurrencySelect}
									/>
								</div>
								<div className="col-sm-6 col-md-4 form-group">
									<label className="text-white">To</label>
									<Field
										name="toCurrency"
										component={CurrencySelect}
									/>
								</div>
							</div>
						</div>
						<div className="col-lg flex-lg-grow-0 text-nowrap">
							<button
								type="submit"
								className="btn btn-secondary btn-lg form-group w-100"
								disabled={formik.isSubmitting}
								style={{ minWidth: '140px' }}
							>
								{formik.isSubmitting ?
									<div className="spinner">
										<div className="bounce1" />
										<div className="bounce2" />
										<div className="bounce3" />
									</div>
									:
									<span>Convert 👇</span>
								}
							</button>
						</div>
					</div>

					{Object.keys(formik.errors).length > 0 &&
						<div className="alert alert-danger">{formik.errors.fromAmount}</div>
					}

					{apiErrors.map((error, index) => (
						<div className="alert alert-danger" key={index}>{error.message}</div>
					))}

					{!!converted &&
					<div className="text-center text-secondary display-4 mt-4">
						<strong className="font-weight-bold">{roundNumber(converted)}</strong> {convertedCurrency}
					</div>
					}
				</form>
			)}
		</Formik>
	);

}

export default CurrencyConvertor;