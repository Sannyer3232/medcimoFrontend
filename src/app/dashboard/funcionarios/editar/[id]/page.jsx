import { getFuncionarioById } from '@/services/funcionarioService';
import FuncionarioForm from '@/components/forms/FuncionarioForm';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditarFuncionarioPage({ params }) {
    // Em versões recentes do Next.js (15+), params e cookies() devem ser aguardados
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('medcimo.token')?.value;

    let funcionario = null;
    try {
        // Buscamos os dados passando o token explicitamente para autorizar no backend
        funcionario = await getFuncionarioById(id, token);
    } catch (error) {
        console.error("Erro ao carregar funcionário:", error.message);
        // Se der erro 401 ou 404, mostramos a página de não encontrado
        return notFound();
    }

    if (!funcionario) return notFound();

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2>Editar Funcionário</h2>
                </div>
                
                {/* O formulário (Client Component) lidará com as edições */}
                <FuncionarioForm initialData={funcionario} isEdit={true} />
            </div>
        </div>
    );
}