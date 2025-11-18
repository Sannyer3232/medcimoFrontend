'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importamos os serviços necessários
import { createEscala, updateEscala } from '@/services/escalaService';
import { getFuncionarios } from '@/services/funcionarioService'; // Apenas este é necessário

// Helper para formatar a data (o input 'date' precisa de YYYY-MM-DD)
const formatarDataParaInput = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toISOString().split('T')[0];
};

export default function EscalaForm({ initialData }) {
    const router = useRouter();

    // Lista de funcionários para o dropdown
    const [funcionarios, setFuncionarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dados do formulário
    const [formData, setFormData] = useState({
        data: initialData ? formatarDataParaInput(initialData.data) : '',
        turno: initialData ? initialData.turno : '',
        funcionarioId: initialData ? initialData.funcionarioId : '', // A API deve lidar com o ID
    });

    const isEditMode = !!initialData;

    // Efeito para carregar funcionários UMA VEZ
    useEffect(() => {
        async function carregarFuncionarios() {
            try {
                const listaFuncionarios = await getFuncionarios();

                // Ordena por nome
                listaFuncionarios.sort((a, b) => a.nome.localeCompare(b.nome));

                setFuncionarios(listaFuncionarios);
            } catch (error) {
                console.error("Erro ao carregar funcionários:", error);
                alert("Não foi possível carregar a lista de funcionários.");
            } finally {
                setIsLoading(false);
            }
        }
        carregarFuncionarios();
    }, []); // O array vazio [] garante que isso rode só uma vez

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Converte o ID do funcionário para número se for o caso
        const valorProcessado = id === 'funcionarioId' ? parseInt(value) : value;
        setFormData(prev => ({ ...prev, [id]: valorProcessado }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateEscala(initialData.id, formData);
            } else {
                await createEscala(formData);
            }
            alert('Escala salva com sucesso!');
            router.push('/dashboard/escalas');
            router.refresh();
        } catch (error) {
            console.error('Erro ao salvar escala:', error);
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form id="escala-form" onSubmit={handleSubmit}>

                <label htmlFor="funcionarioId">Profissional</label>
                <select
                    id="funcionarioId"
                    value={formData.funcionarioId}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                >
                    <option value="" disabled>
                        {isLoading ? "Carregando profissionais..." : "Selecione um profissional"}
                    </option>
                    {funcionarios.map(pessoa => (
                        // Agora a 'key' e o 'value' podem ser o 'pessoa.id'
                        <option key={pessoa.id} value={pessoa.id}>
                            {pessoa.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="data">Data</label>
                <input
                    type="date"
                    id="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="turno">Turno</label>
                <select
                    id="turno"
                    value={formData.turno}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Selecione um turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Plantão 12h">Plantão 12h</option>
                    <option value="Plantão 24h">Plantão 24h</option>
                </select>

                <div className="form-actions">
                    <button type="submit" className="btn">Salvar</button>
                    <Link href="/dashboard/escalas" className="btn" style={{ background: '#6c757d' }}>
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}