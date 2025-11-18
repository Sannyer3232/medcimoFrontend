// components/funcionarios/FuncionarioList.jsx
'use client';

import DataTable from '@/components/shared/DataTable';
import { deleteFuncionario } from '@/services/funcionarioService';

// Define as colunas aqui, pois são estáticas
const colunasFuncionarios = [
  { key: 'nome', label: 'Nome' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'email', label: 'Email' },
  { key: 'telefone', label: 'Telefone' },
];

export default function FuncionarioList({ initialData }) {
  
  // Esta é a função que o DataTable vai chamar.
  // Ela sabe qual serviço de exclusão usar!
  const handleDelete = async (id) => {
    return deleteFuncionario(id);
  };

  return (
    <DataTable
      initialData={initialData}
      columns={colunasFuncionarios}
      editPath="/dashboard/funcionarios/editar"
      onDelete={handleDelete} // Passa a função de exclusão
    />
  );
}