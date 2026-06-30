const generateShoppingLinks = (ingredients) => {
  return ingredients.map(ingredient => {
    const encodedIngredient = encodeURIComponent(ingredient);
    
    return {
      name: ingredient,
      blinkit: `https://blinkit.com/s/?q=${encodedIngredient}`,
      zepto: `https://www.zeptonow.com/search?query=${encodedIngredient}`,
      instamart: `https://www.swiggy.com/instamart/search?q=${encodedIngredient}`
    };
  });
};

export { generateShoppingLinks };
