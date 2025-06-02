import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronRight, 
  ShoppingBag, 
  Package, 
  LayoutDashboard,
  User, 
  Clock, 
  BarChart3, 
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className={cn(
        "fixed inset-0 z-20 bg-black/50 lg:hidden",
        collapsed ? "hidden" : "block"
      )}
      onClick={() => setCollapsed(true)}
      />
      
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-30 w-64 border-r bg-background transition-all duration-300 lg:static",
          collapsed && "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
        )}
        initial={false}
        animate={{
          width: collapsed ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 80 : 0) : 256
        }}
      >
        <div className="relative h-full py-4 overflow-y-auto">
          {/* Collapse button */}
          <button
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm lg:block hidden"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronRight
              className={cn(
                "h-3 w-3 transition-transform",
                collapsed ? "" : "rotate-180"
              )}
            />
          </button>
          
          {/* Sidebar content */}
          <nav className="space-y-2 px-2">
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} collapsed={collapsed}>
              Dashboard
            </SidebarLink>
            <SidebarLink to="/marketplace" icon={<ShoppingBag size={20} />} collapsed={collapsed}>
              Marketplace
            </SidebarLink>
            <SidebarLink to="/orders" icon={<Package size={20} />} collapsed={collapsed}>
              Orders
            </SidebarLink>
            <SidebarLink to="/track" icon={<Clock size={20} />} collapsed={collapsed}>
              Track Shipments
            </SidebarLink>
            <SidebarLink to="/analytics" icon={<BarChart3 size={20} />} collapsed={collapsed}>
              Analytics
            </SidebarLink>
            
            <div className="my-6 border-t border-border"></div>
            
            <SidebarLink to="/profile" icon={<User size={20} />} collapsed={collapsed}>
              Profile
            </SidebarLink>
            <SidebarLink to="/settings" icon={<Settings size={20} />} collapsed={collapsed}>
              Settings
            </SidebarLink>
          </nav>
          
          {/* User info at bottom */}
          {!collapsed && user && (
            <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {user.name?.[0] || 'U'}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium">{user.name || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.walletAddress ? `${user.walletAddress.slice(0, 8)}...` : 'Not connected'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed: boolean;
}

const SidebarLink = ({ to, icon, children, collapsed }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      {icon}
      {!collapsed && <span>{children}</span>}
    </NavLink>
  );
};

export default Sidebar;