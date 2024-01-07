import { useAppConfiguration } from "@hooks/AppConfig/useAppConfig";
import {
  NutritionFacts,
  servingType,
  SubTask,
  // weightType,
} from "@models/Tasks/Task";
import { MenuItem, TextField } from "@mui/material";
import NutritionFactsComp from "./NutritionFactsComp";

interface Props {
  subTask?: SubTask;
  onUpdateKcal: (val: string) => void;
  onUpdateNutriFacts: (val: string, key: keyof NutritionFacts) => void;
  onUpdateServingType: (val: servingType) => void;
  onUpdateServingValue: (val: number) => void;
  onUpdateGptAssumption: (val: string) => void;
  onUpdateGptServingValue: (val: number) => void;
  onUpdateGptServingType: (val: string) => void;
  onUpdateGptGramEquivalent: (val: number) => void;
  // onUpdateWeightType: (val: weightType) => void;
  // onUpdateWeightValue: (val: number) => void;
}

const NtritionSubTaaskFields: React.FC<Props> = ({
  subTask,
  onUpdateKcal,
  onUpdateNutriFacts,
  onUpdateServingType,
  onUpdateServingValue,
  onUpdateGptServingValue,
  onUpdateGptServingType,
  onUpdateGptGramEquivalent,
  onUpdateGptAssumption,

  // onUpdateWeightType,
  // onUpdateWeightValue,
}) => {
  const { config } = useAppConfiguration();

  return (
    <>
      {/* <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Kcal"}
          label={"Kcal"}
          variant="outlined"
          onChange={(val) => onUpdateKcal(val.target.value)}
          value={subTask?.kcal || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div> */}
      {/* <div className="mt-8 p-4 border border-black/50 rounded-lg">
        <p className="pt-2">Nutrition Facts</p>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Protein"}
            label={"Protein"}
            variant="outlined"
            onChange={(val) => onUpdateNutriFacts(val.target.value, "protein")}
            value={subTask?.nutrientValues?.protein || 0}
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
            value={subTask?.nutrientValues?.carbs || 0}
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
            value={subTask?.nutrientValues?.fats || 0}
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
            value={subTask?.nutrientValues?.fibre || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div> */}

      {subTask?.gptInfo ? (
        <div className="bg-gray-100 p-4 my-4">
          <div>
            <p className="py-4">GPT Generated data</p>
          </div>
          <div>
            <NutritionFactsComp
              protein={
                subTask.aiSuggest?.nutrientValues?.protein ||
                subTask.gptInfo.nutrientValues?.protein
              }
              carbs={
                subTask.aiSuggest?.nutrientValues?.carbs ||
                subTask.gptInfo.nutrientValues?.carbs
              }
              fats={
                subTask.aiSuggest?.nutrientValues?.fats ||
                subTask.gptInfo.nutrientValues?.fats
              }
              fiber={
                subTask.aiSuggest?.nutrientValues?.fibre ||
                subTask.gptInfo.nutrientValues?.fibre
              }
              onUpdateKcal={() => {}}
              onUpdateNutriFacts={() => {}}
              kcal={subTask.aiSuggest?.kcal || subTask.gptInfo.kcal}
              disabled={true}
            />
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Gpt Serving Type"}
              label={"Gpt Serving Type"}
              variant="outlined"
              disabled={true}
              // onChange={(e) => onUpdateGptServingType(e.target.value as string)}
              value={subTask?.gptInfo.gptServingType}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Gpt Serving Value"}
              label={"Gpt Serving Value"}
              variant="outlined"
              type="number"
              disabled={true}
              // onChange={(e) =>
              //   onUpdateGptServingValue(parseFloat(e.target.value))
              // }
              value={subTask?.gptInfo.gptServingValue}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Gram Equivalent in gms"}
              label={"Gram Equivalent(gms)"}
              variant="outlined"
              type="number"
              disabled={true}
              // onChange={(e) =>
              //   onUpdateGptGramEquivalent(parseFloat(e.target.value))
              // }
              value={subTask?.gptInfo.gramEquivalent || 0}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Gpt Assumption"}
              label={"Gpt Assumption"}
              variant="outlined"
              disabled={true}
              multiline={true}
              maxRows={8}
              // onChange={(e) => onUpdateGptAssumption(e.target.value)}
              value={subTask?.gptInfo.assumption}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Cooking Time"}
              label={"Cooking Time"}
              variant="outlined"
              disabled={true}
              multiline={true}
              maxRows={8}
              // onChange={(e) => onUpdateGptAssumption(e.target.value)}
              value={subTask?.gptInfo.cooking_time || 0}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </div>

          <div className="">
            <div className="mt-8 p-4 border border-black/50 rounded-lg ">
              <p className="text-2xl font-bold">Ingridient Details</p>
              {subTask.gptInfo.ingridientDetails &&
                subTask.gptInfo.ingrdientQuantities &&
                subTask.gptInfo.ingridientDetails.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="mt-4 p-4 border border-black/20 rounded-lg"
                      >
                        <div className="text-lg font-bold">
                          {item.name}:-
                          {(subTask.gptInfo?.ingrdientQuantities &&
                            subTask.gptInfo?.ingrdientQuantities[item.name]) ||
                            0}{" "}
                          gm
                        </div>

                        <div className="bg-gray-200 p-4 mt-4 rounded-lg border border-blue-500">
                          <div>Standard Quantity:- {item.quantity} gm</div>
                          <div>Kilo Calories:{item.kcal} kcal</div>
                          <div>Protein:- {item.protein} gm</div>
                          <div>
                            Carbs:-
                            {item.carbs} gm
                          </div>
                          <div>
                            Fiber:-
                            {item.fiber} gm
                          </div>
                          <div>Fats:- {item.fats} gm</div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <div className="">
            <div className="mt-8 p-4 border border-black/50 rounded-lg ">
              <p className="text-xl font-bold">Cooking Instructions</p>
              {subTask.gptInfo.cookingInstructions &&
                subTask.gptInfo.cookingInstructions.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="mt-4 p-4 border border-black/20 rounded-lg"
                      >
                        <div>
                          {index + 1}. {item}
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="p-4 bg-gray-100 border-red-500 border mt-4">
        <div className="pt-8 text-red-600">
          * Add the fields in this section, if GPT is wrong
        </div>

        <div>
          <NutritionFactsComp
            protein={subTask?.nutrientValues?.protein}
            carbs={subTask?.nutrientValues?.carbs}
            fats={subTask?.nutrientValues?.fats}
            fiber={subTask?.nutrientValues?.fibre}
            onUpdateKcal={onUpdateKcal}
            onUpdateNutriFacts={onUpdateNutriFacts}
            kcal={subTask?.kcal}
          />
        </div>

        <div className="pt-8 ">
          <TextField
            select
            style={{ width: "100%" }}
            placeholder={"Serving Type"}
            label={"Serving Type"}
            variant="outlined"
            onChange={(e) => onUpdateServingType(e.target.value as servingType)}
            value={subTask?.servingType || "NO ENTRY"}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {/* <MenuItem value="gram">gram</MenuItem> */}
            {/* <MenuItem value="ml">ml</MenuItem> */}
            <MenuItem value="cup">
              cup - {config?.nutritionMetrics.cup.value}{" "}
              {config?.nutritionMetrics.cup.unit}
            </MenuItem>
            <MenuItem value="bowl">
              bowl - {config?.nutritionMetrics.bowl.value}{" "}
              {config?.nutritionMetrics.bowl.unit}
            </MenuItem>
            <MenuItem value="small-bowl">
              small bowl - {config?.nutritionMetrics["small-bowl"].value}{" "}
              {config?.nutritionMetrics["small-bowl"].unit}
            </MenuItem>
            <MenuItem value="katori">
              katori - {config?.nutritionMetrics.katori.value}{" "}
              {config?.nutritionMetrics.katori.unit}
            </MenuItem>
            <MenuItem value="teaspoon">
              teaspoon - {config?.nutritionMetrics.teaspoon.value}{" "}
              {config?.nutritionMetrics.teaspoon.unit}
            </MenuItem>
            <MenuItem value="tablespoon">
              tablespoon - {config?.nutritionMetrics.tablespoon.value}{" "}
              {config?.nutritionMetrics.tablespoon.unit}
            </MenuItem>
            <MenuItem value="glass">
              glass - {config?.nutritionMetrics.glass.value}{" "}
              {config?.nutritionMetrics.glass.unit}
            </MenuItem>
            <MenuItem value="count">count</MenuItem>
            <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
          </TextField>
        </div>
        <div className="pt-8">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Serving Value acording to Servintg Type"}
            label={"Serving Value"}
            variant="outlined"
            onChange={(val) =>
              onUpdateServingValue(parseFloat(val.target.value))
            }
            value={subTask?.servingValue || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      {/* <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Weight Type"}
          label={"Weight Type"}
          variant="outlined"
          onChange={(e) => onUpdateWeightType(e.target.value as weightType)}
          value={subTask?.wtType || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="gram">gram</MenuItem>
          <MenuItem value="ml">ml</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Weight Value acording to Weight Type"}
          label={"Weight Value"}
          variant="outlined"
          onChange={(val) => onUpdateWeightValue(parseInt(val.target.value))}
          value={subTask?.wtValue || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div> */}
    </>
  );
};

export default NtritionSubTaaskFields;
