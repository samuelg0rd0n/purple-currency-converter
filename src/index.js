import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/Homepage';

import 'styles/app.scss';

ReactDOM.hydrate(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
