import EscalaForm from '@/components/forms/EscalaForm';

export default function NovaEscalaPage() {
    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2 id="form-title">Adicionar Nova Escala</h2>
                </div>
                <EscalaForm />
            </div>
        </div>
    );
}