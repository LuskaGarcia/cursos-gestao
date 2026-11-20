import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import { getCourses } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <>
      <SiteHeader />
      <main className="container">
        <section className="hero">
          <span className="eyebrow">Capacitação corporativa</span>
          <h1>Aprenda, acompanhe e centralize sua evolução profissional.</h1>
          <p>
            Os cursos abaixo são carregados no servidor do Next.js diretamente
            da API Node.js. A resposta é revalidada a cada 60 segundos.
          </p>
          <div className="actions">
            <Link className="button primary" href="/login">
              Entrar
            </Link>
            <Link className="button ghost" href="/cadastro">
              Criar conta
            </Link>
          </div>
        </section>

        <section>
          <div className="page-heading">
            <div>
              <span className="eyebrow">Catálogo</span>
              <h1>Cursos disponíveis</h1>
            </div>
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
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">Nenhum curso cadastrado no momento.</div>
          )}
        </section>
      </main>
    </>
  );
}