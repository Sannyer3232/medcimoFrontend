'use client';

// Importa o provider que acabamos de criar
import { AuthProvider  } from '@/context/AuthContext';

/**
 * Este componente envolve todos os provedores de contexto
 * da sua aplicação.
 */
export default function Providers({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}