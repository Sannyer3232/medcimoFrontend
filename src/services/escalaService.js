import { api } from './apiHelper';

const endpoint = '/escala';

// Atualizado: recebe token opcional
export const getEscalas = (token) => {
    return api.get(endpoint, { token });
};

// Atualizado: recebe token opcional
export const getEscalaById = (id, token) => {
    return api.get(`${endpoint}/${id}`, { token });
};

export const createEscala = (data) => {
    return api.post(endpoint, data);
};

export const updateEscala = (id, data) => {
    return api.put(`${endpoint}/${id}`, data);
};

export const deleteEscala = (id) => {
    return api.del(`${endpoint}/${id}`);
};