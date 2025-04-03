import React from 'react';
import { IngredientItem } from '@/types/burger';
import { cn } from '@/lib/utils';

interface BurgerIngredientProps {
  ingredient: IngredientItem;
  onClick?: () => void;
  className?: string;
  preview?: boolean;
}

const BurgerIngredient: React.FC<BurgerIngredientProps> = ({
  ingredient,
  onClick,
  className,
  preview = false
}) => {
  const getHeightClass = (height: number) => {
    return `h-${height}`;
  };

  // Handle special styles for specific ingredients
  const renderSpecialStyles = () => {
    switch (ingredient.name) {
      case 'sesame-bun':
        return (
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1 h-1 bg-white rounded-full mt-1 mx-0.5"></div>
            <div className="w-1 h-1 bg-white rounded-full mt-2 mx-0.5"></div>
            <div className="w-1 h-1 bg-white rounded-full mt-1 mx-0.5"></div>
            <div className="w-1 h-1 bg-white rounded-full mt-3 mx-0.5"></div>
            <div className="w-1 h-1 bg-white rounded-full mt-2 mx-0.5"></div>
          </div>
        );
      case 'swiss':
        return (
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1 h-1 bg-white rounded-full mt-0.5 mx-1"></div>
            <div className="w-1 h-1 bg-white rounded-full mt-0.5 mx-1"></div>
          </div>
        );
      default:
        return null;
    }
  };

  // Special rounded classes for buns
  const getBunClasses = () => {
    if (ingredient.type === 'bun') {
      return 'rounded-t-full';
    }
    return '';
  };

  if (preview) {
    // Preview version for the ingredient card
    return (
      <div 
        className={cn(
          "ingredient-card hover:bg-gray-50 cursor-pointer p-2 rounded border border-gray-200 flex flex-col items-center transition-all",
          className
        )}
        onClick={onClick}
      >
        <div className={cn(
          "w-16", 
          getHeightClass(ingredient.type === 'bun' ? 8 : ingredient.height), 
          ingredient.color, 
          getBunClasses(),
          "mb-1 relative"
        )}>
          {renderSpecialStyles()}
        </div>
        <span className="text-sm text-center">{ingredient.displayName}</span>
      </div>
    );
  }

  // Burger stack version
  return (
    <div 
      className={cn(
        "burger-part w-48", 
        getHeightClass(ingredient.height), 
        ingredient.color, 
        getBunClasses(),
        "shadow-md relative",
        className
      )}
    >
      {renderSpecialStyles()}
    </div>
  );
};

export default BurgerIngredient;
