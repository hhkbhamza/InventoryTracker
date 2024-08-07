import { AuthProvider } from '@/app/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'A Next.js application with Firebase Authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}