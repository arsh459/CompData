import { Ingredient, Task } from "@models/Tasks/Task";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface Props {
  task?: Task;
  addIngredients: (val: Ingredient, index?: number) => void;
  removeIngredients: (val: Ingredient) => void;
}

const HandleIngredients: React.FC<Props> = ({
  task,
  addIngredients,
  removeIngredients,
}) => {
  const [ingredientData, setIngredientData] = useState<Ingredient>({
    name: "",
    qty: 0,
    unit: "",
  });
  const [editIndex, setEditIndex] = useState<number | undefined>();

  const onHandleIngredientFields = () => {
    if (editIndex !== undefined) {
      const updatedIngredients =
        task && task?.ingredients ? [...task.ingredients] : [];
      updatedIngredients[editIndex] = ingredientData;
      addIngredients(updatedIngredients[editIndex], editIndex);
    } else {
      addIngredients(ingredientData);
    }
    setIngredientData({
      name: "",
      qty: 0,
      unit: "",
    });
    setEditIndex(undefined);
  };

  const handleInput = (value: string, key: keyof Ingredient) => {
    setIngredientData((prev) => ({
      ...prev,
      [key]: key === "qty" ? parseFloat(value) : value,
    }));
  };

  const onEditIngredient = (index: number) => {
    const ingredient =
      task && task?.ingredients ? task?.ingredients[index] : undefined;
    if (ingredient) {
      setIngredientData({
        name: ingredient.name,
        qty: ingredient.qty,
        unit: ingredient.unit,
      });
      setEditIndex(index);
    }
  };

  return (
    <div className="mt-2 border-2 border-dashed border-blue-500 ">
      <p className="text-lg text-gray-700">Ingredient Field Table</p>

      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Ingredient Name"}
          label={"Ingredient Name"}
          multiline={true}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "name")}
          value={ingredientData.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Ingredient Qty"}
          label={"Ingredient Qty"}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "qty")}
          value={ingredientData.qty}
          type="number"
        />
      </div>
      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Unit"}
          label={"Unit"}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "unit")}
          value={ingredientData.unit}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={onHandleIngredientFields}
        >
          {editIndex !== undefined ? "Update Ingredient" : "Add Ingredient"}
        </Button>
      </div>
      <div className="pt-4">
        {task && task?.ingredients?.length ? (
          <div className="bg-gray-200 p-2">
            {task.ingredients.map((ing, i) => (
              <div key={`${i}-ing`} className="border-b border-gray-300 py-2">
                <div>
                  <p className="w-2/3 inline-block">{ing.name}</p>

                  <p className="w-1/6 inline-block">{ing.qty}</p>
                  <p className="w-1/6 inline-block">{ing.unit}</p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEditIngredient(i)}
                    className="mx-4"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeIngredients(ing)}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default HandleIngredients;
