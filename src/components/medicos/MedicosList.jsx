'use client'; // Marca como Client Component

import DataTable from '@/components/shared/DataTable';
import { deleteMedico } from '@/services/medicoService'; // Importa a função de deletar

export default function MedicosList({ initialData }) {

    // Define as colunas aqui (ou receba via props)
    const colunasMedicos = [
        { key: 'nome', label: 'Nome' },
        { key: 'crm', label: 'CRM' },
        // Se o backend retorna o nome da especialidade direto, ok.
        // Se retornar objeto, precisaria tratar antes.
        { key: 'especialidade', label: 'Especialidade' },
        { key: 'email', label: 'Email' },
    ];

    // Esta função roda no navegador (Cliente)
    const handleDelete = async (id) => {
        // Chama o serviço que deleta na API
        await deleteMedico(id);
    };

    return (
        <DataTable
            initialData={initialData}
            columns={colunasMedicos}
            editPath="/dashboard/medicos/editar"
            onDelete={handleDelete} // Agora passamos uma função válida do cliente
        />
    );
}