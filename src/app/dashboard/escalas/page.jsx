import Link from 'next/link';
import { getEscalas } from '@/services/escalaService';
import EscalaList from '@/components/escalas/EscalaList'; // Importe o componente CLIENT
import { cookies } from 'next/headers'; // Importe cookies

export default async function EscalasPage() {
    // 1. Recupera Token
    const cookieStore = await cookies();
    const token = cookieStore.get('medcimo.token')?.value;

    let escalas = [];

    try {
        if (token) {
            // 2. Passa Token
            escalas = await getEscalas(token);
        }
    } catch (error) {
        console.error("Erro ao carregar escalas:", error.message);
    }

    return (
        <div className="details">
            <div className="recentOrders" style={{ gridColumn: '1 / -1' }}>
                <div className="cardHeader">
                    <h2>Gerenciamento de Escalas</h2>
                    <Link href="/dashboard/escalas/novo" className="btn">
                        Adicionar Nova
                    </Link>
                </div>

                {/* Passa os dados para o componente Client */}
                <EscalaList initialData={escalas} />

            </div>
        </div>
    );
}