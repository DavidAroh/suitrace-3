import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, Search, Map, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// Mock data for the tracking journey
const trackingData = {
  product: {
    id: '1',
    name: 'Organic Yam (50kg)',
    image: 'https://images.pexels.com/photos/5504630/pexels-photo-5504630.jpeg?auto=compress&cs=tinysrgb&w=600',
    batchCode: 'YAM-20241015-KG',
  },
  journey: [
    {
      id: '1',
      stage: 'Harvested',
      location: 'Adamu Farms, Kogi, Nigeria',
      date: 'Oct 15, 2024',
      time: '08:23 AM',
      verifiedBy: 'Adamu Ibrahim (Farmer)',
      notes: 'Harvested during optimal conditions. Soil moisture content: 22%',
      transactionHash: '0x3a8e7f629db1eac9c0a46f8f5918124e3d71311a5cb8115ac52c576a5d15c04b',
      completed: true,
    },
    {
      id: '2',
      stage: 'Quality Inspection',
      location: 'Adamu Farms Processing Center, Kogi',
      date: 'Oct 16, 2024',
      time: '10:45 AM',
      verifiedBy: 'Sarah Johnson (Quality Inspector)',
      notes: 'Passed quality inspection. Size: Medium-Large, No blemishes or damages.',
      transactionHash: '0xd9e5842f83a638a14dc41f5e51dd572b573b429af2b89094b5b4bd205f592609',
      completed: true,
    },
    {
      id: '3',
      stage: 'Packed & Prepared for Transport',
      location: 'Kogi Distribution Center',
      date: 'Oct 17, 2024',
      time: '07:30 AM',
      verifiedBy: 'Michael Okonkwo (Logistics Manager)',
      notes: 'Packed in ventilated bags to maintain freshness. Total weight: 51.3kg',
      transactionHash: '0x7f23bf23a51f2d93186cd7e1df3727a893f3914079d3cd77e28c27746f54ce7a',
      completed: true,
    },
    {
      id: '4',
      stage: 'In Transit',
      location: 'En Route to Lagos Warehouse',
      date: 'Oct 17, 2024',
      time: '09:15 AM',
      verifiedBy: 'Abdul Mohammed (Transporter)',
      notes: 'Expected arrival: Oct 19. Refrigerated transport at 15°C.',
      transactionHash: '0x5a43bc14e8df2ba5be5f45ad61881c8ab7a6da4f7512cede15d8c6ca0b8cf321',
      completed: true,
    },
    {
      id: '5',
      stage: 'Arrived at Warehouse',
      location: 'Lagos Central Distribution Warehouse',
      date: 'Oct 19, 2024',
      time: '02:30 PM',
      verifiedBy: 'Chioma Adeyemi (Warehouse Manager)',
      notes: 'Arrived in good condition. Post-transport quality check passed.',
      transactionHash: '0x8d12f3678a12c9874e2dcafc04c7fb7a947843f8a4b50cfd323e6592c218ffb9',
      completed: false,
    },
    {
      id: '6',
      stage: 'Delivered to Buyer',
      location: 'Lagos, Nigeria',
      date: 'Pending',
      time: 'Pending',
      verifiedBy: 'Pending',
      notes: 'Pending delivery',
      transactionHash: '',
      completed: false,
    },
  ],
  certificates: [
    {
      name: 'Organic Certification',
      issuer: 'Nigerian Organic Agriculture Network',
      date: 'Jan 15, 2024',
      valid: true,
      verificationLink: '#',
    },
    {
      name: 'Food Safety Certification',
      issuer: 'Nigeria Food & Drug Administration',
      date: 'Mar 22, 2024',
      valid: true,
      verificationLink: '#',
    },
  ],
};

const TrackProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('journey');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search for a product by ID/code
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <div className="container py-8">
      <div className="mb-10 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Track Your Product</h1>
        
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Enter product ID or scan QR code"
            className="w-full h-12 pl-12 pr-4 rounded-lg border bg-background shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-md px-3 py-1 text-sm"
          >
            Track
          </button>
        </form>
        
        <div className="flex items-center justify-center mt-3">
          <button className="flex items-center text-sm text-primary">
            <QrCode className="h-4 w-4 mr-1" />
            Scan QR Code
          </button>
          <span className="mx-3 text-muted-foreground">or</span>
          <button className="flex items-center text-sm text-primary">
            <Map className="h-4 w-4 mr-1" />
            View Demo
          </button>
        </div>
      </div>
      
      {id && (
        <>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <img 
                    src={trackingData.product.image} 
                    alt={trackingData.product.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{trackingData.product.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Batch Code</p>
                      <p className="font-medium">{trackingData.product.batchCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Status</p>
                      <div className="flex items-center">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          In Transit
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-medium">Kogi, Nigeria</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">Oct 17, 2024 (09:15 AM)</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l pl-6 hidden md:block">
                  <QRCodeSVG
                    value={`https://suitrace.app/track/${trackingData.product.batchCode}`}
                    size={100}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t flex items-center">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium text-sm">Blockchain Verified with Sui</span>
                <button className="ml-3 text-xs text-primary underline">View on Explorer</button>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-1 mb-6 border-b">
              <TabButton 
                active={activeTab === 'journey'} 
                onClick={() => setActiveTab('journey')}
              >
                Supply Chain Journey
              </TabButton>
              <TabButton 
                active={activeTab === 'certificates'} 
                onClick={() => setActiveTab('certificates')}
              >
                Certificates
              </TabButton>
              <TabButton 
                active={activeTab === 'details'} 
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </TabButton>
            </div>
            
            <div className="tab-content">
              {activeTab === 'journey' && (
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Follow the journey of this product from farm to table, with each step verified on the Sui blockchain.
                  </p>
                  
                  <div className="space-y-8">
                    {trackingData.journey.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className={`relative pl-8 ${!step.completed ? 'opacity-50' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: step.completed ? 1 : 0.5, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Vertical line */}
                        {index < trackingData.journey.length - 1 && (
                          <div 
                            className={`absolute left-4 top-4 w-0.5 h-[calc(100%+2rem)] -z-10 ${
                              step.completed ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        )}
                        
                        {/* Status circle */}
                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{step.stage}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{step.location}</p>
                              <div className="mt-2 text-sm">
                                <span className="font-medium">{step.date}</span>
                                <span className="mx-2">•</span>
                                <span>{step.time}</span>
                              </div>
                            </div>
                            
                            {step.completed && (
                              <div className="text-right">
                                <div className="text-xs text-muted-foreground">Verified by</div>
                                <div className="font-medium text-sm">{step.verifiedBy}</div>
                              </div>
                            )}
                          </div>
                          
                          {step.notes && (
                            <div className="mt-3 pt-3 border-t text-sm">
                              <p className="text-muted-foreground">{step.notes}</p>
                            </div>
                          )}
                          
                          {step.transactionHash && (
                            <div className="mt-3 text-xs flex items-center">
                              <span className="text-muted-foreground mr-1">Transaction:</span>
                              <a 
                                href={`https://explorer.sui.io/txblock/${step.transactionHash}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary truncate hover:underline"
                              >
                                {step.transactionHash.substring(0, 14)}...
                                {step.transactionHash.substring(step.transactionHash.length - 10)}
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'certificates' && (
                <div>
                  <p className="text-muted-foreground mb-6">
                    View the certificates and credentials associated with this product and its producer.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trackingData.certificates.map((cert, index) => (
                      <div 
                        key={index}
                        className="rounded-xl border bg-card p-6 shadow-sm"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-primary/10 rounded-full mr-4">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Issue Date</p>
                            <p className="font-medium">{cert.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-medium text-green-600">
                              {cert.valid ? 'Valid' : 'Expired'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a 
                              href={cert.verificationLink} 
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Verify Certificate <ArrowRight className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <p className="text-muted-foreground mb-6">
                    Detailed information about this product, including specifications, handling instructions, and more.
                  </p>
                  
                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Product Name</h3>
                        <p className="font-medium">Organic Yam</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Variety</h3>
                        <p className="font-medium">White Yam (Dioscorea rotundata)</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Harvest Date</h3>
                        <p className="font-medium">October 15, 2024</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
                        <p className="font-medium">Approximately 50kg per bag</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Certification</h3>
                        <p className="font-medium">Organic Certified</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Storage</h3>
                        <p className="font-medium">Store in a cool, dry place</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Producer</h3>
                        <p className="font-medium">Adamu Farms, Kogi State</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Batch Size</h3>
                        <p className="font-medium">200 bags (10,000kg total)</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-2">Product Description</h3>
                      <p className="text-muted-foreground">
                        Premium organic yam harvested from our farm in Kogi State. These yams are grown without chemical fertilizers or pesticides, ensuring the highest quality and taste. Each batch is carefully selected to ensure uniformity and quality.
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-2">Handling Instructions</h3>
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Store in a cool, dry place away from direct sunlight</li>
                        <li>Optimal storage temperature: 14-16°C (57-61°F)</li>
                        <li>Keep in ventilated containers to prevent moisture buildup</li>
                        <li>Expected shelf life: 2-3 months if stored properly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => {
  return (
    <button
      className={`px-4 py-2 border-b-2 transition-colors ${
        active 
          ? 'border-primary text-foreground font-medium' 
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TrackProduct;