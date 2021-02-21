import * as Yup from 'yup';

export default Yup.object().shape({
	fromAmount: Yup.number()
		.positive('Amount must be a number larger than 0.')
		.max(999999999, 'Amount be less than 1 billion.')
		.required('Amount is required.'),
});