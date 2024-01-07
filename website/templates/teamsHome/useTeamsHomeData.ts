import { useSuggestedTasks } from "@hooks/community/useSuggestedTasks";
// import { useUserEnrolledEvents } from "@hooks/user/useUserEnrolledEvents";
import { useUserEnrolledEventsV2 } from "@hooks/user/useUserEnrolledEventsV2";
import { UserInterface } from "@models/User/User";

export const useTeamsHomeData = (user?: UserInterface) => {
  const { userEvents, fetched, gameTeams, nextMembersExist, onNext } =
    useUserEnrolledEventsV2(user?.uid, 5);

  // console.log(user?.participatingInGameWithTeam);

  /* HARD CODE */
  const games = userEvents
    .map((item) => (item.parentId ? item.parentId : ""))
    .join(",");
  // console.log("games", userEvents);

  const { loading, suggestedTasks } = useSuggestedTasks(
    false, // dont fetch
    games,
    user?.uid,
    user?.userLevelV2
  );

  return {
    userEvents,
    nextMembersExist,
    onNext,
    gameTeams,
    suggestedTasks,
    loading,
    fetched,
  };
};
