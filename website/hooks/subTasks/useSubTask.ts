import {
  AISuggest,
  GptSubTask,
  IngredientCollection,
  IngridientDetails,
  NutritionFacts,
  servingType,
  SubTask,
  // weightType,
} from "@models/Tasks/Task";
import { useCallback, useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewTask } from "./utils";

export const useSubTask = (id: string) => {
  const [subTask, setSubTask] = useState<SubTask>();

  useEffect(() => {
    if (id) {
      const ref = doc(db, "subTasks", id);
      const ref2 = query(collection(ref, "ingredients"));

      const unsubscribe = onSnapshot(ref, (subTaskDoc) => {
        if (subTaskDoc.data()) {
          setSubTask(subTaskDoc.data() as SubTask);
        }
      });

      const unsubscribe2 = onSnapshot(ref2, (snapshot) => {
        let obj: { [ingKey: string]: number | string } = {};
        let arr: IngridientDetails[] = [];
        snapshot.forEach((change) => {
          if (change.data()) {
            let data = change.data() as IngredientCollection;
            let { id, qtyRequiredForSubTask, ...rest } = data;
            arr.push(rest);
            obj[data.name] = qtyRequiredForSubTask;
          }
        });

        if (arr.length > 0 && obj) {
          setSubTask((prev) => {
            if (prev && prev.gptInfo) {
              let protein =
                calcNutrition(
                  {
                    ...prev.gptInfo,
                    ingrdientQuantities: obj,
                    ingridientDetails: arr,
                  },
                  "protein"
                ) || 0;
              let carbs =
                calcNutrition(
                  {
                    ...prev.gptInfo,
                    ingrdientQuantities: obj,
                    ingridientDetails: arr,
                  },
                  "carbs"
                ) || 0;
              let fiber =
                calcNutrition(
                  {
                    ...prev.gptInfo,
                    ingrdientQuantities: obj,
                    ingridientDetails: arr,
                  },
                  "fibre"
                ) || 0;
              let fats =
                calcNutrition(
                  {
                    ...prev.gptInfo,
                    ingrdientQuantities: obj,
                    ingridientDetails: arr,
                  },
                  "fats"
                ) || 0;
              let originalKcal = calcKcal(
                {
                  ...prev.gptInfo,
                  ingrdientQuantities: obj,
                  ingridientDetails: arr,
                },
                "kcal"
              );
              let kcal = 4 * protein + 4 * carbs + 9 * fats;
              return {
                ...prev,
                gptInfo: {
                  ...prev?.gptInfo,
                  nutrientValues: {
                    ...prev.nutrientValues,
                    protein: Number(protein.toFixed(2)),
                    carbs: Number(carbs.toFixed(2)),
                    fibre: Number(fiber.toFixed(2)),
                    fats: Number(fats.toFixed(2)),
                  },
                  kcal: Number((originalKcal || kcal).toFixed()),
                  ingrdientQuantities: obj,
                  ingridientDetails: arr,
                },
              };
            }
          });
        }
      });

      return () => {
        unsubscribe();
        unsubscribe2();
      };
    } else {
      setSubTask(createNewTask());
    }
  }, [id]);

  const updateAISuggest = (data: AISuggest) => {
    setSubTask((prev) => {
      if (prev) {
        let protein = calcNutrition(data, "protein") || 0;
        let carbs = calcNutrition(data, "carbs") || 0;
        let fiber = calcNutrition(data, "fibre") || 0;
        let fats = calcNutrition(data, "fats") || 0;
        let originalKcal = calcKcal(data, "kcal");
        let kcal = 4 * protein + 4 * carbs + 9 * fats;
        return {
          ...prev,
          gptInfo: {
            ...data,
            nutrientValues: {
              protein: Number(protein.toFixed(2)),
              carbs: Number(carbs.toFixed(2)),
              fibre: Number(fiber.toFixed(2)),
              fats: Number(fats.toFixed(2)),
            },
            kcal: Number((originalKcal || kcal).toFixed()),
          },
          aiSuggest: {
            ...data,
            nutrientValues: {
              protein: Number(protein.toFixed(2)),
              carbs: Number(carbs.toFixed(2)),
              fibre: Number(fiber.toFixed(2)),
              fats: Number(fats.toFixed(2)),
            },
            kcal: Number((originalKcal || kcal).toFixed()),
          },
        };
      }
    });
  };

  const calcNutrition = (info: GptSubTask, key: keyof NutritionFacts) => {
    if (info.ingrdientQuantities && info.ingridientDetails) {
      let netWeightOfDish = 0;
      Object.values(info.ingrdientQuantities).forEach((item) => {
        if (parseFloat(item.toString()))
          netWeightOfDish = netWeightOfDish + parseFloat(item.toString());
      });

      let netKey = 0;
      info.ingridientDetails.forEach((item) => {
        if (
          info.ingrdientQuantities &&
          info.ingrdientQuantities[item.name] &&
          parseFloat(info.ingrdientQuantities[item.name].toString())
        )
          netKey =
            netKey +
            (item[key === "fibre" ? "fiber" : key] *
              parseFloat(info.ingrdientQuantities[item.name].toString())) /
              100;
      });

      return (netKey * info.gramEquivalent) / netWeightOfDish;
    }
    return undefined;
  };

  const calcKcal = (info: GptSubTask, key: "kcal") => {
    if (info.ingrdientQuantities && info.ingridientDetails) {
      let netWeightOfDish = 0;
      Object.values(info.ingrdientQuantities).forEach((item) => {
        if (parseFloat(item.toString()))
          netWeightOfDish = netWeightOfDish + parseFloat(item.toString());
      });

      let netKey = 0;
      info.ingridientDetails.forEach((item) => {
        if (
          info.ingrdientQuantities &&
          info.ingrdientQuantities[item.name] &&
          parseFloat(info.ingrdientQuantities[item.name].toString())
        )
          netKey =
            netKey +
            (item.kcal *
              parseFloat(info.ingrdientQuantities[item.name].toString())) /
              100;
      });

      return (netKey * info.gramEquivalent) / netWeightOfDish;
    }
    return undefined;
  };

  const onUpdateTaskName = (newVal: string) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          taskName: newVal,
        };
      }
    });
  };

  const onUpdateFP = (newVal: number) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          fp: newVal,
        };
      }
    });
  };

  const onUpdateGptServingValue = (newVal: number) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          gptInfo: prev.gptInfo
            ? { ...prev.gptInfo, gptServingValue: newVal }
            : undefined,
        };
      }
    });
  };

  const onUpdateGptServingType = (newVal: string) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          gptInfo: prev.gptInfo
            ? { ...prev.gptInfo, gptServingType: newVal }
            : undefined,
        };
      }
    });
  };

  const onUpdateGptGramEquivalent = (newVal: number) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          gptInfo: prev.gptInfo
            ? { ...prev.gptInfo, gramEquivalent: newVal }
            : undefined,
        };
      }
    });
  };

  const onUpdateGptAssumption = (newVal: string) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          gptInfo: prev.gptInfo
            ? { ...prev.gptInfo, assumption: newVal }
            : undefined,
        };
      }
    });
  };

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setSubTask((prev) => {
        if (prev) {
          return {
            ...prev,
            taskMedia: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setSubTask((prev) => {
      if (prev) {
        const { taskMedia, ...rest } = prev;
        return rest;
      }
    });
  }, []);

  const onUpdateKcal = (newVal: string) => {
    setSubTask((prev) => {
      console.log(prev);
      if (prev) {
        return {
          ...prev,
          kcal: parseFloat(newVal),
        };
      }
    });
  };

  const onUpdateNutriFacts = (newVal: string, key: keyof NutritionFacts) => {
    setSubTask((prev) => {
      if (prev) {
        const newNum = parseFloat(newVal);
        const { nutrientValues, ...rest } = prev;

        // const updatedNutrientValues = {
        //   ...nutrientValues,
        //   [key]: typeof newNum === "number" ? newNum : 0,
        // };

        // const kcal = calculateKCalValue(updatedNutrientValues);

        return {
          ...rest,
          // kcal: kcal,
          nutrientValues: {
            ...nutrientValues,
            [key]: typeof newNum === "number" ? newNum : 0,
          },
        };
      }
    });
  };

  const onUpdateServingType = (newVal: servingType) => {
    setSubTask((prev) => {
      if (prev) {
        if (newVal === ("NO ENTRY" as servingType)) {
          return { ...prev };
        } else {
          return { ...prev, servingType: newVal };
        }
      }
    });
  };

  // const onUpdateWeightType = (newVal: weightType) => {
  //   setSubTask((prev) => {
  //     if (prev) {
  //       return { ...prev, wtType: newVal };
  //     }
  //   });
  // };

  const onUpdateServingValue = (newVal: number) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          servingValue: newVal,
        };
      }
    });
  };

  // const onUpdateWeightValue = (newVal: number) => {
  //   setSubTask((prev) => {
  //     if (prev) {
  //       return {
  //         ...prev,
  //         wtValue: newVal,
  //       };
  //     }
  //   });
  // };

  const onIsExerciseUpdate = (newVal: boolean) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          isExercise: newVal,
        };
      }
    });
  };

  const onUpdateQtyStep = (newVal: number) => {
    setSubTask((prev) => {
      if (prev) {
        return {
          ...prev,
          qtyStep: newVal,
        };
      }
    });
  };

  return {
    subTask,
    onUpdateTaskName,
    onUpdateFP,
    onMediaUpload,
    onMediaDelete,
    onUpdateKcal,
    onUpdateNutriFacts,
    onUpdateServingType,
    onUpdateServingValue,
    // onUpdateWeightType,
    // onUpdateWeightValue,
    onIsExerciseUpdate,
    onUpdateQtyStep,
    onUpdateGptServingValue,
    onUpdateGptServingType,
    onUpdateGptGramEquivalent,
    onUpdateGptAssumption,
    updateAISuggest,
    calcNutrition,
  };
};
