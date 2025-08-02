import apiClient from './api';

/**
 * AI Service for frontend
 * Provides methods to interact with the AI API endpoints
 */
export const aiAPI = {
  /**
   * Generate a product description using AI
   * @param {Object} product - The product object with category and material
   * @returns {Promise<Object>} - The response with the generated description
   */
  generateDescription: async (product) => {
    try {
      const response = await apiClient.post('/ai/generate-description', { product });
      return response.data;
    } catch (error) {
      console.error('Error generating product description:', error);
      throw error;
    }
  },

  /**
   * Generate voice instructions for illiterate artisans
   * @param {Object} instructions - The instruction object
   * @param {string} language - The language code (e.g., 'en', 'hi')
   * @returns {Promise<Object>} - The response with the audio URL
   */
  generateVoiceInstructions: async (instructions, language = 'en') => {
    try {
      const response = await apiClient.post('/ai/generate-voice', { instructions, language });
      return response.data;
    } catch (error) {
      console.error('Error generating voice instructions:', error);
      throw error;
    }
  },

  /**
   * Translate text to different languages
   * @param {string} text - The text to translate
   * @param {string} targetLanguage - The target language code
   * @returns {Promise<Object>} - The response with the translated text
   */
  translateText: async (text, targetLanguage = 'hi') => {
    try {
      const response = await apiClient.post('/ai/translate', { text, targetLanguage });
      return response.data;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  }
};

export default aiAPI;