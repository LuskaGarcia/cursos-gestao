const express = require('express');
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  createCursoSchema,
  updateCursoSchema,
  idParamSchema,
} = require('../schemas/cursoSchemas');

const router = express.Router();

router.get('/', cursoController.listar);
router.get('/:id', validate(idParamSchema, 'params'), cursoController.buscarPorId);

router.post(
  '/',
  authMiddleware,
  validate(createCursoSchema),
  cursoController.criar
);

router.put(
  '/:id',
  authMiddleware,
  validate(idParamSchema, 'params'),
  validate(updateCursoSchema),
  cursoController.atualizar
);

router.delete(
  '/:id',
  authMiddleware,
  validate(idParamSchema, 'params'),
  cursoController.remover
);

module.exports = router;
