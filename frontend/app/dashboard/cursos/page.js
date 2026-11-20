import Link from 'next/link';
import { getCourses } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function CursosPage() {
  const courses = await getCourses();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h1>Cursos</h1>
          <p>Dados consultados no back-end Node.js.</p>
        </div>

        <Link className="button primary" href="/dashboard/cursos/novo">
          Novo curso
        </Link>
      </div>

      {courses.length ? (
        <div className="grid course-list">
          {courses.map((course) => (
            <article className="card" key={course.id_curso}>
              <h2>{course.titulo}</h2>
              <div className="course-meta">
                <span>{course.area_conhecimento}</span>
                <span>{course.carga_horaria}h</span>
              </div>
              <p className="muted">{course.descricao}</p>
              <Link
                className="button ghost small"
                href={`/dashboard/cursos/${course.id_curso}`}
              >
                Ver detalhes
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">Nenhum curso cadastrado.</div>
      )}
    </>
  );
}
