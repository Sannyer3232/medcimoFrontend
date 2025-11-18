import { api } from './apiHelper';

// Ajuste o endpoint se necessário (verifique se é /funcionarios ou /funcionario)
const endpoint = '/funcionarios';

// CORREÇÃO: Removemos as chaves { } dos argumentos.
// Agora aceita 'token' diretamente ou undefined.
export const getFuncionarios = (token) => {
  return api.get(endpoint, { token });
};

export const getFuncionarioById = (id, token) => {
  return api.get(`${endpoint}/${id}`, { token });
};

export const createFuncionario = (funcionarioData) => {
  return api.post(endpoint, funcionarioData);
};

export const updateFuncionario = (id, funcionarioData) => {
  return api.put(`${endpoint}/${id}`, funcionarioData);
};

export const deleteFuncionario = (id) => {
  return api.del(`${endpoint}/${id}`);
};