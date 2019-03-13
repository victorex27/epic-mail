import express from 'express';
import router from './routes/route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);
app.get('*', (req, res) => res.status(404).json({ status: 404, error: 'resource not found' }));
const portNumber = process.env.PORT || 3000;
const server = app.listen(portNumber);
console.log('app running on port ', portNumber);

export default server;
