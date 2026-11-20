import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnrollmentButton from '@/components/enrollment-button';
import { deleteCourseAction } from '@/app/actions/cursos';
import { ApiError, getCourse } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function CursoDetalhePage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;

  let course;

  try {
    course = await getCourse(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const deleteAction = deleteCourseAction.bind(null, id);

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{course.area_conhecimento}</span>
          <h1>{course.titulo}</h1>
          <p>{course.descricao}</p>
        </div>

        <div className="inline-actions">
          <Link
            className="button ghost"
            href={`/dashboard/cursos/${course.id_curso}/editar`}
          >
            Editar
          </Link>
          <form action={deleteAction}>
            <button className="button danger" type="submit">
              Excluir
            </button>
          </form>
        </div>
      </div>

      {query?.erro ? <p className="notice error">{query.erro}</p> : null}

      <section className="grid cards">
        <div className="card">
          <h3>Carga horária</h3>
          <div className="metric">{course.carga_horaria}h</div>
        </div>
        <div className="card">
          <h3>Matrículas</h3>
          <div className="metric">{course.matriculas?.length ?? 0}</div>
        </div>
        <div className="card">
          <h3>ID</h3>
          <div className="metric">#{course.id_curso}</div>
        </div>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Conteúdo programático</h2>
        <p>{course.conteudo_programatico}</p>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2>Matrícula</h2>
        <p className="muted">
          A matrícula utiliza o id do colaborador extraído do JWT no back-end.
        </p>
        <EnrollmentButton courseId={course.id_curso} />
      </section>
    </>
  );
}
