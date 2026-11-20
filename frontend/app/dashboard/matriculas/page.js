import { getMyEnrollments } from '@/lib/api';
import { formatDate, formatProgress } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function MatriculasPage() {
  const enrollments = await getMyEnrollments();

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Acompanhamento</span>
          <h1>Minhas matrículas</h1>
          <p>Cursos vinculados ao colaborador autenticado.</p>
        </div>
      </div>

      {enrollments.length ? (
        <div className="grid">
          {enrollments.map((item) => (
            <article className="card" key={item.id_matricula}>
              <div className="page-heading">
                <div>
                  <h2>{item.curso.titulo}</h2>
                  <div className={`status ${item.situacao}`}>
                    {item.situacao}
                  </div>
                </div>
                <strong>{formatProgress(item.progresso)}</strong>
              </div>

              <div className="progress">
                <span style={{ width: `${Number(item.progresso || 0)}%` }} />
              </div>

              <div className="course-meta">
                <span>Matrícula: {formatDate(item.data_matricula)}</span>
                <span>Conclusão: {formatDate(item.data_conclusao)}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">Você ainda não possui matrículas.</div>
      )}
    </>
  );
}
