import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";
import { formatWithCommas } from "@utils/number";
import FloatingFooter from "./FloatingFooter/FloatingFooter";
import WorkoutCover from "./WorkoutCover";
import WorkoutDetails from "./WorkoutExplainer";
import Header from "@templates/community/Header/Header";
import { UserInterface } from "@models/User/User";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { LiveClass } from "@models/Workouts/LiveClass";
import { useWorkoutQuery } from "@hooks/workouts/query/useWorkoutQuery";
// import LeaderWrapper from "../Program/MemberStrip/LeaderWrapper";
// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
// import { getLeaderboardDescs } from "../Program/utils/utils";
import { useWorkoutTracking } from "@hooks/workoutTracking/useWorkoutTracking";
// import { useUserRank } from "@hooks/activities/userUserRank";
// import { useCalendarView } from "@hooks/activities/useCalendarView";
import { useLiveAccess } from "@hooks/workouts/live/useLiveAccess";
import LiveFloatingFooter from "./FloatingFooter/LiveFooter";
import LogStartModal from "./Modals/LogStartModal";
import { useSeriesActivity } from "@hooks/workouts/useSeriesActivity";
import clsx from "clsx";

interface Props {
  series: WorkoutSeries;
  challengeId: string;
  workout: Workout | NutritionPlan | LiveClass;
  leader: LeaderBoard;

  slots?: string[];
  duration?: number;
  days?: number[];

  enrolled?: boolean;
  authRequest: () => void;
  signedInUser?: UserInterface;
  signOut: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
}

