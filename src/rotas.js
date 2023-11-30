const express = require('express');
const rotas = express()

const validador = require('./intermediarios/validador');
const usuario = require('./validacoes/usuario');

const { cadastrarUser } = require('./controladores/usuario')

// Rota pra cadastrar usuário
rotas.post('/usuario', validador(usuario), cadastrarUser)


// TESTES 

// Importações de testes para serem removidas na daily amanhã.
const { testeRoute } = require('../controladores/usuario');
const intermediarioTeste = require('./intermediarios/intermediarioTeste');

// Demonstração de intermediario na arquitetura do projeto...
rotas.use(intermediarioTeste);

// Demonstração de rota da arquitetura do projeto...
rotas.get('/teste', testeRoute)

module.exports = rotas
