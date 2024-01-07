// import { useChallengeSeries } from "@hooks/workouts/useChallengeSeries";
import { navLevels } from "@hooks/community/useCommunityParams";
// import { useGlobalSeriesLives } from "@hooks/workouts/global/useGlobalSeriesLives";
import { useChallengeSeriesList } from "@hooks/workouts/useChallengeSeriesList";
import { WorkoutSeries } from "@models/Workouts/Series";
import { useEffect, useState } from "react";
import Hello from "../Hello/Hello";
// import DateCarousel from "./DateCarousel";
import PendingTasks from "./PendingTasks/PendingTasks";
import ProgramSelector from "./ProgramSelector";
import RedirectSelector from "./RedirectSelector";

import SeriesHolderWorkout from "./SeriesHolderWorkout";

interface Props {
  eventId?: string;
  parentId: string;
  challengeStarts?: number;
  challengeLength: number;
  enrolledSeries?: string[];
  isOwner?: boolean;
  uid?: string;
  communityId: string;
  communityKey: string;
  onPostCreate: () => void;
  name?: string;
  eventName?: string;
  onNavChange: (navLevel: navLevels) => void;
  onProfileNameClick: (uid: string) => void;
  seriesAccess?: "GLOBAL";
}

const WorkoutSeriesHolder: React.FC<Props> = ({
  eventId,
  challengeStarts,
  enrolledSeries,
  isOwner,
  onPostCreate,
  parentId,
  uid,
  communityId,
  communityKey,
  name,
  challengeLength,
  eventName,
  seriesAccess,
  onNavChange,
  onProfileNameClick,
}) => {
  // const [date, setDate] = useState<Date>(new Date(new Date().toDateString()));
  // const [dayNumber, setDayNumber] = useState<number>(-1);
  // const [activeDays, setActiveDays] = useState<number[]>([]);

  const { eventSeries, dayActs, dayNutrition, dayLives } =
    useChallengeSeriesList(
      eventId
      // dayNumber
    );

  // const { globalLives } = useGlobalSeriesLives(seriesAccess);

  // console.log("globalLives", globalLives);

  const [initialSet, setInitSet] = useState<boolean>(false);
  const [currSeries, setCurrSeries] = useState<WorkoutSeries>();
  const [isWorkoutAdderOpen, setIsWorkoutAdderOpen] = useState<boolean>(false);

  const onCloseAdder = () => setIsWorkoutAdderOpen(false);
  const onOpenAdder = () => setIsWorkoutAdderOpen(true);

  useEffect(() => {
    if (eventSeries.length > 0 && !initialSet) {
      setCurrSeries(eventSeries[0]);
      setInitSet(true);
    } else if (eventSeries.length === 0) {
      setCurrSeries(undefined);
      setInitSet(false);
    }
  }, [eventSeries, initialSet]);

  //   console.log("dayActs", dayActs);
  // console.log("challengeStarts", challengeStarts);

  // useEffect(() => {
  //   const selDate = date.getTime();

  //   if (challengeStarts && selDate > challengeStarts) {
  //     const delMS = selDate - challengeStarts;
  //     const days = Math.floor(delMS / (24 * 60 * 60 * 1000));

  //     setDayNumber(days);
  //   } else {
  //     setDayNumber(-1);
  //   }
  // }, [date, challengeStarts]);

  // console.log("activeDays", activeDays);

  // const toggleDay = (newD: number) => {
  //   const curr = date.getDay() - newD;
  //   if (curr !== 0) {
  //     setDate(new Date(date.getTime() - curr * 24 * 60 * 60 * 1000));
  //   }
  // };

  // const onNextDay = () => {
  //   setDate(new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000));
  // };

  // const onPrevDay = () => {
  //   setDate(new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000));
  // };

  // const onWeekChange = (newW: number) => {
  //   if (newW !== 0) {
  //     setDate(new Date(date.getTime() - newW * 7 * 24 * 60 * 60 * 1000));
  //   }
  // };

  return (
    <div>
      <div className="pb-2">
        <Hello
          name={name}
          // eventName={eventName}
          // dayNumber={dayNumber}
          challengeStarts={challengeStarts}
          challengeLength={challengeLength}
          // signedIn={uid ? true : false}
        />
      </div>

      <div className="pb-4">
        <PendingTasks
          profileIncomplete={true}
          introductionPending={true}
          sayHiToCoach={true}
          onNavChange={onNavChange}
          onProfileNameClick={() => onProfileNameClick(uid ? uid : "")}
        />
      </div>

      <ProgramSelector
        setCurrSeries={setCurrSeries}
        selectedSeries={currSeries}
        programs={eventSeries}
        enrolledSeries={enrolledSeries}
        isOwner={isOwner}
        uid={uid}
        eventId={eventId}
        communityKey={communityKey}
      />
      <RedirectSelector
        seriesId={currSeries?.id}
        isOpen={isWorkoutAdderOpen}
        onClose={onCloseAdder}
        communityKey={communityKey}
      />

      {currSeries ? (
        <>
          {/* <div className="py-2 mt-4 bg-white border rounded-lg">
            <div className="">
              <p className="pb-2 text-lg font-semibold text-center text-gray-700">
                {`${date.toLocaleString("default", {
                  dateStyle: "full",
                })}`}
              </p>
            </div>
            <DateCarousel
              onNextDay={onNextDay}
              onPrevDay={onPrevDay}
              onClick={toggleDay}
              // dayNumber={dayNumber}
              activeDays={[]}
              selected={date.getDay()}
            />
          </div> */}

          <SeriesHolderWorkout
            enrolledSeries={enrolledSeries}
            dayActs={dayActs}
            // globalLives={globalLives}
            parentId={parentId}
            communityKey={communityKey}
            dayNutrition={dayNutrition}
            dayLives={dayLives}
            currSeries={currSeries}
            communityId={communityId}
            isOwner={isOwner}
            onPostCreate={onPostCreate}
            onOpenAdder={onOpenAdder}
          />
        </>
      ) : null}
    </div>
  );
};

export default WorkoutSeriesHolder;
