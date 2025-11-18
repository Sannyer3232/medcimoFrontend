import { redirect } from 'next/navigation';

export default function Home() {
    // Redireciona o usuário da raiz '/' para '/login'
    redirect('/login');
}