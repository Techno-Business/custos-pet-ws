import express from 'express';
import morgan from 'morgan';
import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';

import cors from 'cors';
import './database.js';

import ownerRoutes from './src/routes/owner.routes.js';
import petRoutes from './src/routes/pet.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(busboy());
app.use(busboyBodyParser());
app.use(express.json());
app.use(cors());

app.use('/owner', ownerRoutes);
app.use('/pet', petRoutes);

app.listen(process.env.PORT || 8000, function () {
  console.log('WS okay');
});
