function validate(schema, source = 'body') {
  return (req, _res, next) => {
    try {
      req.validated = req.validated || {};
      req.validated[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validate;
