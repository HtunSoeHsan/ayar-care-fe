import Link from 'next/link';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/hero-section';
import FeatureSection from '@/components/home/feature-section';
import HowItWorks from '@/components/home/how-it-works';
import Testimonials from '@/components/home/testimonials';
import FaqSection from '@/components/home/faq-section';

export default function Home() {
  const t = useTranslations(); // Namespace for 'home'
  const tDiseases = useTranslations('home.diseases'); // Namespace for 'home.diseases'

  // Define diseases with translation keys
  const diseases = [
    {
      name: tDiseases('powderyMildew'),
      description: tDiseases('powderyMildewDesc'),
      key: 'powdery-mildew',
      image: 'https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: tDiseases('leafSpot'),
      description: tDiseases('leafSpotDesc'),
      key: 'leaf-spot',
      image: 'https://images.pexels.com/photos/7728057/pexels-photo-7728057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: tDiseases('tomatoBlight'),
      description: tDiseases('tomatoBlightDesc'),
      key: 'tomato-blight',
      image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('home.popularDiseases')}</h2>
          <p className="text-muted-foreground">{t('home.learnAboutDiseases')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
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
                <Link href={`/diseases/${disease.key}`}>
                  <Button variant="outline" size="sm" className="w-full">{t('home.learnMore')}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/diseases">
            <Button variant="outline">{t('home.viewAllDiseases')}</Button>
          </Link>
        </div>
      </section>
      
      <Testimonials />
      <FaqSection />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-muted rounded-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('home.keepPlantsHealthy')}</h2>
          <p className="text-muted-foreground mb-8">{t('home.uploadPlantPhoto')}</p>
          <Link href="/scan">
            <Button size="lg" className="gap-2">
              <Leaf className="h-4 w-4" />
              {t('home.scanPlantNow')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}