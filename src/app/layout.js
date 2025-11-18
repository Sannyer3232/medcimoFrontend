import "./globals.css";
// Importa o wrapper do Provider
import {AuthProvider} from "@/context/AuthContext";

export const metadata = {
    title: "Medcimo",
    description: "Sistema de Gerenciamento Medcimo",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
        <head>
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                xintegrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                crossOrigin="anonymous"
            />
        </head>
        <body>
        {/* Envolvemos o 'children' com o Providers */}
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}