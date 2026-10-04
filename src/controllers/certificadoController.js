const certificadoService = require('../services/certificadoService');

async function listar(req, res, next) {
  try {
    const certificados = await certificadoService.listar();
    return res.status(200).json(certificados);
  } catch (error) {
    return next(error);
  }
}

async function buscarPorIdOuCodigo(req, res, next) {
  try {
    const { identificador } = req.params;
    const certificado = await certificadoService.buscarPorIdOuCodigo(identificador);

    return res.status(200).json(certificado);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listar,
  buscarPorIdOuCodigo,
};
