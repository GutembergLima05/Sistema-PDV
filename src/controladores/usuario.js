const knex = require("../db/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHA_JWT;

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailValido = await knex("usuarios").where("email", email);
    if (emailValido[0]) {
      res.status(400).json({ mensagem: "Email já cadastrado." });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const dados = await knex("usuarios").insert(novoUsuario).returning("*");
    return res.status(201).json(dados);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email ou senha inválida" });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: "8h" });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(500).json({ menssagem: "Erro interno do servidor" });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

module.exports = { login, cadastrar, detalharUsuario };
