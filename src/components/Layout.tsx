import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex">
        {!isHomePage && <Sidebar />}
        
        <div className={`flex-1 ${!isHomePage ? 'ml-0 md:ml-64' : ''}`}>
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;