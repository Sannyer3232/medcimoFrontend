import FuncionarioForm from '@/components/forms/FuncionarioForm';

export default function NovoFuncionarioPage() {
  return (
    <div className="details">
      <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
        <div className="cardHeader">
          <h2 id="form-title">Adicionar Novo Funcionário</h2>
        </div>
        
        {/* Renderiza o formulário no modo "Criar" (sem initialData) */}
        <FuncionarioForm />
        
      </div>
    </div>
  );
}