// components/forms/MedicoForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importamos os serviços centralizados
import { createMedico, updateMedico } from '@/services/medicoService';
import { getEspecialidades } from '@/services/especialidadeService';

export default function MedicoForm({ initialData }) {
    const router = useRouter();
    const isEditMode = !!initialData;

    // Estado para a lista de especialidades
    const [especialidades, setEspecialidades] = useState([]);

    // Estado para o ID da especialidade selecionada
    const [selectedEspecialidadeId, setSelectedEspecialidadeId] = useState('');

    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: '',
        crm: '',
        email: '',
        telefone: '',
        senha: '', // Adicionado campo de senha
        permissao: 'ROLE_MEDICO', // Define fixo como Médico
        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
        },
    });

    // 1. Carrega as especialidades usando o Service
    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                // O service usa o apiHelper, que já trata o token se estiver no cliente
                const data = await getEspecialidades();
                setEspecialidades(data);
            } catch (error) {
                console.error("Erro ao carregar especialidades:", error);
                alert("Erro ao carregar lista de especialidades.");
            }
        };
        fetchEspecialidades();
    }, []);

    // 2. Preenche o formulário se for EDIÇÃO
    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                ...initialData,
                senha: '', // Senha sempre vazia na edição por segurança
                permissao: 'ROLE_MEDICO', // Garante a role
                endereco: initialData.endereco || {
                    rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: ''
                }
            });
        }
    }, [isEditMode, initialData]);

    // 3. Sincroniza o ID da especialidade quando a lista carrega (Modo Edição)
    useEffect(() => {
        if (isEditMode && initialData && especialidades.length > 0) {
            // Se o backend retorna o nome da especialidade (string), achamos o ID
            // Se o backend já retornasse o ID, seria mais fácil, mas mantivemos a lógica
            const especialidadeEncontrada = especialidades.find(
                esp => esp.nome === initialData.especialidade
            );

            if (especialidadeEncontrada) {
                setSelectedEspecialidadeId(especialidadeEncontrada.id.toString());
            }
        }
    }, [isEditMode, initialData, especialidades]);


    // Handlers
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleEnderecoChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            endereco: { ...prev.endereco, [id]: value }
        }));
    };

    const handleEspecialidadeChange = (e) => {
        setSelectedEspecialidadeId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Prepara o objeto para envio
            const dataToSend = {
                ...formData,
                cargo: "Médico",
                departamento: "Clínico",
                especialidade: parseInt(selectedEspecialidadeId), // Envia o ID
            };

            // Remove a senha se estiver vazia na edição
            if (isEditMode && !dataToSend.senha) {
                delete dataToSend.senha;
            }

            if (isEditMode) {
                await updateMedico(initialData.id, dataToSend);
            } else {
                await createMedico(dataToSend);
            }

            alert('Médico salvo com sucesso!');
            router.push('/dashboard/medicos');

        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <form id="medico-form" onSubmit={handleSubmit}>
                <h3>Dados do Médico</h3>

                {/* Inputs Pessoais */}
                <input
                    type="text" id="nome" placeholder="Nome Completo"
                    value={formData.nome} onChange={handleChange} required
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text" id="crm" placeholder="CRM"
                        value={formData.crm} onChange={handleChange} required
                        style={{ flex: 1 }}
                    />

                    <select
                        id="especialidade"
                        value={selectedEspecialidadeId}
                        onChange={handleEspecialidadeChange}
                        required
                        style={{ flex: 1 }}
                    >
                        <option value="" disabled>Selecione Especialidade</option>
                        {especialidades.map(esp => (
                            <option key={esp.id} value={esp.id}>
                                {esp.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="email" id="email" placeholder="Email"
                    value={formData.email} onChange={handleChange} required
                />

                {/* Campo de Senha (Novo) */}
                <input
                    type="password"
                    id="senha"
                    placeholder={isEditMode ? "Nova Senha (deixe em branco para manter)" : "Senha *"}
                    value={formData.senha}
                    onChange={handleChange}
                    required={!isEditMode} // Obrigatório apenas ao criar
                />

                <input
                    type="text" id="telefone" placeholder="Telefone"
                    value={formData.telefone} onChange={handleChange} required
                />

                {/* Fieldset de Endereço */}
                <fieldset>
                    <legend>Endereço</legend>
                    <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
                        <input
                            type="text" id="rua" placeholder="Rua"
                            value={formData.endereco.rua} onChange={handleEnderecoChange} required
                        />
                        <input
                            type="text" id="numero" placeholder="Nº"
                            value={formData.endereco.numero} onChange={handleEnderecoChange} required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                            type="text" id="bairro" placeholder="Bairro"
                            value={formData.endereco.bairro} onChange={handleEnderecoChange} required
                        />
                        <input
                            type="text" id="cep" placeholder="CEP"
                            value={formData.endereco.cep} onChange={handleEnderecoChange} required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
                        <input
                            type="text" id="cidade" placeholder="Cidade"
                            value={formData.endereco.cidade} onChange={handleEnderecoChange} required
                        />
                        <input
                            type="text" id="estado" placeholder="UF"
                            value={formData.endereco.estado} onChange={handleEnderecoChange} required
                        />
                    </div>
                </fieldset>

                {/* Ações */}
                <div className="form-actions">
                    <button type="submit" className="btn">Salvar</button>
                    <Link href="/dashboard/medicos" className="btn" style={{ background: '#6c757d', textDecoration: 'none', textAlign: 'center' }}>
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}