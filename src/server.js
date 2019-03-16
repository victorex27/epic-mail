import express from 'express';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './routes/route';


const app = express();
const portNumber = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());

app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => res.status(404).json({ status: 404, error: 'resource not found' }));

const server = app.listen(portNumber);
console.log('app running on port ', portNumber);

export default server;
