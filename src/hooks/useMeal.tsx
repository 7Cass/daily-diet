import { useContext } from 'react';

import { MealContext } from '@contexts/mealContext';

export function useMeal() {
  const context = useContext(MealContext);

  return context;
}