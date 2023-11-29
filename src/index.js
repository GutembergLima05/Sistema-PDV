require('dotenv').config()
const express = require('express');
const rotas = require('./routes/routes')

const app = express();

app.use(express.json())
app.use(rotas)

app.listen(3000, () => {
    console.log(`Servidor rodando na porta {process.env.PORT}`);
})