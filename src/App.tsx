import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui.js/client';

import { Toaster } from './components/ui/toaster';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import AuthProvider from './providers/AuthProvider';

// Lazy loaded routes
const HomePage = lazy(() => import('./pages/HomePage'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const TrackProduct = lazy(() => import('./pages/TrackProduct'));

// Create a new query client instance
const queryClient = new QueryClient();

// Sui network configuration
const networks = {
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  localnet: { url: 'http://127.0.0.1:9000' },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <AuthProvider>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/track/:id" element={<TrackProduct />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
            <Toaster />
          </AuthProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;