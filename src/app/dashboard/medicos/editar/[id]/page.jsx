import MedicoForm from '@/components/forms/MedicoForm';
// 1. Importa a função específica do serviço
import { getMedicoById } from '@/services/medicoService';

// A 'async function getMedico(id)' local e a 'API_BASE_URL' foram removidas.

// 2. A Página
export default async function EditarMedicoPage({ params }) {

  // 3. Aplica a correção do 'await params' que você descobriu
  const { id } = await params;

  let medico = null;
  let errorMessage = '';

  try {
    // 4. Chama o serviço (que já tem 'cache: no-store')
    medico = await getMedicoById(id);
  } catch (error) {
    console.error('Erro ao buscar médico:', error);
    errorMessage = error.message;
  }

  // 5. Renderiza a página de erro, se necessário
  if (!medico) {
    return (
        <div className="details">
          <h2>Médico não encontrado</h2>
          <p>A página não conseguiu carregar os dados (ID: {id}).</p>
          {errorMessage && <p>Erro da API: {errorMessage}</p>}
        </div>
    );
  }

  // 6. Renderiza a página de sucesso
  return (
      <div className="details">
        <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
          <div className="cardHeader">
            <h2 id="form-title">Editar Médico</h2>
          </div>

          {/* Renderiza o formulário de MÉDICO com os dados */}
          <MedicoForm initialData={medico} />

        </div>
      </div>
  );
}