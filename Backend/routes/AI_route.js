const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const aiService = require('../services/aiService');

/**
 * @route POST /api/ai/generate-description
 * @desc Generate a product description using AI
 * @access Private
 */
router.post('/generate-description', authenticateToken, async (req, res) => {
  try {
    const { product } = req.body;
    
    if (!product || !product.category || !product.material) {
      return res.status(400).json({
        success: false,
        message: 'Product details are required (category and material at minimum)'
      });
    }
    
    const description = await aiService.generateProductDescription(product);
    
    res.status(200).json({
      success: true,
      description
    });
  } catch (error) {
    console.error('Error in generate-description:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate product description',
      error: error.message
    });
  }
});

/**
 * @route POST /api/ai/generate-voice
 * @desc Generate voice instructions for illiterate artisans
 * @access Private
 */
router.post('/generate-voice', authenticateToken, async (req, res) => {
  try {
    const { instructions, language } = req.body;
    
    if (!instructions) {
      return res.status(400).json({
        success: false,
        message: 'Instructions are required'
      });
    }
    
    const audioUrl = await aiService.generateVoiceInstructions(instructions, language);
    
    res.status(200).json({
      success: true,
      audioUrl
    });
  } catch (error) {
    console.error('Error in generate-voice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate voice instructions',
      error: error.message
    });
  }
});

/**
 * @route POST /api/ai/translate
 * @desc Translate text to different languages
 * @access Private
 */
router.post('/translate', authenticateToken, async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    const translatedText = await aiService.translateText(text, targetLanguage);
    
    res.status(200).json({
      success: true,
      translatedText
    });
  } catch (error) {
    console.error('Error in translate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to translate text',
      error: error.message
    });
  }
});

module.exports = router;