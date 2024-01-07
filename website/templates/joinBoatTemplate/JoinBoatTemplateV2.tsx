// import Button from "@components/button";
import Loading from "@components/loading/Loading";
import { getCurrentMonthForPurchase } from "@hooks/community/challengeWeekUtils/utils";
import { useJoinBoatParams } from "@hooks/joinBoat/useJoinBoatParams";
import { useLocalUser } from "@hooks/joinBoat/useLocalUser";
import { useSubscription } from "@hooks/subscription/useSubscription";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import Script from "next/script";
import AlreadyInTeam from "./AlreadyInTeam/AlreadyInTeam";
import SubscriptionModal from "./subscription/SubscriptionModal";
import ProfileBrief from "./v2/ProfileBrief";
import TakeHandle from "./v2/TakeHandle";
import TeamBrief from "./v2/TeamBrief";
import TeamName from "./v2/TeamName";

interface Props {
  user: UserInterface;
  eventToJoin: EventInterface;
  game: EventInterface;
  coach: LeaderBoard;
}

const JoinBoatTemplateV2: React.FC<Props> = ({
  user,
  game,
  eventToJoin,
  coach,
}) => {
  const {
    localUser,
    uploadProfileImg,
    // removeProfileImg,
    onNameUpdate,
    onEmailUpdate,
    onInstaUpdate,
    onBioUpdate,
    onKeyChange,
  } = useLocalUser(user);

  const { id } = getCurrentMonthForPurchase(
    game.configuration?.sprints,
    game.configuration?.starts,
    game.configuration?.challengeLength,
    game.configuration?.activeSprintId
  );

  // console.log("id", id);

  const { subStatus, affirmation, onSuccessSub, subObj } = useSubscription(
    user.uid,
    game.id,
    "",
    id,
    game?.pricing
  );

  // const freeDaysLeft = getFreeTierDaysV2(
  //   subObj?.freeTrialStarted,
  //   game.pricing,
  //   game.configuration?.starts
  // );

  // console.log("freeDaysLeft", freeDaysLeft, subObj);

  const {
    section,
    onNext,
    onBack,
    loading,
    loadingMsg,
    onNavOut,
    // teamPresent,
  } = useJoinBoatParams(
    game,
    user,
    coach.uid,
    eventToJoin,
    subStatus,
    onSuccessSub,
    coach.userKey,
    eventToJoin.eventKey,
    localUser?.name,
    localUser?.userKey,
    localUser?.profileImage,
    localUser?.email
  );

  // console.log("f", freeDaysLeft, teamPresent);

  return (
    <div className="px-4 py-4">
      {section === "loading" || loading ? (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
          <p className="text-lg font-semibold text-gray-700 pt-4 text-center">
            {loadingMsg}
          </p>
        </div>
      ) : section === "userKey" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full">
            <TakeHandle
              uid={user.uid}
              userKey={localUser?.userKey}
              onKeyChange={onKeyChange}
              onButtonPress={onNext}
            />
          </div>
        </div>
      ) : section === "profileBrief" ? (
        <div className="w-full pt-20 h-screen">
          <ProfileBrief
            name={localUser?.name}
            uid={localUser?.uid ? localUser.uid : ""}
            instagramHandle={localUser?.instagramHandle}
            email={localUser?.email}
            img={localUser?.profileImage}
            onButtonPress={onNext}
            onNameUpdate={onNameUpdate}
            onEmailUpdate={onEmailUpdate}
            onInstaUpdate={onInstaUpdate}
            uploadProfileImg={uploadProfileImg}
            onBioUpdate={onBioUpdate}
            onBack={onBack}
          />
        </div>
      ) : section === "teamName" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full">
            <TeamName onButtonPress={onNext} />
          </div>
        </div>
      ) : section === "teamDesc" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full">
            <TeamBrief onButtonPress={onNext} />
          </div>
        </div>
      ) : section === "has_team" ? (
        <div className="w-full h-full">
          <AlreadyInTeam gameId={game.id} user={user} />
        </div>
      ) : section === "subscription" ? (
        <div className="flex justify-center items-center h-screen">
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
          <div className="w-full h-full">
            <SubscriptionModal
              isOpen={true}
              subStatus={subStatus}
              onClose={onBack}
              game={game}
              closeIcon={true}
              onSubscribe={onNext}
              onFreeTrial={() =>
                onNext(undefined, undefined, undefined, undefined, true)
              }
              affirmation={affirmation}
              onNext={onNavOut}
              isUserOnTrial={subObj?.startFreeTrial ? true : false}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JoinBoatTemplateV2;
