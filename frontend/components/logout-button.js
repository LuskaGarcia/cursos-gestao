import { logoutAction } from '@/app/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="button ghost small" type="submit">
        Sair
      </button>
    </form>
  );
}
