import { Task } from "../../../models/Task/Task";
import {
  AlgoliaAppSearch,
  algoliaType,
} from "../../../models/AppSearch/interface";
import { getAppConfiguration } from "../../../models/config/getUtils";
import { AppConfiguration } from "../../../models/config/config";
import { UserInterface } from "../../../models/User/User";
import { getUserById } from "../../../models/User/Methods";

export const getTransformedTasks = async (tasks: Task[]) => {
  const config = await getAppConfiguration();

  if (config) {
    const filteredTasks: AlgoliaAppSearch[] = [];
    const dietPlanIndexTasks: AlgoliaAppSearch[] = [];
    const creators: { [id: string]: UserInterface } = {};
    let i: number = 0;
    for (const task of tasks) {
      let creatorName: string = "";
      if (task.userId) {
        const user = creators[task.userId];
        if (user) {
          creatorName = user.name ? user.name : "";
        } else {
          const creator = await getUserById(task.userId);
          if (creator) {
            creatorName = creator.name ? creator.name : "";
            creators[creator.uid] = creator;
          }
        }
      }

      if (
        task.name &&
        task.taskType === "workout" &&
        !task.isReel &&
        task.avatar &&
        task.avatar.resource_type === "video" &&
        task.searchable
      ) {
        const freeStatus = checkFreeStatus(task, config);

        filteredTasks.push(
          transformToRecord(task, "workout", freeStatus, creatorName),
        );
        console.log(
          "task",
          " | ",
          i,
          " | ",
          task.id,
          " | ",
          task.name,
          " | ",
          "WORKOUT",
          " | ",
          task.searchable,
          " | ",
          task.freeTask,
          " | ",
          task.taskType,
          " | ",
          creatorName,
        );

        i++;
      } else if (
        task.name &&
        task.isReel &&
        task.reelMedia &&
        task.taskType !== "nutrition"
      ) {
        filteredTasks.push(transformToRecord(task, "reel", true, creatorName));
        console.log(
          "task",
          " | ",
          i,
          " | ",
          task.name,
          " | ",
          task.id,
          " | ",
          "REEL",
          " | ",
          task.searchable,
          " | ",
          task.freeTask,
          " | ",
          task.taskType,
          " | ",
          creatorName,
        );
        i++;
      } else if (
        task.name &&
        task.taskType === "nutrition" &&
        task.isReel &&
        task.reelMedia
      ) {
        filteredTasks.push(
          transformToRecord(task, "recipee", true, creatorName),
        );
        console.log(
          "task",
          " | ",
          i,
          " | ",
          task.name,
          " | ",
          task.id,
          " | ",
          "RECIPEE",
          " | ",
          task.searchable,
          " | ",
          task.freeTask,
          " | ",
          task.taskType,
          " | ",
          creatorName,
        );
        i++;
      } else if (
        task.name &&
        task.taskType === "nutrition" &&
        task.subTasks?.length &&
        task.mealTypes &&
        task.badgeIds?.length
      ) {
        dietPlanIndexTasks.push(
          transformToRecord(task, "nutrition", true, creatorName),
        );

        console.log(
          "task",
          " | ",
          i,
          " | ",
          task.name,
          " | ",
          task.id,
          " | ",
          "NUTRITION",
          " | ",
          task.searchable,
          " | ",
          task.freeTask,
          " | ",
          task.taskType,
          " | ",
          creatorName,
        );
        i++;
      }
    }

    return { filteredTasks: filteredTasks, dietPlanIndexTasks };
  }

  return {};
};

const transformToRecord = (
  task: Task,
  type: algoliaType,
  freeStatus: boolean,
  creatorName: string,
): AlgoliaAppSearch => {
  return {
    objectID: task.id,
    taskType: type,
    ingredients: task.ingredients ? task.ingredients : [],
    tags: task.tags,
    name: task.name,
    thumbnail: task.thumbnails,
    nutritionFacts: task.nutritionFacts,
    isReel: task.isReel,
    reelThumbnail: task.reelThumbnail,
    userId: task.userId,
    fitpoints: task.fitPoints,
    durationMinutes: task.durationMinutes,
    videoThumbnail: task.videoThumbnail,
    videoIntroDur: task.videoIntroDur,
    equipmentNeeded: task.equipmentNeeded,
    kcal: task.kcal,
    badgeId: task.badgeId,
    subTasks: task.subTasks,
    createdOn: task.createdOn,
    updatedOn: task.updatedOn,
    description: task.description,
    difficultyLevels: task.difficultyLevels,
    mealTypes: task.mealTypes,
    freeTask: freeStatus,
    liveLink: task.liveLink,
    liveOn: task.liveOn,
    creatorName,

    mediaDuration: getDuration(task),
  };
};

const checkFreeStatus = (task: Task, config: AppConfiguration) => {
  if (task.freeTask) {
    return true;
  }

  const freeDays = config.freeDays;

  // tasks that are free on a day
  if (freeDays && task.badgeDays) {
    for (const badgeDay of task.badgeDays) {
      const splitBadgeDay = badgeDay.split("_");
      if (splitBadgeDay.length === 2) {
        const day = parseInt(splitBadgeDay[1]);
        if (day <= freeDays) {
          return true;
        }
      }
    }
  }

  return false;
};

const getDuration = (task: Task) => {
  if (task.isReel && task.reelMedia && task.reelMedia.duration) {
    return task.reelMedia.duration;
  } else if (task.taskType === "workout" && task.avatar) {
    return task.avatar?.duration;
  }

  return 0;
};
