import { API_BASE_URL } from './apiConfig';
import { parseCookies } from 'nookies';

async function apiFetch(endpoint, options = {}) {
  const { body, token, ...restOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...restOptions.headers,
  };

  // CLIENT
  if (typeof window !== 'undefined') {
    const cookies = parseCookies();
    const clientToken = cookies['medcimo.token'];
    if (clientToken) {
      headers['Authorization'] = `Bearer ${clientToken}`;
    }
  }

  // SERVER
  if (typeof window === 'undefined' && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers,
    body: body ? JSON.stringify(body) : null,
    cache: options.cache || 'no-store',
  });

  // ... dentro da função apiFetch

  if (!response.ok) {
    // Loga o status do erro (Ex: 401, 403, 500)
    console.error(`API Error: ${response.status} ${response.statusText}`);

    // Tenta ler o corpo do erro como texto
    const errorBody = await response.text();
    console.error('API Response Body:', errorBody);

    let errorMessage = 'Erro na requisição';

    // Tenta parsear o texto como JSON para pegar uma 'message'
    try {
      const errJson = JSON.parse(errorBody);
      if (errJson.message) {
        errorMessage = errJson.message;
      }
    } catch (e) {
      // Se não for JSON, usa os primeiros 150 caracteres do erro
      if (errorBody) {
        errorMessage = errorBody.substring(0, 150) + '...';
      }
    }

    // Joga o erro com a mensagem mais detalhada
    throw new Error(errorMessage);
  }

  return response.status === 204 ? null : response.json();

}

export const api = {
  get: (endpoint, options) => apiFetch(endpoint, { method: 'GET', ...options }),
  post: (endpoint, data, options) =>
      apiFetch(endpoint, { method: 'POST', body: data, ...options }),
  put: (endpoint, data, options) =>
      apiFetch(endpoint, { method: 'PUT', body: data, ...options }),
  del: (endpoint, options) => apiFetch(endpoint, { method: 'DELETE', ...options }),
};
