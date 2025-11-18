import EspecialidadeForm from '@/components/forms/EspecialidadeForm';

export default function NovaEspecialidadePage() {
    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Adicionar Nova Especialidade</h2>
                </div>
                <EspecialidadeForm />
            </div>
        </div>
    );
}