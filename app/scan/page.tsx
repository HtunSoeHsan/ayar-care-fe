import ScanForm from '@/components/scan/scan-form';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ScanPage() {
  const t = useTranslations('scan');
  const tTips = useTranslations('scan.tips');
  const tExpectations = useTranslations('scan.expectations');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <ScanForm />
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto border-t pt-12 mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">{tTips('title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              {tTips('clearPhotos.title')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tTips('clearPhotos.description')}
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              {tTips('multipleAngles.title')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tTips('multipleAngles.description')}
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              {tTips('includeContext.title')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tTips('includeContext.description')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto border-t pt-12 mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">{tExpectations('title')}</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{tExpectations('diseaseIdentification.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tExpectations('diseaseIdentification.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{tExpectations('diseaseInformation.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tExpectations('diseaseInformation.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{tExpectations('treatmentRecommendations.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tExpectations('treatmentRecommendations.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{tExpectations('preventionTips.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {tExpectations('preventionTips.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 h-[400px] rounded-lg overflow-hidden border">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <Image
              src="https://images.pexels.com/photos/6231713/pexels-photo-6231713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Plant disease analysis"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <p className="text-sm font-medium text-center">
                {tExpectations('dataDrivenDecisions')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}