"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, DownloadCloud, Share2, Leaf, Beaker, Clock, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Medicine {
  name: string;
  active_ingredient: string;
  application: string;
  frequency: string;
  precautions: string;
  waiting_period: string;
  expiry: string;
  avoid: string;
  image: string;
}

interface ScanResultsProps {
  results: {
    disease: {
      name: string;
      confidence: number;
      description: string;
      cause: string;
      medicine?: {
        organic: Medicine[];
        conventional: Medicine[];
      };
      treatment: {
        organic: string[];
        conventional: string[];
      };
      prevention: string[];
    };
  };
  image: string | null;
}

const ScanResults = ({ results, image }: ScanResultsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500/10 text-green-500";
    if (confidence >= 0.7) return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };
  
  const confidenceColor = getConfidenceColor(results.disease.confidence);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Scan Results</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <DownloadCloud className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {image && (
          <div className="border rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={image}
                alt="Analyzed plant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className={confidenceColor}
              >
                {Math.round(results.disease.confidence * 100)}% confidence
              </Badge>
              
              {results.disease.confidence >= 0.85 ? (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  High confidence
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Medium confidence
                </Badge>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{results.disease.name}</h2>
            <p className="text-sm text-muted-foreground">{results.disease.description}</p>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
              <TabsTrigger value="medicine">Medicine</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">Cause</h3>
              <p className="text-sm text-muted-foreground mb-4">{results.disease.cause}</p>
              
              <h3 className="font-medium mb-2">Symptoms</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Brown spots with concentric rings on leaves</li>
                <li>Yellowing around the lesions</li>
                <li>Lower leaves are affected first</li>
                <li>Infected leaves may drop</li>
                <li>Spots may appear on stems and fruits</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="treatment" className="p-4 border rounded-md mt-2">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Organic Treatment</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {results.disease.treatment.organic.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Conventional Treatment</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {results.disease.treatment.conventional.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="medicine" className="mt-2">
              {results.disease.medicine ? (
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        Organic Medicine Options
                      </CardTitle>
                      <CardDescription>Natural treatment solutions with minimal environmental impact</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {results.disease.medicine.organic.map((medicine, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48">
                            <Image 
                              src={medicine.image}
                              alt={medicine.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-2">{medicine.name}</h4>
                            <div className="grid gap-2 text-sm">
                              <p><span className="font-medium">Active Ingredient:</span> {medicine.active_ingredient}</p>
                              <p><span className="font-medium">Application:</span> {medicine.application}</p>
                              <p><span className="font-medium">Frequency:</span> {medicine.frequency}</p>
                              <p><span className="font-medium">Waiting Period:</span> {medicine.waiting_period}</p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">Precautions:</span> {medicine.precautions}</p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">Avoid:</span> {medicine.avoid}</p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p><span className="font-medium">Expiry:</span> {medicine.expiry}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Beaker className="h-5 w-5 text-blue-600" />
                        Conventional Medicine Options
                      </CardTitle>
                      <CardDescription>Chemical-based treatments for severe cases</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {results.disease.medicine.conventional.map((medicine, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48">
                            <Image 
                              src={medicine.image}
                              alt={medicine.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-2">{medicine.name}</h4>
                            <div className="grid gap-2 text-sm">
                              <p><span className="font-medium">Active Ingredient:</span> {medicine.active_ingredient}</p>
                              <p><span className="font-medium">Application:</span> {medicine.application}</p>
                              <p><span className="font-medium">Frequency:</span> {medicine.frequency}</p>
                              <p><span className="font-medium">Waiting Period:</span> {medicine.waiting_period}</p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">Precautions:</span> {medicine.precautions}</p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">Avoid:</span> {medicine.avoid}</p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p><span className="font-medium">Expiry:</span> {medicine.expiry}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">No medicine recommendations available for this condition.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="prevention" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">Prevention Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                {results.disease.prevention.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <Button className="w-full">View Detailed Treatment Guide</Button>
      </div>
    </div>
  );
};

export default ScanResults;