const express = require('express');
const rotas = express();
const {validador, verificaDadosExistentes, verificaDadosPedidos} = require('./intermediarios/validador');
const esquemasUsuario = require('./validacoes/usuario');
const esquemasCliente = require('./validacoes/clientes');
const esquemasProduto = require('./validacoes/produto');
const esquemasPedido = require('./validacoes/pedido');
const usuarios = require('./controladores/usuario');
const clientes = require('./controladores/cliente');
const produtos = require('./controladores/produto');
const pedidos = require('./controladores/pedido');
const validarLogin = require('./intermediarios/autenticacao');
const multer = require('./multer');

// ROTAS DE USUARIO
// Rota pra cadastrar usuário
rotas.post('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes(['usuarios', "cadastrar"]), usuarios.cadastrar)

//Rota para login
rotas.post('/login', validador(esquemasUsuario.login), usuarios.login)

// Rota para listar categorias
rotas.get('/categoria', usuarios.listarCategorias)

// Verifica autenticacao
rotas.use(validarLogin)

//  --------------------   x        ---------------------

// Rota para detalhar usuario
rotas.get('/usuario', usuarios.detalhar)

// Rota para editar usuario
rotas.put('/usuario', validador(esquemasUsuario.cadastroOuAtualizacao), verificaDadosExistentes(['usuarios', "atualizar"]), usuarios.editar)

//  --------------------   x        ---------------------

// ROTAS DE PRODUTO
// Rota para cadastrar um produto
rotas.post('/produto', multer.single('imagem'), validador(esquemasProduto.cadastrarOuEditar), produtos.cadastrar)

// Rota para editar um produto por ID
rotas.put('/produto/:id', multer.single('imagem'),validador(esquemasProduto.cadastrarOuEditar), produtos.editar)

// Rota para excluir produto por ID
rotas.delete('/produto/:id', produtos.excluir)

// Rota detalhar produto por ID
rotas.get('/produto/:id', produtos.detalhar)

// Rota para listar produtos
rotas.get('/produto', produtos.listar)

//  --------------------   x        ---------------------

// ROTAS DE CLIENTE
// Rota para cadastrar cliente
rotas.post('/cliente', validador(esquemasCliente.cadastrarOuEditar), verificaDadosExistentes(['clientes']), clientes.cadastrar)

// Rota para detalhar cliente por ID
rotas.get('/cliente/:id', clientes.detalhar)

// Rota para editar cliente por ID
rotas.put('/cliente/:id', validador(esquemasCliente.cadastrarOuEditar), verificaDadosExistentes(['clientes']), clientes.editar)

// Rota para Listar Clientes
rotas.get("/cliente", clientes.listar)

//  --------------------   x   ---------------------

// ROTAS DE PEDIDO
// Rota para cadastrar Pedido
rotas.post('/pedido', validador(esquemasPedido.cadastrarOuEditar), verificaDadosPedidos('produtos'), pedidos.cadastrar)

// Rota para listar pedidos
rotas.get('/pedido', pedidos.listar)

module.exports = rotas