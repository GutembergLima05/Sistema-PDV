const express = require('express');
const rotas = express()
const knex = require('./db/conexao')
const {validador, verificaDadosExistentes} = require('./intermediarios/validador');
const esquemasUsuario = require('./validacoes/usuario');
const usuario = require('./controladores/usuario');
const validarLogin = require('./intermediarios/autenticacao');

// Rota pra cadastrar usuário
rotas.post('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), usuario.cadastrar)

//Rota para login
rotas.post('/login', validador(esquemasUsuario.login), usuario.login)

// Rota para listar categorias
rotas.get('/categoria', usuario.listarCategoria)

// Verifica autenticacao
rotas.use(validarLogin)

// Rota para detalhar usuario
rotas.get('/usuario', usuario.detalharUsuario)

// Rota para editar usuario
rotas.put('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), usuario.editarUsuario)

rotas.get('/cliente', verificaDadosExistentes) 
module.exports = rotas
