'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createEspecialidade, updateEspecialidade } from '@/services/especialidadeService';

export default function EspecialidadeForm({ initialData }) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData || {
        nome: '',
    });

    const isEditMode = !!initialData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateEspecialidade(initialData.id, formData);
            } else {
                await createEspecialidade(formData);
            }
            alert('Especialidade salva com sucesso!');
            router.push('/dashboard/especialidades');
            router.refresh(); // Atualiza a lista na página anterior
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form id="especialidade-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome da Especialidade"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />

                <div className="form-actions">
                    <button type="submit" className="btn">Salvar</button>
                    <Link href="/dashboard/especialidades" className="btn" style={{ background: '#6c757d' }}>
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}