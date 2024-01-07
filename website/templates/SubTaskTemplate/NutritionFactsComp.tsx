import { NutritionFacts } from "@models/Tasks/Task";
import { TextField } from "@mui/material";

interface Props {
  protein?: number;
  fats?: number;
  carbs?: number;
  fiber?: number;
  kcal?: number;
  onUpdateKcal: (val: string) => void;
  disabled?: boolean;
  onUpdateNutriFacts: (val: string, key: keyof NutritionFacts) => void;
}

const NutritionFactsComp: React.FC<Props> = ({
  protein,
  fats,
  carbs,
  fiber,
  onUpdateKcal,
  disabled,
  kcal,
  onUpdateNutriFacts,
}) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Kcal"}
          label={"Kcal"}
          variant="outlined"
          disabled={disabled}
          onChange={(val) => onUpdateKcal(val.target.value)}
          value={kcal}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <p className="text-sm pt-1">Protein x 4 + Carbs x 4 + Fats x 9</p> */}
      </div>

      <div className="mt-8 p-4 border border-black/50 rounded-lg">
        <p className="pt-2">Nutrition Facts</p>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Protein (g)"}
            label={"Protein (g)"}
            disabled={disabled}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "protein")}
            value={protein}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Carbs (g)"}
            label={"Carbs (g)"}
            variant="outlined"
            disabled={disabled}
            onChange={(val) => onUpdateNutriFacts(val.target.value, "carbs")}
            value={carbs}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Fats (g)"}
            label={"Fats (g)"}
            variant="outlined"
            disabled={disabled}
            onChange={(val) => onUpdateNutriFacts(val.target.value, "fats")}
            value={fats}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Fiber (g)"}
            label={"Fiber (g)"}
            variant="outlined"
            disabled={disabled}
            onChange={(val) => onUpdateNutriFacts(val.target.value, "fibre")}
            value={fiber}
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

export default NutritionFactsComp;
