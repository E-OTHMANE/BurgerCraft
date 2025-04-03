import { Ingredient } from '../types';

interface BurgerVisualizationProps {
  ingredients: Ingredient[];
  size?: 'regular' | 'small';
}

export default function BurgerVisualization({ ingredients, size = 'regular' }: BurgerVisualizationProps) {
  // Sort ingredients to ensure the buns are in the right position
  // Bottom bun first, then other ingredients, top bun last
  const sortedIngredients = [...ingredients].sort((a, b) => {
    // Bottom bun always first
    if (a.category === 'buns' && b.category !== 'buns') return -1;
    // Top bun always last (same category, so we use ID comparison)
    if (a.category === 'buns' && b.category === 'buns') {
      return a.id < b.id ? -1 : 1;
    }
    // Other ingredients in the middle
    if (a.category !== 'buns' && b.category === 'buns') return 1;
    return 0;
  });

  // Get only the bottom bun and top bun
  const bottomBun = sortedIngredients.find(ing => ing.category === 'buns');
  const remainingIngredients = sortedIngredients.filter(ing => ing.category !== 'buns' || ing.id !== bottomBun?.id);

  const isSmall = size === 'small';
  
  // Scale factor for small size
  const scaleFactor = isSmall ? 0.75 : 1;

  return (
    <div className="burger-container w-full max-w-sm mx-auto">
      <div className="burger-stack relative flex flex-col items-center">
        {/* Bottom Bun (first in the stack) */}
        {bottomBun && (
          <div 
            className={`burger-item ${bottomBun.color} rounded-b-full rounded-t-lg shadow-lg z-10`}
            style={{ 
              width: `${bottomBun.width * scaleFactor}px`, 
              height: `${bottomBun.height * scaleFactor}px`,
              marginTop: `-${10 * scaleFactor}px`
            }}
          />
        )}
        
        {/* Middle ingredients */}
        {remainingIngredients.filter(ing => ing.category !== 'buns').map((ingredient, index) => (
          <div 
            key={`${ingredient.id}-${index}`}
            className={`burger-item ${ingredient.color} rounded-sm shadow-md burger-item-enter z-${20 + index * 10}`}
            style={{ 
              width: `${ingredient.width * scaleFactor}px`, 
              height: `${ingredient.height * scaleFactor}px`,
              marginTop: `-${(ingredient.category === 'sauces' ? 1 : 5) * scaleFactor}px`
            }}
          />
        ))}
        
        {/* Top Bun (last in the stack) */}
        {remainingIngredients.find(ing => ing.category === 'buns') && (
          <div 
            className={`burger-item ${bottomBun?.color} rounded-t-full rounded-b-lg shadow-xl z-${20 + remainingIngredients.length * 10}`}
            style={{ 
              width: `${bottomBun?.width ? bottomBun.width * scaleFactor : 64 * scaleFactor}px`, 
              height: `${24 * scaleFactor}px`,
              marginTop: `-${5 * scaleFactor}px`
            }}
          />
        )}
        
        {/* Empty state message */}
        {ingredients.length === 0 && (
          <div className="text-center mt-4 text-gray-500">
            Select ingredients to build your perfect burger
          </div>
        )}
      </div>
    </div>
  );
}
