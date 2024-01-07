import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";

const mergeArrays = (arrays: any[]) => {
  return [].concat.apply([], arrays);
};

const getDay = (d: number) => {
  if (d === 0) {
    return `Sun`;
  } else if (d === 1) {
    return `Mon`;
  } else if (d === 2) {
    return `Tue`;
  } else if (d === 3) {
    return `Wed`;
  } else if (d === 4) {
    return `Thur`;
  } else if (d === 5) {
    return `Fri`;
  } else if (d === 6) {
    return `Sat`;
  }

  return "";
};

const getDayString = (days: number[]) => {
  if (days.length === 7) {
    return "everyday";
  }

  const sortedDays = days.sort((a, b) => a - b);

  const dayArray: string[] = [];
  for (const day of sortedDays) {
    dayArray.push(getDay(day));
  }

  return dayArray.join(", ");
};

const getLiveString = (live: LiveClass) => {
  if (live.duration && live.slots?.length && live.days?.length) {
    return `${live.duration} mins live session on ${getDayString(live.days)}`;
  }

  return "";
};

export const getBullet = (
  series: WorkoutSeries | undefined,
  name: string,
  dayActs: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] },
  dayLives: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] },
  dayNutrition: { [serId: string]: (Workout | NutritionPlan | LiveClass)[] }
): ListItem[] => {
  const mergedActs = mergeArrays(Object.values(dayActs));
  const mergedLives = mergeArrays(Object.values(dayLives));
  const mergedNutrition = mergeArrays(Object.values(dayNutrition));

  const tmp: { heading: string; text: string }[] = [];
  for (const live of mergedLives) {
    tmp.push({
      heading: "🏋️ Live sessions",
      text: getLiveString(live),
    });
  }

  const tmp2 = [
    mergedActs.length > 0
      ? {
          heading: "📹 Curated workouts",
          text: `${mergedActs.length} workouts by coach ${name}`,
        }
      : undefined,

    mergedNutrition.length > 0
      ? {
          heading: "🍽️ Recipees & diet",
          text: `${mergedNutrition.length} diet plans by coach ${name}`,
        }
      : undefined,

    // mergedLives.length > 0
    //   ? {
    //       heading: "🏋️ Live sessions",
    //       text: `Live sessions with coach: ${name}`,
    //     }
    //   : undefined,

    series?.personalNutritionPlan
      ? {
          heading: "Personalised nutrition",
          text: `A customised diet plan for your fitness goal`,
        }
      : undefined,

    series?.personalWorkoutPlan
      ? {
          heading: "Personalised workout plan",
          text: `A customised workout schedule for you`,
        }
      : undefined,
    ...getFreePlan(),
  ];

  const toReturnArray: ListItem[] = [];
  for (const item of tmp) {
    if (item) {
      toReturnArray.push(item);
    }
  }

  for (const item of tmp2) {
    if (item) {
      toReturnArray.push(item);
    }
  }

  return toReturnArray;
};

export const getFreePlan = (): ListItem[] => {
  return [
    {
      heading: "🏆 Rewards worth 100k",
      text: "As you achieve you can win exciting rewards",
    },
    {
      heading: "⚡ Connected fitness",
      text: "Connect your wearables & compete in the game",
    },
    {
      heading: "💬 Talk with coaches",
      text: "Talk and interact with your favourite coach",
    },
  ];
};
