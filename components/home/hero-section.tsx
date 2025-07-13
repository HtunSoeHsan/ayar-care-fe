import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)"
        }}
      />
      <div className="relative z-10 container py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit backdrop-blur-sm">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Plant Disease Detection & Treatment</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Keep Your Plants Healthy with AI-Powered Disease Detection
          </h1>
          
          <p className="text-lg text-gray-200 mb-8 max-w-2xl">
            Upload a photo of your plant, and our advanced AI will instantly identify diseases and provide treatment recommendations to keep your garden thriving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/scan">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Start Scanning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="gap-2 bg-background/30 hover:bg-background/50 backdrop-blur-sm border-white/30 text-white w-full sm:w-auto">
                Explore Healthy Foods
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;