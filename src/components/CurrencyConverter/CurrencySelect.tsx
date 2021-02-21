import React from 'react';
import Select from 'react-select';
import currencies from '../../enums/currencies.json';
import { FieldProps } from 'formik';

function CurrencySelect(props: FieldProps) {

	const options = Object.entries(currencies).map(([ value, label ]) => ({
		value, label
	}));

	const styles = {
		control: (provided: any) => ({
			...provided,
			minHeight: '48px'
		})
	}

	return (
		<Select
			options={options}
			name={props.field.name}
			value={options.find(option => option.value === props.field.value)}
			onChange={option => props.form.setFieldValue(props.field.name, option?.value)}
			formatOptionLabel={option => (
				<div style={{ lineHeight: 1 }}>
					{option.value}<br />
					<small>{option.label}</small>
				</div>
			)}
			styles={styles}
		/>
	);
}

export default CurrencySelect;