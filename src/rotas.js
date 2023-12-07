const express = require('express');
const rotas = express()
const {validador, verificaDadosExistentes} = require('./intermediarios/validador');
const esquemasUsuario = require('./validacoes/usuario');
const usuario = require('./controladores/usuario');
const produto = require('./controladores/produto');
const validarLogin = require('./intermediarios/autenticacao');

// ROTAS DE USUARIO
// Rota pra cadastrar usuário
rotas.post('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes, usuario.cadastrar)

//Rota para login
rotas.post('/login', validador(esquemasUsuario.login), usuario.login)

// Rota para listar categorias
rotas.get('/categoria', usuario.listarCategoria)

// Verifica autenticacao
rotas.use(validarLogin)

// Rota para detalhar usuario
rotas.get('/usuario', usuario.detalharUsuario)

// Rota para editar usuario
rotas.put('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes, usuario.editarUsuario)

// ROTAS DE PRODUTO
// Rota para excluir produto por ID
rotas.delete('/produto/:id', produto.excluirProduto)

// ROTAS DE CLIENTE

module.exports = rotas
