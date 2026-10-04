const { ZodError } = require('zod');
const { Prisma } = require('@prisma/client');
const AppError = require('../utils/AppError');

function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      erro: 'Dados de entrada inválidos.',
      detalhes: error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const campos = Array.isArray(error.meta?.target)
        ? error.meta.target.join(', ')
        : String(error.meta?.target || 'campo único');

      return res.status(409).json({
        erro: `Já existe um registro com o mesmo valor em: ${campos}.`,
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        erro: 'Registro não encontrado.',
      });
    }

    if (error.code === 'P2003') {
      return res.status(409).json({
        erro: 'A operação viola um relacionamento entre registros.',
      });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      erro: 'Dados incompatíveis com o modelo do banco de dados.',
    });
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      erro: 'JSON inválido no corpo da requisição.',
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      erro: error.message,
      ...(error.details ? { detalhes: error.details } : {}),
    });
  }

  console.error(error);

  return res.status(500).json({
    erro: 'Erro interno do servidor.',
  });
}

module.exports = errorHandler;
