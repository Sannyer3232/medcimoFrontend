import { api } from './apiHelper';

const endpoint = '/especialidades';

// ALTERADO: Aceita token opcional
export const getEspecialidades = (token) => {
    return api.get(endpoint, { token });
};

// ALTERADO: Aceita token opcional
export const getEspecialidadeById = (id, token) => {
    return api.get(`${endpoint}/${id}`, { token });
};

export const createEspecialidade = (data) => {
    return api.post(endpoint, data);
};

export const updateEspecialidade = (id, data) => {
    return api.put(`${endpoint}/${id}`, data);
};

export const deleteEspecialidade = (id) => {
    return api.del(`${endpoint}/${id}`);
};