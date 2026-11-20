import 'server-only';

import { cookies } from 'next/headers';

const API_URL = process.env.CAPACITACAO_API_URL;

if (!API_URL) {
  throw new Error(
    'Variável CAPACITACAO_API_URL não configurada. Crie o arquivo .env.local no projeto Next.js.'
  );
}

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('capacitacao_token')?.value ?? null;
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { mensagem: text };
  }
}

async function request(
  path,
  {
    method = 'GET',
    body,
    auth = false,
    cache = 'no-store',
    next,
    throwOnError = true,
  } = {}
) {
  const headers = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = await getAuthToken();

    if (!token) {
      throw new ApiError('Sessão não encontrada. Faça login novamente.', 401);
    }

    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
      next,
    });
  } catch (error) {
    throw new ApiError(
      'Não foi possível conectar à API de capacitação.',
      503,
      { causa: error.message }
    );
  }

  const data = await parseResponse(response);

  if (!response.ok && throwOnError) {
    const message =
      data?.erro ||
      data?.mensagem ||
      `A API retornou status ${response.status} para ${path}.`;

    throw new ApiError(message, response.status, data);
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export async function loginApi(email, senha) {
  return request('/auth/login', {
    method: 'POST',
    body: { email, senha },
    throwOnError: false,
  });
}

export async function registerApi(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: payload,
    throwOnError: false,
  });
}

export async function getMe() {
  const result = await request('/auth/me', {
    auth: true,
    cache: 'no-store',
  });

  return result.data.colaborador;
}

export async function getCourses() {
  const result = await request('/cursos', {
    next: { revalidate: 60 },
  });

  return result.data;
}

export async function getCourse(id) {
  const result = await request(`/cursos/${id}`, {
    cache: 'no-store',
  });

  return result.data;
}

export async function getMyEnrollments() {
  const result = await request('/matriculas/minhas', {
    auth: true,
    cache: 'no-store',
  });

  return result.data;
}

export async function getCertificates() {
  const result = await request('/certificados', {
    auth: true,
    cache: 'no-store',
  });

  return result.data;
}

export async function createCourse(payload) {
  return request('/cursos', {
    method: 'POST',
    auth: true,
    body: payload,
    throwOnError: false,
  });
}

export async function updateCourse(id, payload) {
  return request(`/cursos/${id}`, {
    method: 'PUT',
    auth: true,
    body: payload,
    throwOnError: false,
  });
}

export async function deleteCourse(id) {
  return request(`/cursos/${id}`, {
    method: 'DELETE',
    auth: true,
    throwOnError: false,
  });
}

export async function createEnrollment(idCurso) {
  return request('/matriculas', {
    method: 'POST',
    auth: true,
    body: { id_curso: idCurso },
    throwOnError: false,
  });
}
