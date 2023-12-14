const knex = require("../db/conexao");

const cadastrarPedido = async (req, res) => {
    const { observacao, cliente_id, pedidos_produtos } = req.body;
    try {
        return res.status(200).json({ mensagem: "dando bom até o memnto" });
    } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports = {
    cadastrarPedido
}