import React from 'react';
import currencies from '../../enums/currencies.json';
import { FieldProps } from 'formik';

type Props = {
	default: string,
} & FieldProps;

function CurrencySelect({ field, form, ...props }: Props) {

	return (
		<select
			className="form-control form-control-lg"
			{...field}
		>
			{Object.entries(currencies).map(([ code, label ], index) => (
				<option
					key={index}
					value={code}
				>
					{code} ({label})
				</option>
			))}
		</select>
	);
}

export default CurrencySelect;