import { fetchGptResponse } from "@hooks/chatbot/insights/api";
import { gptPrompts } from "@models/config/config";
import { createNewCustomizedRecipe } from "@models/Tasks/createUtils";
import { Ingredient, Task } from "@models/Tasks/Task";
import { useUserStore } from "@providers/user/store/useUserStore";
import { create } from "zustand";

export type cookingTime = "5_minutes" | "15_minutes" | "30_minutes";
interface selectedIngredientsType {
  name: string;
  status: boolean;
}

// interface SelectedIngredientType {
//   ingredientName: string;
//   status: boolean;
//   // [ingKey: string]: boolean
// }

export interface RecipeData {
  taskId: string;
  task: Task | undefined;
  ingredients: Ingredient[];
  time: cookingTime;
  setTime: (time: cookingTime) => void;
  selectedIngredientsArrayOrdered: selectedIngredientsType[];
  selectedIngredientsArray: string[];
  onToggleIngredient: (newValue: string, index: number) => void;
  onInit: (task: Task | undefined) => void;
  ingredientFetching: "fetching" | "done" | "error";
  generatedIngredients: string[] | undefined;
  findIngredientReplacement: (
    title: string,
    apiKey?: string,
    prompt?: gptPrompts
  ) => void;
  generateRecipe: (apiKey: string, prompt: gptPrompts) => void;
  fetchingStatus: "fetching" | "done" | "error";
  generatedTask: Task | undefined;
  generatedTaskId: string | undefined;
  addSelectedIngredient: (
    newIngredient: string,
    previousIngredient: string,
    indexOfPreviousIngredient: number
  ) => void;
  clearIngredients: () => void;
}

