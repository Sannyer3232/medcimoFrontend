import EspecialidadeForm from '@/components/forms/EspecialidadeForm';
import { getEspecialidadeById } from '@/services/especialidadeService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

// Força a página a ser dinâmica para que o cookies() funcione corretamente no servidor
export const dynamic = 'force-dynamic';

export default async function EditarEspecialidadePage({ params }) {
    // 1. Aguarda os parâmetros da rota (necessário no Next.js 15+)
    const { id } = await params;

    // 2. Recupera o token dos cookies do lado do servidor para autorizar a requisição
    const cookieStore = await cookies();
    const token = cookieStore.get('medcimo.token')?.value;

    let especialidade = null;
    let errorMessage = '';

    try {
        // 3. Chama o serviço passando o token explicitamente
        // Certifique-se de que o especialidadeService.js aceite o argumento 'token'
        especialidade = await getEspecialidadeById(id, token);
    } catch (error) {
        console.error('Erro ao buscar especialidade:', error);
        errorMessage = error.message;
    }

    // 4. Se não encontrar a especialidade ou houver erro de autorização
    if (!especialidade) {
        return (
            <div className="details">
                <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                    <div className="cardHeader">
                        <h2>Especialidade não encontrada</h2>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <p>Não foi possível carregar os dados da especialidade (ID: {id}).</p>
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
                    <h2 id="form-title">Editar Especialidade</h2>
                </div>
                
                <div style={{ padding: '20px' }}>
                    {/* Passamos o initialData para o formulário cliente */}
                    <EspecialidadeForm initialData={especialidade} isEdit={true} />
                </div>
            </div>
        </div>
    );
}