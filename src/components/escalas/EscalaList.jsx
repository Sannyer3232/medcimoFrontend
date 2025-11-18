'use client';

import DataTable from '@/components/shared/DataTable';
import { deleteEscala } from '@/services/escalaService';

// Define as colunas
// Assumindo que sua API /api/escalas retorna o nome do funcionário
const colunasEscala = [
    { key: 'funcionario', label: 'Profissional' }, // Confirme o nome deste campo
    { key: 'data', label: 'Data' },
    { key: 'turno', label: 'Turno' },
];

export default function EscalaList({ initialData }) {

    const handleDelete = async (id) => {
        return deleteEscala(id);
    };

    // Precisamos formatar os dados se a API retornar um nome de funcionário aninhado
    // Vou assumir que sua API retorna 'funcionarioNome' no objeto principal por enquanto.
    const dadosFormatados = initialData.map(item => ({
        ...item,
        // Formata a data para DD/MM/YYYY (Opcional, mas melhora a leitura)
        data: new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }));

    return (
        <DataTable
            initialData={dadosFormatados}
            columns={colunasEscala}
            editPath="/dashboard/escalas/editar"
            onDelete={handleDelete}
        />
    );
}