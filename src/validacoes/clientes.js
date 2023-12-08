const Joi = require("joi");

const cadastrarOuEditar = Joi.object({
  nome: Joi.string().empty().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome está vazio",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.email": "O email informado não é válido",
  }),
  cpf: Joi.string()
    .pattern(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/)
    .required()
    .messages({
      "any.required": "O campo CPF é obrigatório",
      "string.pattern.base": "O CPF informado não é válido",
    }),
  cep: Joi.string()
    .pattern(/^[0-9]{5}\-[0-9]{3}$/)
    .messages({
      "string.pattern.base": "O CEP informado não é válido",
    }),
  rua: Joi.string(),
  numero: Joi.number().integer().messages({
    "number.base": "O campo numero não é um numero válido",
  }),
  bairro: Joi.string().messages({
    "string.base": "O campo bairro informado não é válido",
  }),
  cidade: Joi.string().messages({
    "string.base": "O campo bairro informado não é válido",
  }),
  estado: Joi.string().messages({
    "string.base": "O campo bairro informado não é válido",
  }),
});

module.exports = { cadastrarOuEditar };
