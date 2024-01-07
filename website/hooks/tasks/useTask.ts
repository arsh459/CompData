import { useCallback, useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  Coord,
  DifficultyLevelsTypes,
  labelType,
  Task,
  taskFrequency,
  TaskTypes,
  NutritionFacts,
  Equipment,
  Exercise,
  MealTypes,
  Ingredient,
  DietCard,
  SubTaskElement,
  dishCategories,
} from "@models/Tasks/Task";
import { createNewTask } from "@models/Tasks/createUtils";

export type boolKeys =
  | "isReel"
  | "freeTask"
  | "preview"
  | "landingPage"
  | "oneTimeOnly"
  | "levelBoosterTask"
  | "onLevelOnly"
  | "finaleTask"
  | "gameTask"
  | "searchable"
  | "canCheckIn";

export type stringKeys =
  | "name"
  | "description"
  | "userId"
  | "playbackId"
  | "lowResPlaybackId"
  | "reelPlaybackId"
  | "reelId"
  | "liveLink"
  | "rules"
  | "note"
  | "badgeId"
  | "sectionId"
  | "specialityText"
  | "prepTime"
  | "cookTime"
  | "totalTime"
  | "category"
  | "cuisine"
  | "recipeTaskId"
  | "yields"
  | "baseTaskId"
  | "gptImageUrl";

export type numberKeys =
  | "videoIntroDur"
  | "kcal"
  | "distance"
  | "liveOn"
  | "fitPoints"
  | "readyIn"
  | "durationMinutes"
  | "priority"
  | "startOn"
  | "endOn"
  | "numClaps"
  | "level"
  | "stepsToDo"
  | "agilityScore"
  | "strengthScore"
  | "cardioScore"
  | "enduranceScore"
  | "unlocksAtRank";

export type mediatype =
  | "avatar"
  | "lowResMedia"
  | "thumbnails"
  | "videoThumbnail"
  | "bgImage"
  | "previewMedia"
  | "reelMedia"
  | "reelThumbnail"
  | "specialityIcon";

export const uppyArr: mediatype[] = [
  "avatar",
  "thumbnails",
  "videoThumbnail",
  "bgImage", // dep
  "previewMedia",
  "reelMedia",
  "reelThumbnail",
  "specialityIcon",
];

