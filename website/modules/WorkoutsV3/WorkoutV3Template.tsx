// import { useAuth } from "@hooks/auth/useAuth";
// import { useRecapcha } from "@hooks/auth/useRecapcha";
// import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import { UserInterface } from "@models/User/User";
// import { useWorkoutV3Params } from "@hooks/tasks/useWorkoutV3Params";
// import Loading from "@components/loading/Loading";
import { EventInterface } from "@models/Event/Event";
// import MainContainer from "./MainContainer";
// import { useSubscription } from "@hooks/subscription/useSubscription";
// import SubscriptionWidget from "@templates/joinBoatTemplate/subscription/SubscriptionWidget";

interface Props {
  leader: UserInterface;
  selectedEvent?: EventInterface | null;
  parentEvent?: EventInterface | null;
  sprintId: string;
}

const WorkoutV2Template: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
  sprintId,
}) => {
  // const { user, hideRecapcha, authStatus } = useAuth();
  // const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  // console.log("s", sprintId);

  // const {
  //   tab,
  //   onBack,
  //   taskId,
  //   postId,
  //   onNavChange,
  //   onNavReplace,
  //   sType,
  //   onWorkoutClick,
  //   parentId,
  //   coachKey,
  //   teamName,
  //   onGoToTeam,
  //   onSummaryClick,
  //   onTerraWorkout,
  // } = useWorkoutV3Params(
  //   leader?.userKey,
  //   selectedEvent?.eventKey,
  //   parentEvent?.id,
  //   user
  // );

  // const { onHideSub, subObj, affirmation, onSuccessSub, subStatus } =
  //   useSubscription(
  //     user?.uid,
  //     parentEvent?.id,
  //     "",
  //     sprintId,
  //     parentEvent?.pricing
  //   );

  // console.log("su", subStatus);

  return (
    <div className="max-w-md min-h-screen bg-gradient-to-b from-[#F3F6F8] mx-auto"></div>
  );
};

export default WorkoutV2Template;
