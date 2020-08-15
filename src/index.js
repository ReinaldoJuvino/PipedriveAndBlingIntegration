const express = require('express');
const routes = require('./routes');
const server = require("./services/server")

const app = express();

//defino que o corpo da requisição sera passdo através de json
app.use(express.json());
// app.use(routes);
// app.use(server.)
app.listen(3333) 

app.get('/', function (req, res) {
  res.send('Bem Vindo a Integração entre Pipedrive e Bling');
});

