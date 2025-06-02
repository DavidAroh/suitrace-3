import React from 'react';
import { X } from 'lucide-react';
import { ConnectButton as DappKitConnectButton } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginWithGoogle: () => void;
  isLoading: boolean;
}

export function ConnectModal({ isOpen, onClose, onLoginWithGoogle, isLoading }: ConnectModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className={cn(
          "relative w-full max-w-md rounded-lg bg-background p-6 shadow-xl",
          "transform transition-all duration-300",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold">Connect to SuiTrace</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect your wallet and verify your identity to use SuiTrace
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-dashed">
            <DappKitConnectButton />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">After connecting wallet</span>
            </div>
          </div>
          
          <Button 
            className="w-full"
            onClick={onLoginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify with Google"}
          </Button>
        </div>
      </div>
    </div>
  );
}