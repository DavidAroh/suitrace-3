import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { ConnectButton } from './wallet/ConnectButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">SuiTrace</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 ml-10">
            <NavLink href="/marketplace">Marketplace</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NavLink href="/track" className="block px-4 py-2">Track Product</NavLink>
                <NavLink href="/about" className="block px-4 py-2">About</NavLink>
                <NavLink href="/help" className="block px-4 py-2">Help Center</NavLink>
              </div>
            </div>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ConnectButton />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              <MobileNavLink href="/marketplace" setIsOpen={setIsOpen}>Marketplace</MobileNavLink>
              <MobileNavLink href="/dashboard" setIsOpen={setIsOpen}>Dashboard</MobileNavLink>
              <MobileNavLink href="/track" setIsOpen={setIsOpen}>Track Product</MobileNavLink>
              <MobileNavLink href="/about" setIsOpen={setIsOpen}>About</MobileNavLink>
              <MobileNavLink href="/help" setIsOpen={setIsOpen}>Help Center</MobileNavLink>
              
              <div className="pt-3">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NavLink = ({ href, className, children }: NavLinkProps) => {
  const location = window.location.pathname;
  const isActive = location === href;

  return (
    <Link 
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavLink = ({ href, children, setIsOpen }: MobileNavLinkProps) => {
  const location = window.location.pathname;
  const isActive = location === href;

  return (
    <Link
      to={href}
      className={cn(
        "block py-2 px-3 rounded-md text-sm font-medium",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
};

export default Navbar;