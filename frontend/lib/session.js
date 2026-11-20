import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ApiError, getMe } from '@/lib/api';

const COOKIE_NAME = 'capacitacao_token';

export async function createSession(token) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    return await getMe();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login?erro=sessao-expirada');
    }

    throw error;
  }
});
