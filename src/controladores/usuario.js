const knex = require('../db/connection');
const bcrypt = require('bcrypt');

const cadastrarUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {

    const emailValido = await knex('usuarios').where('email',email)
    if(emailValido[0]){
        res.status(400).json({ mensagem: "Email já cadastrado."})
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const novoUsuario = {
        nome,
        email,
        senha: senhaCriptografada
      };

    const dados = await knex('usuarios').insert(novoUsuario).returning('*')
    return res.status(201).json(dados);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarUser,
};
