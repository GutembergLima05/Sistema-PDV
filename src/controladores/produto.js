const knex = require("../db/conexao");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  try {
    const categoriaValida = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoriaValida) {
      return res
        .status(404)
        .json({ mensagem: `Categoria informada inválida.` });
    }

    const cadastroProduto = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");
    return res.status(201).json(cadastroProduto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const produtoValido = await knex("produtos").where("id", id).first();
    const categoriaValida = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!produtoValido) {
      return res
        .status(404)
        .json({ mensagem: `Produto informado não encontrado.` });
    }

    if (!categoriaValida) {
      return res
        .status(404)
        .json({ mensagem: `Categoria informada não encontrada.` });
    }

    const atualizarProduto = await knex("produtos")
      .where("id", id)
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .returning("*");
    return res.status(200).json(atualizarProduto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const produtoID = req.params.id;

  try {
    const resultadoExclusao = await knex("produtos")
      .where({ id: produtoID })
      .del();

    if (resultadoExclusao > 0) {
      return res
        .status(200)
        .json({ mensagem: "Produto excluído com sucesso." });
    } else {
      return res.status(404).json({ mensagem: "Produto nao encontrado." });
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const produto_id = req.params.id;

  try {
    const produtoExiste = await knex("produtos")
      .where("id", produto_id)
      .first();

    if (!produtoExiste) {
      return res.status(404).json({ mensagem: "Produto não cadastrado" });
    }

    req.produto = produtoExiste;

    return res.status(200).json(req.produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarProdutos = async (req, res) => {
  try {
    const validaCategoria = await knex("categorias")
      .where({ id: req.query.categoria_id })
      .first();

    if (!validaCategoria) {
      return res
        .status(404)
        .json({ mensagem: "Categoria informada não encontrada!" });
    }

    if (req.query.categoria_id) {
      const produtos = await knex("produtos").where(
        "categoria_id",
        req.query.categoria_id
      );
      return res.status(200).json(produtos);
    }

    const produtos = await knex("produtos").orderBy("id", "asc");
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  excluirProduto,
  detalharProduto,
  cadastrarProduto,
  editarProduto,
  listarProdutos,
};
