const knex = require("../db/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.SENHA_JWT;

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const cadastrar = await knex("usuarios").insert(novoUsuario).returning("*");
    const { senha: _, ...usuarioCadastrado } = cadastrar[0];
    return res.status(201).json(usuarioCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where("email", email).first();

    if (!usuario) {
      return res.status(400).json({ mensagem: `Usuário inválido.` });
    }

    const { senha: senhaUsuario, ...usuarioLogado } = usuario;

    const validarSenha = await bcrypt.compare(senha, senhaUsuario);

    if (!validarSenha) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: "2h" });

    return res.status(200).json({ usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Usuario nao autenticado.",
    });
  }
};

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id: usuarioID } = req.usuario;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const atualizacao = await knex("usuarios")
      .where("id", usuarioID)
      .update({ nome, email, senha: senhaCriptografada })
      .returning("*");
    const { senha: _, ...usuarioAtualizado } = atualizacao[0];
    return res.status(200).json(usuarioAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarCategoria = async (req, res) => {
  try {
    const categorias = await knex("categorias");
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
};
module.exports = {
  login,
  cadastrar,
  detalharUsuario,
  editarUsuario,
  listarCategoria,
};
