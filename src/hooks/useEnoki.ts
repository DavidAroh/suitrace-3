import { useState, useEffect, useCallback } from 'react';
import { ZkLoginState, useZkLoginSetup } from '@mysten/dapp-kit';
import { EnokiProvider, AuthProvider, User } from '@mysten/enoki';

const ENOKI_CLIENT_ID = 'your-enoki-client-id'; // Replace with actual client ID

// Initialize Enoki provider
const enokiProvider = new EnokiProvider({
  clientId: ENOKI_CLIENT_ID,
  authProvider: AuthProvider.GOOGLE,
});

export function useEnoki() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { loginZkLogin, completeZkLogin, zkLoginState } = useZkLoginSetup();
  
  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      const currentUser = await enokiProvider.getUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Handle login with Google via zkLogin
  const login = useCallback(async () => {
    try {
      // Start the zkLogin flow
      await loginZkLogin();
      
      // Initialize Enoki auth flow
      const { url, sessionId } = await enokiProvider.initialize();
      
      // Open the popup for Google authentication
      const popupWindow = window.open(url, '_blank', 'width=500,height=600');
      
      // Poll for authentication completion
      const checkInterval = setInterval(async () => {
        try {
          const status = await enokiProvider.getStatus(sessionId);
          
          if (status.done) {
            clearInterval(checkInterval);
            if (popupWindow) popupWindow.close();
            
            if (status.success) {
              // Get JWT token and complete zkLogin flow
              const jwt = status.token;
              await completeZkLogin(jwt);
              
              // Set user information
              const currentUser = await enokiProvider.getUser();
              setUser(currentUser);
              setIsAuthenticated(true);
            }
          }
        } catch (error) {
          clearInterval(checkInterval);
          console.error('Error checking status:', error);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [loginZkLogin, completeZkLogin]);
  
  // Handle logout
  const logout = useCallback(async () => {
    await enokiProvider.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);
  
  return {
    login,
    logout,
    user,
    isAuthenticated,
    isAuthenticating: zkLoginState === ZkLoginState.IN_PROGRESS,
    zkLoginState,
  };
}