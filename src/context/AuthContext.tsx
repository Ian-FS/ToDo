import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';

// Definição da interface para o contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}
// Props para o componente AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Criação do contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente AuthProvider com tipagem
export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt-todo');
    setIsAuthenticated(token !== null);
  }, []);

  // Memoriza o valor do contexto para evitar recriação em cada renderização
  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
