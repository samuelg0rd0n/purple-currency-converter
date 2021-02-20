import express from 'express';

import renderer from './renderer';
import api from './api';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', renderer);

app.get('/api/convert', api.convert.get);

app.get('/api/stats', api.stats.get);

app.use(express.static('./build'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
