import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        Cursos Gestão
      </Link>

      <nav>
        <Link href="/">Cursos</Link>
        <Link href="/login">Entrar</Link>
        <Link className="button small" href="/cadastro">
          Cadastro
        </Link>
      </nav>
    </header>
  );
}
