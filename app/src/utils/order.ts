import { MealType } from "enums/order";

/**
 * Determines the meal type based on the current hour.
 *
 * @param {number} currentHour - The current hour in 24-hour format (0-23).
 * @returns {MealType} MealType.
 */
export function getMealType(hour: number): MealType {
  if (hour >= 6 && hour < 10) return MealType.BREAKFAST;

  if (hour >= 10 && hour < 15) return MealType.LUNCH;

  if (hour >= 15 && hour < 22) return MealType.DINNER;

  return MealType.MIDNIGHT_SNACK;
}
