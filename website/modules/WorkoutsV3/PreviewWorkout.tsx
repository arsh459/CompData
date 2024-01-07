import Header from "./Header";
// import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import LoadingModal from "@components/loading/LoadingModal";
import { headerBgList, linersAboutTasks } from "@constants/taskBg";
import { labelType } from "@models/Tasks/Task";
// import CYWBtn from "./CYWBtn";
import { workoutTypes } from "@hooks/tasks/useWorkoutV3Params";
import { useWorkoutTasks } from "@hooks/tasks/useWorkoutTasks";
// import { useTasks } from "@hooks/tasks/useTasks";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import {
//   baseImageKit,
//   fPointsBlack,
//   watchIcon,
// } from "@constants/icons/iconURLs";
import TaskCard from "@modules/TaskCard/TaskCard";
import { baseImageKit } from "@constants/icons/iconURLs";
import { EventInterface, RoundObject, SprintObject } from "@models/Event/Event";
// import {
//   getCurrentMonth,
//   getCurrentWeekV3,
// } from "@hooks/community/challengeWeekUtils/utils";
import { useUserRank } from "@hooks/activities/userUserRank";

interface Props {
  onNavChange: (newNav: workoutTypes, replace?: boolean) => void;
  onWorkoutClick: (id: string) => void;
  onBack: () => void;
  summaryType?: labelType;
  game: EventInterface;

  uid: string;
  userLevel: number;
  eventStarts?: number;
  rounds?: RoundObject[];
  sprints?: SprintObject[];
  challengeLength?: number;
  isAdmin: boolean;
  shareCustomWorkout: () => void;
  activeFitPointsV2?: number;
  roundStartUnix?: number;
  roundEndUnix?: number;
  isFinale?: boolean;
  sprintId: string;
  leaderKey: string;
}

const PreviewWorkout: React.FC<Props> = ({
  onBack,
  summaryType,
  onNavChange,
  onWorkoutClick,
  game,
  activeFitPointsV2,
  // gameId,
  uid,
  userLevel,
  rounds,
  eventStarts,
  challengeLength,
  isAdmin,
  sprints,
  leaderKey,

  roundEndUnix,
  roundStartUnix,
  isFinale,
  sprintId,
  // eventStarts,
  // roundLength,
  // sprintLength,
  shareCustomWorkout,
}) => {
  //   const { task, loading } = useWorkoutTask(taskId);
  // const { roundEndUnix, roundStartUnix, isFinale } = getCurrentWeekV3(
  //   rounds,
  //   eventStarts,
  //   challengeLength
  // );

  // const sprintId = getCurrentMonth(sprints, eventStarts, challengeLength);

  const { myUserRank } = useUserRank(game.id, uid);
  const userRank = myUserRank?.monthlyRank
    ? myUserRank?.monthlyRank[sprintId]
    : -1;

  const { tasks, loading } = useWorkoutTasks(summaryType, game.id);

  // console.log("loading", tasks);
  // taskFrequency = 'weekly' | 'daily' | 'anytime'
  // if anytime, unlocked, getTask by user

  return (
    <>
      {!loading ? (
        <>
          <div className="w-full min-h-[15rem] relative z-0">
            <Header
              onBack={onBack}
              title={summaryType}
              classStr="w-max absolute top-12 left-4 z-10"
            />
            {summaryType ? (
              <img
                src={`${baseImageKit}/tr:w-400/${headerBgList[summaryType]}`}
                alt="bg-img"
                className="w-full object-cover"
              />
            ) : null}
          </div>
          <div className="px-8 py-4 text-[#335E7D]">
            {summaryType ? (
              <p className="text-center text-lg leading-normal">
                {linersAboutTasks[summaryType]}
              </p>
            ) : null}
            {/* <div className="py-6">
              <CYWBtn gotoComponent={() => onNavChange("create_workout")} />
            </div> */}
            <div className="grid pt-6 grid-cols-2 gap-8">
              {tasks.map((task) => (
                <div key={task.id}>
                  <TaskCard
                    userLevel={userLevel}
                    onWorkoutClick={() => onWorkoutClick(task.id)}
                    task={task}
                    activeFitPointsV2={activeFitPointsV2}
                    leaderKey={leaderKey}
                    uid={uid}
                    game={game}
                    isAdmin={isAdmin}
                    roundStartUnix={roundStartUnix}
                    roundEndUnix={roundEndUnix}
                    userRank={userRank ? userRank : -1}
                    isFinaleActive={isFinale}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <LoadingModal fill="#ff735c" width={80} height={80} noBg={true} />
      )}
    </>
  );
};

export default PreviewWorkout;
