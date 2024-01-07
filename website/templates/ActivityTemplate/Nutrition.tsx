// import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
// import { useBadgeSections } from "@hooks/badgeSections/useBadgeSections";
import { MealTypes, NutritionFacts, Task } from "@models/Tasks/Task";
import { MenuItem, TextField } from "@mui/material";

interface Props {
  task?: Task;
  onUpdateNutriFacts: (val: string, key: keyof NutritionFacts) => void;
  onUpdateSectionId: (val: string) => void;
  onUpdateKcal: (val: string) => void;
  onUpdateMealTypes: (val: MealTypes) => void;
}

const Nutrition: React.FC<Props> = ({
  task,
  onUpdateNutriFacts,
  onUpdateSectionId,
  onUpdateKcal,
  onUpdateMealTypes,
}) => {
  // const { badgeSections } = useBadgeSections(
  //   task?.games?.length ? task.games[0] : TEAM_ALPHABET_GAME,
  //   task?.badgeId
  // );
  // console.log({ task });

  return (
    <>
      <div className="pt-8">
        {/* <TextField
          select
          style={{ width: "100%" }}
          placeholder={"SectionId"}
          label={"SectionId"}
          variant="outlined"
          onChange={(e) => onUpdateSectionId(e.target.value)}
          value={task?.sectionId || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {badgeSections?.map((section) => (
            <MenuItem key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </MenuItem>
          ))}
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField> */}
        {/* <TextField
          style={{ width: "100%" }}
          placeholder={"SectionId"}
          label={"SectionId"}
          variant="outlined"
          onChange={(val) => onUpdateSectionId(val.target.value)}
          value={task?.sectionId || ""}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
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
            <MenuItem value="Pre Breakfast">Pre Breakfast</MenuItem>
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Evening Snacks">Evening Snacks</MenuItem>

            <MenuItem value="Dinner">Dinner</MenuItem>
            <MenuItem value="Post Dinner">Post Dinner</MenuItem>
            <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Kcal"}
          label={"Kcal"}
          variant="outlined"
          onChange={(val) => onUpdateKcal(val.target.value)}
          value={task?.kcal || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="mt-8 p-4 border border-black/50 rounded-lg">
        <p className="pt-2">Nutrition Facts</p>
        <div className="pt-8">
          <TextField
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
    </>
  );
};

export default Nutrition;
