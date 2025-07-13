import ScanForm from '@/components/scan/scan-form';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Leaf } from 'lucide-react';

export default function ScanPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Scan Your Plant</h1>
        <p className="text-muted-foreground">
          Upload a photo of your plant to identify diseases and get treatment recommendations.
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
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">Tips for Better Scan Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Clear Photos
            </h3>
            <p className="text-sm text-muted-foreground">
              Take well-lit, in-focus photos that clearly show the affected parts of the plant.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Multiple Angles
            </h3>
            <p className="text-sm text-muted-foreground">
              Capture different angles of the symptoms to provide more data for accurate diagnosis.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Include Context
            </h3>
            <p className="text-sm text-muted-foreground">
              When possible, include some healthy parts of the plant for comparison.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto border-t pt-12 mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">What to Expect</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Disease Identification</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI system will analyze your photo and identify the most likely plant disease, including the confidence level of the diagnosis.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Disease Information</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive detailed information about the identified disease, including causes, symptoms, and lifecycle.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Treatment Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get customized treatment plans with both organic and conventional options to combat the disease effectively.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mt-1">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Prevention Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to prevent the disease from recurring or spreading to other plants in your garden.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 h-[400px] rounded-lg overflow-hidden border">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <img 
              src="https://images.pexels.com/photos/6231713/pexels-photo-6231713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Plant disease analysis"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <p className="text-sm font-medium text-center">
                Make data-driven decisions to keep your plants healthy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}