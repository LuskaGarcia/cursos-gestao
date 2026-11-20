import './globals.css';

export const metadata = {
  title: {
    default: 'Cursos Gestão',
    template: '%s | Cursos Gestão',
  },
  description: 'Plataforma corporativa de capacitação e matrículas.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
