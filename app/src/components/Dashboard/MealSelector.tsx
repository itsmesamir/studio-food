import { MealType } from "enums/order";

interface MealSelectorProps {
  selectedMeal: MealType;
  onMealChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  mealOptions: MealType[];
}

function MealSelector(props: MealSelectorProps) {
  const { selectedMeal, onMealChange, mealOptions } = props;

  return (
    <div className="meal-type mt-2 mb-2 min-w-[200px] border p-2 border-gray-300 rounded-md">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Meal Type:
      </label>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={selectedMeal}
        onChange={onMealChange}
      >
        {mealOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MealSelector;
