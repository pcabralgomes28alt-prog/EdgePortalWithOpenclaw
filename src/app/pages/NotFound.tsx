import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-gray-600 mb-6">Página não encontrada</p>
        <Link to="/">
          <Button>Voltar para o início</Button>
        </Link>
      </div>
    </div>
  );
}
