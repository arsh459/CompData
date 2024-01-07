// import { GoalKPI, TaskProgress } from "@models/Tasks/Task";

export const getTaskLabel = (level?: number) => {
  if (!level || level <= 2) {
    return "Beginner";
  } else if (level === 3) {
    return "Intermediate";
  } else if (level === 4) {
    return "Advanced";
  } else if (level === 5) {
    return "Master";
  }
};

// export const getAggregateProgress = (
//   goals?: GoalKPI[],
//   taskProgress?: TaskProgress
// ) => {
//   if (!goals) {
//     return 0;
//   }

//   let total: number = 0;
//   let achieved: number = 0;
//   for (const goal of goals) {
//     const target = goal.targetVal;
//     const actual =
//       taskProgress && goal.unitLabel && taskProgress?.values[goal.unitLabel]
//         ? taskProgress?.values[goal.unitLabel]
//         : 0;

//     total += target ? target : 0;

//     achieved = actual ? actual : 0;
//   }

//   if (achieved && achieved >= total) {
//     return 1;
//   } else if (achieved && achieved < total) {
//     return achieved / total;
//   }

//   return 0;
// };
