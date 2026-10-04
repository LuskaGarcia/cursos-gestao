const cursoService = require('../services/cursoService');

async function listar(req, res, next) {
  try {
    const cursos = await cursoService.listar();
    return res.status(200).json(cursos);
  } catch (error) {
    return next(error);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const { id } = req.validated.params;
    const curso = await cursoService.buscarPorId(id);

    return res.status(200).json(curso);
  } catch (error) {
    return next(error);
  }
}

async function criar(req, res, next) {
  try {
    const curso = await cursoService.criar(req.validated.body);

    return res.status(201).json({
      mensagem: 'Curso criado com sucesso.',
      curso,
    });
  } catch (error) {
    return next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const { id } = req.validated.params;
    const curso = await cursoService.atualizar(id, req.validated.body);

    return res.status(200).json({
      mensagem: 'Curso atualizado com sucesso.',
      curso,
    });
  } catch (error) {
    return next(error);
  }
}

async function remover(req, res, next) {
  try {
    const { id } = req.validated.params;
    await cursoService.remover(id);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
