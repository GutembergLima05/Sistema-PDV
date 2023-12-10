const knex = require("../db/conexao");

const cadastrarProduto = async (req, res) => {

  try {
    const categoriaValida = await knex("categorias")
      .where("id", req.body.categoria_id)
      .first();

    if (!categoriaValida) {
      return res
        .status(404)
        .json({ mensagem: `Categoria informada inválida.` });
    }
    const cadastroProduto = await knex("produtos")
      .insert(req.body)
      .returning("*");
    return res.status(201).json(cadastroProduto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarProduto = async (req, res) => {
  const { id } = req.params;
  
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "Id de produto invalido" });
  }

  try {
    const produtoValido = await knex("categorias").where("id", id).first();
    const categoriaValida = await knex("categorias").where("id", req.body.categoria_id).first();

    if (!produtoValido) {
      return res.status(404).json({ mensagem: `Produto informado não encontrado.` });
    }

    if (!categoriaValida) {
      return res.status(404).json({ mensagem: `Categoria informada não encontrada.` });
    }


    const cadastroProduto = await knex("produtos").update(req.body).returning("*");
    return res.status(200).json(cadastroProduto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const produtoID = req.params.id;
  
  if (isNaN(produtoID)) {
    return res.status(400).json({ mensagem: "Id de produto invalido" });
  }

  try {
    const resultadoExclusao = await knex("produtos").where({id: produtoID}).del();

    if (resultadoExclusao > 0) {
      return res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } else {
      return res.status(404).json({mensagem:"Produto nao encontrado.",});
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const produto_id = req.params.id;

  if (isNaN(produto_id)) {
    return res.status(400).json({ mensagem: "Id de produto invalido" });
  }

  try {
    const produtoExiste = await knex("produtos").where("id", produto_id).first();

    if (!produtoExiste) {
      return res.status(404).json({ mensagem: "Produto não cadastrado" });
    }

    req.produto = produtoExiste;

    return res.status(200).json(req.produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarProduto = async (req, res) => {
  const produtos = await knex('produtos');
  return res.status(200).json(produtos)
}
module.exports = {
  excluirProduto,
  detalharProduto,
  cadastrarProduto,
  editarProduto,
  listarProduto
};
