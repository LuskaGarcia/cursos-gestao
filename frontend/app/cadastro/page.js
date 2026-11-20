import Link from 'next/link';
import RegisterForm from '@/components/register-form';

export const metadata = {
  title: 'Cadastro',
};

export default function CadastroPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel wide">
        <Link className="back-link" href="/">
          ← Voltar
        </Link>
        <span className="eyebrow">Novo colaborador</span>
        <h1>Criar conta</h1>
        <p>O cadastro utiliza a mesma API e as mesmas validações da Etapa 1.</p>

        <RegisterForm />

        <p className="auth-footer">
          Já possui conta? <Link href="/login">Entrar</Link>.
        </p>
      </section>
    </main>
  );
}
