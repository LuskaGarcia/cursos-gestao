import Link from 'next/link';
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

      <div className="grid enrollment-help">
        <section className="card" aria-labelledby="enrollment-faq-title">
          <h2 id="enrollment-faq-title">Perguntas frequentes</h2>

          <details>
            <summary>Como faço minha matrícula?</summary>
            <p>
              Acesse <Link href="/dashboard/cursos">Cursos</Link>, abra o curso
              desejado e use o botão de matrícula na página do curso.
            </p>
          </details>

          <details>
            <summary>Como acompanho meu progresso?</summary>
            <p>
              Em Minhas matrículas, cada curso mostra a situação da matrícula,
              o percentual de progresso e a data de conclusão, quando disponível.
            </p>
          </details>

          <details>
            <summary>Onde encontro meus certificados?</summary>
            <p>
              Acesse <Link href="/dashboard/certificados">Certificados</Link>{' '}
              no menu para consultar os documentos já emitidos.
            </p>
          </details>
        </section>

        <section className="card" aria-labelledby="enrollment-contact-title">
          <h2 id="enrollment-contact-title">Contato</h2>
          <span className="enrollment-contact-email">matriculas@cursosgestao.com</span>
        </section>
      </div>
    </>
  );
}
