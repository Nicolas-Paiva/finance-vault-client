import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/ThemeProvider';
import Footer from '@/components/ui/footer';
import {Toaster} from '@/components/ui/sonner';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['400', '700'], // Optional: add other weights as needed
});

export const metadata: Metadata = {
    title: 'Finance Vault',
    description: 'Where security meets finance',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${roboto.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system"
                       enableSystem
                       disableTransitionOnChange>
            <main className="flex-1 w-[90vw] lg:max-w-7xl mx-auto">
                {children}
            </main>
            <Toaster position="top-center"/>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
