import { notFound } from 'next/navigation';
import CourseForm from '@/components/course-form';
import { updateCourseAction } from '@/app/actions/cursos';
import { ApiError, getCourse } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function EditarCursoPage({ params }) {
  const { id } = await params;

  let course;

  try {
    course = await getCourse(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const action = updateCourseAction.bind(null, id);

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Administração</span>
          <h1>Editar curso</h1>
          <p>{course.titulo}</p>
        </div>
      </div>

      <section className="card">
        <CourseForm
          action={action}
          course={course}
          submitLabel="Salvar alterações"
        />
      </section>
    </>
  );
}
