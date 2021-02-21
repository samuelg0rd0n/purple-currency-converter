import React from 'react';
import ReactDOM from 'react-dom';

import Homepage from './pages/Homepage';

import './styles/app.scss';

const initialState = window.__INITIAL_STATE__ || {};

ReactDOM.hydrate(
	<React.StrictMode>
		<Homepage stats={ initialState.stats } />
	</React.StrictMode>,
	document.getElementById('root')
);
