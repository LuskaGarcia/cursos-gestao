import CourseForm from '@/components/course-form';
import { createCourseAction } from '@/app/actions/cursos';

export const metadata = {
  title: 'Novo curso',
};

export default function NovoCursoPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Administração</span>
          <h1>Novo curso</h1>
          <p>O formulário envia os dados por Server Action.</p>
        </div>
      </div>

      <section className="card">
        <CourseForm action={createCourseAction} submitLabel="Criar curso" />
      </section>
    </>
  );
}
