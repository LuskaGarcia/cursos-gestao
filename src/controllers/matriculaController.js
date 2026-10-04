const matriculaService = require('../services/matriculaService');

async function criar(req, res, next) {
  try {
    const { id_colaborador } = req.user;
    const { id_curso } = req.validated.body;

    const matricula = await matriculaService.matricular(
      id_colaborador,
      id_curso
    );

    return res.status(201).json({
      mensagem: 'Matrícula realizada com sucesso.',
      matricula,
    });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    const { id_colaborador } = req.user;
    const matriculas = await matriculaService.listarMinhas(id_colaborador);

    return res.status(200).json(matriculas);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  criar,
  listarMinhas,
};
