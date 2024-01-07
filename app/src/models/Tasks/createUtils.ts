import {
  // MealTypes,
  // goalResolutionStrategy,
  // KPIValue,
  Task,
  MealTypes,
  // TaskProgress,
} from "@models/Tasks/Task";
import { RNS3 } from "react-native-upload-aws-s3";
import { createAWSMedia } from "@components/MediaPicker/createUtils";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import * as ImagePicker from "expo-image-picker";
import {
  BUCKET,
  S3_AWS_REGION,
  SECRET_KEY,
  ACCESS_KEY,
} from "react-native-dotenv";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   getDocs,
//   query,
//   where,
// } from "@firebase/firestore";
// import { db } from "@config/firebase";
import firestore from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { KPIConfig, SystemKPIs } from "./SystemKPIs";
import { Activity } from "@models/Activity/Activity";
import crashlytics from "@react-native-firebase/crashlytics";
import { ChatGptCustomRecipe } from "@screens/CustomRecipeLoadingScreen";
// import { useUserStore } from "@providers/user/store/useUserStore";
// import { UserInterface } from "@models/User/User";
// import { document } from "postcss";
import { cookingTime } from "@providers/customRecipe/useCustomRecipe";
import axios from "axios";
// import { ImagePickerAsset } from "expo-image-picker";
import {
  getFileDetails,
  getFileWidthHeight,
} from "@components/MediaPicker/utils";
import { CapturedImageInterface } from "@modules/ImageCaptureScreen/store/useCameraImage";

interface imageData {
  created: Date;
  data: { url: string }[];
}

export const createNewTask = (uid: string): Task => {
  const now = Date.now();
  return {
    id: uuidv4(),
    createdOn: now,
    updatedOn: now,
    type: "standard",
    priority: 1,
    durationMinutes: 30,
    level: 0,
  };
};

// For Creating custom Recipe from ChatGPT
export const createNewCustomizedRecipe = async (
  taskId: string,
  newRecipe: ChatGptCustomRecipe,
  user: string,
  readyIn: cookingTime
  // reelThumbnail: string
) => {
  try {
    let result: Task | undefined;
    if (taskId && user) {
      const now = Date.now();
      const id = uuidv4();
      const Modifiedingredients = newRecipe.ingredientsArray.map(
        (item, index) => {
          if (Number(item.quantity)) {
            return {
              name: item.name,
              qty: Number(item.quantity),
              unit: item.unit,
            };
          } else {
            return {
              name: item.name,
              qty: 1,
              unit: item.quantity,
            };
          }
        }
      );
      const taskObj: Task = {
        taskType: "nutrition",
        mealTypes: newRecipe.mealType as MealTypes,
        isReel: true,
        // gptImageUrl: reelThumbnail,
        name: newRecipe.recipeNameArray[0],
        id: id,
        baseTaskId: taskId,
        userId: user,
        readyIn: Number(readyIn.split("_")[0]),
        ingredients: Modifiedingredients,
        kcal: Number(newRecipe.nutritionalValueArray[0].kcal),
        nutritionFacts: {
          protein: Number(newRecipe.nutritionalValueArray[0].protein),
          fibre: Number(newRecipe.nutritionalValueArray[0].fibre),
          fats: Number(newRecipe.nutritionalValueArray[0].fats),
          carbs: Number(newRecipe.nutritionalValueArray[0].carbs),
        },
        cookingInstruction: newRecipe.recipeCookingInstructionsArray,
        createdOn: now,
        updatedOn: now,
        gptGeneratedNutrition: true,
      };

      await firestore().collection("tasks").doc(id).set(taskObj);

      let doc = await firestore().collection("tasks").doc(id).get();
      if (doc.exists) {
        result = doc.data() as Task;
      }
    }

    return result;
  } catch (error) {
    return undefined;
  }
};

// For Generating Image from Gpt
export const getImageFromGpt = async (query: string, apiKey: string) => {
  let imageGenerated = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      prompt: query,
      n: 1,
      size: "512x512",
      response_format: "url",
    },
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );

  let data: imageData = imageGenerated.data;
  // let uploadToAws = await handleImageUpload(data, query);
  return data.data[0].url;
};

