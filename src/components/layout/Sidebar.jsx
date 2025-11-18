// components/layout/Sidebar.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Certifique-se que o caminho está correto

export default function Sidebar({ isActive }) {
    const pathname = usePathname();
    const { user } = useAuth();

    // Garante que permissoes é um array mesmo se user for null (evita erro na renderização inicial)
    const permissoes = user?.permissoes || [];

    // Definição das regras de visualização
    const isAdmin = permissoes.includes('ROLE_ADMIN');
    const isGerente = permissoes.includes('ROLE_GERENTE');

    // Helper: Admin ou Gerente (Níveis de Gestão)
    const isGestor = isAdmin || isGerente;

    const isLinkActive = (href) => {
        // Faz o link do painel principal ser exato
        if (href === "/dashboard") {
            return pathname === href;
        }
        // Faz outros links corresponderem se a rota começar com eles
        return pathname.startsWith(href);
    };

    return (
        <div className={isActive ? 'navigation active' : 'navigation'}>
            <ul>
                <li>
                    <Link href="/dashboard">
                        <span className="icon">
                            <Image src="/assets/logo2.png" alt="Logo SGI" width={70} height={70} />
                        </span>
                        <span className="title"><h2>Medcimo</h2></span>
                    </Link>
                </li>

                {/* 1. TODOS têm acesso ao Painel Principal */}
                <li className={isLinkActive('/dashboard') && pathname === '/dashboard' ? 'hovered' : ''}>
                    <Link href="/dashboard">
                        <span className="icon"><i className="fa fa-home" aria-hidden="true"></i></span>
                        <span className="title">Painel Principal</span>
                    </Link>
                </li>

                {/* 2. APENAS GESTORES (Admin e Gerente) gerenciam Funcionários */}
                {isGestor && (
                    <li className={isLinkActive('/dashboard/funcionarios') ? 'hovered' : ''}>
                        <Link href="/dashboard/funcionarios">
                            <span className="icon"><i className="fa fa-users" aria-hidden="true"></i></span>
                            <span className="title">Funcionários</span>
                        </Link>
                    </li>
                )}

                {/* 3. APENAS GESTORES (Admin e Gerente) gerenciam Médicos */}
                {isGestor && (
                    <li className={isLinkActive('/dashboard/medicos') ? 'hovered' : ''}>
                        <Link href="/dashboard/medicos">
                            <span className="icon"><i className="fa fa-user-md" aria-hidden="true"></i></span>
                            <span className="title">Médicos</span>
                        </Link>
                    </li>
                )}

                {/* 4. SOMENTE ADMIN gerencia Especialidades */}
                {isAdmin && (
                    <li className={isLinkActive('/dashboard/especialidades') ? 'hovered' : ''}>
                        <Link href="/dashboard/especialidades">
                            <span className="icon"><i className="fa fa-stethoscope" aria-hidden="true"></i></span>
                            <span className="title">Especialidades</span>
                        </Link>
                    </li>
                )}

                {/* 5. TODOS veem Escalas (Gestores criam, Comuns visualizam a sua) */}
                {/* A diferenciação de "criar" vs "ver" acontece DENTRO da página de escalas */}
                <li className={isLinkActive('/dashboard/escalas') ? 'hovered' : ''}>
                    <Link href="/dashboard/escalas">
                        <span className="icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                        <span className="title">Escalas</span>
                    </Link>
                </li>

                {/* 6. RELATÓRIOS (Geralmente apenas Gestores) */}
                {isGestor && (
                    <li>
                        <Link href="#"> {/* Placeholder */}
                            <span className="icon"><i className="fa fa-line-chart" aria-hidden="true"></i></span>
                            <span className="title">Relatórios</span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}