'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, senha);
            // O redirecionamento ocorre no contexto, mas se não ocorrer:
            // router.push('/dashboard');
        } catch (err) {
            setError(err.message || 'Falha ao conectar. Verifique suas credenciais.');
            setIsLoading(false);
        }
    };

    return (
        // Fundo com Gradiente
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 p-4">

            {/* Card de Login */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01]">

                <div className="p-8">
                    <div className="flex flex-col items-center mb-6">
                        {/* Logo com sombra suave */}
                        <div className="drop-shadow-md mb-4">
                            <Image src="/assets/logo2.png" alt="Logo Medcimo" width={100} height={100} priority />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Bem-vindo</h2>
                        <p className="text-gray-500 text-sm mt-1">Faça login no sistema Medcimo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Campo Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <i className="fa fa-envelope-o"></i>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="seu.email@medcimo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="senha">
                                Senha
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <i className="fa fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    id="senha"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Entrando...' : 'Acessar Sistema'}
                        </button>
                    </form>
                </div>

                {/* Rodapé do Card */}
                <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Medcimo. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}