import { api } from './apiHelper';

const endpoint = '/medico';

// Alterado: aceita o token como parâmetro opcional
export const getMedicos = (token) => {
  // Passamos o token nas opções do apiHelper
  return api.get(endpoint, { token });
};

// Alterado: aceita o token aqui também
export const getMedicoById = (id, token) => {
  return api.get(`${endpoint}/${id}`, { token });
};

// As funções de escrita (POST, PUT, DELETE) geralmente rodam no CLIENTE (browser),
// onde o apiHelper pega o cookie sozinho. Mas não faz mal deixar preparado.
export const createMedico = (medicoData) => {
  return api.post(endpoint, medicoData);
};

export const updateMedico = (id, medicoData) => {
  return api.put(`${endpoint}/${id}`, medicoData);
};

export const deleteMedico = (id) => {
  return api.del(`${endpoint}/${id}`);
};

export const getEspecialidades = (token) => {
  return api.get('/especialidades', { token });
};