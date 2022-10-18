import express from 'express';
import morgan from 'morgan';
import busboy from 'connect-busboy';

import cors from 'cors';

import { apiV1Routes } from "./routes";

const app = express();

app.use(morgan('dev'));
app.use(busboy());
app.use(express.json());
app.use(cors());

app.use('/api/v1', apiV1Routes);

app.listen(process.env.PORT || 8000, function () {
  console.log('Server is running.');
});
