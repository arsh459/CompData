import { UserInterface } from "@models/User/User";
import { userLog } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";
// import { useUserContext } from "../UserProvider";

export const useUserLog = (user?: UserInterface) => {
  useEffect(() => {
    user && userLog(user);
  }, [user]);
};
