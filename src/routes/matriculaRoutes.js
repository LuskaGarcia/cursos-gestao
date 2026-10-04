const express = require('express');
const matriculaController = require('../controllers/matriculaController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createMatriculaSchema } = require('../schemas/matriculaSchemas');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validate(createMatriculaSchema),
  matriculaController.criar
);

router.get('/minhas', authMiddleware, matriculaController.listarMinhas);

module.exports = router;
