import { ReactNode, createContext, useEffect, useState } from "react";
import { MealDTO } from "@dtos/Meal";
import { MealHistoryDTO } from "@dtos/MealHistory";
import calculateDietPercentage from "@utils/calculateDietPercentage";

export type MealContextDataProps = {
  meals: MealHistoryDTO[];
  dietPercentage: number;
  addMeal: (meal: MealDTO) => void;
  findMealById: (mealId: string) => MealDTO | null;
  updateMealById: (mealId: string, updateDTO: Partial<MealDTO>) => void;
  deleteMealById: (mealId: string) => void;
};

type MealContextProviderProps = {
  children: ReactNode;
};

export const MealContext = createContext<MealContextDataProps>({} as MealContextDataProps);

export function MealContextProvider({ children }: MealContextProviderProps) {
  const [meals, setMeals] = useState<MealHistoryDTO[]>([]);
  const [dietPercentage, setDietPercentage] = useState<number>(0);

  function addMeal(newMeal: MealDTO) {
    const existingMealIndex = meals.findIndex(item => item.title === newMeal.date);
    
    if (existingMealIndex !== -1) {
      meals[existingMealIndex].data.push(newMeal);
    } else {
      meals.push({ title: newMeal.date, data: [newMeal] });
    }

    setMeals([...meals]);
  }

  function findMealById(mealId: string): MealDTO {
    return meals.flatMap(meal => meal.data).find(item => item.id === mealId) || ({} as MealDTO);
  }

  function updateMealById(mealId: string, updateDTO: Partial<MealDTO>): void {
    const updatedMeals = meals.map((mealGroup) => ({
      ...mealGroup,
      data: mealGroup.data.map((meal) =>
        meal.id === mealId ? { ...meal, ...updateDTO } : meal
      ),
    }));

    setMeals(updatedMeals);
  }

  function deleteMealById(mealId: string) {
  const updatedMeals = meals.reduce((acc: MealHistoryDTO[], meal) => {
    const updatedData = meal.data.filter((item) => item.id !== mealId);
    if (updatedData.length > 0) {
      acc.push({ ...meal, data: updatedData });
    }
    return acc;
  }, []);

  setMeals(updatedMeals);
}

  useEffect(() => {
    setMeals([
      { title: '12.08.22', data: [
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a1e', hour: '20:00', date: '12.08.22', name: 'X-tudo', description: 'Teste', onDiet: false },
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a2a', hour: '17:20', date: '12.08.22', name: 'Salada', description: 'Teste', onDiet: true },
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a3b', hour: '09:30', date: '12.08.22', name: 'Whey Protein com leite', description: 'Teste', onDiet: true },
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a4c', hour: '13:45', date: '12.08.22', name: 'Vitamina de banana', description: 'Teste', onDiet: true }
      ]},
      { title: '13.08.22', data: [
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a5e', hour: '22:00', date: '13.08.22', name: 'X-tudo', description: 'Teste', onDiet: false },
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a6i', hour: '19:00', date: '13.08.22', name: 'Batata Frita', description: 'Teste', onDiet: false },
        { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a7o', hour: '10:30', date: '13.08.22', name: 'Nuggets', description: 'Teste', onDiet: false }
      ]}
    ]);
  }, []);

  useEffect(() => {
    if (meals.length) {
      setDietPercentage(calculateDietPercentage(meals));
    }
  }, [meals]);

  return (
    <MealContext.Provider value={{ meals, dietPercentage, addMeal, findMealById, updateMealById, deleteMealById }}>{children}</MealContext.Provider>
  ); 
}