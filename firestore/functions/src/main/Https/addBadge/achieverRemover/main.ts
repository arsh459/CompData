import { deleteAchievers, getAchieverForUser } from "../path/utils";

export type deleteType = "all" | "future" | "past";

export const mainRemoveAchieversFromUser = async (
  uid: string,
  deleteTypeInput: "all" | "future" | "past",
): Promise<{ status: boolean; reason?: string }> => {
  const achievers = await getAchieverForUser(uid);
  const toDelete: string[] = [];
  for (const achiever of achievers) {
    if (deleteTypeInput === "all") {
      toDelete.push(achiever.id);
      console.log(
        "TO DELETE",
        achiever.title,
        achiever.startTime,
        achiever.endTime,
      );
    } else if (
      deleteTypeInput === "future" &&
      achiever.startTime &&
      achiever.startTime > Date.now()
    ) {
      toDelete.push(achiever.id);
      console.log(
        "TO DELETE",
        achiever.title,
        achiever.startTime,
        achiever.endTime,
      );
    } else if (
      deleteTypeInput === "past" &&
      achiever.endTime &&
      achiever.endTime &&
      achiever.endTime < Date.now()
    ) {
      toDelete.push(achiever.id);
      console.log(
        "TO DELETE",
        achiever.title,
        achiever.startTime,
        achiever.endTime,
      );
    }
  }

  await deleteAchievers(toDelete);

  return {
    status: true,
  };
};
