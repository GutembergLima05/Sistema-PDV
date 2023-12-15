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
  console.log(req.usuario.id)
  for (let indice of campos) {
    if (indice[0] === "email" || indice[0] === "cpf") {
      const dados = await knex(tabela[0]).where(indice[0], indice[1]).first();
      const id = Object.values(req.params)
      
      if (dados && tabela[0] === "usuarios" && tabela[1] === "atualizar" && dados.id !== req.usuario.id) {       
        return res.status(409).json({ mensagem: `O ${indice[0]} informado ja esta sendo usado` });
      } else if (dados && tabela[0] === "clientes" && Number(id) != dados.id) {
        return res.status(409).json({ mensagem: `O ${indice[0]} informado ja esta sendo usado por outro cliente` });
      } else if(dados && tabela[0] === "usuarios" && tabela[1] === "cadastrar" && dados.id) {       
        return res.status(409).json({ mensagem: `O ${indice[0]} informado ja esta sendo usado` });
      }
      console.log(id)
    }
  }
  next();
};

module.exports = { validador, verificaDadosExistentes };
