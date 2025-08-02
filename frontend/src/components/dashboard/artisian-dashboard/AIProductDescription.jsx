import React, { useState } from 'react';
import { aiAPI } from '../../../services/aiService';
import { Mic, Volume2, Languages, Wand2 } from 'lucide-react';

const AIProductDescription = ({ onDescriptionGenerated }) => {
  const [product, setProduct] = useState({
    category: '',
    material: '',
    dimensions: '',
    colors: '',
    careInstructions: ''
  });
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [language, setLanguage] = useState('en');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateDescription = async () => {
    if (!product.category || !product.material) {
      setError('Product category and material are required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await aiAPI.generateDescription(product);
      setDescription(result.description);
      
      // Pass the description to parent component if callback provided
      if (onDescriptionGenerated) {
        onDescriptionGenerated(result.description);
      }
    } catch (error) {
      setError('Failed to generate description. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const translateDescription = async () => {
    if (!description) {
      setError('Generate a description first');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await aiAPI.translateText(description, language);
      setTranslatedDescription(result.translatedText);
    } catch (error) {
      setError('Failed to translate description. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateVoice = async () => {
    const textToVoice = translatedDescription || description;
    
    if (!textToVoice) {
      setError('Generate a description first');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await aiAPI.generateVoiceInstructions({ text: textToVoice }, language);
      setAudioUrl(result.audioUrl);
    } catch (error) {
      setError('Failed to generate voice. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Wand2 className="mr-2 text-amber-600" size={24} />
        AI Product Description Generator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Category*
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g., Pottery, Textile, Jewelry"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material*
          </label>
          <input
            type="text"
            name="material"
            value={product.material}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g., Clay, Cotton, Silver"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions
          </label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g., 10cm x 15cm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Colors
          </label>
          <input
            type="text"
            name="colors"
            value={product.colors}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g., Red, Blue, Natural"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Care Instructions
          </label>
          <input
            type="text"
            name="careInstructions"
            value={product.careInstructions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g., Hand wash only, Keep away from direct sunlight"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={generateDescription}
          disabled={loading}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center"
        >
          <Wand2 className="mr-2" size={16} />
          {loading ? 'Generating...' : 'Generate Description'}
        </button>
        
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="mr">Marathi</option>
          </select>
          
          <button
            onClick={translateDescription}
            disabled={!description || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <Languages className="mr-2" size={16} />
            Translate
          </button>
          
          <button
            onClick={generateVoice}
            disabled={!description || loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
          >
            <Volume2 className="mr-2" size={16} />
            Generate Voice
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {description && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Generated Description:</h3>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
            {description}
          </div>
        </div>
      )}
      
      {translatedDescription && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Translated Description:</h3>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            {translatedDescription}
          </div>
        </div>
      )}
      
      {audioUrl && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
            <Mic className="mr-2 text-green-600" size={20} />
            Voice Instructions:
          </h3>
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProductDescription;