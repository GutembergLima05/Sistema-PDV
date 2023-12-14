const Joi = require("joi");

const cadastrarOuEditar = Joi.object({
  observacao: Joi.string().empty().messages({
    "any.required": "O campo observacao é obrigatório",
    "string.empty": "O campo observacao está vazio",
  }),

  cliente_id: Joi.number().integer().empty().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "string.empty": "O campo cliente_id está vazio",
    "number.base": "O campo cliente_id precisa ser um número",
    "number.integer": "O campo cliente_id precisa ser um número inteiro"
  }),

  pedido_produtos: Joi.array().items(Joi.object({
    produto_id: Joi.number().integer().empty().required().messages({
      "any.required": "O campo produto_id é obrigatório",
      "string.empty": "O campo produto_id está vazio",
      "number.base": "O campo produto_id precisa ser um número",
      "number.integer": "O campo produto_id precisa ser um número inteiro"
    }),

    quantidade_produto: Joi.number().min(0).integer().empty().required().messages({
      "number.base": "O campo quantidade_produto precisa ser um número",
      "number.integer": "O campo quantidade_produto precisa ser um número inteiro",
      "number.min": "O campo quantidade_produto deve ser um número igual ou maior que zero.",
      "any.required": "O campo quantidade_produto é obrigatório",
      "string.empty": "O campo quantidade_produto está vazio",
    })
  })).required()
}).unknown(true);

module.exports = { cadastrarOuEditar };
