import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Pegando o erro do contexto
  const [error, setError] = useState<string | null>(null);  // Definindo o estado do erro
  const navigate = useNavigate();  // Navegação aqui no Login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');  // Redireciona após o login bem-sucedido
    } catch (err: any) {
      setError(err.message);  // Definindo a mensagem de erro
      // O erro já está sendo tratado dentro do login, então não precisa fazer nada aqui
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Scissors className="h-12 w-12 text-[#c4a47c]" />
          </div>
          <h2 className="text-3xl font-bold">
            Welcome back to <span className="text-[#c4a47c]">LUXURYCUTS</span>
          </h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <div className="card-luxury">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 text-red-200 p-3 rounded-md text-sm">
                {error}  {/* Exibindo o erro de login */}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-luxury w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-luxury w-full"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#c4a47c] focus:ring-[#c4a47c]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-[#c4a47c] hover:text-[#b3936b]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Sign in</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#c4a47c] hover:text-[#b3936b] font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
