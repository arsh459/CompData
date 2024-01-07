import { Badge, BadgeProgress } from "@models/Prizes/Prizes";
import { dayRecommendation } from "@models/User/User";
import { getWorkoutTitleSubtitle } from "@modules/HomeScreen/MyProgress/utils";

export const getLabelsForNutritionV2 = (
  kcalDone?: number,
  target?: number,
  start?: number
) => {
  if (!start) {
    return {
      title: "Diet Plan",
      subtitle: "Free Recipes & a custom diet plan",
      progress: 0,
    };
  } else {
    const progress = (kcalDone ? kcalDone : 0) / (target ? target : 1);
    const diffI = (target ? target : 1) - (kcalDone ? kcalDone : 0);

    const diff = Math.round(diffI);

    if (progress <= 0) {
      return {
        title: "Diet Plan",
        subtitle: "Browse new recipes & today's diet plan",
        progress,
      };
    } else if (progress < 1) {
      return {
        title: "Diet Plan",
        subtitle: `Good start! Keep at it & log ${diff} KCals`,
        progress,
      };
    } else if (progress <= 1.2) {
      return {
        title: "Diet Plan",
        subtitle: `Great! Try avoiding binge eating now`,
        progress,
      };
    } else if (progress > 1.2) {
      return {
        title: "Diet Plan",
        subtitle: `Careful! You are exceeding your calorific target`,
        progress: 1,
      };
    } else {
      return {
        title: "Diet Plan",
        subtitle: "Free Recipes & a custom diet plan",
        progress,
      };
    }
  }
};

export const getLabelsForNutrition = (rec?: dayRecommendation) => {
  // console.log("rec", rec?.doneFP, rec?.taskFP);
  if (rec) {
    if (!rec.doneFP) {
      return {
        title: "Diet Plan",
        subtitle: "Free Recipes & a custom diet plan",
        progress: 0,
      };
    } else if (rec.doneFP && rec.doneFP < rec.taskFP) {
      return {
        title: "Diet Plan",
        subtitle: `Amazing! You finished ${rec.doneFP || 0}/${rec.taskFP} FPs`,
        progress: (rec.doneFP || 0) / (rec.taskFP || 1),
      };
    } else if (rec.doneFP === rec.taskFP) {
      return {
        title: "Diet Plan",
        subtitle: `Completed ${rec.doneFP || 0}/${
          rec.taskFP
        } FP. You're all set!`,
        progress: (rec.doneFP || 0) / (rec.taskFP || 1),
      };
    }
    return {
      title: "Diet Plan",
      subtitle: `Finish ${rec.doneFP || 0}/${rec.taskFP} FPs.`,
      progress: (rec.doneFP || 0) / (rec.taskFP || 1),
    };
  }

  return {
    title: "Diet Plan",
    subtitle: "Free Recipes & a custom diet plan",
    progress: 0,
  };
};

export const getLabelsForWorkout = (rec?: dayRecommendation) => {
  if (rec) {
    if (!rec.doneFP) {
      return {
        title: "Workout Plan",
        subtitle: `Claim your personalised plan now`,
        progress: 0,
      };
    } else if (rec.doneFP && rec.doneFP < rec.taskFP) {
      return {
        title: "Workout Plan",
        subtitle: `Great going! You finished ${rec.doneFP || 0}/${
          rec.taskFP
        } FPs`,
        progress: (rec.doneFP || 0) / (rec.taskFP || 1),
      };
    } else if (rec.doneFP === rec.taskFP) {
      return {
        title: "Workout Plan",
        subtitle: `Completed ${rec.doneFP || 0}/${
          rec.taskFP
        } FP. You're all set!`,
        progress: (rec.doneFP || 0) / (rec.taskFP || 1),
      };
    }
    return {
      title: "Workout Plan",
      subtitle: `Finish ${rec.doneFP || 0}/${rec.taskFP} FPs.`,
      progress: (rec.doneFP || 0) / (rec.taskFP || 1),
    };
  }

  return {
    title: "Workout Plan",
    subtitle: `Claim your personalised plan now`,
    progress: 0,
  };
};

export const getTasksToday = (badgeProgress?: BadgeProgress, badge?: Badge) => {
  if (badge && badge.workoutLevels) {
    const wkLevels = badge.workoutLevels;

    let dayNumber = 0;
    if (badgeProgress && badgeProgress.currentDay && badgeProgress.progress) {
      dayNumber = badgeProgress.currentDay;

      const relevantWKLevel = badgeProgress.progress.filter(
        (item) => item.day === dayNumber
      );

      if (relevantWKLevel.length) {
        return getWorkoutTitleSubtitle(
          relevantWKLevel[0].nbWorkoutsDone,
          relevantWKLevel[0].nbWorkouts
        );
      }
    }

    const relevantWKLevel = wkLevels.filter((item) => item.day === dayNumber);
    if (relevantWKLevel.length) {
      return getWorkoutTitleSubtitle(0, relevantWKLevel[0].nbWorkouts);
    }
  }

  return {
    title: "Workout Plan",
    subtitle: "0 Exercises done",
    progress: 0,
  };
};

export const getDataToday = (badgeProgress?: BadgeProgress, badge?: Badge) => {
  if (badge && badge.workoutLevels) {
    const wkLevels = badge.workoutLevels;

    let dayNumber = 0;
    if (badgeProgress && badgeProgress.currentDay && badgeProgress.progress) {
      dayNumber = badgeProgress.currentDay;

      const relevantWKLevel = badgeProgress.progress.filter(
        (item) => item.day === dayNumber
      );

      if (relevantWKLevel.length) {
        return {
          nbWorkoutsDone: relevantWKLevel[0].nbWorkoutsDone,
          nbWorkouts: relevantWKLevel[0].nbWorkouts,
          nbFPEarnt: relevantWKLevel[0].nbFPEarnt,
          nbFitpoints: relevantWKLevel[0].nbFitpoints,
        };
      }
    }

    const relevantWKLevel = wkLevels.filter((item) => item.day === dayNumber);
    if (relevantWKLevel.length) {
      return {
        nbWorkoutsDone: 0,
        nbWorkouts: relevantWKLevel[0].nbWorkouts,
        nbFPEarnt: 0,
        nbFitpoints: relevantWKLevel[0].nbFitpoints,
      };
    }
  }

  return {
    nbWorkoutsDone: 0,
    nbWorkouts: 0,
    nbFPEarnt: 0,
    nbFitpoints: 0,
  };
};
