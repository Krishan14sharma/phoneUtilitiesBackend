import routes from './routes'
import express from 'express'
const app = express();

const jsonParser = require('body-parser').json;
const logger = require('morgan');


const port = process.env.port || 8080;

app.use(jsonParser());
app.use('/ifttt', routes);

app.listen(port, () => {
    console.log(`Web server listening on: ${port}`);
});