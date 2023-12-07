const joi = require("joi");

const cadastroOuAtualizacao = joi.object({
  nome: joi.string().empty().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome esta vazio",
  }),

  email: joi.string().empty().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email esta vazio",
  }),

  senha: joi.string().empty().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha esta vazio",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
}).unknown(true);

const login = joi.object({
  email: joi.string().empty().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email esta vazio",
  }),

  senha: joi.string().empty().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.empty": "O campo senha esta vazio",
    "string.min": "A senha precisa conter, no mínimo, 5 caracteres",
  }),
}).unknown(true);

module.exports = { cadastroOuAtualizacao, login };
