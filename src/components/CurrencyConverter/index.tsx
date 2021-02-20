import React, { useState } from 'react';
import axios from 'axios';
import { Field, Formik, FormikHelpers } from 'formik';

import CurrencySelect from './CurrencySelect';
import { ICurrencyConverter } from './ICurrencyConverter';
import initialValues from './initialValues';
import validationSchema from './validationSchema';

const CurrencyConvertor = () => {

	const [ converted, setConverted ] = useState(undefined);

	const onSubmit = async (values: ICurrencyConverter, helpers: FormikHelpers<ICurrencyConverter>) => {
		try {
			const response = await axios.get('/api/convert', {
				params: {
					from: values.fromCurrency,
					to: values.toCurrency,
					amount: values.fromAmount
				}
			});

			if (response && response.data) {
				setConverted(response.data.converted);
			}

		} catch (err) {
			console.error(err);
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
							>
								Convert 👇
							</button>
						</div>
					</div>

					{Object.keys(formik.errors).length > 0 &&
						<div className="alert alert-danger">{formik.errors.fromAmount}</div>
					}

					{!!converted &&
					<div className="text-center text-white display-4">
						<strong>{converted}</strong> {formik.values.toCurrency}
					</div>
					}
				</form>
			)}
		</Formik>
	);

}

export default CurrencyConvertor;