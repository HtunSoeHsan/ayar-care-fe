/**
 * API service for interacting with the backend Flask API
 */

// Define the base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Plant disease scan result interface
export interface DiseaseResult {
  status: 'healthy' | 'diseased';
  disease?: {
    name: string;
    scientific_name: string;
    description: string;
    cause: string;
    treatment: {
      organic: string[];
      conventional: string[];
    };
    prevention: string[];
    severity: string;
    spread_rate: string;
  };
  confidence: number;
  message?: string;
  timestamp: string;
  filename: string;
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