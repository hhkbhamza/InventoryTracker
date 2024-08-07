import ProtectedRoute from '@/app/components/ProtectedRoute';
import Home from '@/app/components/Home';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
}