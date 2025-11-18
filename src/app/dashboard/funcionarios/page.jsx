import Link from 'next/link';
import { getFuncionarios } from '@/services/funcionarioService';
import FuncionarioList from '@/components/funcionarios/FuncionarioList';
// 1. IMPORTA O 'cookies' DO NEXT.JS
import { cookies } from 'next/headers';


export default async function FuncionariosPage() {

  // 2. LÊ O COOKIE DO LADO DO SERVIDOR
  const cookieStore = await cookies();
  const token =  cookieStore.get('medcimo.token')?.value;

  // 3. PASSA O TOKEN PARA O SERVIÇO
  const funcionarios = await getFuncionarios(token);

  return (
      <div className="details">
        <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
          <div className="cardHeader">
            <h2>Gerenciamento de Funcionários</h2>
            <Link href="/dashboard/funcionarios/novo" className="btn">
              Adicionar Novo
            </Link>
          </div>

          <FuncionarioList initialData={funcionarios} />

        </div>
      </div>
  );
}