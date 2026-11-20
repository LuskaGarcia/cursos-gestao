'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from '@/lib/api';

function buildPayload(formData) {
  return {
    titulo: String(formData.get('titulo') || '').trim(),
    conteudo_programatico: String(
      formData.get('conteudo_programatico') || ''
    ).trim(),
    area_conhecimento: String(
      formData.get('area_conhecimento') || ''
    ).trim(),
    carga_horaria: Number(formData.get('carga_horaria')),
    descricao: String(formData.get('descricao') || '').trim(),
  };
}

function actionError(result, fallback) {
  return {
    erro: result.data?.erro || result.data?.mensagem || fallback,
    detalhes: result.data?.detalhes || [],
  };
}

export async function createCourseAction(_prevState, formData) {
  const result = await createCourse(buildPayload(formData));

  if (!result.ok) {
    return actionError(result, 'Não foi possível criar o curso.');
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/cursos');
  redirect(`/dashboard/cursos/${result.data.curso.id_curso}`);
}

export async function updateCourseAction(id, _prevState, formData) {
  const result = await updateCourse(id, buildPayload(formData));

  if (!result.ok) {
    return actionError(result, 'Não foi possível atualizar o curso.');
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/cursos');
  revalidatePath(`/dashboard/cursos/${id}`);
  redirect(`/dashboard/cursos/${id}`);
}

export async function deleteCourseAction(id) {
  const result = await deleteCourse(id);

  if (!result.ok) {
    redirect(
      `/dashboard/cursos/${id}?erro=${encodeURIComponent(
        result.data?.erro || 'Não foi possível excluir o curso.'
      )}`
    );
  }

  revalidatePath('/');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/cursos');
  redirect('/dashboard/cursos');
}
