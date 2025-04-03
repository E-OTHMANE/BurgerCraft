import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { IngredientItem, IngredientType, BurgerData } from '@/types/burger';
import { useBurgerContext } from '@/context/BurgerContext';
import { useToast } from '@/hooks/use-toast';

// Fallback setter function for when context isn't available
const noopSetIngredients = (ingredients: IngredientItem[]) => {
  console.log('Setting ingredients (fallback):', ingredients);
};

export function useIngredients() {
  const { toast } = useToast();
  
  // Try to get setIngredients from context, use fallback if context isn't available
  let setIngredients: (ingredients: IngredientItem[]) => void;
  
  try {
    const context = useBurgerContext();
    setIngredients = context.setIngredients;
  } catch (error) {
    console.error('Context error in useIngredients:', error);
    setIngredients = noopSetIngredients;
  }

  return useQuery<IngredientItem[]>({
    queryKey: ['/api/ingredients'],
    meta: {
      // Custom handlers outside of the standard QueryFunctionContext
      callbacks: {
        onQuerySuccess: (data: IngredientItem[]) => {
          setIngredients(data);
        }
      }
    },
    // Using an inline query function to handle success inside
    queryFn: async ({ queryKey }): Promise<IngredientItem[]> => {
      try {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        // Call the setIngredients function here, since we have direct access
        setIngredients(data);
        return data;
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to load ingredients. Please try again.',
          variant: 'destructive',
        });
        console.error('Failed to fetch ingredients:', err);
        throw err;
      }
    }
  });
}

export function useIngredientsByType(type: IngredientType) {
  return useQuery<IngredientItem[]>({
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
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: 'Failed to save your burger. Please try again.',
        variant: 'destructive',
      });
      console.error('Failed to save burger:', error);
    },
  });
}
