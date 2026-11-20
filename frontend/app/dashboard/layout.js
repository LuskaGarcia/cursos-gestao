import Link from 'next/link';
import LogoutButton from '@/components/logout-button';
import { verifySession } from '@/lib/session';

export default async function DashboardLayout({ children }) {
  const user = await verifySession();

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <Link className="brand" href="/dashboard">
            Cursos Gestão
          </Link>
          <nav>
            <Link href="/dashboard/cursos">Cursos</Link>
            <Link href="/dashboard/matriculas">Minhas matrículas</Link>
            <Link href="/dashboard/certificados">Certificados</Link>
          </nav>
        </div>

        <div className="dashboard-user">
          <div>
            <strong>{user.nome}</strong>
            <small>{user.email}</small>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}
