const knex = require('../db/conexao');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const cadastrar = async (req, res) => {
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


const login = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status()
      .json({
        mensagem:
          "Para acessar este recurso, um token de autenticação válido deve ser enviado",
      });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, senhaJwt);

    const usuarioEncontrado = await knex("usuarios").where({ id }).first();

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const { senha, ...usuario } = usuarioEncontrado;
    req.usuario = usuario;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ mensagem: "Token inválido" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Token expirado" });
    }
    return res.status(500).json({ mensagem: "Token Erro interno do Servidor" });
  }
};

module.exports = {login, cadastrar};
