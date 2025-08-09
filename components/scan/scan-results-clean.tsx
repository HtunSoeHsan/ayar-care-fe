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
import { useTranslations } from 'next-intl';
import { getLocalizedProperty } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { DiseaseResult } from '@/lib/api-service';

interface ScanResultsProps {
  results: DiseaseResult;
  image: string | null;
}

const ScanResults = ({ results, image }: ScanResultsProps) => {
  const t = useTranslations('scanResults');
  const tMedicine = useTranslations('scanResults.medicine');
  const tTreatment = useTranslations('scanResults.treatment');
  const tPrevention = useTranslations('scanResults.prevention');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("overview");

  if (!results.disease) {
    return (
      <div className="space-y-6">
        <div className="p-4 border rounded-lg text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-green-700">Plant is Healthy!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No diseases detected in your plant. Keep up the good care!
          </p>
        </div>
      </div>
    );
  }

  const disease = results.disease;
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500/10 text-green-500";
    if (confidence >= 0.7) return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };
  
  const confidenceColor = getConfidenceColor(results.confidence);
  const confidencePercent = Math.round(results.confidence * 100);

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
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={confidenceColor}
              >
                {confidencePercent}% {t('confidence')}
              </Badge>
              
              {results.confidence >= 0.85 ? (
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
            
            <h2 className="text-2xl font-bold mb-1">
              {getLocalizedProperty(disease.name, locale)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {getLocalizedProperty(disease.description, locale)}
            </p>
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
              <p className="text-sm text-muted-foreground mb-4">
                {getLocalizedProperty(disease.cause, locale)}
              </p>
              
              <h3 className="font-medium mb-2">{t('symptoms')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                {disease.symptoms && disease.symptoms.map((symptom, index) => (
                  <li key={index}>{getLocalizedProperty(symptom, locale)}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="treatment" className="p-4 border rounded-md mt-2">
              <div className="mb-4">
                <h3 className="font-medium mb-2">{tTreatment('organic')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {disease.treatment.organic.map((item, index) => (
                    <li key={index}>{getLocalizedProperty(item, locale)}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">{tTreatment('conventional')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {disease.treatment.conventional.map((item, index) => (
                    <li key={index}>{getLocalizedProperty(item, locale)}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="medicine" className="mt-2">
              {disease.medicine ? (
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
                      {disease.medicine.organic.map((medicine, index) => (
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
                            <h4 className="font-medium mb-2">
                              {getLocalizedProperty(medicine.name, locale)}
                            </h4>
                            <div className="grid gap-2 text-sm">
                              <p>
                                <span className="font-medium">{tMedicine('activeIngredient')}:</span>{' '}
                                {getLocalizedProperty(medicine.active_ingredient, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('application')}:</span>{' '}
                                {getLocalizedProperty(medicine.application, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('frequency')}:</span>{' '}
                                {getLocalizedProperty(medicine.frequency, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('waitingPeriod')}:</span>{' '}
                                {getLocalizedProperty(medicine.waiting_period, locale)}
                              </p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>
                                  <span className="font-medium">{tMedicine('precautions')}:</span>{' '}
                                  {getLocalizedProperty(medicine.precautions, locale)}
                                </p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>
                                  <span className="font-medium">{tMedicine('avoid')}:</span>{' '}
                                  {getLocalizedProperty(medicine.avoid, locale)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p>
                                  <span className="font-medium">{tMedicine('expiry')}:</span>{' '}
                                  {getLocalizedProperty(medicine.expiry, locale)}
                                </p>
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
                      {disease.medicine.conventional.map((medicine, index) => (
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
                            <h4 className="font-medium mb-2">
                              {getLocalizedProperty(medicine.name, locale)}
                            </h4>
                            <div className="grid gap-2 text-sm">
                              <p>
                                <span className="font-medium">{tMedicine('activeIngredient')}:</span>{' '}
                                {getLocalizedProperty(medicine.active_ingredient, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('application')}:</span>{' '}
                                {getLocalizedProperty(medicine.application, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('frequency')}:</span>{' '}
                                {getLocalizedProperty(medicine.frequency, locale)}
                              </p>
                              <p>
                                <span className="font-medium">{tMedicine('waitingPeriod')}:</span>{' '}
                                {getLocalizedProperty(medicine.waiting_period, locale)}
                              </p>
                              <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>
                                  <span className="font-medium">{tMedicine('precautions')}:</span>{' '}
                                  {getLocalizedProperty(medicine.precautions, locale)}
                                </p>
                              </div>
                              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>
                                  <span className="font-medium">{tMedicine('avoid')}:</span>{' '}
                                  {getLocalizedProperty(medicine.avoid, locale)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Clock className="h-4 w-4" />
                                <p>
                                  <span className="font-medium">{tMedicine('expiry')}:</span>{' '}
                                  {getLocalizedProperty(medicine.expiry, locale)}
                                </p>
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
                {disease.prevention.map((item, index) => (
                  <li key={index}>{getLocalizedProperty(item, locale)}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <Button className="w-full">{t('viewDetailedGuide')}</Button>
      </div>
    </div>
  );
};

export default ScanResults;
