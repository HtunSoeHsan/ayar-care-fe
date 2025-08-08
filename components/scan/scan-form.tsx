"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, Camera } from 'lucide-react';
import ScanResults from '@/components/scan/scan-results';
import { useTranslations } from 'next-intl';

const ScanForm = () => {
  const t = useTranslations('scanForm');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);

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
    
    // Simulate API call to Flask backend
    setTimeout(() => {
      const mockResults = {
        disease: {
          name: "Tomato Early Blight",
          confidence: 0.92,
          description: "Early blight is a fungal disease that affects tomato plants, causing brown spots with concentric rings on leaves, stems, and fruits.",
          cause: "The fungus Alternaria solani causes early blight. It thrives in warm, humid conditions and can overwinter in soil and plant debris.",
          medicine: {
            organic: [
              {
                name: "Neem Oil",
                active_ingredient: "Azadirachtin",
                application: "Foliar spray",
                frequency: "Every 7-14 days",
                precautions: "Apply in early morning or evening. Avoid spraying during hot sunny conditions.",
                waiting_period: "0 days",
                expiry: "2 years from manufacturing date",
                avoid: "Do not apply when temperatures exceed 85°F (29°C)",
                image: "https://images.pexels.com/photos/6231763/pexels-photo-6231763.jpeg"
              },
              {
                name: "Copper Fungicide",
                active_ingredient: "Copper octanoate",
                application: "Mix 0.5-2.0 tablespoons per gallon of water",
                frequency: "Every 7-10 days",
                precautions: "Wear protective equipment. May cause leaf burn if applied in hot weather.",
                waiting_period: "0 days",
                expiry: "3 years from manufacturing date",
                avoid: "Do not mix with other chemicals or apply during rain",
                image: "https://images.pexels.com/photos/5503270/pexels-photo-5503270.jpeg"
              }
            ],
            conventional: [
              {
                name: "Chlorothalonil",
                active_ingredient: "Chlorothalonil",
                application: "Foliar spray",
                frequency: "Every 7-10 days",
                precautions: "Wear protective equipment. Do not apply in windy conditions.",
                waiting_period: "7 days",
                expiry: "4 years from manufacturing date",
                avoid: "Do not apply within 7 days of harvest. Avoid contact with skin and eyes.",
                image: "https://images.pexels.com/photos/6231713/pexels-photo-6231713.jpeg"
              },
              {
                name: "Mancozeb",
                active_ingredient: "Manganese ethylenebis",
                application: "2-3 tablespoons per gallon of water",
                frequency: "Every 7-10 days",
                precautions: "Use protective equipment. Apply in calm conditions.",
                waiting_period: "5 days",
                expiry: "3 years from manufacturing date",
                avoid: "Do not use on crops within 5 days of harvest. Avoid inhalation.",
                image: "https://images.pexels.com/photos/6231715/pexels-photo-6231715.jpeg"
              }
            ]
          },
          treatment: {
            organic: [
              "Remove and destroy infected plant parts",
              "Apply copper-based fungicides",
              "Use neem oil spray once a week",
              "Mulch around plants to prevent soil splash"
            ],
            conventional: [
              "Apply chlorothalonil-based fungicide",
              "Use mancozeb fungicide as directed",
              "Rotate with different fungicides to prevent resistance"
            ]
          },
          prevention: [
            "Practice crop rotation",
            "Space plants for good air circulation",
            "Water at the base of plants to keep foliage dry",
            "Remove plant debris at the end of the season",
            "Use disease-resistant varieties when available"
          ]
        }
      };
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
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
      
      {results && <ScanResults results={results} image={selectedImage} />}
    </div>
  );
};

export default ScanForm;