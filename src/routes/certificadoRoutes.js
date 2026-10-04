const express = require('express');
const certificadoController = require('../controllers/certificadoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, certificadoController.listar);
router.get(
  '/:identificador',
  authMiddleware,
  certificadoController.buscarPorIdOuCodigo
);

module.exports = router;
