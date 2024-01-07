import Loading from "@components/loading/Loading";
import { useLocalUser } from "@hooks/user/useLocalUser";
import { useUserContext } from "@providers/user/UserProvider";
import { View } from "react-native";
import AlreadyInTeam from "./AlreadyInTeam";
import JoinBoatSelector from "./JoinBoatSelector";
import JoinBoatWrapper from "./JoinBoatWrapper";
import ProfileBrief from "./ProfileBrief";
import useSection, { sectionTypes } from "./hooks/useSection";
import VarifyFeild from "./VarifyFeild";
// import SubscriptionV3 from "@modules/Subscription/SubscriptionV3";
import JoinScreen from "./JoinScreen";
// import { useJoinBoatParamsV2 } from "./hooks/useJoinBoatParamsV2";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

interface Props {
  selectedSection: sectionTypes;
}

const JoinBoatMain: React.FC<Props> = ({ selectedSection }) => {
  const { user } = useUserContext();

  // const { game } = useGameContext();
  // const { team } = useTeamContext();
  // console.log("HIII");

  const {
    localUser,
    onNameUpdate,
    uploadProfileImg,
    onKeyChange,
    onInstaUpdate,
    onEmailUpdate,
    onBioUpdate,
    onGoalUpdate,
    onLocationUpdate,
  } = useLocalUser(user);

  // const { onJoin } = useJoinBoatParamsV2(
  //   game,
  //   user,
  //   team?.ownerUID,
  //   team,
  //   subStatus,
  //   res.basePlanStatus,
  //   localUser?.name,
  //   localUser?.profileImage
  // );

  const {
    section,
    onUserKeySave,
    onProfileUpdate,
    onFitnessGoalUpdate,
    onFitnessPaceUpdate,
    onPreferredLocationUpdate,
    onTeamNameUpdate,
    onJoin,
    teamName,
    setTeamName,
    // onSubscribeCallback,
    // onNavOut,
    // onJoin,
  } = useSection(selectedSection, user);

  switch (section) {
    case "loading":
      return (
        <View className="flex-1 bg-black flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width="w-16" height="h-16" />
        </View>
      );
    case "userKey":
      return (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Set up your SocialBoat Handle"
          lable="userKey"
          current={1}
        >
          <VarifyFeild
            uid={user?.uid}
            keyValue={localUser?.userKey ? localUser.userKey : ""}
            lable="userKey"
            placeholder="Your Handle"
            onKeyChange={onKeyChange}
            onNext={onUserKeySave}
            maxCharacterLength={20}
            words={["Rahul_899", "subhamsunny", "jhon15", "swapnil-77"]}
          />
        </JoinBoatWrapper>
      );
    case "profileBrief":
      return (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Let's Set Up Your Profile"
          lable="profileBrief"
          onNext={() =>
            onProfileUpdate(
              localUser?.name,
              localUser?.instagramHandle,
              localUser?.email,
              localUser?.profileImage,
              localUser?.bio
            )
          }
          current={2}
        >
          <ProfileBrief
            localUser={localUser}
            uploadProfileImg={uploadProfileImg}
            onNameUpdate={onNameUpdate}
            onEmailUpdate={onEmailUpdate}
            onInstaUpdate={onInstaUpdate}
            onBioUpdate={onBioUpdate}
          />
        </JoinBoatWrapper>
      );
    case "fitnessGoal":
      return (
        <JoinBoatWrapper
          headText="Goal and Focus Point"
          title="What is your fitness goal?"
          lable="fitnessGoal"
          onNext={() =>
            localUser?.fitnessGoal &&
            onFitnessGoalUpdate(localUser?.fitnessGoal)
          }
          current={3}
        >
          <JoinBoatSelector
            target="fitnessGoal"
            fitnessGoal={localUser?.fitnessGoal}
            onGoalUpdate={onGoalUpdate}
          />
        </JoinBoatWrapper>
      );
    case "goalPace":
      return (
        <JoinBoatWrapper
          headText="Set Goal Date"
          title="At what Pace you want to reach Your goal?"
          lable="goalPace"
          current={4}
        >
          <JoinBoatSelector
            target="goalPace"
            goalPace={localUser?.paceOfAchievement}
            onPaceUpdate={onFitnessPaceUpdate}
          />
        </JoinBoatWrapper>
      );
    case "goalLocation":
      return (
        <JoinBoatWrapper
          headText="Workout Style"
          title="How do you like to workout?"
          lable="goalLocation"
          onNext={() =>
            localUser?.preferredWorkoutLocation &&
            onPreferredLocationUpdate(localUser?.preferredWorkoutLocation)
          }
          current={5}
        >
          <JoinBoatSelector
            target="goalLocation"
            goalLocation={localUser?.preferredWorkoutLocation}
            onLocationUpdate={onLocationUpdate}
          />
        </JoinBoatWrapper>
      );
    case "teamName":
      return (
        <JoinBoatWrapper
          headText="Set up your profile"
          title="Set up your Team Name"
          lable="teamName"
          current={6}
        >
          <VarifyFeild
            lable="teamName"
            keyValue={teamName}
            placeholder="Your team name"
            maxCharacterLength={20}
            onKeyChange={setTeamName}
            onNext={onTeamNameUpdate}
            words={["Fit_with_Abhi", "KhusiSeYoga"]}
          />
        </JoinBoatWrapper>
      );
    case "has_team":
      return (
        <View className="flex-1 bg-[#100F1A] flex flex-col justify-center">
          <AlreadyInTeam />
        </View>
      );
    case "join":
      return (
        <View className="flex-1 bg-[#100F1A] flex flex-col justify-center">
          <JoinScreen onPress={onJoin} />
        </View>
      );
    // case "subscription":
    //   return (
    //     <View className="bg-black">
    //       <SubscriptionV3 />
    //     </View>
    //   );
    default:
      return null;
  }
};

export default JoinBoatMain;
