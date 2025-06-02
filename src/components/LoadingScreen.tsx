import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-lg font-medium animate-pulse">Loading SuiTrace...</p>
    </div>
  );
};

export default LoadingScreen;