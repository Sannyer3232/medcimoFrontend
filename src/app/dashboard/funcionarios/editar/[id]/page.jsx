// app/dashboard/funcionarios/editar/[id]/page.jsx
import FuncionarioForm from '@/components/forms/FuncionarioForm';
import { getFuncionarioById } from '@/services/funcionarioService';


export default async function EditarFuncionarioPage({ params }) {
    // 👇 Desestrutura o params após resolver a Promise
    const { id } = await params;

    let funcionario = null;
    let errorMessage = '';

    try {
        funcionario = await getFuncionarioById(id);
    } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
        errorMessage = error.message;
    }

    if (!funcionario) {
        return (
            <div className="details">
                <h2>Funcionário não encontrado</h2>
                <p>A página não conseguiu carregar os dados (ID: {id}).</p>
                {errorMessage && <p>Erro da API: {errorMessage}</p>}
            </div>
        );
    }

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Editar Funcionário</h2>
                </div>
                <FuncionarioForm initialData={funcionario} />
            </div>
        </div>
    );
}
