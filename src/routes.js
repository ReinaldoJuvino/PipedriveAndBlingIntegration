const express = require('express');
const opportunityController = require('./controller/opportunityController');
const routes = express.Router();

routes.get('/opportunities',opportunityController.index)

routes.post('/opportunities/add',opportunityController.add)

module.exports = routes;