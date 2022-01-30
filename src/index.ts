import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

import dbInit from './db/init';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port: number = 5000;

dbInit();

app.listen(port, () => console.log(`Running on port ${port}`));

app.use(router);
