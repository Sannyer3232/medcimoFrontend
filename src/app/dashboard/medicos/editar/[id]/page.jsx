import MedicoForm from '@/components/forms/MedicoForm';
import { getMedicoById } from '@/services/medicoService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

// Força a página a ser dinâmica para que o cookies() funcione corretamente
export const dynamic = 'force-dynamic';

export default async function EditarMedicoPage({ params }) {
  // 1. Aguarda os parâmetros da rota (obrigatório no Next.js 15+)
  const { id } = await params;

  // 2. Aguarda e recupera o token dos cookies do lado do servidor
  const cookieStore = await cookies();
  const token = cookieStore.get('medcimo.token')?.value;

  let medico = null;
  let errorMessage = '';

  try {
    // 3. Chama o serviço passando o token para autorizar a busca no backend
    // Certifique-se de que o medicoService.js aceite o argumento 'token'
    medico = await getMedicoById(id, token);
  } catch (error) {
    console.error('Erro ao buscar médico:', error);
    errorMessage = error.message;
  }

  // 4. Se não encontrar o médico ou houver erro de autorização
  if (!medico) {
    return (
      <div className="details">
        <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
          <div className="cardHeader">
            <h2>Médico não encontrado</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <p>Não foi possível carregar os dados do médico (ID: {id}).</p>
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>Motivo: {errorMessage}</p>}
          </div>
        </div>
      </div>
    );
  }

  // 5. Renderiza o formulário com os dados carregados
  return (
    <div className="details">
      <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
        <div className="cardHeader">
          <h2>Editar Médico</h2>
        </div>

        <div style={{ padding: '20px' }}>
          <MedicoForm initialData={medico} isEdit={true} />
        </div>
      </div>
    </div>
  );
}