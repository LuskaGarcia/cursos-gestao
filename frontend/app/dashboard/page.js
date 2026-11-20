import Link from 'next/link';
import { getCourses, getMyEnrollments } from '@/lib/api';
import { verifySession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await verifySession();

  const [courses, enrollments] = await Promise.all([
    getCourses(),
    getMyEnrollments(),
  ]);

  const inProgress = enrollments.filter(
    (item) => item.situacao === 'EM_ANDAMENTO'
  ).length;

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Painel</span>
          <h1>Olá, {user.nome.split(' ')[0]}.</h1>
          <p>Resumo da sua capacitação e do catálogo disponível.</p>
        </div>

        <Link className="button primary" href="/dashboard/cursos">
          Ver catálogo
        </Link>
      </div>

      <section className="grid cards">
        <div className="card">
          <div className="metric">{courses.length}</div>
          <div className="muted">Cursos no catálogo</div>
        </div>
        <div className="card">
          <div className="metric">{enrollments.length}</div>
          <div className="muted">Minhas matrículas</div>
        </div>
        <div className="card">
          <div className="metric">{inProgress}</div>
          <div className="muted">Em andamento</div>
        </div>
      </section>
    </>
  );
}
