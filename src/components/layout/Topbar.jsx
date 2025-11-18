import Image from 'next/image';
import { useState } from 'react'; // <-- 1. A CORREÇÃO ESTÁ AQUI

// Recebe 'user' e 'onLogout' do layout do dashboard
export default function Topbar({ onToggleMenu, user, onLogout }) {

    // Cria um dropdown de usuário
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="topbar">
            <div className="toggle" onClick={onToggleMenu}></div>

            <div className="search">
                <label>
                    <input type="text" placeholder="Buscar" />
                    <i className="fa fa-search" aria-hidden="true"></i>
                </label>
            </div>

            {/* Mostra o nome do usuário e o botão de Sair */}
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                {/* Mostra o nome do usuário (se existir) */}
                {user && (
                    <span style={{ color: '#555', fontWeight: '500' }}>
                        {/* Pega o primeiro nome do usuário */}
                        Olá, {user.nome.split(' ')[0]}
                    </span>
                )}

                <div className="user">
                    <Image src="/assets/perfil.png" alt="Perfil" width={50} height={50} />
                </div>

                {/* Botão de Sair (Logout) */}
                <button
                    onClick={onLogout} // Chama a função logout do AuthContext
                    title="Sair"
                    className="btn"
                    style={{ background: '#f44336' }} // Estilo de perigo/vermelho
                >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}