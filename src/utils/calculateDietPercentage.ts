import { MealHistoryDTO } from "@dtos/MealHistory";

/**
 * This function calculates the percentage of meals that are on a diet
 * based on the provided MealHistoryDTO array.
 *
 * @param meals - An array of MealHistoryDTO objects representing the meals.
 * @returns A number representing the calculated diet percentage.
 */
export default function calculateDietPercentage(meals: MealHistoryDTO[]): number {
  const totalItemsOnDiet = meals.reduce((count, item) => count + item.data.filter(meal => meal.onDiet).length, 0);
  const totalMeals = meals.reduce((count, item) => count + item.data.length, 0);
  const percentage = parseFloat(((totalItemsOnDiet / totalMeals) * 100).toFixed(2));
  return percentage;
}
