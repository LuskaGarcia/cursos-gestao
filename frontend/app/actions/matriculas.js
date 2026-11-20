'use server';

import { revalidatePath } from 'next/cache';
import { createEnrollment } from '@/lib/api';

export async function enrollAction(idCurso, _prevState, _formData) {
  const result = await createEnrollment(Number(idCurso));

  if (!result.ok) {
    return {
      erro:
        result.data?.erro ||
        result.data?.mensagem ||
        'Não foi possível realizar a matrícula.',
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/matriculas');
  revalidatePath(`/dashboard/cursos/${idCurso}`);

  return {
    sucesso: 'Matrícula realizada com sucesso.',
    erro: '',
  };
}
