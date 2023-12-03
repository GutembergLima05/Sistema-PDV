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
// Rota para editar usuario
rotas.put('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), usuario.editarUsuario)
// Rota para listar categorias
rotas.get('/categoria', usuario.listarCategoria)
module.exports = rotas
