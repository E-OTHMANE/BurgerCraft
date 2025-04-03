import React from 'react';
import BurgerIngredient from './BurgerIngredient';
import { SelectedIngredient } from '@/types/burger';

interface BurgerPreviewProps {
  ingredients: SelectedIngredient[];
  className?: string;
}

const BurgerPreview: React.FC<BurgerPreviewProps> = ({ ingredients, className }) => {
  return (
    <div className={`flex flex-col-reverse items-center justify-end min-h-[200px] ${className}`}>
      {/* Always display bottom bun */}
      <div className="burger-part w-48 h-12 bg-bun rounded-b-full shadow-md">
      </div>
      
      {/* Display all selected ingredients from bottom to top */}
      {ingredients.map((item) => (
        <BurgerIngredient 
          key={item.selectionId} 
          ingredient={item.ingredient}
        />
      ))}
    </div>
  );
};

export default BurgerPreview;
