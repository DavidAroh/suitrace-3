import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Shield, 
  Star, 
  Truck, 
  Package, 
  FileText, 
  Settings,
  MapPin,
  Calendar,
  Edit,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Mocked user data
const mockUserData = {
  name: 'Adamu Ibrahim',
  type: 'Farmer',
  joinedDate: 'October 2022',
  location: 'Kogi, Nigeria',
  walletAddress: '0x891fe5e53533d8dc4ebd8be8cd295a2c273d9d36d2348edef23fb95fb5184b11',
  profileImage: 'https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&w=800',
  bio: 'Small-scale organic yam and cassava farmer from Kogi State. Focused on sustainable farming practices and high-quality produce.',
  verificationStatus: {
    identity: true,
    location: true,
    businessRegistration: false,
  },
  stats: {
    productsListed: 12,
    sales: 28,
    rating: 4.8,
    reviewCount: 21,
  },
  recentProducts: [
    {
      id: '1',
      title: 'Organic Yam (50kg)',
      price: '₦15,000',
      status: 'Active',
      image: 'https://images.pexels.com/photos/5504630/pexels-photo-5504630.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      title: 'Fresh Cassava (200kg)',
      price: '₦20,000',
      status: 'In Transit',
      image: 'https://images.pexels.com/photos/5528687/pexels-photo-5528687.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '3',
      title: 'Palm Oil (20 liters)',
      price: '₦18,000',
      status: 'Sold Out',
      image: 'https://images.pexels.com/photos/4828501/pexels-photo-4828501.jpeg?auto=compress&cs=tinysrgb&w=600',
    }
  ],
  recentReviews: [
    {
      id: '1',
      reviewer: 'Lagos Foods Co.',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Excellent quality yams. Very well packaged and arrived on time. Will definitely order again.',
    },
    {
      id: '2',
      reviewer: 'Abuja Market',
      date: '1 month ago',
      rating: 4,
      comment: 'Good produce, reliable seller. The cassava was fresh and as described.',
    }
  ]
};

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [isCopied, setIsCopied] = useState(false);
  
  // Use authenticated user data if available, otherwise use mock data
  const userData = isAuthenticated && user ? {
    ...mockUserData,
    name: user.name || 'Anonymous User',
    walletAddress: user.walletAddress || mockUserData.walletAddress,
  } : mockUserData;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Farmer Profile</h1>
        <p className="text-muted-foreground">Manage your profile, products, and transactions</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div 
            className="rounded-xl border bg-card shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-32 bg-gradient-to-r from-primary/90 to-primary">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 bg-white/20 text-white hover:bg-white/30"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12 left-6 rounded-full border-4 border-background overflow-hidden w-24 h-24">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-14">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  {userData.verificationStatus.identity && (
                    <div className="ml-2 rounded-full bg-primary/10 p-1" title="Verified Account">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground">{userData.type}</p>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {userData.location}
                    {userData.verificationStatus.location && (
                      <span className="ml-1 text-xs text-primary\" title="Location Verified">✓</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {userData.joinedDate}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-foreground">{userData.stats.rating}</span>
                    <span className="ml-1">({userData.stats.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Wallet Address</span>
                    <button 
                      onClick={() => copyToClipboard(userData.walletAddress)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs bg-muted p-2 rounded-md font-mono break-all">
                    {userData.walletAddress}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{userData.bio}</p>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{userData.stats.productsListed}</p>
                    <p className="text-xs text-muted-foreground">Products</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{userData.stats.sales}</p>
                    <p className="text-xs text-muted-foreground">Sales</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    List New Product
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full" asChild>
              <div>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </div>
            </Button>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="lg:col-span-2">
          <div className="flex border-b mb-6">
            <TabButton 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
              icon={<Package className="h-4 w-4 mr-2" />}
            >
              Products
            </TabButton>
            <TabButton 
              active={activeTab === 'transactions'} 
              onClick={() => setActiveTab('transactions')}
              icon={<Truck className="h-4 w-4 mr-2" />}
            >
              Transactions
            </TabButton>
            <TabButton 
              active={activeTab === 'reviews'} 
              onClick={() => setActiveTab('reviews')}
              icon={<Star className="h-4 w-4 mr-2" />}
            >
              Reviews
            </TabButton>
            <TabButton 
              active={activeTab === 'documents'} 
              onClick={() => setActiveTab('documents')}
              icon={<FileText className="h-4 w-4 mr-2" />}
            >
              Documents
            </TabButton>
          </div>
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Listed Products</h3>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
              
              <div className="space-y-4">
                {userData.recentProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    className="rounded-lg border bg-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="h-16 w-16 rounded-md overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.title}</h4>
                      <p className="text-primary font-semibold">{product.price}</p>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'In Transit'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Track</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View All Products
              </Button>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Customer Reviews</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{userData.stats.rating}</span>
                  <span className="text-muted-foreground ml-1">({userData.stats.reviewCount})</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {userData.recentReviews.map((review) => (
                  <motion.div 
                    key={review.id}
                    className="rounded-lg border bg-card p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.reviewer}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View All Reviews
              </Button>
            </div>
          )}
          
          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Transactions</h3>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
              
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Buyer</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">Organic Yam (50kg)</td>
                      <td className="px-4 py-3 text-sm">Lagos Foods Co.</td>
                      <td className="px-4 py-3 text-sm font-medium">₦15,000</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">Oct 15, 2024</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">Fresh Cassava (200kg)</td>
                      <td className="px-4 py-3 text-sm">Abuja Market</td>
                      <td className="px-4 py-3 text-sm font-medium">₦20,000</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          In Transit
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">Oct 18, 2024</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">Palm Oil (20 liters)</td>
                      <td className="px-4 py-3 text-sm">Green Earth Co.</td>
                      <td className="px-4 py-3 text-sm font-medium">₦18,000</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                          Paid (Escrow)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">Oct 20, 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View All Transactions
              </Button>
            </div>
          )}
          
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Verification Documents</h3>
                <Button size="sm">
                  Upload New
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium">Identity Verification</h4>
                        <p className="text-xs text-muted-foreground">Uploaded on Oct 10, 2022</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Verified
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium">Farm Location Proof</h4>
                        <p className="text-xs text-muted-foreground">Uploaded on Oct 12, 2022</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Verified
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-medium">Business Registration</h4>
                        <p className="text-xs text-muted-foreground">Not uploaded</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-yellow-50 text-yellow-800 text-sm flex items-start">
                <Shield className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Increase your trust score</p>
                  <p>Upload your business registration documents to unlock premium marketplace features and increase buyer trust.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const TabButton = ({ children, active, onClick, icon }: TabButtonProps) => {
  return (
    <button
      className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
        active 
          ? 'border-primary text-foreground font-medium' 
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
      }`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default Profile;