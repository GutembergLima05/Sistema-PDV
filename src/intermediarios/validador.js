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

const verificaDadosExistentes = async (req, res) => {
  console.log(req.body);
  const campos = Object.entries(req.body);
  for (let indice of campos) {
    if (indice[0] === email || indice[0] === cpf) {
      const dados = await knex("usuarios").where(indice[0], indice[1]).first();
      if (dados) {
        return res.json(
          `O campo ${indice[0]} ja esta sendo usado por outro usuario`
        );
      }
    }
  }
  return res.json(res.json('Cliente cadastrado'));
};

async function buscaDadosExistentes(param) {
  const res = await knex("usuarios").where(param).first();

  // aqui
  const { email, nome } = req.body;

  const dados = await buscaDadosExistentes({ email, nome });

  if (dados !== undefined) {
    const array = Object.entries(dados);
    console.log(array);
    for (let campo of array) {
      if (campo[1] === email) {
        return res.json(`O ${campo[0]} ja esta sendo usado`);
      }
    }
  }
  console.log(dados);

  // fim
  return res;
}

module.exports = { validador, verificaDadosExistentes, buscaDadosExistentes };
