/**
 * API service for interacting with the backend Flask API
 */

// Define the base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Multilingual object interface
export interface MultilingualText {
  en: string;
  mm: string;
}

// Medicine interface
export interface Medicine {
  name: MultilingualText;
  active_ingredient: MultilingualText;
  application: MultilingualText;
  frequency: MultilingualText;
  precautions: MultilingualText;
  waiting_period: MultilingualText;
  expiry: MultilingualText;
  avoid: MultilingualText;
  image: string;
}

// Plant disease scan result interface
export interface DiseaseResult {
  status: 'healthy' | 'diseased';
  disease?: {
    name: MultilingualText;
    scientific_name: MultilingualText;
    description: MultilingualText;
    cause: MultilingualText;
    treatment: {
      organic: MultilingualText[];
      conventional: MultilingualText[];
    };
    prevention: MultilingualText[];
    severity: MultilingualText;
    spread_rate: MultilingualText;
    symptoms: MultilingualText[];
    medicine?: {
      organic: Medicine[];
      conventional: Medicine[];
    };
  };
  confidence: number;
  message?: MultilingualText;
  timestamp: string;
  filename: string;
}

// Plant care guide interface
export interface PlantCareGuide {
  id: string;
  plant_name: MultilingualText;
  plant_type: MultilingualText;
  description: MultilingualText;
  care_instructions: {
    watering: MultilingualText;
    sunlight: MultilingualText;
    soil: MultilingualText;
    fertilizing: MultilingualText;
    pruning: MultilingualText;
    temperature: MultilingualText;
    humidity: MultilingualText;
  };
  common_problems: {
    name: MultilingualText;
    symptoms: MultilingualText[];
    solutions: MultilingualText[];
  }[];
  seasonal_care: {
    season: MultilingualText;
    instructions: MultilingualText;
  }[];
  difficulty_level: MultilingualText;
  growth_time: MultilingualText;
  image?: string;
}

// Service for handling API requests
export const ApiService = {
  /**
   * Upload an image for plant disease detection
   * @param imageFile - The image file to upload
   * @returns Promise with the disease detection results
   */
  async scanPlant(imageFile: File): Promise<DiseaseResult> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/scan`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scan plant');
      }

      return await response.json();
    } catch (error) {
      console.error('Error scanning plant:', error);
      throw error;
    }
  },

  /**
   * Get the list of diseases from the database
   * @returns Promise with the disease database
   */
  async getDiseases(): Promise<Record<string, any>> {
    try {
      const response = await fetch(`${API_URL}/diseases`);

      if (!response.ok) {
        throw new Error('Failed to fetch diseases database');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching diseases:', error);
      throw error;
    }
  },

  /**
   * Get plant care guides
   * @returns Promise with the plant care guides
   */
  async getPlantCareGuides(): Promise<PlantCareGuide[]> {
    try {
      const response = await fetch(`${API_URL}/plant-care-guides`);

      if (!response.ok) {
        throw new Error('Failed to fetch plant care guides');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching plant care guides:', error);
      throw error;
    }
  },

  /**
   * Get a specific plant care guide by ID
   * @param id - The ID of the plant care guide
   * @returns Promise with the plant care guide
   */
  async getPlantCareGuide(id: string): Promise<PlantCareGuide> {
    try {
      const response = await fetch(`${API_URL}/plant-care-guides/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch plant care guide');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching plant care guide:', error);
      throw error;
    }
  },

  /**
   * Check if the API is available
   * @returns Promise with the health check status
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_URL}/health`);

      if (!response.ok) {
        throw new Error('API health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API health check error:', error);
      throw error;
    }
  }
};

export default ApiService;