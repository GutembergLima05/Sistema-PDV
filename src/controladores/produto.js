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

const detalharProduto = async (req, res) => {

    const produto_id = req.params.id;

    if (isNaN(produto_id)) {
        return res.status(400).json({mensagem: "Id de produto invalido"})
    }

    try {

        const produtoExiste = await knex('produtos').where('id', produto_id).first();

        if (!produtoExiste) {
            return res.status(404).json({mensagem: "Produto não cadastrado"})
        }

        req.produto = produtoExiste;

        return res.status(200).json(req.produto)
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}

module.exports = { excluirProduto, detalharProduto };
