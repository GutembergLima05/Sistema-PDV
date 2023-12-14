const Joi = require("joi");

const cadastrarOuEditar = Joi.object({
  descricao: Joi.string().empty().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.empty": "O campo descricao está vazio",
  }),

  quantidade_estoque: Joi.number().min(0).integer().empty().required().messages({
    "number.base": "O campo quantidade_estoque precisa ser um número",
    "number.integer": "O campo quantidade_estoque precisa ser um número inteiro",
    "number.min": "O campo quantidade_estoque deve ser um número igual ou maior que zero.",
    "any.required": "O campo quantidade_estoque é obrigatório",
    "string.empty": "O campo quantidade_estoque esta vazio",
  }),

  valor: Joi.number().positive().empty().required().messages({ 
    "any.required": "O campo valor é obrigatório",
    "string.empty": "O campo valor esta vazio",
    "number.base": "O campo valor precisa ser um número",
    "number.positive": "o campo valor deve conter um número maior que zero."
  }),

  categoria_id: Joi.number().integer().empty().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "string.empty": "O campo categoria_id esta vazio",
    "number.base": "O campo categoria_id precisa ser um número",
    "number.integer": "O campo categoria_id precisa ser um número inteiro"
  })
}).unknown(true);


module.exports = { cadastrarOuEditar }