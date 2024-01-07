// import { useSuggestedTasks } from "@hooks/task/useSuggestedTasks";
import { UserInterface } from "@models/User/User";
import { useUserEnrolledEventsV2 } from "./useUserEnrolledEventsV2";

export const useTeamsHomeData = (user?: UserInterface) => {
  const { userEvents, fetched, gameTeams, nextMembersExist, onNext } =
    useUserEnrolledEventsV2(user?.uid, 5);

  /* HARD CODE */
  // const games = userEvents
  //   .map((item) => (item.parentId ? item.parentId : ""))
  //   .join(",");

  // const { loading, suggestedTasks } = useSuggestedTasks(
  //   false,
  //   games,
  //   user?.uid,
  //   user?.userLevelV2
  // );

  return {
    userEvents,
    nextMembersExist,
    onNext,
    gameTeams,
    // suggestedTasks,
    // loading,
    fetched,
  };
};
