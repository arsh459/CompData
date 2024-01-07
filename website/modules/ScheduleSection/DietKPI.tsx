import { NutritionTarget } from "@models/User/User";
import { factsObj } from "./SingleDayAdder";
import SingleDietKPI from "./SingleDietKPI";

interface Props {
  nutritionTarget?: NutritionTarget;
  finalTracked: factsObj;
}

const DietKPI: React.FC<Props> = ({ nutritionTarget, finalTracked }) => {
  return (
    <div className="pt-2 text-xs text-gray-700">
      <SingleDietKPI
        keyStr="Protein"
        value={finalTracked?.protein}
        base={nutritionTarget?.protein}
        unit="g"
      />
      <SingleDietKPI
        keyStr="Carbs"
        value={finalTracked?.carbs}
        base={nutritionTarget?.carbs}
        unit="g"
      />
      <SingleDietKPI
        keyStr="Fats"
        value={finalTracked?.fats}
        base={nutritionTarget?.fats}
        unit="g"
      />
      <SingleDietKPI
        keyStr="Fiber"
        value={finalTracked?.fiber}
        base={nutritionTarget?.fiber}
        unit="g"
      />
      <div className="pt-2">
        <SingleDietKPI
          keyStr="KCal"
          value={finalTracked?.kcal}
          base={nutritionTarget?.kcal}
          unit="KCal"
        />
      </div>
    </div>
  );
};

export default DietKPI;
