import { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  CreditCard,
  BarChart3,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const recentTransactions = [
  { id: '1', type: 'purchase', product: 'Organic Yam (50kg)', amount: '₦15,000', date: 'Today, 10:24 AM', status: 'Completed' },
  { id: '2', type: 'sale', product: 'Premium Shea Butter (20 jars)', amount: '₦24,000', date: 'Yesterday, 3:45 PM', status: 'In Transit' },
  { id: '3', type: 'sale', product: 'Fresh Tomatoes (30kg)', amount: '₦8,500', date: '20 Oct, 2024', status: 'Delivered' },
  { id: '4', type: 'purchase', product: 'Palm Oil (10 liters)', amount: '₦12,000', date: '18 Oct, 2024', status: 'Processing' },
];

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('This Month');
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md border">
              {timeframe}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {/* Dropdown would go here */}
          </div>
          
          <Button asChild>
            <Link to="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<ShoppingBag className="h-5 w-5" />}
          title="Total Products"
          value="12"
          trend="up"
          percentage="24%"
          color="blue"
        />
        
        <StatCard
          icon={<Package className="h-5 w-5" />}
          title="Active Orders"
          value="3"
          trend="up"
          percentage="12%"
          color="green"
        />
        
        <StatCard
          icon={<CreditCard className="h-5 w-5" />}
          title="Monthly Revenue"
          value="₦120,500"
          trend="up"
          percentage="18%"
          color="purple"
        />
        
        <StatCard
          icon={<Users className="h-5 w-5" />}
          title="Customers"
          value="28"
          trend="down"
          percentage="5%"
          color="orange"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/transactions">
                View All
              </Link>
            </Button>
          </div>
          
          <div className="rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`mr-2 p-1.5 rounded-full ${
                            transaction.type === 'purchase' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {transaction.type === 'purchase' ? 
                              <ShoppingBag className="h-3 w-3" /> : 
                              <CreditCard className="h-3 w-3" />}
                          </span>
                          <div className="text-sm font-medium">
                            {transaction.product}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {transaction.amount}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
                        {transaction.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                          transaction.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'In Transit'
                            ? 'bg-yellow-100 text-yellow-800'
                            : transaction.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Supply Chain Overview</h2>
          </div>
          
          <div className="rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="mb-5">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Products in transit</div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-green-500 w-3/5 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-3 text-center text-sm">
                  <div>
                    <div className="font-medium">60%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                  </div>
                  <div>
                    <div className="font-medium">30%</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="font-medium">10%</div>
                    <div className="text-xs text-muted-foreground">Delayed</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/dashboard/supply-chain">
                  View Supply Chain Details
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Upcoming Deliveries */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming Deliveries</h2>
            </div>
            
            <div className="rounded-xl border shadow-sm">
              <div className="p-4 border-b flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Scheduled Deliveries</span>
              </div>
              
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Fresh Cassava (200kg)</h4>
                      <p className="text-xs text-muted-foreground">From: Eko Farms</p>
                    </div>
                    <div className="text-sm font-semibold">Oct 25</div>
                  </div>
                  <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-yellow-500 w-2/3 rounded-full"></div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Dried Ginger (25kg)</h4>
                      <p className="text-xs text-muted-foreground">From: Highland Spices</p>
                    </div>
                    <div className="text-sm font-semibold">Oct 28</div>
                  </div>
                  <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/deliveries">
                    View All Deliveries
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: 'up' | 'down';
  percentage: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard = ({ icon, title, value, trend, percentage, color }: StatCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
  };
  
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`rounded-full p-2 ${colorClasses[color]}`}>
          {icon}
        </div>
        
        <div className={`flex items-center text-xs ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {percentage}
        </div>
      </div>
      
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
};

export default Dashboard;