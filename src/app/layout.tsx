import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samarth K | Portfolio - Windows XP',
  description: 'Full Stack Developer portfolio built as a Windows XP desktop experience. Explore my projects, skills, and experience in a retro interactive UI.',
  keywords: ['Samarth', 'portfolio', 'developer', 'React', 'Next.js', 'TypeScript', 'Windows XP'],
  authors: [{ name: 'Samarth K' }],
  openGraph: {
    title: 'Samarth K | Portfolio',
    description: 'Full Stack Developer portfolio with a Windows XP desktop experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
