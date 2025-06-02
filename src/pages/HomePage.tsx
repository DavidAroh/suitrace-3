import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, BarChart, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5913299/pexels-photo-5913299.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="container relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transparent Farm-to-Table Supply Chain
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl opacity-90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Connect farmers directly with buyers through blockchain-verified traceability that builds trust and transforms agriculture.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link to="/marketplace">
                    Explore Marketplace
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  <Link to="/track">
                    Track Products
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <div className="hidden md:block relative">
              <motion.img 
                src="https://images.pexels.com/photos/4946398/pexels-photo-4946398.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Farmer with harvested crops" 
                className="rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <QrCode className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Product Verified</p>
                    <p className="text-xs text-muted-foreground">Farm to table traced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background" ref={observerRef}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforming Agricultural Supply Chains</h2>
            <p className="text-xl text-muted-foreground">
              Our platform bridges the gap between production and consumption with transparent, verified tracking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-10 w-10 text-primary" />}
              title="Verified Authenticity"
              description="Every product on our marketplace is blockchain-verified with its complete history from farm to consumer."
            />
            
            <FeatureCard 
              icon={<Truck className="h-10 w-10 text-primary" />}
              title="Smart Escrow Payments"
              description="Secure payment system only releases funds when delivery is confirmed, protecting both buyers and sellers."
            />
            
            <FeatureCard 
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Supply Chain Analytics"
              description="Gain insights into your supply chain performance with real-time analytics and reporting."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How SuiTrace Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number="01"
              title="List Products"
              description="Farmers and producers list their products on the marketplace with detailed information."
            />
            
            <StepCard 
              number="02"
              title="Secure Transactions"
              description="Buyers place orders with payments held in escrow until delivery is confirmed."
            />
            
            <StepCard 
              number="03"
              title="Tracked Delivery"
              description="Every step of the journey is logged on-chain creating an immutable record."
            />
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link to="/marketplace">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your supply chain?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join hundreds of farmers and buyers already using SuiTrace to create transparent, efficient supply chains.
              </p>
              <Button 
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/register">
                  Join SuiTrace Today
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/6169096/pexels-photo-6169096.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Farmer working with digital tablet" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full p-4">
                <QrCode className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-100 translate-y-8 p-6 rounded-xl border bg-card shadow-sm">
      <div className="p-3 w-fit rounded-full bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-200 translate-y-8 relative">
      <div className="text-6xl font-bold text-primary/10 absolute -top-6 left-0">{number}</div>
      <div className="pt-8 pl-4">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;