const ExerciseVideoHolder: React.FC<Props> = ({
  enrolled,
  authRequest,
  series,
  leader,
  workout,
  signedInUser,
  signOut,
  authStatus,
  slots,
  duration,
  days,
  challengeId,
}) => {
  const { workoutRt } = useSeriesActivity(
    series.id,
    workout.id,
    workout.type === "live"
      ? "lives"
      : workout.type === "nutrition"
      ? "nutrition"
      : "exercises"
  );

  // const [isJoinModal, setIsOpenJoin] = useState<boolean>(false);
  // const onJoin = () => setIsOpenJoin(true);
  // const onClose = () => setIsOpenJoin(false);

  const {
    parentId,
    // onLeaderboardChange,
    // selectedLeaderboard,
    eventKey,
    // leaderboardWeek,
    // onLeaderboardWeekChange,
  } = useWorkoutQuery(challengeId);
  // const { selectedEvent } = useCommunityEvent(parentId);

  // console.log("selectedEvent", parentId);
  const {
    handleStreaming,
    onClose,
    isJoinModal,
    streamState,
    onProgressLoad,
    onEnd,
    onLeaveLiveVideo,
    onRequestLeave,
    userStream,
    onPlay,
  } = useWorkoutTracking(
    signedInUser,
    series.id,
    workout.id,
    workout.type,
    parentId,
    series.ownerUID
  );

  // const { savedList } = useCalendarView(
  // selectedEvent?.challengeLength,
  // selectedEvent?.eventStarts
  // );

  // console.log("userStream", userStream);

  // const onJoinClick = () => {
  //   if (workout.type === "live" && workout.link) {
  //     setIsOpenJoin(false);
  //     router.push(workout.link);
  //   }
  // };

  const { eventState, earliestStartTime } = useLiveAccess(
    slots,
    duration,
    days
  );

  // console.log("myUserRank", myUserRank);

  // console.log("enrolled", workoutRt?.type);
  // console.log("enrolled", eventKey);
  // console.log("stream", streamState);

  // console.log("myUserRank", myUserRank);
  return (
    <div className="w-full">
      {workoutRt?.type === "live" ? (
        <LogStartModal
          joinStatus={streamState === "streaming"}
          onLeaveLiveVideo={onLeaveLiveVideo}
          isOpen={isJoinModal}
          onCloseModal={onClose}
          onJoinClick={onClose}
          joinURL={workoutRt.link}
          userStream={userStream}
        />
      ) : null}
      <div className="min-h-[90vh]">
        <div className="fixed z-50 bg-white rounded-lg shadow-sm md:top-2 right-0 left-0">
          <Header
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
          />
        </div>

        <div className="h-20 md:h-24" />

        <div
          className={clsx(
            workoutRt?.type === "workout"
              ? "sticky top-20 left-0 right-0 z-40"
              : ""
          )}
        >
          {workoutRt?.type === "workout" ? (
            <WorkoutCover
              accessible={enrolled || workoutRt.isFree ? true : false}
              cover={workoutRt.media}
              paused={true}
              handleStreaming={onPlay}
              onProgress={onProgressLoad}
              onPause={onEnd}
              onEnd={onEnd}
              playing={streamState === "streaming"}
              // noControls={true}
            />
          ) : workoutRt?.type === "live" &&
            userStream?.state === "active" ? null : (
            <WorkoutCover
              accessible={enrolled || workoutRt?.isFree ? true : false}
              cover={workoutRt?.media}
              paused={true}
            />
          )}
        </div>

        <div className="px-4 py-4">
          <div id="leaderboard">
            <WorkoutDetails
              creatorName={leader.name}
              name={workoutRt?.name ? workoutRt.name : ""}
              description={workoutRt?.description ? workoutRt.description : ""}
              creatorKey={leader.userKey}
              // workoutInfo={{}}
            />
          </div>
          {/* {typeof workout.day === "number" ? (
            <div className="pt-4">
              <GoodFor
                heading="Schedule"
                text={`Day ${workout.day}`}
                textSize="sm"
              />
            </div>
          ) : null} */}
          {/* {workoutRt?.calories ? (
            <div className="pt-4 flex">
              <div className="flex w-1/2">
                <GoodFor
                  textSize="lg"
                  heading="What you will burn?"
                  text={`${workoutRt?.calories} cals`}
                />
              </div>
              {workoutRt.type === "workout" && workoutRt.equipmentNeeded ? (
                <div className="w-1/2 pl-2">
                  <GoodFor
                    heading="Equipment"
                    textSize="lg"
                    text={workoutRt.equipmentNeeded}
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {workoutRt?.type === "nutrition" && workoutRt.ingredients ? (
            <div className="pt-4">
              <GoodFor
                heading="Ingredients"
                textSize="lg"
                text={workoutRt.ingredients}
              />
            </div>
          ) : null} */}

          {series.ownerUID && parentId ? (
            <>
              <div className="p-0 bg-white rounded shadow-sm mt-4">
                {/* <LeaderWrapper
                  parentId={parentId}
                  leaderboardWeek={leaderboardWeek}
                  onLeaderboardWeekChange={onLeaderboardWeekChange}
                  eventKey={eventKey ? eventKey : ""}
                  selectedLeaderboard={selectedLeaderboard}
                  isAdmin={signedInUser?.role ? true : false}
                  communityId={series.ownerUID}
                  leaderDescription={getLeaderboardDescs(
                    selectedEvent?.leaderboards
                  )}
                  numInitMembers={5}
                  uid={signedInUser?.uid}
                  myUserRank={myUserRank}
                  leaderKey={leader.userKey}
                  isMember={true}
                  challengeLength={5}
                  after={Date.now()}
                  onLeaderboardChange={onLeaderboardChange}
                  savedList={savedList}
                /> */}
              </div>
              <div className="h-48" />
            </>
          ) : null}
        </div>
      </div>
      {!enrolled && eventKey && workoutRt ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            leftText={
              series.cost ? `₹${formatWithCommas(series.cost)}` : "Free"
            }
            cta={`Join program`}
            onClick={() => {}}
            appearance="contained"
            link={`/joinBoat/${leader.userKey}/${eventKey}/?liveKey=${
              workoutRt.type === "live" ? workoutRt.liveKey : ""
            }&seriesKey=${series.seriesKey}`}
          />
        </div>
      ) : !enrolled ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            leftText={`₹${formatWithCommas(series.cost)}`}
            cta={`Get access`}
            onClick={authRequest}
            appearance="contained"
          />
        </div>
      ) : workoutRt?.type === "live" ? (
        <LiveFloatingFooter
          onJoin={onPlay}
          earliestStartTime={earliestStartTime}
          eventState={eventState}
          state={userStream?.state}
          onLeaveLiveVideo={onRequestLeave}
        />
      ) : (enrolled || workoutRt?.isFree) && workoutRt?.type !== "nutrition" ? (
        <div className="sticky bottom-0 left-0 right-0 z-50">
          <FloatingFooter
            // leftText={`₹${formatWithCommas(series.cost)}`}
            cta={streamState === "streaming" ? "Pause" : `Start now`}
            appearance={streamState === "streaming" ? "ghost" : `contained`}
            onClick={handleStreaming}
            // link={workout.link}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ExerciseVideoHolder;
