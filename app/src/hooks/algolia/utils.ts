import {
  AlgoliaAppSearch,
  algoliaType,
  allAlgoliaTags,
} from "@models/AppSearch/interface";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import {
  appSearchIndex,
  dietSearchIndex,
} from "@modules/UserMain/FitPointExpanderMain/hooks/algolia";
import { MealTypes, Task } from "@models/Tasks/Task";
import Fuse from "fuse.js";

const getFormattedFilter = (meal: MealTypes) => {
  if (meal === "Evening Snacks" || meal === "Pre Breakfast") {
    return `"${meal}"`;
  }

  return meal;
};

export const fuseSearch = (query: string, fuse?: Fuse<Task>) => {
  if (fuse) {
    const results = fuse.search(query);
    return results;
  } else {
    console.log("NO FUSE");
  }

  return [];
};

export const createRecommendedFuse = async (
  badgeId: string,
  meal?: MealTypes
) => {
  try {
    // console.log("CREATING FUSE", badgeId, meal);

    let ref: FirebaseFirestoreTypes.Query;
    if (meal) {
      ref = firestore()
        .collection("tasks")
        .where("badgeIds", "array-contains", badgeId)
        .where("mealTypes", "==", meal);
    } else {
      ref = firestore()
        .collection("tasks")
        .where("badgeIds", "array-contains", badgeId);
    }

    const nutritionTasks = await ref.get();

    // console.log("nutritionTasks", nutritionTasks.docs.length);

    const tasks: Task[] = [];
    for (const nutritionTask of nutritionTasks.docs) {
      const tk = nutritionTask.data() as Task;
      // console.log(tk.name, tk.mealTypes);
      tasks.push(tk);
    }

    const fuse = new Fuse(tasks, {
      keys: ["name"],
      findAllMatches: true,
      // threshold: 0.89,
    });

    return { fuse, tasks };
  } catch (error) {
    console.log("error", error);

    return { fuse: undefined, tasks: [] };
  }
};

export const dietFetch = async (
  query: string,
  meal?: MealTypes,
  pageNum?: number
) => {
  try {
    const response = await dietSearchIndex.search(query, {
      hitsPerPage: 15,
      page: pageNum,
      ...(meal
        ? { optionalFilters: [`mealTypes:${getFormattedFilter(meal)}`] }
        : {}),
    });

    if (response.hits) {
      const remoteTasks = response.hits as AlgoliaAppSearch[];
      return remoteTasks;
    }

    return [];
  } catch (error) {
    console.log("error", error);

    return [];
  }
};

export const algoliaFetch = async (
  query: string,

  filter?: algoliaType,
  pageNum?: number
): Promise<AlgoliaAppSearch[]> => {
  try {
    // if (!query) {
    //   return [];

    const response = await appSearchIndex.search(query, {
      hitsPerPage: 15,
      page: pageNum,
      filters: filter && filter !== "all" ? `taskType:${filter}` : undefined,
    });

    if (response.hits) {
      const remoteTasks = response.hits as AlgoliaAppSearch[];
      return remoteTasks;
    }

    return [];
  } catch (error) {
    console.log("errorn in algolia appSearchIndex", error);
    return [];
  }
};

export const getTagQuery = (tag?: algoliaType, query?: string) => {
  if (!query) {
    return tag;
  }

  //@ts-ignore
  if (query && allAlgoliaTags[query]) {
    return tag;
  }

  return query;
};
