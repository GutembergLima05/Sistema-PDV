const express = require('express');
const rotas = express()

const validador = require('./intermediarios/validador');
const usuario = require('./validacoes/usuario');

const { cadastrar } = require('./controladores/usuario')

// Rota pra cadastrar usuário
rotas.post('/usuario', validador(usuario), cadastrar)

module.exports = rotas
