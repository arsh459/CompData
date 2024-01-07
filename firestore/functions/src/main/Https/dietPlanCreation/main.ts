import { fetchUser } from "../../FirestoreTriggers/onGptTaskCreation/utils";
import { getRequiredData } from "./utils";

interface ErrorInterface {
  status: false;
  message: { error: string };
}
interface MessageInterface {
  status: true;
  message: { data: any };
}

export const dietPlanCreationMain = async (
  uid?: string,
): Promise<ErrorInterface | MessageInterface> => {
  if (!uid) {
    return {
      status: false,
      message: { error: "uid Not Available" },
    };
  }

  const user = await fetchUser(uid);
  if (!user) {
    return {
      status: false,
      message: { error: "User Not Available" },
    };
  }
  const formattedUser = getRequiredData(user);

  console.log("formattedUser", formattedUser);

  return {
    status: true,
    message: { data: formattedUser },
  };
};
