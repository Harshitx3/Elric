import { generateShoppingLinks } from '../utils/shoppingLinks.js';

const checkPantry = (req, res) => {
  const { ingredients, available } = req.body;

  if (!ingredients || !available) {
    return res.status(400).json({ message: 'Ingredients and available lists are required' });
  }

  const missingIngredients = ingredients.filter(ingredient => {
    const normalizedIngredient = ingredient.toLowerCase();
    const isAvailable = available.some(item => 
      item.toLowerCase().includes(normalizedIngredient) || 
      normalizedIngredient.includes(item.toLowerCase())
    );
    return !isAvailable;
  });

  const missingIngredientsWithLinks = generateShoppingLinks(missingIngredients);

  res.status(200).json({ missingIngredients: missingIngredientsWithLinks });
};

export { checkPantry };
