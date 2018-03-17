import uber from './uber/uber'
import express from 'express'
import checkHealth from './checkHealth'
import terminal from "./terminal/terminal";

const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');

// app.use(compression);
app.use(jsonParser());
app.use('/ifttt/uber', uber);
app.use('/ifttt/checkHealth',checkHealth);
app.use('/ifttt/terminal',terminal);
export default app;