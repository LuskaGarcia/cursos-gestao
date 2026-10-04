const { z } = require('zod');

const createMatriculaSchema = z.object({
  id_curso: z.coerce.number().int().positive(),
});

module.exports = {
  createMatriculaSchema,
};
