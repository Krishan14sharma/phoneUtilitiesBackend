import uber from './uber/uber'
import express from 'express'
import checkHealth from './checkHealth'

const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');

// app.use(compression);
app.use(jsonParser());
app.use('/ifttt/uber', uber);
app.use('/ifttt/checkHealth',checkHealth);
export default app;