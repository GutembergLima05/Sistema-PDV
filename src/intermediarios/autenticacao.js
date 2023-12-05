const knex = require("../db/conexao");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHA_JWT;

const validarLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  
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
    if (!authorization) {
      return res.status(400).json({
        mensagem:
          "Para acessar este recurso, um token de autenticação válido deve ser enviado",
      });
    }
  }
};

module.exports = validarLogin;
