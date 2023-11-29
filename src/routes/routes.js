const express = require('express');
const rotas = express()

const { testeRoute } = require('../controllers/testController');
const { testIntermediario } = require('../middlewares/testeIntermediario');

// Demonstração de intermediario na arquitetura do projeto...
rotas.use(testIntermediario);


// Demonstração de rota da arquitetura do projeto...
rotas.get('/teste', testeRoute)

module.exports = rotas