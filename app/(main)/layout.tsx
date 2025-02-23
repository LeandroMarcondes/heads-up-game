import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Words Up Game - Leandro',
    description: 'A Fun game to play with friends. Let guess the word on your head. By drawing, mimicking, or dancing. You decide how to play.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Words Up Game - Leandro',   
    },
    icons: {
        // icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {   
    return <Layout>{children}</Layout>;
}
