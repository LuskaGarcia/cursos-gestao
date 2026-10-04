const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const colaborador = await authService.register(req.validated.body);

    return res.status(201).json({
      mensagem: 'Colaborador cadastrado com sucesso.',
      colaborador,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.validated.body);

    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
