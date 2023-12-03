require('dotenv').config()
const express = require('express');
const rotas = require('./rotas')
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  };

app.use(cors(corsOptions))
app.use(express.json())
app.use(rotas)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})