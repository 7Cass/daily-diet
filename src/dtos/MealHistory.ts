import { MealDTO } from "./Meal";

export type MealHistoryDTO = {
  title: string;
  data: MealDTO[];
};