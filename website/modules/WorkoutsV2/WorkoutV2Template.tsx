import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import { UserInterface } from "@models/User/User";
import { useWorkoutV2Params } from "@hooks/tasks/useWorkoutV2Params";
// import Script from "next/script";
import Loading from "@components/loading/Loading";
import { EventInterface } from "@models/Event/Event";
import MainContainer from "./MainContainer";

interface Props {
  leader?: UserInterface | null;
  selectedEvent?: EventInterface | null;
  parentEvent?: EventInterface | null;
}

// SHUBHAM -> Note this
// export interface SelectedWorkout {
//   name: string;
//   avatar: string;
//   cal: string;
//   rank: string;
//   time: string;
// }

const WorkoutV2Template: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
}) => {
  // const router = useRouter();

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const {
    tab,
    onNavChange,
    onBack,
    parentId,
    taskId,
    onWorkoutClick,
    streamId,
    onSelfieRequest,
    coachKey,
    teamName,
    onGoToTeam,
    onStreamIdUpdate,
  } = useWorkoutV2Params(
    leader?.userKey,
    selectedEvent?.eventKey,
    parentEvent?.id,
    user,
    authStatus
  );

  return (
    <div className="pb-8 bg-white">
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
      {authStatus === "SUCCESS" && user && parentId && coachKey && teamName ? (
        <MainContainer
          user={user}
          activeTab={tab}
          onBack={onBack}
          onWorkoutClick={onWorkoutClick}
          taskId={taskId}
          onNavChange={onNavChange}
          parentId={parentId}
          coachKey={coachKey}
          eventKey={teamName}
          onStreamIdUpdate={onStreamIdUpdate}
          streamId={streamId}
          onGoToTeam={onGoToTeam}
          onSelfieRequest={onSelfieRequest}
        />
      ) : authStatus === "FAILED" ? (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </div>
  );
};

export default WorkoutV2Template;
