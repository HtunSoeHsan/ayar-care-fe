import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Search, Sparkles, Upload, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/home/hero-section';
import FeatureSection from '@/components/home/feature-section';
import HowItWorks from '@/components/home/how-it-works';
import Testimonials from '@/components/home/testimonials';
import FaqSection from '@/components/home/faq-section';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Plant Diseases</h2>
          <p className="text-muted-foreground">
            Learn about common plant diseases, their symptoms, and treatments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Powdery Mildew",
              description: "A fungal disease that affects a wide range of plants, appearing as a white or gray powdery coating on leaves.",
              image: "https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            {
              name: "Leaf Spot",
              description: "Circular spots on leaves caused by various fungi. Spots may be yellow, brown, or black with a defined border.",
              image: "https://images.pexels.com/photos/7728057/pexels-photo-7728057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            },
            {
              name: "Tomato Blight",
              description: "A devastating disease that causes dark spots on leaves which quickly enlarge and spread to stems and fruits.",
              image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          ].map((disease, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src={disease.image} 
                  alt={disease.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{disease.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{disease.description}</p>
                <Link href={`/diseases/${disease.name.toLowerCase().replace(/ /g, '-')}`}>
                  <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/diseases">
            <Button variant="outline">View All Diseases</Button>
          </Link>
        </div>
      </section>
      
      <Testimonials />
      <FaqSection />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-muted rounded-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to keep your plants healthy?</h2>
          <p className="text-muted-foreground mb-8">
            Upload a photo of your plant to get instant disease identification and treatment recommendations.
          </p>
          <Link href="/scan">
            <Button size="lg" className="gap-2">
              <Leaf className="h-4 w-4" />
              Scan Your Plant Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
