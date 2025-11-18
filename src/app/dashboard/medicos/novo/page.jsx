import MedicoForm from '@/components/forms/MedicoForm'; // Importa o formulário de médico

export default function NovoMedicoPage() {
  return (
    <div className="details">
      <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
        <div className="cardHeader">
          <h2 id="form-title">Adicionar Novo Médico</h2>
        </div>
        
        {/* Renderiza o formulário de MÉDICO */}
        <MedicoForm />
        
      </div>
    </div>
  );
}