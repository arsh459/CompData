// import { Post } from "@models/Posts/Post";

import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { WorkoutSeries } from "@models/Workouts/Series";
import ExerciseHolder from "./ExerciseHolder";
import GoodFor from "./GoodFor";
import WorkoutCover from "./WorkoutCover";
// import Header from "@templates/community/Header/Header";
import WorkoutDetails from "./WorkoutExplainer";
import { UserInterface } from "@models/User/User";
import FloatingFooter from "./FloatingFooter/FloatingFooter";
import { formatWithCommas } from "@utils/number";

// import { useWorkoutSeries } from "@hooks/workouts/useWorkoutSeries";

interface Props {
  series: WorkoutSeries;
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  authRequest: () => void;
  signOut: () => void;
  enrolled?: boolean;
}

const WorkoutHolder: React.FC<Props> = ({
  series,
  leader,
  signedInUser,
  authStatus,
  authRequest,
  signOut,
  enrolled,
}) => {
  // console.log("series", series);
  return (
    <div className="max-w-7xl mx-auto relative no-scrollbar">
      <div className="fixed md:top-2 max-w-7xl w-full z-50  bg-white rounded-lg shadow-sm">
        {/* <Header
          headerItems={["Log out"]}
          name={leader.name}
          userKey={leader.userKey}
          onSignIn={authRequest}
          onNavChange={() => {}}
          onSignOut={signOut}
          signedInUserName={signedInUser?.name}
          uid={signedInUser?.uid}
          authStatus={authStatus}
          signedInUserImage={signedInUser?.profileImage}
          signedInUserKey={signedInUser?.userKey}
        /> */}
      </div>

      <div className="h-16 md:h-24" />
      <div className="md:flex">
        <div className="md:pr-2">
          <WorkoutCover accessible={true} cover={series.thumbnail} />
        </div>
        <div className="px-4 py-4 bg-white rounded-lg">
          <WorkoutDetails
            creatorName={leader.name}
            name={series.name}
            description={series.description}
            creatorKey={leader.userKey}
          />

          <div className="md:flex md:flex-wrap">
            {series.goodFor ? (
              <div className="pt-4 md:w-1/2 md:pr-4">
                <GoodFor
                  textSize="sm"
                  heading="Good For"
                  text={series.goodFor}
                />
              </div>
            ) : null}
            {series.equipmentNeeded ? (
              <div className="pt-4 md:w-1/2 md:pr-4">
                <GoodFor
                  textSize="sm"
                  heading="Equipment"
                  text={series.equipmentNeeded}
                />
              </div>
            ) : null}
            {series.workoutGoal ? (
              <div className="pt-4 md:w-1/2 md:pr-4">
                <GoodFor
                  noDivider={true}
                  textSize="sm"
                  heading="What you achieve?"
                  text={series.workoutGoal}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="pt-8">
        <ExerciseHolder
          enrolled={enrolled}
          seriesId={series.id}
          seriesKey={series.seriesKey}
          authRequest={authRequest}
        />
      </div>
      {!enrolled ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            leftText={`₹${formatWithCommas(series.cost)}`}
            cta={`Get access`}
            appearance="contained"
            onClick={authRequest}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WorkoutHolder;
