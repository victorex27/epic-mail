import express from 'express';
import router from './routes/route';

const app = express();

app.use(express.json());

app.use('/api/v1', router);
app.get('*', (req, res) => res.status(404).json({ status: 404, error: 'resource not found' }));
const server = app.listen(3000);
console.log('app running on port ', 3000);

export default server;
