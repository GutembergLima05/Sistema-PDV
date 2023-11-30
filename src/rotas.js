const express = require('express');
const rotas = express()
const validador = require('./intermediarios/validador');
const esquemasUsuario = require('./validacoes/usuario');
const usuario = require('./controladores/usuario');
const validarLogin = require('./intermediarios/autenticacao');

// Rota pra cadastrar usuário
rotas.post('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), usuario.cadastrar)
//Rota para login
rotas.post('/login', validador(esquemasUsuario.login), usuario.login)

rotas.use(validarLogin)
// Rota para detalhar usuario
rotas.get('/usuario', usuario.detalharUsuario)
module.exports = rotas
