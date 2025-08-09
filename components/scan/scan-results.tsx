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
import { CheckCircle2, AlertTriangle, DownloadCloud, Share2, Leaf, Beaker, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from 'next-intl';
import { getLocalizedProperty } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { DiseaseResult, MultilingualText } from '@/lib/api-service';

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

interface DetectedDisease {
  classIndex: number;
  name: string;
  description: string;
  symptoms?: string[];
  plantType?: string;
  treatments?: {
    name: string;
    description: string;
    steps: string[];
  }[];
  detection: {
    confidence: string;
    imageUrl?: string;
    detectedAt?: Date;
  };
  prevention?: string[];
  cause?: string;
  medicine?: {
    organic: Medicine[];
    conventional: Medicine[];
  };
  treatment?: {
    organic: string[];
    conventional: string[];
  };
}

interface ScanResultsProps {
  results: {
    data?: DetectedDisease[];
    disease?: {
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
  const t = useTranslations('scanResults');
  const tMedicine = useTranslations('scanResults.medicine');
  const tTreatment = useTranslations('scanResults.treatment');
  const tPrevention = useTranslations('scanResults.prevention');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDisease, setSelectedDisease] = useState<DetectedDisease | null>(null);
  
  // Handle multiple disease format or single disease format
  const diseases = results.data || [];
  const legacyDisease = results.disease;
  
  // Set the first disease as selected by default if available and no selection yet
  useState(() => {
    if (!selectedDisease && diseases.length > 0) {
      setSelectedDisease(diseases[0]);
    }
  });
  
  const getConfidenceColor = (confidence: number | string) => {
    const numConfidence = typeof confidence === 'string' ? parseFloat(confidence) : confidence;
    if (numConfidence >= 0.9) return "bg-green-500/10 text-green-500";
    if (numConfidence >= 0.7) return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };
  
  const getConfidenceText = (confidence: number | string) => {
    if (typeof confidence === 'string') {
      return confidence;
    }
    return `${Math.round(confidence * 100)}%`;
  };
  
  // Get the current disease to display
  const currentDisease = selectedDisease || (legacyDisease ? {
    name: legacyDisease.name,
    description: legacyDisease.description,
    detection: { confidence: `${legacyDisease.confidence}` },
    cause: legacyDisease.cause,
    medicine: legacyDisease.medicine,
    treatment: legacyDisease.treatment,
    prevention: legacyDisease.prevention
  } : null);
  
  const confidenceColor = currentDisease ? 
    getConfidenceColor(currentDisease.detection?.confidence || legacyDisease?.confidence || 0) : 
    "bg-gray-500/10 text-gray-500";
  
  // Localize disease name and description
  const localizedDiseaseName = getLocalizedProperty(results.disease.name, locale);
  const localizedDiseaseDescription = getLocalizedProperty(results.disease.description, locale);
  const localizedDiseaseCause = getLocalizedProperty(results.disease.cause, locale);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t('title')}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            {t('share')}
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <DownloadCloud className="h-4 w-4" />
            {t('save')}
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
<<<<<<< Updated upstream
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={confidenceColor}
              >
                {Math.round(results.disease.confidence * 100)}% {t('confidence')}
              </Badge>
              
              {results.disease.confidence >= 0.85 ? (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {t('highConfidence')}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {t('mediumConfidence')}
                </Badge>
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{localizedDiseaseName}</h2>
            <p className="text-sm text-muted-foreground">{localizedDiseaseDescription}</p>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="treatment">{tTreatment('title')}</TabsTrigger>
              <TabsTrigger value="medicine">{tMedicine('title')}</TabsTrigger>
              <TabsTrigger value="prevention">{tPrevention('title')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">{t('cause')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{localizedDiseaseCause}</p>
              
              <h3 className="font-medium mb-2">{t('symptoms')}</h3>
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
                <h3 className="font-medium mb-2">{tTreatment('organic')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {results.disease.treatment.organic.map((item, index) => (
                    <li key={index}>{getLocalizedProperty(item, locale)}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">{tTreatment('conventional')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {results.disease.treatment.conventional.map((item, index) => (
                    <li key={index}>{getLocalizedProperty(item, locale)}</li>
                  ))}
=======
          {/* Top 5 results list */}
          {diseases.length > 0 && (
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3">Top Detection Results</h3>
              <div className="space-y-2">
                {diseases.slice(0, 5).map((disease, index) => {
                  const isSelected = selectedDisease && disease.classIndex === selectedDisease.classIndex;
                  const confidence = parseFloat(disease.detection.confidence);
                  const confidenceClass = getConfidenceColor(confidence);
                  
                  return (
                    <div 
                      key={disease.classIndex} 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''}`}
                      onClick={() => setSelectedDisease(disease)}
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={confidenceClass}>
                          {getConfidenceText(disease.detection.confidence)}
                        </Badge>
                        <span className="font-medium">{disease.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Selected disease details */}
          {currentDisease && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="outline" 
                  className={confidenceColor}
                >
                  {getConfidenceText(currentDisease.detection?.confidence || legacyDisease?.confidence || 0)} confidence
                </Badge>
                
                {parseFloat(currentDisease.detection?.confidence || '0') >= 0.85 || (legacyDisease && legacyDisease.confidence >= 0.85) ? (
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
              
              <h2 className="text-2xl font-bold mb-1">{currentDisease.name}</h2>
              <p className="text-sm text-muted-foreground">{currentDisease.description}</p>
            </div>
          )}
          
          {currentDisease && (
            <Tabs defaultValue="overview" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
                <TabsTrigger value="medicine">Medicine</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="p-4 border rounded-md mt-2">
                {currentDisease.cause && (
                  <>
                    <h3 className="font-medium mb-2">Cause</h3>
                    <p className="text-sm text-muted-foreground mb-4">{currentDisease.cause}</p>
                  </>
                )}
                
                <h3 className="font-medium mb-2">Symptoms</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {currentDisease.symptoms ? (
                    currentDisease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))
                  ) : (
                    <>
                      <li>Brown spots with concentric rings on leaves</li>
                      <li>Yellowing around the lesions</li>
                      <li>Lower leaves are affected first</li>
                      <li>Infected leaves may drop</li>
                      <li>Spots may appear on stems and fruits</li>
                    </>
                  )}
>>>>>>> Stashed changes
                </ul>
              </TabsContent>
              
              <TabsContent value="treatment" className="p-4 border rounded-md mt-2">
                {currentDisease.treatment && (
                  <>
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Organic Treatment</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        {currentDisease.treatment.organic.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Conventional Treatment</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        {currentDisease.treatment.conventional.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                
                {currentDisease.treatments && (
                  <div>
                    {currentDisease.treatments.map((treatment, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-medium mb-2">{treatment.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{treatment.description}</p>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                          {treatment.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

            <TabsContent value="medicine" className="mt-2">
              {currentDisease?.medicine ? (
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        {tMedicine('organicOptions')}
                      </CardTitle>
                      <CardDescription>{tMedicine('organicDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {currentDisease.medicine.organic.map((medicine, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={medicine.image}
                              alt={getLocalizedProperty(medicine.name, locale)}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-2">{getLocalizedProperty(medicine.name, locale)}</h4>
                            <div className="grid gap-2 text-sm">
                              <p><span className="font-medium">{tMedicine('activeIngredient')}:</span> {getLocalizedProperty(medicine.active_ingredient, locale)}</p>
                              <p><span className="font-medium">{tMedicine('application')}:</span> {getLocalizedProperty(medicine.application, locale)}</p>
                              <p><span className="font-medium">{tMedicine('frequency')}:</span> {getLocalizedProperty(medicine.frequency, locale)}</p>
                              <p><span className="font-medium">{tMedicine('waitingPeriod')}:</span> {getLocalizedProperty(medicine.waiting_period, locale)}</p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">{tMedicine('precautions')}:</span> {getLocalizedProperty(medicine.precautions, locale)}</p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">{tMedicine('avoid')}:</span> {getLocalizedProperty(medicine.avoid, locale)}</p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p><span className="font-medium">{tMedicine('expiry')}:</span> {getLocalizedProperty(medicine.expiry, locale)}</p>
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
                        {tMedicine('conventionalOptions')}
                      </CardTitle>
                      <CardDescription>{tMedicine('conventionalDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {currentDisease.medicine.conventional.map((medicine, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={medicine.image}
                              alt={getLocalizedProperty(medicine.name, locale)}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-2">{getLocalizedProperty(medicine.name, locale)}</h4>
                            <div className="grid gap-2 text-sm">
                              <p><span className="font-medium">{tMedicine('activeIngredient')}:</span> {getLocalizedProperty(medicine.active_ingredient, locale)}</p>
                              <p><span className="font-medium">{tMedicine('application')}:</span> {getLocalizedProperty(medicine.application, locale)}</p>
                              <p><span className="font-medium">{tMedicine('frequency')}:</span> {getLocalizedProperty(medicine.frequency, locale)}</p>
                              <p><span className="font-medium">{tMedicine('waitingPeriod')}:</span> {getLocalizedProperty(medicine.waiting_period, locale)}</p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">{tMedicine('precautions')}:</span> {getLocalizedProperty(medicine.precautions, locale)}</p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p><span className="font-medium">{tMedicine('avoid')}:</span> {getLocalizedProperty(medicine.avoid, locale)}</p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p><span className="font-medium">{tMedicine('expiry')}:</span> {getLocalizedProperty(medicine.expiry, locale)}</p>
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
                  <p className="text-sm text-muted-foreground">{tMedicine('noRecommendations')}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="prevention" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium mb-2">{tPrevention('tips')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
<<<<<<< Updated upstream
                {results.disease.prevention.map((item, index) => (
                  <li key={index}>{getLocalizedProperty(item, locale)}</li>
                ))}
=======
                {currentDisease.prevention ? currentDisease.prevention.map((item, index) => (
                  <li key={index}>{item}</li>
                )) : (
                  <li>No prevention tips available for this condition.</li>
                )}
>>>>>>> Stashed changes
              </ul>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <Button className="w-full">{t('viewDetailedGuide')}</Button>
      </div>
    </div>
  );
};

export default ScanResults;