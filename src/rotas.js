const express = require('express');
const rotas = express()

const validador = require('./intermediarios/validador');
const usuario = require('./validacoes/usuario');

const { cadastrarUser } = require('./controladores/usuario')

// Rota pra cadastrar usuário
rotas.post('/usuario', validador(usuario), cadastrarUser)

module.exports = rotas
