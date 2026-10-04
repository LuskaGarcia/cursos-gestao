const { z } = require('zod');

const cursoFields = {
  titulo: z.string().trim().min(3).max(100),
  conteudo_programatico: z.string().trim().min(3).max(500),
  area_conhecimento: z.string().trim().min(2).max(50),
  carga_horaria: z.coerce.number().int().positive().max(10000),
  descricao: z.string().trim().min(3).max(500),
};

const createCursoSchema = z.object(cursoFields);

const updateCursoSchema = z
  .object(cursoFields)
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo para atualização.',
  });

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

module.exports = {
  createCursoSchema,
  updateCursoSchema,
  idParamSchema,
};