const useCustomRecipe = create<RecipeData>((set, get) => {
  return {
    taskId: "",
    task: undefined,
    time: "5_minutes",
    ingredients: [],
    selectedIngredientsArray: [],
    selectedIngredientsArrayOrdered: [],
    fetchingStatus: "fetching",
    generatedTask: undefined,
    generatedTaskId: undefined,
    generatedIngredients: undefined,
    ingredientFetching: "fetching",
    setTime: (newTime) => {
      set((state) => ({
        ...state,
        time: newTime,
      }));
    },
    onToggleIngredient: (newValue: string, index: number) => {
      set((state) => {
        let indexOfElement = index;
        let selectedIngredientsArray: string[] = state.selectedIngredientsArray;
        let selectedIngredientsArrayOrdered =
          state.selectedIngredientsArrayOrdered;

        if (state.selectedIngredientsArrayOrdered[indexOfElement].status) {
          selectedIngredientsArray = [
            ...selectedIngredientsArray.slice(0, indexOfElement),
            ...selectedIngredientsArray.slice(indexOfElement + 1),
          ];

          selectedIngredientsArrayOrdered[indexOfElement] = {
            name: newValue,
            status: false,
          };
        } else {
          selectedIngredientsArrayOrdered[indexOfElement] = {
            name: newValue,
            status: true,
          };
          selectedIngredientsArray.splice(indexOfElement, 0, newValue);
        }
        return {
          ...state,
          selectedIngredientsArray: selectedIngredientsArray,
          selectedIngredientsArrayOrdered: selectedIngredientsArrayOrdered,
        };
      });
    },
    clearIngredients: () => {
      set((state) => ({
        ...state,
        fetchingStatus: "fetching",
        generatedIngredients: undefined,
      }));
    },
    onInit: (newTask) => {
      set((state) => {
        if (newTask?.ingredients) {
          let selectedIngredientsArray: string[] = [];
          let selectedIngredientsArrayOrdered: selectedIngredientsType[] = [];
          newTask.ingredients.forEach((ingredient) => {
            selectedIngredientsArray.push(ingredient.name);
            selectedIngredientsArrayOrdered.push({
              name: ingredient.name,
              status: true,
            });
          });
          return {
            ...state,
            taskId: newTask.id,
            task: newTask,
            ingredients: [...newTask.ingredients],
            selectedIngredientsArray: selectedIngredientsArray,
            selectedIngredientsArrayOrdered: selectedIngredientsArrayOrdered,
          };
        } else if (newTask?.id) {
          return {
            ...state,
            task: newTask,
            taskId: newTask.id || "",
          };
        } else {
          return {
            ...state,
            taskId: "",
          };
        }
      });
    },
    addSelectedIngredient: (
      newIngredient,
      previousIngredient,
      indexOfPreviousIngredient
    ) => {
      set((state) => {
        const selectedIngredientsArray = state.selectedIngredientsArray;
        const selectedIngredientsArrayOrdered =
          state.selectedIngredientsArrayOrdered;

        selectedIngredientsArray[indexOfPreviousIngredient] = newIngredient;
        selectedIngredientsArrayOrdered[indexOfPreviousIngredient] = {
          name: newIngredient,
          status: true,
        };

        return {
          ...state,
          selectedIngredientsArray: selectedIngredientsArray,
          selectedIngredientsArrayOrdered: selectedIngredientsArrayOrdered,
        };
      });
    },
    findIngredientReplacement: async (
      title: string,
      apiKey?: string,
      prompt?: gptPrompts
    ) => {
      set((state) => ({
        ...state,
        ingredientFetching: "fetching",
        generatedIngredients: undefined,
      }));
      const uid = useUserStore.getState().user?.uid;
      const {
        selectedIngredientsArray,
        task,
        selectedIngredientsArrayOrdered,
      } = get();

      if (apiKey) {
        try {
          let response = await fetchGptResponse(
            [
              {
                role: "user",
                content: `You are a chefAI.  I will send you dish name, ingredients used in dish, all ingredients i have and a ingredient from the dish which i want to replace with a ingredient which has similar taste and give similar health and nutrition value and fit well in the dish.Remember that ingredient must be different from the already available ingredients and easily available in india.

            Return me a list of at least 4 ingredients and at most 10 ingredients.Strictly only Return the ingredient names in a array. dont send any other information.

            dish name: ${task?.name}
            ingredients used in dish: ${selectedIngredientsArray.filter(
              (ingredientSelected, indexOfIngredient) => {
                return (
                  selectedIngredientsArrayOrdered[indexOfIngredient].status ===
                  true
                );
              }
            )}
            replace ingredient: ${title}
            ingredients i have:${selectedIngredientsArray}
            `,
              },
            ],
            prompt?.model ? prompt.model : "gpt-3.5-turbo",
            apiKey,
            prompt?.temperature,
            prompt?.top_p,
            prompt?.max_tokens,
            prompt?.presence_penalty,
            prompt?.frequency_penalty,
            uid ? uid : "",
            prompt?.type ? prompt?.type : "na"
          );

          if (response?.choices[0].message.content) {
            let ingredientArray = JSON.parse(
              response?.choices[0].message.content
            ) as string[];
            if (!ingredientArray) {
              set((state) => ({
                ...state,
                ingredientFetching: "error",
              }));
              return;
            }
            set((state) => ({
              ...state,
              ingredientFetching: "done",
              generatedIngredients: ingredientArray,
            }));
          } else {
            set((state) => ({
              ...state,
              ingredientFetching: "error",
            }));
          }
        } catch (error) {
          set((state) => ({
            ...state,
            ingredientFetching: "error",
            generatedIngredients: undefined,
          }));
        }
      } else {
        set((state) => ({
          ...state,
          ingredientFetching: "error",
        }));
      }
    },
    generateRecipe: async (apiKey: string, prompt: gptPrompts) => {
      const uid = useUserStore.getState().user?.uid;
      const { selectedIngredientsArray, time, taskId } = get();

      console.log(selectedIngredientsArray, time);

      set((state) => ({
        ...state,
        fetchingStatus: "fetching",
        generatedTask: undefined,
        generatedTaskId: undefined,
      }));
      if (uid) {
        try {
          let response = await fetchGptResponse(
            [
              ...prompt.prompt,
              {
                role: "user",
                content: `Available ingredients:${selectedIngredientsArray.join(
                  ","
                )}
            Available time: ${time}`,
              },
            ],
            prompt.model ? prompt.model : "gpt-3.5-turbo",
            apiKey,
            prompt.temperature,
            prompt.top_p,
            prompt.max_tokens,
            prompt.presence_penalty,
            prompt.frequency_penalty,
            uid,
            prompt.type ? prompt.type : "na"
          );

          if (response?.choices[0]) {
            let parsedData = JSON.parse(response.choices[0].message.content);
            if (!parsedData) {
              set((state) => ({
                ...state,
                fetchingStatus: "error",
              }));
              return;
            }
            const result = await createNewCustomizedRecipe(
              taskId,
              parsedData,
              uid,
              time
            );
            if (result) {
              console.log("generatedTaskId", result.id);
              set((state) => ({
                ...state,
                fetchingStatus: "done",
                generatedTask: result,
                generatedTaskId: result.id,
              }));
            } else {
              set((state) => ({
                ...state,
                fetchingStatus: "error",
              }));
            }
          } else {
            set((state) => ({
              ...state,
              fetchingStatus: "error",
            }));
          }
        } catch (error) {
          set((state) => ({
            ...state,
            fetchingStatus: "error",
          }));
        }
      } else {
        set((state) => ({
          ...state,
          fetchingStatus: "error",
        }));
      }
    },
  };
});

export default useCustomRecipe;
