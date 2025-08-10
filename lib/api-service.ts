/**
 * API service for interacting with the backend Flask API
 */

import { isPlantHealthy } from "./utils";

// Define the base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Multilingual text interface
export interface MultilingualText {
  en: string;
  my: string;
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

// Disease treatment interface
export interface DiseaseTreatment {
  name: MultilingualText;
  description: MultilingualText;
  steps: MultilingualText[];
}

// Disease detection interface
export interface DiseaseDetection {
  confidence: string; // e.g. 0.92 for 92%
  imageUrl?: string;  // Optional image used for detection
  detectedAt?: Date;  // Optional timestamp of detection
}

// Plant disease interface
export interface PlantDisease {
  classIndex: number;
  name: MultilingualText;
  description: MultilingualText;
  symptoms: MultilingualText[];
  plantType: MultilingualText;
  treatments: DiseaseTreatment[];
  prevention?: MultilingualText[];
  recommendations?: MultilingualText[];
  detection?: DiseaseDetection;
  preventionTips?: MultilingualText[];
}

// Plant care guide interface
export interface PlantCareGuide {
  plantName: MultilingualText;
  scientificName?: string;
  plantType: MultilingualText;
  description: MultilingualText;
  images: string[];
  careInstructions: {
    watering: {
      frequency: MultilingualText;
      amount: MultilingualText;
      tips: MultilingualText[];
    };
    sunlight: {
      requirement: MultilingualText;
      hours: MultilingualText;
      tips: MultilingualText[];
    };
    soil: {
      type: MultilingualText;
      pH?: string;
      drainage: MultilingualText;
      tips: MultilingualText[];
    };
    fertilizing: {
      frequency: MultilingualText;
      type: MultilingualText;
      tips: MultilingualText[];
    };
  };
}

// Plant disease scan result interface (legacy - keeping for backward compatibility)
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

// New interface for the actual API response format
export interface ScanDetectionResult {
  classIndex: number;
  name: MultilingualText;
  description: MultilingualText;
  symptoms: MultilingualText[];
  plantType: MultilingualText;
  treatments: DiseaseTreatment[];
  detection: DiseaseDetection;
}

// Updated scan result interface
export interface ScanResult {
  detections: ScanDetectionResult[];
  primaryDetection?: ScanDetectionResult;
  isHealthy: boolean;
  confidence: number;
}

// Chatbot interfaces
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  relatedInfo?: {
    type: 'disease' | 'treatment' | 'prevention' | 'care';
    title: string;
    description: string;
  };
}

export interface ChatRequest {
  message: string;
  context?: {
    scanResults?: ScanDetectionResult;
    plantType?: string;
    location?: string;
    weather?: any;
  };
  sessionId?: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    answer: string;
    sources: string[];
    confidence: number;
    suggestions?: string[];
    relatedInfo?: {
      type: 'disease' | 'treatment' | 'prevention' | 'care';
      title: string;
      description: string;
    };
  };
  error?: string;
}

export interface ChatbotHealth {
  status: string;
  message: string;
  details?: {
    model: string;
    vectorStoreSize: number;
    conversationHistorySize: number;
  };
}

// Service for handling API requests
export const ApiService = {
  /**
   * Upload an image for plant disease detection
   * @param imageFile - The image file to upload
   * @returns Promise with the disease detection results
   */
  async scanPlant(imageFile: File): Promise<ScanResult> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/detections/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scan plant');
      }
      
      const data = await response.json();
      
      // Process the array of detections - handle both direct array and nested data structure
      let detections: ScanDetectionResult[] = [];
      
      if (Array.isArray(data)) {
        // Direct array response
        detections = data;
      } else if (data.data && Array.isArray(data.data)) {
        // Nested data structure
        detections = data.data;
      } else {
        // Fallback to empty array
        detections = [];
      }
      
      if (!detections || detections.length === 0) {
        return {
          detections: [],
          isHealthy: true,
          confidence: 0
        };
      }
      
      // Sort by confidence (highest first)
      const sortedDetections = detections.sort((a, b) => 
        parseFloat(b.detection.confidence) - parseFloat(a.detection.confidence)
      );
      
      const primaryDetection = sortedDetections[0];
      const confidence = parseFloat(primaryDetection.detection.confidence);
      
      // Determine if plant is healthy based on the primary detection
      const isHealthy = isPlantHealthy({name: primaryDetection.name});
      
      return {
        detections: sortedDetections,
        primaryDetection,
        isHealthy,
        confidence
      };
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
  },

  // Chatbot API methods
  /**
   * Send a message to the chatbot and get a response
   * @param request - The chat request with message and context
   * @returns Promise with the chatbot response
   */
  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_URL}/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to send chat message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  /**
   * Get conversation history (requires authentication)
   * @returns Promise with the conversation history
   */
  async getConversationHistory(): Promise<{ messages: ChatMessage[]; totalMessages: number }> {
    try {
      const token = this.getAuthToken();
      const response = await fetch(`${API_URL}/chatbot/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get conversation history');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error getting conversation history:', error);
      throw error;
    }
  },

  /**
   * Clear conversation history (requires authentication)
   * @returns Promise with the result
   */
  async clearConversationHistory(): Promise<{ success: boolean; message: string }> {
    try {
      const token = this.getAuthToken();
      const response = await fetch(`${API_URL}/chatbot/history`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear conversation history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error clearing conversation history:', error);
      throw error;
    }
  },

  /**
   * Get chatbot health status
   * @returns Promise with the chatbot health information
   */
  async getChatbotHealth(): Promise<ChatbotHealth> {
    try {
      const response = await fetch(`${API_URL}/chatbot/health`);

      if (!response.ok) {
        throw new Error('Failed to get chatbot health');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error getting chatbot health:', error);
      throw error;
    }
  },

  /**
   * Add new knowledge to the chatbot (requires authentication)
   * @param knowledge - The knowledge to add
   * @returns Promise with the result
   */
  async addChatbotKnowledge(knowledge: any): Promise<{ success: boolean; message: string }> {
    try {
      const token = this.getAuthToken();
      const response = await fetch(`${API_URL}/chatbot/knowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(knowledge),
      });

      if (!response.ok) {
        throw new Error('Failed to add knowledge');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding knowledge:', error);
      throw error;
    }
  },

  /**
   * Get authentication token from cookies or localStorage
   * @returns The authentication token
   */
  getAuthToken(): string {
    // Try to get token from cookies first
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }

    // Fallback to localStorage
    return localStorage.getItem('authToken') || '';
  }
};

export default ApiService;