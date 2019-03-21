import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router1 from './routes/route1';
import router2 from './routes/route2';


const app = express();
const portNumber = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router1);
app.use('/api/v2', router2);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => res.status(404).json({ status: 404, error: 'resource not found' }));

const server = app.listen(portNumber);
console.log('app running on port ', portNumber);

export default server;
