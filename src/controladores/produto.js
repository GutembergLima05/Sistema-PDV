const knex = require("../db/conexao");
const imagens = require("../arquivos/imagens");


const cadastrar = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  

  try {

    const categoriaValida = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoriaValida) {
      return res
        .status(404)
        .json({ mensagem: `Categoria informada inválida.` });
    }

    if(req.file){
      const {originalname, buffer, mimetype} = req.file
      let nome = originalname
      nome = originalname.replace(/\s+/g, '_');
      const imagem = await imagens.carregar(nome, buffer, mimetype)

      const cadastroProduto = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imagem.Location})
      .returning("*"); 
      return res.json(cadastroProduto);
    }

    const cadastroProduto = await knex("produtos")
      .insert({ descricao, quantidade_estoque, valor, categoria_id})
      .returning("*"); 
      return res.json(cadastroProduto);

    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  
  try {
    const produtoValido = await knex("produtos").where("id", id).first();
    const categoriaValida = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!produtoValido) {
      return res
        .status(404)
        .json({ mensagem: `Produto informado não encontrado.` });
    }

    if (!categoriaValida) {
      return res
        .status(404)
        .json({ mensagem: `Categoria informada não encontrada.` });
    }
    
    if(req.file){

      const {originalname, buffer, mimetype} = req.file

      // EXCLUI IMAGEM ANTIGA
      const arquivos = await imagens.s3.listObjects({
        Bucket: process.env.BUCKET
      }).promise()
      
      let imagemNome = []
      for(objeto of arquivos.Contents){
        if(produtoValido.produto_imagem.includes(objeto.key)){
          imagemNome.push(objeto.Key)
          break
        }
      }
      await imagens.s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: imagemNome[0]
      })

      // CARREGA IMAGEM NOVA
      let nome = originalname
      nome = originalname.replace(/\s+/g, '_');
      const imagem = await imagens.carregar(nome, buffer, mimetype)

      const atualizarProduto = await knex("produtos").where({id})
      .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imagem.Location})
      .returning("*"); 
      return res.status(200).json(atualizarProduto[0]);
    }

    const atualizarProduto = await knex("produtos")
        .where("id", id)
        .update({ descricao, quantidade_estoque, valor, categoria_id})
        .returning("*");
      return res.status(200).json(atualizarProduto[0]);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluir = async (req, res) => {
  const produtoID = req.params.id;  

  try {

    if (isNaN(produtoID)) {
      return res.status(400).json({ mensagem: "Id de produto invalido" });
    }
    const {produto_imagem} = await knex('produtos').where('id', produtoID).first()
    const produtoEstaViculadoPedido = await knex("pedidos_produtos").where({produto_id: produtoID}).first();
    
    if (produtoEstaViculadoPedido) {
      return res.status(400).json({mensagem:"Não é possivel deletar o produto pois ele esta vinculado ao pedido"})
    }

    const arquivos = await imagens.s3.listObjects({
      Bucket: process.env.BUCKET
    }).promise()
    
    let imagem = []
    for(objeto of arquivos.Contents){
      if(produto_imagem.includes(objeto.key)){
        imagem.push(objeto.Key)
        break
      }
    }
    await imagens.s3.deleteObject({
      Bucket: process.env.BUCKET,
      Key: imagem[0]
    })

    const resultadoExclusao = await knex("produtos")
      .where({ id: produtoID })
      .del();


    if (resultadoExclusao  > 0) {
      return res
        .status(200)
        .json({ mensagem: "Produto excluído com sucesso."});
    } else {
      return res.status(404).json({ mensagem: "Produto nao encontrado.", imagem });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalhar = async (req, res) => {
  const produto_id = req.params.id;

  try {
    const produtoExiste = await knex("produtos")
      .where("id", produto_id)
      .first();

    if (!produtoExiste) {
      return res.status(404).json({ mensagem: "Produto não cadastrado" });
    }

    req.produto = produtoExiste;
    return res.status(200).json(req.produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listar = async (req, res) => {
  try {
    if (req.query.categoria_id) {
      const validaCategoria = await knex("categorias").where({
        id: req.query.categoria_id,
      });

      if (validaCategoria.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Categoria informada não encontrada!" });
      }

      const produtos = await knex("produtos").where(
        "categoria_id",
        req.query.categoria_id
      );
      return res.status(200).json(produtos);
    }


    const produtos = await knex("produtos").orderBy("id", "asc");

    return res.status(200).json(produtos);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  excluir,
  detalhar,
  cadastrar,
  editar,
  listar,
};
