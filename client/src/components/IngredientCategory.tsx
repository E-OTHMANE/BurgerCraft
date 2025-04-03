import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BurgerIngredient from './BurgerIngredient';
import { IngredientItem } from '@/types/burger';
import { useBurgerContext } from '@/context/BurgerContext';

interface IngredientCategoryProps {
  name: string;
  ingredients: IngredientItem[];
  defaultOpen?: boolean;
}

const IngredientCategory: React.FC<IngredientCategoryProps> = ({
  name,
  ingredients,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { addIngredient } = useBurgerContext();

  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };

  const handleIngredientClick = (ingredient: IngredientItem) => {
    addIngredient(ingredient);
  };

  return (
    <div className="ingredient-category">
      <button
        className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg font-medium"
        onClick={toggleCategory}
      >
        <span>{name}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      <div className={`mt-2 grid grid-cols-2 gap-2 ${isOpen ? '' : 'hidden'}`}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient.id}
            ingredient={ingredient}
            preview={true}
            onClick={() => handleIngredientClick(ingredient)}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientCategory;
