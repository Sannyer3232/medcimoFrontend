// components/forms/FuncionarioForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createFuncionario, updateFuncionario } from "@/services/funcionarioService";
import { useAuth } from "@/context/AuthContext"; // 1. Import do Contexto

// Dados de cargos
const departamentosCargos = {
  Administrativo: [
    "Diretor(a)",
    "Gerente",
    "Assistente Administrativo",
    "Recepcionista",
  ],
  Clínico: [
    "Enfermeiro(a) Chefe",
    "Enfermeiro(a)",
    "Técnico(a) de Enfermagem",
    "Fisioterapeuta",
  ],
  TI: [
    "Gerente de TI",
    "Desenvolvedor(a) de Software",
    "Analista de Suporte Técnico",
  ],
  Manutenção: ["Eletricista", "Técnico de Refrigeração", "Zelador(a)"],
  Financeiro: ["Analista Financeiro", "Contador(a)"],
};

export default function FuncionarioForm({ initialData }) {
  const router = useRouter();
  const { user } = useAuth(); // 2. Pegar o usuário logado

  // Verifica se é Admin (para mostrar o campo de permissão)
  // Usa encadeamento opcional (?.) para evitar erro se user for null no inicio
  const isAdmin = user?.permissoes?.includes("ROLE_ADMIN");

  const isEditMode = !!initialData;

  // Estado inicial
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    departamento: "",
    email: "",
    telefone: "",
    senha: "", // Adicionado para criação de usuário
    permissao: "ROLE_FUNCIONARIO", // Valor padrão
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const [cargosDisponiveis, setCargosDisponiveis] = useState([]);

  // Efeito para preencher os dados quando estiver em modo de EDIÇÃO
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        // Espalha os dados existentes
        ...initialData,
        // A senha não vem do back por segurança, inicia vazia
        senha: "",
        // Pega a primeira permissão da lista ou define o padrão
        permissao: initialData.permissoes && initialData.permissoes.length > 0
            ? initialData.permissoes[0]
            : "ROLE_FUNCIONARIO",
        // Garante que o endereço exista
        endereco: initialData.endereco || {
          rua: "", numero: "", bairro: "", cidade: "", estado: "", cep: ""
        }
      });

      // Carrega os cargos do departamento atual
      if (initialData.departamento) {
        setCargosDisponiveis(departamentosCargos[initialData.departamento] || []);
      }
    }
  }, [isEditMode, initialData]);


  // Atualiza cargos quando o departamento muda (interação do usuário)
  useEffect(() => {
    // Só roda se o usuário alterou o departamento manualmente (evita loop com o useEffect acima)
    if (formData.departamento && formData.departamento !== initialData?.departamento) {
      const deptoKey = formData.departamento;
      setCargosDisponiveis(departamentosCargos[deptoKey] || []);
      setFormData((prev) => ({ ...prev, cargo: "" })); // Limpa cargo ao mudar depto
    } else if (formData.departamento) {
      // Caso seja o mesmo do initialData, apenas carrega a lista
      setCargosDisponiveis(departamentosCargos[formData.departamento] || []);
    }
  }, [formData.departamento, initialData]);


  // Handler genérico
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler para endereço
  const handleEnderecoChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [id]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove a senha do objeto se estiver vazia no modo de edição (para não sobrescrever com vazio)
      const dataToSend = { ...formData };
      if (isEditMode && !dataToSend.senha) {
        delete dataToSend.senha;
      }

      if (isEditMode) {
        await updateFuncionario(initialData.id, dataToSend);
      } else {
        await createFuncionario(dataToSend);
      }

      alert("Funcionário salvo com sucesso!");
      router.push("/dashboard/funcionarios");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  return (
      <div className="form-container">
        <form id="funcionario-form" onSubmit={handleSubmit}>
          <h3>Informações Pessoais</h3>

          {/* 3. CAMPO DE PERMISSÃO (Só visível para ADMIN) */}
          {isAdmin && (
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="permissao" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nível de Acesso (Admin)
                </label>
                <select
                    id="permissao"
                    value={formData.permissao}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                >
                  <option value="ROLE_FUNCIONARIO">Funcionário Comum</option>
                  <option value="ROLE_MEDICO">Médico</option>
                  <option value="ROLE_GERENTE">Gerente</option>
                  <option value="ROLE_ADMIN">Administrador</option>
                </select>
              </div>
          )}

          <input
              type="text"
              id="nome"
              placeholder="Nome Completo"
              value={formData.nome}
              onChange={handleChange}
              required
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
                id="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
            >
              <option value="" disabled>
                Selecione um Departamento
              </option>
              {Object.keys(departamentosCargos).map((depto) => (
                  <option key={depto} value={depto}>
                    {depto}
                  </option>
              ))}
            </select>

            <select
                id="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
                disabled={cargosDisponiveis.length === 0}
                style={{ flex: 1 }}
            >
              <option value="" disabled>
                Selecione um Cargo
              </option>
              {cargosDisponiveis.map((cargo) => (
                  <option key={cargo} value={cargo}>
                    {cargo}
                  </option>
              ))}
            </select>
          </div>

          <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
          />

          {/* 4. Campo de Senha */}
          <input
              type="password"
              id="senha"
              placeholder={isEditMode ? "Nova Senha (deixe em branco para manter)" : "Senha *"}
              value={formData.senha}
              onChange={handleChange}
              required={!isEditMode} // Obrigatório apenas ao criar
          />

          <input
              type="text"
              id="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
          />

          {/* Fieldset de Endereço */}
          <fieldset>
            <legend>Endereço</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
              <input
                  type="text"
                  id="rua"
                  placeholder="Rua"
                  value={formData.endereco.rua}
                  onChange={handleEnderecoChange}
                  required
              />
              <input
                  type="text"
                  id="numero"
                  placeholder="Nº"
                  value={formData.endereco.numero}
                  onChange={handleEnderecoChange}
                  required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input
                  type="text"
                  id="bairro"
                  placeholder="Bairro"
                  value={formData.endereco.bairro}
                  onChange={handleEnderecoChange}
                  required
              />
              <input
                  type="text"
                  id="cep"
                  placeholder="CEP"
                  value={formData.endereco.cep}
                  onChange={handleEnderecoChange}
                  required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '10px' }}>
              <input
                  type="text"
                  id="cidade"
                  placeholder="Cidade"
                  value={formData.endereco.cidade}
                  onChange={handleEnderecoChange}
                  required
              />
              <input
                  type="text"
                  id="estado"
                  placeholder="UF"
                  value={formData.endereco.estado}
                  onChange={handleEnderecoChange}
                  required
              />
            </div>
          </fieldset>

          {/* Ações do Formulário */}
          <div className="form-actions">
            <button type="submit" className="btn">
              Salvar
            </button>
            <Link
                href="/dashboard/funcionarios"
                className="btn"
                style={{ background: "#6c757d", textAlign: 'center', textDecoration: 'none' }}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
  );
}