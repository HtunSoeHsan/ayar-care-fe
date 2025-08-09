"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, Camera, AlertCircle } from 'lucide-react';
import ScanResults from '@/components/scan/scan-results-clean';
import { useTranslations } from 'next-intl';
import { ApiService, DiseaseResult } from '@/lib/api-service';

const ScanForm = () => {
  const t = useTranslations('scanForm');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setResults(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResults(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await ApiService.scanPlant(imageFile);
      setResults(result);
    } catch (error: any) {
      console.error('Error during plant scan:', error);
      setError(error.message || 'Failed to analyze plant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plant-image">{t('uploadPlantImage')}</Label>
          
          {!selectedImage ? (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Input
                id="plant-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Label
                htmlFor="plant-image"
                className="flex flex-col items-center justify-center h-32 cursor-pointer"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  {t('dragAndDrop')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('supportedFormats')}
                </p>
              </Label>
              
              <div className="mt-4 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("plant-image")?.click()}
                  className="gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {t('selectImage')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage}
                  alt={t('selectedPlant')}
                  fill
                  className="object-cover"
                />
              </div>
              
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {selectedImage && !results && (
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('analyzingImage')}
              </>
            ) : (
              t('analyzePlant')
            )}
          </Button>
        )}
      </form>
      
      {error && (
        <div className="flex items-center gap-2 p-4 border border-destructive/20 bg-destructive/10 rounded-lg text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {results && <ScanResults results={results} image={selectedImage} />}
    </div>
  );
};

export default ScanForm;