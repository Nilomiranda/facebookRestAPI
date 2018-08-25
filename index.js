const app = require('express')();

const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const databaseConfig = require('./config/database');
const routes = require('./app/routes');


mongoose.connect(databaseConfig.url);
requireDir(databaseConfig.modelsPath);


app.use(bodyParser.json());

app.use('/api', routes);

app.listen(3000);
