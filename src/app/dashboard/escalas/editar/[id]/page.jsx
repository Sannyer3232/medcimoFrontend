import EscalaForm from '@/components/forms/EscalaForm';
import { getEscalaById } from '@/services/escalaService';

export default async function EditarEscalaPage({ params }) {

    const { id } = await params;
    let escala = null;
    let errorMessage = '';

    try {
        escala = await getEscalaById(id);
    } catch (error) {
        console.error('Erro ao buscar escala:', error);
        errorMessage = error.message;
    }

    if (!escala) {
        return (
            <div className="details">
                <h2>Escala não encontrada</h2>
                <p>A página não conseguiu carregar os dados (ID: {id}).</p>
                {errorMessage && <p>Erro da API: {errorMessage}</p>}
            </div>
        );
    }

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Editar Escala</h2>
                </div>
                {/* Passa os dados para preencher o formulário */}
                <EscalaForm initialData={escala} />
            </div>
        </div>
    );
}