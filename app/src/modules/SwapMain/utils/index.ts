import { MealTypes } from "@models/Tasks/Task";
import { dayRecommendation, TaskRec } from "@models/User/User";
import firestore from "@react-native-firebase/firestore"; // FirebaseFirestoreTypes,

const isTaskPresent = (tasks: TaskRec[], id: string) => {
  const updatedTasks = tasks.filter((each) => (each.id === id ? true : false));
  if (updatedTasks.length) {
    return true;
  }

  return false;
};

export const updateTodayFlag = async (uid: string, val: boolean) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      [`flags.goToday`]: val,
    });
};

export const addTaskOnDay = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
  taskId: string,
  badgeId: string
) => {
  const doc = await firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .where("type", "==", type)
    .where("date", "==", date)
    .where("badgeId", "==", badgeId)
    .get();

  for (const remDoc of doc.docs) {
    const { tasks, id } = remDoc.data() as dayRecommendation;

    const presentStatus = isTaskPresent(tasks, taskId);
    if (!presentStatus) {
      tasks.push({ id: taskId, manual: true });

      await firestore()
        .collection("users")
        .doc(uid)
        .collection("dayRecommendations")
        .doc(id)
        .update({ tasks: tasks });
    }

    await updateTodayFlag(uid, true);
  }
};

export const onSwapNutritionTask = async (
  uid: string,
  dayRecommendationId: string,
  swapId: string,
  targetId?: string,
  overrideMealType?: MealTypes
  // positioningIndex?: number,
  // indicesArray?: number[]
) => {
  const doc = await firestore()
    .collection("users")
    .doc(uid)
    .collection("dayRecommendations")
    .doc(dayRecommendationId)
    .get();

  // console.log("to replace id", targetId);
  // console.log("to swapId id", swapId);
  // console.log("to override overrideMealType", overrideMealType);

  if (doc.data()) {
    const { tasks } = doc.data() as dayRecommendation;

    let updatedTasks: TaskRec[] = [];
    if (targetId) {
      let taskRec: TaskRec = {
        id: swapId,
        manual: true,
      };
      if (overrideMealType) {
        taskRec.overrideMealType = overrideMealType;
      }

      let changed: boolean = false;
      for (const task of tasks) {
        if (task.id === targetId && !changed) {
          updatedTasks.push(taskRec);
          changed = true;
        } else {
          updatedTasks.push(task);
        }
      }
    } else {
      // if (positioningIndex != undefined) {
      //   updatedTasks = [
      //     ...tasks,
      //     {
      //       manual: true,
      //       id: swapId,
      //     },
      //   ];

      //   updatedTasks = indicesArray
      //     ? indicesArray.map((index) => updatedTasks[index])
      //     : updatedTasks;

      //   // updatedTasks = tasks;
      //   // updatedTasks.splice(positioningIndex, 0, {
      //   //   manual: true,
      //   //   id: swapId,
      //   // });
      // } else {
      //   updatedTasks = [
      //     ...tasks,
      //     {
      //       manual: true,
      //       id: swapId,
      //     },
      //   ];
      // }
      updatedTasks = [
        ...tasks,
        {
          manual: true,
          id: swapId,
          ...(overrideMealType ? { overrideMealType } : {}),
        },
      ];
    }

    // console.log(updatedTasks);
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("dayRecommendations")
      .doc(dayRecommendationId)
      .update({ tasks: updatedTasks, manual: true });
  }
};

// async function fetchDocumentsByIDs(documentIDs: string[]) {
//   const documentRefs = documentIDs.map((id) =>
//     firestore().collection("tasks").doc(id)
//   );
//   try {
//     const documentSnapshots = await Promise.all(
//       documentRefs.map((docRef) => docRef.get())
//     );
//     const documents = documentSnapshots.map((docSnapshot) => {
//       if (docSnapshot.exists) {
//         return docSnapshot.data();
//       } else {
//         return null; // Document doesn't exist for this ID
//       }
//     });
//     return documents.filter((doc) => doc !== null) as Task[];
//   } catch (error) {
//     console.error("Error fetching documents:", error);
//     throw error;
//   }
// }

// function sortArrays(mealTypeArr: MealTypes[], updatedTasks: TaskRec[]) {
//   const arrayToSort = [...updatedTasks];
//   const sortingArray = [...mealTypeArr];
//   const indices = Array.from(arrayToSort.keys());
//   indices.sort((a, b) => sortingArray[a] - sortingArray[b]);
//   const sortedArray = indices.map((index) => arrayToSort[index]);

//   return sortedArray;
// }
