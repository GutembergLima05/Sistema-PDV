// Função de verificação dos dados no corpo
const validador = dados => async (req, res, next) => {
	try {
		await dados.validateAsync(req.body)
		next()
	} catch (error) {
		return res.status(400).json({ mensagem: error.message })
	}
}

module.exports = validador
