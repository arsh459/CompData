import { useNutritionAutoCalculate } from "@hooks/subTasks/useNutritionAutoCalculate";
import { numberKeys, stringKeys } from "@hooks/tasks/useTask";
import {
  dishCategories,
  Ingredient,
  MealTypes,
  mealTypesArr,
  NutritionFacts,
  Task,
} from "@models/Tasks/Task";
import { MenuItem, TextField } from "@mui/material";
import HandleIngredients from "../HandleIngredients";
import HandleInstructions from "../HandleInstructions";
import MakeStreamable from "../MakeStreamable";

interface Props {
  task?: Task;
  onStringUpdate: (key: stringKeys, newVal: string) => void;
  onNumberUpdate: (key: numberKeys, newVal: string) => void;
  onUpdateMealTypes: (val: MealTypes) => void;
  addSteps: (val: string, index?: number) => void;
  removeSteps: (step: string) => void;
  addIngredients: (val: Ingredient, index?: number) => void;
  removeIngredients: (val: Ingredient) => void;
  onUpdateNutriFacts: (val: string, key: keyof NutritionFacts) => void;
  onUpdateDishCategory: (val: dishCategories) => void;
}

const NutritionFields: React.FC<Props> = ({
  task,
  onNumberUpdate,
  onStringUpdate,
  onUpdateMealTypes,
  addSteps,
  removeSteps,
  addIngredients,
  removeIngredients,
  onUpdateNutriFacts,
  onUpdateDishCategory,
}) => {
  useNutritionAutoCalculate(onNumberUpdate, onUpdateNutriFacts, task);

  return (
    <>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Select Meal Type"}
          label={"Select Meal Type"}
          variant="outlined"
          onChange={(e) => onUpdateMealTypes(e.target.value as MealTypes)}
          value={task?.mealTypes || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {mealTypesArr.map((each) => (
            <MenuItem key={each} value={each}>
              {each}
            </MenuItem>
          ))}
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>

      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Select Dish Category"}
          label={"Select Dish Category"}
          variant="outlined"
          onChange={(e) =>
            onUpdateDishCategory(e.target.value as dishCategories)
          }
          value={task?.dishCategory || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value={"vegan"}>VEGAN</MenuItem>
          <MenuItem value={"veg"}>VEG</MenuItem>
          <MenuItem value={"egg"}>EGG</MenuItem>
          <MenuItem value={"non-veg"}>NON-VEG</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>

      <HandleIngredients
        task={task}
        addIngredients={addIngredients}
        removeIngredients={removeIngredients}
      />

      <HandleInstructions
        task={task}
        addSteps={addSteps}
        removeSteps={removeSteps}
      />

      <div className="p-4 border-2 border-red-500 my-4">
        <p className="text-xl font-bold">Can Reel stream?</p>
        <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
        <MakeStreamable
          onUpdatePlayback={(val: string) =>
            onStringUpdate("reelPlaybackId", val)
          }
          url={task?.reelMedia?.url}
          playbackId={task?.reelPlaybackId}
        />
      </div>

      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Add recipe taskId here"}
          label={"Recipe task ID"}
          variant="outlined"
          onChange={(val) => onStringUpdate("recipeTaskId", val.target.value)}
          value={task?.recipeTaskId || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      {/* Auto calculate */}
      <div className="mt-8 p-4 border border-black/50 rounded-lg">
        <p className="pt-2">Nutrition Facts (Auto calculate using sub task)</p>
        <div className="pt-8">
          <TextField
            disabled
            style={{ width: "100%" }}
            placeholder={"Protein"}
            label={"Protein"}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "protein")}
            value={task?.nutritionFacts?.protein || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="pt-8">
          <TextField
            disabled
            style={{ width: "100%" }}
            placeholder={"Carbs"}
            label={"Carbs"}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "carbs")}
            value={task?.nutritionFacts?.carbs || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="pt-8">
          <TextField
            disabled
            style={{ width: "100%" }}
            placeholder={"Fats"}
            label={"Fats"}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "fats")}
            value={task?.nutritionFacts?.fats || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="pt-8">
          <TextField
            disabled
            style={{ width: "100%" }}
            placeholder={"Fibre"}
            label={"Fibre"}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "fibre")}
            value={task?.nutritionFacts?.fibre || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="pt-8">
        <TextField
          disabled
          style={{ width: "100%" }}
          placeholder={"Kcal"}
          label={"Kcal (Auto calculate using sub task)"}
          variant="outlined"
          onChange={(val) => onNumberUpdate("kcal", val.target.value)}
          value={task?.kcal || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          disabled
          style={{ width: "100%" }}
          placeholder={"FitPoints you will earn with this activity"}
          label={"FitPoints (Auto calculate using sub task)"}
          variant="outlined"
          onChange={(val) => onNumberUpdate("fitPoints", val.target.value)}
          value={task?.fitPoints || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </>
  );
};

export default NutritionFields;
