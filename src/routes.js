const express = require('express');
const opportunityController = require('./controller/opportunityController');
// const opportunity = require('./models/integrationBlingModel');
const routes = express.Router();

routes.get('/opportunitys',opportunityController.index)

routes.post('/opportunitys/add',opportunityController.add)

module.exports = routes;