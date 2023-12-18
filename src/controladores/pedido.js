const knex = require("../db/conexao");
const transportador = require('../email');
const compiladorHtml = require('../utils/compiladorHtml');

const cadastrar = async (req, res) => {
    const { observacao, cliente_id, pedido_produtos } = req.body;
    try {
      let valor_total = 0; 
      for (let pedido of pedido_produtos) {
        const produto = await knex('produtos').where('id', pedido.produto_id).first();
        valor_total += produto.valor * Number(pedido.quantidade_produto);
      }
      const cadastroPedido = await knex('pedidos').insert({ observacao, cliente_id, valor_total }).returning('*');
      for (let pedidoProduto of pedido_produtos) {
        const produto = await knex('produtos').where('id', pedidoProduto.produto_id).first();
        const pedidoProdutoData = {
          quantidade_produto: pedidoProduto.quantidade_produto,
          valor_produto: produto.valor,
          pedido_id: cadastroPedido[0].id, 
          produto_id: produto.id,
        };
        const atualizarProduto = {
            descricao: produto.descricao, 
            quantidade_estoque: produto.quantidade_estoque - pedidoProduto.quantidade_produto, 
            valor: produto.valor, 
            categoria_id: produto.categoria_id
        }
        await knex("produtos").where("id", produto.id).update(atualizarProduto)
        await knex('pedidos_produtos').insert(pedidoProdutoData);
      }

      const nomeCliente = await knex('clientes').where('id', cliente_id).returning('*').first();

      const html = await compiladorHtml('./src/templates/pedido.html', {
        nomeusuario: nomeCliente.nome,
        pedido_id: cadastroPedido[0].id,
        total: cadastroPedido[0].valor_total
      })

      transportador.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${nomeCliente.nome} <${nomeCliente.email}>`,
        subject: 'Confirmação de Pedido',
        html,
      })

      return res.status(200).json(cadastroPedido[0]);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  };
  
  const listar = async (req, res) => {
    const {cliente_id} = req.query
    try {
      if(cliente_id){
        const pedidos = await knex('pedidos').where('cliente_id', cliente_id)
        if(pedidos.length === 0){
          return res.status(404).json({mensagem: "Nenhum pedido registrado"})
        }
        return res.status(200).json(pedidos)
      }
      const pedidos = await knex('pedidos')
      if(pedidos.length === 0){
        return res.status(404).json({mensagem: "Nenhum pedido registrado"})
      }
      return res.status(200).json(pedidos)
    } catch (error) {
      console.log(error)
      return res.status(500).json({mensagen: 'Erro interno no servidor'})
    }
   
  }
module.exports = {
    cadastrar,
    listar
}