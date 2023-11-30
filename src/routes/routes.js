const express = require('express');
const rotas = express()

const validarCorpoRequisicao = require('../middlewares/validarCorpoRequisicao');
const schemaUsuario = require('../validations/schemaUsuario');

const { cadastrarUser } = require('../controllers/userController')

// Rota pra cadastrar usuário
rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario), cadastrarUser)


// TESTES 

// Importações de testes para serem removidas na daily amanhã.
const { testeRoute } = require('../controllers/testController');
const { testIntermediario } = require('../middlewares/testeIntermediario');

// Demonstração de intermediario na arquitetura do projeto...
rotas.use(testIntermediario);

// Demonstração de rota da arquitetura do projeto...
rotas.get('/teste', testeRoute)

module.exports = rotas