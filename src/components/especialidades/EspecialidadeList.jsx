'use client';

import DataTable from '@/components/shared/DataTable';
import { deleteEspecialidade } from '@/services/especialidadeService';

// Define as colunas
const colunasEspecialidade = [
    { key: 'nome', label: 'Nome' },
    // Adicione mais colunas se houver, ex: { key: 'descricao', label: 'Descrição' }
];

export default function EspecialidadeList({ initialData }) {

    const handleDelete = async (id) => {
        return deleteEspecialidade(id);
    };

    return (
        <DataTable
            initialData={initialData}
            columns={colunasEspecialidade}
            editPath="/dashboard/especialidades/editar"
            onDelete={handleDelete}
        />
    );
}