import { Workout } from "@models/Workouts/Workout";
import TodaysCard from "./TodayCard";
import { Link } from "@mui/material";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import clsx from "clsx";
import { LiveClass } from "@models/Workouts/LiveClass";

interface Props {
  dayActivities: (Workout | NutritionPlan | LiveClass)[];
  parentId: string;
  communityId: string;
  communityKey: string;
  dayNutritionPlans: (Workout | NutritionPlan | LiveClass)[];
  dayLivePlans: (Workout | NutritionPlan | LiveClass)[];
  enrolled?: boolean;
  costSeries: number;
  seriesKey: string;
  isOwner?: boolean;
  seriesId: string;
  // dayNumber: number;
  onAddPlan: () => void;
}

const TodaysCards: React.FC<Props> = ({
  dayActivities,
  isOwner,
  costSeries,
  enrolled,
  seriesKey,
  dayNutritionPlans,
  dayLivePlans,
  seriesId,
  communityKey,
  onAddPlan,
  parentId,
  communityId,
}) => {
  return (
    <>
      <div></div>
      <div className="pb-2 flex items-baseline">
        <p className="font-semibold text-gray-700 text-xl">{`Workouts`}</p>

        {isOwner ? (
          <div className="flex pl-2">
            <div onClick={onAddPlan}>
              <p className="text-sm font-medium text-orange-500 cursor-pointer">
                (Add new plan)
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div //className="flex overflow-x-auto no-scrollbar scrollbar-hide"
        className="flex flex-wrap justify-between"
      >
        {[...dayLivePlans, ...dayActivities, ...dayNutritionPlans].map(
          (item, index) => {
            // return <div className="w-1/2 bg-red-50 border-2">HI</div>;
            return (
              <div
                key={item.id}
                className={clsx(
                  index % 2 === 0 ? "pr-2" : "pl-2",
                  "flex-none",
                  "pb-4",
                  // "pr-4",
                  "w-1/2 md:w-1/2"
                )}
              >
                <Link
                  href={
                    item.type === "nutrition"
                      ? `workout/${seriesKey}/nutrition/${item.planKey}?parentId=${parentId}&communityId=${communityId}`
                      : item.type === "live"
                      ? `workout/${seriesKey}/live/${item.liveKey}?parentId=${parentId}&communityId=${communityId}`
                      : `workout/${seriesKey}/${item.videoKey}?parentId=${parentId}&communityId=${communityId}`
                  }
                >
                  <TodaysCard
                    // costSeries={costSeries}
                    media={item.media}
                    name={item.name}
                    times={item.type === "live" && item.slots ? item.slots : []}
                    duration={
                      item.type === "live" && item.duration ? item.duration : 0
                    }
                    days={item.type === "live" && item.days ? item.days : []}
                    // day={item.day}
                    calories={item.calories}
                    calorieString={
                      item.type === "nutrition"
                        ? `${item.calories}`
                        : `Burn ${item.calories} cals`
                    }
                    badgeColor={
                      item.type === "nutrition"
                        ? "bg-yellow-500"
                        : item.type === "live"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }
                    label={
                      item.type === "nutrition"
                        ? "nutrition"
                        : item.type === "live"
                        ? "live"
                        : "video"
                    }
                    description={item.description}
                    locked={!enrolled && !item.isFree && costSeries > 0}
                  />
                </Link>
                {isOwner ? (
                  <div className="flex">
                    <Link
                      href={
                        item.type === "nutrition"
                          ? `createNutrition?seriesId=${seriesId}&id=${item.id}&communityKey=${communityKey}`
                          : item.type === "live"
                          ? `createLive?seriesId=${seriesId}&id=${item.id}&communityKey=${communityKey}`
                          : `createWorkout?seriesId=${seriesId}&id=${item.id}&communityKey=${communityKey}`
                      }
                    >
                      <p className="text-sm font-medium text-orange-500 cursor-pointer">
                        Edit
                      </p>
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default TodaysCards;
