import EscalaForm from '@/components/forms/EscalaForm';
import { getEscalaById } from '@/services/escalaService';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

// Força a página a ser dinâmica para que o cookies() funcione corretamente no servidor
export const dynamic = 'force-dynamic';

export default async function EditarEscalaPage({ params }) {
    // 1. Aguarda os parâmetros da rota (necessário nas versões recentes do Next.js)
    const { id } = await params;

    // 2. Recupera o token dos cookies do lado do servidor para autorizar a requisição no backend
    const cookieStore = await cookies();
    const token = cookieStore.get('medcimo.token')?.value;

    let escala = null;
    let errorMessage = '';

    try {
        // 3. Busca os dados da escala passando o token explicitamente para autorizar no backend
        // Certifique-se de que o seu escalaService.js aceite o argumento 'token'
        escala = await getEscalaById(id, token);
    } catch (error) {
        console.error('Erro ao buscar escala:', error);
        errorMessage = error.message;
    }

    // 4. Tratamento caso a escala não seja encontrada ou haja erro de autorização
    if (!escala) {
        return (
            <div className="details">
                <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                    <div className="cardHeader">
                        <h2>Escala não encontrada</h2>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <p>Não foi possível carregar os dados da escala (ID: {id}).</p>
                        {errorMessage && (
                            <p style={{ color: 'red', marginTop: '10px' }}>
                                Motivo: {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 5. Renderiza a página com o formulário preenchido
    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Editar Escala</h2>
                </div>
                
                <div style={{ padding: '20px' }}>
                    {/* Passamos os dados iniciais e a flag de edição para o formulário cliente */}
                    <EscalaForm initialData={escala} isEdit={true} />
                </div>
            </div>
        </div>
    );
}