import { useState, useEffect } from 'react';
import { useWalletKit } from '@mysten/dapp-kit';
import { ConnectModal } from './ConnectModal';
import { Button } from '../ui/button';
import { useEnoki } from '@/hooks/useEnoki';
import { toast } from '@/hooks/use-toast';
import { Loader2, Wallet } from 'lucide-react';

export function ConnectButton() {
  const { isConnected, currentWallet, disconnect } = useWalletKit();
  const { isAuthenticating, isAuthenticated, login, logout } = useEnoki();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && !isAuthenticated && !isAuthenticating) {
      setIsModalOpen(true);
    }
  }, [isConnected, isAuthenticated, isAuthenticating]);

  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await login();
      setIsModalOpen(false);
      toast({
        title: "Authentication successful",
        description: "You're now signed in with Google",
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Authentication failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      if (isAuthenticated) {
        await logout();
      }
      if (isConnected) {
        await disconnect();
      }
      toast({
        title: "Logged out successfully",
        description: "You've been logged out from SuiTrace",
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If user is both wallet-connected and authenticated
  if (isConnected && isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Wallet className="h-4 w-4 mr-1" />
          )}
          {currentWallet?.accounts[0]?.address.slice(0, 6)}...
        </Button>
      </div>
    );
  }

  // If user has wallet connected but not authenticated
  if (isConnected && !isAuthenticated) {
    return (
      <>
        <Button 
          onClick={handleLoginWithGoogle}
          disabled={isLoading || isAuthenticating}
          size="sm"
        >
          {isLoading || isAuthenticating ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : null}
          Verify with Google
        </Button>
        <ConnectModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onLoginWithGoogle={handleLoginWithGoogle}
          isLoading={isLoading || isAuthenticating}
        />
      </>
    );
  }

  // Default state - not connected
  return (
    <>
      <Button 
        onClick={handleConnect}
        size="sm"
      >
        Connect Wallet
      </Button>
      <ConnectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginWithGoogle={handleLoginWithGoogle}
        isLoading={isLoading || isAuthenticating}
      />
    </>
  );
}