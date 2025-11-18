'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Importa o hook de autenticação
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

// Componente simples de Loading
const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>
        Carregando...
    </div>
);

export default function DashboardLayout({ children }) {
    const [isSidebarActive, setSidebarActive] = useState(false);

    // --- LÓGICA DE AUTENTICAÇÃO ---
    const { isAuthenticated, user, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Roda apenas quando o carregamento inicial terminar
        if (!isLoading) {
            if (!isAuthenticated) {
                // Se não está carregando E não está autenticado, expulsa
                router.push('/login');
            }
        }
    }, [isLoading, isAuthenticated, router]); // Dependências

    const toggleMenu = () => {
        setSidebarActive(!isSidebarActive);
    };

    // Se o AuthContext ainda está verificando o usuário, mostra um loading
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Se não está carregando, mas (ainda) não está autenticado,
    // não renderiza nada (o useEffect já está redirecionando)
    if (!isAuthenticated) {
        return null;
    }

    // --- FIM DA LÓGICA DE AUTENTICAÇÃO ---

    // Se passou por tudo, o usuário está logado.
    // Renderiza o dashboard.
    return (
        <div className="container">
            <Sidebar isActive={isSidebarActive} />
            <div className={isSidebarActive ? 'main active' : 'main'}>
                {/* Passa o 'user' e 'logout' para a Topbar */}
                <Topbar onToggleMenu={toggleMenu} user={user} onLogout={logout} />
                {children}
            </div>
        </div>
    );
}