export const useTask = (uid: string, id?: string, gptGenerated?: boolean) => {
  const [task, setTask] = useState<Task>();
  useEffect(() => {
    if (id) {
      const ref = doc(db, gptGenerated ? "gptTasks" : "tasks", id);

      const unsubscribe = onSnapshot(ref, (task) => {
        setTask(task.data() as Task);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setTask(createNewTask(uid));
    }
  }, [uid, id]);

  const addSubTaskEle = (newSubTask: SubTaskElement) => {
    setTask((prev) => {
      if (prev) {
        const { subTasks, ...rest } = prev;
        return {
          ...rest,
          subTasks:
            subTasks && subTasks.length
              ? [...subTasks, newSubTask]
              : [newSubTask],
        };
      }
    });
  };

  const editSubTaskEle = (subTask: SubTaskElement) => {
    setTask((prev) => {
      if (prev) {
        const { subTasks, ...rest } = prev;
        const newSubTaskS = subTasks?.map((each) =>
          each.subTaskId === subTask.subTaskId ? subTask : each
        );
        return {
          ...rest,
          subTasks: newSubTaskS,
        };
      }
    });
  };

  const removeSubTaskEle = (subTask: SubTaskElement) => {
    setTask((prev) => {
      if (prev) {
        const { subTasks, ...rest } = prev;
        const newSubTasks = subTasks?.filter((each) => each !== subTask);
        return newSubTasks && newSubTasks.length
          ? {
              ...rest,
              subTasks: newSubTasks,
            }
          : rest;
      }
    });
  };

  const onMediaUpload = useCallback(
    (key: mediatype, newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setTask((prev) => {
        if (prev) {
          return {
            ...prev,
            [key]: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback((key: mediatype) => {
    setTask((prev) => {
      if (prev) {
        const remoteTask = { ...prev };
        delete remoteTask[key];
        return remoteTask;
      }
    });
  }, []);

  function updateValue(
    valueNum: NutritionFacts,
    key: keyof NutritionFacts,
    newValue: string
  ): NutritionFacts {
    const numericValue = parseFloat(newValue);
    return {
      ...valueNum,
      [key]: numericValue,
    };
  }

  const onUpdateNutriFacts = useCallback(
    (newVal: string, key: keyof NutritionFacts) => {
      setTask((prev) => {
        if (prev) {
          return {
            ...prev,
            nutritionFacts: updateValue(
              prev?.nutritionFacts || {},
              key,
              newVal
            ),
          };
        }
      });
    },
    []
  );

  const addDietCard = (dietCard: DietCard) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          dietCards: prev?.dietCards
            ? [...prev.dietCards, dietCard]
            : [dietCard],
        };
      } else {
        return prev;
      }
    });
  };

  const removeDietCard = (dietCardId: string) => {
    setTask((prev) => {
      if (!prev) return prev;

      const updatedDietCards = prev?.dietCards?.filter(
        (dietCard) => dietCard.id !== dietCardId
      );
      return {
        ...prev,
        dietCards: updatedDietCards,
      };
    });
  };

  const updateDietCard = (updatedDietCard: DietCard) => {
    setTask((prev) => {
      if (prev) {
        const updatedDietCards = prev?.dietCards?.map((d) =>
          d.id === updatedDietCard.id ? updatedDietCard : d
        );
        return {
          ...prev,
          dietCards: updatedDietCards,
        };
      }
      return prev;
    });
  };

  const onUpdateType = (newVal: "standard" | "mediaTask") => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          type: newVal,
        };
      }
    });
  };

  const onOrientationUpdate = (newVal: "landscape" | "portrait") => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          orientation: newVal,
        };
      }
    });
  };

  const onUpdateTaskType = (newVal: TaskTypes) => {
    setTask((prev) => {
      if (prev) {
        const remoteTask = {
          ...prev,
          taskType: newVal,
        };
        return remoteTask;
      }
    });
  };

  const onUpdateMealTypes = (newVal: MealTypes) => {
    setTask((prev) => {
      if (prev) {
        return { ...prev, mealTypes: newVal };
      }
    });
  };

  const onUpdateDishCategory = (newVal: dishCategories) => {
    setTask((prev) => {
      if (prev) {
        return { ...prev, dishCategory: newVal };
      }
    });
  };

  const onfrequencyType = (newVal: taskFrequency) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          taskFrequency: newVal,
        };
      }
    });
  };

  const onUpdateCheckBox = (val: labelType) => {
    setTask((prev) => {
      if (prev) {
        // if val in prev.labels
        if (prev.labels && prev.labels.includes(val)) {
          return {
            ...prev,
            labels: prev.labels.filter((item) => item !== val),
          };
        } else if (prev.labels && !prev.labels.includes(val)) {
          return {
            ...prev,
            labels: [...prev.labels, val],
          };
        } else if (!prev.labels) {
          return {
            ...prev,
            labels: [val],
          };
        }
      }
    });
  };
  const addEquipment = (equipment: Equipment) => {
    const values = task?.equipmentNeeded
      ? [...task.equipmentNeeded, equipment]
      : [equipment];

    setTask((prev) => {
      if (prev) {
        return { ...prev, equipmentNeeded: values };
      }
    });
  };
  const addSteps = (steps: string, index?: number) => {
    setTask((prev) => {
      if (prev) {
        const values = prev.cookingInstruction
          ? [...prev.cookingInstruction]
          : [];

        if (index === undefined) {
          values.push(steps);
        } else {
          values[index] = steps;
        }

        return { ...prev, cookingInstruction: values };
      }
    });
  };
  const addTags = (steps: string, index?: number) => {
    setTask((prev) => {
      if (prev) {
        const values = prev.tags ? [...prev.tags] : [];

        if (index === undefined) {
          values.push(steps);
        } else {
          values[index] = steps;
        }

        return { ...prev, tags: values };
      }
    });
  };

  const removeSteps = (step: string) => {
    const values =
      task?.cookingInstruction &&
      task.cookingInstruction.filter((each) => each !== step);

    setTask((prev) => {
      if (prev && values) {
        return { ...prev, cookingInstruction: values };
      }
    });
  };

  const removeTags = (step: string) => {
    const values = task?.tags && task.tags.filter((each) => each !== step);

    setTask((prev) => {
      if (prev && values) {
        return { ...prev, tags: values };
      }
    });
  };
  const removeEquipment = (equipment: Equipment) => {
    const values =
      task?.equipmentNeeded &&
      task.equipmentNeeded.filter((each) => each !== equipment);

    setTask((prev) => {
      if (prev && values) {
        return { ...prev, equipmentNeeded: values };
      }
    });
  };
  const addExercise = (exercise: Exercise) => {
    const values = task?.exercises ? [...task.exercises, exercise] : [exercise];

    setTask((prev) => {
      if (prev) {
        return { ...prev, exercises: values };
      }
    });
  };
  const removeExercise = (exercise: Exercise) => {
    const values =
      task?.exercises && task.exercises.filter((each) => each !== exercise);

    setTask((prev) => {
      if (prev && values) {
        return { ...prev, exercises: values };
      }
    });
  };
  const addIngredients = (val: Ingredient, index?: number) => {
    const updatedIngredients = task?.ingredients ? [...task.ingredients] : [];
    if (index !== undefined) {
      updatedIngredients[index] = val;
    } else {
      updatedIngredients.push(val);
    }
    setTask((prev) => {
      if (prev) {
        return { ...prev, ingredients: updatedIngredients };
      }
    });
  };

  const removeIngredients = (val: Ingredient) => {
    console.log({ val });

    const values =
      task?.ingredients && task.ingredients.filter((each) => each !== val);

    setTask((prev) => {
      if (prev && values) {
        return { ...prev, ingredients: values };
      }
    });
  };

  const onUpdateGameId = (newVal: string, action: "add" | "remove") => {
    setTask((prev) => {
      if (action === "add" && prev) {
        return {
          ...prev,
          games: [...(prev.games ? prev.games : []), newVal].filter(
            (it, i, ar) => ar.indexOf(it) === i
          ),
        };
      } else if (action === "remove" && prev?.games) {
        return {
          ...prev,
          games: prev.games.filter((item) => item !== newVal),
        };
      }
    });
  };

  const onUpdateCoords = (newCoords: Coord[]) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          path: newCoords,
        };
      }

      return prev;
    });
  };

  const onUpdateDifficultyLevel = (newVal?: DifficultyLevelsTypes) => {
    setTask((prev) => {
      console.log(prev);
      if (prev) {
        return {
          ...prev,
          difficultyLevels: newVal,
        };
      }
    });
  };
  // const onUpdateSpecialityText = (newVal?: string) => {
  //   setTask((prev) => {
  //     console.log(prev);
  //     if (prev) {
  //       return {
  //         ...prev,
  //         specialityText: newVal,
  //       };
  //     }
  //   });
  // };

  const [inputFields, setInputFields] = useState([{ text: "", fitPoints: 0 }]);

  const onHandleInputFields = (
    index: number,
    value: string,
    key: "text" | "fitPoints"
  ) => {
    const values = [...inputFields];
    if (key === "fitPoints") {
      values[index][key] = parseInt(value);
    } else if (key === "text") {
      values[index][key] = value;
    }

    setInputFields(values);
  };

  const addInputField = () => {
    setInputFields([...inputFields, { text: "", fitPoints: 0 }]);
  };

  const removeInputField = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onhandleAwardsLevel = () => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          awardLevels: inputFields,
        };
      }
    });
  };

  const onAddParentId = (id: string) => {
    setTask((prev) => {
      if (prev) {
        const newParentList = [
          ...(prev.parentTaskIds ? prev.parentTaskIds : []),
          id,
        ];

        const filtered = newParentList.filter((c, index) => {
          return newParentList.indexOf(c) === index;
        });

        return {
          ...prev,
          parentTaskIds: filtered,
        };
      }
    });
  };

  const removeParentId = (id: string) => {
    setTask((prev) => {
      if (prev) {
        const newParentList = [
          ...(prev.parentTaskIds ? prev.parentTaskIds : []),
        ];

        const filtered = newParentList.filter((c) => {
          return c !== id;
        });

        return {
          ...prev,
          parentTaskIds: filtered,
        };
      }
    });
  };

  const onAddBadgeIdToArr = (id: string) => {
    setTask((prev) => {
      if (prev) {
        const newBadgeIdList = [...(prev.badgeIds ? prev.badgeIds : []), id];

        const filtered = newBadgeIdList.filter((c, index) => {
          return newBadgeIdList.indexOf(c) === index;
        });

        return {
          ...prev,
          badgeIds: filtered,
        };
      }
    });
  };

  const onRemoveBadgeIdFromList = (id: string) => {
    setTask((prev) => {
      if (prev) {
        const oldBadgeIds = [...(prev.badgeIds ? prev.badgeIds : [])];

        const filtered = oldBadgeIds.filter((c) => {
          return c !== id;
        });

        return {
          ...prev,
          badgeIds: filtered,
        };
      }
    });
  };

  const addDay = (id: number) => {
    setTask((prev) => {
      if (prev) {
        const newParentList = [
          ...(prev.programDays ? prev.programDays : []),
          id,
        ];

        const filtered = newParentList.filter((c, index) => {
          return newParentList.indexOf(c) === index;
        });

        return {
          ...prev,
          programDays: filtered,
        };
      }
    });
  };

  const removeDay = (day: number) => {
    setTask((prev) => {
      if (prev) {
        const newProgDays = [...(prev.programDays ? prev.programDays : [])];

        const filtered = newProgDays.filter((c) => {
          return c !== day;
        });

        return {
          ...prev,
          programDays: filtered,
        };
      }
    });
  };

  const addDayPriority = (day: number, priority: number) => {
    setTask((prev) => {
      if (prev) {
        const newProgDays = [...(prev.programDays ? prev.programDays : [])];

        const filtered = newProgDays.filter((c) => {
          return c !== day;
        });

        return {
          ...prev,
          programDays: filtered,
          priorityObj: {
            ...(prev.priorityObj ? prev.priorityObj : {}),
            [day]: priority,
          },
        };
      }
    });
  };

  const onBoolUpdate = useCallback((key: boolKeys, newVal: boolean) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onStringUpdate = useCallback((key: stringKeys, newVal: string) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onNumberUpdate = useCallback((key: numberKeys, newVal: string) => {
    setTask((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: parseInt(newVal),
        };
      }
    });
  }, []);

  return {
    task,
    setTask,
    onMediaDelete,
    onMediaUpload,
    onUpdateGameId,
    onUpdateType,
    onOrientationUpdate,
    onUpdateDifficultyLevel,
    onhandleAwardsLevel,
    inputFields,
    onHandleInputFields,
    removeInputField,
    addInputField,
    onUpdateCheckBox,
    onfrequencyType,
    onAddParentId,
    removeParentId,
    addDay,
    removeDay,
    addDayPriority,
    onUpdateTaskType,
    onUpdateCoords,
    onUpdateNutriFacts,
    addEquipment,
    removeEquipment,
    addExercise,
    removeExercise,
    onAddBadgeIdToArr,
    onRemoveBadgeIdFromList,
    addSteps,
    removeSteps,
    addIngredients,
    removeIngredients,
    addDietCard,
    removeDietCard,
    updateDietCard,
    onUpdateMealTypes,
    addTags,
    removeTags,
    addSubTaskEle,
    removeSubTaskEle,
    editSubTaskEle,
    onBoolUpdate,
    onStringUpdate,
    onNumberUpdate,
    onUpdateDishCategory,
  };
};
