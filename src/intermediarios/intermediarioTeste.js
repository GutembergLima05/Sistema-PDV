const intermediarioTeste = async (req, res, next) => {
    console.log("Passou no intermediario teste!");

    next();
}

module.exports = {
    intermediarioTeste
}
