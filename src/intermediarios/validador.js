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


const verificaDadosExistentes = async (req, res, next) => {
  console.log(req.body);
  const campos = Object.entries(req.body);
  for (let indice of campos) {
    if (indice[0] === "email" || indice[0] === "cpf") {
      const dados = await knex("usuarios").where(indice[0], indice[1]).first();
      if (dados && dados.id !== req.usuario.id) {
        return res.json(
          `O ${indice[0]} informado ja esta sendo usado`
        );
      }
    }
  }
  next()
};

module.exports = { validador, verificaDadosExistentes};
