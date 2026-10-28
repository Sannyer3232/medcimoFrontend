import { API_BASE_URL } from './apiConfig';
import { parseCookies } from 'nookies';

async function apiFetch(endpoint, options = {}) {
  // Extraímos o token das opções, se ele existir (passado pelo servidor)
  const { body, token: passedToken, ...restOptions } = options;
  const isGet = (options.method || 'GET').toUpperCase() === 'GET';
  
  const cacheOption = options.cache || (isGet ? 'no-store' : 'default');

  // Lógica de Token: Prioridade para o token passado, senão busca no cookie (cliente)
  let token = passedToken;
  if (!token) {
    const cookies = parseCookies();
    token = cookies['medcimo.token'];
  }

  const headers = {
    'Content-Type': 'application/json',
    ...restOptions.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
    cache: cacheOption,
  });

  if (!response.ok) {
    // Tenta ler o erro do backend se houver
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.status === 204 ? null : response.json();
}

export const api = {
  get: (endpoint, options) => apiFetch(endpoint, { method: 'GET', ...options }),
  post: (endpoint, data, options) => apiFetch(endpoint, { method: 'POST', body: data, ...options }),
  put: (endpoint, data, options) => apiFetch(endpoint, { method: 'PUT', body: data, ...options }),
  del: (endpoint, options) => apiFetch(endpoint, { method: 'DELETE', ...options }),
};