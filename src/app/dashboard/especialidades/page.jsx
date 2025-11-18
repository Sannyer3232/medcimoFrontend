import Link from 'next/link';
import { getEspecialidades } from '@/services/especialidadeService';
import EspecialidadeList from '@/components/especialidades/EspecialidadeList';
import { cookies } from 'next/headers'; // 1. Importe cookies

export default async function EspecialidadesPage() {
    // 2. Recupere o token
    const cookieStore = await cookies();
    const token = cookieStore.get('medcimo.token')?.value;

    let especialidades = [];

    // 3. Tente buscar passando o token
    try {
        if (token) {
            especialidades = await getEspecialidades(token);
        }
    } catch (error) {
        console.error("Erro ao carregar especialidades:", error.message);
    }

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2>Gerenciamento de Especialidades</h2>
                    <Link href="/dashboard/especialidades/novo" className="btn">
                        Adicionar Nova
                    </Link>
                </div>

                <EspecialidadeList initialData={especialidades} />

            </div>
        </div>
    );
}