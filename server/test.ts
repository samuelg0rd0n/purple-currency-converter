import path from 'path';
import fs from 'fs';

import express from 'express';

import api from './api';

const PORT = process.env.PORT || 3006;
const app = express();


app.get('/api/test', (req, res) => {
	return res.send('1');
});

app.get('/api/stats', api.stats.get);

app.use(express.static('./build'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
