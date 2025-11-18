import Link from 'next/link';
import { getMedicos } from '@/services/medicoService';
import { cookies } from 'next/headers';
import MedicosList from '@/components/medicos/MedicosList'; // Importe o componente novo

export default async function MedicosPage() {

  // 1. Recupera o token
  const cookieStore = await cookies(); // await é necessário nas versões mais novas do Next
  const token = cookieStore.get('medcimo.token')?.value;

  let medicos = [];

  // 2. Busca os dados (Server Side)
  try {
    if (token) {
      medicos = await getMedicos(token);
    }
  } catch (error) {
    console.error("Erro ao carregar médicos:", error.message);
  }

  return (
      <div className="details">
        <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
          <div className="cardHeader">
            <h2>Gerenciamento de Médicos</h2>
            <Link href="/dashboard/medicos/novo" className="btn">
              Adicionar Novo
            </Link>
          </div>

          {/* 3. Usa o componente Client que criamos */}
          <MedicosList initialData={medicos} />

        </div>
      </div>
  );
}