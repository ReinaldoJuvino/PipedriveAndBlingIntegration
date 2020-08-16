const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const opportunityController = require('./controller/opportunityController');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routes);
// app.use(cors());
mongoose.connect(
  "mongodb+srv://admin-mongo:285882@integration-pipedrive-b.vtk9o.gcp.mongodb.net/<intregation-pipedrive-bling>?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true },
);

const connection = mongoose.connection;

connection.once('open',()=>{
  console.log("Conexão estabelecida");
})

 
app.listen(3333) 