const knex = require("../db/conexao");

const cadastrar = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const cadastroCliente = await knex("clientes")
      .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .returning("*");
    return res.status(201).json(cadastroCliente[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const detalhar = async (req, res) => {
  const { id } = req.params;
  try {

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "Id de produto invalido" });
    }

    const cliente = await knex("clientes").where("id", id).first();
    
    if (!cliente) {
      return res.status(404).json({ mensagem: `Cliente nao encontrado` });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const buscarCliente = await knex("clientes").where("id", id).first();

    if (!buscarCliente) {
      return res
        .status(404)
        .json({ mensagem: "Nenhum cliente encontrado com o ID informado" });
    }

    const alteracaoCliente = await knex("clientes")
      .where({ id })
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .returning("*");

    return res.status(200).json(alteracaoCliente[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const listar = async (req, res) => {
  try {
    const clientes = await knex("clientes").orderBy("id", "asc");

    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  cadastrar,
  detalhar,
  editar,
  listar,
};
