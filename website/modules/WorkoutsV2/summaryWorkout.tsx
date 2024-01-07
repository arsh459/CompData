import ChampionIcon from "../../public/icons/ChampionIcon";
import FireIcon from "../../public/icons/FireIcon";
import TimeIcon from "../../public/icons/TimeIcon";
import BackIcon from "../../public/icons/BackIcon";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { UserInterface } from "@models/User/User";
import { useWorkoutTaskStream } from "@hooks/tasks/useWorkoutTaskStream";
import {
  // getFitPointString,
  getProgressFitPoint,
  getTimerSecondsString,
} from "@modules/PaymentPopover/utils";
import { useUserRank } from "@hooks/activities/userUserRank";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import { useLeaderboardKey } from "@hooks/user/useLeaderbyKey";
// import { workoutTypes } from "@hooks/tasks/useWorkoutV2Params";

interface Props {
  // onFinishWorkoutFn: any;
  onBack: () => void;
  parentId: string;
  coachKey: string;
  taskId: string;
  user: UserInterface;
  onSelfieRequest: (streamId: string) => void;
  // onNavChange: (tab: workoutTypes) => void;
}

const SummaryWorkout: React.FC<Props> = ({
  taskId,
  coachKey,
  onSelfieRequest,
  user,
  parentId,
  onBack,
}) => {
  // const burnCalories = 340;
  // const currentUser = {
  //   name: "Rahul Jain",
  //   position: "champion",
  // };
  // const rivalUser = {
  //   name: "Aarja bedi",
  //   position: "coach",
  // };
  // const rank = "34/240";
  // const time = "1:34:45";

  const { task } = useWorkoutTask(taskId);
  const { userStream } = useWorkoutTaskStream(taskId, user.uid);
  const { myUserRank } = useUserRank(parentId, user.uid);
  const { leader } = useLeaderboardKey(coachKey);

  // console.log("leader", leader);

  const { round } = getProgressFitPoint(
    userStream?.streamedSeconds,
    task?.durationMinutes
  );
  // console.log("user", user);
  // console.log("task", task);

  return (
    <div className="p-4 pt-6">
      <div className="font-bold text-left">
        <span className="inline-block" onClick={onBack}>
          <BackIcon style={{ height: "25", width: "25", fill: "gray" }} />
        </span>
      </div>
      <div className="text-center pt-4">
        <span className="inline-block animate-pulse">
          <FireIcon style={{ height: "80", width: "80" }} />
        </span>
      </div>
      <div className="font-bold text-center text-3xl px-6 text-gray-800">
        {round} Points
      </div>
      <div className="flex justify-center items-center text-2xl pt-4">
        <div className="p-3 text-center">
          <span className="inline-block">
            <UserPhoto
              name={user.name}
              img={user.profileImage}
              nameInvisible={true}
              size="large"
              onImgClick={() => {}}
            />
          </span>
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-white font-bold bg-indigo-400 rounded-full text-xl px-6 py-2 text-center mt-2">
            {user.level ? `Level ${user.level}` : "Level 0"}
          </div>
        </div>
        {leader ? (
          <div className="p-3 text-slate-500 text-base ">with</div>
        ) : null}
        {leader ? (
          <div className="p-3 text-center">
            <span className="inline-block">
              <UserPhoto
                name={leader.name}
                img={leader.profileImage}
                nameInvisible={true}
                size="large"
                onImgClick={() => {}}
              />
            </span>
            <div className="text-xl font-bold">{leader.name}</div>
            <div className="text-white font-bold bg-sky-400 rounded-full text-xl px-6 py-2 text-center mt-2">
              Coach
            </div>
          </div>
        ) : null}
      </div>
      <hr className="mt-4" />
      {/* <div className="flex justify-between items-center px-4 py-8 text-3xl text-gray-600 text-center">
        <div className="font-bold">
          Points : <span className="font-normal"> {rank}</span>
        </div>{" "}
        <div>
          <FireIcon style={{ height: "60", width: "60" }} />
        </div>
      </div>
      <hr /> */}
      {myUserRank?.rank ? (
        <div className="flex justify-between items-center px-4 py-8 text-3xl text-gray-600 text-center">
          <div className="font-bold">
            Rank : <span className="font-normal">{myUserRank?.rank}</span>
          </div>{" "}
          <div>
            <ChampionIcon style={{ height: "60", width: "60" }} />
          </div>
        </div>
      ) : null}
      <hr />
      <div className="flex justify-between items-center px-4 py-8 text-3xl text-gray-600 text-center">
        <div className="font-bold">
          Time :{" "}
          <span className="font-normal">
            {getTimerSecondsString(userStream?.streamedSeconds)}{" "}
          </span>
        </div>{" "}
        <div>
          <TimeIcon style={{ height: "60", width: "60", fill: "skyblue" }} />
        </div>
      </div>
      <hr />
      {/* <div className="flex justify-between items-center px-4 py-8 text-3xl text-gray-600 text-center">
        <div className="font-bold">
          Streak : <span className="font-normal">{streak} </span>
        </div>{" "}
        <div>
          <StreakIcon style={{ height: "60", width: "60", fill: "orange" }} />
        </div>
      </div> */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <BottomNavComV2
          cta={"Finish Workout"}
          // cta2="Finish Workout"
          // onClick2={onFinishWorkout}
          onClick={() => onSelfieRequest(userStream?.id ? userStream.id : "")}
        />
      </div>
      {/* <div className="flex justify-center text-xl bg-gray-200 px-5 py-4 absolute inset-x-0 bottom-0">
        <button
          className="border rounded-full border-orange-600 py-2 px-6 bg-orange-600 text-white font-bold"
          onClick={() => onFinishWorkoutFn("capture_media")}
        >
          FINISH
        </button>
      </div> */}
    </div>
  );
};

export default SummaryWorkout;
