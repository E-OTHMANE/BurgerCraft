import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { IngredientItem, IngredientType, BurgerData } from '@/types/burger';
import { useBurgerContext } from '@/context/BurgerContext';
import { useToast } from '@/hooks/use-toast';

export function useIngredients() {
  const { setIngredients } = useBurgerContext();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['/api/ingredients'],
    onSuccess: (data: IngredientItem[]) => {
      setIngredients(data);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to load ingredients. Please try again.',
        variant: 'destructive',
      });
      console.error('Failed to fetch ingredients:', error);
    },
  });
}

export function useIngredientsByType(type: IngredientType) {
  return useQuery({
    queryKey: ['/api/ingredients/type', type],
  });
}

export function useSaveBurger() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (burger: BurgerData) => {
      // Format burger data for the API
      const formattedBurger = {
        name: burger.name,
        ingredients: burger.ingredients.map(item => ({
          id: item.ingredient.id,
          name: item.ingredient.name,
          type: item.ingredient.type
        }))
      };
      
      const response = await apiRequest('POST', '/api/burgers', formattedBurger);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Your burger has been saved.',
      });
      
      // Invalidate burgers query cache
      queryClient.invalidateQueries({ queryKey: ['/api/burgers'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to save your burger. Please try again.',
        variant: 'destructive',
      });
      console.error('Failed to save burger:', error);
    },
  });
}
