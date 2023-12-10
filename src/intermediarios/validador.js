const knex = require("../db/conexao");

// Função de verificação dos dados no corpo
const validador = (requisicao) => async (req, res, next) => {
  try {
    await requisicao.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
  next();
};

const verificaDadosExistentes = (tabela) => async (req, res, next) => {
  const campos = Object.entries(req.body);
  for (let indice of campos) {
    if (indice[0] === "email" || indice[0] === "cpf") {
      const dados = await knex(tabela).where(indice[0], indice[1]).first();
      const id = Object.values(req.params)
      if (dados && tabela === "usuarios" && dados.id !== req.usuario.id) {
        return res.json({ mensagem: `O ${indice[0]} informado ja esta sendo usado` });
      } else if (dados && tabela === "clientes" && Number(id) != dados.id) {
        return res.json({ mensagem: `O ${indice[0]} informado ja esta sendo usado por outro cliente` });
      }
    }
  }
  next();
};

module.exports = { validador, verificaDadosExistentes };
