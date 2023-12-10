const express = require('express');
const rotas = express()
const {validador, verificaDadosExistentes} = require('./intermediarios/validador');
const esquemasUsuario = require('./validacoes/usuario');
const esquemasCliente = require('./validacoes/clientes')
const esquemasProduto = require('./validacoes/produto')
const usuarios = require('./controladores/usuario');
const clientes = require('./controladores/cliente')
const produtos = require('./controladores/produto');
const validarLogin = require('./intermediarios/autenticacao');

// ROTAS DE USUARIO
// Rota pra cadastrar usuário
rotas.post('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes('usuarios'), usuarios.cadastrarUsuario)

//Rota para login
rotas.post('/login', validador(esquemasUsuario.login), usuarios.loginUsuario)

// Rota para listar categorias
rotas.get('/categoria', usuarios.listarCategoria)

// Verifica autenticacao
rotas.use(validarLogin)

//  --------------------   x        ---------------------

// Rota para detalhar usuario
rotas.get('/usuario', usuarios.detalharUsuario)

// Rota para editar usuario
rotas.put('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes('usuarios'), usuarios.editarUsuario)

//  --------------------   x        ---------------------

// ROTAS DE PRODUTO
// Rota para cadastrar um produto
rotas.post('/produto', validador(esquemasProduto.cadastrarOuEditar), produtos.cadastrarProduto)

// Rota para editar um produto por ID
rotas.put('/produto/:id', validador(esquemasProduto.cadastrarOuEditar), produtos.editarProduto)

// Rota para excluir produto por ID
rotas.delete('/produto/:id', produtos.excluirProduto)

// Rota detalhar produto por ID
rotas.get('/produto/:id', produtos.detalharProduto)

// Rota para listar produtos
rotas.get('/produto', produtos.listarProdutos)

//  --------------------   x        ---------------------

// ROTAS DE CLIENTE
// Rota para cadastrar cliente
rotas.post('/cliente', validador(esquemasCliente.cadastrarOuEditar), verificaDadosExistentes('clientes'), clientes.cadastrarCliente)

// Rota para detalhar cliente por ID
rotas.get('/cliente/:id', clientes.detalharCliente)

// Rota para editar cliente por ID
rotas.put('/cliente/:id', validador(esquemasCliente.cadastrarOuEditar), verificaDadosExistentes('clientes'), clientes.editarCliente)

// Rota para Listar Clientes
rotas.get("/cliente", clientes.listarClientes)

module.exports = rotas
