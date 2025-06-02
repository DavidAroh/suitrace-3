import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useEnoki } from '@/hooks/useEnoki';
import { useWalletKit } from '@mysten/dapp-kit';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string;
    name?: string;
    email?: string;
    walletAddress?: string;
  } | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated: isEnokiAuthenticated, user: enokiUser } = useEnoki();
  const { isConnected, currentWallet } = useWalletKit();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  useEffect(() => {
    // Check authentication status when component mounts
    const initializeAuth = async () => {
      try {
        // If user is authenticated with Enoki and has a connected wallet
        if (isEnokiAuthenticated && isConnected && currentWallet) {
          setUser({
            id: enokiUser?.id || 'unknown',
            name: enokiUser?.name || 'Anonymous User',
            email: enokiUser?.email,
            walletAddress: currentWallet.accounts[0]?.address,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        toast({
          title: 'Authentication Error',
          description: 'Failed to initialize authentication.',
          variant: 'destructive',
        });
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [isEnokiAuthenticated, isConnected, currentWallet, enokiUser]);

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}