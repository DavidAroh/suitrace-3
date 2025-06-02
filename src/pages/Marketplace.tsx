import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mocked product data
const PRODUCTS = [
  {
    id: '1',
    title: 'Organic Yam (50kg)',
    location: 'Kogi, Nigeria',
    price: '₦15,000',
    rating: 4.8,
    reviews: 24,
    image: 'https://images.pexels.com/photos/5504630/pexels-photo-5504630.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Adamu Farms',
    category: 'Fresh Crops',
    tags: ['Organic', 'Verified'],
  },
  {
    id: '2',
    title: 'Premium Shea Butter (100 jars)',
    location: 'Kaduna, Nigeria',
    price: '₦80,000',
    rating: 4.5,
    reviews: 18,
    image: 'https://images.pexels.com/photos/6694216/pexels-photo-6694216.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Women\'s Shea Cooperative',
    category: 'Processed Goods',
    tags: ['Natural', 'Fair Trade'],
  },
  {
    id: '3',
    title: 'Fresh Cassava (200kg)',
    location: 'Enugu, Nigeria',
    price: '₦20,000',
    rating: 4.7,
    reviews: 32,
    image: 'https://images.pexels.com/photos/5528687/pexels-photo-5528687.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Eko Farms',
    category: 'Fresh Crops',
    tags: ['Seasonal', 'Verified'],
  },
  {
    id: '4',
    title: 'Dried Ginger (25kg)',
    location: 'Plateau, Nigeria',
    price: '₦35,000',
    rating: 4.9,
    reviews: 45,
    image: 'https://images.pexels.com/photos/2035747/pexels-photo-2035747.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Highland Spices',
    category: 'Processed Goods',
    tags: ['Organic', 'Export Quality'],
  },
  {
    id: '5',
    title: 'Palm Oil (50 liters)',
    location: 'Cross River, Nigeria',
    price: '₦45,000',
    rating: 4.6,
    reviews: 29,
    image: 'https://images.pexels.com/photos/4828501/pexels-photo-4828501.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Green Palm Cooperative',
    category: 'Processed Goods',
    tags: ['Sustainable', 'Chemical-free'],
  },
  {
    id: '6',
    title: 'Fresh Tomatoes (100kg)',
    location: 'Kano, Nigeria',
    price: '₦18,000',
    rating: 4.4,
    reviews: 16,
    image: 'https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600',
    seller: 'Northern Farms',
    category: 'Fresh Crops',
    tags: ['Seasonal', 'Verified'],
  },
];

// Categories
const CATEGORIES = [
  'All Products',
  'Fresh Crops',
  'Processed Goods',
  'Dairy & Livestock',
  'Seeds & Inputs',
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  
  // Filter products based on search query and selected category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Marketplace</h1>
        <Button asChild variant="outline">
          <Link to="/sell">List New Product</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products or farmers..."
              className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Other filters */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </h3>
            {/* Price range, location, ratings filters could go here */}
            <div className="rounded-md border border-dashed p-4">
              <p className="text-sm text-muted-foreground text-center">
                Advanced filters coming soon
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
            <select
              className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option>Sort: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium mb-4">No products found</p>
                <p className="text-muted-foreground text-center mb-6">
                  We couldn't find any products matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Products');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    location: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
    seller: string;
    category: string;
    tags: string[];
  };
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      className="product-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {product.tags.map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <Link to={`/product/${product.id}`}>
        <h3 className="font-semibold truncate hover:text-primary transition-colors">
          {product.title}
        </h3>
      </Link>
      
      <div className="mt-1 flex items-center text-sm">
        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className="text-muted-foreground">{product.location}</span>
      </div>
      
      <div className="mt-2 flex items-center text-sm">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-medium">{product.rating}</span>
          <span className="ml-1 text-muted-foreground">({product.reviews})</span>
        </div>
        <span className="mx-2 text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{product.seller}</span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="font-semibold text-lg">{product.price}</p>
        <Button size="sm">View Details</Button>
      </div>
    </motion.div>
  );
};

export default Marketplace;