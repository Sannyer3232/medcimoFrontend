// context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { api } from '@/services/apiHelper'; // (Seu apiHelper)
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Carrega o usuário pelos cookies no início
    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies['medcimo.token'];
        const storedUser = cookies['medcimo.user'];

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            // Re-valida o token no apiHelper (já deve estar fazendo)
        }
    }, []);

    const login = async (email, senha) => {
        try {
            // 1. Chama a API de login
            // (Supõe que api.post retorna { token, usuario })
            const { token, usuario } = await api.post('/auth/login', { email, senha });

            // 2. Salva nos Cookies (expira em 1 dia)
            setCookie(null, 'medcimo.token', token, { maxAge: 86400, path: '/' });
            setCookie(null, 'medcimo.user', JSON.stringify(usuario), { maxAge: 86400, path: '/' });

            // 3. Define o usuário no estado
            setUser(usuario);

            // 4. Redireciona
            router.push('/dashboard');

        } catch (error) {
            console.error("Falha no login", error);
            throw new Error("Email ou senha inválidos");
        }
    };

    const logout = () => {
        destroyCookie(null, 'medcimo.token', { path: '/' });
        destroyCookie(null, 'medcimo.user', { path: '/' });
        setUser(null);
        router.push('/login'); // Página de login
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);