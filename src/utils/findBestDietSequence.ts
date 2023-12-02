import { MealDTO } from "@dtos/Meal";
import { MealHistoryDTO } from "@dtos/MealHistory";

/**
 * Finds the best diet sequence in a given array of meal histories.
 * A diet sequence is a consecutive sequence of meals where `onDiet` is true.
 * Returns the length of the best diet sequence found.
 *
 * @param meals - An array of meal histories
 * @returns The length of the best diet sequence
 */
export default function findBestDietSequence(meals: MealHistoryDTO[]) {
  const allMeals = meals.flatMap(data => data.data);

  // Variables to keep track of the best sequence found
  let maxSequence = 0;
  let bestSequence: MealDTO[] = [];

  // Variables to keep track of the current sequence being evaluated
  let currentSequence = 0;
  let currentDietSequence: MealDTO[] = [];

  // Iterate over each meal
  for (const meal of allMeals) {
    if (meal.onDiet) {
      // If the meal is part of the diet sequence, increment the current sequence count
      currentSequence++;
      currentDietSequence.push(meal);
    } else {
      // If the meal is not part of the diet sequence, check if the current sequence is the best found so far
      if (currentSequence > maxSequence) {
        maxSequence = currentSequence;
        bestSequence = [...currentDietSequence];
      }
      // Reset the current sequence count and the current diet sequence
      currentSequence = 0;
      currentDietSequence = [];
    }
  }

  // Check if the last sequence is the best found so far
  if (currentSequence > maxSequence) {
    maxSequence = currentSequence;
    bestSequence = [...currentDietSequence];
  }

  // Return the length of the best diet sequence
  return bestSequence.length || 0;
}
