const app = require('express')();
const routes = require('./app/routes');
const mongoose = require('mongoose');
const databaseConfig = require('./config/database');
const requireDir = require('require-dir');

mongoose.connect(databaseConfig.url);
requireDir(databaseConfig.modelsPath);

app.use('/api', routes);

app.listen(3000);
