const knex = require("../db/conexao");

const excluirProduto = async (req, res) => {
    const produtoID = req.params.id;
    const { id: usuarioID } = req.usuario;
    
    try {
        const resultadoExclusao = await knex("produtos")
            .where({
                id: produtoID,
                usuario_id: usuarioID
            })
            .del();

        if (resultadoExclusao > 0) {
            return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
        } else {
            return res.status(404).json({ mensagem: 'Nenhum produto encontrado para exclusão ou permissão negada.' });
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = { excluirProduto };
