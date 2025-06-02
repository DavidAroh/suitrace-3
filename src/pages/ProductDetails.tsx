import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  TruckIcon,
  User,
  QrCode,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Mock product data for demonstration
const product = {
  id: '1',
  title: 'Organic Yam (50kg)',
  location: 'Kogi, Nigeria',
  price: '₦15,000',
  rating: 4.8,
  reviews: 24,
  images: [
    'https://images.pexels.com/photos/5504630/pexels-photo-5504630.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2608300/pexels-photo-2608300.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7728606/pexels-photo-7728606.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  seller: {
    name: 'Adamu Farms',
    rating: 4.9,
    verified: true,
    location: 'Kogi, Nigeria',
    yearJoined: 2022,
    image: 'https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  category: 'Fresh Crops',
  tags: ['Organic', 'Verified'],
  description: 'Premium organic yam harvested from our farm in Kogi State. These yams are grown without chemical fertilizers or pesticides, ensuring the highest quality and taste. Each batch is carefully selected to ensure uniformity and quality.',
  details: [
    { label: 'Variety', value: 'White Yam (Dioscorea rotundata)' },
    { label: 'Harvest Date', value: 'October 15, 2024' },
    { label: 'Weight', value: 'Approximately 50kg per bag' },
    { label: 'Certification', value: 'Organic Certified' },
    { label: 'Storage', value: 'Store in a cool, dry place' }
  ],
  supplyChain: [
    { status: 'Harvested', date: 'Oct 15, 2024', location: 'Kogi Farm', completed: true },
    { status: 'Quality Checked', date: 'Oct 16, 2024', location: 'Kogi Processing Center', completed: true },
    { status: 'In Transit', date: 'Oct 17, 2024', location: 'En Route to Lagos Warehouse', completed: true },
    { status: 'Arrived at Warehouse', date: 'Oct 19, 2024', location: 'Lagos Warehouse', completed: false },
    { status: 'Ready for Delivery', date: 'Pending', location: 'Lagos Warehouse', completed: false }
  ],
  traceable: true
};

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.title} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
    });
  };
  
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">{product.title}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl border mb-4">
            <motion.img
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={product.title}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {product.traceable && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-md flex items-center shadow-sm">
                <QrCode className="h-5 w-5 text-primary mr-2" />
                <span className="text-xs font-medium">Blockchain Verified</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border transition-all ${
                  selectedImage === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="mt-2 flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{product.location}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{product.rating}</span>
              <span className="ml-1 text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-3xl font-bold">{product.price}</p>
            <p className="text-sm text-muted-foreground mt-1">Includes delivery & handling</p>
          </div>
          
          {/* Seller Info */}
          <div className="mt-6 flex items-center p-4 rounded-lg border">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img 
                src={product.seller.image} 
                alt={product.seller.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h3 className="font-medium">{product.seller.name}</h3>
                {product.seller.verified && (
                  <div className="ml-2 rounded-full bg-primary/10 p-1">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex items-center text-sm">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="ml-1">{product.seller.rating}</span>
                <span className="mx-1">•</span>
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="ml-1 text-muted-foreground">Since {product.seller.yearJoined}</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" asChild>
              <Link to={`/seller/${product.seller.name.toLowerCase().replace(' ', '-')}`}>
                View Profile
              </Link>
            </Button>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <label htmlFor="quantity" className="text-sm mr-3">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border bg-transparent px-3 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-muted-foreground">Available: 10</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button 
                size="lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
          
          {/* Product Information */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Product Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
              {product.details.map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{detail.label}</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Supply Chain Tracking */}
      <section className="mt-16 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Supply Chain Journey</h2>
          <Button variant="outline" asChild>
            <Link to={`/track/${id}`}>
              Detailed Tracking <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="relative p-6 border rounded-xl bg-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
            {product.supplyChain.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`supply-chain-node ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {getStatusIcon(step.status, step.completed)}
                </div>
                <h3 className="mt-2 font-medium">{step.status}</h3>
                <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                <p className="text-xs text-muted-foreground">{step.location}</p>
                
                {index < product.supplyChain.length - 1 && (
                  <div className={`hidden md:block supply-chain-connector absolute left-0 right-0 top-10 -z-10 ${
                    step.completed ? 'completed' : ''
                  }`}
                  style={{
                    left: `${(100 / (product.supplyChain.length - 1)) * index + (100 / (product.supplyChain.length * 2))}%`,
                    width: `${100 / (product.supplyChain.length - 1)}%`
                  }}
                  />
                )}
              </div>
            ))}
          </div>
          
          {!product.supplyChain.every(step => step.completed) && (
            <div className="mt-6 flex items-center p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              This product is currently in transit. Track its journey in real-time.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Helper function to get icon based on status
function getStatusIcon(status: string, completed: boolean) {
  if (!completed) {
    return <div className="h-4 w-4 bg-white/50 rounded-full" />;
  }
  
  switch (status) {
    case 'Harvested':
      return <Calendar className="h-4 w-4" />;
    case 'Quality Checked':
      return <ShieldCheck className="h-4 w-4" />;
    case 'In Transit':
      return <TruckIcon className="h-4 w-4" />;
    case 'Arrived at Warehouse':
      return <MapPin className="h-4 w-4" />;
    case 'Ready for Delivery':
      return <QrCode className="h-4 w-4" />;
    default:
      return <div className="h-4 w-4 bg-white rounded-full" />;
  }
}

export default ProductDetails;