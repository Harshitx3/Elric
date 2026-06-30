import { generateRecipeFromAI } from '../services/aiService.js';

const generateRecipe = async (req, res, next) => {
  try {
    const { query, servings, language = 'en' } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const aiResponse = await generateRecipeFromAI(query, servings, language);

    res.status(200).json({
      ...aiResponse,
      originalQuery: query
    });
  } catch (error) {
    next(error);
  }
};

export { generateRecipe };
