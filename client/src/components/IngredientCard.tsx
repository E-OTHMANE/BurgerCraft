import { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onClick: () => void;
}

export default function IngredientCard({ ingredient, isSelected, onClick }: IngredientCardProps) {
  return (
    <div 
      className={`ingredient-card border rounded-lg p-3 cursor-pointer hover:shadow-md transition ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 ${ingredient.color} rounded-full mb-2 flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">{ingredient.label}</span>
        </div>
        <span className="text-sm font-medium text-center">{ingredient.name}</span>
      </div>
    </div>
  );
}