// For Uploading Gpt Images on Aws
export const handleImageUploadUsingBlob = async (
  capturedImage: CapturedImageInterface
) => {
  try {
    const id = uuidv4();
    const options = {
      keyPrefix: `webapp/${id}/`,
      bucket: BUCKET,
      region: S3_AWS_REGION,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY,
      successActionStatus: 201,
    };
    const fileName = `${new Date().getTime()}_${id}.png`;
    const type = "image/jpg";
    const width = capturedImage.width;
    const height = capturedImage.height;
    const fileExtension = "png";
    const fileSize = 512 * 512;
    const duration = undefined;

    const response = await RNS3.put(
      {
        uri: capturedImage.uri || capturedImage.localUri || "",
        name: "savedImage.png",
        type: "image/jpg",
      },
      options
    );

    if (
      response.status === 201 &&
      response.body.postResponse.location &&
      response.body.postResponse.key &&
      response.body.postResponse.bucket
    ) {
      const awsMedia = createAWSMedia(
        fileName,
        type === "image/jpg" ? "image" : "video",
        width,
        height,
        fileExtension,
        fileName,
        fileSize,
        response.body.postResponse.key,
        response.body.postResponse.bucket,
        fileName,
        S3_AWS_REGION,
        response.body.postResponse.location,
        duration
      );
      return awsMedia;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};
export const handleImageUploadUsingPicker = async (
  pickerResult: ImagePicker.ImagePickerResult
) => {
  try {
    if (pickerResult.canceled) {
      return undefined;
    } else {
      const assets = pickerResult.assets;
      if (assets.length) {
        const id = uuidv4();
        const { fileName, type, fileExtension, fileSize } = getFileDetails(
          assets[0]
        );
        const { width, height, duration } = await getFileWidthHeight(
          assets[0],
          type
        );
        const options = {
          keyPrefix: `webapp/${id}/`,
          bucket: BUCKET,
          region: S3_AWS_REGION,
          accessKey: ACCESS_KEY,
          secretKey: SECRET_KEY,
          successActionStatus: 201,
        };
        try {
          const response = await RNS3.put(
            {
              uri: assets[0].uri,
              name: fileName,
              type: "image/jpg",
            },
            options
          );
          if (
            response.status === 201 &&
            response.body.postResponse.location &&
            response.body.postResponse.key &&
            response.body.postResponse.bucket
          ) {
            const awsMedia = createAWSMedia(
              fileName,
              type === "image/jpg" ? "image" : "video",
              width,
              height,
              fileExtension,
              fileName,
              fileSize,
              response.body.postResponse.key,
              response.body.postResponse.bucket,
              fileName,
              S3_AWS_REGION,
              response.body.postResponse.location,
              duration
            );
            return awsMedia;
          } else {
            console.log("Failed to upload media to S3: ", response);
            return undefined;
          }
        } catch (error: any) {
          console.log((error as Error).message);
          crashlytics().recordError(error);
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  } catch (e: any) {
    console.log("e", e);
    crashlytics().recordError(e);
    return undefined;
  }
};

export const handleImageUpload = async (data: imageData, query: string) => {
  try {
    const id = uuidv4();
    const options = {
      keyPrefix: `webapp/${id}/`,
      bucket: BUCKET,
      region: S3_AWS_REGION,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY,
      successActionStatus: 201,
    };
    const fileName = `${new Date().getTime()}_${id}.png`;
    const type = "image/jpg";
    const width = 300;
    const height = 200;
    const fileExtension = "png";
    const fileSize = 512 * 512;
    const duration = undefined;

    const response = await RNS3.put(
      {
        uri: data.data[0].url,
        name: query,
        type: "image/jpg",
      },
      options
    );

    if (
      response.status === 201 &&
      response.body.postResponse.location &&
      response.body.postResponse.key &&
      response.body.postResponse.bucket
    ) {
      const awsMedia = createAWSMedia(
        fileName,
        type === "image/jpg" ? "image" : "video",
        width,
        height,
        fileExtension,
        fileName,
        fileSize,
        response.body.postResponse.key,
        response.body.postResponse.bucket,
        fileName,
        S3_AWS_REGION,
        response.body.postResponse.location,
        duration
      );
      return awsMedia;
    }
  } catch (error) {}
};

// const getCurrentProgress = async (taskId: string, uid: string) => {
//   const taskProgressRef = firestore()
//     .collection("tasks")
//     .doc(taskId)
//     .collection("taskProgress")
//     .doc(uid); //doc(doc(db, "tasks", taskId), "taskProgress", uid);

//   const currentProgress = await taskProgressRef.get(); // getDoc(taskProgressRef);
//   const currentData = currentProgress.data();

//   if (currentData) {
//     return currentData as TaskProgress;
//   }

//   return undefined;
// };

export const getSumKPIValue = (
  currentValue: number,
  newVal: number,
  previousKPIValue: number
) => {
  const newFinal = currentValue - previousKPIValue + newVal;
  return newFinal ? newFinal : 0;
};

export const getAvgKPIValue = (
  currentAvg: number,
  newItem: number,
  previousItemValue: number,
  numberOfItems: number
) => {
  // avg = sum/n
  const newSum = currentAvg * numberOfItems - previousItemValue + newItem;
  if (newSum) {
    return newSum / numberOfItems;
  }

  return 0;
};

export const getAllUserActivitiesForTask = async (
  taskId: string,
  uid: string
) => {
  const q = firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .where("taskId", "==", taskId); // query(
  // collection(doc(db, "users", uid), "activities"),
  // where("taskId", "==", taskId)
  // );
  const docs = await q.get(); // getDocs(q);

  const acts: Activity[] = [];
  if (docs) {
    for (const doc of docs.docs) {
      acts.push(doc.data() as Activity);
    }
  }

  return acts;
};

export const getPreviousActivityValue = async (
  actId: string,
  uid: string,
  kpiValue: SystemKPIs
) => {
  const actRef = firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(actId); // doc(doc(db, "users", uid), "activities", actId);
  const previousActivity = (await actRef.get()).data();

  if (previousActivity) {
    const act = previousActivity as Activity;

    if (act.goalScores && act.goalScores[kpiValue]) {
      return act.goalScores[kpiValue];
    }
  }

  return 0;
};

const reconcileForSum = (acts: Activity[], kpi: SystemKPIs) => {
  // const actsThatCount: Activity[] = []
  let sum: number = 0;
  let count: number = 0;
  for (const act of acts) {
    if (act.goalScores && act.goalScores[kpi]) {
      const val = act.goalScores[kpi];
      if (val) {
        sum += val;
        count += 1;
      }
    }
  }

  return {
    updatedValue: sum,
    updatedCount: count,
  };
};

const reconcileForAvg = (acts: Activity[], kpi: SystemKPIs) => {
  // const actsThatCount: Activity[] = []
  const { updatedValue, updatedCount } = reconcileForSum(acts, kpi);

  return {
    updatedValue: updatedCount > 0 ? updatedValue / updatedCount : 0,
    updatedCount: updatedCount,
  };
};

const reconcileForMax = (acts: Activity[], kpi: SystemKPIs) => {
  let max: number = 0;
  let count: number = 0;
  for (const act of acts) {
    const val =
      act.goalScores && act.goalScores[kpi] ? act.goalScores[kpi] : undefined;
    if (val && max < val) {
      max = val;
    }

    if (val) {
      count += 1;
    }
  }

  return {
    updatedValue: max,
    updatedCount: count,
  };
};

const reconcileForMin = (acts: Activity[], kpi: SystemKPIs) => {
  let min: number = Number.POSITIVE_INFINITY;
  let count: number = 0;
  for (const act of acts) {
    const val =
      act.goalScores && act.goalScores[kpi] ? act.goalScores[kpi] : undefined;
    if (val && min > val) {
      min = val;
    }

    if (val) {
      count += 1;
    }
  }

  return {
    updatedValue: min,
    updatedCount: count,
  };
};

export const reconcileUpdatedValues = async (
  finalActivities: Activity[],
  kpi: SystemKPIs
  // uid:string,
  // taskId: string,
  // kpi: string
) => {
  // get strategy
  const strategy = KPIConfig[kpi]?.strategy;

  if (strategy === "sum") {
    return reconcileForSum(finalActivities, kpi);
  } else if (strategy === "max") {
    return reconcileForMax(finalActivities, kpi);
  } else if (strategy === "min") {
    return reconcileForMin(finalActivities, kpi);
  } else if (strategy === "avg") {
    return reconcileForAvg(finalActivities, kpi);
  }

  return { updatedValue: 0, updatedCount: 0 };
};

// export const getUpdatedValue = async (
//   actId: string,
//   uid: string,
//   kpiValue: string,
//   strategy: goalResolutionStrategy,
//   currentValue: number,
//   updatedValue: number,
//   numberOfItems: number
// ) => {
//   const previousActivityValue = await getPreviousActivityValue(
//     actId,
//     uid,
//     kpiValue
//   );

//   if (strategy === "sum") {
//     return {
//       updatedValue: getSumKPIValue(
//         currentValue,
//         updatedValue,
//         previousActivityValue
//       ),
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "max") {
//     return {
//       updatedValue: updatedValue > currentValue ? updatedValue : currentValue,
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "min") {
//     return {
//       updatedValue: updatedValue < currentValue ? updatedValue : currentValue,
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   } else if (strategy === "avg") {
//     return {
//       updatedValue: getAvgKPIValue(
//         currentValue,
//         updatedValue,
//         previousActivityValue,
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1
//       ),
//       updatedCount:
//         previousActivityValue > 0 ? numberOfItems : numberOfItems + 1,
//     };
//   }

//   return {
//     updatedValue: 0,
//     updatedCount: 0,
//   };
// };

export const getUpdatedValues = async (
  newActivity: Activity,
  task: Task,
  uid: string
) => {
  const finalGoalKPIs: Partial<Record<SystemKPIs, number>> = {};
  const finalCount: Partial<Record<SystemKPIs, number>> = {};

  const acts = await getAllUserActivitiesForTask(task.id, uid);

  const actsWithoutNew = acts.filter((item) => item.id !== newActivity.id);
  const finalActivities = [...actsWithoutNew, newActivity];
  if (task.goalKPIs) {
    for (const kpi of task.goalKPIs) {
      const { updatedValue, updatedCount } = await reconcileUpdatedValues(
        finalActivities,
        kpi.systemKPI
        // kpi.strategy,
        // kpi.unitLabel
      );

      // current value
      // const currentProgressVal =
      //   currentProgress && currentProgress.values[kpi.unitLabel]
      //     ? currentProgress.values[kpi.unitLabel]
      //     : 0;

      // new value
      // const kpiValue = formValues[kpi.unitLabel];

      // const numberOfItems =
      //   currentProgress && currentProgress?.numberOfItems[kpi.unitLabel]
      //     ? currentProgress?.numberOfItems[kpi.unitLabel]
      //     : 0;

      // const { updatedValue, updatedCount } = await getUpdatedValue(
      //   actId,
      //   uid,
      //   kpi.unitLabel,
      //   kpi.strategy,
      //   currentProgressVal,
      //   kpiValue,
      //   numberOfItems

      finalGoalKPIs[kpi.systemKPI] = updatedValue;
      finalCount[kpi.systemKPI] = updatedCount;
    }
  }

  return {
    finalGoalKPIs,
    finalCount,
  };
};

// export const getUpdatedTaskProgress = async (
//   task: Task,
//   uid: string,
//   // actId: string,
//   activity: Activity
//   // formValues: { [key: string]: number }
// ): Promise<TaskProgress> => {
//   const currentProgress = await getCurrentProgress(task.id, uid);
//   const { finalCount, finalGoalKPIs } = await getUpdatedValues(
//     activity,
//     task,
//     // formValues,
//     uid
//     // currentProgress
//   );

//   if (currentProgress) {
//     return {
//       ...currentProgress,
//       values: finalGoalKPIs,
//       numberOfItems: finalCount,
//       updatedOn: Date.now(),
//     };
//   } else {
//     return createTaskProgrss(finalGoalKPIs, finalCount, uid);
//   }
// };

// export const createTaskProgrss = (
//   values: KPIValue,
//   count: KPIValue,
//   uid: string
// ): TaskProgress => {
//   const now = Date.now();
//   return {
//     values: values,
//     numberOfItems: count,
//     uid: uid,
//     updatedOn: now,
//     createdOn: now,
//   };
// };

export const saveNewTask = async (task: Task) => {
  try {
    const now = Date.now();
    const taskRef = firestore().collection("tasks").doc(task.id); // doc(db, "tasks", task.id);
    await taskRef.set({
      ...task,
      level: task.level ? task.level : 0,
      updatedOn: now,
    });
  } catch (error: any) {
    crashlytics().recordError(error);
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    // const now = Date.now();
    const taskRef = firestore().collection("tasks").doc(taskId); // doc(db, "tasks", taskId);
    const taskObj = await taskRef.get(); // getDoc(taskRef);
    const taskData = taskObj.data();
    if (taskData) {
      return taskData as Task;
    }

    return undefined;
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
  }
};

export const createCustomTask = async (
  taskName: string,
  mealTypes: MealTypes
) => {
  const now = Date.now();

  const taskId = uuidv4();
  try {
    if (taskName && mealTypes) {
      const taskRef = firestore().collection("tasks").doc(taskId);
      const taskObj = {
        id: taskId,
        createdOn: now,
        updatedOn: now,
        type: "standard",
        priority: 1,
        durationMinutes: 30,
        level: 0,
        isCustom: true,
        name: taskName,
        mealTypes: mealTypes,
        taskType: "nutrition",
      };
      await taskRef.set({ ...taskObj });
      console.log("Task created successfully!");
    }
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
