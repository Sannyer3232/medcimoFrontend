import EspecialidadeForm from '@/components/forms/EspecialidadeForm';
import { getEspecialidadeById } from '@/services/especialidadeService';

export default async function EditarEspecialidadePage({ params }) {

    const { id } = await params;

    let especialidade = null;
    let errorMessage = '';

    try {
        especialidade = await getEspecialidadeById(id);
    } catch (error) {
        console.error('Erro ao buscar especialidade:', error);
        errorMessage = error.message;
    }

    if (!especialidade) {
        return (
            <div className="details">
                <h2>Especialidade não encontrada</h2>
                <p>A página não conseguiu carregar os dados (ID: {id}).</p>
                {errorMessage && <p>Erro da API: {errorMessage}</p>}
            </div>
        );
    }

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Editar Especialidade</h2>
                </div>
                <EspecialidadeForm initialData={especialidade} />
            </div>
        </div>
    );
}