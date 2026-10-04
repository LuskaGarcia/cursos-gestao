const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

function authMiddleware(req, _res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError('Token de autenticação não informado.', 401));
  }

  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Formato do token inválido. Use: Bearer <token>.', 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.id_colaborador) {
      return next(new AppError('Token inválido.', 401));
    }

    req.user = {
      id_colaborador: Number(payload.id_colaborador),
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado.', 401));
    }

    return next(new AppError('Token inválido.', 401));
  }
}

module.exports = authMiddleware;
