const knex = require("../db/conexao");

const cadastrar = async (req, res) => {
  try {
    const cadastrar = await knex("clientes").insert(req.body).returning("*");
    return res.status(201).json(cadastrar);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const detalhar = async (req, res) => {
    const {id} = req.params
    try {
        const cliente = await knex('clientes').where('id', id).first();
        return res.status(200).json(cliente)
    } catch (error) {
        return  res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
module.exports = {cadastrar, detalhar}