import StatCard from '@/components/dashboard/StatCard';
import DepartmentChart from '@/components/dashboard/DepartmentChart';
import ScheduleChart from '@/components/dashboard/ScheduleChart';
import { cookies } from 'next/headers'; // 1. Importante para pegar o token

const API_BASE_URL = 'http://localhost:8080/api';

// 2. A função agora recebe o TOKEN como argumento
async function getDashboardData(token) {
  if (!token) return { funcionarios: [], medicos: [], especialidades: [], escalas: [] };

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Opções para não fazer cache (dados sempre frescos)
  const options = { headers, cache: 'no-store' };

  try {
    const [funcRes, medRes, espRes, escRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/funcionarios`, options),
      fetch(`${API_BASE_URL}/medico`, options),
      fetch(`${API_BASE_URL}/especialidades`, options),
      fetch(`${API_BASE_URL}/escala`, options)
    ]);

    const getJSON = async (result) => {
      // Verifica se deu sucesso E se o status http é 200-299
      if (result.status === 'fulfilled' && result.value.ok) {
        return result.value.json();
      }
      // Se der erro 403 (sem permissão), retorna vazio sem quebrar a página
      return [];
    };

    const funcionarios = await getJSON(funcRes);
    const medicos = await getJSON(medRes);
    const especialidades = await getJSON(espRes);
    const escalas = await getJSON(escRes);

    return { funcionarios, medicos, especialidades, escalas };

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return { funcionarios: [], medicos: [], especialidades: [], escalas: [] };
  }
}

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default async function DashboardPage() {
  // 3. Recupera o token dos cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('medcimo.token')?.value;

  // 4. Passa o token para a função de busca
  const { funcionarios, medicos, especialidades, escalas } = await getDashboardData(token);

  const hoje = getTodayDateString();
  const escalasDeHoje = escalas.filter((escala) => escala.data === hoje);

  return (
      <>
        {/* --- CARDS GERAIS --- */}
        <div className="cardBox">
          {/* Exibe os dados. Se o usuário for comum e a API retornar 403, mostrará 0 */}
          <StatCard title="Total de Funcionários" value={funcionarios.length} icon="fa-users" />
          <StatCard title="Total de Médicos" value={medicos.length} icon="fa-user-md" />
          <StatCard title="Especialidades" value={especialidades.length} icon="fa-stethoscope" />
          <StatCard title="Escalas de Hoje" value={escalasDeHoje.length} icon="fa-calendar-check-o" />
        </div>

        {/* --- GRÁFICOS --- */}
        <div className="graphBox">
          <DepartmentChart funcionarios={funcionarios} />
          <ScheduleChart escalas={escalas} />
        </div>

        {/* --- DETALHES --- */}
        <div className="details">

          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Funcionários Recentes</h2>
              {/* O link só funcionará se o usuário tiver permissão, controlado pelo Sidebar/Layout */}
              <a href="/dashboard/funcionarios" className="btn">Ver Todos</a>
            </div>
            <table>
              <thead>
              <tr>
                <td>Nome</td>
                <td>Cargo</td>
                <td>Departamento</td>
              </tr>
              </thead>
              <tbody>
              {funcionarios.slice(0, 5).map((func) => (
                  <tr key={func.id}>
                    <td>{func.nome}</td>
                    <td>{func.cargo}</td>
                    <td>{func.departamento}</td>
                  </tr>
              ))}
              {funcionarios.length === 0 && (
                  <tr>
                    <td colSpan="3">
                      {/* Mensagem amigável */}
                      Nenhum funcionário encontrado (ou acesso restrito).
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          <div className="eventosProximos" id="escalas-do-dia-container">
            <div className="cardHeader">
              <h2>Escalas do Dia</h2>
              <a href="/dashboard/escalas" className="btn">Ver Todas</a>
            </div>
            <ul id="escalas-do-dia-list">
              {escalasDeHoje.length > 0 ? (
                  escalasDeHoje.map((escala) => (
                      <li key={escala.id}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        {/* Ajuste: Verifica se funcionario é objeto ou string */}
                        <span><strong>{escala.funcionarioNome || escala.funcionario}</strong> - Turno: {escala.turno}</span>
                      </li>
                  ))
              ) : (
                  <li>Nenhuma escala para hoje.</li>
              )}
            </ul>
          </div>
        </div>
      </>
  );
}