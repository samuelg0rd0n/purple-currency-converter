import * as Yup from 'yup';

export default Yup.object().shape({
	fromAmount: Yup.number()
		.positive('Amount must be a number larger than 0.')
		.required('Amount is required.'),
});